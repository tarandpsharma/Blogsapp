import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Image } from './Image';
import Logout from './Logout';

export const Header = () => {
    const location = useLocation();
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        // Check if the user is logged in when the component mounts
        const isLoggedIn = document.cookie.includes('userData=');
        setIsLoggedIn(isLoggedIn);
    }, []);

    return (
        <div>
            <nav className="bg-white dark:bg-gray-900 fixed w-full z-20 top-0 start-0 border-b border-gray-200 dark:border-gray-600">
                <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                    <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white"> TDS Blogs</span>
                    <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
                        {isLoggedIn ? (
                            <p className="mr-3 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-200 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-green-800"> <Logout /> </p>
                        ) : (
                            <Link to="/login" className="mr-3 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-200 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-green-800">Login</Link>
                        )}
                    </div>
                    <div className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1" id="navbar-sticky">
                        <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
                            <li>
                                <Link to="/home" className={`mt-2 block py-2 px-3 rounded md:bg-transparent md:text-blue-700 md:p-0 md:dark:text-blue-500 ${location.pathname === '/home' || location.pathname === '/' ? 'bg-blue-700 text-white' : 'text-gray-900 hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700'}`}>Home</Link>
                            </li>
                            
                            <li>
                                <Link to="/about" className={`block py-2 px-3 rounded md:bg-transparent ${location.pathname === '/about' ? 'bg-blue-700 text-white' : 'text-gray-900 hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700'}`}>About</Link>
                            </li>
                            <li>
                                <Link to="/blogs" className={`block py-2 px-3 rounded md:bg-transparent ${location.pathname === '/allblogs' ? 'bg-blue-700 text-white' : 'text-gray-900 hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700'}`}>My Blogs</Link>
                            </li>
                            <li>
                                {/* Button for Add Blogs */}
                                <Link to="/myblogs" className={`block py-2 px-1 rounded-lg text-md  md:text-white md:bg-blue-700  md:border-blue-700 `}>Create Blogs</Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
            {(location.pathname === '/home' || location.pathname === '/') &&
                <Image />
            }
        </div>
    )
}
