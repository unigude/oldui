import React from "react";
import Navbar from "../Components/Essentials/Navbar";
import Suggestion from "../Components/PageSpecific/Suggestion";
import Credit from "../Components/Essentials/Credit";

export default function Suggestions() {
    let title = () => {
        let doctitle = "Suggestion - UniGUIDE";
        document.title = doctitle;
    }
    return (
        <>
            {title()}
            <Navbar title="UniGUIDE" titlepage="/" comp1="Home" page1="/" comp2="Fields" page2="/Fields" comp3="About" page3="/About" />
            <Suggestion />
            <Credit />
        </>
    );
}