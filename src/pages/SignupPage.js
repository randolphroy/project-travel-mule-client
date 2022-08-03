import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const API_URL = "http://localhost:5005";

function SignupPage(props) {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState(undefined);

    const navigate = useNavigate();

    const handleFirstName = (e) => setFirstName(e.target.value);
    const handleLastName = (e) => setLastName(e.target.value);
    const handleEmail = (e) => setEmail(e.target.value);
    const handlePassword = (e) => setPassword(e.target.value);

    const handleSignupSubmit = (e) => {
        e.preventDefault();

        const requestBody = { firstName, lastName, email, password };

        axios.post(`${API_URL}/api/signup` , requestBody)
        .then((response) => {
            navigate('/login');
        })
        .catch((error) => {
            const errorDescription = error.response.data.message;
            setErrorMessage(errorDescription);
        })
    };

    return (
        <div className="SignupPage">
            <img 
            src="https://res.cloudinary.com/sebastien-zachary/image/upload/v1659394350/project3-travelmule/travelmule-white-big_lwu7x2.jpg" 
            height="300px"
            alt="travel-mule-logo"
            />
            <h2>Handler Sign Up</h2>
            <form onSubmit={handleSignupSubmit}>
            <div class="row">
                <div class="input-group">
                <span className="input-group-text">Full Name</span>
                     <input 
                     type="text" 
                     className="form-control" 
                     placeholder="First name" 
                     value={firstName} 
                     onChange={handleFirstName}
                     />
                    <input 
                    type="text" 
                    className="form-control" 
                    placeholder="Last name" 
                    value={lastName} 
                    onChange={handleLastName}
                    />
                </div>
            </div>
            <div className="mb-3 mx-auto">
                <input
                type="email"
                className="form-control"
                id="exampleInputEmail1"
                placeholder="Please enter your email"
                value={email}
                onChange={handleEmail}
                />
                <input
                type="password"
                className="form-control"
                placeholder="Your password must be at least 6 characters long, contain letters and numbers, and must not contain spaces, special characters, or emoji."
                value={password}
                onChange={handlePassword}
                />
            </div>
                <button type="submit">Register</button>
            </form>

            { errorMessage && <p className="error-message">{errorMessage}</p>}

            <p>Already registered?</p>
            <Link to={"/login"}> Login</Link>
        </div>
    )
 
}
export default SignupPage;


