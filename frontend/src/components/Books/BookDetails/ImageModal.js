import React from 'react';
import "./../../../styles.css";

const ImageModal = ({ imageUrl, onClose }) => {
    if (!imageUrl) return null;

    const handleOverlayClick = () => {
        console.log("Overlay clicked, closing modal");
        onClose();
    };

    const handleContentClick = (e) => {
        e.stopPropagation();
        console.log("Content clicked, not closing modal");
    };

    return (
        <div className="image-modal-overlay" onClick={handleOverlayClick}>
            <div className="image-modal-content" onClick={handleContentClick}>
                <img src={imageUrl} alt="Book Cover" className="image-modal-img" />
                <button className="close-button" onClick={onClose}>X</button>
            </div>
        </div>
    );
};

export default ImageModal;