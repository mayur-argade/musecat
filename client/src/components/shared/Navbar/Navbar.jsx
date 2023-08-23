import React from 'react'
import { useState } from 'react';
import { Link } from 'react-router-dom'
import './navbar.css'
import { sidebardata } from './sidebardata';

const Navbar = () => {
    const [sidebar, setSidebar] = useState(false);

    const showSidebar = () => setSidebar(!sidebar);
    return (
        <>
            <div class="bg-white border-gray-200 dark:bg-gray-900 mr-5 ml-5 md:mr-32 md:ml-32">
                <div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                <Link to="#" className="menu-bars md:hidden">
                    <button className="" onClick={showSidebar}>
                        <img src="/images/assets/menu-icon.png" alt="" />
                    </button>
                </Link>
                    <a href="#" class="flex items-center">
                        <img src="/images/logo/logo.png" class="h-6 mr-3" alt="MWT Logo" />

                    </a>

                    <div class="hidden md:flex md:order-2 space-x-2">
                        <button type="button" class="text-white bg-[#C0A04C] hover:bg-white hover:text-[#C0A04C] focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center mr-3 md:mr-0 dark:bg-[#C0A04C] dark:hover:bg-white dark:focus:ring-blue-800">Sign in</button>
                        <button type="button" class="border text-[#C0A04C] hover:text-white bg-white hover:bg-[#C0A04C] focus:ring-4 focus:outline-[#C0A04C] focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center mr-3 md:mr-0 dark:bg-[#C0A04C] dark:hover:bg-white dark:focus:ring-blue-800">Sign up</button>
                    </div>

                    <div class="items-center justify-between hidden w-full md:flex md:w-auto md:order-1" id="navbar-cta">
                        <ul class="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
                            <li>
                                <a href="#" class="block py-2 pl-3 pr-4 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 md:dark:text-blue-500" aria-current="page">Home</a>
                            </li>
                            <li>
                                <a href="#" class="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Where To ?</a>
                            </li>
                            <li>
                                <a href="#" class="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">About</a>
                            </li>
                            <li>
                                <a href="#" class="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Contact</a>
                            </li>
                        </ul>
                    </div>

                    <div className="flex md:hidden space-x-2">
                        <img src="/images/assets/search-icon.png" alt="" />
                        <img src="/images/assets/notification-icon.png" alt="" />
                    </div>
                </div>
            </div>

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
                        <Link to='#' >
                        <span className='font-bold hover:border'>Home</span>
                        </Link>

                        <Link to='#' >
                        <span className='font-bold hover:border'>Where To? </span>
                        </Link>

                        <Link to='#' >
                        <span className='font-bold hover:border'>About</span>
                        </Link>

                        <Link to='#' >
                        <span className='font-bold hover:border'>Contact</span>
                        </Link>
                    </div>
                </ul>
            </nav>
        </>
    );
}

export default Navbar