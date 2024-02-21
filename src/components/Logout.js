// Logout.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

const Logout = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        try {
            // Remove the userData cookie
            Cookies.remove('userData');
            console.log('User data removed from cookies');

            // Redirect to the login page
            navigate('/login');
            console.log('Navigated to /login');
        } catch (error) {
            console.error('Error occurred during logout:', error);
        }
    };

    return (
        <button onClick={handleLogout}>Logout</button>
    );
};

export default Logout;
