import { useState, useEffect, useContext } from "react";
import '../App.css';
import { useParams, Link } from 'react-router-dom';
import axios from "axios";
import LoadCard from "../components/LoadCard";
import LoadSearch from "../components/LoadSearch";
import { AuthContext } from "../context/auth.context";


const API_URL = process.env.REACT_APP_API_URL;

function LoadsListPage() {

    const { user } = useContext(AuthContext)

    const [loads, setLoads] = useState([]);

    /* const [filteredLoadArray, setFilteredLoadArray] = useState(API_URL)

    const [loadSearch, setLoadSearch] = useState('');

    const updateLoadSearch = event => {
      
    const newFilteredLoadArray = loads.filter(individualLoad => {
        return individualLoad.startAirport.toLowerCase().includes(event.currentTarget.value.toLowerCase());
  
      });
  
      setFilteredLoadArray(newFilteredLoadArray);
  
      setLoadSearch(event.currentTarget.value)
    } */

    const getAllLoads = () => {
        axios
            .get(`${API_URL}/api/loads`)
            .then((response) => setLoads(response.data.allLoads))
            .catch((error) => console.log(error))
    };

    useEffect(() => {
        getAllLoads();
    }, []);

    return (
        <div className="LoadsListPage">
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
            <div className="card text-bg-light col-sm-6 w-75 mx-auto">
                <div className="card-header">
                    Handler Profile
                </div>
                <div className="card-body">
                    <h4 className="card-title">Welcome back,{user.firstName}! </h4>
                    <p className="card-text">Pick up a load from the list below!</p>
                    <Link to={`/handler`}>
                        <button type="button" className="btn btn-primary btn-sm w-40 mx-auto">Go to Profile</button>
                    </Link>
                </div>
            </div>
            {/* <LoadSearch loadSearch = {loadSearch} updateLoadSearch = {updateLoadSearch} /> */}
            {/* <AddLoad refreshLoad={getAllLoads} /> */}
            {loads.map((load) => (
                <div key={load._id} className="card col-sm-6 w-70 mx-auto" >
                    <div className="card-header">
                        <h3>{load.startAirport} -> {load.endAirport}</h3>
                    </div>
                    <div className="card-body">
                        <p className="card-text">Contents: <strong>{load.contents}</strong></p>
                        <p className="card-text">Price: <strong>{load.price}</strong></p>
                        <Link to={`/loads/${load._id}`}>
                            <button type="button" className="btn btn-secondary btn-sm w-25 mx-auto">Details</button>
                        </Link>
                    </div>
                </div>
            ))}
        </div>

    );
}

export default LoadsListPage;

