import React, {useEffect, useState} from "react";
import axios from "axios";
import {jwtDecode} from 'jwt-decode';

const Profile = () => {
    const [reader, setReader] = useState(null);
    const [error, setError] = useState("");
    const [progress, setProgress] = useState(0);
    const token = localStorage.getItem("token");

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

                    //TODO: THE MATH ISN'T MATHING :((
                    // const totalPoints = response.data.totalPoints || 0;
                    // console.log("points",totalPoints
                    // );
                    // const level = response.data.level || 1;
                    // console.log("level", level);
                    //
                    // const p = (totalPoints / (level - 1)) * 10;
                    // setProgress(p);
                    // console.log("Progress bar ",p);
                    //
                    // console.log("Reader: ", response.data);
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
                        {/*<progress value={2} max={10}/>*/}

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