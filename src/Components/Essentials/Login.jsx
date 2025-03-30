import React, { useState, useEffect } from 'react';
import LoginModal from './Login/LoginModal';
import Register from './Login/Register';

export default function Login({ isOpen, onClose, initialView = 'login', onLoginSuccess }) {
    const [currentView, setCurrentView] = useState(initialView);

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    const handleLoginSuccess = () => {
        console.log("Login component: Login successful"); // Debug log
        
        // Set login state in localStorage
        localStorage.setItem('isLoggedIn', 'true');
        
        // Broadcast login state change
        const loginEvent = new CustomEvent('loginStateChange', {
            detail: { isLoggedIn: true }
        });
        window.dispatchEvent(loginEvent);
        
        // Call parent's onLoginSuccess if provided
        if (onLoginSuccess) {
            onLoginSuccess();
        }
        
        // Close the modal
        handleClose();
    };

    const handleLogin = (credentials) => {
        if (credentials.username === "ad" && credentials.password === "123") {
            // Store username in localStorage
            localStorage.setItem('username', credentials.username);
            localStorage.setItem('isLoggedIn', 'true');
            
            // Call success handler
            if (onLoginSuccess) {
                onLoginSuccess();
            }
            
            // Close modal
            handleClose();
        }
    };

    const handleSwitchToRegister = () => {
        setCurrentView('register');
    };

    const handleSwitchToLogin = () => {
        setCurrentView('login');
    };

    const handleClose = () => {
        setCurrentView('login');
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="h-full flex flex-col">
            {currentView === 'login' ? (
                <>
                    <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">Login</h2>
                    <LoginModal
                        isOpen={true}
                        onClose={onClose}
                        onRegisterClick={handleSwitchToRegister}
                        onLoginSuccess={handleLoginSuccess} // Pass our local handler
                    />
                </>
            ) : (
                <Register
                    isOpen={true}
                    onClose={onClose}
                    onLoginClick={handleSwitchToLogin}
                />
            )}
        </div>
    );
}