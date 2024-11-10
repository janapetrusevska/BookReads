import React, {useEffect, useState} from "react";
import FormField from "../../Books/Form/BookFormField";
import Select from 'react-select'
import {createReadingList, fetchBooks} from "../../Service/AxiosService";

const ReadingListForm = () => {
    const [books, setBooks] = useState([]);
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        books: books,
    });
    const token = localStorage.getItem("token");

    useEffect(() => {
        const fetch = async () =>{
            try{
                const fetchedBooks = await fetchBooks(token);
                const bookOptions = fetchedBooks.map(book => ({
                    label: book.title,
                    value: book.id
                }));
                setBooks(bookOptions);
            } catch (error){
                console.log(error.message || "An error occurred");
            }
        }
        fetch();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSelectChange = (selectedOptions) => {
        setFormData((prevData) => ({
            ...prevData,
            books: selectedOptions.map(option => option.value)
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const readingListDto = {
            title: formData.title,
            description: formData.description,
            books: formData.books
        };

        const data = new FormData();
        data.append('readingListDto', JSON.stringify(readingListDto));

        try{
            await createReadingList(readingListDto,token);
            window.location.reload();
        } catch (error){
            console.log(error);
        }
    };

    return(
        <form className="modal-form-container" onSubmit={handleSubmit}>
            <FormField label="Title" name="title" type="text"
                       value={formData.title} required onChange={handleChange} />
            <div className="reading-list-select-field">
                <label>Books</label>
                <Select
                    name="books"
                    isMulti
                    options={books}
                    placeholder=" "
                    className="reading-list-select"
                    onChange={handleSelectChange}
                />
            </div>
            <FormField label="Description" name="description" type="textarea"
                       value={formData.description} rows={10} cols={82} onChange={handleChange} />
            <button type="submit" className="form-button">
                <b>CREATE READING LIST</b>
            </button>
        </form>
    )
};

export default ReadingListForm;
