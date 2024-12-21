import React, {useEffect, useState} from "react";
import EmptyHeart from "../../../images/empty.png";
import FilledHeart from "../../../images/heart.png";
import {likeReadingList, unlikeReadingList} from "../../Service/AxiosService";

const HeartIcon = ({ isLiked , readingListId, numLikes, onLikesUpdated, isLoggedInReader }) => {
    const [liked, setLiked] = useState(isLiked);
    let [likes, setLikes] = useState(numLikes);
    const token = localStorage.getItem("token");

    useEffect(() => {
        setLiked(isLiked);
    }, [isLiked]);

    const handleClick = async () => {
        try {
            if (liked) {
                const updatedList = await unlikeReadingList(readingListId, token);
                setLikes(updatedList.numberOfLikes);
            } else {
                const updatedList = await likeReadingList(readingListId, token);
                setLikes(updatedList.numberOfLikes);
            }
            setLiked(!liked);
            onLikesUpdated && onLikesUpdated(likes);
        } catch (error) {
            console.error("Error toggling like:", error);
        }
    };

    return (
        <div className="likes-container">
            {
                !isLoggedInReader ?

                    <img
                        src={liked ? FilledHeart : EmptyHeart}
                        alt={liked ? "Liked" : "Not liked"}
                        className="heart-icon"
                        onClick={handleClick}
                    />
                    : <></>
            }
            {
                likes!==1 ?
                    <p>{likes} likes</p>
                    :
                    <p>{likes} like</p>
            }
        </div>
    );
};

export default HeartIcon;
