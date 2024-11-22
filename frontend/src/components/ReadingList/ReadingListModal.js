import React, {useState} from "react";
import ReadingListForm from "./Form/ReadingListForm";
import ReadingListDetails from "./Details/ReadingListDetails";
import HeartIcon from "./Icons/HeartIcon";

const ReadingListModal = ({ show, handleClose, title, readingList, isLoggedInReader }) => {
    const [isLiked, setIsLiked] = useState(false);

    if (!show) {
        return null;
    }

    const handleToggleLike = (liked) => {
        setIsLiked(liked);
    };

    return (
        <div className="modal-backdrop">
            <div className="modal-container-reading-list">
                <div className="modal-top-bar">
                    <h2>{title ? title : readingList.title}</h2>
                    {readingList && (
                        <HeartIcon
                            isLiked={isLiked}
                            onToggle={handleToggleLike}
                        />
                    )}
                    <button className="close-modal" onClick={handleClose}>X</button>
                </div>
                {readingList ? (
                    <ReadingListDetails readingList={readingList} isLoggedInReader={isLoggedInReader}/>
                ) : (
                    <ReadingListForm />
                )}
            </div>
        </div>
    );
};

export default ReadingListModal;
