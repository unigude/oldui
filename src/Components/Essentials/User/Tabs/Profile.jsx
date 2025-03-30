import React, { useState, useEffect } from 'react';
import { FaPencilAlt, FaCheck, FaKey, FaEye, FaEyeSlash, FaChevronDown, FaChevronUp } from 'react-icons/fa';

const Profile = () => {
    const [username, setUsername] = useState(() => localStorage.getItem('username') || 'User');
    const [isEditing, setIsEditing] = useState(false);
    const [showConfirmation, setShowConfirmation] = useState(false);
    const [newUsername, setNewUsername] = useState(username);
    const [showPasswordSection, setShowPasswordSection] = useState(false);
    const [showPasswords, setShowPasswords] = useState({
        current: false,
        new: false,
        confirm: false
    });
    const [passwords, setPasswords] = useState({
        current: '123', // Set default password
        new: '',
        confirm: ''
    });
    const [hasChanges, setHasChanges] = useState(false);
    const [pendingUsernameChange, setPendingUsernameChange] = useState(false);
    const [pendingUsername, setPendingUsername] = useState('');

    useEffect(() => {
        // Only check new and confirm passwords for changes
        const hasPasswordChanges = passwords.new !== '' || passwords.confirm !== '';
        const hasUsernameChanges = pendingUsernameChange && pendingUsername !== username;
        
        setHasChanges(hasPasswordChanges || hasUsernameChanges);
    }, [passwords.new, passwords.confirm, pendingUsername, username, pendingUsernameChange]);

    const handleUsernameEdit = () => {
        if (isEditing) {
            setShowConfirmation(true);
            setPendingUsernameChange(true);
            setPendingUsername(newUsername);
        } else {
            setIsEditing(true);
        }
    };

    const confirmUsernameChange = () => {
        setPendingUsername(newUsername);
        setPendingUsernameChange(true);
        setIsEditing(false);
        setShowConfirmation(false);
    };

    const handlePasswordChange = (field, value) => {
        setPasswords(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const handleSaveChanges = () => {
        // Handle username changes
        if (pendingUsernameChange) {
            setUsername(pendingUsername);
            localStorage.setItem('username', pendingUsername);
            setPendingUsernameChange(false);
            
            // Dispatch event to update username across components
            const event = new CustomEvent('usernameChanged', { 
                detail: { username: pendingUsername } 
            });
            window.dispatchEvent(event);
        }

        // Handle password changes
        if (Object.values(passwords).some(value => value !== '')) {
            // Add your password update logic here
            console.log('Updating password...');
        }
        
        // Reset states after save
        setPasswords({ current: '', new: '', confirm: '' });
        setShowPasswordSection(false);
        setHasChanges(false);
    };

    return (
        <div className="p-6 space-y-6">
            <h2 className="text-2xl font-semibold mb-4">My Profile</h2>
            
            {/* Username Section */}
            <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Username</label>
                <div className="flex items-center gap-2">
                    <input
                        type="text"
                        value={isEditing ? newUsername : username}
                        onChange={(e) => setNewUsername(e.target.value)}
                        disabled={!isEditing}
                        className={`block w-full px-3 py-2 border rounded-md shadow-sm 
                            ${isEditing 
                                ? 'border-blue-500 bg-white' 
                                : 'border-gray-300 bg-gray-50'}`}
                    />
                    <button
                        onClick={handleUsernameEdit}
                        className="p-2 text-blue-600 hover:text-blue-700"
                    >
                        {isEditing ? <FaCheck size={16} /> : <FaPencilAlt size={16} />}
                    </button>
                </div>
            </div>

            {/* Email Section */}
            <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Email</label>
                <input
                    type="email"
                    value="user@example.com"
                    disabled
                    className="block w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-md shadow-sm"
                />
            </div>

            {/* Phone Section */}
            <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Phone Number</label>
                <input
                    type="tel"
                    value="+1234567890"
                    disabled
                    className="block w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-md shadow-sm"
                />
                <p className="text-sm text-gray-600">
                    Your phone number is not verified, {' '}
                    <button className="text-blue-600 hover:text-blue-700 font-medium">
                        Verify it Now
                    </button>
                </p>
            </div>

            {/* Password Section */}
            <div className="space-y-2">
                <button
                    onClick={() => setShowPasswordSection(!showPasswordSection)}
                    className="flex items-center gap-2 text-gray-700 hover:text-blue-600 transition-colors"
                >
                    <FaKey size={16} />
                    <span className="font-medium">Change Password</span>
                </button>
                
                {showPasswordSection && (
                    <div className="space-y-4 mt-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
                        {/* Current Password */}
                        <div className="relative">
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Current Password
                            </label>
                            <div className="relative">
                                <input
                                    type={showPasswords.current ? "text" : "password"}
                                    value={passwords.current}
                                    onChange={(e) => handlePasswordChange('current', e.target.value)}
                                    className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm pr-10"
                                    placeholder="Enter current password"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPasswords(prev => ({...prev, current: !prev.current}))}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                                >
                                    {showPasswords.current ? <FaEyeSlash size={16} /> : <FaEye size={16} />}
                                </button>
                            </div>
                        </div>

                        {/* New Password */}
                        <div className="relative">
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                New Password
                            </label>
                            <div className="relative">
                                <input
                                    type={showPasswords.new ? "text" : "password"}
                                    value={passwords.new}
                                    onChange={(e) => handlePasswordChange('new', e.target.value)}
                                    className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm pr-10"
                                    placeholder="Enter new password"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPasswords(prev => ({...prev, new: !prev.new}))}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                                >
                                    {showPasswords.new ? <FaEyeSlash size={16} /> : <FaEye size={16} />}
                                </button>
                            </div>
                        </div>

                        {/* Confirm New Password */}
                        <div className="relative">
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Confirm New Password
                            </label>
                            <div className="relative">
                                <input
                                    type={showPasswords.confirm ? "text" : "password"}
                                    value={passwords.confirm}
                                    onChange={(e) => handlePasswordChange('confirm', e.target.value)}
                                    className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm pr-10"
                                    placeholder="Confirm new password"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPasswords(prev => ({...prev, confirm: !prev.confirm}))}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                                >
                                    {showPasswords.confirm ? <FaEyeSlash size={16} /> : <FaEye size={16} />}
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* Confirmation Modal */}
            {showConfirmation && (
                <div className="fixed inset-0 bg-black/30 backdrop-blur-[2px] bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg p-6 max-w-sm w-full mx-4">
                        <h3 className="text-lg font-semibold mb-4">You are changing your username</h3>
                        <p className="text-gray-600 mb-6">
                            Are you sure you want to change your username to "{newUsername}"?
                        </p>
                        <div className="flex justify-end gap-4">
                            <button
                                onClick={() => setShowConfirmation(false)}
                                className="px-4 py-2 text-gray-600 hover:text-gray-700"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={confirmUsernameChange}
                                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                            >
                                OK
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <div className="pt-6 mt-6 border-t border-gray-200">
                <button
                    onClick={handleSaveChanges}
                    disabled={!hasChanges}
                    className={`w-full px-4 py-2 rounded-md text-white transition-colors
                        ${hasChanges 
                            ? 'bg-blue-600 hover:bg-blue-700' 
                            : 'bg-gray-300'}`}
                >
                    Save Changes
                </button>
            </div>
        </div>
    );
};

export default Profile;