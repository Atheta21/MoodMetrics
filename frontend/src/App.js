import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import About from "./pages/About";
import Questions from "./pages/Questions";
import Contact from "./pages/Contact";
import Login from "./pages/Login";


import "./App.css";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/questions" element={<Questions />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
       
      </Routes>
    </Router>
  );
}

export default App;