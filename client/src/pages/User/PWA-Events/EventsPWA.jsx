import React, { useState, useEffect, useRef, forwardRef } from 'react'
import { Link, useParams } from 'react-router-dom'
import Navbar from '../../../components/shared/Navbar/Navbar'
import BottomNav from '../../../components/shared/BottomNav/BottomNav'
import { AllDateEvents } from '../../../http/index'
import SubEventCard from '../../../components/Cards/SubEventCard'
import DatePicker from "react-datepicker";
import moment from 'moment'
import "react-datepicker/dist/react-datepicker.css";
import { Features } from '../../../utils/Data'
import PwaCards from '../../../components/Cards/PwaCards'

const EventsPWA = () => {

    const [groupedEvents, setGroupedEvents] = useState({});
    const [loading, setLoading] = useState(false)
    const [trending, setTrending] = useState(false)

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
        setTrending(!trending);
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
        console.log(datemoment)
        setFilterDate(new Date(`${datemoment}T00:00:00z`))
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
                date: filterDate,
                trending: trending
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
    }, [filterDate, trending]);


    return (
        <div className='dark:bg-[#2c2c2c] dark:text-white contactmargine'>
            <div className='dark:bg-[#2c2c2c] dark:text-white'>
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
                                className="flex align-middle items-center justify-center space-x-3 bg-gray-50 border border-gray-300 dark:bg-[#454545] dark:text-white text-gray-900 md:text-sm text-md rounded-lg focus:ring-[#C0A04C] focus:border-[#C0A04C] block w-14 md:w-52 p-1.5 dark:border-[#454545] dark:text-white dark:focus:ring-[#C0A04C] dark:focus:border-[#C0A04C]"
                            >
                                {
                                    trending
                                        ?
                                        <svg class="w-6 h-6 text-gray-500 dark:text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path fill="none" d="M0 0h24v24H0z"></path><path d="M10.6144 17.7956 11.492 15.7854C12.2731 13.9966 13.6789 12.5726 15.4325 11.7942L17.8482 10.7219C18.6162 10.381 18.6162 9.26368 17.8482 8.92277L15.5079 7.88394C13.7092 7.08552 12.2782 5.60881 11.5105 3.75894L10.6215 1.61673C10.2916.821765 9.19319.821767 8.8633 1.61673L7.97427 3.75892C7.20657 5.60881 5.77553 7.08552 3.97685 7.88394L1.63658 8.92277C.868537 9.26368.868536 10.381 1.63658 10.7219L4.0523 11.7942C5.80589 12.5726 7.21171 13.9966 7.99275 15.7854L8.8704 17.7956C9.20776 18.5682 10.277 18.5682 10.6144 17.7956ZM19.4014 22.6899 19.6482 22.1242C20.0882 21.1156 20.8807 20.3125 21.8695 19.8732L22.6299 19.5353C23.0412 19.3526 23.0412 18.7549 22.6299 18.5722L21.9121 18.2532C20.8978 17.8026 20.0911 16.9698 19.6586 15.9269L19.4052 15.3156C19.2285 14.8896 18.6395 14.8896 18.4628 15.3156L18.2094 15.9269C17.777 16.9698 16.9703 17.8026 15.956 18.2532L15.2381 18.5722C14.8269 18.7549 14.8269 19.3526 15.2381 19.5353L15.9985 19.8732C16.9874 20.3125 17.7798 21.1156 18.2198 22.1242L18.4667 22.6899C18.6473 23.104 19.2207 23.104 19.4014 22.6899Z"></path></svg>
                                        :
                                        <svg class="w-6 h-6 text-gray-500 dark:text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="rgba(140,147,157,1)"><path fill="none" d="M0 0h24v24H0z"></path><path d="M10.6144 17.7956C10.277 18.5682 9.20776 18.5682 8.8704 17.7956L7.99275 15.7854C7.21171 13.9966 5.80589 12.5726 4.0523 11.7942L1.63658 10.7219C.868536 10.381.868537 9.26368 1.63658 8.92276L3.97685 7.88394C5.77553 7.08552 7.20657 5.60881 7.97427 3.75892L8.8633 1.61673C9.19319.821767 10.2916.821765 10.6215 1.61673L11.5105 3.75894C12.2782 5.60881 13.7092 7.08552 15.5079 7.88394L17.8482 8.92276C18.6162 9.26368 18.6162 10.381 17.8482 10.7219L15.4325 11.7942C13.6789 12.5726 12.2731 13.9966 11.492 15.7854L10.6144 17.7956ZM4.53956 9.82234C6.8254 10.837 8.68402 12.5048 9.74238 14.7996 10.8008 12.5048 12.6594 10.837 14.9452 9.82234 12.6321 8.79557 10.7676 7.04647 9.74239 4.71088 8.71719 7.04648 6.85267 8.79557 4.53956 9.82234ZM19.4014 22.6899 19.6482 22.1242C20.0882 21.1156 20.8807 20.3125 21.8695 19.8732L22.6299 19.5353C23.0412 19.3526 23.0412 18.7549 22.6299 18.5722L21.9121 18.2532C20.8978 17.8026 20.0911 16.9698 19.6586 15.9269L19.4052 15.3156C19.2285 14.8896 18.6395 14.8896 18.4628 15.3156L18.2094 15.9269C17.777 16.9698 16.9703 17.8026 15.956 18.2532L15.2381 18.5722C14.8269 18.7549 14.8269 19.3526 15.2381 19.5353L15.9985 19.8732C16.9874 20.3125 17.7798 21.1156 18.2198 22.1242L18.4667 22.6899C18.6473 23.104 19.2207 23.104 19.4014 22.6899ZM18.3745 19.0469 18.937 18.4883 19.4878 19.0469 18.937 19.5898 18.3745 19.0469Z"></path></svg>
                                }

                            </button>
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
                <section className='pb-24 flex justify-center items-center align-middle mt-5'>
                    {
                        loading
                            ?
                            <div className='dark:bg-[#2c2c2c] dark:text-white h-screen w-full flex justify-center align-middle items-center'>
                                <div class="relative flex justify-center items-center">
                                    <div class="absolute animate-spin rounded-full h-32 w-32 border-t-4 border-b-4 border-[#C0A04C]"></div>
                                    <img className='flex dark:hidden h-16 aspect-square' src="/images/assets/logo-main.png" alt="" />
                                    <img className='hidden dark:flex h-16 aspect-square' src="/images/logo/logo-main-light.png" alt="" />
                                </div>
                            </div>
                            :
                            <section className='pb-14 w-full'>
                                {Object.entries(groupedEvents).map(([date, events]) => {
                                    // Filter events based on the search term, convert to lowercase for case-insensitive comparison
                                    const filteredEvents = events.filter(event =>
                                        search.toLocaleLowerCase() === '' ? true : event.title.toLowerCase().includes(search.toLocaleLowerCase())
                                    );

                                    // Only render dates that have matching events
                                    if (filteredEvents.length > 0) {
                                        return (
                                            <div className='' key={date}>
                                                <h2 className='ml-12'>{date !== 'undefined' ? require('moment')(date).format('dddd, MMMM Do YYYY') : ''}</h2>
                                                <ul className=''>
                                                    {filteredEvents.map(event => (
                                                        <li className='w-full flex justify-center items-center' key={event._id}>
                                                            <PwaCards data={event} />
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        );
                                    }

                                    // If no events match, return null to skip rendering this date
                                    return null;
                                })}
                            </section>

                    }

                </section>
            </div>
            <div>
                <BottomNav />
            </div>
        </div>
    )
}

export default EventsPWA