import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FaBookmark } from "react-icons/fa";

const FieldCard = ({ title, description, icon, to }) => {
    const [isFollowed, setIsFollowed] = useState(false);
    const handleFollow = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setIsFollowed(!isFollowed);
    };
    return (
        <div className="relative w-full">
            <button
                onClick={handleFollow}
                className={`absolute top-2 right-2 z-10 px-3 py-1.5 
                            rounded-full text-sm font-medium transition-all duration-200 flex items-center gap-2
                            ${isFollowed
                        ? 'bg-blue-50 text-blue-600'
                        : 'bg-white text-gray-600 hover:bg-gray-50'}`}
            >
                <FaBookmark className={isFollowed ? 'text-blue-600' : 'text-gray-400'} />
                {isFollowed ? 'Followed' : 'Follow'}
            </button>
            <Link to={to} className="w-full">
                <div
                    className={"bg-white shadow-md border-t-4 border-blue-400 rounded-lg p-6 flex flex-col items-center transform transition-transform duration-300 hover:scale-105 cursor-pointer"}
                >
                    <FontAwesomeIcon icon={icon} className="text-4xl text-blue-500 mb-4" />
                    <h3 className="mt-4 text-xl font-bold text-center">{title}</h3>
                    <p className="text-gray-600 text-center mt-2 mb-4">{description}</p>
                </div>
            </Link>
        </div>
    );
};


export default FieldCard;

