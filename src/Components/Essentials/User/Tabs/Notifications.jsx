import React, { useState } from 'react';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';

const Notifications = () => {
    // Sample notifications data
    const notifications = [
        {
            id: 1,
            subject: "Welcome to UniGUIDE",
            message: "Welcome to UniGUIDE ! We are excited to have you on board. Explore our features and let us know if you have any suggestion. Happy learning!",
            date: "29/03/2023",
            time: "09:00 AM",
            isRead: false
        }
        // Add more notifications here as needed
    ];

    const [expandedIds, setExpandedIds] = useState([]);

    const toggleNotification = (id) => {
        setExpandedIds(prev => 
            prev.includes(id) 
                ? prev.filter(expandedId => expandedId !== id)
                : [...prev, id]
        );
    };

    return (
        <div className="p-6">
            <h2 className="text-2xl font-semibold mb-4">Notifications</h2>
            <div className="space-y-4">
                {notifications.map(notification => (
                    <div 
                        key={notification.id}
                        className={`bg-white rounded-lg shadow-sm border border-gray-200 transition-all
                            ${!notification.isRead ? 'border-l-4 border-l-blue-500' : ''}`}
                    >
                        <button
                            onClick={() => toggleNotification(notification.id)}
                            className="w-full text-left px-4 py-3 flex items-center justify-between"
                        >
                            <div className="flex-1">
                                <div className="flex items-center justify-between mb-1">
                                    <h3 className="font-medium text-gray-900">
                                        {notification.subject}
                                    </h3>
                                    <span className="text-sm text-gray-500">
                                        <span>{notification.time}</span>
                                        <span className="ml-3">{notification.date}</span>
                                    </span>
                                </div>
                            </div>
                            {/* {expandedIds.includes(notification.id) 
                                ? <FaChevronUp className="text-gray-400" /> 
                                : <FaChevronDown className="text-gray-400" />
                            } */}
                        </button>
                        
                        {expandedIds.includes(notification.id) && (
                            <div className="px-4 pb-3 text-gray-600 border-t border-gray-100 mt-1 pt-2">
                                {notification.message}
                            </div>
                        )}
                    </div>
                ))}

                {notifications.length === 0 && (
                    <div className="text-center py-8 text-gray-500">
                        No notifications to display
                    </div>
                )}
            </div>
        </div>
    );
};

export default Notifications;