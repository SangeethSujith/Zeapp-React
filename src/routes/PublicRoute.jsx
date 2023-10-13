// eslint-disable-next-line no-unused-vars
import React from 'react';
import { Navigate } from 'react-router-dom';

const PublicRoute = ({ children }) => {
    const isLoggedIn = localStorage.getItem('token')
    return isLoggedIn ? <Navigate to="/" /> : children
}

export default PublicRoute;
