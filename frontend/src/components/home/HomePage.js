import React, {useState} from "react";
import HomeSection from "./HomeSection";
import AddBookModal from "../Book/AddBookModal";

const HomePage = () => {
    const [showModal, setShowModal] = useState(false);

    return(
        <div className="home-container">
            <h1>Welcome to your book world.</h1>
            <HomeSection
                title="Currently reading!"
                status="READING"
                onAddBook={() => setShowModal(true)}/>
            <HomeSection
                title="Already read"
                status="READ"
                onAddBook={() => setShowModal(true)}/>
            <HomeSection
                title="Wishlist"
                status="WISHLIST"
                onAddBook={() => setShowModal(true)}/>
            <AddBookModal
                show={showModal}
                handleClose={() => setShowModal(false)}
            />
        </div>
    )
}

export default HomePage;