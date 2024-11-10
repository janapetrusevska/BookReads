import React from "react";
import ReadingListForm from "./Form/ReadingListForm";

const ReadingListModal = ({ show, handleClose, title, readingList }) => {
    if (!show) {
        return null;
    }

    return (
        <div className="modal-backdrop">
            <div className="modal-container-reading-list">
                <div className="modal-top-bar">
                    <h2>{title}</h2>
                    <button className="close-modal" onClick={handleClose}>X</button>
                </div>
                {/*{readingList ? (*/}
                {/*    <ReadingListDetails readingList={readingList}/>*/}
                {/*) : (*/}
                    <ReadingListForm />
                {/*)}*/}
            </div>
        </div>
    );
};

export default ReadingListModal;
