import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const SearchBar = ({ onSelectBook }) => {
    const [searchTerm, setSearchTerm] = useState("");
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [bookSuggestions, setBookSuggestions] = useState([]);
    const searchContainerRef = useRef(null);
    const navigate = useNavigate();

    useEffect(() => {
        document.addEventListener("mousedown", handleOutsideClick);
        return () => {
            document.removeEventListener("mousedown", handleOutsideClick);
        };
    }, []);

    const fetchBookSuggestions = async (query) => {
        const API_KEY = "AIzaSyCvzBY3mWYjHVdaKH7ZwlCcsbzLA0vRI8M";
        const url = `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(
            query
        )}&key=${API_KEY}`;

        try {
            const response = await fetch(url);
            if (response.ok) {
                const data = await response.json();
                setBookSuggestions(data.items || []);
                setShowSuggestions(query.trim() !== "");
            } else {
                console.error("Error fetching books:", response.status);
            }
        } catch (error) {
            console.error("Error fetching books:", error);
        }
    };

    const handleInputChange = (event) => {
        const term = event.target.value;
        setSearchTerm(term);
        fetchBookSuggestions(term);
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

    const handleSuggestionsClick = (book) => {
        const title = book.volumeInfo.title || "";
        const author = book.volumeInfo.authors[0] || "";
        const coverUrl = book.volumeInfo.imageLinks.smallThumbnail || "";
        const genre = book.volumeInfo.categories[0] || "";
        onSelectBook(title, author,coverUrl,genre);
        setSearchTerm("");
        setShowSuggestions(false);
    };

    console.log(bookSuggestions);

    return (
        <div className="search-books-container" ref={searchContainerRef}>
            <input
                type="text"
                className="nav-search-books"
                placeholder="Search for a book..."
                value={searchTerm}
                onChange={handleInputChange}
                onFocus={handleFocus}
            />
            {showSuggestions && bookSuggestions.length > 0 && (
                <ul className="books-suggestions-list">
                    {bookSuggestions.slice(0, 6).map((book) => {
                        const volumeInfo = book.volumeInfo;
                        return (
                            <li
                                key={book.id}
                                className="suggestion-item"
                                onClick={() => handleSuggestionsClick(book)}
                            >
                                <div>
                                    <strong>{volumeInfo.title}</strong> ({volumeInfo.authors?.[0] || "Unknown Author"})
                                </div>
                                <div>Genre: {volumeInfo.categories?.join(", ") || "Unknown Genre"}</div>
                            </li>
                        );
                    })}
                </ul>
            )}
        </div>
    );
};

export default SearchBar;
