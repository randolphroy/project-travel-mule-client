import React, { useState, useEffect } from "react";
import axios from "axios";
const API_URL = "http://localhost:5005";

const AuthContext = React.createContext();

function AuthProviderWrapper(props)  {
    const [isLoggedin, setIsLoggedIn] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [user, setUser] = useState(null);

    const storeToken = (token) => {
        localStorage.setItem('authToken', token);
    }
    
    const authenticateUser = () => {
        const storedToken = localStorage.getItem('authToken');

        if (storedToken) {
            axios.get(
                `${API_URL}/api/verify` , 
                {headers: { Authorization: `Bearer ${storedToken}` } }
            )
        .then((response) => {
            const user = response.data;
            setIsLoggedIn(true);
            setIsLoading(false);
            setUser(user);
        })
        .catch((error) => {
            setIsLoggedIn(false);
            setIsLoading(false);
            setUser(null);
        });
        } else {
            setIsLoggedIn(false);
            setIsLoading(false);
            setUser(null);
        }
    }

    const removeToken = () => {
        localStorage.removeItem("authToken");
    }

    const logOutUser = () => {
        removeToken();
        authenticateUser();
    }

    useEffect(() => {
        authenticateUser();
    }, []);


    return (
        <AuthContext.Provider 
        value={{ 
            isLoggedin, 
            isLoading, 
            user,
            storeToken, 
            authenticateUser,
            logOutUser
            }}
        >
            {props.children}
        </AuthContext.Provider>
    )
}


export { AuthProviderWrapper, AuthContext };

