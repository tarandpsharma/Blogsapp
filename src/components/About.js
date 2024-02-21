import React from 'react';
import { Header } from './Header';

const About = () => {
    return (
        <>
            <Header />
            <div className="container mx-auto py-8 bg-gray-100 mt-16">
                <h1 className="text-4xl font-bold underline mb-8 text-center">About Us</h1>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="bg-white shadow-md p-6 rounded-lg">
                        <h2 className="text-3xl font-bold mb-4 text-gray-800">Welcome to TDS Blogs</h2>
                        <p className="text-lg text-gray-700 mb-4">We're dedicated to providing you with valuable insights, tutorials, and resources in the world of technology and software engineering.</p>
                        <p className="text-lg text-gray-700 mb-4">Our team of passionate software engineers strives to share our knowledge and experiences to inspire and empower individuals to excel in the field of technology.</p>
                        <p className="text-lg text-gray-700 mb-4">Whether you're a seasoned developer looking to stay updated with the latest trends or a beginner eager to learn, TDS Blogs has something for everyone.</p>
                    </div>
                    <div className="bg-white shadow-md p-6 rounded-lg">
                        <h2 className="text-3xl font-bold mb-4 text-gray-800">Our Mission</h2>
                        <p className="text-lg text-gray-700 mb-4">At TDS Blogs, our mission is to:</p>
                        <ul className="list-disc pl-6">
                            <li className="text-lg text-gray-700 mb-2">Provide high-quality content that educates and informs our readers.</li>
                            <li className="text-lg text-gray-700 mb-2">Inspire and empower individuals to pursue their passions in technology.</li>
                            <li className="text-lg text-gray-700 mb-2">Foster a community of lifelong learners and innovators.</li>
                        </ul>
                    </div>
                </div>
            </div>
            <footer className="bg-gray-900 text-gray-200 text-center py-4">
                <div className="container mx-auto">
                    <p className="text-lg">© Copygright @2024 by Taran Blogs</p>
                </div>
            </footer>
        </>
    );
};

export default About;
