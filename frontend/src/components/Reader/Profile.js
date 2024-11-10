import React, { useEffect, useState } from "react";
import {jwtDecode} from 'jwt-decode';
import { ProgressBar } from "react-bootstrap";
import ReadingListSection from "../ReadingList/List/ReadingListSection";
import BooksCarousel from "../ReadingList/BooksCarousel";
import { fetchReaderProfile, logoutUser } from "../Service/AxiosService";
import ReadingListModal from "../ReadingList/ReadingListModal";

const Profile = () => {
    const [reader, setReader] = useState(null);
    const [error, setError] = useState("");
    const [progress, setProgress] = useState(0);
    const [showModal, setShowModal] = useState(false);
    const token = localStorage.getItem("token");

    const calculateLevelThreshold = (level) => {
        if (level <= 10) return level * 10;
        if (level <= 20) return 100 + (level - 10) * 15;
        if (level <= 30) return 250 + (level - 20) * 20;
        if (level <= 40) return 450 + (level - 30) * 25;
        if (level <= 50) return 700 + (level - 40) * 30;
        return 1000;
    };

    useEffect(() => {
        const loadProfile = async () => {
            if (token) {
                const email = jwtDecode(token).sub;
                try {
                    const profileInfo = await fetchReaderProfile(token, email);
                    setReader(profileInfo);

                    const currentThreshold = calculateLevelThreshold(profileInfo.level);
                    const nextThreshold = calculateLevelThreshold(profileInfo.level + 1);
                    setProgress(((profileInfo.totalPoints - currentThreshold) / (nextThreshold - currentThreshold)) * 100);
                } catch (err) {
                    setError(err.message || "An error occurred");
                }
            } else {
                setError("No token found");
            }
        };

        loadProfile();
    }, [token]);

    const handleLogout = async () => {
        try {
            await logoutUser(token);
            localStorage.removeItem('token');
            window.location.href = '/login';
        } catch {
            setError("Failed to log out. Please try again.");
        }
    };

    const handleShowModal = () => {
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    return (
        <>
            {error && <div className="error-message">{error}</div>}
            {reader ? (
                <div className="profile-container">
                    <div className="profile-details">
                        <h1>{reader.name}</h1>
                        <h3>{reader.email}</h3>
                        <p>Level {reader.level}</p>
                        <ProgressBar now={progress} label={`${Math.round(progress)}%`} />
                        <p><i>{reader.aboutMe}</i></p>
                        <p>Joined on <b>{reader.dateCreated}</b></p>
                        <p>Books entered: {reader.booksRead}</p>
                        <p>Total points: {reader.totalPoints}</p>
                        <div style={{ display: "flex" }}>
                            <button className="logout-button" onClick={handleLogout}>Edit</button>
                            <button className="logout-button" onClick={handleLogout}>Logout</button>
                        </div>
                    </div>
                    <div className="profile-reading-section">
                        <BooksCarousel />
                        <ReadingListSection name={reader.name} showModal={handleShowModal}/>
                    </div>
                    <ReadingListModal
                        show={showModal}
                        handleClose={handleCloseModal}
                        title="Add a Reading List"/>
                </div>
            ) : (
                <p>Loading...</p>
            )}
        </>
    );
};

export default Profile;
