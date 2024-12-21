import React, {useEffect, useState} from "react";
import {deleteReadingList, fetchBooksByIds, fetchIsReadingListLiked} from "../../Service/AxiosService";
import BookCardInReadingList from "../../Books/BookCardInReadingList";
import HeartIcon from "../Icons/HeartIcon";
import CommentSection from "./CommentSection";
import {RiEditLine} from "react-icons/ri";
import { RiDeleteBin5Line } from "react-icons/ri";
import ReadingListModal from "../ReadingListModal";

const ReadingListDetails = ({ readingList, isLoggedInReader, readerName, handleGoBack }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [isLiked, setIsLiked] = useState(false);
    const [books, setBooks] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [showDeleteReadingListModal, setShowDeleteReadingListModal] = useState(false);
    const token = localStorage.getItem("token");
    const readingListId = readingList.id;

    useEffect(() => {
        const fetchBooks = async () => {
            try {
                const fetchedBooks = await fetchBooksByIds(readingList.books, token);
                setBooks(fetchedBooks);
            } catch (error) {
                console.log("Error fetching books:", error);
            }
        };

        const fetchIsLiked = async () => {
            try {
                const likedStatus = await fetchIsReadingListLiked(readingListId, token);
                setIsLiked(likedStatus);
            } catch (error) {
                console.error("Error checking like status:", error);
            }
        };

        fetchBooks();
        fetchIsLiked();
    }, [readingList.books, token, readingListId]);

    const handleDeleteReadingList = async () => {
        try{
            await deleteReadingList(readingListId, token);
            window.location.reload();
        } catch (error){
            console.log(error);
        }
    }

    const handleEditReadingList = () => {
        setIsEditing(true);
        setShowModal(true);
    };

    const handleCloseEditReadingList = () => {
        setIsEditing(false);
        setShowModal(false);
    };

    return(
        <>
            <div className="books-container-reading-list-details">
                <div className="books-container-reading-list-header">
                    <div className="books-container-reading-text">
                        <button
                            type="button"
                            onClick={handleGoBack}>
                            <b>GO BACK</b>
                        </button>
                        <h2>{readingList.title}</h2>
                        <p>{readingList.description}</p>
                    </div>
                    <div className="reading-list-buttons">
                        {isLoggedInReader ?
                        <div className="reading-list-icons">
                            <RiEditLine
                                className="comment-icon"
                                onClick={handleEditReadingList}
                            />
                            <RiDeleteBin5Line
                                className="comment-icon"
                                onClick={() => setShowDeleteReadingListModal(true)}
                            />
                        </div>
                            : <></>}
                        <HeartIcon
                            isLiked={isLiked}
                            readingListId={readingList.id}
                            token={token}
                            numLikes={readingList.numberOfLikes}
                            isLoggedInReader={isLoggedInReader}
                            onLikesUpdated={(newLikes) => {
                                readingList.numberOfLikes = newLikes;
                            }}
                        />
                    </div>
                </div>
                {books.length > 0 ? (
                    <div className="book-cards">
                        {books.map((book) => (
                            <BookCardInReadingList
                                key={book.id}
                                book={book}
                            />
                        ))}
                    </div>
                ) : (
                    <p>No books found in this reading list.</p>
                )}
                <CommentSection
                    readingListId={readingListId}
                    readerName={readerName}/>
                {showDeleteReadingListModal && (
                    <div className="modal-backdrop">
                        <div className="modal-container">
                            <h3>Are you sure you want to delete this reading list?</h3>
                            <button className="form-button" onClick={handleDeleteReadingList}>Yes</button>
                            <button className="form-button" onClick={() => setShowDeleteReadingListModal(false)}>No</button>
                        </div>
                    </div>
                )}
            </div>
            <ReadingListModal
                show={showModal}
                handleClose={handleCloseEditReadingList}
                title="Edit book collection"
                readingList={readingList}
                isLoggedInReader={isLoggedInReader}
                isEditing={true}
            />
        </>
    )

}

export default ReadingListDetails;