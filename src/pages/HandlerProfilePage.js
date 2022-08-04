import React from "react"
import axios from "axios";
import { Link } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../context/auth.context";



const API_URL = process.env.REACT_APP_API_URL;

function HandlerProfilePage() {

    const { user, storedToken } = useContext(AuthContext)
    console.log(user)
    const [loads, setLoads] = useState([]);

    const getDeliveredLoads = () => {
        const authToken = localStorage.getItem('authToken')
        axios
            .get(`${API_URL}/api/previousLoads`, {
                headers: {
                    Authorization: `Bearer ${authToken}`
                }
            })
            .then((response) => {
                console.log(response.data)
                setLoads(response.data.allLoads)
            })
            .catch((error) => console.log(error))
    };

    useEffect(() => {
        getDeliveredLoads();
    }, []); 

    return (
        <div>
            <nav className="navbar bg-light mb-25">
                <div className="container-fluid d-flex flex-row">
                    <a className="navbar-brand p-10" href="">
                        <img 
                        src="https://res.cloudinary.com/sebastien-zachary/image/upload/v1659533259/project3-travelmule/travelmule-brand_csg7sb.png" 
                        width="35" height="24" class="d-inline-block align-text-top" />
                        TRAVEL MULE
                    </a>
                    <div>
                    <Link to={`/login`}>
                    <button type="button" onClick={() => localStorage.clear()} class="btn btn-primary btn-sm">Logout</button>
                    </Link>
                    </div>
                </div>
            </nav>
            <div>
                {user && (
                <div className="card text-bg-light border-secondary col-sm-6 w-75 mt-50 mx-auto">
                    <div className="card-header">
                        Handler Profile
                    </div>
                    <div className="card-body">
                        <h3 className="card-title">{user.firstName}  {user.lastName}</h3>
                        <h5>{user.email}</h5>
                        <h5>{user.password}</h5>
                        <p className="card-text">Pick up a load from the list below!</p>
                        <div className="d-grid gap-2 d-md-block">
                            <Link to={`/handler`}>
                            <button type="button" className="btn btn-secondary btn-sm w-40 mx-auto">Edit Profile</button>
                        </Link>
                        <Link to={`/loads`}>
                            <button type="button" className="btn btn-secondary btn-sm w-40 mx-auto">Back to available loads</button>
                        </Link>
                        </div>
                    </div>
                </div>
                )}
            </div>
            
            <div>
                <h3>Current Load</h3>
            </div>
            <hr class="bg-danger border-2 border-top border-secondary" />      
            <div>
                <h3>Completed loads</h3>
            </div>      
            {loads.map((load) => (
            <div key={load._id} className="card border-primary col-sm-6 w-70 mx-auto" >
                <div className="card-header text-primary">
                    <h4>{load.startAirport} -> {load.endAirport}</h4>
                </div>
                <div className="card-body text-primary">
                    
                    <p className="card-text">Sender: <strong>{load.senderInfo}</strong></p>
                    <p className="card-text">Receiver: <strong>{load.receiverInfo}</strong></p>
                    <p className="card-text">Contents: <strong>{load.contents}</strong></p>
                    <p className="card-text">Price: <strong>{load.price}</strong></p>
                    <p className="card-text">Status: <strong>{load.status}</strong></p>                    
                </div>
            </div>
            ))}
        </div>
    )
}

export default HandlerProfilePage