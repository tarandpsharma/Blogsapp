import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Header } from './Header';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Cookies from 'js-cookie';
import { encode } from 'base-64';
import { useDispatch } from 'react-redux';
// import { setUser } from '../features/blog/userSlice';

export const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleLogin = () => {
        const storedUserData = JSON.parse(localStorage.getItem('userList')); 
    
        // Check if storedUserData exists and is an array
        if (Array.isArray(storedUserData)) {
            // Find the user object with matching email
            const user = storedUserData.find(user => user.email === email);
            if (user && user.password === password) {
                // Correct credentials, navigate to home page
                navigate('/home');
                toast.success("Login Successful!", {
                    position: "top-right",
                    hideProgressBar: true,
                    autoClose: 5000,
                });
    
                // Save necessary user data in cookies
                const userDataToStore = {
                    id: user.id, // Assuming user has an id
                    email: user.email, // Storing email for identification purposes
                    // You can add more necessary information here
                };

                const encodedUserData = encode(JSON.stringify(userDataToStore));

                Cookies.set('userData', encodedUserData, { expires: 30 });

                // Dispatch action to store user data in Redux store
                // dispatch(setUser(userDataToStore));
    
                return;
            }
        }
    
        // Incorrect credentials or user not found, show error message
        toast.error("Email or password is invalid.");
    };

    const handleEmail = (e) => {
        setEmail(e.target.value);
    };

    const handlePassword = (e) => {
        setPassword(e.target.value);
    };

    return (
        <>
            <Header />
            <div className="bg-gray-900 min-h-screen flex justify-center items-center">
                <form onSubmit={(e) => { e.preventDefault(); handleLogin(); }}>
                    <div className="bg-gray-100 rounded-lg p-8 shadow-md w-96">
                        <h2 className="text-2xl font-semibold mb-4 text-center text-gray-800">Login</h2>
                        <div className="mb-4">
                            <label className="block text-gray-700 font-semibold mb-2">Email</label>
                            <input
                                type="email"
                                value={email}
                                onChange={handleEmail}
                                placeholder="Enter your email"
                                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-500"
                            />
                        </div>
                        <div className="mb-6">
                            <label className="block text-gray-700 font-semibold mb-2">Password</label>
                            <input
                                type="password"
                                value={password}
                                onChange={handlePassword}
                                placeholder="Password"
                                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-500"
                            />
                        </div>
                        <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 focus:outline-none focus:bg-blue-700">
                            Login
                        </button>
                        <ToastContainer />
                        <div className="mt-4 text-center">
                            <Link to="/forgot-password" className="text-gray-500 hover:text-gray-700">Forgot Password?</Link>
                        </div>
                        <div className="mt-2 text-center">
                            <span className="text-gray-500">Don't have an account? </span>
                            <Link to="/signup" className="text-blue-600 hover:underline">Sign Up</Link>
                        </div>
                    </div>
                </form>
            </div>
        </>
    );
};

export default Login;
