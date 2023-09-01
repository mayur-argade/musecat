import React from 'react'
import { useState, useRef, useEffect } from 'react'
import Tabbar from '../../components/shared/Tabbar/Tabbar'
import Navbar from '../../components/shared/Navbar/Navbar'
import EventCard from '../../components/Cards/EventCard'
import GoogleMap from '../../components/GoogleMap/GoogleMap'
import Footer from '../../components/shared/Footer/Footer'
import SubEventCard from '../../components/Cards/SubEventCard'
import Carousel from '../../components/Carousel/Carousel'
import SubCarousel from '../../components/Carousel/SubCarousel'
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom'

const Events = () => {
    document.title = 'muscat ~ Events'
    let { category } = useParams();
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);

    if (category === 'event') {
        category = 'Events'
    }
    else if (category === 'eat') {
        category = 'Eat'
    }
    else if (category === 'ladiesnight') {
        category = 'Ladies Night'
    }
    else if (category === 'weeklyoffers') {
        category = 'Weekly Offers'
    }
    else if (category === 'thingstodo') {
        category = 'Things To Do'
    }
    else if (category === 'staycation') {
        category = 'Staycation'
    }
    else if (category === 'poolnbeach') {
        category = 'Pool & Beach'
    }
    else if (category === 'spaoffers') {
        category = 'Spa Offers'
    }
    else if (category === 'kidscorner') {
        category = 'Kids Corner'
    }


    // Close the dropdown when clicking anywhere outside of it
    const handleClickOutside = (event) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
            setIsOpen(false);
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    return (
        <>
            <Navbar />
            <div className="hidden md:block">
                <Tabbar />
            </div>

            <section>
                <div className="header flex justify-between md:mt-5 md:ml-32 md:mr-32 align-middle items-center">
                    <div className="hidden md:block left">
                        <span className='capitalize text-2xl font-bold'>
                            {category}
                        </span>
                    </div>

                    <div className="flex justify-center align-middle items-center">

                        <div className="search">
                            <div class="p-4">
                                <div class="relative mt-1">
                                    <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                        <svg class="w-5 h-5 text-gray-500 dark:text-gray-400" fill="currentColor" viewBox="0 0 20 20"
                                            xmlns="http://www.w3.org/2000/svg">
                                            <path fill-rule="evenodd"
                                                d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                                                clip-rule="evenodd"></path>
                                        </svg>
                                    </div>

                                    <input type="text" id="table-search" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-20 md:w-52 pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search for items" />

                                </div>
                            </div>
                        </div>

                        <div class="filterbyfeature">
                            <div className="relative inline-block text-left">
                                <button
                                    onClick={toggleDropdown}
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-40 md:w-52 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                >
                                    <span className='text-gray-500'>Filter by Features</span>
                                </button>
                                {isOpen && (
                                    <div
                                        className="origin-top-right absolute right-0 mt-2 w-36 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 w-52 z-50"
                                        ref={dropdownRef}
                                    >
                                        <div className="p-5">
                                            <div className="popular">
                                                <span className='ml-0 font-semibold text-sm'>Popular Filters</span>
                                                <div class="flex items-center mb-1 mt-2">
                                                    <input id="staycation" type="checkbox" value="" class="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                                    <label for="staycation" class="ml-2 text-sm font-normal text-gray-900 dark:text-gray-300">Staycation</label>
                                                </div>

                                                <div class="flex items-center mb-1">
                                                    <input id="thingstodo" type="checkbox" value="" class="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                                    <label for="thingstodo" class="ml-2 text-sm font-normal text-gray-900 dark:text-gray-300">thingstodo</label>
                                                </div>

                                                <div class="flex items-center mb-1">
                                                    <input id="fridayNightOuts" type="checkbox" value="" class="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                                    <label for="fridayNightOuts" class="ml-2 text-sm font-normal text-gray-900 dark:text-gray-300">Friday NightOuts</label>
                                                </div>

                                                <div class="flex items-center mb-1">
                                                    <input id="djNights" type="checkbox" value="" class="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                                    <label for="djNights" class="ml-2 text-sm font-normal text-gray-900 dark:text-gray-300">DJ Nights</label>
                                                </div>

                                                <div class="flex items-center mb-1">
                                                    <input id="meetNgreet" type="checkbox" value="" class="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                                    <label for="meetNgreet" class="ml-2 text-sm font-normal text-gray-900 dark:text-gray-300">Meet and Greet</label>
                                                </div>

                                                <div class="flex items-center">
                                                    <input id="celebritiesAround" type="checkbox" value="" class="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                                    <label for="celebritiesAround" class="ml-2 text-sm font-normal text-gray-900 dark:text-gray-300">Celebrities Around</label>
                                                </div>
                                            </div>

                                            <hr className='h-px my-3 bg-gray-500 border-0 dark:bg-gray-700' />

                                            <div className="distance">
                                                <span className='ml-0 font-semibold text-sm'>Distance From Muscat</span>
                                                <div class="flex items-center mb-1 mt-2">
                                                    <input id="4km" type="checkbox" value="" class="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                                    <label for="4km" class="ml-2 text-sm font-normal text-gray-900 dark:text-gray-300">Less than 4 km</label>
                                                </div>

                                                <div class="flex items-center mb-1">
                                                    <input id="10km" type="checkbox" value="" class="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                                    <label for="10km" class="ml-2 text-sm font-normal text-gray-900 dark:text-gray-300">Less than 10 km</label>
                                                </div>

                                                <div class="flex items-center mb-1">
                                                    <input id="more10km" type="checkbox" value="" class="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                                    <label for="more10km" class="ml-2 text-sm font-normal text-gray-900 dark:text-gray-300">More than 10 km</label>
                                                </div>


                                            </div>

                                            <hr className='h-px my-3 bg-gray-500 border-0 dark:bg-gray-700' />

                                            <div className="timings">
                                                <span className='ml-0 font-semibold text-sm'>Distance From Muscat</span>
                                                <div class="flex items-center mb-1 mt-2">
                                                    <input id="slota" type="checkbox" value="" class="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                                    <label for="slota" class="ml-2 text-sm font-normal text-gray-900 dark:text-gray-300">8am to 12pm</label>
                                                </div>

                                                <div class="flex items-center mb-1">
                                                    <input id="slotb" type="checkbox" value="" class="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                                    <label for="slotb" class="ml-2 text-sm font-normal text-gray-900 dark:text-gray-300">12pm to 8pm </label>
                                                </div>

                                                <div class="flex items-center mb-1">
                                                    <input id="slotc" type="checkbox" value="" class="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                                    <label for="slotc" class="ml-2 text-sm font-normal text-gray-900 dark:text-gray-300">More than 10 km</label>
                                                </div>


                                            </div>

                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="datepicker">
                            <div className="p-4">
                                <label htmlFor="date"></label>
                                <input className='bg-gray-50 border border-gray-300 text-transparent text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-20 md:w-52  p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500' for='date' type="date" />
                            </div>
                        </div>

                    </div>
                </div>

                <div className='max-w-screen flex flex-col md:flex-row'>
                    <div className='hidden md:flex w-11/12 md:ml-32 md:flex-wrap justify-center md:justify-start leading-3'>
                        <Link to="/events/eventid" > 
                        <EventCard />
                        </Link>
                        <Link to="/events/eventid" > 
                        <EventCard />
                        </Link>
                        <Link to="/events/eventid" > 
                        <EventCard />
                        </Link>
                        <Link to="/events/eventid" > 
                        <EventCard />
                        </Link>
                    </div>

                    <div>
                        <Carousel />
                    </div>

                    <div className='md:mr-40 mt-3 flex flex-col justify-center align-middle items-center'>
                        <div>
                            <GoogleMap className={"md:h-96 md:w-80"} />
                        </div>


                        <div className="flex flex-col justify-center items-center ">
                            <div className="mt-3 mx-auto">
                                <span className="text-xl ml-8 font-bold mt-3">
                                    Trending in Muscat
                                </span>
                            </div>
                            <SubEventCard />
                            <SubEventCard />
                            <SubEventCard />
                        </div>


                    </div>
                </div>

            </section>

            <div className=''>
                < Footer />
            </div>

        </>
    )
}

export default Events