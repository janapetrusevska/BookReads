import React from "react";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import HomePage from "./components/home/HomePage";
import NavigationBar from "./components/NavigationBar";
import Profile from "./components/Reader/Profile";

function App() {
  return (
    <Router>
        <NavigationBar />
        <Routes>
            <Route path="/" element={<HomePage/>}/>
            <Route path="/login" element={<Login/>}/>
            <Route path="/register" element={<Register/>}/>
            <Route path="/profile" element={<Profile/>}/>
        </Routes>
    </Router>
  );
}

export default App;
