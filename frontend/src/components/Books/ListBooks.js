import React, {useEffect, useState} from "react";
import axios from "axios";
import BookCard from "./BookCard";
import BookModal from "./BookModal";

const ListBooks = () => {
    const [showModal, setShowModal] = useState(false);
    const [books, setBooks] = useState([]);
    const token = localStorage.getItem("token");

    useEffect(() => {
        const fetchBooks = async () => {
            if(token){
                try {
                    const response = await axios.get(`http://localhost:8080/api/books`, {
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

    return(
        <div className="home-container">
            <div className="book-list-container">
                <h2>All your books in one place!</h2>
                <p>Here you can look at all the books you have read, the ones you're enjoying right now,
                    as well as everything that is on your wishlist.</p>
                <div className="book-list">
                    {books.map((book, index) => (
                        <BookCard key={book.id} book={book}/>
                    ))}
                    <div className="add-book-card" onClick={() => setShowModal(true)}>
                        <h1>+</h1>
                    </div>
                </div>
            </div>
            <BookModal
                show={showModal}
                handleClose={() => setShowModal(false)}
                title="Add a New Book"
                book={null}
            />
        </div>
    )
}

export default ListBooks;
