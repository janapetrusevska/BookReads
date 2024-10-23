import React from "react";
import {Link} from "react-router-dom";

const NavigationBar = () => {
    return(
        <nav className="navbar">
            <ul>
                <li>
                    <Link to="/">Books</Link>
                </li>
                <li>
                    <Link to="/">Levels</Link>
                </li>
                <li>
                    <Link to="/login">Login</Link>
                </li>
            </ul>
        </nav>
    )
}

export default NavigationBar;