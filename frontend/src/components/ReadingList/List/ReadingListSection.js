import React, {useEffect, useState} from "react";
import ReadingListCard from "../ReadingListCard";
import {fetchReadingLists} from "../../Service/AxiosService";

const ReadingListSection = ({name, showModal}) => {
    const [readingLists, setReadingLists] = useState([]);
    const token = localStorage.getItem("token");

    useEffect(() => {
        const getReadingLists = async () => {
            if (token) {
                try {
                    const lists = await fetchReadingLists(token);
                    setReadingLists(lists);
                    console.log(lists);
                } catch (error) {
                    console.error(error);
                }
            }
        };
        getReadingLists();
    }, [token]);

    return(
        <div>
            <div className="reading-list-title">
                <div>
                    <h2>Reading Lists</h2>
                    <p>Take a look at all of {name}'s reading lists</p>
                </div>
                <div>
                    <button type="submit" onClick={showModal}>
                        <b>+</b>
                    </button>
                </div>
            </div>

            <div className="reading-list-section">
                {readingLists.map((list,index) => (
                    <ReadingListCard key={index} listInfo={list}/>
                ))}
            </div>
        </div>
    )
}

export default ReadingListSection;