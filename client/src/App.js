import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Demo from './pages/Demo'

// pages
import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import Signup from './pages/Signup/Signup';
import AboutUs from './pages/AboutUs/AboutUs';
import Contactus from './pages/Contactus/Contactus';
import Profile from './pages/Profile/Profile';
import WhereToMap from './pages/WhereToMap/WhereToMap';
import Events from './pages/Events/Events';
import CategoryEvent from './pages/EventCategory/CategoryEvent';
import EventDescription from './pages/EventDescription/EventDescription';
// components


function App() {
    return (
        <div className="App">
            <Router>
                <Routes>
                    <Route path="/" element={<Login />} />
                    <Route path="/signup" element={<Signup />} />
                    <Route path="/home" element={<Home />} />
                    <Route path="/aboutus" element={<AboutUs />} />
                    <Route path="/contactus" element={<Contactus />} />
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/whereto" element={<WhereToMap />} />
                    <Route path="/category/:category" element={<Events />} />
                    <Route path="/events/eventid" element={<EventDescription />} />
                    <Route path="/demo" element={<Demo />} />
                </Routes>
            </Router>
        </div>
    );
}

export default App;
