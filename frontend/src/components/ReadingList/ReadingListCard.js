import React from "react";
import {Card} from "react-bootstrap";
import Photo from "../../images/books.jpg"

const ReadingListCard = ({listInfo, onViewDetails}) => {
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();

        return `${day}.${month}.${year} `;
    };

    const shortDescription = listInfo.description.toString().substring(0,235) + "...";

    return(
        <div className="reading-list-card-container">
            <Card className="reading-list-card" onClick={onViewDetails}>
                <Card.Img variant="top" src={Photo} className="reading-list-card-image"/>
                <Card.Body className="reading-list-card-body">
                    <h4>{listInfo.title}</h4>
                    <p className="reading-list-date"><i>{formatDate(listInfo.dateCreated)}</i></p>
                    <Card.Text>
                        {shortDescription}
                    </Card.Text>
                </Card.Body>
            </Card>
        </div>
    )
}

export default ReadingListCard;