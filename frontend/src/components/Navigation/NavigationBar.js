import React from "react";
import {Link, useNavigate} from "react-router-dom";
import logoutIcon from "../../images/log-out.png"

const NavigationBar = () => {
    const token = localStorage.getItem("token");
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/login");
    };

    return(
        <nav className="navbar">
            <ul className="nav-links">
                <li>
                    <Link to="/">Home</Link>
                </li>
                <li>
                    <Link to="/books">Books</Link>
                </li>
                <li>
                    <Link to="/levels">Levels</Link>
                </li>

            </ul>
            <ul className="auth-links">
                <li>
                    <Link to="/profile">Profile</Link>
                </li>
                {token ? (
                    <li>
                        <img src={logoutIcon} onClick={handleLogout} alt="Logout" className="logout-icon" />
                    </li>
                ) :  null
                }
            </ul>
        </nav>
    )
}

export default NavigationBar;