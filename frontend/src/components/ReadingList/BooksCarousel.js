import React, {useEffect, useState} from 'react';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import BookCard from "../Books/BookCard";
import BookModal from "../Books/BookModal";
import {fetchBooksByReaderByStatus} from "../Service/AxiosService";

const BookCarousel = ({readerId, isLoggedInReader}) => {
    const [showModal, setShowModal] = useState(false);
    const [selectedBook, setSelectedBook] = useState(null);
    const [books, setBooks] = useState([]);
    const token = localStorage.getItem("token");
    const status = "READ";

    useEffect(() => {
        const fetchBooksData = async () => {
            if (token) {
                try {
                    const booksByStatus = await fetchBooksByReaderByStatus(readerId,token,status);
                    setBooks(booksByStatus);
                } catch (error) {
                    console.log(error);
                }
            }
        };
        fetchBooksData();
    }, [readerId]);

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
            <div className="carousel-container">
                <h2>All Read Books</h2>
                {
                    books.length > 0 ?
                    (
                        <Carousel
                            showThumbs={true}
                            showArrows={true}
                            useKeyboardArrows={true}
                            className="carousel"
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
                    ) : <p>No  read books yet.</p>
                }
                <BookModal
                    show={showModal}
                    handleClose={() => setShowModal(false)}
                    title="Book Details"
                    book={selectedBook}
                    isLoggedInReader={isLoggedInReader}
                />
            </div>

        </>
    );
};

export default BookCarousel;
