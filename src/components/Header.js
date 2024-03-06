import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Cookies from 'js-cookie';
import { decode } from 'base-64';
import { Profile } from './profileUser/Profile';

export const Header = () => {
    const location = useLocation();
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [showDropdown, setShowDropdown] = useState(false);
    const [userName, setUserName] = useState('');
    const [blogs, setBlogs] = useState([]);
    console.log(blogs, "bbbbbllllllgggsssss")

    useEffect(() => {
        const checkLoggedIn = () => {
            const userData = Cookies.get('userData');
            if (userData) {
                const decodedUserData = decode(userData);
                const parsedUserData = JSON.parse(decodedUserData);
                setUserName(parsedUserData.email);
                setIsLoggedIn(true);
            } else {
                setIsLoggedIn(false);
            }
        };

        checkLoggedIn();

        // Fetch blogs from local storage
        const storedBlogs = JSON.parse(localStorage.getItem('blogs')) || [];
        setBlogs(storedBlogs)
    }, []);

    const handleDropdownToggle = () => {
        setShowDropdown(!showDropdown);
    };

    const handleLogout = () => {
        Cookies.remove('userData');
        setIsLoggedIn(false);
        setShowDropdown(false);
    };

    return (
        <div>
            <nav className="bg-white dark:bg-black fixed w-full z-20 top-0 start-0 border-b border-gray-200">
                <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-2">
                    <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white"> TD BLOGS</span>
                    <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
                        {isLoggedIn ? (
                            <div className="relative">
                                <button
                                    onClick={handleDropdownToggle}
                                    className="mr-3 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-200 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-green-800"
                                >
                                    {userName}
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-4 w-4 inline-block ml-1"
                                        viewBox="0 0 20 20"
                                        fill="currentColor"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M10 12a2 2 0 100-4 2 2 0 000 4z"
                                            clipRule="evenodd"
                                        />
                                        <path
                                            fillRule="evenodd"
                                            d="M10 2a8 8 0 100 16 8 8 0 000-16zm0 2a6 6 0 100 12 6 6 0 000-12zm0 7a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                </button>
                                {showDropdown && (
                                    <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg z-10">
                                        <Link
                                            to="/profile"
                                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white"
                                        >
                                            Profile
                                        </Link>
                                        <button
                                            onClick={handleLogout}
                                            className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white"
                                        >
                                            Logout
                                        </button>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <Link
                                to="/login"
                                className="mr-3 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-200 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-green-800"
                            >
                                Login
                            </Link>
                        )}

                        {isLoggedIn && (
                            <Link
                                to="/myblogs"
                                className={`block py-2 px-2 font-bold rounded-lg text-sm  md:text-white md:bg-blue-600  md:border-blue-600 `}
                            >
                                Create +
                            </Link>
                        )}
                    </div>
                    <div className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1" id="navbar-sticky">
                        <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0  dark:bg-black ">
                            <li>
                                <Link
                                    to="/home"
                                    className={`mt-2 block py-2 px-3 rounded md:bg-transparent md:text-blue-700 md:p-0  ${location.pathname === '/home' || location.pathname === '/' ? 'bg-blue-700 text-white' : 'text-gray-900 hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700  dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700'}`}
                                >
                                    Home
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/about"
                                    className={`mt-2 block py-2 px-3 rounded md:bg-transparent md:text-blue-700 md:p-0 ${location.pathname === '/about' ? 'bg-blue-700 text-white' : 'text-gray-900 hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700  dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700'}`}
                                >
                                    About
                                </Link>
                            </li>
                            <li>
                                {isLoggedIn && (
                                    <Link
                                        to="/blogs"
                                        className={`mt-2 block py-2 px-3 rounded md:bg-transparent md:text-blue-700 md:p-0 ${location.pathname === '/blogs' ? 'bg-blue-700 text-white' : 'text-gray-900 hover:bg-blue-100 md:hover:bg-transparent md:text-blue-700  dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700'}`}
                                    >
                                        My Blogs
                                    </Link>

                                )}
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>

            {location.pathname === '/home' || location.pathname === '/' ? (
                <div className="container mx-auto px-4 py-8 mt-20">
                    {blogs && blogs.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {blogs.map(blog => (
                                <div key={blog?.id} className="bg-white rounded-lg shadow-lg">
                                    <img
                                        className="w-full h-60 object-cover rounded-t-lg"
                                        src={blog.image}
                                        alt={blog.title}
                                    />
                                    <div className="p-4">
                                        <h2 className="text-lg font-semibold">{blog?.title}</h2>
                                        <p className="text-gray-600 mb-2">Author: {blog?.author || blog?.authorname}</p>
                                        <p className="text-gray-700">{blog?.content}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p className="font-bold text-3xl text-center text-gray-600 mt-4"> There are no blogs.</p>
                    )}
                </div>
            ) : null}
        </div>

    );
};

export default Header;
