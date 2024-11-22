import React from "react";

const BookCard = ({ book, onViewDetails }) => {
    return (
        <div className="book-card" onClick={onViewDetails}>
            <img src={book.coverUrl} alt="book cover" className="home-book-cover" />
            <div key={`${book.id}-${book.title}`}>
                <b><i>{book.title}</i></b>
            </div>
            <p>{book.author}</p>
        </div>
    );
};

export default BookCard;