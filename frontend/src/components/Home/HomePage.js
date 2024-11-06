import React, {useState} from "react";
import BookSectionByStatus from "./BookSectionByStatus";
import BookModal from "../Books/BookModal";
import WelcomePage from "./WelcomePage";

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
                        description="All of the books that you are enjoying right now."
                        status="READING"
                        onAddBook={() => handleOpenModal(null)}
                        onViewDetails={handleOpenModal}
                    />
                    <BookSectionByStatus
                        title="Already read"
                        description="This is your past book experience in one place."
                        status="READ"
                        onAddBook={() => handleOpenModal(null)}
                        onViewDetails={handleOpenModal}
                    />
                    <BookSectionByStatus
                        title="Wishlist"
                        description="What will be your next read? Look through these books to find the one."
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
                    <WelcomePage/>
                </div>
            )
    )
}

export default HomePage;