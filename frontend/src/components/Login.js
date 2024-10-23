import React, {useState} from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../styles.css";

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post("http://localhost:8080/api/auth/authenticate", {
                email: email,
                password: password
            })
            localStorage.setItem('token', response.data.jwtToken);
            navigate("/");
        } catch (error){
            setError("Invalid credentials, please try again");
        }
    }

    return(
        <div className="form-container">
            <form onSubmit={handleSubmit} className="form">
                <h2>Login</h2>
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
                { error && <p className="error">{error}</p>}
                <button type="submit" className="form-button">LOGIN</button>
                <p style={{fontSize: "16px"}}>Don't have a profile?
                    <a href="/register" style={{textDecoration:"none", fontWeight:"bold"}}> REGISTER HERE</a>
                </p>
            </form>
        </div>
    );
};

export default Login;