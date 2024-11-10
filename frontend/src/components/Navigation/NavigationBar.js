import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logoutIcon from "../../images/log-out.png";

const NavigationBar = () => {
    const [token, setToken] = useState(localStorage.getItem("token"));
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("token");
        setToken(null);
        navigate("/login");
    };

    const isLoggedIn = token !== null;

    return (
        <nav className="navbar">
            <ul className="nav-links">
                <li>
                    <Link to="/">Home</Link>
                </li>
                <li className={isLoggedIn ? "" : "disabled-link"}>
                    <Link to="/books" className={isLoggedIn ? "" : "disabled-link"}>Books</Link>
                </li>
                <li className={isLoggedIn ? "" : "disabled-link"}>
                    <Link to="/levels" className={isLoggedIn ? "" : "disabled-link"}>Levels</Link>
                </li>
            </ul>
            <ul className="auth-links">
                <li>
                    <Link to="/profile" className={isLoggedIn ? "" : "disabled-link"}>Profile</Link>
                </li>
                {isLoggedIn ? (
                    <li>
                        <img src={logoutIcon} onClick={handleLogout} alt="Logout" className="logout-icon" />
                    </li>
                ) : null}
            </ul>
        </nav>
    );
};

export default NavigationBar;
