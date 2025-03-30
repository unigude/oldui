import React, { useState, useRef, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faPlay, faBook, faBell } from '@fortawesome/free-solid-svg-icons';
import { NavLink, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import Profile from './Tabs/Profile';
import ContinueStudying from './Tabs/ContinueStudying';
import Library from './Tabs/Library';
import Notifications from './Tabs/Notifications';
import './styles/TabAnimation.css';
import Navbar from '../Navbar';
import Credit from '../Credit';
import defaultBanner from '../../../assets/images/hero-bg.jpg'; // Adjust path as needed
import { FaCamera } from 'react-icons/fa';

const Dashboard = () => {
    const [isTransitioning, setIsTransitioning] = useState(false);
    const [previousTab, setPreviousTab] = useState(null);
    const [username, setUsername] = useState('User'); // Add username state
    const [bannerImage, setBannerImage] = useState(() => {
        return localStorage.getItem('userBanner') || defaultBanner;
    });
    const [profileImage, setProfileImage] = useState(() => {
        return localStorage.getItem('userProfileImage') || null;
    });
    const [showImageModal, setShowImageModal] = useState(false);
    const [showPreviewModal, setShowPreviewModal] = useState(false);
    const fileInputRef = useRef(null);
    const tabRefs = useRef({});
    const location = useLocation();

    // Add useEffect to get username from localStorage
    useEffect(() => {
        const storedUsername = localStorage.getItem('username');
        if (storedUsername) {
            setUsername(storedUsername);
        }
    }, []);

    const handleBannerChange = (newBannerUrl) => {
        setBannerImage(newBannerUrl);
        localStorage.setItem('userBanner', newBannerUrl);
    };

    const handleImageClick = (e) => {
        // If clicking the camera button, show upload modal
        if (e.target.closest('button')) {
            setShowImageModal(true);
        } 
        // If clicking the image, show preview modal
        else if (profileImage) {
            setShowPreviewModal(true);
        }
    };

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setProfileImage(reader.result);
                localStorage.setItem('userProfileImage', reader.result);
            };
            reader.readAsDataURL(file);
        }
        setShowImageModal(false);
    };

    const tabs = [
        { id: 'profile', icon: faUser, label: 'Profile', path: '/user/profile' },
        { id: 'continue', icon: faPlay, label: 'Continue Studying', path: '/user/continue-studying' },
        { id: 'library', icon: faBook, label: 'My Library', path: '/user/my-library' },
        { id: 'notifications', icon: faBell, label: 'Notifications', path: '/user/notifications' }
    ];

    const handleTabChange = (tabId) => {
        const currentTab = tabs.find(tab => tab.path === location.pathname)?.id;
        setPreviousTab(currentTab);
        setIsTransitioning(true);
        setTimeout(() => setIsTransitioning(false), 300);
    };

    const getFlowDirection = (newTab) => {
        if (!previousTab) return '';
        const previousIndex = tabs.findIndex(tab => tab.id === previousTab);
        const newIndex = tabs.findIndex(tab => tab.id === newTab);
        return previousIndex < newIndex ? 'flow-right' : 'flow-left';
    };

    return (
        <>
            <Navbar 
                titlepage={"/"} 
                title={"UniGUIDE"} 
                comp1={"Home"} 
                page1={"/"} 
                comp2={"Fields"} 
                page2={"/Fields"} 
                comp3={"Suggestions"} 
                page3={"/Suggestions"} 
                comp4={"About"} 
                page4={"/About"}
                username={username} // Pass username to Navbar
            />
            <div className="min-h-screen bg-zinc-50 relative">
                {/* Banner and Profile Section */}
                <div className="relative">
                    {/* Banner Image */}
                    <div className="relative h-[350px] w-full overflow-hidden">
                        <img
                            src={bannerImage}
                            alt="Profile Banner"
                            className="w-full h-full object-cover"
                        />
                        {/* Optional: Add banner change button */}
                        <button 
                            onClick={() => handleBannerChange(/* new image URL */)}
                            className="absolute bottom-4 right-4 bg-white/80 hover:bg-white text-gray-700 px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200"
                        >
                            Change Banner
                        </button>
                    </div>

                    {/* Profile Image - Positioned over the banner */}
                    <div className="absolute left-1/2 transform -translate-x-1/2 -bottom-20 text-center">
                        <div className="w-40 h-40 rounded-full bg-blue-100 mx-auto mb-4 border-4 border-white shadow-lg flex items-center justify-center relative">
                            {profileImage ? (
                                <img
                                    src={profileImage}
                                    alt="Profile"
                                    className="w-full h-full rounded-full object-cover"
                                    onClick={handleImageClick}
                                />
                            ) : (
                                <span className="text-6xl font-semibold text-blue-600">
                                    {(username || 'U').charAt(0).toUpperCase()}
                                </span>
                            )}
                            <button
                                onClick={handleImageClick}
                                className="absolute bottom-2 right-2 bg-white/80 hover:bg-white text-gray-700 p-2 rounded-full text-sm font-medium transition-colors duration-200"
                            >
                                <FaCamera />
                            </button>
                        </div>
                        <h2 className="text-2xl font-bold text-zinc-800">{username}</h2>
                        <p className="text-zinc-500">user@example.com</p>
                    </div>
                </div>

                {/* Profile Image Preview Modal */}
                {showPreviewModal && profileImage && (
                    <div 
                        className="fixed inset-0 z-50 flex items-center justify-center bg-black/80"
                        onClick={() => setShowPreviewModal(false)}
                    >
                        <div 
                            className="relative max-w-3xl max-h-[90vh] w-full m-4 rounded-lg overflow-hidden"
                            onClick={e => e.stopPropagation()}
                        >
                            <img
                                src={profileImage}
                                alt="Profile"
                                className="w-full h-full object-contain"
                            />
                            <button
                                onClick={() => setShowPreviewModal(false)}
                                className="absolute top-4 right-4 bg-black/50 hover:bg-black/70 text-white w-10 h-10 rounded-full flex items-center justify-center"
                            >
                                ×
                            </button>
                        </div>
                    </div>
                )}

                {/* Image Modal */}
                {showImageModal && (
                    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                        <div className="bg-white p-6 rounded-lg shadow-lg">
                            <h2 className="text-lg font-bold mb-4">Upload Profile Image</h2>
                            <input
                                type="file"
                                accept="image/*"
                                ref={fileInputRef}
                                onChange={handleImageChange}
                                className="mb-4"
                            />
                            <button
                                onClick={() => setShowImageModal(false)}
                                className="bg-red-500 text-white px-4 py-2 rounded-lg"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                )}

                {/* Main Content - Adjusted padding to account for profile section */}
                <div className="max-w-6xl mx-auto px-4 pr-[300px] pt-[160px] pb-8">
                    {/* Greeting */}
                    <div className="mb-8">
                        <h1 className="text-3xl font-bold text-zinc-800">
                            Hi, {username}! 👋
                        </h1>
                    </div>

                    {/* Navigation */}
                    <nav className="flex flex-wrap gap-2 mb-6 border-b border-zinc-200 relative">
                        {tabs.map(tab => (
                            <NavLink
                                key={tab.id}
                                to={tab.path}
                                ref={el => tabRefs.current[tab.id] = el}
                                onClick={() => handleTabChange(tab.id)}
                                className={({ isActive }) => `
                                    flex items-center px-4 py-3 text-sm font-medium relative
                                    transition-colors duration-300 ease-in-out
                                    ${isActive ? 'text-blue-600' : 'text-zinc-600 hover:text-blue-600'}
                                `}
                            >
                                <FontAwesomeIcon 
                                    icon={tab.icon} 
                                    className={`mr-2 transition-transform duration-300 ease-in-out
                                        ${location.pathname === tab.path ? 'scale-110' : 'scale-100'}`}
                                />
                                {tab.label}
                                {location.pathname === tab.path && (
                                    <div 
                                        className={`tab-indicator ${getFlowDirection(tab.id)}`}
                                        style={{ width: '100%' }}
                                    />
                                )}
                            </NavLink>
                        ))}
                    </nav>

                    {/* Content Area */}
                    <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                        <div className={`transition-opacity duration-300 ease-in-out
                            ${isTransitioning ? 'opacity-0' : 'opacity-100'}`}>
                            <Routes>
                                <Route path="profile" element={<Profile />} />
                                <Route path="continue-studying" element={<ContinueStudying />} />
                                <Route path="my-library" element={<Library />} />
                                <Route path="notifications" element={<Notifications />} />
                                <Route path="" element={<Navigate to="profile" replace />} />
                            </Routes>
                        </div>
                    </div>
                </div>
            </div>
            <Credit />
        </>
    );
};

export default Dashboard;