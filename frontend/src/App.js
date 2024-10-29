import React from "react";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Login from "./components/Reader/Login";
import Register from "./components/Reader/Register";
import HomePage from "./components/home/HomePage";
import NavigationBar from "./components/Navigation/NavigationBar";
import Profile from "./components/Reader/Profile";
import ListBooks from "./components/Books/ListBooks";

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
        </Routes>
    </Router>
  );
}

export default App;
