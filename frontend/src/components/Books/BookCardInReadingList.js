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
                    <h4>By <b>{book.author}</b></h4>
                    <p>Genre: {book.genre}</p>
                    {
                        [...Array(book.stars)].map((_, index) => (
                            <img key={index} src={Star} alt="star" width="30px" height="30px"/>
                        ))
                    }
                </div>

                {/* The note will appear when hovering over the entire card */}
                <div className="speechbubble left book-card-reading-list-note">
                    <p>{book.note}</p>
                    <span className="username">{book.username}</span>
                </div>
            </div>
        </div>
    );
};

export default BookCardInReadingList;