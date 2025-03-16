import React from 'react';
import Navbar from '../../Components/Essentials/Navbar';
import CoursesPageEnT from '../../Components/PageSpecific/CoursesPageEnT';
import Credit from '../../Components/Essentials/Credit';

export default function EngineeringAndTechnology() {
    let title = () => {
        let doctitle = "Engineering and Technology - UniGUIDE";
        document.title = doctitle;
    }
    return (
        <>
            {title()}
            <Navbar title="UniGUIDE" titlepage="/" comp1="Home" page1="/" comp2="Fields" page2="/Fields" comp3="Suggestions" page3="/Suggestions" comp4="About" page4="/About" />
            <CoursesPageEnT />
            <Credit />
        </>
    );
}