import React, {useEffect, useState} from "react";
import ReadingListCard from "../ReadingListCard";
import {fetchReadingLists} from "../../Service/AxiosService";

const ReadingListSection = ({readerId, name, showModal, isLoggedInReader}) => {
    const [readingLists, setReadingLists] = useState([]);
    const token = localStorage.getItem("token");

    useEffect(() => {
        const getReadingLists = async () => {
            if (token) {
                try {
                    const lists = await fetchReadingLists(token,readerId);
                    setReadingLists(lists);
                    console.log(lists);
                } catch (error) {
                    console.error(error);
                }
            }
        };
        getReadingLists();
    }, [token, readerId]);

    const handleOnViewDetails = (list) => {
        showModal(list);
    }

    const handleShowForm = () => {
        showModal(null);
    };

    return(
        <div>
            <div className="reading-list-title">
                <div>
                    <h2>Reading Lists</h2>
                    {
                        readingLists.length > 0 ?
                            <p>Take a look at all of {name}'s reading lists.</p> :
                            <p>{name} hasn't created any reading lists yet.</p>
                    }
                </div>
                <div>
                    {
                        isLoggedInReader ?
                            <button type="submit"  className="circle-button" onClick={handleShowForm}>
                                <b>+</b>
                            </button> : <></>
                    }
                </div>
            </div>

            <div className="reading-list-section">
                {readingLists.map((list,index) => (
                    <ReadingListCard
                        key={index}
                        listInfo={list}
                        onViewDetails={() => handleOnViewDetails(list)}/>
                ))}
            </div>
        </div>
    )
}

export default ReadingListSection;