import React, { useEffect, useState } from "react";
import BookCard from "../Books/BookCard";
import {fetchBooksByStatus} from "../Service/AxiosService";
import {jwtDecode} from "jwt-decode";
import {Carousel} from "react-responsive-carousel";

const BookSectionByStatus = ({ title, description, status, onViewDetails, image, imageCss}) => {
    const [books, setBooks] = useState([]);
    const token = localStorage.getItem("token");
    const decoded = jwtDecode(token);

    useEffect(() => {
        const fetchBooks = async () => {
            if (token) {
                try {
                    const fetchedBooks = await fetchBooksByStatus(token,status);
                    setBooks(fetchedBooks);
                } catch (error) {
                    console.log(error);
                }
            }
        };
        fetchBooks();
    }, [status, token]);

    const splitBooks = (books,size) => {
        const chucks = [];
        for(let i=0; i<books.length; i+=size){
            chucks.push(books.slice(i, i+size));
        }
        return chucks;
    };

    const bookChunks = splitBooks(books, 7);

    return (
        <div className="book-section">
            <div className="book-section-header">
                <div>
                    <h3>{title}</h3>
                    <p>{description}</p>
                </div>
                {image && <img id={imageCss} src={image} alt="plant"/>}
            </div>
            <div className="book-list-container">
                <Carousel
                    showThumbs={true}
                    showArrows={true}
                    autoPlay
                    interval={6000}
                    useKeyboardArrows={true}
                    className="carousel-home-page"
                >
                    {bookChunks.map((chunk, index) => (
                        <div key={index} className="carousel-books">
                            <div style={{ display: 'flex' }}>
                                {chunk.map(book => (
                                    <BookCard
                                        key={book.id}
                                        book={book}
                                        onViewDetails={() => onViewDetails(book)}
                                    />
                                ))}
                            </div>
                        </div>
                    ))}
                </Carousel>
            </div>
        </div>
    );
};

export default BookSectionByStatus;
