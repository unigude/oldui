import React from "react";
import CourseBanner from "../Essentials/CourseBanner";

const courseData = [
    {
        name: "All Contents",
        videos: 0,
        exercises: 0,
        notes: 0,
        to: "/Fields/Engineering-and-Technology/Courses/Full-Stack-Development/All-Contents"
    },
    {
        name: "Frontend Development",
        videos: 0,
        exercises: 0,
        notes: 0,
        to: "#"
    },
    {
        name: "Backend Development",
        videos: 0,
        exercises: 0,
        notes: 0,
        to: "#"
    },
    {
        name: "Database Management",
        videos: 0,
        exercises: 0,
        notes: 0,
        to: "#"
    },
    {
        name: "Deployment & DevOps",
        videos: 0,
        exercises: 0,
        notes: 0,
        to: "#"
    }
];

const CourseDetail = () => {
    return (
        <div className="min-h-screen bg-gray-50 py-23 sm:py-23">
            <div className="container mx-auto px-3 sm:px-6">
                {/* Header section */}
                <div className="max-w-3xl mx-auto mb-8">
                    <h1 className="text-2xl sm:text-3xl font-bold text-center mb-3">
                        Full Stack Development
                    </h1>
                    <p className="text-sm sm:text-base text-gray-600 text-center">
                        Learn to build and deploy full stack applications.         
                    </p>
                </div>

                {/* Course banners grid */}
                <div className="max-w-5xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-6">
                        {courseData.map((course, index) => (
                            <div key={index} className="w-full">
                                <CourseBanner
                                    name={course.name}
                                    videos={course.videos}
                                    exercises={course.exercises}
                                    notes={course.notes}
                                    to={course.to}
                                    className="shadow hover:shadow-md transition-shadow duration-200"
                                    height="78px" // You can adjust the height here
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CourseDetail;