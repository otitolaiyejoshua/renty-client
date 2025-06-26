import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { getUserData } from './getUserData';

function PrivateRoute({ roles }) {
    const userData = getUserData();
    const userRole = userData?.role;
    const token = userData?.token;

    console.log('Token:', token);  // Log token
    console.log('User Role:', userRole);  // Log user role
    // Redirect to the homepage if there is no token (not logged in)
    if (!token) {
        return <Navigate to="/" />;
    }

    // Redirect if the user's role does not match allowed roles
    if (roles && !roles.includes(userRole)) {
        return <Navigate to="/" />;
    }

    // Authorized users proceed to child routes
    return <Outlet />;
}

export default PrivateRoute;
