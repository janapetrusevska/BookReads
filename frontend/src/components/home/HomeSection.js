import React, {useEffect, useState} from "react";
import axios from "axios";

const HomeSection = ({title, status, onAddBook}) => {
    const [books, setBooks] = useState([]);
    const token = localStorage.getItem("token");

    useEffect(() => {
        const fetchBooks = async () => {
            if(token){
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
    }, []);

    return (
        <div>
            <div className="book-list-container">
                <h3>{title}</h3>
                <ul className="book-list">
                    {books.map(book => (
                        <div className="book-card">
                            <img src={book.coverUrl} alt="photo" className="home-book-cover"/>
                            <li key={`${book.id}-${book.title}`}><b><i>{book.title}</i></b></li>
                            <p>{book.author}</p>
                        </div>
                    ))}
                    <div className="add-book-card" onClick={onAddBook}>
                        <h1>+</h1>
                    </div>
                </ul>
            </div>
        </div>
    );
};

export default HomeSection;