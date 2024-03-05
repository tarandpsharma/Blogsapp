import React, { useState, useEffect } from 'react';
import { Header } from './Header';
import { useDispatch, useSelector } from 'react-redux';
import { addBlog } from '../features/blog/blogSlice';
import { useNavigate } from 'react-router-dom';

export const Myblogs = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [image, setImage] = useState(null);
    const [error, setError] = useState('');
    const [nextId, setNextId] = useState(1);
    const { activeUserDetail } = useSelector(state => state?.user);

    // UseEffect to update nextId when adding a new blog
    useEffect(() => {
        // Get existing blogs from localStorage or initialize empty array
        const existingBlogs = JSON.parse(localStorage.getItem('blogs')) || [];
        
        // Get the highest ID from existing blogs
        const maxId = existingBlogs.reduce((max, blog) => (blog.id > max ? blog.id : max), 0);
        
        // Set the nextId to the highest ID + 1
        setNextId(maxId + 1);
    }, []);

    const handleTitle = (e) => {
        setTitle(e.target.value);
    };

    const handleContent = (e) => {
        setContent(e.target.value);
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setImage(file);
    };

    const handleAddButton = () => {
        if (!title || !content || !image) {
            setError("* Please fill in all the fields and upload an image.");
            return;
        }

        const reader = new FileReader();
        console.log(reader, "reader")  //getting image here in reader variable from the file object.
        reader.onloadend = () => {
            const newBlog = {
                id: nextId,
                title,
                content,
                authorname: activeUserDetail?.name,
                userId: activeUserDetail?.id,
                image: reader.result,
            };

            dispatch(addBlog(newBlog));

            // Increment ID for the next blog post
            setNextId(nextId + 1);

            // Get existing blogs from localStorage or initialize empty array
            const existingBlogs = JSON.parse(localStorage.getItem('blogs')) || [];
            // Add the new blog to the existing blogs
            const updatedBlogs = [...existingBlogs, newBlog];
            // Store the updated blogs array in localStorage
            localStorage.setItem('blogs', JSON.stringify(updatedBlogs));

            setTitle('');
            setContent('');
            setImage(null); // Reset image state
            setError('');
            navigate('/blogs');
        };

        if (image) {
            reader.readAsDataURL(image); // Read the image file as a Base64 string
        }
    };

    return (
        <div>
            <Header />
            <div className="mx-auto max-w-lg px-4 py-8 mt-20">
                <h1 className="text-4xl font-bold text-center mb-6">Add Your Blogs Here</h1>
                <form className="space-y-4">
                    <div>
                        <label htmlFor="title" className="block text-sm font-semibold text-gray-600">Title</label>
                        <input type="text" id="title" value={title} onChange={handleTitle} className="block w-full px-4 py-2 border rounded-md bg-gray-100 focus:outline-none focus:border-blue-500" />
                    </div>
                    <div>
                        <label htmlFor="content" className="block text-sm font-semibold text-gray-600">Content</label>
                        <textarea id="content" value={content} onChange={handleContent} className="block w-full px-4 py-2 border rounded-md bg-gray-100 focus:outline-none focus:border-blue-500"></textarea>
                    </div>
                    <div>
                        <label htmlFor="image" className="block text-sm font-semibold text-gray-600">Image</label>
                        <input type="file" id="image" onChange={handleImageChange} className="block w-full px-4 py-2 border rounded-md bg-gray-100 focus:outline-none focus:border-blue-500" />
                    </div>
                    <div className="text-center">
                        <button type="button" onClick={handleAddButton} className="inline-block px-6 py-3 mt-4 text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600">Add</button>
                    </div>
                    {error && <span className="block mt-2 text-red-500">{error}</span>}
                </form>
            </div>
        </div>
    );
};

export default Myblogs;
