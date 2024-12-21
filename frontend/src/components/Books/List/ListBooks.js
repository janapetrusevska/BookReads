import React, {useEffect, useState} from "react";
import BookCard from "../BookCard";
import BookModal from "../BookModal";
import {fetchBooks} from "../../Service/AxiosService";
import Filters from "./Filters";
import {useNavigate} from "react-router-dom";
import Image from "../../../images/icons/plant2.png"

const ListBooks = () => {
    const [showModal, setShowModal] = useState(false);
    const [allBooks, setAllBooks] = useState([]);
    const [filteredBooks, setFilteredBooks] = useState([]);
    const [selectedBook, setSelectedBook] = useState(null);
    const [sortOption, setSortOption] = useState("title");
    const token = localStorage.getItem("token");
    const navigate = useNavigate();

    useEffect(() => {
        const fetch = async () => {
            if (token) {
                try {
                    const booksData = await fetchBooks(token);
                    setAllBooks(booksData);
                    setFilteredBooks(booksData);
                } catch (error) {
                    console.log(error.message || "An error occurred");
                }
            } else {
                navigate("/login");
            }
        };
        fetch();
    }, []);

    const handleFilter = (filters) => {
        setSortOption(filters.sortOption);
        const filtered = allBooks.filter((book) => {
            const matchesSearch =
                !filters.searchTerm ||
                book.title.toLowerCase().includes(filters.searchTerm.toLowerCase()) ||
                book.author.toLowerCase().includes(filters.searchTerm.toLowerCase());

            const matchesGenre =
                !filters.genre.length ||
                filters.genre.some((selectedGenre) =>
                    book.genre?.toLowerCase() === selectedGenre.label.toLowerCase()
                );

            const matchesPoints = !filters.points || book.points === parseInt(filters.points);

            const matchesStars = !filters.stars || book.stars === parseInt(filters.stars);

            const matchesDateFrom =
                !filters.dateFrom || new Date(book.readDate) >= new Date(filters.dateFrom);

            const matchesDateTo =
                !filters.dateTo || new Date(book.readDate) <= new Date(filters.dateTo);

            return matchesSearch && matchesGenre && matchesPoints && matchesStars && matchesDateFrom && matchesDateTo;
        });

        setFilteredBooks(filtered);
    };

    const sortedBooks = [...filteredBooks].sort((a, b) => {
        console.log(sortOption);
        if (sortOption === "title") {
            return a.title.localeCompare(b.title);
        } else if (sortOption === "author") {
            return a.author.localeCompare(b.author);
        } else if (sortOption === "readDateAsc") {
            return new Date(a.readDate) - new Date(b.readDate);
        } else if (sortOption === "readDateDesc") {
            return new Date(b.readDate) - new Date(a.readDate);
        } else if (sortOption === "stars") {
            return b.stars - a.stars;
        } else if (sortOption === "totalPoints") {
            return b.points - a.points;
        }
        return 0;
    });

    const onViewDetails = (book) => {
        console.log("Book clicked:", book);
        setSelectedBook(book);
        setShowModal(true);
    };

    return (
        <div className="home-container">
            <Filters onFilter={handleFilter} />
            <div className="book-list-container">
                <div className="book-list-container-header">
                    <div>
                        <h2>All your books in one place!</h2>
                        <p>
                            Here you can look at all the books you have read, the ones you're enjoying
                            right now, as well as everything that is on your wishlist.
                        </p>
                    </div>
                    <img id="books-list-image" src={Image} alt="image"/>
                </div>
                <div className="book-list">
                    {sortedBooks.map((book) => (
                        <BookCard
                            key={book.id}
                            book={book}
                            onViewDetails={() => onViewDetails(book)}
                        />
                    ))}
                </div>
                {showModal && (
                    <BookModal
                        show={showModal}
                        book={selectedBook}
                        handleClose={() => setShowModal(false)}
                        isLoggedInReader={true}
                    />
                )}
            </div>
        </div>
    );
};

export default ListBooks;
