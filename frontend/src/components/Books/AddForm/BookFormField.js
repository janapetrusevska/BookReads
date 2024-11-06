import React, {useState} from "react";
import ImageModal from "../BookDetails/ImageModal";

const FormField = ({
                   label,
                   name,
                   type,
                   options,
                   onChange,
                   value,
                   max,
                   min,
                   placeholder,
                   bookCover}) => {
    const [showModal, setShowModal] = useState(false);

    const handleViewCover = () => {
        console.log("Opening modal");
        setShowModal(true);
    };

    const handleCloseModal = () => {
        console.log("Closing modal");
        setShowModal(false);
    };

    if (type === "select") {
        return (
            <div className="form-field-add">
                <label>{label}</label>
                <select name={name} value={value} required onChange={onChange}>
                    <option value="">Select a {label.toLowerCase()}</option>
                    {options.map((option, index) => (
                        <option key={index} value={option}>
                            {option}
                        </option>
                    ))}
                </select>
            </div>
        );
    }

    if (type === "textarea") {
        return (
            <div className="form-field-add">
                <label>{label}</label>
                <textarea name={name} value={value} rows="5" cols="37" onChange={onChange}/>
            </div>
        );
    }

    if (type === "file") {
        return (
            <>
                <div className="form-field-file-add">
                    <label>{label}</label><br />
                    <div className="form-field-file-add-content">
                        <input
                            type="file"
                            name={name}
                            accept="image/*"
                            onChange={onChange}
                        />
                        {bookCover && (
                            <div className="cover-notification">
                                <button className="view-button" onClick={handleViewCover}>
                                    <b>VIEW</b>
                                </button>
                            </div>
                        )}
                    </div>
                </div>

                {/* Conditionally render the ImageModal based on showModal */}
                {showModal && <ImageModal imageUrl={bookCover} onClose={handleCloseModal} />}
            </>
        );
    }


    return (
        <div className="form-field-add">
            <label>{label}</label>
            <input
                type={type}
                name={name}
                onChange={onChange}
                value={value}
                max={max}
                min={min}
                placeholder={placeholder}
            />
        </div>
    );
};

export default FormField;