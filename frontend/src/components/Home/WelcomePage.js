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
                <h2>Read, Track and Share!</h2>
                <h3>Curate your own virtual library, create unique book collections, and earn points as you explore captivating stories and engage with a community of passionate book lovers.</h3>
                <button onClick={handleLogin} className="welcome-button">LOG IN</button>
                <p>Don’t have a profile yet? <Link to="/register" className="register-link">JOIN US</Link> NOW</p>
            </div>


        </div>
    )
}

export default WelcomePage;