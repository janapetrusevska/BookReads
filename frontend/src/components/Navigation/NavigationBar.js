import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logoutIcon from "../../images/log-out.png";
import SearchBar from "./SearchBar";
import { fetchAllReaders } from "../Service/AxiosService";
import {jwtDecode} from "jwt-decode";

const NavigationBar = () => {
    const [token, setToken] = useState(localStorage.getItem("token"));
    const [readers, setReaders] = useState([]);
    const [filteredReaders, setFilteredReaders] = useState([]);
    const navigate = useNavigate();
    const decoded = token ? jwtDecode(token) : null;
    const readerId = decoded ? decoded.readerId : null;

    const isLoggedIn = token !== null;

    useEffect(() => {
        const fetchReaders = async () => {
            if (token) {
                try {
                    const readers = await fetchAllReaders(token);
                    setReaders(readers);
                    setFilteredReaders(readers);
                } catch (error) {
                    console.log(error.message);
                }
            }
        };
        fetchReaders();
    }, [token]);

    const handleLogout = () => {
        localStorage.removeItem("token");
        setToken(null);
        navigate("/login");
    };

    const handleSearch = (term) => {
        if (term.trim() === "") {
            setFilteredReaders([]);
        } else {
            const lowerCaseTerm = term.toLowerCase();

            setFilteredReaders(
                readers
                    .filter((reader) =>
                        reader.name.toLowerCase().includes(lowerCaseTerm) ||
                        reader.email.toLowerCase().includes(lowerCaseTerm)
                    )
                    .sort((a, b) => {
                        const nameA = a.name.toLowerCase();
                        const emailA = a.email.toLowerCase();
                        const nameB = b.name.toLowerCase();
                        const emailB = b.email.toLowerCase();

                        const posA = Math.min(
                            nameA.indexOf(lowerCaseTerm),
                            emailA.indexOf(lowerCaseTerm) === -1 ? Infinity : emailA.indexOf(lowerCaseTerm)
                        );
                        const posB = Math.min(
                            nameB.indexOf(lowerCaseTerm),
                            emailB.indexOf(lowerCaseTerm) === -1 ? Infinity : emailB.indexOf(lowerCaseTerm)
                        );

                        return posA - posB;
                    })
            );
        }
    };


    const handleSuggestionClick = (readerId) => {
        navigate(`/readers/${readerId}`);
    };

    return (
        <nav className="navbar">
            <ul className="nav-links">
                <li>
                    <Link to="/">Home</Link>
                </li>
                <li className={isLoggedIn ? "" : "disabled-link"}>
                    <Link to="/books" className={isLoggedIn ? "" : "disabled-link"}>
                        Books
                    </Link>
                </li>
                <li className={isLoggedIn ? "" : "disabled-link"}>
                    <Link to="/levels" className={isLoggedIn ? "" : "disabled-link"}>
                        Levels
                    </Link>
                </li>
            </ul>
            <ul>
                <SearchBar
                    onSearch={handleSearch}
                    suggestions={filteredReaders}
                    onSuggestionClick={handleSuggestionClick}
                />
            </ul>
            <ul className="auth-links">
                <li>
                    <Link to={`/profile/${readerId}`} className={isLoggedIn ? "" : "disabled-link"}>
                        Profile
                    </Link>
                </li>
                {isLoggedIn ? (
                    <li>
                        <img
                            src={logoutIcon}
                            onClick={handleLogout}
                            alt="Logout"
                            className="logout-icon"
                        />
                    </li>
                ) : null}
            </ul>
        </nav>
    );
};

export default NavigationBar;
