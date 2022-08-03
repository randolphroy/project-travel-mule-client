import { useContext, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/auth.context";

const API_URL = "http://localhost:5005";

function LoginPage(props) {

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState(undefined);

    const navigate = useNavigate();

    const { storeToken, authenticateUser } = useContext(AuthContext);

    const handleEmail = (e) => setEmail(e.target.value);
    const handlePassword = (e) => setPassword(e.target.value);

    const handleLoginSubmit = (e) => {
        e.preventDefault();
        const requestBody = { email, password };

        axios.post(`${API_URL}/api/login`, requestBody)
            .then((response) => {
                console.log('JWT token', response);

                storeToken(response.data.authToken);

                authenticateUser();
                navigate('/loads');

            })
            .catch((error) => {
                const errorDescription = error.response.data.message;
                setErrorMessage(errorDescription);
            })
    };

    return (
        <div className="LoginPage position-relative">
            <div className="container-fluid">
            <img 
            src="https://res.cloudinary.com/sebastien-zachary/image/upload/v1659394350/project3-travelmule/travelmule-white-big_lwu7x2.jpg" 
            height="300px"
            alt="travel-mule-logo"
            />
            </div>
            <div>
            <form onSubmit={handleLoginSubmit}>
            <div class="mb-3 mx-auto">
                <label for="exampleInputEmail1" className="form-label">Email address</label>
                <input
                    type="email"
                    className="form-control"
                    id="exampleInputEmail1"
                    value={email}
                    onChange={handleEmail}
                />
            </div>
            <div class="mb-3">
                <label for="exampleInputPassword1" className="form-label">Password</label>
                <input
                    type="password"
                    className="form-control"
                    id="exampleInputPassword1"
                    value={password}
                    onChange={handlePassword}
                />
            </div>
                <button type="submit" className="btn btn-outline-secondary">Login</button>
            </form>
            {errorMessage && <p className="error-message">{errorMessage}</p>}

            <p>Would you like to become a Handler?</p>
            <Link to={"/signup"}> Click to sign up!</Link>
            </div>
        </div>
    )
}

export default LoginPage;
