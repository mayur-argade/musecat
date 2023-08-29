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
import EventDescription from './pages/EventDescription/EventDescription';
import VenueDescription from './pages/VenueDescription/VenueDescription';
import Favorites from './pages/Favorites/Favorites';
import PastPurchase from './pages/PastPurchase/PastPurchase';
import FAQ from './pages/FAQ/FAQ';
import BookTicket from './pages/BookTicket/BookTicket';
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
                    <Route path="/venue/venueid" element={<VenueDescription />} />
                    <Route path="/favorites" element={<Favorites />} />
                    <Route path="/pastpurchase" element={<PastPurchase />} />
                    <Route path="/faq" element={<FAQ />} />
                    <Route path="/bookticket" element={<BookTicket />} />
                    <Route path="/demo" element={<Demo />} />
                </Routes>
            </Router>
        </div>
    );
}

export default App;
