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
            <div className="welcome-text">
                <h1>SHELF-CONNECT</h1>
                <h3>Join now to build your own library, track your reading, and connect with other book lovers.</h3>
                <button onClick={handleLogin} className="welcome-button">LOG IN</button>
                <p>Don’t have a profile yet? <Link to="/register" className="register-link">JOIN US</Link> NOW</p>
            </div>


        </div>
    )
}

export default WelcomePage;