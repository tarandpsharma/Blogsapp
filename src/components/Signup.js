import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Header } from './Header';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const Signup = () => {
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSignup = () => {

        if (!name.trim() || !email.trim() || !password.trim()) {
            toast.error("Please fill out all fields");
            return;
        }
    
        // Check if the email is in a valid format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            toast.error("Please enter a valid email address");
            return;
        }

        
        // Generate unique id
        const userId = Date.now(); // You can use a more robust method to generate unique ids
    
        // Create user data object
        const userList = {
            id: userId,
            name,
            email,
            password
        };
    
        // Retrieve existing user data array from local storage or create an empty array if none exists
        const existingUserData = JSON.parse(localStorage.getItem('userList')) || [];
    
        // Push new user data into the array
        existingUserData.push(userList);
    
        // Store updated user data array in local storage
        localStorage.setItem('userList', JSON.stringify(existingUserData));
    
        // Reset form fields
        setName('');
        setEmail('');
        setPassword('');
    
        // Show success toast
        toast.success("Sign up successful!", {
            position: "top-right",
            hideProgressBar: true,
            autoClose: 5000,
        });
    
        // Redirect to login page after signup
        navigate('/login');
    };
    

    return (
        <>
            <Header />
            <div className="bg-gray-900 min-h-screen flex justify-center items-center">
                <form className="bg-gray-100 rounded-lg p-8 shadow-md w-96">
                    <h2 className="text-2xl font-semibold mb-4 text-center text-gray-800">Sign Up</h2>
                    <div className="mb-4">
                        <label className="block text-gray-700 font-semibold mb-2">Name</label>
                        <input
                            type="text"
                            placeholder="Enter your name"
                            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-500"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 font-semibold mb-2">Email</label>
                        <input
                            type="email"
                            placeholder="Enter your email"
                            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-500"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="mb-6">
                        <label className="block text-gray-700 font-semibold mb-2">Password</label>
                        <input
                            type="password"
                            placeholder="Password"
                            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-500"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <button
                        type="button"
                        className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 focus:outline-none focus:bg-blue-700"
                        onClick={handleSignup}
                    >
                        Sign Up
                    <ToastContainer />

                    </button>
                    <div className="mt-4 text-center">
                        <span className="text-gray-500">Already have an account? </span>
                        <Link to="/login" className="text-blue-600 hover:underline">Log In</Link>
                    </div>
                </form>
            </div>
        </>
    );
};
