import React, { useEffect, useState } from "react";
import {jwtDecode} from "jwt-decode";
import {fetchReaderProfile} from "../Service/AxiosService";
import {useNavigate} from "react-router-dom";

const LevelSystem = () => {
    const levels = Array.from({ length: 50 }, (_, index) => index + 1);
    const [reader, setReader] = useState(null);
    const [error, setError] = useState("");
    const token = localStorage.getItem("token");
    const decodedToken = jwtDecode(token);
    const readerId = decodedToken.readerId;
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProfile = async () => {
            if (token) {
                try {
                    const profileInfo = await fetchReaderProfile(token, readerId);
                    setReader(profileInfo);
                } catch (error) {
                    setError(error.message || "An error occurred");
                }
            } else {
                setError("No token found");
                navigate("/login");
            }
        };

        fetchProfile();
    }, [token]);

    const calculateLevelThreshold = (level) => {
        if (level <= 10) return level * 10;
        if (level <= 20) return 100 + (level - 10) * 15;
        if (level <= 30) return 250 + (level - 20) * 20;
        if (level <= 40) return 450 + (level - 30) * 25;
        if (level <= 50) return 700 + (level - 40) * 30;
        return 1000;
    };

    return (
        <div>
            <div className="levels-info">
                <h2>Leveling System</h2>
                <p>
                    Each user starts with 0 points and earns their way up through different levels by collecting points
                    from every book they read. For each book, they can assign 1, 2, or 3 points based on content, pages, and difficulty.
                    Whenever he finishes a book he is currently reading and puts it in the read pile, the book counts in his points. The difficulty of every 10 levels grows by 5 points.
                </p>
                <p><b>Your total points: {reader?.totalPoints ?? 0}</b></p>
                <p><b>Your current level: {reader?.level}</b></p>
            </div>
            <div className="levels-container">
                {levels.map((level) => {
                    const levelThreshold = calculateLevelThreshold(level);
                    const achieved = reader?.totalPoints >= levelThreshold;
                    const isCurrent = reader?.level === level;

                    return (
                        <div
                            key={level}
                            className={`level-box ${achieved ? "achieved" : ""} ${isCurrent ? "current" : ""}`}
                            data-points={`Points required: ${levelThreshold}`} // Use data attribute for tooltip
                        >
                            {level}
                        </div>
                    );
                })}
            </div>
            {error && <p className="error-message">{error}</p>}
        </div>
    );
};

export default LevelSystem;
