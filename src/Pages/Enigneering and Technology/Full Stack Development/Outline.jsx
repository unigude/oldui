import React from 'react';
import Navbar from '../../../Components/Essentials/Navbar';
import Credit from '../../../Components/Essentials/Credit';
import CourseDetail from '../../../Components/PageSpecific/CourseDetail';

export default function Outline() {
    let title = () => {
        let doctitle = "Full Stack Development - UniGUIDE";
        document.title = doctitle;
    }
    return (
        <>
            {title()}
            <Navbar title="UniGUIDE" titlepage="/" comp1="Home" page1="/" comp2="Fields" page2="/Fields" comp3="Suggestions" page3="/Suggestions" comp4="About" page4="/About" />
            <CourseDetail />
            <Credit />
        </>
    );
}