import React from "react";
import {Link, useNavigate} from "react-router-dom";

const WelcomePage = () => {
    const navigate = useNavigate();

    const handleLogin = () => {
        navigate("/login");
    };

    const handleRegister = () => {
        navigate("/register");
    };

    return(
        <div className="welcome-container">
            <h1>Your Personalized Book Journey Awaits!</h1>
            <h3>Join now to build your own library, track your reading, and connect with other book lovers.</h3>
            <button onClick={handleLogin} className="welcome-button">LOG IN</button>
            <p>Don’t have a profile yet? <Link to="/register" className="register-link">REGISTER NOW</Link></p>
        </div>
    )
}

export default WelcomePage;