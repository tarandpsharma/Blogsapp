// BlogsPage.js
import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { removeBlog } from '../features/blog/blogSlice';
import { Header } from './Header';
import Cookies from 'js-cookie';
import Signup from './Signup';

const BlogsPage = () => {
    const dispatch = useDispatch();
    const [blogs, setBlogs] = useState([]);
    const [editingBlogId, setEditingBlogId] = useState(null);
    const [editedTitle, setEditedTitle] = useState('');
    const [editedContent, setEditedContent] = useState('');
    const [editedDescription, setEditedDescription] = useState('');
    const [expandedBlogId, setExpandedBlogId] = useState(null);

    useEffect(() => {
        const storedBlogs = JSON.parse(localStorage.getItem('blogs')) || [];
        const userList = JSON.parse(localStorage.getItem('userList')) || [];
        console.log("hhgfgfg",storedBlogs)
            console.log("sfdff", userList)

        const updatedBlogs = storedBlogs.map(blog => {
            console.log("fsdffsfffsffsfsfs",blog)
            console.log("yyyyy", blog.id)
            const author = userList.find(user => user.id === blog.id);
            console.log("fsfsfs", author)
            const authorName = author ? author.name: 'unknown user'; 
            return { ...blog, author: authorName };
        });

        setBlogs(updatedBlogs);
    }, []);
    

    

    const getUserById = (userList, userId) => {
        return userList.find(user => user.id === userId);
    };

    const handleDelete = (id) => {
        const updatedBlogs = blogs.filter(blog => blog.id !== id);
        localStorage.setItem('blogs', JSON.stringify(updatedBlogs));
        setBlogs(updatedBlogs);
        dispatch(removeBlog(id));
    };

    const handleEdit = (blogId) => {
        const blogToEdit = blogs.find(blog => blog.id === blogId);
        setEditingBlogId(blogId);
        setEditedTitle(blogToEdit.title);
        setEditedContent(blogToEdit.content);
        setEditedDescription(blogToEdit.description);
    };

    const handleSaveEdit = () => {
        const updatedBlogs = blogs.map(blog => {
            if (blog.id === editingBlogId) {
                return {
                    ...blog,
                    title: editedTitle,
                    content: editedContent,
                    description: editedDescription
                };
            }
            return blog;


        });

        localStorage.setItem('blogs', JSON.stringify(updatedBlogs));
        setBlogs(updatedBlogs);
        setEditingBlogId(null);

    };



    const handleCancelEdit = () => {
        setEditingBlogId(null);
    };

    const handleToggleExpand = (blogId) => {
        setExpandedBlogId(expandedBlogId === blogId ? null : blogId);
    };

    const isBlogExpanded = (blogId) => {
        return expandedBlogId === blogId;
    };

    return (
        <>
            <Header />
            <div className="max-w-3xl mx-auto mt-20">
                <h2 className="text-3xl font-semibold mb-4 text-center">All Blogs</h2>
                <div className="overflow-x-auto">
                    <table className="table-auto border-collapse border border-gray-800">
                        <thead>
                            <tr>
                                <th className="border border-gray-800 px-4 py-2">Title</th>
                                <th className="border border-gray-800 px-4 py-2">Content</th>
                                <th className="border border-gray-800 px-4 py-2">Author</th>
                                <th className="border border-gray-800 px-4 py-2">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {blogs.filter(val => val.id === 1).map((blog) => (
                                <tr key={blog.id}>
                                {console.log(blog, "gghhhhhhhh")}
                                    <td className="border border-gray-800 px-4 py-2">{editingBlogId === blog.id ? <input type="text" value={editedTitle} onChange={(e) => setEditedTitle(e.target.value)} /> : blog.title}</td>
                                    {console.log(editingBlogId, "jknbkhnkhnk")}
                                    <td className="border border-gray-800 px-4 py-2">
                                        {editingBlogId === blog.id ? (
                                            <textarea value={editedContent} onChange={(e) => setEditedContent(e.target.value)} />
                                        ) : (
                                            <>
                                                {isBlogExpanded(blog.id) ? blog.content : `${blog.content.substring(0, 100)}...`}
                                                <button
                                                    className="text-blue-500 hover:underline ml-2"
                                                    onClick={() => handleToggleExpand(blog.id)}
                                                >
                                                    {isBlogExpanded(blog.id) ? 'Read Less' : 'Read More'}
                                                </button>
                                            </>
                                        )}
                                    </td>
                                    <td className="border border-gray-800 px-4 py-2">{blog.author}</td>
                                    <td className="border border-gray-800 px-4 py-2">
                                        {editingBlogId === blog.id ? (
                                            <>
                                                <button className="bg-green-500 text-white px-3 py-1 mr-2" onClick={handleSaveEdit}>Save</button>
                                                <button className="bg-gray-500 text-white px-3 py-1" onClick={handleCancelEdit}>Cancel</button>
                                            </>
                                        ) : (
                                            <button className="bg-blue-500 text-white px-3 py-1 mr-2" onClick={() => handleEdit(blog.id)}>Edit</button>
                                        )}
                                        <button className="bg-red-500 text-white px-3 py-1" onClick={() => handleDelete(blog.id)}>Delete</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
};

export default BlogsPage;
