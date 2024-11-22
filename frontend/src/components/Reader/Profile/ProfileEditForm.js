import React, {useState} from "react";
import FormField from "../../Books/Form/BookFormField";
import { editProfileInfo } from "../../Service/AxiosService";

const ProfileEditForm = ({ reader }) => {
    const token = localStorage.getItem("token");
    const [error, setError] = useState("");
    const [formData, setFormData] = useState({
        name: reader.name || '',
        email: reader.email || '',
        aboutMe: reader.aboutMe || '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === "aboutMe" && value.length > 500) {
            setError("About Me text should not exceed 500 characters.");
        } else {
            setError("");
        }

        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
            e.preventDefault();

            const profileInfoRequest = {
                name: formData.name,
                email: formData.email,
                aboutMe: formData.aboutMe,
            }

        const data = new FormData();
        data.append('profileInfoRequest', JSON.stringify(profileInfoRequest));

        try {
            await editProfileInfo(token,data);
            window.location.reload();
        } catch (error) {
            console.log(error);
        }
    };


    return(
        <div className="profile-details">
            <form onSubmit={handleSubmit}>
                <FormField label="Name" name="name" type="text" value={formData.name} required onChange={handleChange} />
                <FormField label="Email" name="email" type="text" value={formData.email} required onChange={handleChange} />
                <FormField label="About Me" name="aboutMe" type="textarea" rows={20} cols={37} value={formData.aboutMe} onChange={handleChange} />
                { error ? <p style={{color: "white", fontSize: "16px"}}>{error}</p> : <></>}
                <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                    <button className="profile-button" type="submit">
                        Save
                    </button>
                </div>
            </form>
        </div>
    )
}

export default ProfileEditForm;