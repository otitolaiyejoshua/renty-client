// src/contexts/AuthContext.js
import React, { createContext, useContext, useEffect, useState } from 'react';
import jwt_decode from 'jwt-decode';
import axios from 'axios';
import { getUserData } from '../getUserData';
// Create the AuthContext
const AuthContext = createContext();
export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null); // Stores user 
    const dtoken = userData ? userData.token : null;
    const [token, setToken] = useState(dtoken|| ''); // Stores JWT token
    const [loading, setLoading] = useState(true); // Indicates if authentication is being checked
    const userData = getUserData();
    useEffect(() => {
        if (token) {
            try {
                const decoded = jwt_decode(token);
                setUser(decoded);
                // Optionally, verify token with backend
                // axios.get('/api/auth/verify', { headers: { Authorization: `Bearer ${token}` } })
                //     .then(res => { /* Token is valid */ })
                //     .catch(err => { logout(); });
            } catch (error) {
                console.error('Invalid token:', error);
                logout();
            }
        }
        setLoading(false);
    }, [token]);

    // Login function
    const login = (token) => {
        localStorage.setItem('token', token);
        setToken(token);
        const decoded = jwt_decode(token);
        setUser(decoded);
    };

    // Logout function
    const logout = () => {
        localStorage.removeItem('token');
        setToken('');
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, token, login, logout, loading }}>
            {children}
        </AuthContext.Provider>
    );
};

// Custom hook to use the AuthContext
export const useAuth = () => {
    return useContext(AuthContext);
};
