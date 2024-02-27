import React from 'react';
import image from '../../src/nature.jpg';

const Blog = ({ blog }) => {
    return (
        <div className="container mx-auto px-4 py-8 mt-20">
            <div className="bg-white rounded-lg shadow-lg">
                <img
                    className="w-full h-60 object-cover rounded-t-lg"
                    src={image}
                    alt={blog.title}
                />
                <div className="p-4">
                    <h2 className="text-2xl font-semibold mb-2">{blog.title}</h2>
                    <p className="text-gray-600 mb-4">Author: {blog.author}</p>
                    <p className="text-gray-700">{blog.content}</p>
                </div>
            </div>
        </div>
    );
};

export default Blog;
