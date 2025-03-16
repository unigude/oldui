import React from "react";
import { FaBook, FaFilePdf, FaVideo } from "react-icons/fa";
import { Link } from "react-router-dom";

const CourseBanner = ({ name, videos, exercises, notes, to, className, height }) => {
    return (
        <Link to={to} className={`block p-2 rounded-lg border border-gray-200 shadow-md hover:shadow-lg transition-shadow duration-200 bg-white ${className}`} style={{ height: height }}>
            <div>
                <h3 className="text-lg font-semibold flex items-center mb-2">
                    <span className="border-l-4 border-blue-600 pl-2">{name}</span>
                </h3>
                <div className="flex items-center text-sm text-gray-500">
                    <div className="flex items-center mr-4">
                        <FaVideo className="mr-1 text-red-600" />
                        <span>{videos}</span>
                    </div>
                    <div className="flex items-center mr-4">
                        <FaBook className="mx-1 text-blue-600" />
                        <span>{exercises}</span>
                    </div>
                    <div className="flex items-center">
                        <FaFilePdf className="mx-1 text-green-600" />
                        <span>{notes}</span>
                    </div>
                </div>
            </div>
        </Link>
    );
};

export default CourseBanner;