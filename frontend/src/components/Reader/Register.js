import React, {useState} from "react";
import axios from "axios";
import "../../styles.css";
import {useNavigate} from "react-router-dom";

const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if(password !== confirmPassword){
            setError("Passwords don't match");
            return;
        }
        try {
            const response = await axios.post("http://localhost:8080/api/auth/register", {
                name: name,
                email: email,
                password: password
            })
            localStorage.setItem('token', response.data.jwtToken);
            navigate("/login");
        } catch (error){
            if(error.response.status === 403){
                setError("User with the same email already exists!");
            } else {
                setError("Invalid credentials, please try again");
            }
        }
    }

    return(
        <div className="form-container">
            <form onSubmit={handleSubmit} className="form">
                <h2>Register</h2>
                <div className="form-field">
                    <div>
                        <label>Name</label>
                    </div>
                    <input
                        type="text"
                        value={name}
                        required
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>
                <div className="form-field">
                    <div>
                        <label>Email</label>
                    </div>
                    <input
                        type="email"
                        value={email}
                        required
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div className="form-field">
                    <div>
                        <label>Password</label>
                    </div>
                    <input
                        type="password"
                        value={password}
                        required
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <div className="form-field">
                    <div>
                        <label>Confirm Password</label>
                    </div>
                    <input
                        type="password"
                        value={confirmPassword}
                        required
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                </div>
                { error && <p className="error">{error}</p>}
                <button className="form-button" type="submit">REGISTER</button>
            </form>
        </div>
    );
};

export default Register;