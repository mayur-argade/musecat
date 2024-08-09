import React, { useEffect } from 'react';
import './App.css';
import { createBrowserRouter, RouterProvider, BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from 'react-query';

// pages
import Demo from './pages/Demo'
import Home from './pages/User/Home/Home'
import Login from './pages/User/Login/Login'
import Signup from './pages/User/Signup/Signup'
import AboutUs from './pages/User/AboutUs/AboutUs'
import Contactus from './pages/User/Contactus/Contactus'
import Profile from './pages/User/Profile/Profile'
import WhereToMap from './pages/User/WhereToMap/WhereToMap'
import Events from './pages/User/Events/Events'
import EventDescription from './pages/User/EventDescription/EventDescription'
import VenueDescription from './pages/User/VenueDescription/VenueDescription'
import Favorites from './pages/User/Favorites/Favorites'
import PastPurchase from './pages/User/PastPurchase/PastPurchase'
import FAQ from './pages/User/FAQ/FAQ'
import BookTicket from './pages/User/BookTicket/BookTicket'
import TicketStatus from './pages/User/TicketStatus/TicketStatus'
import VerifyUserAccount from './pages/User/VerifyUserAccount/VerifyUserAccount'
import VendorLogin from './pages/User/Login/VendorLogin'
import VendorSignup from './pages/User/Signup/VendorSignup'
import VendorNotification from './pages/Vendor/VendorNotification/VendorNotification'
import VendorActivation from './pages/Vendor/VendorActivation/VendorActivation'
import VendorHostedEvents from './pages/Vendor/VendorHostedEvents/VendorHostedEvents'
import VendorHome from './pages/Vendor/VendorHome/VendorHome';
import VendorEventDescripton from './pages/Vendor/VendorEventDescription/VendorEventDescripton';
import VendorBookedTickets from './pages/Vendor/VendorBookedTickets/VendorBookedTickets';
import VendorProfile from './pages/User/Profile/VendorProfile'
import AdminHome from './pages/AdminDashboard/AdminHome';
import EventsPWA from './pages/User/PWA-Events/EventsPWA';
import AdminCategory from './pages/AdminDashboard/AdminCategory'
import AdminUsers from './pages/AdminDashboard/AdminUsers';
import AdminVendors from './pages/AdminDashboard/AdminVendors';
import AdminEvents from './pages/AdminDashboard/AdminEvents';
import AdminOffers from './pages/AdminDashboard/AdminOffers';
import AdminEventDescription from './pages/AdminDashboard/AdminEventDescription';
import AdminBookedTickets from './pages/AdminDashboard/AdminBookedTickets';
import SearchPWA from './pages/User/SearchPWA/SearchPWA';
import AdminCheckProfile from './pages/AdminDashboard/AdminCheckProfile';
import UserNotification from './pages/User/UserNotification/UserNotification'
import VerifyVendorAccount from './pages/User/VerifyUserAccount/VerifyVendorAccount'
import Notifications from './pages/AdminDashboard/Notifications'
import NotFound from './pages/NotFound'
import SupportChat from './pages/AdminDashboard/SupportChat';
import InputEmail from './pages/User/ForgotPassword/InputEmail';
import ResetPassword from './pages/User/ForgotPassword/ResetPassword';
import AdminVenue from './pages/AdminDashboard/AdminVenue';
import Cookies from './pages/User/LegalCorner/Cookies';
import PrivacyPolicy from './pages/User/LegalCorner/PrivacyPolicy';
import TermsAndCondition from './pages/User/LegalCorner/TermsAndCondition';
import InputEmailVendor from './pages/Vendor/ForgotPasswordVendor/InputEmailVendor';
import ResetPasswordVendor from './pages/Vendor/ForgotPasswordVendor/ResetPasswordVendor';
import UserHelpCenter from './pages/SuportEngine/UserHelpCenter';
import VendorHelpCenter from './pages/SuportEngine/VendorHelpCenter';
import PwaProile from './pages/User/Profile/PwaProfile'

// utils
import AdminRoute from './utils/AdminRoute'
import GuestRoute from './utils/GuestRoute'
import Protected from './utils/Protected';
import SemiProtected from './utils/SemiProtected'
import ScrollToTop from './utils/ScrollToTop';
import Categories from './pages/User/Categories/Categories';


const queryClient = new QueryClient();

function App() {
    const isStandalone = window.matchMedia('(display-mode: standalone)').matches;
    return (
        <div className="App !dark:bg-[#2c2c2c] dark:text-white">
            <Router>
                <ScrollToTop />
                <Routes>
                    <Route path="/" exact element={<Home />} />
                    <Route path="/user/profile" exact element={<SemiProtected Component={PwaProile} />} />
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
                    <Route path="/category" exact element={<Categories />} />
                    <Route path="/demo" exact element={<Demo />} />



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
