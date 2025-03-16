import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./Pages/Home";
import Fields from "./Pages/Fields";
import Suggestions from "./Pages/Suggestions";
import About from "./Pages/About";
import EngineeringAndTechnology from "./Pages/Enigneering and Technology/EngineeringAndTechnology";
import Outline from "./Pages/Enigneering and Technology/Full Stack Development/Outline";
import AllContent from "./Pages/Enigneering and Technology/Full Stack Development/AllContent";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/Fields' element={<Fields />} />
          <Route path='/Suggestions' element={<Suggestions />} />
          <Route path='/About' element={<About />} />
          <Route path='/Fields/Engineering-And-Technology/Courses' element={<EngineeringAndTechnology />} />
          <Route path="/Fields/Engineering-and-Technology/Courses/Full-Stack-Development" element={<Outline />} />
          <Route path="/Fields/Engineering-and-Technology/Courses/Full-Stack-Development/All-Contents" element={<AllContent />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
