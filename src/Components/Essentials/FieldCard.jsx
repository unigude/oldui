import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const FieldCard = ({ title, description, icon, to }) => {
    return (
        <Link to={to} className="w-full">
            <div
                className={"bg-white shadow-md border-t-4 border-blue-400 rounded-lg p-6 flex flex-col items-center transform transition-transform duration-300 hover:scale-105 cursor-pointer"}
            >
                <FontAwesomeIcon icon={icon} className="text-4xl text-blue-500 mb-4" />
                <h3 className="mt-4 text-xl font-bold text-center">{title}</h3>
                <p className="text-gray-600 text-center mt-2 mb-4">{description}</p>
            </div>
        </Link>
    );
};


export default FieldCard;

