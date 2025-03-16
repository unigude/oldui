import React from "react";
import FieldCard from "../Essentials/FieldCard";
import { faWrench, faClock } from "@fortawesome/free-solid-svg-icons";

const fieldsData = [
    {
        title: "Engineering & Technology",
        description: "Exploring latest tech innovations.",
        icon: faWrench,
        to: "/Fields/Engineering-and-Technology/Courses"
    },
    {
        title: "Coming Soon",
        description: "Stay tuned for updates!",
        icon: faClock,
        to: "#"
    }
];

export default function EducationFields() {
    return (
        <div className="bg-gray-100 min-h-screen flex flex-col">
            <div className="container mx-auto py-27 px-4 sm:px-6 lg:px-8 flex flex-col items-center">
                <h1 className="text-4xl sm:text-4xl md:text-5xl font-bold text-gray-800 text-center mb-4 sm:mb-8">
                    Educational Fields
                </h1>
                <p className="text-xl sm:text-base md:text-lg text-gray-600 text-center mb-6 sm:mb-12">
                    Explore different educational domains to find your passion.
                </p>

                <div className="grid grid-cols-2 gap-2 sm:gap-8 max-w-5xl w-full">
                    {fieldsData.map((field, index) => (
                        <FieldCard
                            key={index}
                            title={field.title}
                            description={field.description}
                            icon={field.icon}
                            to={field.to}
                            titleClassName="text-xs sm:text-base md:text-lg font-semibold text-center"
                            descriptionClassName="text-sm sm:text-sm md:text-base"
                            iconClassName="text-base sm:text-2xl md:text-3xl"
                            iconPosition="top" // New prop to position icon above title
                        />
                    ))}
                </div>
            </div>

            <div className="text-center py-12 sm:py-20">
                <p className="text-sm sm:text-xl text-gray-500 font-semibold">
                    More Fields Coming Soon...
                </p>
            </div>
        </div>
    );
}