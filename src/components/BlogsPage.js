import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { removeBlog } from '../features/blog/blogSlice';
import { Header } from './Header';

const BlogsPage = () => {
    const dispatch = useDispatch();
    const { activeUserDetail } = useSelector(state => state?.user);
    const [blogPost, setBlogPost] = useState([]);
    const [editingBlogId, setEditingBlogId] = useState(null);
    const [editedTitle, setEditedTitle] = useState('');
    const [editedContent, setEditedContent] = useState('');
    const [editedDescription, setEditedDescription] = useState('');
    const [expandedBlogId, setExpandedBlogId] = useState(null);

    useEffect(() => {
        const storedBlogs = JSON.parse(localStorage.getItem('blogs')) || [];
        const arr = storedBlogs?.filter(val => val?.userId === activeUserDetail?.id);
        console.log('activeUserDetail>>>>>>>>>>>>>>>>>', activeUserDetail);

        console.log(arr, "arrrrrrrrrrr")
        
        if(activeUserDetail){
        setBlogPost(arr);}

    }, [activeUserDetail?.id]);



    const handleDelete = (id) => {
        const updatedBlogs = blogPost.filter(blog => blog?.id !== id);
        localStorage.setItem('blogs', JSON.stringify(updatedBlogs));
        setBlogPost(updatedBlogs);
        dispatch(removeBlog(id));
    };

    const handleEdit = (blogId) => {
        const blogToEdit = blogPost.find(blog => blog?.id === blogId);
        setEditingBlogId(blogId);
        setEditedTitle(blogToEdit.title);
        setEditedContent(blogToEdit.content);
        setEditedDescription(blogToEdit.description);
    };

    const handleSaveEdit = () => {
        const updatedBlogs = blogPost.map(blog => {
            if (blog?.id === editingBlogId) {
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
        setBlogPost(updatedBlogs);
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

    const handleTitleChange = (e) => {
        setEditedTitle(e.target.value);
    };

    const handleContentChange = (e) => {
        setEditedContent(e.target.value);
    };


    return (
        <>
            <Header />
            <div className="max-w-3xl mx-auto mt-20">
                <h2 className="text-3xl font-semibold mb-4 text-center">My Blogs</h2>
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
                            {blogPost?.map((blog) => (
                                <tr key={blog?.id}>
                                    <td className="border border-gray-800 px-4 py-2">
                                        {editingBlogId === blog?.id ? (
                                            <input
                                                type="text"
                                                value={editedTitle}
                                                onChange={handleTitleChange}
                                                className="w-full border rounded-md px-2 py-1 focus:outline-none focus:border-blue-500"
                                            />
                                        ) : (
                                            blog.title
                                        )}
                                    </td>
                                    <td className="border border-gray-800 px-4 py-2">
                                        {editingBlogId === blog?.id ? (
                                            <textarea
                                                value={editedContent}
                                                onChange={handleContentChange}
                                                className="w-full border rounded-md px-2 py-1 focus:outline-none focus:border-blue-500"
                                            />
                                        ) : (
                                            <>
                                                {isBlogExpanded(blog?.id) ? blog.content : `${blog.content.substring(0, 100)}...`}
                                                <button
                                                    className="text-blue-500 hover:underline ml-2"
                                                    onClick={() => handleToggleExpand(blog?.id)}
                                                >
                                                    {isBlogExpanded(blog?.id) ? 'Read Less' : 'Read More'}
                                                </button>
                                            </>
                                        )}
                                    </td>
                                    <td className="border border-gray-800 px-4 py-2">{blog?.authorname}</td>
                                    <td className="border border-gray-800 px-4 py-2">
                                        {editingBlogId === blog?.id ? (
                                            <>
                                                <button className="bg-green-500 text-white px-3 py-1 mr-2" onClick={handleSaveEdit}>Save</button>
                                                <button className="bg-gray-500 text-white px-3 py-1" onClick={handleCancelEdit}>Cancel</button>
                                            </>
                                        ) : (
                                            <button className="bg-blue-500 text-white px-3 py-1 mr-2" onClick={() => handleEdit(blog?.id)}>Edit</button>
                                        )}
                                        <button className="bg-red-500 text-white px-3 py-1" onClick={() => handleDelete(blog?.id)}>Delete</button>
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
