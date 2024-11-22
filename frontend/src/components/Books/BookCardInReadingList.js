import React from "react";
import Star from "../../images/star.png"

const BookCardInReadingList = ({ book }) => {
    return (
        <div className="book-card-reading-list">
            <div className="book-card-reading-list-photo">
                <img src={book.coverUrl} alt="book cover" className="home-book-cover" />
            </div>
            <div className="book-card-reading-list-info">
                <div key={`${book.id}-${book.title}`}>
                    <h3><b><i>{book.title}</i></b></h3>
                    <h5>By <b>{book.author}</b></h5>
                    <p>Genre: {book.genre}</p>
                    {
                        [...Array(book.stars)].map((_, index) => (
                            <img key={index} src={Star} alt="star" width="20px" height="20px"/>
                        ))
                    }
                </div>
            </div>
        </div>
    );
};

export default BookCardInReadingList;