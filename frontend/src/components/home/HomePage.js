import React, {useState} from "react";
import BookSectionByStatus from "./BookSectionByStatus";
import BookModal from "../Books/BookModal";

const HomePage = () => {
    const [showModal, setShowModal] = useState(false);
    const [selectedBook, setSelectedBook] = useState(null);
    const token = localStorage.getItem("token");

    const handleOpenModal = (book) => {
        setSelectedBook(book);
        setShowModal(true);
    }

    console.log("Selected book", selectedBook);

    return(
        token ? (
                <div className="home-container">
                    <h1>Welcome to your book world.</h1>
                    <BookSectionByStatus
                        title="Currently reading!"
                        status="READING"
                        onAddBook={() => handleOpenModal(null)}
                        onViewDetails={handleOpenModal}
                    />
                    <BookSectionByStatus
                        title="Already read"
                        status="READ"
                        onAddBook={() => handleOpenModal(null)}
                        onViewDetails={handleOpenModal}
                    />
                    <BookSectionByStatus
                        title="Wishlist"
                        status="WISHLIST"
                        onAddBook={() => handleOpenModal(null)}
                        onViewDetails={handleOpenModal}
                    />
                    <BookModal
                        show={showModal}
                        handleClose={() => setShowModal(false)}
                        title={selectedBook ? "Book Details" : "Add a New Book"}
                        book={selectedBook}
                    />
                </div>
            ) : (
                <div>
                    <h1>Welcome to your book world.</h1>
                    <h3>Log in or register now so you can create your own library.</h3>
                </div>
            )
    )
}

export default HomePage;