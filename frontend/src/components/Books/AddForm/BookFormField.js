import React from "react";

const FormField = ({ label, name, type, options, onChange, value }) => {
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
            <div className="form-field-add">
                <label>{label}</label>
                <input
                    type="file"
                    name={name}
                    accept="image/*"
                    onChange={onChange}
                />
            </div>
        );
    }

    return (
        <div className="form-field-add">
            <label>{label}</label>
            <input
                type={type}
                name={name}
                onChange={onChange}
                value={value}/>
        </div>
    );
};

export default FormField;