import React, { useState, useRef, useEffect } from "react";
import {useNavigate} from "react-router-dom";

const SearchBar = ({ onSearch, suggestions }) => {
    const [searchTerm, setSearchTerm] = useState("");
    const [showSuggestions, setShowSuggestions] = useState(false);
    const searchContainerRef = useRef(null);
    const navigate = useNavigate();

    useEffect(() => {
        document.addEventListener("mousedown", handleOutsideClick);
        return () => {
            document.removeEventListener("mousedown", handleOutsideClick);
        };
    }, []);

    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            onSearch(searchTerm);
        }, 300);

        return () => clearTimeout(delayDebounceFn);
    }, [searchTerm]);


    const handleInputChange = (event) => {
        const term = event.target.value;
        setSearchTerm(term);
        onSearch(term);
        setShowSuggestions(term.trim() !== "");
    };

    const handleOutsideClick = (event) => {
        if (searchContainerRef.current && !searchContainerRef.current.contains(event.target)) {
            setShowSuggestions(false);
        }
    };

    const handleFocus = () => {
        if (searchTerm.trim() !== "") {
            setShowSuggestions(true);
        }
    };

    const handleSuggestionsClick = (readerId) => {
        navigate(`profile/${readerId}`);
        setSearchTerm("");
        setShowSuggestions(false);
    }

    return (
        <div className="search-container" ref={searchContainerRef}>
            <input
                type="text"
                className="nav-search-bar"
                placeholder="Search readers by name or email..."
                value={searchTerm}
                onChange={handleInputChange}
                onFocus={handleFocus}
            />
            {showSuggestions && suggestions.length > 0 && (
                <ul className="suggestions-list">
                    {suggestions.slice(0, 6).map((reader) => (
                        <li
                            key={reader.id}
                            className="suggestion-item"
                            onClick={() => handleSuggestionsClick(reader.id)}
                        >
                            {reader.name} - {reader.email}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default SearchBar;
