import React from 'react';
import Navbar from '../../../Components/Essentials/Navbar';
import Credit from '../../../Components/Essentials/Credit';
import Study from '../../../Components/Essentials/Study';

export default function AllContent() {
    const studyData = {
        title: "All Contents",
        tabItems: ["Videos", "PDF", "DPP"]
    };

    let title = () => {
        let doctitle = "All Contents (FSD) - UniGUIDE";
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
            <Study 
                title={studyData.title}
                tabItems={studyData.tabItems}
            />
            <Credit />
        </>
    );
}