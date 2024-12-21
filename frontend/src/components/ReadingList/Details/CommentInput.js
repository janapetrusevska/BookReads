import React, { useState } from 'react';

const CommentInput = ({ onAddComment }) => {
    const [commentText, setCommentText] = useState('');

    const handleInputChange = (e) => {
        setCommentText(e.target.value);
    };

    const handleSubmit = () => {
        if (commentText.trim()) {
            onAddComment(commentText);
            setCommentText('');
        }
    };

    return (
        <>
        <div className="comment-input">
            <textarea
                value={commentText}
                onChange={handleInputChange}
                placeholder="Write a comment..."
                className="comment-textarea"
            />
        </div>
        <div className="comment-btn-container">
            <button className="comment-btn" onClick={handleSubmit}>
                COMMENT
            </button>
        </div>
        </>
    );
};

export default CommentInput;
