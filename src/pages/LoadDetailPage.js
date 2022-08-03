import { useState, useEffect } from "react";
import '../App.css';
import { useParams, Link, useNavigate } from 'react-router-dom';
import axios from "axios";
import LoadCard from "../components/LoadCard";

const API_URL = "http://localhost:5005";

function LoadDetailPage(){

    const [singleLoad, setSingleLoad] = useState(null);

    const navigate = useNavigate()

    const { loadId } = useParams();

    const getSingleLoad = () => {
        axios
        .get(`${API_URL}/api/loads/${loadId}`)
        .then((response) => {
            console.log(response)
            setSingleLoad(response.data)
        })
        .catch((error) => console.log(error))
    };

        useEffect(() => {
            getSingleLoad();
        }, [loadId])

    const acceptedLoad = (id) => {

        const authToken = localStorage.getItem('authToken')
        axios
        .get(`${API_URL}/api/acceptedload/${id}`, {
            headers: {
                Authorization: `Bearer ${authToken}`
            }
        })
        .then((response) => {
            console.log(response.data)
            navigate('/handler')
            //setSingleLoad(response.data)
        })
        .catch((error) => console.log(error))
    };

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
                    <button type="button" class="btn btn-primary btn-sm">Logout</button>
                    </div>
                </div>
            </nav>
 
                {singleLoad && (
                <div className="card text-bg-light col-sm-6 w-70 mx-auto" >
                    <div className="card-header">
                        <h3>Load Details</h3>
                    </div>
                    <div className="card-body">
                        <h4>{singleLoad.startAirport} -> {singleLoad.endAirport}</h4>
                        <p className="card-text">Sender: <strong>{singleLoad.senderInfo}</strong></p>
                        <p className="card-text">Receiver: <strong>{singleLoad.receiverInfo}</strong></p>
                        <p className="card-text">Contents: <strong>{singleLoad.contents}</strong></p>
                        <p className="card-text">Price: <strong>{singleLoad.price}</strong></p>
                        <p className="card-text">Status: <strong>{singleLoad.status}</strong></p>                    
                    </div>
                </div>
                )}
                <div class="d-grid gap-2 col-6 mx-auto">
                        <button onClick={
                            () => acceptedLoad(loadId)
                            }
                            className="btn btn-outline-primary" 
                            type="button">Accept Load
                        </button>
                        <Link to="/loads">
                        <button className="btn btn-outline-secondary" type="button">Back to Loads</button>
                        </Link>
                </div>
            </div>
        )
}
export default LoadDetailPage;