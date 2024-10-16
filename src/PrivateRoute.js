// frontend/src/components/PrivateRoute.js
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { getUserData } from './getUserData';
function PrivateRoute({ roles }) {
    // Retrieve auth data from localStorage
    const userData = getUserData();
    const userRole = userData.role || '';
    const token = userData ? userData.token : null;
    const userPhone = userData ? userData.phone : null;
    // Check if token exists
    if (!token) {
        return <Navigate to="/" />;
    }

    // If roles are specified, check if user role is authorized
    if (roles && !roles.includes(userRole)) {
        return <Navigate to="/user-dashboard" />;
    }

    // If authenticated and authorized, render child routes
    return <Outlet />;
}

export default PrivateRoute;
