import { useState, useEffect } from "react";
import '../App.css';
import { useParams, Link } from 'react-router-dom';
import axios from "axios";
import LoadCard from "../components/LoadCard";

const API_URL = "http://localhost:5005";

function LoadDetailPage(){

    const [singleLoad, setSingleLoad] = useState(null);

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

        return (
            <div>
                <h3>Load Details</h3>
                {singleLoad && (
                    <div className="card">
                    <h3>{singleLoad.startAirport} -> {singleLoad.endAirport}</h3>
                    <h4>{singleLoad.senderInfo}</h4>
                    <h4>{singleLoad.receiverInfo}</h4>
                    <p>{singleLoad.contents}</p>
                    <p>{singleLoad.price}</p>
                    <p>{singleLoad.status}</p>
                    <p>{singleLoad.timestamps}</p>
                    </div>
                )}
                
            
                          
                <button>Accept Load</button>
                <Link to="/loads">
                    <button>Back to Loads</button>
                </Link>
            </div>
        )
}
export default LoadDetailPage;