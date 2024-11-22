import React, {useEffect, useState} from "react";
import {deleteReadingList, fetchBooksByIds} from "../../Service/AxiosService";
import ReadingListForm from "../Form/ReadingListForm";
import BookCardInReadingList from "../../Books/BookCardInReadingList";

const ReadingListDetails = ({ readingList, isLoggedInReader }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [books, setBooks] = useState([]);
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
        fetchBooks();
    }, [readingList.books, token]);

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
    };

    return(
        <>
            { isEditing ? (
                <ReadingListForm readingList={readingList} closeForm={() => setIsEditing(false)}/>
            ) : (
                <div className="modal-form-container">
                    <div className="books-container-reading-list">
                        <p>{readingList.description}</p>
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
                    </div>
                    {
                        isLoggedInReader ?
                            <div className="button-container">
                                <button type="button"
                                        className="form-button-edit"
                                        onClick={handleEditReadingList}>
                                    <b>EDIT</b>
                                </button>
                                <button type="button"
                                        className="form-button-delete"
                                        onClick={handleDeleteReadingList}>
                                    <b>DELETE</b>
                                </button>
                            </div> : <></>
                    }
                </div>
            )}
        </>
    )

}

export default ReadingListDetails;