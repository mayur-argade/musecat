import React from 'react'
import { useState } from 'react';
import { Link } from 'react-router-dom'
import './navbar.css'
import { useParams } from 'react-router-dom';
const Navbar = () => {
    let { category } = useParams();

    const [sidebar, setSidebar] = useState(false);

    const showSidebar = () => setSidebar(!sidebar);
    let categoryName = category

    if (category === 'event') {
        categoryName = 'Events'
    }
    else if (category === 'eat') {
        categoryName = 'Eat'
    }
    else if (category === 'ladiesnight') {
        categoryName = 'Ladies Night'
    }
    else if (category === 'weeklyoffers') {
        categoryName = 'Weekly Offers'
    }
    else if (category === 'thingstodo') {
        categoryName = 'Things To Do'
    }
    else if (category === 'staycation') {
        categoryName = 'Staycation'
    }
    else if (category === 'poolnbeach') {
        categoryName = 'Pool & Beach'
    }
    else if (category === 'spaoffers') {
        categoryName = 'Spa Offers'
    }
    else if (category === 'kidscorner') {
        categoryName = 'Kids Corner'
    }
    else if (window.location.pathname == '/events/eventid') {
        categoryName = "Event Description"
    }
    else if (window.location.pathname == '/venue/venueid') {
        categoryName = "Venue Description"
    }
    else if (window.location.pathname == '/favorites') {
        categoryName = "Favorites"
    }
    else if (window.location.pathname == '/pastpurchase') {
        categoryName = "Past Purchases"
    }
    else if (window.location.pathname == '/faq') {
        categoryName = "FAQs"
    }
    else if (window.location.pathname == '/bookticket') {
        categoryName = "Book Your Seat"
    }
    else if (window.location.pathname == '/ticketstatus/ticketid') {
        categoryName = "Ticket Status"
    }


    return (
        <>
            <div class="bg-white border-gray-200 dark:bg-gray-900 md:mr-2 md:ml-2 md:mr-48 md:ml-48">
                <div class=" max-w-screen-xl flex flex-wrap items-center justify-between mx-auto pl-4 pr-4 pb-1 pt-4 pb-4 shadow-md md:shadow-none">
                    
                    {category === 'events' || category === 'eat' || category === 'ladiesnight' || category === 'weeklyoffers' || category === 'thingstodo' || category === 'staycation' || category === 'poolnbeach' || category === 'spaoffers' || category === 'kidscorner' || window.location.pathname == '/events/eventid' || window.location.pathname == '/venue/venueid' || window.location.pathname == '/favorites' || window.location.pathname == '/pastpurchase' || window.location.pathname == '/faq' || window.location.pathname == '/bookticket' || window.location.pathname == '/ticketstatus/ticketid' ? (
                        <div className='flex align-middle'>
                            <button className="menu-bars md:hidden" >
                                <img src="/images/icons/back-arrow.svg" alt="" />
                            </button>
                            <span className='capitalize md:hidden text-xl font-bold'>
                                {categoryName}
                            </span>
                            <a href="#" class="hidden md:block flex items-center">
                                <img src="/images/logo/logo.png" class="h-6 mr-3" alt="MWT Logo" />
                            </a>
                        </div>
                    ) : (
                        <div className='flex space-x-28 items-center md:space-x-0  align-middle'>
                            <button className="menu-bars md:hidden" onClick={showSidebar}>
                                <img src="/images/icons/menu.svg" alt="" />
                            </button>

                            <a href="#" class="md:flex items-center">
                                <img src="/images/logo/logo.png" class="h-6 mr-3" alt="MWT Logo" />
                            </a>

                            {
                                window.location.pathname == "/vendor/hostedevents"
                                    ?
                                    <div className="hidden md:block search">
                                        <div class="pl-2">
                                            <div class="relative mt-1">
                                                <div class="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                                                    <svg class="w-5 h-5 text-gray-500 dark:text-gray-400" fill="currentColor" viewBox="0 0 20 20"
                                                        xmlns="http://www.w3.org/2000/svg">
                                                        <path fill-rule="evenodd"
                                                            d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                                                            clip-rule="evenodd"></path>
                                                    </svg>
                                                </div>

                                                <input type="text" id="table-search" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-20 md:w-52 pl-5 p-1.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search" />

                                            </div>
                                        </div>
                                    </div>
                                    :
                                    <></>
                            }
                        </div>
                    )}


                    <div class="hidden md:flex md:order-2 space-x-2">
                        <button type="button" class="text-white bg-[#C0A04C] hover:bg-[#A48533] hover:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center mr-3 md:mr-0 dark:bg-[#C0A04C] dark:hover:bg-white dark:focus:ring-blue-800">Sign in</button>
                        <button type="button" class="border border-[#C0A04C] border-1.5 text-[#C0A04C] hover:text-white bg-white hover:bg-[#C0A04C] focus:ring-4 focus:outline-[#C0A04C] focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center mr-3 md:mr-0 dark:bg-[#C0A04C] dark:hover:bg-white dark:focus:ring-blue-800">Sign up</button>
                    </div>

                    {
                        window.location.pathname == "/vendor/notification" ||
                            window.location.pathname == "/vendor/home" ||
                            window.location.pathname == "/vendor/event/eventid" ?
                            <div class="items-center justify-between hidden w-full md:flex md:w-auto md:order-1" id="navbar-cta">
                                <ul class="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
                                    <li>
                                        <Link to='/vendor/home' className={`${window.location.pathname == '/home' ? 'text-blue-500' : ''}`}>
                                            <a href="#" className={`block py-2 pl-3 pr-4 md:p-0 md:dark:text-blue-500`} aria-current="page">Home</a>
                                        </Link>

                                    </li>
                                    <li>
                                        <Link to='/vendor/notification' className={`${window.location.pathname == '/vendor/notification' ? 'text-blue-500' : ''}`}>
                                            <a href="#" className="block py-2 pl-3 pr-4  md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Notifications</a>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to='/vendor/helpcenter' className={`${window.location.pathname == '/helpcenter' ? 'text-blue-500' : ''}`}>
                                            <a href="#" className="block py-2 pl-3 pr-4 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Help Center</a>
                                        </Link>
                                    </li>

                                </ul>
                            </div>
                            :
                            <div class="items-center justify-between hidden w-full md:flex md:w-auto md:order-1" id="navbar-cta">
                                <ul class="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
                                    <li>
                                        <Link to='/home' className={`${window.location.pathname == '/home' ? 'font-bold' : ''}`}>
                                            <a href="#" className={`block text-sm py-2 pl-3 pr-4 md:p-0 hover:font-bold md:dark:font-bold`} aria-current="page">Home</a>
                                        </Link>

                                    </li>
                                    <li>
                                        <Link to='/whereto' className={`${window.location.pathname == '/whereto' ? 'font-bold' : ''}`}>
                                            <a href="#" className="block text-sm py-2 pl-3 pr-4  md:p-0 hover:font-bold 
                                            md:dark:hover:font-bold dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Where To ?</a>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to='/aboutus' className={`${window.location.pathname == '/aboutus' ? 'font-bold' : ''}`}>
                                            <a href="#" className="block text-sm py-2 pl-3 pr-4 rounded hover:bg-gray-100 hover:font-bold md:hover:bg-transparent md:p-0 md:dark:hover:font-bold dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">About</a>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to='/contactus' className={`${window.location.pathname == '/contactus' ? 'font-bold' : ''}`}>
                                            <a href="#" className="block text-sm py-2 pl-3 pr-4 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:font-bold md:p-0 md:dark:hover:font-bold dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Contact</a>
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                    }


                    <div className="flex md:hidden space-x-2">
                        {category === 'events' || category === 'eat' || category === 'ladiesnight' || category === 'weeklyoffers' || category === 'thingstodo' || category === 'staycation' || category === 'poolnbeach' || category === 'spaoffers' || category === 'kidscorner' ? (
                            <img className="hidden" src="/images/assets/search.svg" alt="" />
                        ) : (
                            <img className="" src="/images/icons/search.svg" alt="" />
                        )}
                        <img src="/images/icons/notification.svg" alt="" />
                    </div>
                </div>
            </div>

            {/* sidebar for mobile view */}
            <nav className={sidebar ? "nav-menu active" : "nav-menu"}>
                <ul className="nav-menu-items" onClick={showSidebar}>
                    <li className="navbar-toggle flex justify-end justify-items-end">
                        <div>
                            <Link to="#" className="menu-bars ">
                                <img src="/images/icons/cancel-icon.png" alt="" />
                            </Link>
                        </div>
                    </li>

                    <div className='flex flex-col space-y-8'>
                        <Link to='/home' className={`${window.location.pathname == '/home' ? 'text-blue-500' : ''}`}>
                            <span className='font-bold hover:border'>Home</span>
                        </Link>

                        <Link to='/whereto' className={`${window.location.pathname == '/whereto' ? 'text-blue-500' : ''}`}>
                            <span className='font-bold hover:border'>Where To? </span>
                        </Link>

                        <Link to='/aboutus' className={`${window.location.pathname == '/aboutus' ? 'text-blue-500' : ''}`}>
                            <span className='font-bold hover:border'>About</span>
                        </Link>

                        <Link to='/contactus' className={`${window.location.pathname == '/contactus' ? 'text-blue-500' : ''}`}>
                            <span className='font-bold hover:border'>Contact</span>
                        </Link>
                    </div>

                </ul>
            </nav>
        </>
    );
}

export default Navbar