import React, { useEffect, useState } from "react";
import {jwtDecode} from "jwt-decode";
import ReadingListSection from "../../ReadingList/List/ReadingListSection";
import BooksCarousel from "../../ReadingList/BooksCarousel";
import {
    fetchIsReaderFollowed,
    fetchReaderProfile,
    logoutUser,
} from "../../Service/AxiosService";
import ReadingListModal from "../../ReadingList/ReadingListModal";
import { useParams, useNavigate } from "react-router-dom";
import ProfileDetails from "./ProfileDetails";
import ProfileEditForm from "./ProfileEditForm";
import ReadingListDetails from "../../ReadingList/Details/ReadingListDetails";


const Profile = () => {
    const { readerId } = useParams();
    const [reader, setReader] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [showReadingListDetails, setShowReadingListDetails] = useState(false);
    const [selectedReadingList, setSelectedReadingList] = useState(null);
    const [isFollowed, setIsFollowed] = useState(false);
    const [isEditProfile, setIsEditProfile] = useState(false);
    const navigate = useNavigate();

    const token = localStorage.getItem("token");
    const decodedToken = token ? jwtDecode(token) : null;
    const readerInToken = decodedToken.readerId;
    const isLoggedInReader = Number(readerId) === Number(readerInToken);

    console.log("readerId from URL:", readerId);
    console.log("readerId from token:", readerInToken);
    console.log("is logged", isLoggedInReader);

    useEffect(() => {
        setShowReadingListDetails(false);
        setSelectedReadingList(null);
        setIsEditProfile(false);
    }, [readerId]);

    useEffect(() => {
        const loadProfile = async () => {
            setReader(null);
            if (!token) {
                navigate("/login");
                return;
            }

            if (isTokenExpired(token)) {
                localStorage.removeItem("token");
                navigate("/login");
                return;
            }

            try {
                const profileInfo = await fetchReaderProfile(token, readerId);
                setReader(profileInfo);
            } catch (err) {
                console.error(err.message || "An error occurred");
            }
        };

        const fetchIsFollowed = async () =>{
            if(Number(readerId) !== Number(readerInToken)){
                try{
                    const followed = await fetchIsReaderFollowed(readerId,token);
                    setIsFollowed(followed);
                } catch (error){
                    console.log(error.message);
                }
            }
        }

        fetchIsFollowed();
        loadProfile();
    }, [readerId, isFollowed]);

    useEffect(() => {
        if (showModal) {
            setShowModal(false);
            setSelectedReadingList(null);
        }
    }, [readerId]);

    const calculateLevelThreshold = (level) => {
        if (level <= 10) return level * 10;
        if (level <= 20) return 100 + (level - 10) * 15;
        if (level <= 30) return 250 + (level - 20) * 20;
        if (level <= 40) return 450 + (level - 30) * 25;
        if (level <= 50) return 700 + (level - 40) * 30;
        return 1000;
    };

    const isTokenExpired = (token) => {
        const decoded = jwtDecode(token);
        return decoded.exp * 1000 < Date.now();
    };

    const handleLogout = async () => {
        try {
            await logoutUser(token);
            localStorage.removeItem("token");
            navigate("/login");
        } catch {
            console.log("Failed to log out. Please try again.");
        }
    };

    const handleShowModal = (readingList = null) => {
        setShowModal(true);
        setSelectedReadingList(readingList);
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setSelectedReadingList(null);
    };

    const handleEditProfile = () => {
        setIsEditProfile(true);
    }

    const handleShowReadingListDetails = (list) => {
        setShowReadingListDetails(true);
        setSelectedReadingList(list);
    }

    const handleIsFollowedButton = (followed) => {
        if(followed){
            setIsFollowed(true)
        } else setIsFollowed(false);
    }

    return (
        <div className="profile-container">
            {reader ? (
                <>
                    {!isEditProfile ? (
                        <ProfileDetails
                            reader={reader}
                            readerId={readerId}
                            readerInToken={readerInToken}
                            token={token}
                            handleEditProfile={() => setIsEditProfile(true)}
                            handleLogout={handleLogout}
                            calculateLevelThreshold={calculateLevelThreshold}
                            isFollowed={isFollowed}
                            handleIsFollowed={handleIsFollowedButton}
                        />
                    ) : (
                        <ProfileEditForm reader={reader} />
                    )}
                    {showReadingListDetails && selectedReadingList ? (
                        <ReadingListDetails
                            readingList={selectedReadingList}
                            isLoggedInReader={isLoggedInReader}
                            readerName={reader.name}
                            handleGoBack={() => setShowReadingListDetails(false)}
                        />
                    ) : (
                        <div className="profile-reading-section">
                            <BooksCarousel readerId={reader?.id} isLoggedInReader={isLoggedInReader} />
                            <ReadingListSection
                                readerId={reader?.id}
                                name={reader?.name}
                                showModal={handleShowModal}
                                showReadingListDetails={handleShowReadingListDetails}
                                isLoggedInReader={isLoggedInReader}
                            />
                        </div>
                    )}
                    <ReadingListModal
                        show={showModal}
                        handleClose={handleCloseModal}
                        title={selectedReadingList ? "" : "Add a Reading List"}
                        readingList={selectedReadingList}
                        isLoggedInReader={isLoggedInReader}
                    />
                </>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
};

export default Profile;
