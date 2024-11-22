import React, { useState } from "react";
import EmptyHeart from "../../../images/empty.png";
import FilledHeart from "../../../images/heart.png";

const HeartIcon = ({ isLiked = false, onToggle }) => {
    const [liked, setLiked] = useState(isLiked);

    const handleClick = () => {
        setLiked(!liked);
        onToggle(!liked);
    };

    return (
        <img
            src={liked ? FilledHeart : EmptyHeart}
            alt={liked ? "Liked" : "Not liked"}
            className="heart-icon"
            onClick={handleClick}
        />
    );
};

export default HeartIcon;
