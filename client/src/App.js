import React, {useEffect} from 'react';
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
import TicketStatus from './pages/TicketStatus/TicketStatus';
import VendorLogin from './pages/Login/VendorLogin';
import VendorSignup from './pages/Signup/VendorSignup';
import VendorNotification from './pages/VendorNotification/VendorNotification';
import VendorActivation from './pages/VendorActivation/VendorActivation';
import VendorHostedEvents from './pages/VendorHostedEvents/VendorHostedEvents';
import VendorHome from './pages/VendorHome/VendorHome';
import VendorEventDescripton from './pages/VendorEventDescription/VendorEventDescripton';
import VendorBookedTickets from './pages/VendorBookedTickets/VendorBookedTickets';
import VendorProfile from './pages/Profile/VendorProfile'
import EventsPWA from './pages/PWA-Events/EventsPWA';

// components
import BottomNav from './components/shared/BottomNav/BottomNav';

// utils
import GuestRoute from './utils/GuestRoute'
import Protected from './utils/Protected';
import SemiProtected from './utils/SemiProtected'
import SearchPWA from './pages/SearchPWA/SearchPWA';



function App() {

    return (
        <div className="App">
            <Router>
                <BottomNav>
                </BottomNav>
                <Routes>
                    <Route path="/" exact element={<Home />} />
                    <Route path="/profile" exact element={<SemiProtected Component={Profile} />} />
                    <Route path="/favorites" exact element={<SemiProtected Component={Favorites} />} />
                    <Route path="/category/:category" exact element={<Events />} />
                    <Route path="/signup" exact element={<Signup />} />
                    <Route path="/login" exact element={<Login />} />
                    <Route path="/aboutus" exact element={<AboutUs />} />
                    <Route path="/whereto" exact element={<WhereToMap />} />
                    <Route path="/contactus" exact element={<Contactus />} />
                    <Route path="/events/:eventid" exact element={<EventDescription />} />
                    <Route path="/venue/venueid" exact element={<VenueDescription />} />
                    <Route path="/pastpurchase" exact element={<SemiProtected Component={PastPurchase} />} />
                    <Route path="/faq" exact element={<FAQ />} />
                    <Route path="/bookticket" exact element={<Protected Component={BookTicket} />} />
                    <Route path="/ticketstatus/:ticketid" exact element={<Protected Component={TicketStatus} />} />
                    <Route path="/events" exact element={<EventsPWA />} />
                    <Route path="/searchpage" exact element={<SearchPWA />} />


                    <Route path="/vendor/notification" exact element={<VendorNotification />} />

                    {/* vendor pages */}
                    <Route path="/vendor/login" element={<VendorLogin />} />
                    <Route path="/vendor/signup" element={<VendorSignup />} />
                    <Route path="/vendor/home" exact element={<GuestRoute Component={VendorHome} />} />
                    <Route path="/vendor/activation" exact element={<VendorActivation />} />
                    <Route path="/vendor/hostedevents" exact element={<GuestRoute Component={VendorHostedEvents} />} />
                    <Route path="/vendor/event/:eventid" exact element={<GuestRoute Component={VendorEventDescripton} />} />
                    <Route path="/vendor/profile" exact element={<GuestRoute Component={VendorProfile} />} />
                    <Route path="/vendor/:eventid/bookedtickets" exact element={<GuestRoute Component={VendorBookedTickets} />} />





                    <Route path="/demo" element={<Demo />} />
                </Routes>
            </Router>
        </div>
    );
}

export default App;
