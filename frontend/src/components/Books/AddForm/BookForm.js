import React, {useEffect, useState} from "react";
import FormField from "./BookFormField";
import axios from "axios";
import ToggleSwitch from "./ToggleSwitch";

const BookForm = ({book}) => {
    const [genres, setGenres] = useState([]);
    const [cover, setCover] = useState(null);
    const [useUrl, setUseUrl] = useState(false);
    const isEditMode = Boolean(book);
    console.log("in form",book);

    const [formData, setFormData] = useState({
        title: '',
        author: '',
        language: '',
        rating: '',
        stars: '',
        points: '',
        readDate: '',
        genre: '',
        cover: '',
        status: '',
        note: ''
    });

    const statuses = ["READ", "READING", "WISHLIST"];
    const token = localStorage.getItem("token");

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

    useEffect(() => {
        if (book) {
            setFormData({
                title: book.title || '',
                author: book.author || '',
                language: book.language || '',
                rating: book.rating || '',
                stars: book.stars || '',
                points: book.points || '',
                readDate: book.readDate || '',
                genre: book.genre || '',
                cover: book.cover || '',
                status: book.status || '',
                note: book.note || ''
            });
        }
    }, [book]);


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
            cover: formData.cover,
            note: formData.note
        };

        const data = new FormData();
        data.append('bookDtoRequest', JSON.stringify(bookDtoRequest));
        if (cover) {
            data.append('cover', cover);
        }

        try {
            if (isEditMode) {
                await axios.put(`http://localhost:8080/api/books/update/${book.id}`, data, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        Authorization: `Bearer ${token}`,
                    },
                });
            } else {
                await axios.post("http://localhost:8080/api/books/add", data, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        Authorization: `Bearer ${token}`,
                    },
                });
            }
            window.location.reload();
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="modal-form-container">
            <div className="left-column">
                <FormField label="Title" name="title" type="text" value={formData.title} required onChange={handleChange} />
                <FormField label="Author" name="author" type="text" value={formData.author} required onChange={handleChange} />
                <FormField label="Language" name="language" type="text" value={formData.language} required onChange={handleChange} />
                <FormField label="Rating" name="rating" type="number" value={formData.rating} required min="1" max="5" step="0.1" onChange={handleChange} />
                <FormField label="Stars" name="stars" type="number" value={formData.stars} required min="1" max="5" step="0.5" onChange={handleChange} />
                <FormField label="Points" name="points" type="number" value={formData.points} required max="10" onChange={handleChange} />
            </div>
            <div className="right-column">
                <FormField label="Date" name="readDate" type="date" value={formData.readDate} required onChange={handleChange} />
                <FormField label="Genre" name="genre" type="select" options={genres} value={formData.genre} required onChange={handleChange} />
                <FormField label="Status" name="status" type="select" options={statuses} value={formData.status} required onChange={handleChange} />
                {useUrl ? (
                    <FormField label="Cover URL" name="cover" type="text" value={formData.cover} onChange={handleChange} />
                ) : (
                    <FormField label="Cover File" name="cover" type="file" onChange={handleFileChange} />
                )}
                <ToggleSwitch Name="Cover" onChange={() => setUseUrl(!useUrl)} />
                <FormField label="Note" name="note" type="textarea" value={formData.note} required onChange={handleChange} />
            </div>
            <button type="submit" className="form-button">
                <b>{isEditMode ? "UPDATE BOOK" : "ADD BOOK"}</b>
            </button>
        </form>
    );
}

export default BookForm;