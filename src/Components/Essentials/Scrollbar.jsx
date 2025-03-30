import React, { useState, useEffect, useRef } from "react";
import PropTypes from 'prop-types';
import { Link as RouterLink } from 'react-router-dom';
import { Link as ScrollLink } from 'react-scroll';
import { FaGraduationCap, FaBars, FaTimes, FaUser } from "react-icons/fa";
import Login from "./Login";
import Button from "./Button";
import UserAccount from "./UserAccount";

const Scrollbar = ({ title, comp1, comp2, comp3, titlepage, page2, page3 }) => {
    const [menuOpen, setMenuOpen] = useState(false);
    const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isUserAccountOpen, setIsUserAccountOpen] = useState(false);
    const userButtonRef = useRef(null);
    const [profileImage, setProfileImage] = useState(() => {
        return localStorage.getItem('userProfileImage') || null;
    });
    const [username, setUsername] = useState(() => {
        return localStorage.getItem('username') || 'User';
    });

    const handleLoginSuccess = () => {
        console.log("Login success handler called"); // Debug log
        setIsLoggedIn(true);
        setIsAuthModalOpen(false);
        // Store login state in localStorage
        localStorage.setItem('isLoggedIn', 'true');
    };

    // Add this to all components (Index, Navbar, Scrollbar)
    const handleLogout = () => {
        setIsLoggedIn(false);
        setIsUserAccountOpen(false);
        // Remove login state from localStorage
        localStorage.removeItem('isLoggedIn');
        // Broadcast logout event
        const logoutEvent = new CustomEvent('loginStateChange', {
            detail: { isLoggedIn: false }
        });
        window.dispatchEvent(logoutEvent);
    };

    useEffect(() => {
        // Check initial login state
        const loginState = localStorage.getItem('isLoggedIn');
        if (loginState === 'true') {
            setIsLoggedIn(true);
        }

        // Listen for login state changes
        const handleLoginStateChange = (event) => {
            setIsLoggedIn(event.detail.isLoggedIn);
        };

        window.addEventListener('loginStateChange', handleLoginStateChange);

        return () => {
            window.removeEventListener('loginStateChange', handleLoginStateChange);
        };
    }, []);

    // Add effect to listen for profile image changes
    useEffect(() => {
        const handleStorageChange = () => {
            setProfileImage(localStorage.getItem('userProfileImage'));
            setUsername(localStorage.getItem('username') || 'User');
        };
        window.addEventListener('storage', handleStorageChange);
        return () => window.removeEventListener('storage', handleStorageChange);
    }, []);

    return (
        <>
            <nav className="bg-[#1E3A4C] text-white px-6 py-4 shadow-md fixed top-0 left-0 w-full z-50"
                style={{ fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif", height: '70px' }}>
                <div className="container mx-auto flex justify-between items-center h-full">
                    {/* Left side - Menu button and Title */}
                    <div className="flex items-center gap-4 text-3xl font-bold">
                        <button className="md:hidden text-2xl" onClick={() => setMenuOpen(!menuOpen)}>
                            {menuOpen ? <FaTimes /> : <FaBars />}
                        </button>
                        <FaGraduationCap className="text-blue-400 text-4xl" />
                        <span>
                            <RouterLink to={titlepage}>{title}</RouterLink>
                        </span>
                    </div>

                    {/* Right side - Login/User Profile Button */}
                    <div className="flex items-center">
                        {/* Desktop Navigation */}
                        <div className="hidden md:flex items-center gap-7 h-full mr-5">
                            <ul className="flex gap-6 text-base items-center h-full">
                                <li className="hover:text-blue-400 cursor-pointer">
                                    <ScrollLink to="fields" smooth={true} duration={500}>{comp1}</ScrollLink>
                                </li>
                                <li className="hover:text-blue-400 cursor-pointer">
                                    <RouterLink to={page2}>{comp2}</RouterLink>
                                </li>
                                <li className="hover:text-blue-400 cursor-pointer">
                                    <RouterLink to={page3}>{comp3}</RouterLink>
                                </li>
                            </ul>
                        </div>
                        {/* Conditional rendering for Login/User Profile */}
                        {isLoggedIn ? (
                            <button
                                ref={userButtonRef}
                                onClick={() => setIsUserAccountOpen(true)}
                                className="w-10 h-10 rounded-full overflow-hidden flex items-center justify-center border-2 border-white hover:border-blue-400 transition-colors"
                            >
                                {profileImage ? (
                                    <img
                                        src={profileImage}
                                        alt={username}
                                        className="w-full h-full object-cover"
                                    />
                                ) : (
                                    <div className="w-full h-full bg-blue-500 flex items-center justify-center">
                                        <span className="text-white text-lg font-semibold">
                                            {(username || 'U').charAt(0).toUpperCase()}
                                        </span>
                                    </div>
                                )}
                            </button>
                        ) : (
                            <Button
                                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-1.5 rounded-lg text-sm md:text-base flex items-center"
                                onClick={() => setIsAuthModalOpen(true)}
                            >
                                LogIn
                            </Button>
                        )}
                    </div>
                </div>

                {/* Mobile Navigation Menu */}
                {menuOpen && (
                    <ul className="md:hidden mt-3 space-y-3 text-left bg-[#1E3A4C] py-3 px-6 rounded-lg shadow-lg absolute w-full left-0">
                        <li className="hover:text-blue-400 cursor-pointer">
                            <ScrollLink to="fields" smooth={true} duration={500}>{comp1}</ScrollLink>
                        </li>
                        <li className="hover:text-blue-400 cursor-pointer">
                            <RouterLink to={page2}>{comp2}</RouterLink>
                        </li>
                        <li className="hover:text-blue-400 cursor-pointer">
                            <RouterLink to={page3}>{comp3}</RouterLink>
                        </li>
                    </ul>
                )}
            </nav>
            {/* Login Modal */}
            {isAuthModalOpen && !isLoggedIn && (
                <div className="fixed inset-0 z-[9999]">
                    <div
                        className="fixed inset-0 bg-black/30 backdrop-blur-[2px]"
                        onClick={() => setIsAuthModalOpen(false)}
                    />
                    <div className="fixed inset-0 flex items-center justify-center p-4">
                        <Login
                            isOpen={isAuthModalOpen}
                            onClose={() => setIsAuthModalOpen(false)}
                            initialView="login"
                            onLoginSuccess={handleLoginSuccess}
                        />
                    </div>
                </div>
            )}

            {/* User Account Modal */}
            {isUserAccountOpen && isLoggedIn && (
                <div className="fixed inset-0 z-[9999]">
                    <div
                        className="fixed inset-0"
                        onClick={() => setIsUserAccountOpen(false)}
                    />
                    <div className="fixed top-20 right-4">
                        <UserAccount
                            isOpen={isUserAccountOpen}
                            onClose={() => setIsUserAccountOpen(false)}
                            onLogout={handleLogout}
                            username={username}
                            buttonRef={userButtonRef}
                        />
                    </div>
                </div>
            )}

        </>
    );
}

Scrollbar.propTypes = {
    title: PropTypes.string.isRequired,
    comp1: PropTypes.string.isRequired,
    comp2: PropTypes.string.isRequired,
    comp3: PropTypes.string.isRequired,
    titlepage: PropTypes.string,
    page1: PropTypes.string,
    page2: PropTypes.string,
    page3: PropTypes.string,
};

Scrollbar.defaultProps = {
    title: '<title>',
    comp1: '<page1 title>',
    comp2: '<page2 title>',
    comp3: '<page3 title>',
    titlepage: '/',
    page1: '/',
    page2: '/',
    page3: '/',
};

export default Scrollbar;