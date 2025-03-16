import React from 'react';
import Navbar from '../../Components/Essentials/Navbar';
import CoursesPage from '../../Components/Essentials/CoursesPage';
import Credit from '../../Components/Essentials/Credit';

export default function EngineeringAndTechnology() {
    const engineeringCoursesData = [
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

    let title = () => {
        let doctitle = "Engineering and Technology - UniGUIDE";
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
            <CoursesPage coursesData={engineeringCoursesData} />
            <Credit />
        </>
    );
}