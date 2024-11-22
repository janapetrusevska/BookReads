import React, {useState} from "react";
import BookForm from "../Form/BookForm";
import {changeBookStatus, deleteBook} from "../../Service/AxiosService";
import Star from "../../../images/star.png";

const BookDetails = ({ book, isLoggedInReader }) => {
    const [isEditing, setIsEditing] = useState(false);
    const token = localStorage.getItem("token");
    const bookId = book.id;

    const changeStatusToRead = () => changeStatus("READ");
    const changeStatusToReading = () => changeStatus("READING");

    const handleDeleteBook = async () => {
        try{
            await deleteBook(bookId, token);
            window.location.reload();
        } catch (error){
            console.log(error);
        }
    }

    const handleEditBook =  () => {
        setIsEditing(true);
    }

    const changeStatus = async (newStatus) => {
        try {
            await changeBookStatus(bookId, newStatus, token);
            window.location.reload();
        } catch (error) {
            console.log(error);
        }
    };

    console.log(book);
    return(
        <div>
            {isEditing ? (
                <BookForm book={book} closeForm={() => setIsEditing(false)} />
            ) : (
                <div className="modal-form-container">
                    <div className="left-column">
                        <img src={book.coverUrl} alt="book cover" className="details-book-cover" />
                        <div className="speechbubble">
                            <p>{book.note}</p>
                            <span className="username">{book.username}</span>
                        </div>
                    </div>
                    <div className="right-column-details">
                        <div className="details-title">
                            <h1><strong>{book.title}</strong></h1>
                            <h3><strong>{book.author}</strong></h3>
                        </div>
                        {
                            [...Array(book.stars)].map((_, index) => (
                                <img key={index} src={Star} alt="star" width="40px" height="40px"/>
                            ))
                        }
                        <p><strong>Genre:</strong> {book.genre}</p>
                        <p><strong>Language:</strong> {book.language}</p>
                        <p><strong>Points:</strong> {book.points}</p>

                        {book.status === "READING" ? (
                            <p><strong><i>CURRENTLY READING</i></strong></p>
                        ) : book.status === "READ" ? (
                            <p><strong><i>READ ON {book.readDate}</i></strong></p>
                        ) : (
                            <p><strong><i>ON WISHLIST</i></strong></p>
                        )}
                    </div>
                    { isLoggedInReader ?
                        <div className="button-container">
                            {book.status === "READING" && (
                                <button type="button" className="form-button" onClick={changeStatusToRead}>
                                    <b>MARK AS READ</b>
                                </button>
                            )}
                            {book.status === "WISHLIST" && (
                                <button type="button" className="form-button" onClick={changeStatusToReading}>
                                    <b>MARK AS READING</b>
                                </button>
                            )}
                            <button type="button"
                                    className="form-button-edit"
                                    onClick={handleEditBook}>
                                <b>EDIT</b>
                            </button>
                            <button type="button"
                                    className="form-button-delete"
                                    onClick={handleDeleteBook}>
                                <b>DELETE</b>
                            </button>
                        </div> : <></>
                    }

                </div>
            )}
        </div>

    );
};

export default BookDetails;
