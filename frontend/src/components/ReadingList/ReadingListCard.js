import React from "react";
import {Card} from "react-bootstrap";
import Photo from "../../images/books.jpg"

const ReadingListCard = ({listInfo, onViewDetails}) => {
    return(
        <div className="reading-list-card-container">
            <Card className="reading-list-card" onClick={onViewDetails}>
                <Card.Img variant="top" src={Photo} className="reading-list-card-image"/>
                <Card.Body className="reading-list-card-body">
                    <h4>{listInfo.title}</h4>
                    <p className="reading-list-date"><i>{listInfo.dateCreated}</i></p>
                    <Card.Text>
                        {listInfo.description}
                    </Card.Text>
                </Card.Body>
            </Card>
        </div>
    )
}

export default ReadingListCard;