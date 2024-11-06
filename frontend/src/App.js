import React from "react";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Login from "./components/Reader/Login";
import Register from "./components/Reader/Register";
import HomePage from "./components/Home/HomePage";
import NavigationBar from "./components/Navigation/NavigationBar";
import Profile from "./components/Reader/Profile";
import ListBooks from "./components/Books/ListBooks";
import LevelSystem from "./components/Levels/LevelSystem";

function App() {
  return (
    <Router>
        <NavigationBar />
        <Routes>
            <Route path="/" element={<HomePage/>}/>
            <Route path="/login" element={<Login/>}/>
            <Route path="/register" element={<Register/>}/>
            <Route path="/profile" element={<Profile/>}/>
            <Route path="/books" element={<ListBooks/>}/>
            <Route path="/levels" element={<LevelSystem/>}/>
        </Routes>
    </Router>
  );
}

export default App;
