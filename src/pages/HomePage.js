import React from "react";
import { Link } from "react-router-dom"
import LoginPage from "./LoginPage";


function HomePage() {

    return (

        <div className="text-center flex flex-column bd-highlight mb-3">
            <div className="logo">
            <img 
            src="/images/faceid.png" 
            height="40px"
            alt="travel-mule-logo"
            />
            </div>
            <div className="logo">
            <img 
            src="/images/travelmule-white.png" 
            height="250px"
            alt="travel-mule-logo"
            />
            </div>
            <h5>A new way of delivering your small packages</h5>
            <h5>Let's get started!</h5>
            <div className="d-grid gap-2 mt-10 col-10 mx-auto">
            <Link to={`/login`}>
            <button type="submit" className="btn btn-outline-secondary">Login</button>
            </Link>
            <Link to={`/signup`}>
            <button type="submit" className="btn btn-outline-secondary rounded-pill">Sign Up</button>
            </Link>
            </div>
        </div>

    )

}

export default HomePage;    

