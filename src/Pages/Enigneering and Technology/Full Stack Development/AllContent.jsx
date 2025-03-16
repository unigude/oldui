import React from 'react';
import Navbar from '../../../Components/Essentials/Navbar';
import Credit from '../../../Components/Essentials/Credit';
import Study from '../../../Components/PageSpecific/Study';

export default function AllContent() {
    let title = () => {
        let doctitle = "All COntents (FSD) - UniGUIDE";
        document.title = doctitle;
    }
    return (
        <>
            {title()}
            <Navbar title="UniGUIDE" titlepage="/" comp1="Home" page1="/" comp2="Fields" page2="/Fields" comp3="Suggestions" page3="/Suggestions" comp4="About" page4="/About" />
            <Study />
            <Credit />
        </>
    );
}