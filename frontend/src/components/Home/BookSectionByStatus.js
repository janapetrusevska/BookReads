import React, { useEffect, useState } from "react";
import BookCard from "../Books/BookCard";
import {fetchBooksByStatus} from "../Service/AxiosService";

const BookSectionByStatus = ({ title, description, status, onAddBook, onViewDetails }) => {
    const [books, setBooks] = useState([]);
    const token = localStorage.getItem("token");

    useEffect(() => {
        const fetchBooks = async () => {
            if (token) {
                try {
                    const fetchedBooks = await fetchBooksByStatus(token,status);
                    setBooks(fetchedBooks);
                } catch (error) {
                    console.log(error);
                }
            }
        };
        fetchBooks();
    }, [status, token]);

    return (
        <div>
            <div className="book-list-container">
                <h3>{title}</h3>
                <p>{description}</p>
                <ul className="book-list">
                    {books.map(book => (
                        <BookCard
                            key={book.id}
                            book={book}
                            onViewDetails={() => onViewDetails(book)}/>
                    ))}
                    <div className="add-book-card" onClick={onAddBook}>
                        <h1>+</h1>
                    </div>
                </ul>
            </div>
        </div>
    );
};

export default BookSectionByStatus;
