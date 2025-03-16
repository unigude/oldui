import React from "react";
import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";

const Banner = ({ name, description, to }) => {
    return (
        <Link to={to} className="w-full block">
            <div className="relative flex items-center p-4 bg-white border-l-4 border-blue-600 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200">
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