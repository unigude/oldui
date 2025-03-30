import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { FaTimes } from 'react-icons/fa';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  faUser,
  faGraduationCap,
  faBook,
  faBell,
  faRightFromBracket
} from '@fortawesome/free-solid-svg-icons';

export default function UserAccount({ isOpen, onClose, onLogout, username = 'User', buttonRef }) {
  const location = useLocation();
  const navigate = useNavigate();
  const [modalPosition, setModalPosition] = useState({ top: 0, right: 0 });

  const isDashboard = location.pathname.startsWith('/user');

  // If not on dashboard and not open, don't render
  if (!isDashboard && !isOpen) return null;

  useEffect(() => {
    if (buttonRef?.current) {
      const buttonRect = buttonRef.current.getBoundingClientRect();
      setModalPosition({
        top: buttonRect.bottom + 8,
        right: window.innerWidth - buttonRect.right
      });
    }
  }, [buttonRef]);

  const handleNavigation = (path) => {
    navigate(path);
    if (!isDashboard) {
      onClose();
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('username');
    localStorage.removeItem('isLoggedIn');
    onLogout();
    onClose();

    const logoutEvent = new CustomEvent('loginStateChange', { 
      detail: { isLoggedIn: false } 
    });
    window.dispatchEvent(logoutEvent);
  };

  const menuItems = [
    {
      icon: faUser,
      label: 'Profile',
      action: () => handleNavigation('/user/profile'),
      className: 'text-gray-700 hover:bg-gray-100'
    },
    {
      icon: faGraduationCap,
      label: 'Continue Studying',
      action: () => handleNavigation('/user/continue-studying'),
      className: 'text-gray-700 hover:bg-gray-100'
    },
    {
      icon: faBook,
      label: 'My Library',
      action: () => handleNavigation('/user/my-library'),
      className: 'text-gray-700 hover:bg-gray-100'
    },
    {
      icon: faBell,
      label: 'Notifications',
      action: () => handleNavigation('/user/notifications'),
      className: 'text-gray-700 hover:bg-gray-100'
    }
  ];

  return (
    <>
      {/* Overlay only shown when not on dashboard */}
      {!isDashboard && (
        <div
          className="fixed inset-0 z-40  bg-opacity-20"
          onClick={onClose}
        />
      )}
      
      {/* Modal */}
      <div
        className={`fixed z-50 bg-white rounded-xl shadow-lg p-3 sm:p-4 w-full max-w-[280px]
          ${isDashboard ? 'border-2 border-blue-100' : ''}`}
        style={{
          top: `${modalPosition.top}px`,
          right: `${modalPosition.right}px`,
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button only shown when not on dashboard */}
        {!isDashboard && (
          <button
            onClick={onClose}
            className="absolute top-2 right-2 text-gray-400 hover:text-gray-600"
          >
            <FaTimes className="w-3 h-3" />
          </button>
        )}

        {/* User Info Section - reduced spacing */}
        <div className="text-center mb-4 pb-3 border-b border-gray-200">
          <div className="w-16 h-16 mx-auto mb-2 rounded-full bg-blue-100 flex items-center justify-center">
            <span className="text-xl font-semibold text-blue-600">
              {(username || 'U').charAt(0).toUpperCase()}
            </span>
          </div>
          <h3 className="text-lg font-bold text-gray-800">{username || 'User'}</h3>
          <p className="text-gray-500 text-xs mt-0.5">user@example.com</p>
        </div>

        {/* Menu Items - reduced padding */}
        <div className="space-y-1">
          {menuItems.map((item, index) => (
            <button
              key={index}
              className={`w-full flex items-center px-3 py-2 rounded-lg transition-colors duration-200 ${item.className}`}
              onClick={item.action}
            >
              <FontAwesomeIcon
                icon={item.icon}
                className="w-4 h-4 mr-2"
              />
              <span className="text-sm">{item.label}</span>
            </button>
          ))}
          
          {/* Updated Logout Button - reduced padding */}
          <button 
            onClick={handleLogout}
            className="justify-end w-full flex items-center px-3 py-2 rounded-lg transition-colors duration-200 text-gray-700 hover:bg-gray-100"
          >
            <span className="text-sm">Logout</span>
            <span className="ml-2">➜</span>
          </button>
        </div>
      </div>
    </>
  );
}

UserAccount.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onLogout: PropTypes.func.isRequired,
  username: PropTypes.string,
  buttonRef: PropTypes.object
};

UserAccount.defaultProps = {
  username: 'User'
};
