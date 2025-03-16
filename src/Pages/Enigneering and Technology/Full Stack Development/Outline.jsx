import React from 'react';
import Navbar from '../../../Components/Essentials/Navbar';
import Credit from '../../../Components/Essentials/Credit';
import CourseDetail from '../../../Components/Essentials/CourseDetail';

export default function Outline() {
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

    let title = () => {
        let doctitle = "Full Stack Development - UniGUIDE";
        document.title = doctitle;
    }

    return (
        <>
            {title()}
            <Navbar 
                title="UniGUIDE" 
                titlepage="/" 
                comp1="Home" 
                page1="/" 
                comp2="Fields" 
                page2="/Fields" 
                comp3="Suggestions" 
                page3="/Suggestions" 
                comp4="About" 
                page4="/About" 
            />
            <CourseDetail 
                title="Full Stack Development"
                description="Learn to build and deploy full stack applications."
                courseData={courseData}
            />
            <Credit />
        </>
    );
}