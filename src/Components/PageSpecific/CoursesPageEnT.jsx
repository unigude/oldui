import React from "react";
import Banner from "../Essentials/Banner";

const coursesData = [
    {
        name: "Full Stack Development",
        description: "Learn front-end and back-end technologies, including React, Node.js, Express, and databases, to build modern web applications.",
        to: "/Fields/Engineering-and-Technology/Courses/Full-Stack-Development"
    },
    {
        name: "Coming Soon",
        description: "Stay tuned for more exciting courses coming your way!",
        to: "#"
    }
];

const CoursesPageEnT = () => {
    return (
        <div className="min-h-screen bg-gray-100">
            <div className="container mx-auto px-4 sm:px-6 py-23 sm:py-23">
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4 sm:mb-6 text-center sm:text-left">
                    Courses
                </h1>
                
                <div className="space-y-3 sm:space-y-4">
                    {coursesData.map((course, index) => (
                        <Banner
                            key={index}
                            name={course.name}
                            description={course.description}
                            to={course.to}
                            className="hover:shadow-lg transition-shadow duration-200"
                        />
                    ))}
                </div>

                <p className="text-center text-gray-500 text-base sm:text-lg mt-6 sm:mt-8">
                    More courses coming soon.
                </p>
            </div>
        </div>
    );
};

export default CoursesPageEnT;
