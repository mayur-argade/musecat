import './navbar.css'
import React, { useState, useRef, useEffect } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { clientLogout, vendorLogout, GetNotificationCount, GetAllCategory } from '../../../http';

import { useDispatch, useSelector } from 'react-redux'
import { setAuth } from '../../../store/authSlice'
import toast, { Toaster } from 'react-hot-toast';
import DarkModeToggle from '../DarkModeToggle/DarkModeToggle';

const Navbar = ({ searchQuery, setSearchQuery }) => {

    const [isDropdownOpen, setDropdownOpen] = useState(false);
    const [isAccOpen, setIsAccOpen] = useState(false)
    const [isOpen, setIsOpen] = useState(false);
    const [sidebar, setSidebar] = useState(false);
    const [unread, setUnread] = useState(false)
    const [categories, setCategories] = useState([])
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate();
    const dropdownRef = useRef(null);
    const dispatch = useDispatch();
    const { isAuth, user } = useSelector((state) => state.auth)
    let { category, eventid } = useParams();

    // Event handlers
    const openDropdown = () => setDropdownOpen(true);
    const closeDropdown = () => setDropdownOpen(false);
    const handleBack = () => navigate(-1);
    const handleSearchInput = (e) => setSearchQuery(e.target.value);
    const toggleDropdown = () => setIsOpen(!isOpen);
    const handleOnclick = () => {
        userLogout()
        showSidebar()
    }
    const showSidebar = () => setSidebar(!sidebar);
    const onClick = () => setIsAccOpen(!isAccOpen)

    const userLogout = async () => {
        try {
            const { data } = await clientLogout()
            dispatch(setAuth(data));
            toast.success("logged out")
        } catch (error) {
            toast.error("Error while logging out the user")
        }
    }

    const funVendorLogout = async () => {
        try {
            const { data } = await vendorLogout()
            dispatch(setAuth(data));
            toast.success("logged out")
            navigate("/vendor/login");
        } catch (error) {
            toast.error("Error while logging out the user")
        }
    }

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
    else if (window.location.pathname.includes("/venue")) {
        categoryName = "Venue Description"
    }
    else if (window.location.pathname.includes("/events/")) {
        categoryName = "Event Description"
    }

    useEffect(() => {
        const fetchCategory = async () => {
            setLoading(true)
            try {
                const res = await GetAllCategory()
                setCategories(res.data)
                setLoading(false)
            } catch (error) {
                setLoading(false)
            }
        }

        fetchCategory()

    }, []);


    useEffect(() => {
        const getNotificationCountFunction = async () => {
            try {
                const notificationCount = await GetNotificationCount();
                console.log(notificationCount)
                if (notificationCount.data.data > 0) {
                    setUnread(true)
                }
            } catch (error) {

            }
        }

        if (isAuth == true && user.type == 'user') {
            getNotificationCountFunction()
        }

    }, [categoryName])

    return (
        <>


            <div className='dark:bg-[#2c2c2c] dark:text-white sticky top-0 z-40 bg-white flex justify-center items-center align-middle'>
                <div class="bg-white border-gray-200 dark:bg-[#2c2c2c] w-full md:w-full sm:mx-5 md:mx-5 md:w-10/12 xl:w-9/12 2xl:w-7/12">
                    <Toaster />
                    <div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto pl-4 pr-4 py-4 md:pt-2 md:pb-1 shadow-md md:shadow-none">

                        {category === 'events' || category === 'eat' || category === 'ladiesnight' || category === 'weeklyoffers' || category === 'thingstodo' || category === 'staycation' || category === 'poolnbeach' || category === 'spaoffers' || category === 'kidscorner' || window.location.pathname.includes("/category") || window.location.pathname.includes("/venue") || window.location.pathname == '/favorites' || window.location.pathname == '/pastpurchase' || window.location.pathname == '/faq' || window.location.pathname == '/bookticket' || window.location.pathname == '/ticketstatus/ticketid' ? (
                            <div className='flex align-middle'>
                                <button className="menu-bars md:hidden " onClick={handleBack} >
                                    <img className='flex dark:hidden' src="/images/icons/back-arrow.svg" alt="" />
                                    <img className='dark:flex hidden' src="/images/icons/back-arrow-light.svg" alt="" />
                                </button>
                                <span className='capitalize md:hidden text-xl font-bold'>
                                    {categoryName}
                                </span>
                                <Link to="/" class="hidden flex md:flex items-center">
                                    <img src="/images/logo/logo-main.webp" className="dark:hidden flex h-10 md:mr-3" alt="MWT Logo" />
                                    <img src="/images/logo/logo.webp" className="dark:hidden flex h-6 mr-3" alt="MWT Logo" />
                                    <img src="/images/logo/logo-main-light.png" className="dark:flex hidden h-10 md:mr-3" alt="MWT Logo" />
                                    <img src="/images/icons/logo-light.svg" className="dark:flex hidden flex h-6 mr-3" alt="MWT Logo" />
                                </Link>
                            </div>
                        ) : (
                            <div className='flex align-middle'>
                                <button className="menu-bars md:hidden" onClick={showSidebar}>
                                    <img className='flex dark:hidden' src="/images/icons/menu.svg" alt="" />
                                    <img className='dark:flex hidden' src="/images/icons/menu-light.svg" alt="" />
                                </button>

                                <Link to="/" class="hidden flex md:flex items-center">
                                    <img src="/images/logo/logo-main.webp" className="dark:hidden flex h-10 md:mr-3" alt="MWT Logo" />
                                    <img src="/images/logo/logo.webp" className="dark:hidden flex h-6 mr-3" alt="MWT Logo" />
                                    <img src="/images/logo/logo-main-light.png" className="dark:flex hidden h-10 md:mr-3" alt="MWT Logo" />
                                    <img src="/images/icons/logo-light.svg" className="dark:flex hidden flex h-6 mr-3" alt="MWT Logo" />
                                </Link>

                            </div>
                        )}

                        {
                            category === 'events' || category === 'eat' || category === 'ladiesnight' || category === 'weeklyoffers' || category === 'thingstodo' || category === 'staycation' || category === 'poolnbeach' || category === 'spaoffers' || category === 'kidscorner' || window.location.pathname.includes("/category") || window.location.pathname.includes("/venue") || window.location.pathname == '/favorites' || window.location.pathname == '/pastpurchase' || window.location.pathname == '/faq' || window.location.pathname == '/bookticket' || window.location.pathname == '/ticketstatus/ticketid'
                                ?
                                <div className='flex md:hidden'>
                                    <Link to="/" class=" hidden md:flex items-center">
                                        <img src="/images/logo/logo-main.png" className="dark:hidden flex h-10 md:mr-3" alt="MWT Logo" />
                                        <img src="/images/logo/logo-main-light.png" className="hidden dark:flex h-10 md:mr-3" alt="MWT Logo" />
                                        <img src="/images/logo/logo.png" className="dark:hidden flex h-6 mr-3" alt="MWT Logo" />
                                        <img src="/images/icons/logo-light.svg" className="dark:flex hidden flex h-6 mr-3" alt="MWT Logo" />
                                    </Link>
                                </div>
                                :
                                <div className='flex md:hidden'>
                                    <Link to="/" class=" flex md:flex items-center">
                                        <img src="/images/logo/logo-main.png" className="dark:hidden flex h-10 md:mr-3" alt="MWT Logo" />
                                        <img src="/images/logo/logo-main-light.png" className="hidden dark:flex h-10 md:mr-3" alt="MWT Logo" />
                                        <img src="/images/logo/logo.png" className="dark:hidden flex h-6 mr-3" alt="MWT Logo" />
                                        <img src="/images/icons/logo-light.svg" className="dark:flex hidden flex h-6 mr-3" alt="MWT Logo" />
                                    </Link>
                                </div>

                        }
                        <div class="hidden md:flex md:order-2 space-x-2">
                            {
                                isAuth
                                    ?
                                    <div className='space-x-2 flex align-middle items-center justify-center'>
                                        <div className='flex justify-center'>
                                            <DarkModeToggle />
                                        </div>
                                        <button onClick={toggleDropdown}>
                                            <img className='m-1 h-10' src="/images/icons/navprofile.png" alt="" />
                                            {isOpen && (
                                                <div
                                                    className="origin-top-right absolute right-60 mt-0 w-36 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 w-52 z-50 dark:bg-[#2c2c2c] "
                                                    ref={dropdownRef}
                                                >
                                                    <div className="px-3 flex flex-col">
                                                        <ul class="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="doubleDropdownButton">
                                                            <Link to={
                                                                window.location.pathname.includes('/vendor/')
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
                                                                window.location.pathname.includes('/vendor/')
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
                                    </div>
                                    :
                                    <div className='space-x-2 flex align-middle items-center justify-center'>
                                        <div className='flex justify-center'>
                                            <DarkModeToggle />
                                        </div>
                                        <Link to="/login">
                                            <button type="button" class="text-white bg-[#C0A04C] hover:bg-[#A48533] hover:text-white focus:ring-0 focus:outline-none focus:[#A48533] font-medium rounded-lg text-sm px-4 py-2 text-center mr-3 md:mr-0 dark:bg-[#C0A04C] dark:hover:bg-[#A48533] dark:focus:ring-0" >Sign in</button>
                                        </Link>
                                        <Link to="/signup">
                                            <button type="button" class="text-white bg-[#C0A04C] hover:bg-[#A48533] hover:text-white focus:ring-0 focus:outline-none focus:[#A48533] font-medium rounded-lg text-sm px-4 py-2 text-center mr-3 md:mr-0 dark:bg-[#C0A04C] dark:hover:bg-[#A48533] dark:focus:ring-0">Sign up</button>
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
                                window.location.pathname == '/vendor/helpcenter' ||
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
                                        <ul class="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-white dark:bg-[#2c2c2c] md:dark:bg-[#2c2c2c] dark:border-gray-700">

                                            <li>
                                                <Link to='/vendor/home' className={`${window.location.pathname == '/vendor/home' ? 'font-bold' : ''}`}>
                                                    <a href="#" className={`block py-2 pl-3 pr-4 md:p-0 `} aria-current="page"><span className='text-sm'>Home</span></a>
                                                </Link>

                                            </li>
                                            <li>
                                                <Link to='/vendor/notification' className={`${window.location.pathname == '/vendor/notification' ? 'font-bold' : ''}`}>
                                                    <a href="#" className="block py-2 pl-3 pr-4  md:p-0  dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"><span className='text-sm'>Notification</span></a>
                                                </Link>
                                            </li>
                                            <li>
                                                <Link to='/vendor/helpcenter' className={`${window.location.pathname == '/vendor/helpcenter' ? 'font-bold' : ''}`}>
                                                    <a href="#" className="block py-2 pl-3 pr-4 rounded hover:bg-gray-100 md:hover:bg-transparent md:p-0  dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"><span className='text-sm'>Help Center</span></a>
                                                </Link>
                                            </li>

                                        </ul>
                                    </div>
                                </div>
                                :
                                <div class="items-center justify-between hidden w-full md:flex md:w-auto md:order-1" id="navbar-cta">
                                    <ul class="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-white dark:bg-[#2c2c2c] md:dark:bg-[#2c2c2c] dark:border-gray-700">
                                        <li>
                                            <Link to='/' className={`${window.location.pathname == '/' ? 'font-bold underline underline-offset-2 decoration-2 decoration-[#C0A04C]' : ''}`}>
                                                <a href="#" className={`block text-sm py-2 pl-3 pr-4 md:p-0 hover:font-bold md:dark:font-bold`} aria-current="page">Home</a>
                                            </Link>

                                        </li>
                                        <li>
                                            {/* <Link to='/category/events' className={`${window.location.pathname == '/whereto' ? 'font-bold underline underline-offset-2 decoration-2 decoration-[#C0A04C]' : ''}`}> */}
                                                <div className="dropdown-container reltive">
                                                    <span
                                                        className="hover-trigger block text-sm py-2 pl-3 pr-4 md:p-0 hover:font-bold md:dark:font-bold"
                                                        onMouseEnter={() => openDropdown()}
                                                        onMouseLeave={() => closeDropdown()}
                                                    >
                                                        Where to ?
                                                    </span>
                                                    {isDropdownOpen && (
                                                        <div
                                                            onMouseEnter={() => openDropdown()}
                                                            onMouseLeave={() => closeDropdown()}
                                                            className="z-50 dropdown absolute w-48 h-80 bg-white rounded-md drop-shadow-md dark:bg-[#454545] dark:text-white ">
                                                            {categories.data && categories.data.map((category, index) => (
                                                                <CategoryLink key={index} category={category} />
                                                            ))}
                                                        </div>
                                                    )}
                                                </div>
                                            {/* </Link> */}
                                        </li>
                                        <li>
                                            <Link to='/aboutus' className={`${window.location.pathname == '/aboutus' ? 'font-bold underline underline-offset-2 decoration-2 decoration-[#C0A04C]' : ''}`}>
                                                <a href="#" className="block text-sm py-2 pl-3 pr-4 rounded hover:bg-gray-100 hover:font-bold md:hover:bg-transparent md:p-0 md:dark:hover:font-bold dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">About</a>
                                            </Link>
                                        </li>
                                        <li>
                                            <Link to='/contactus' className={`${window.location.pathname == '/contactus' ? 'font-bold underline underline-offset-2 decoration-2 decoration-[#C0A04C]' : ''}`}>
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
                            {
                                unread
                                    ?
                                    <>
                                        <img onClick={(() => navigate('/user/notification'))} className='flex dark:hidden' src="/images/icons/notification.svg" alt="" />
                                        <img onClick={(() => navigate('/user/notification'))} className='dark:flex hidden' src="/images/icons/notification-1-light.svg" alt="" />
                                    </>
                                    :
                                    <>
                                        <img onClick={(() => navigate('/user/notification'))} className='flex dark:hidden' src="/images/icons/notification-1.svg" alt="" />
                                        <img onClick={(() => navigate('/user/notification'))} className='dark:flex hidden' src="/images/icons/notification-light.png" alt="" />
                                    </>

                            }
                        </div>
                    </div>
                </div >
            </div>


            {/* sidebar for mobile view */}
            < nav className={sidebar ? "nav-menu active dark:bg-[#2c2c2c]" : "nav-menu dark:bg-[#2c2c2c]"} >
                <ul className="relative nav-menu-items dark:text-white" >
                    <li className="dark:bg-[#2c2c2c] navbar-toggle flex justify-between justify-items-end">
                        <div className="">
                            <img src="/images/logo/logo.png" className=" ml-4 dark:hidden flex h-6 mr-3" alt="MWT Logo" />
                            <img src="/images/icons/logo-light.svg" className=" ml-4 dark:flex hidden flex h-6 mr-3" alt="MWT Logo" />
                        </div>

                        <div className="flex  justify-end align-middle items-center">
                            <div className="flex flex-col mr-5">
                                <DarkModeToggle />
                            </div>
                            <div>
                                <Link to="#" className="menu-bars dark:bg-[#2c2c2c]" onClick={showSidebar}>
                                    <img className='mr-2 flex dark:hidden' src="/images/icons/cancel-icon.png" alt="" />
                                    <img className='mr-2 dark:flex hidden' src="/images/icons/cancel-icon-light.png" alt="" />
                                </Link>
                            </div>
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

                                <div className={`flex flex-col space-y-4 overflow-y transition-all duration-200 pl-3 mt-3`}>
                                    {
                                        categories.data && categories.data.length > 0 && (

                                            categories.data.map((cat, index) => (
                                                <Link to={`/category/${cat.categoryURL}`}>
                                                    <p className='font-medium'>
                                                        {cat.name}
                                                    </p>
                                                </Link>
                                            ))
                                        )
                                    }
                                </div>
                            )}
                        </div>

                        <Link to='/aboutus' className={`${window.location.pathname == '/aboutus' ? 'font-bold' : 'font-medium '}`}>
                            <span className=' hover:border'>About</span>
                        </Link>

                        <Link to='/contactus' className={`${window.location.pathname == '/contactus' ? 'font-bold' : 'font-medium '}`}>
                            <span className=' hover:border'>Contact</span>
                        </Link>
                        {
                            isAuth && (
                                <div className='NoStandalone flex flex-col space-y-8 '>
                                    <Link Link to='/profile' className={`${window.location.pathname == '/profile' ? 'font-bold' : 'font-medium '}`}>
                                        <span className=' hover:border'>profile</span>
                                    </Link>
                                    <Link Link to='/favorites' className={`${window.location.pathname == '/favorites' ? 'font-bold' : 'font-medium '}`}>
                                        <span className=' hover:border'>Favorites</span>
                                    </Link>
                                    <Link Link to='/pastpurchase' className={`${window.location.pathname == '/pastpurchased' ? 'font-bold' : 'font-medium '}`}>
                                        <span className=' hover:border'>Past Purchased</span>
                                    </Link>
                                </div>

                            )

                        }

                        <div className='w-10/12 flex justify-center items-center bottom-20'>

                            {
                                isAuth
                                    ?
                                    <>
                                        {
                                            window.location.pathname.includes('/vendor/')
                                                ?
                                                <button onClick={funVendorLogout} type="button" class="dark:bg-white dark:border-[#C0A04C] dark:text-[#C0A04C] ml-3 space-x-3 flex align-middle justify-center w-full border border-[#C0A04C] border-1.5 text-white hover:text-white bg-[#C0A04C] hover:bg-[#C0A04C] focus:ring-4 focus:outline-[#C0A04C] focus:[#A48533] font-medium rounded-lg text-sm px-4 py-2 text-center mr-3 md:mr-0">
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
                                                <button type="button" class="w-10/12 border border-[#C0A04C] border-1.5 text-[#C0A04C] hover:text-white bg-white hover:bg-[#C0A04C] focus:ring-4 focus:outline-[#C0A04C] focus:[#A48533] font-medium rounded-lg text-sm px-4 py-2 text-center mr-3 md:mr-0 ">Sign up</button>
                                            </Link>

                                        </div>
                                    </>
                            }

                        </div>

                    </div>

                </ul>

            </ nav >
        </>
    );
}


const CategoryLink = ({ category }) => {
    const navigate = useNavigate()
    const [showDropdown, setShowDropdown] = useState(false);
    const [showDays, setShowDays] = useState(false);
    const [showWeekDays, setShowWeekDays] = useState(false)
    const openDropdown = () => setShowDropdown(true)
    const closeDropdown = () => setShowDropdown(false)

    return (
        <div className="" key={category.id}>

            {category.subCategories && category.subCategories.length > 0 ? (
                <>
                    <div
                        onClick={() => navigate(`/category/${category.categoryURL}`)}
                        onMouseEnter={() => openDropdown()}
                        onMouseLeave={() => closeDropdown()}
                        className={`overflow-y-auto p-3 relative m-0 text-sm bg-left-bottom bg-gradient-to-r from-[#C0A04C] to-[#A48533] bg-[length:0%_2px] bg-no-repeat group-hover:bg-[length:100%_2px] transition-all duration-500 ease-out cursor-pointer ${window.location.pathname === `/category/${category.categoryURL}` ? 'font-bold' : 'font-normal'}`}

                    >
                        <div className=''
                        >
                            {category.name} >
                        </div>
                    </div>

                    {showDropdown && (
                        <ul
                            onMouseEnter={() => openDropdown()}
                            onMouseLeave={() => closeDropdown()}
                            className="top-0 left-48 border border-1 z-50 dropdown absolute w-48  bg-white rounded-md  dark:bg-[#454545] dark:text-white">
                            {category.subCategories.map((subcategory, index) => (
                                <li key={index}>

                                    <span
                                        onClick={() => navigate(`/category/${category.categoryURL}?subcategory=${subcategory.name}`)}
                                        onMouseEnter={() => {
                                            if (subcategory.name == 'Dinner') {
                                                setShowDays(true)
                                            }
                                        }}
                                        onMouseLeave={() => setShowDays(false)}
                                        className={`ml-0 block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white text-sm`} aria-current="page">
                                        {subcategory.name}
                                    </span>

                                    {subcategory.name === "Dinner" && showDays && (
                                        <ul

                                            onMouseEnter={() => {
                                                setShowDays(true)
                                            }}
                                            className="border border-1 z-50 dropdown absolute w-48 p-3 bg-white rounded-md drop-shadow-md dark:bg-[#454545] dark:text-white"
                                            style={{ top: '40%', left: '100%' }}>
                                            {["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"].map((day, index) => (
                                                <li
                                                    onClick={() => navigate(`/category/${category.categoryURL}?subcategory=${subcategory.name}&day=${day}`)}
                                                    key={index}>
                                                    <a href="#" className={`block text-sm py-4 my-2  pl-3 pr-4 md:p-0 hover:font-bold md:dark:font-bold`} aria-current="page">{day} Dinner</a>
                                                </li>
                                            ))}
                                        </ul>
                                    )}
                                </li>
                            ))}
                        </ul>
                    )}
                </>
            ) : (
                <Link to={`/category/${category.categoryURL}`}>
                    <div className={`p-3 ml-0 text-sm bg-left-bottom bg-gradient-to-r from-[#C0A04C] to-[#A48533] bg-[length:0%_2px] bg-no-repeat group-hover:bg-[length:100%_2px] transition-all duration-500 ease-out cursor-pointer ${window.location.pathname === `/category/${category.categoryURL}` ? 'font-bold' : 'font-normal'}`}>{category.name}</div>
                </Link>
            )
            }
        </div >
    );
};

export default Navbar