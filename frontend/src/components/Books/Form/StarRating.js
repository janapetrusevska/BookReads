import React, {useEffect, useState} from "react";
import EmptyStar from "../../../images/empty-star.png";
import Star from "../../../images/star.png";

const StarRating = ({ onSelect, initialValue = 0 }) => {
    const [hoverIndex, setHoverIndex] = useState(0);
    const [selectedStars, setSelectedStars] = useState(0);

    useEffect(() => {
        setSelectedStars(initialValue);
    }, [initialValue]);

    const handleClick = (index) => {
        setSelectedStars(index);
        onSelect(index);
    };

    return (
        <div className="star-rating">
            {[1, 2, 3, 4, 5].map((star) => (
                <img
                    key={star}
                    src={hoverIndex >= star || selectedStars >= star ? Star : EmptyStar}
                    alt={`${star} star`}
                    className="star"
                    onMouseEnter={() => setHoverIndex(star)}
                    onMouseLeave={() => setHoverIndex(0)}
                    onClick={() => handleClick(star)}
                />
            ))}
        </div>
    );
};

export default StarRating;
