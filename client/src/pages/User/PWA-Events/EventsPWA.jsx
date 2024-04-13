import React, { useState, useEffect, useRef, forwardRef } from 'react'
import { Link, useParams } from 'react-router-dom'
import Navbar from '../../../components/shared/Navbar/Navbar'
import BottomNav from '../../../components/shared/BottomNav/BottomNav'
import { AllDateEvents } from '../../../http/index'
import SubEventCard from '../../../components/Cards/SubEventCard'
import DatePicker from "react-datepicker";
import moment from 'moment'
import "react-datepicker/dist/react-datepicker.css";
import Features from '../../../utils/Data'
import PwaCards from '../../../components/Cards/PwaCards'

const EventsPWA = () => {

    const [groupedEvents, setGroupedEvents] = useState({});
    const [loading, setLoading] = useState(false)

    const searchInputRef = useRef(null);
    const [search, setSearch] = useState('')

    const [hideFilter, setHideFilter] = useState(false);

    const [hideDate, setHideDate] = useState(false);

    const [filterDate, setFilterDate] = useState(null)

    const [isOpen, setIsOpen] = useState(false);

    const [categories, setCategories] = useState([])

    const [selectedDistance, setSelectedDistance] = useState([])

    const [selectedFeatures, setSelectedFeatures] = useState([])

    const [selectedCategories, setSelectedCategories] = useState([])

    const [userCord, setUserCord] = useState({})


    let { category } = useParams();

    const handleFeaturesChange = (feature) => {
        if (selectedFeatures.includes(feature)) {
            // Remove the feature from selectedFeatures
            setSelectedFeatures(selectedFeatures.filter((url) => url !== feature));
        } else {
            // Add the feature to selectedFeatures
            setSelectedFeatures([...selectedFeatures, feature]);
        }
    }

    const handleDistanceChange = (distance) => {
        getUserLocation()
        if (selectedDistance.includes(distance)) {
            setSelectedDistance(selectedDistance.filter((dis) => dis !== distance))
        } else {
            setSelectedDistance([...selectedDistance, distance])
        }
    }

    async function getUserLocation() {
        try {
            const position = await new Promise((resolve, reject) => {
                navigator.geolocation.getCurrentPosition(resolve, reject);
            });

            const userLocation = {
                latitude: position.coords.latitude,
                longitude: position.coords.longitude,
            };

            setUserCord(userLocation)
            // Use userLocation for filtering.
        } catch (error) {
            console.error('Error getting user location:', error);
        }
    }

    const toggleSearch = () => {
        setHideFilter(true);
        setHideDate(true);
    };

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const MakeNormal = () => {
        setHideFilter(false);
        setHideDate(false);
    }

    const dropdownRef = useRef(null);

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

    const ExampleCustomInput = forwardRef(({ value, onClick }, ref) => (
        <button
            onClick={onClick} ref={ref}
            className="flex items-center cursor-pointer bg-gray-50 border border-gray-300 text-black placeholder-gray-500 text-sm rounded-lg focus:ring-[#C0A04C] focus:border-[#C0A04C] p-2 dark:bg-[#454545] dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-[#C0A04C] dark:focus:border-[#C0A04C] w-40"
        >
            {
                filterDate
                    ?
                    <div className='flex align-middle items-center'>
                        <span className='text-[#A48533] font-semibold'>
                            {moment(filterDate).format('DD-MM-YYYY')}
                        </span>
                        <div onClick={() => setFilterDate(null)}>
                            <img className='h-4 ml-2 flex dark:hidden' src="/images/icons/cancel-icon.png" alt="" />
                            <img className='h-4 ml-2 dark:flex hidden' src="/images/icons/cancel-icon-light.png" alt="" />
                        </div>
                    </div>
                    :
                    <>
                        <span className="text-gray-500 dark:text-white">Calendar</span>
                        <img className="ml-2 w-4 h-4 flex dark:hidden" src="/images/icons/calendar.png" alt="" />
                        <img className="ml-2 w-4 h-4 hidden dark:flex" src="/images/icons/calendar-light.png" alt="" />
                    </>

            }
        </button>

    ));


    const ChangeFilterDate = (date) => {
        const format = new Date(date)
        const datemoment = moment(format).format("YYYY-MM-DD")
        // console.log(datemoment)
        setFilterDate(format)
    }

    const handleCategoryChange = (categoryURL) => {
        // console.log(categoryURL)
        // Check if the categoryURL is already in selectedCategories
        if (selectedCategories.includes(categoryURL)) {
            // Remove the categoryURL from selectedCategories
            setSelectedCategories(selectedCategories.filter((url) => url !== categoryURL));
        } else {
            // Add the categoryURL to selectedCategories
            setSelectedCategories([...selectedCategories, categoryURL]);
        }
    };

    useEffect(() => {
        const fetchdata = async () => {
            setLoading(true)
            const dateData = {
                date: filterDate
            }
            try {
                const { data } = await AllDateEvents(dateData)
                console.log(data.data)
                setGroupedEvents(data)

                setLoading(false)
            } catch (error) {
                // console.log(error)
                setLoading(false)
            }
        }

        fetchdata()
    }, [filterDate]);


    return (
        <>
            <div className='h-full dark:bg-[#2c2c2c] dark:text-white'>
                <Navbar />
                <div className=' mt-3 md:mb-0 w-full flex justify-center lg:justify-end align-middle items-center space-x-5'>

                    <div className="flex items-center">
                        <span className="datepicker-toggle ">
                            <DatePicker
                                className='z-50'
                                selected={filterDate}
                                onChange={(date) => ChangeFilterDate(date)}
                                customInput={<ExampleCustomInput />}
                                minDate={moment().toDate()}
                                popperModifiers={{
                                    preventOverflow: {
                                        enabled: true,
                                    },
                                }}
                            />
                        </span>
                    </div>

                    <div className={`filterbyfeature ${hideFilter ? 'hidden md:block' : ''}`}>
                        <div className="relative inline-block text-left">
                            <button
                                onClick={toggleDropdown}
                                className="flex align-middle space-x-3 bg-gray-50 border border-gray-300 dark:bg-[#454545] dark:text-white text-gray-900 md:text-sm text-md rounded-lg focus:ring-[#C0A04C] focus:border-[#C0A04C] block w-14 md:w-52 p-1.5 dark:border-[#454545] dark:text-white dark:focus:ring-[#C0A04C] dark:focus:border-[#C0A04C]"
                            >
                                <span className='hidden md:block text-gray-500'>Filter by Features</span>
                                <span className='hidden block text-gray-500'>Filter</span>

                                <img className='h-5' src="/images/icons/star.svg" alt="" />
                            </button>
                            {/* {isOpen && (
                                <div
                                    className="dark:bg-[#454545] dark:text-white origin-top-right right-0 absolute  mt-2 h-80 overflow-y-auto w-52 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-50"
                                    ref={dropdownRef}
                                >
                                    <div className="p-5">
                                        {
                                            category == 'events' && (
                                                <div className="popular">
                                                    <span className='ml-0 font-semibold text-sm'>Popular Filters</span>
                                                    {
                                                        categories.data.map((e) => (
                                                            <div class="flex items-center mb-1 mt-2">
                                                                <input id={e.categoryURL} type="checkbox"
                                                                    onChange={() => handleCategoryChange(e)}
                                                                    checked={selectedCategories.includes(e)}
                                                                    value={e} class="w-4 h-4 text-[#C0A04C] border-gray-300 rounded focus:ring-[#C0A04C] dark:focus:ring-[#C0A04C] dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                                                <label for="staycation" class="ml-2 text-sm font-normal text-gray-900 dark:text-gray-300">{e.name}</label>
                                                            </div>
                                                        ))
                                                    }
                                                </div>
                                            )
                                        }

                                        <hr className='h-px my-3 bg-gray-500 border-0 dark:bg-gray-700' />

                                        <div className="popular">
                                            <span className='ml-0 font-semibold text-sm'>Features</span>
                                            {
                                                Features.list.map((e) => (
                                                    <div class="flex items-center mb-1 mt-2">
                                                        <input id={e} type="checkbox"
                                                            onChange={() => handleFeaturesChange(e)}
                                                            checked={selectedFeatures.includes(e)}
                                                            value={e} class="w-4 h-4 text-[#C0A04C] border-gray-300 rounded focus:ring-[#C0A04C] dark:focus:ring-[#C0A04C] dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                                        <label for="staycation" class="ml-2 text-sm font-normal text-gray-900 dark:text-gray-300">{e}</label>
                                                    </div>
                                                ))
                                            }
                                        </div>

                                        <hr className='h-px my-3 bg-gray-500 border-0 dark:bg-gray-700' />

                                        <div className="distance">
                                            <span className='ml-0 font-semibold text-sm'>Distance From Muscat</span>
                                            <div class="flex items-center mb-1 mt-2">
                                                <input onChange={() => handleDistanceChange(4)}
                                                    checked={selectedDistance.includes(4)} id="4km" type="checkbox" value="" class="w-4 h-4 text-[#C0A04C] border-gray-300 rounded focus:ring-[#C0A04C] dark:focus:ring-[#C0A04C] dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                                <label for="4km" class="ml-2 text-sm font-normal text-gray-900 dark:text-gray-300">Less than 4 km</label>
                                            </div>

                                            <div class="flex items-center mb-1">
                                                <input onChange={() => handleDistanceChange(10)}
                                                    checked={selectedDistance.includes(10)} id="10km" type="checkbox" value="" class="w-4 h-4 text-[#C0A04C] border-gray-300 rounded focus:ring-[#C0A04C] dark:focus:ring-[#C0A04C] dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                                <label for="10km" class="ml-2 text-sm font-normal text-gray-900 dark:text-gray-300">Less than 10 km</label>
                                            </div>

                                            <div class="flex items-center mb-1">
                                                <input id="more10km" type="checkbox" value="" class="w-4 h-4 text-[#C0A04C] border-gray-300 rounded focus:ring-[#C0A04C] dark:focus:ring-[#C0A04C] dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                                <label for="more10km" class="ml-2 text-sm font-normal text-gray-900 dark:text-gray-300">More than 10 km</label>
                                            </div>


                                        </div>

                                        <hr className='h-px my-3 bg-gray-500 border-0 dark:bg-gray-700' />
                                    </div>
                                </div>
                            )} */}
                        </div>
                    </div>

                    <div className="search">
                        <div class="">
                            <div class="relative">
                                <div class="absolute inset-y-0 right-4 flex items-center pl-3 pointer-events-none">
                                    <svg class="w-5 h-5 text-gray-500 dark:text-gray-400" fill="currentColor" viewBox="0 0 20 20"
                                        xmlns="http://www.w3.org/2000/svg">
                                        <path fill-rule="evenodd"
                                            d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                                            clip-rule="evenodd"></path>
                                    </svg>
                                </div>
                                <input
                                    ref={searchInputRef}
                                    type="text"
                                    id="table-search"
                                    className={`dark:bg-[#454545] dark:placeholder-[#454545] placeholder-gray-50 md:placeholder-gray-500 bg-gray-50 border border-gray-300 text-gray-900 md:text-gray-900 text-sm rounded-lg focus:ring-[#C0A04C] focus:border-[#C0A04C] block pl-5 p-2 dark:border-[#454545] dark:text-white dark:focus:ring-[#C0A04C] dark:focus:border-[#C0A04C] w-14 md:w-44 focus:w-32 md:focus:w-44`}
                                    onChange={(e) => setSearch(e.target.value)}
                                    placeholder="Search "
                                    onFocus={toggleSearch}
                                    onBlur={MakeNormal}
                                />
                            </div>
                        </div>
                    </div>

                </div>
                <section className='flex justify-center items-center align-middle mt-5'>
                    <section className='pb-14 w-full'>
                        {Object.entries(groupedEvents).map(([date, events]) => (
                            <div className='' key={date}>
                                <h2 className='ml-12'>{date != 'undefined' ? require('moment')(date).format('dddd, MMMM Do YYYY') : ""}</h2>
                                <ul className=''>
                                    {/* Render events for this date */}
                                    {events.filter((item) => search.toLocaleLowerCase() === '' ? true : item.title.toLowerCase().includes(search)
                                    ).map(event => (
                                        <li className='w-full flex justify-center items-center' key={event._id}>
                                            <PwaCards data={event} />
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </section>
                </section>
                <div className='pb-24'></div>
            </div>
            <div>
                <BottomNav />
            </div>
        </>
    )
}

export default EventsPWA