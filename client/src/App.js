import React, { useEffect } from 'react';
import './App.css';
import { createBrowserRouter, RouterProvider, BrowserRouter as Router, Routes, Route } from "react-router-dom";


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
import VerifyUserAccount from './pages/VerifyUserAccount/VerifyUserAccount';
import VendorLogin from './pages/Login/VendorLogin';
import VendorSignup from './pages/Signup/VendorSignup';
import VendorNotification from './pages/VendorNotification/VendorNotification';
import VendorActivation from './pages/VendorActivation/VendorActivation';
import VendorHostedEvents from './pages/VendorHostedEvents/VendorHostedEvents';
import VendorHome from './pages/VendorHome/VendorHome';
import VendorEventDescripton from './pages/VendorEventDescription/VendorEventDescripton';
import VendorBookedTickets from './pages/VendorBookedTickets/VendorBookedTickets';
import VendorProfile from './pages/Profile/VendorProfile'
import AdminHome from './pages/AdminDashboard/AdminHome';
import EventsPWA from './pages/PWA-Events/EventsPWA';
import AdminCategory from './pages/AdminDashboard/AdminCategory'
import AdminUsers from './pages/AdminDashboard/AdminUsers';
import AdminVendors from './pages/AdminDashboard/AdminVendors';
import AdminEvents from './pages/AdminDashboard/AdminEvents';
import AdminOffers from './pages/AdminDashboard/AdminOffers';
import AdminEventDescription from './pages/AdminDashboard/AdminEventDescription';
import AdminBookedTickets from './pages/AdminDashboard/AdminBookedTickets';
import SearchPWA from './pages/SearchPWA/SearchPWA';
import AdminCheckProfile from './pages/AdminDashboard/AdminCheckProfile';
import UserNotification from './pages/UserNotification/UserNotification'
import VerifyVendorAccount from './pages/VerifyUserAccount/VerifyVendorAccount'
import Notifications from './pages/AdminDashboard/Notifications'
import NotFound from './pages/NotFound'
import SupportChat from './pages/AdminDashboard/SupportChat';

// utils
import AdminRoute from './utils/AdminRoute'
import GuestRoute from './utils/GuestRoute'
import Protected from './utils/Protected';
import SemiProtected from './utils/SemiProtected'
import ScrollToTop from './utils/ScrollToTop';
import InputEmail from './pages/ForgotPassword/InputEmail';
import ResetPassword from './pages/ForgotPassword/ResetPassword';
import AdminVenue from './pages/AdminDashboard/AdminVenue';
import Cookies from './pages/LegalCorner/Cookies';
import PrivacyPolicy from './pages/LegalCorner/PrivacyPolicy';
import TermsAndCondition from './pages/LegalCorner/TermsAndCondition';
import InputEmailVendor from './pages/ForgotPasswordVendor/InputEmailVendor';
import ResetPasswordVendor from './pages/ForgotPasswordVendor/ResetPasswordVendor';
import UserHelpCenter from './pages/SuportEngine/UserHelpCenter';
import VendorHelpCenter from './pages/SuportEngine/VendorHelpCenter';




function App() {
    return (
        <div className="App">
            <Router>
                <ScrollToTop />
                <Routes>
                    <Route path="/" exact element={<Home />} />
                    <Route path="/profile" exact element={<SemiProtected Component={Profile} />} />
                    <Route path="/favorites" exact element={<SemiProtected Component={Favorites} />} />
                    <Route path="/category/:category" exact element={<Events />} />
                    <Route path="/signup" exact element={<Signup />} />
                    <Route path="/login" exact element={<Login />} />
                    <Route path="/user/verify-account/:token" exact element={<VerifyUserAccount />} />
                    <Route path="/aboutus" exact element={<AboutUs />} />
                    <Route path="/whereto" exact element={<WhereToMap />} />
                    <Route path="/contactus" exact element={<Contactus />} />
                    <Route path="/events/:eventid" exact element={<EventDescription />} />
                    <Route path="/bookticket/:eventid" exact element={<SemiProtected Component={BookTicket} />} />
                    <Route path="/verifyaccount/:token" exact element={<VerifyUserAccount />} />
                    <Route path="/reset" exact element={<InputEmail />} />
                    <Route path="/user/reset-password/:token" exact element={<ResetPassword />} />
                    <Route path="/venue/:venueid" exact element={<VenueDescription />} />
                    <Route path="/pastpurchase" exact element={<SemiProtected Component={PastPurchase} />} />
                    <Route path="/faq" exact element={<FAQ />} />
                    <Route path="/ticketstatus/:ticketid" exact element={<TicketStatus />} />
                    <Route path="/event" exact element={<EventsPWA />} />
                    <Route path="/searchpage" exact element={<SearchPWA />} />
                    <Route path="/user/notification" exact element={<SemiProtected Component={UserNotification} />} />
                    <Route path="/user/cookies" exact element={<Cookies />} />
                    <Route path="/user/privacypolicy" exact element={<PrivacyPolicy />} />
                    <Route path="/user/termsandconditions" exact element={<TermsAndCondition />} />
                    <Route path="/user/helpcenter" exact element={<SemiProtected Component={UserHelpCenter} />} />



                    {/* vendor pages */}
                    <Route path="/vendor/login" exact element={<VendorLogin />} />
                    <Route path="/vendor/signup" exact element={<VendorSignup />} />
                    <Route path="/vendor/home" exact element={<GuestRoute Component={VendorHome} />} />
                    <Route path="/vendor/activation" exact element={<VendorActivation />} />
                    <Route path="/vendor/hostedevents" exact element={<GuestRoute Component={VendorHostedEvents} />} />
                    <Route path="/vendor/event/:eventid" exact element={<GuestRoute Component={VendorEventDescripton} />} />
                    <Route path="/vendor/profile" exact element={<GuestRoute Component={VendorProfile} />} />
                    <Route path="/vendor/:eventid/bookedtickets" exact element={<GuestRoute Component={VendorBookedTickets} />} />
                    <Route path="/vendor/notification" exact element={<VendorNotification />} />
                    <Route path="/vendor/verify-account/:token" exact element={<VerifyVendorAccount />} />
                    <Route path="/vendor/reset" exact element={<InputEmailVendor />} />
                    <Route path="/vendor/reset-password/:token" exact element={<ResetPasswordVendor />} />
                    <Route path="/vendor/helpcenter" exact element={<GuestRoute Component={VendorHelpCenter} />} />

                    {/* admin pages */}
                    <Route path="/admin/profile/:userid" exact element={<AdminCheckProfile />} />
                    <Route path="/admin/home" exact element={<AdminRoute Component={AdminHome} />} />
                    <Route path="/admin/users" exact element={<AdminUsers />} />
                    <Route path="/admin/vendors" exact element={<AdminVendors />} />
                    <Route path="/admin/events" exact element={<AdminEvents />} />
                    <Route path="/admin/offers" exact element={<AdminOffers />} />
                    <Route path="/admin/event/:eventid" exact element={<AdminEventDescription />} />
                    <Route path="/admin/:eventid/bookedtickets" exact element={<AdminBookedTickets />} />
                    <Route path="/admin/categories" exact element={<AdminCategory />} />
                    <Route path="/admin/venue" exact element={<AdminVenue />} />
                    <Route path='/admin/notifications' exact element={<Notifications />} />
                    <Route path='/admin/helpcenter' element={<SupportChat />} />
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </Router>
        </div>

    );
}

export default App;
