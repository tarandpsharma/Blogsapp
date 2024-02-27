import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
// import  Image  from './Image';
import Cookies from 'js-cookie';
import { decode } from 'base-64';
import Img  from '../../src/nature.jpg';
import Blog from './Blog';


export const Header = () => {
    const location = useLocation();
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [showDropdown, setShowDropdown] = useState(false);
    const [userName, setUserName] = useState('');
    const [blogs, setBlogs] = useState([]);
    const [selectedBlog, setSelectedBlog] = useState(null);

    useEffect(() => {
        const checkLoggedIn = () => {
            const userData = Cookies.get('userData');
            if (userData) {
                const decodedUserData = decode(userData);
                const parsedUserData = JSON.parse(decodedUserData);
                console.log("mmmmmm", parsedUserData)
                setUserName(parsedUserData.email);
                setIsLoggedIn(true);
            } else {
                setIsLoggedIn(false);
            }
        };

        checkLoggedIn(); 

        // Fetch blogs from local storage
        const storedBlogs = JSON.parse(localStorage.getItem('blogs')) || [];
        const userList = JSON.parse(localStorage.getItem('userList')) || [];

        const updatedBlogs = storedBlogs.map(blog => {
            const author = userList.find(user => user.id === blog.id);
            const authorName = author ? author.name : 'Unknown Author';
            console.log(author, "sdffsf")
            return { ...blog, author: authorName };
        });

        setBlogs(updatedBlogs);
    }, []);

    const handleDropdownToggle = () => {
        setShowDropdown(!showDropdown);
    };

    const handleLogout = () => {
        Cookies.remove('userData');
        setIsLoggedIn(false);
        setShowDropdown(false);
    };

    const handleBlogClick = (blog) => {
        setSelectedBlog(blog);
    };

    return (
        <div>
            <nav className="bg-white dark:bg-gray-900 fixed w-full z-20 top-0 start-0 border-b border-gray-200 dark:border-gray-600">
                <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                    <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white"> TDS Blogs</span>
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
                        <Link
                            to="/myblogs"
                            className={`block py-2 px-2 font-bold rounded-lg text-sm  md:text-white md:bg-blue-600  md:border-blue-600 `}
                        >
                            Create
                        </Link>
                    </div>
                    <div className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1" id="navbar-sticky">
                        <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
                            <li>
                                <Link
                                    to="/home"
                                    className={`mt-2 block py-2 px-3 rounded md:bg-transparent md:text-blue-700 md:p-0 md:dark:text-blue-500 ${location.pathname === '/home' || location.pathname === '/' ? 'bg-blue-700 text-white' : 'text-gray-900 hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700'}`}
                                >
                                    Home
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/about"
                                    className={`block py-2 px-3 rounded md:bg-transparent ${location.pathname === '/about' ? 'bg-blue-700 text-white' : 'text-gray-900 hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700'}`}
                                >
                                    About
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/blogs"
                                    className={`block py-2 px-3 rounded md:bg-transparent ${location.pathname === '/allblogs' ? 'bg-blue-700 text-white' : 'text-gray-900 hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700'}`}
                                >
                                    My Blogs
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
            {selectedBlog && (
                <Blog blog={selectedBlog} />
            )}
            
            {location.pathname === '/home' || location.pathname === '/' ? (
                <div className="container mx-auto px-4 py-8 mt-20">
                    <h1 className="text-3xl font-bold mb-4">Latest Blogs</h1>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {blogs.map(blog => (
                            <div key={blog.home} className="bg-white rounded-lg shadow-lg" onClick={() => handleBlogClick(blog)}>
                                <img
                                    className="w-full h-40 object-cover rounded-t-lg"
                                    src={Img}
                                    alt={blog.title}
                                />
                                <div className="p-4">
                                    <h2 className="text-lg font-semibold">{blog.title}</h2>
                                    <p className="text-gray-600 mb-2">Author: {blog.author}</p>
                                    <p className="text-gray-700">{blog.content}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            ) : null}
        </div>
    );
};

export default Header;
