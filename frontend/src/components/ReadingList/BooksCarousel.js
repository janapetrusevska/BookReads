import React, {useEffect, useState} from 'react';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import BookCard from "../Books/BookCard";
import BookModal from "../Books/BookModal";
import {fetchBooksByStatus} from "../Service/AxiosService";

const BookCarousel = () => {
    const [showModal, setShowModal] = useState(false);
    const [selectedBook, setSelectedBook] = useState(null);
    const [books, setBooks] = useState([]);
    const token = localStorage.getItem("token");
    const status = "READ";

    useEffect(() => {
        const fetchBooksData = async () => {
            if (token) {
                try {
                    const booksByStatus = await fetchBooksByStatus(token,status);
                    setBooks(booksByStatus);
                } catch (error) {
                    console.log(error);
                }
            }
        };
        fetchBooksData();
    }, [status, token]);

    const onViewDetails = (book) => {
        setSelectedBook(book);
        setShowModal(true);
    }

    const splitBooks = (books,size) => {
        const chucks = [];
        for(let i=0; i<books.length; i+=size){
            chucks.push(books.slice(i, i+size));
        }
        return chucks;
    };

    const bookChunks = splitBooks(books, 5);

    return (
        <>
            <h2>All Read Books</h2>
            <Carousel
                showThumbs={true}
                useKeyboardArrows
                className="carousel"
            >
                <div className="carousel-books">
                    {bookChunks.map((chunk, index) => (
                        <div key={index} style={{ display: 'flex'}}>
                            {chunk.map(book => (
                                <BookCard
                                    key={book.id}
                                    book={book}
                                    onViewDetails={() => onViewDetails(book)}
                                />
                            ))}
                        </div>
                    ))}
                </div>
            </Carousel>
            <BookModal
                show={showModal}
                handleClose={() => setShowModal(false)}
                title="Book Details"
                book={selectedBook}
            />
        </>
    );
};

export default BookCarousel;
