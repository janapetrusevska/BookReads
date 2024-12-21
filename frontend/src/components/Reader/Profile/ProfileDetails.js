import React from "react";
import { ProgressBar } from "react-bootstrap";
import { followReader, unfollowReader } from "../../Service/AxiosService";

const ProfileDetails = ({
                            reader,
                            readerId,
                            readerInToken,
                            token,
                            handleEditProfile,
                            handleLogout,
                            calculateLevelThreshold,
                            isFollowed,
                            handleIsFollowed
                        }) => {
    const isLoggedInReader = Number(readerId) === Number(readerInToken);

    const handleFollow = async () => {
        if (!isLoggedInReader) {
            try {
                await followReader(readerId, token);
                handleIsFollowed(true);
            } catch (error) {
                console.error("Failed to follow reader:", error.message);
            }
        }
    };

    const handleUnfollow = async () => {
        if (!isLoggedInReader) {
            try {
                await unfollowReader(readerId, token);
                handleIsFollowed(false);

            } catch (error) {
                console.error("Failed to unfollow reader:", error.message);
            }
        }
    };

    const progressValue = Math.min(
        100,
        Math.round(
            (reader.totalPoints / calculateLevelThreshold(reader.level)) * 100
        )
    );

    return (
        <div className="profile-details">
            { !isLoggedInReader ? (
                isFollowed ? (
                    <button className="unfollow-button" onClick={handleUnfollow}>
                        UNFOLLOW READER
                    </button>
                ) : (
                    <button className="follow-button" onClick={handleFollow}>
                        FOLLOW READER
                    </button>
                )) : <></>
            }
            <h1>{reader.name}</h1>
            <h3>{reader.email}</h3>
            <div className="progress-levels">
                <p>Level {reader.level}</p>
                <p>→</p>
                <p>Level {reader.level + 1}</p>
            </div>
            <ProgressBar now={progressValue} />
            <p>
                <i>{reader.aboutMe}</i>
            </p>
            <p>
                Joined on <b>{reader.dateCreated}</b>
            </p>
            <p>Books entered: {reader.booksRead}</p>
            <p>Total points: {reader.totalPoints}</p>
            {!isLoggedInReader ? (
                <></>
            ) : (
                <div style={{ display: "flex", gap: "10px" }}>
                    <button className="profile-button" onClick={handleEditProfile}>
                        Edit
                    </button>
                    <button className="profile-button" onClick={handleLogout}>
                        Logout
                    </button>
                </div>
            )}
        </div>
    );
};

export default ProfileDetails;
