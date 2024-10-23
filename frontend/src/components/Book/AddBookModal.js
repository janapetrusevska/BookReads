import React from "react";
import BookForm from "./BookForm";


const AddBookModal = ({ show, handleClose }) => {
    if (!show) {
        return null;
    }

    return (
        <div className="modal-backdrop">
            <div className="modal-container">
                <div className="modal-top-bar">
                    <h2>Add a New Book</h2>
                    <button onClick={handleClose}>X</button>
                </div>
                <BookForm/>
            </div>
        </div>
    );
};

export default AddBookModal;