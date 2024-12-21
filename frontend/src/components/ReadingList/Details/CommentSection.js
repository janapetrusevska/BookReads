import React, {useEffect, useState} from "react";
import {addComment, deleteComment, editComment, fetchAllCommentsForReadingList} from "../../Service/AxiosService";
import Comment from "./Comment";
import CommentInput from "./CommentInput";

const CommentSection = ({readingListId, readerName}) => {
    const [comments, setComments] = useState([]);
    const token = localStorage.getItem("token");

    useEffect(() => {
        const fetchComments = async () => {
            try{
                const allComments = await fetchAllCommentsForReadingList(readingListId);
                setComments(allComments);
            } catch (error){
                console.log(error.message);
            }
        }
        fetchComments();
    },[])

    console.log(comments);

    const handleAddComment = async (commentText) => {
        const newComment = {
            readerName: readerName,
            dateCreated: new Date().toISOString(),
            content: commentText,
        };
        setComments([...comments, newComment]);
        try{
            const comment = await addComment(readingListId,commentText,token);
            setComments([...comments,comment]);
        } catch (error){
            console.error("Error adding comment:", error.message);
        }
    };

    const handleEditComment = async (commentId, updatedContent) => {
        try{
            const updatedComment = await editComment(commentId,updatedContent,token);
            setComments((prevComment) =>
            prevComment.map((comment) =>
                comment.id === commentId ? updatedComment : comment
            ));
        } catch (error){
            console.log("Error editing comment ", error.message);
        }
    };

    const handleDeleteComment = async (commentId) => {
        try{
            await deleteComment(commentId,token);
            setComments((prevComments) =>
                prevComments.filter((comment) => comment.id !== commentId)
            );
        } catch (error){
            console.log("Error deleting comment ", error.message);
        }
    };

    return(
        <>
            <h2>Comments Section</h2>
            <div>
                { comments.map((comment,index) => (
                    <Comment
                        key={index}
                        comment={comment}
                        onEdit={handleEditComment}
                        onDelete={handleDeleteComment}
                    />
                ))}
            </div>
            <CommentInput onAddComment={handleAddComment}/>
        </>
    )
}

export default CommentSection;