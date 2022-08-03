import React from "react"
import axios from "axios";
import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../context/auth.context";



const API_URL = "http://localhost:5005";

function HandlerProfilePage() {

    const { user } = useContext(AuthContext)
    const [ handler, setHandler ] = useState("");

/*     const getHandler = () => {
        axios
            .get(`${API_URL}/api/handler/:id`)
            .then((response) => setHandler(response.data))
            .catch((error) => console.log(error))
    };
        
    useEffect(() => {
        getHandler();
    }, []); */



    return (
        <div>
            <div>
                {user && (
                    <div>
                        {user._id}
                    </div>
                )}
            <h1>Handle Information</h1>
            <h2>Personal Info</h2>
            <h5>First name</h5>
            <h5>Last name</h5>
            <h5>Email address</h5>
            <h5>Password</h5>
            <button>Edit Profile</button>
            </div>
            <div>
                <h1>Current Load</h1>
                
            </div>
            <div>
                <h1>Comepleted loads</h1>
                <p>Load Details</p>
            </div>
        </div>
    )
}

export default HandlerProfilePage