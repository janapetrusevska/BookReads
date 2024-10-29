import React, { useEffect, useState } from "react";
import axios from "axios";
import BookCard from "../Books/BookCard";

const BookSectionByStatus = ({ title, status, onAddBook, onViewDetails }) => {
    const [books, setBooks] = useState([]);
    const token = localStorage.getItem("token");

    useEffect(() => {
        const fetchBooks = async () => {
            if (token) {
                try {
                    const response = await axios.get(`http://localhost:8080/api/books/status/${status}`, {
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${token}`
                        }
                    });
                    setBooks(response.data);
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
