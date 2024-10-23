import React from "react";

const FormField = ({ label, name, type, required, options, onChange }) => {
    if (type === "select") {
        return (
            <div className="form-field-add">
                <label>{label}</label>
                <select name={name} required onChange={onChange}>
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
                <textarea name={name} rows="7" cols="37" required onChange={onChange}/>
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
                    required
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
                required={required}
                onChange={onChange}/>
        </div>
    );
};

export default FormField;