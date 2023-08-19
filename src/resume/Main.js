import {ScrollTop} from "primereact/scrolltop";
import * as React from 'react';
import TopBar from "./components/Topbar";
import Contact from "./sections/Contact";
import Education from "./sections/Education";
import Home from "./sections/Home";
import IndustrialExperience from "./sections/Industry";
import Projects from "./sections/Projects";
import Skills from "./sections/Skills";

function Main() {

    return (
        <>
            <TopBar/>
            <div className="h-6"/>
            <Home/>
            <Projects/>
            <IndustrialExperience/>
            <Skills/>
            <Education/>
            <Contact/>
            <ScrollTop threshold={10}/>
        </>
    );
}

export default Main;