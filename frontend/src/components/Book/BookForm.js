import React, {useEffect, useState} from "react";
import FormField from "./BookFormField";
import axios from "axios";

const BookForm = () => {
    const [genres, setGenres] = useState([]);
    const [cover, setCover] = useState(null);
    const [formData, setFormData] = useState({
        title: '',
        author: '',
        language: '',
        rating: '',
        stars: '',
        points: '',
        readDate: '',
        genre: '',
        status: '',
        note: ''
    });

    const statuses = ["READ", "READING", "WISHLIST"];
    const token = localStorage.getItem("token");
    console.log("Token:", token);

    useEffect(() => {
        const fetchGenres = async () => {
            try{
                const response = await axios.get("http://localhost:8080/api/books/genres", {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                setGenres(response.data);
                console.log(response.data);
            } catch (error){
                console.log(error);
            }
        };
        fetchGenres();
    },[token]);


    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setCover(file);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const bookDtoRequest = {
            title: formData.title,
            author: formData.author,
            language: formData.language,
            rating: formData.rating,
            stars: formData.stars,
            points: formData.points,
            readDate: formData.readDate,
            genre: formData.genre,
            status: formData.status,
            note: formData.note
        };

        const data = new FormData();
        data.append('bookDtoRequest', JSON.stringify(bookDtoRequest));
        if (cover) {
            data.append('cover', cover);
        }

        try {
            const response = await axios.post("http://localhost:8080/api/books/add", data, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${token}`,
                },
            });
            window.location.reload();
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="left-column">
                <FormField label="Title" name="title" type="text" required onChange={handleChange} />
                <FormField label="Author" name="author" type="text" required onChange={handleChange} />
                <FormField label="Language" name="language" type="text" required onChange={handleChange} />
                <FormField label="Rating" name="rating" type="number" required min="1" max="5" step="0.5" onChange={handleChange} />
                <FormField label="Stars" name="stars" type="number" required min="1" max="5" step="0.5" onChange={handleChange} />
                <FormField label="Points" name="points" type="number" required max="10" onChange={handleChange} />
            </div>
            <div className="right-column">
                <FormField label="Date" name="readDate" type="date" required onChange={handleChange} />
                <FormField label="Genre" name="genre" type="select" options={genres} required onChange={handleChange} />
                <FormField label="Status" name="status" type="select" options={statuses} required onChange={handleChange} />
                <FormField label="Cover" name="cover" type="file" onChange={handleFileChange} required />
                <FormField label="Note" name="note" type="textarea" required onChange={handleChange} />
            </div>
            <button type="submit" className="form-button">
                <b>ADD BOOK</b>
            </button>
        </form>
    );
}

export default BookForm;