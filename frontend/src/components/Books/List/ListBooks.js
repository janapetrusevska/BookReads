import React, {useEffect, useState} from "react";
import BookCard from "../BookCard";
import BookModal from "../BookModal";
import {fetchBooks} from "../../Service/AxiosService";

const ListBooks = () => {
    const [showModal, setShowModal] = useState(false);
    const [books, setBooks] = useState([]);
    const [selectedBook, setSelectedBook] = useState(null);
    const token = localStorage.getItem("token");

    useEffect(() => {
        const fetch = async () => {
            if(token){
                try {
                    const booksData = await fetchBooks(token);
                    setBooks(booksData);
                } catch (error) {
                    console.log(error.message || "An error occurred");
                }
            }
        };
        fetch();
    }, []);

    const onViewDetails = (book) => {
        setSelectedBook(book);
        setShowModal(true);
    }

    return(
        <div className="home-container">
            <div className="book-list-container">
                <h2>All your books in one place!</h2>
                <p>Here you can look at all the books you have read, the ones you're enjoying right now,
                    as well as everything that is on your wishlist.</p>
                <div className="book-list">
                    {books.map((book, index) => (
                        <BookCard key={book.id}
                                  book={book}
                                  onViewDetails={() => onViewDetails(book)}/>
                    ))}
                    <div className="add-book-card" onClick={() => setShowModal(true)}>
                        <h1>+</h1>
                    </div>
                </div>
            </div>
            <BookModal
                show={showModal}
                handleClose={() => setShowModal(false)}
                title={selectedBook ? "Book Details" : "Add a New Book"}
                book={selectedBook}
            />
        </div>
    )
}

export default ListBooks;
