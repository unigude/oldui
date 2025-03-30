import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaArrowRight, FaBookmark } from "react-icons/fa";

const Banner = ({ name, description, to }) => {
    const [isFollowed, setIsFollowed] = useState(false);
    const handleFollow = (e) => {
        e.preventDefault();
        setIsFollowed(!isFollowed);
    };

    return (
        <Link to={to} className="w-full block">
            <div className="relative flex items-center p-9 bg-white border-l-4 border-blue-600 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200">
                <button
                    onClick={handleFollow}
                    className={`absolute top-2 right-2 z-10 px-3 py-1.5 rounded-full text-sm font-medium transition-all duration-200 flex items-center gap-2 ${isFollowed ? 'bg-blue-50 text-blue-600' : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
                        }`}
                >
                    <FaBookmark className={isFollowed ? 'text-blue-600' : 'text-gray-400'} />
                    {isFollowed ? 'Followed' : 'Follow'}
                </button>
                <div className="flex flex-col flex-1">
                    <h2 className="text-xl font-semibold text-gray-900 text-center">{name}</h2>
                    <p className="text-sm text-gray-600 text-center mt-2">{description}</p>
                </div>
                <div className="text-gray-500">
                    <FaArrowRight className="text-2xl" />
                </div>
            </div>
        </Link>
    );
};

export default Banner;