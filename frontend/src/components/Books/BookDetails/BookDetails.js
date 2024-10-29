import React, {useState} from "react";
import axios from "axios";
import BookForm from "../AddForm/BookForm";

const BookDetails = ({ book }) => {
    const [isEditing, setIsEditing] = useState(false);
    const token = localStorage.getItem("token");
    const bookId = book.id;

    const handleDeleteBook = async () => {
        try{
            await axios.delete(`http://localhost:8080/api/books/delete/${bookId}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            window.location.reload();
        } catch (error){
            console.log(error);
        }
    }

    const handleEditBook =  () => {
        setIsEditing(true);
    }

    console.log(book);
    return(
        <div>
            {isEditing ? (
                <BookForm book={book} closeForm={() => setIsEditing(false)} />
            ) : (
                <div className="modal-form-container">
                    <div className="left-column">
                        <img src={book.coverUrl} alt="book cover" className="details-book-cover" />
                        <p><strong>{book.title}</strong> </p>
                        <p><strong>{book.author}</strong> </p>
                    </div>
                    <div className="right-column">
                        {book.status === "READING" ? (
                            <p><strong><i>CURRENTLY READING</i></strong></p>
                        ) : book.status === "READ" ? (
                            <p><strong><i>READ ON {book.readDate}</i></strong></p>
                        ) : (
                            <p><strong><i>ON WISHLIST</i></strong></p>
                        )}
                        <p><strong>Genre:</strong> {book.genre}</p>
                        <p><strong>Language:</strong> {book.language}</p>
                        <p><strong>Points:</strong> {book.points}</p>
                        <p><strong>Rating:</strong> {book.rating}</p>
                        <p><strong>Stars:</strong> {book.stars}</p>
                        <div className="speechbubble">
                            <p>{book.note}</p>
                            <span className="username">- {book.username}</span>
                        </div>
                    </div>
                    <div className="button-container">
                        <button type="button" className="form-button" style={{ backgroundColor: '#8d8d8d', border: '#818181' }} onClick={handleEditBook}>
                            <b>EDIT</b>
                        </button>
                        <button type="button" className="form-button" style={{ backgroundColor: '#8b0000', border: '#8b0000' }} onClick={handleDeleteBook}>
                            <b>DELETE</b>
                        </button>
                    </div>
                </div>
            )}
        </div>

    );
};

export default BookDetails;
