import React from 'react'
import { useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom'
import './navbar.css'
import { useParams } from 'react-router-dom';
import { clientLogout, vendorLogout } from '../../../http';
import { useDispatch, useSelector } from 'react-redux'
import { setAuth } from '../../../store/authSlice'
import toast, { Toaster } from 'react-hot-toast';

const Navbar = ({ searchQuery, setSearchQuery }) => {

    const [isDropdownOpen, setDropdownOpen] = useState(false);

    const openDropdown = () => {
        setDropdownOpen(true);
    };

    const closeDropdown = () => {
        setDropdownOpen(false);
    };

    let { category, eventid } = useParams();
    const navigate = useNavigate();
    const handleBack = () => {
        navigate(-1); // This function will take you back to the previous page
    };

    const handleSearchInput = (e) => {
        setSearchQuery(e.target.value);
    };

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const handleOnclick = () => {
        userLogout()
        showSidebar()
    }
    const [isAccOpen, setIsAccOpen] = useState(false)
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);
    const dispatch = useDispatch();
    const { isAuth, user } = useSelector((state) => state.auth)

    const onClick = () => {
        setIsAccOpen(!isAccOpen)
    }

    const userLogout = async () => {
        try {
            const { data } = await clientLogout()
            dispatch(setAuth(data));
            toast.success("logged out")
            navigate("/");
        } catch (error) {
            window.alert(error)
            console.log(error)
        }
    }

    const funVendorLogout = async () => {
        try {
            const { data } = await vendorLogout()
            dispatch(setAuth(data));
            toast.success("logged out")
            navigate("/vendor/login");
        } catch (error) {
            window.alert(error)
            console.log(error)
        }
    }

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
            <div className='sticky top-0 z-50 w-full bg-white'>
                <div class=" bg-white border-gray-200 dark:bg-gray-900 md:mr-2 md:ml-2 lg:mr-48 lg:ml-48">
                    <Toaster />
                    <div class=" max-w-screen-xl flex flex-wrap items-center justify-between mx-auto pl-4 pr-4 pb-2 pt-2 shadow-md md:shadow-none">

                        {category === 'events' || category === 'eat' || category === 'ladiesnight' || category === 'weeklyoffers' || category === 'thingstodo' || category === 'staycation' || category === 'poolnbeach' || category === 'spaoffers' || category === 'kidscorner' || window.location.pathname == '/events/eventid' || window.location.pathname == '/venue/venueid' || window.location.pathname == '/favorites' || window.location.pathname == '/pastpurchase' || window.location.pathname == '/faq' || window.location.pathname == '/bookticket' || window.location.pathname == '/ticketstatus/ticketid' ? (
                            <div className='flex align-middle'>
                                <button className="menu-bars md:hidden " onClick={handleBack} >
                                    <img src="/images/icons/back-arrow.svg" alt="" />
                                </button>
                                <span className='capitalize md:hidden text-xl font-bold'>
                                    {categoryName}
                                </span>
                                <Link to="/" class="hidden flex md:flex items-center">
                                    <img src="/images/logo/logo-main.png" class="h-10 md:mr-3" alt="MWT Logo" />
                                    <img src="/images/logo/logo.png" class="h-6 mr-3" alt="MWT Logo" />
                                </Link>
                            </div>
                        ) : (
                            <div className='flex space-x-28 items-center md:space-x-0  align-middle'>
                                <button className="menu-bars md:hidden" onClick={showSidebar}>
                                    <img src="/images/icons/menu.svg" alt="" />
                                </button>

                                <Link to="/" class="hidden flex md:flex items-center">
                                    <img src="/images/logo/logo-main.png" class="h-10 md:mr-3" alt="MWT Logo" />
                                    <img src="/images/logo/logo.png" class="h-6 mr-3" alt="MWT Logo" />
                                </Link>

                            </div>
                        )}


                        <div class="hidden md:flex md:order-2 space-x-2">
                            {
                                isAuth
                                    ?
                                    <button onClick={toggleDropdown}>
                                        <img className='m-1 h-10' src="/images/icons/navprofile.png" alt="" />
                                        {isOpen && (
                                            <div
                                                className="origin-top-right absolute right-60 mt-0 w-36 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 w-52 z-50"
                                                ref={dropdownRef}
                                            >
                                                <div className="px-3 flex flex-col">
                                                    <ul class="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="doubleDropdownButton">
                                                        <Link to={
                                                            window.location.pathname == "/vendor/home" ||
                                                                window.location.pathname == "/vendor/notification" ||
                                                                window.location.pathname == "/vendor/helpcenter" ||
                                                                window.location.pathname == "/vendor/home" ||
                                                                window.location.pathname == `/vendor/event/${eventid}` ||
                                                                window.location.pathname == '/vendor/profile'
                                                                ?
                                                                `/vendor/profile`
                                                                :
                                                                `/profile`
                                                        }>
                                                            <a href="#" class="flex block px-4 py-2 text-left hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                                                                <img src="/images/icons/user.svg" className="h-5 mr-2" alt="" />
                                                                Profile</a>
                                                        </Link>
                                                        {
                                                            window.location.pathname == "/vendor/notification" ||
                                                                window.location.pathname == "/vendor/helpcenter" ||
                                                                window.location.pathname == "/vendor/home" ||
                                                                window.location.pathname == '/vendor/profile' ||
                                                                window.location.pathname == `/vendor/event/${eventid}` ||
                                                                window.location.pathname == '/vendor/hostedevents'

                                                                ?
                                                                <>
                                                                    <button onClick={funVendorLogout} className='flex w-full block px-4 py-2 hover:bg-gray-100 text-left dark:hover:bg-gray-600 dark:hover:text-white'>
                                                                        <img src="/images/icons/log-out.svg" className='h-5 mr-2 ' alt="" />
                                                                        logout
                                                                    </button>
                                                                    <button onClick={() => navigate('/vendor/hostedevents')} className='flex w-full block px-4 py-2 hover:bg-gray-100 text-left dark:hover:bg-gray-600 dark:hover:text-white'>
                                                                        <img src="/images/icons/hostedevents.png" className='h-5 mr-2 ' alt="" />
                                                                        Hosted Events
                                                                    </button>
                                                                </>
                                                                :
                                                                <>
                                                                    <Link to="/favorites">
                                                                        <button className='flex w-full block px-4 py-2 hover:bg-gray-100 text-left dark:hover:bg-gray-600 dark:hover:text-white'>
                                                                            <img src="/images/icons/heartNav.svg" className='h-5 mr-2 ' alt="" />
                                                                            Favorites
                                                                        </button>
                                                                    </Link>
                                                                    <Link to="/pastpurchase">
                                                                        <button className='flex w-full block px-4 py-2 hover:bg-gray-100 text-left dark:hover:bg-gray-600 dark:hover:text-white'>
                                                                            <img src="/images/icons/pastpurchased.svg" className='h-5 mr-2 ' alt="" />
                                                                            Past Purchased
                                                                        </button>
                                                                    </Link>
                                                                    <button onClick={userLogout} className='flex space-x-2 align-middle w-full block px-4 py-2 hover:bg-gray-100 text-left dark:hover:bg-gray-600 dark:hover:text-white'>
                                                                        <img src="/images/icons/log-out.svg" className='h-5 mr-2 ' alt="" />
                                                                        logout
                                                                    </button>
                                                                </>
                                                        }

                                                    </ul>
                                                </div>
                                            </div>
                                        )}
                                    </button>
                                    :
                                    <div className='space-x-2'>
                                        <Link to="/login">
                                            <button type="button" class="text-white bg-[#C0A04C] hover:bg-[#A48533] hover:text-white focus:ring-4 focus:outline-none focus:[#A48533] font-medium rounded-lg text-sm px-4 py-2 text-center mr-3 md:mr-0 dark:bg-[#C0A04C] dark:hover:bg-white dark:focus:ring-blue-800" >Sign in</button>
                                        </Link>
                                        <Link to="/signup">
                                            <button type="button" class="border border-[#C0A04C] border-1.5 text-[#C0A04C] hover:text-white bg-white hover:bg-[#C0A04C] focus:ring-4 focus:outline-[#C0A04C] focus:[#A48533] font-medium rounded-lg text-sm px-4 py-2 text-center mr-3 md:mr-0 dark:bg-[#C0A04C] dark:hover:bg-white dark:focus:ring-blue-800">Sign up</button>
                                        </Link>
                                    </div>
                            }


                        </div>

                        {
                            window.location.pathname == "/vendor/notification" ||
                                window.location.pathname == "/vendor/home" ||
                                window.location.pathname == "/vendor/hostedevents" ||
                                window.location.pathname == `/vendor/event/${eventid}` ||
                                window.location.pathname == '/vendor/profile' ||
                                window.location.pathname == `/vendor/${eventid}/bookedtickets` ?
                                <div class="items-center md:space-x-10 justify-between hidden w-full md:flex md:w-auto md:order-1" id="navbar-cta">
                                    <div>
                                        {
                                            window.location.pathname == "/vendor/hostedevents"
                                                ?
                                                <div className="hidden md:block search">
                                                    <div class="">
                                                        <div class="relative mt-1">
                                                            <div class="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                                                                <svg class="w-5 h-5 text-gray-500 dark:text-gray-400" fill="currentColor" viewBox="0 0 20 20"
                                                                    xmlns="http://www.w3.org/2000/svg">
                                                                    <path fill-rule="evenodd"
                                                                        d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                                                                        clip-rule="evenodd"></path>
                                                                </svg>
                                                            </div>

                                                            <input value={searchQuery}
                                                                onChange={handleSearchInput} type="text" id="table-search" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-20 md:w-52 pl-5 p-1.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search" />
                                                        </div>
                                                    </div>
                                                </div>
                                                :
                                                <></>
                                        }
                                    </div>
                                    <div>
                                        <ul class="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">

                                            <li>
                                                <Link to='/vendor/home' className={`${window.location.pathname == '/' ? 'text-blue-500' : ''}`}>
                                                    <a href="#" className={`block py-2 pl-3 pr-4 md:p-0 md:dark:text-blue-500`} aria-current="page"><span className='text-sm'>Home</span></a>
                                                </Link>

                                            </li>
                                            <li>
                                                <Link to='/vendor/notification' className={`${window.location.pathname == '/vendor/notification' ? 'text-blue-500' : ''}`}>
                                                    <a href="#" className="block py-2 pl-3 pr-4  md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"><span className='text-sm'>Notification</span></a>
                                                </Link>
                                            </li>
                                            <li>
                                                <Link to='/vendor/helpcenter' className={`${window.location.pathname == '/helpcenter' ? 'text-blue-500' : ''}`}>
                                                    <a href="#" className="block py-2 pl-3 pr-4 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"><span className='text-sm'>Help Center</span></a>
                                                </Link>
                                            </li>

                                        </ul>
                                    </div>
                                </div>
                                :
                                <div class="items-center justify-between hidden w-full md:flex md:w-auto md:order-1" id="navbar-cta">
                                    <ul class="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
                                        <li>
                                            <Link to='/' className={`${window.location.pathname == '/' ? 'font-bold' : ''}`}>
                                                <a href="#" className={`block text-sm py-2 pl-3 pr-4 md:p-0 hover:font-bold md:dark:font-bold`} aria-current="page">Home</a>
                                            </Link>

                                        </li>
                                        <li>
                                            <Link to='/category/events' className={`${window.location.pathname == '/whereto' ? 'font-bold' : ''}`}>
                                                <div className="dropdown-container reltive">
                                                    <span
                                                        className="hover-trigger"
                                                        onMouseEnter={() => openDropdown()}
                                                        onMouseLeave={() => closeDropdown()}
                                                    >
                                                        Where to ?
                                                    </span>
                                                    {isDropdownOpen && (
                                                        <div
                                                            className="z-50 dropdown absolute w-48 p-3 bg-white rounded-md drop-shadow-md"
                                                            onMouseEnter={() => openDropdown()}
                                                            onMouseLeave={() => closeDropdown()}
                                                        >
                                                            <div className=''>
                                                                <Link to='/category/events' >
                                                                    <a href="#" className={`block text-sm py-4 my-2  pl-3 pr-4 md:p-0 hover:font-bold md:dark:font-bold`} aria-current="page">Events </a>
                                                                </Link>
                                                                <Link to='/category/eat' >
                                                                    <a href="#" className={`block text-sm py-4 my-2  pl-3 pr-4 md:p-0 hover:font-bold md:dark:font-bold`} aria-current="page">Eat </a>
                                                                </Link>
                                                                <Link to='/category/ladiesnight' >
                                                                    <a href="#" className={`block text-sm py-4 my-2  pl-3 pr-4 md:p-0 hover:font-bold md:dark:font-bold`} aria-current="page">Ladies Night </a>
                                                                </Link>
                                                                <Link to='/category/weeklyoffers' >
                                                                    <a href="#" className={`block text-sm py-4 my-2  pl-3 pr-4 md:p-0 hover:font-bold md:dark:font-bold`} aria-current="page">Weekly Offers </a>
                                                                </Link>
                                                                <Link to='/category/thigstodo' >
                                                                    <a href="#" className={`block text-sm py-4 my-2  pl-3 pr-4 md:p-0 hover:font-bold md:dark:font-bold`} aria-current="page">Things To Do </a>
                                                                </Link>
                                                                <Link to='/category/staycation' >
                                                                    <a href="#" className={`block text-sm py-4 my-2  pl-3 pr-4 md:p-0 hover:font-bold md:dark:font-bold`} aria-current="page">Staycation </a>
                                                                </Link>
                                                                <Link to='/category/poolnbeach' >
                                                                    <a href="#" className={`block text-sm py-4 my-2  pl-3 pr-4 md:p-0 hover:font-bold md:dark:font-bold`} aria-current="page">Pool & Beach </a>
                                                                </Link>
                                                                <Link to='/category/kidscorner' >
                                                                    <a href="#" className={`block text-sm py-4 my-2  pl-3 pr-4 md:p-0 hover:font-bold md:dark:font-bold`} aria-current="page">Kids Corner </a>
                                                                </Link>
                                                                <Link to='/category/spaoffers' >
                                                                    <a href="#" className={`block text-sm py-4 my-2  pl-3 pr-4 md:p-0 hover:font-bold md:dark:font-bold`} aria-current="page">Spa Offers </a>
                                                                </Link>

                                                            </div>
                                                        </div>
                                                    )}
                                                </div>
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
                                <>
                                </>
                            )}
                            <img onClick={(() => navigate('/user/notification'))} src="/images/icons/notification.svg" alt="" />
                        </div>
                    </div>
                </div >
            </div>


            {/* sidebar for mobile view */}
            < nav className={sidebar ? "nav-menu active" : "nav-menu"} >
                <ul className="relative nav-menu-items" >
                    <li className="navbar-toggle flex justify-between justify-items-end">
                        <div className="">
                            <img className='ml-6' src="/images/logo/logo.png" alt="" />
                        </div>
                        <div>
                            <Link to="#" className="menu-bars " onClick={showSidebar}>
                                <img className='mr-2' src="/images/icons/cancel-icon.png" alt="" />
                            </Link>
                        </div>
                    </li>

                    <div className='mt-3 flex flex-col space-y-8'>
                        <Link to='/' className={`${window.location.pathname == '/' ? 'font-bold' : 'font-medium'}`} onClick={showSidebar}>
                            <span className='hover:border'>Home</span>
                        </Link>

                        <div className='ml-4'>
                            <div onClick={onClick} className={`cursor-pointer `}>
                                <div className="flex justify-start space-x-2 align-middle">
                                    <p className="font-medium">Where to</p>
                                    {isAccOpen ? (
                                        <img className="h-5 mt-0.5" src="/images/icons/minus.svg" alt="Minus Icon" />
                                    ) : (
                                        <img className="h-5 mt-0.5" src="/images/icons/add.svg" alt="Add Icon" />
                                    )}
                                </div>
                            </div>
                            {isAccOpen && (
                                <div className={`flex flex-col space-y-4 overflow-hidden transition-all duration-200 pl-3 mt-3`}>
                                    <Link to="/category/events">
                                        <p className='font-medium'>
                                            Events
                                        </p>
                                    </Link>
                                    <Link to="/category/eat">
                                        <p className='font-medium'>
                                            Eat and Drink
                                        </p>
                                    </Link>
                                    <Link to="/category/ladiesnight">
                                        <p className='font-medium'>
                                            Ladies Night
                                        </p>
                                    </Link>
                                    <Link to="/category/weeklyoffers">
                                        <p className='font-medium'>
                                            Weekly Offers
                                        </p>
                                    </Link>
                                    <Link to="/category/thingstodo">
                                        <p className='font-medium'>
                                            Things To Do
                                        </p>
                                    </Link>
                                    <Link to="/category/staycation">
                                        <p className='font-medium'>
                                            Staycation
                                        </p>
                                    </Link>
                                    <Link to="/category/poolandbeach">
                                        <p className='font-medium'>
                                            Pool & beach
                                        </p>
                                    </Link>
                                    <Link to="/category/kidscorner">
                                        <p className='font-medium'>
                                            Kids Corner
                                        </p>
                                    </Link>
                                    <Link to="/category/spaoffers">
                                        <p className='font-medium'>
                                            Spa Offers
                                        </p>
                                    </Link>

                                </div>
                            )}
                        </div>

                        {/* <Link to='/whereto' className={`${window.location.pathname == '/whereto' ? 'font-bold' : 'font-medium'}`}>
                            <span className='  hover:border'>Where To? </span>
                        </Link> */}

                        <Link to='/aboutus' className={`${window.location.pathname == '/aboutus' ? 'font-bold' : 'font-medium '}`}>
                            <span className=' hover:border'>About</span>
                        </Link>

                        <Link to='/contactus' className={`${window.location.pathname == '/contactus' ? 'font-bold' : 'font-medium '}`}>
                            <span className=' hover:border'>Contact</span>
                        </Link>
                    </div>
                    <div className='absolute w-10/12 flex justify-center items-center bottom-20'>

                        {
                            isAuth
                                ?
                                <>
                                    {
                                        window.location.pathname == "/vendor/notification" ||
                                            window.location.pathname == "/vendor/helpcenter" ||
                                            window.location.pathname == "/vendor/home" ||
                                            window.location.pathname == '/vendor/profile'
                                            ?
                                            <button onClick={funVendorLogout} type="button" class="ml-3 space-x-3 flex align-middle justify-center w-full border border-[#C0A04C] border-1.5 text-white hover:text-white bg-[#C0A04C] hover:bg-[#C0A04C] focus:ring-4 focus:outline-[#C0A04C] focus:[#A48533] font-medium rounded-lg text-sm px-4 py-2 text-center mr-3 md:mr-0 dark:bg-[#C0A04C] dark:hover:bg-white dark:focus:ring-blue-800">
                                                <img className='h-5' src="/images/icons/logout.svg" alt="" />
                                                <p>
                                                    Sign up
                                                </p>
                                            </button>
                                            :
                                            <button onClick={handleOnclick} type="button" class="flex ml-3 space-x-3 flex align-middle justify-center w-full border border-[#C0A04C] border-1.5 text-white hover:text-white bg-[#C0A04C] hover:bg-[#C0A04C] focus:ring-4 focus:outline-[#C0A04C] focus:[#A48533] font-medium rounded-lg text-sm px-4 py-2 text-center mr-3 md:mr-0 dark:bg-[#C0A04C] dark:hover:bg-white dark:focus:ring-blue-800">
                                                <img className='h-5' src="/images/icons/logout.svg" alt="" />
                                                <p>
                                                    Log out
                                                </p>
                                            </button>
                                    }
                                </>
                                :
                                <>
                                    <div className='w-full flex flex-col justify-start space-y-2 ml-4'>
                                        <Link to="/login">
                                            <button type="button" class="w-10/12 text-white bg-[#C0A04C] hover:bg-[#A48533] hover:text-white focus:ring-4 focus:outline-none focus:[#A48533] font-medium rounded-lg text-sm px-4 py-2 text-center mr-3 md:mr-0 dark:bg-[#C0A04C] dark:hover:bg-white dark:focus:ring-blue-800" >Sign in</button>
                                        </Link>
                                        <Link to="/signup">
                                            <button type="button" class="w-10/12 border border-[#C0A04C] border-1.5 text-[#C0A04C] hover:text-white bg-white hover:bg-[#C0A04C] focus:ring-4 focus:outline-[#C0A04C] focus:[#A48533] font-medium rounded-lg text-sm px-4 py-2 text-center mr-3 md:mr-0 dark:bg-[#C0A04C] dark:hover:bg-white dark:focus:ring-blue-800">Sign up</button>
                                        </Link>
                                    </div>
                                </>
                        }

                    </div>
                </ul>

            </ nav>
        </>
    );
}

export default Navbar