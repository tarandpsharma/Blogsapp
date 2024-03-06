import React, { useEffect, useState } from 'react';
import Header from '../Header';
import { useSelector } from 'react-redux';

export const Profile = () => {
    const { activeUserDetail } = useSelector(state => state.user);
    const [profileImage, setProfileImage] = useState(localStorage.getItem('profileImage') || null);
    const [editableName, setEditableName] = useState(localStorage.getItem('userName') || (activeUserDetail ? activeUserDetail.name : ''));
    const [isEditingName, setIsEditingName] = useState(false);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onloadend = () => {
            setProfileImage(reader.result);
            localStorage.setItem('profileImage', reader.result);
        };
        reader.readAsDataURL(file);
    };

    const handleRemoveImage = () => {
        setProfileImage(null);
        localStorage.removeItem('profileImage');
    };

    const handleNameChange = (e) => {
        setEditableName(e.target.value);
    };

    const handleSaveName = () => {
        localStorage.setItem('userName', editableName);
        setIsEditingName(false);
    };

    const handleEditName = () => {
        setIsEditingName(true);
    };

    return (
        <>
            <Header />
            <div className="max-w-md mx-auto my-10 mt-28 bg-gray-200 shadow-lg rounded-lg overflow-hidden">
                <div className="px-4 py-6">
                    <div className="ml-36">
                        {profileImage ? (
                            <>
                                <img className="h-32 w-32 rounded-full" src={profileImage} alt="User profile" />
                                <button
                                    className="ml-2 px-3 mt-2 py-1 bg-red-500 text-white rounded-md"
                                    onClick={handleRemoveImage}
                                >
                                    Remove Image
                                </button>
                            </>
                        ) : (
                            <label htmlFor="imageUpload" className="cursor-pointer">
                                <div className="h-32 w-32 flex items-center justify-center border-2 border-gray-400 rounded-full">
                                    <span className="text-gray-400">Add Image</span>
                                </div>
                                <input
                                    id="imageUpload"
                                    type="file"
                                    accept="image/*"
                                    className="hidden"
                                    onChange={handleImageChange}
                                />
                            </label>
                        )}
                    </div>
                    <div className="mt-4">
                        <label className="text-md font-bold text-gray-600">Name:</label>
                        <div className="flex items-center">
                            {isEditingName ? (
                                <input
                                    type="text"
                                    className="mt-1 bg-transparent"
                                    value={editableName}
                                    onChange={handleNameChange}
                                    autoFocus
                                />
                            ) : (
                                <div className="flex items-center">
                                    <span className="mr-2">{editableName}</span>
                                    <a href='#'
                                        className="text-blue-900 underline"
                                        onClick={handleEditName}
                                    >
                                        Edit
                                    </a>
                                </div>
                            )}
                            {isEditingName && (
                                <button
                                    className="ml-2 px-3 py-1 font-bold bg-blue-500 text-white rounded-md"
                                    onClick={handleSaveName}
                                >
                                    Save
                                </button>
                            )}
                        </div>
                    </div>
                    {activeUserDetail && (
                        <div className="mt-6">
                            <label className="text-md text-gray-600 font-bold">Email:</label>
                            <p className="mt-1 text-gray-900">{activeUserDetail.email}</p>
                        </div>
                    )}
                    <div className="mt-4">
                        <label className="text-md font-bold text-gray-600">Location:</label>
                        <p className="mt-1 text-gray-900">Panjab</p>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Profile;
