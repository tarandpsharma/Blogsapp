// Logout.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

const Logout = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        try {
            Cookies.remove('userData');

            navigate('/login');
        } catch (error) {
            console.error('Error occurred during logout:', error);
        }
    };

    return (
        <button onClick={handleLogout}> Logout </button>
    );
};

export default Logout;
