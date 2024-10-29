import React from "react";
import BookForm from "./AddForm/BookForm";
import BookDetails from "./BookDetails/BookDetails";

const BookModal = ({ show, handleClose, title, book }) => {
    if (!show) {
        return null;
    }

    return (
        <div className="modal-backdrop">
            <div className="modal-container">
                <div className="modal-top-bar">
                    <h2>{title}</h2>
                    <button onClick={handleClose}>X</button>
                </div>
                {book ? (
                    <BookDetails book={book}/>
                ) : (
                    <BookForm />
                )}
            </div>
        </div>
    );
};

export default BookModal;
