import React, {useEffect, useState} from "react";
import axios from "axios";
import {jwtDecode} from 'jwt-decode';

const Profile = () => {
    const [reader, setReader] = useState(null);
    const [error, setError] = useState("");
    const [progress, setProgress] = useState(0);
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
        const fetchReaderProfile = async () => {
            if (token) {
                const decodedToken = jwtDecode(token);
                const email = decodedToken.sub;
                console.log("Email ", email);

                try {
                    const response = await axios.get("http://localhost:8080/api/reader/profile", {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                        params: {
                            email: email,
                        }
                    });

                    setReader(response.data);

                    const currentLevelThreshold = calculateLevelThreshold(response.data.level);
                    const nextLevelThreshold = calculateLevelThreshold(response.data.level + 1);

                    const progress = ((response.data.totalPoints - currentLevelThreshold) / (nextLevelThreshold - currentLevelThreshold)) * 100;
                    setProgress(progress);

                    console.log("progress",progress);
                } catch (error) {
                    setError(error.message || "An error occurred");
                    console.log(error);
                }
            } else {
                setError("No token found");
            }
        };
            fetchReaderProfile();
    }, [token]);

    const logout = async () => {
        try {
            const response = await axios.post('http://localhost:8080/api/auth/logout', {}, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
            });

            if (response.status === 200) {
                localStorage.removeItem('token');
                window.location.href = '/login';
            } else {
                console.error('Error logging out:', response.status);
            }
        } catch (error) {
            console.error('Error logging out:', error);
        }
    }

    return (
        <div className="profile-container">
            <div>
                {error && <div className="error-message">{error}</div>}
                {reader ? (
                    <div className="profile-details">
                        <h1>{reader.name}</h1>
                        <p>Email: {reader.email}</p>
                        <p>Total points: {reader.totalPoints}</p>
                        <p>Level: {reader.level}</p>
                        {/*<ProgressBar now={progress} label={`${progress.toFixed(2)}%`} />*/}
                        <button onClick={logout}>Logout</button>
                    </div>
                ) : (
                    <p>Loading...</p>
                )}
            </div>
        </div>
    )
}

export default Profile;