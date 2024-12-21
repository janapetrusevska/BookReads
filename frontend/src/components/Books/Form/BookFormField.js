import React from "react";

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
                   bookCover,
                   required,
                   rows,
                   cols,
                   imageShow}) => {

    const handleViewCover = (e) => {
        e.preventDefault();
        if(imageShow){
            imageShow(true);
        }
    };
    if (type === "select") {
        return (
            <div className="form-field-add">
                <label>{label}</label>
                <select name={name} value={value} required={required} onChange={onChange}>
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
                <textarea name={name} value={value} rows={rows} cols={cols} placeholder={placeholder} style={{"fontSize":"16px", "fontFamily":"Arial"}} onChange={onChange}/>
            </div>
        );
    }

    console.log(bookCover);

    if (type === "file") {
        return (
            <>
                <div className="form-field-file-add">
                    <label>{label}</label><br />
                    <div className="form-field-file-add-content">
                        <input
                            type="file"
                            name={bookCover ? bookCover : name}
                            accept="image/*"
                            onChange={onChange}
                        />
                        {bookCover && (
                            <div className="cover-notification">
                                <button className="view-button" onClick={handleViewCover}>
                                    <b>VIEW COVER</b>
                                </button>
                            </div>
                        )}
                    </div>
                </div>
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