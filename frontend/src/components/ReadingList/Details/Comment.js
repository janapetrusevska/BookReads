import React, {useState} from 'react';
import {RiEditLine} from "react-icons/ri";
import { RiDeleteBin5Line } from "react-icons/ri";
import { MdOutlineCancel } from "react-icons/md";
import { GiConfirmed } from "react-icons/gi";
import {jwtDecode} from "jwt-decode";

const Comment = ({ comment, onEdit, onDelete }) => {
    const token = localStorage.getItem("token");
    const decoded = jwtDecode(token);
    const readerId = decoded.readerId;
    const isLoggedInReader = Number(readerId) === Number(comment.readerId);

    const [isEditing, setIsEditing] = useState(false);
    const [editContent, setEditContent] = useState(comment.content);
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');

        return `${day}.${month}.${year}   ${hours}:${minutes}`;
    };

    const handleEditComment = () => {
        if (editContent.trim() !== "") {
            onEdit(comment.id, editContent);
            setIsEditing(false);
        }
    }

    const handleDeleteComment = () => {
        onDelete(comment.id);
        setShowDeleteModal(false);
    };

    return (
        <div className="comment">
            <div className="comment-info">
                <span className="username">{comment.readerName}</span>
                <span className="timestamp"><i>{formatDate(comment.dateCreated)}</i></span>
                {isEditing ? (
                    <textarea
                        className="comment-edit-textarea"
                        value={editContent}
                        autoFocus
                        onChange={(e) => setEditContent(e.target.value)}
                    />
                ) : (
                    <p className="text">{comment.content}</p>
                )}
            </div>
            {isLoggedInReader && (
                <div className="comment-edit-container">
                    {isEditing ? (
                        <>
                            <GiConfirmed className="comment-icon" onClick={handleEditComment}/>
                            <MdOutlineCancel className="comment-icon" onClick={() => setIsEditing(false)}/>
                        </>
                    ) : (
                        <>
                            <RiEditLine
                                className="comment-icon"
                                onClick={() => setIsEditing(true)}
                            />
                            <RiDeleteBin5Line
                                className="comment-icon"
                                onClick={() => setShowDeleteModal(true)}
                            />
                        </>
                    )}
                </div>
            )}

            {showDeleteModal && (
                <div className="modal-backdrop">
                    <div className="modal-container">
                        <h3>Are you sure you want to delete this comment?</h3>
                        <button className="form-button" onClick={handleDeleteComment}>Yes</button>
                        <button className="form-button" onClick={() => setShowDeleteModal(false)}>No</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Comment;
