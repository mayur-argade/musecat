import React, { useState, useRef, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import { CategoryCount, ClientUpcomingEvents, getCategoryEvents } from '../../../http/index'

// components
import Footer from '../../../components/shared/Footer/Footer'
import Navbar from '../../../components/shared/Navbar/Navbar'
import EventCard from '../../../components/Cards/EventCard'
import BottomNav from '../../../components/shared/BottomNav/BottomNav'
import CategoryCard from '../../../components/Cards/CategoryCard'
import UpcomingEventsCard from '../../../components/Cards/UpcomingEventsCard'
import CategorySkeleton from '../../../components/shared/skeletons/CategorySkeleton'
import DarkModeToggle from '../../../components/shared/DarkModeToggle/DarkModeToggle'
import SkeletonCard from '../../../components/shared/skeletons/SkeletonCard'

// external utils
import PageTitle from '../../../utils/PageTitle'
import moment from 'moment'
import toast, { Toaster } from 'react-hot-toast';

import WhereTo from './Components/WhereTo'
import ScrollToTop from '../../../components/ScrollToTop/ScrollToTop'
import Vouchers from './Components/Vouchers'
import EditorsPick from './Components/EditorsPick'
import UpcomingEvents from './Components/UpcomingEvents'
import PopularCategories from './Components/PopularCategories'

const Home = () => {

    document.title = PageTitle.home

    const navigate = useNavigate()



    const scrollLeft = () => {
        document.getElementById("content").scrollLeft -= 400;
    }
    const scrollRight = () => {
        document.getElementById("content").scrollLeft += 400;
    }

    const [selectedDate, setSelectedDate] = useState(null);

    // Define a callback function to receive the selected date
    const handleDateSelection = (date) => {
        setSelectedDate(date);
        // You can perform any actions with the selected date here
    };





    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        // Trigger the animation after a delay or based on your specific logic
        setTimeout(() => {
            setIsVisible(true);
        }, 1000); // Adjust the delay as needed
    }, []);

    // Get the current date
    const nowdate = moment();

    // Calculate the start of the current week (Sunday)
    const startOfWeek = nowdate.clone().startOf('week');

    // Initialize an array to store the dates
    const daysAndDates = [];

    // Loop from Sunday to Monday and add each date to the array
    for (let i = 0; i <= 6; i++) {
        const day = moment().clone().add(i, 'days');
        daysAndDates.push({
            day: day.format('dddd'), // Get the day name (e.g., "Sunday")
            date: day.format('YYYY-MM-DD'), // Get the date (e.g., "2023-09-17")
        });
    }

    const [category, setCategory] = useState('')

    const [showLinks, setShowLinks] = useState(false)
    const [day, SetDay] = useState('')
    const [categoryLoading, setCategoryLoading] = useState(false)

    const [selectedDay, setSelectedDay] = useState('')
    const [chooseDate, setChooseDate] = useState('')

    function setDayforCategory(passedDate) {
        // console.log("this is passed date", passedDate)
        setSelectedDay(passedDate)
        SetDay(`?date=${passedDate}`)
        // console.log(selectedDay)
    }
    // console.log("this is selected day", selectedDay)
    function displayLinks() {
        console.log("clicked")
        setShowLinks(true)
    }

    const followButtonRef = useRef(null);

    // Add a click event listener to the entire document to handle clicks outside the button
    const handleClickOutside = (event) => {
        if (followButtonRef.current && !followButtonRef.current.contains(event.target)) {
            setShowLinks(false);
        }
    };

    useEffect(() => {
        document.addEventListener('click', handleClickOutside);

        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, []);

    useEffect(() => {
        const fetchdata = async () => {
            setCategoryLoading(true)
            try {
                const { data } = await CategoryCount(day)
                // console.log("categorydata", data)
                setCategory(data)

                setCategoryLoading(false)
            } catch (error) {
                setCategoryLoading(false)
                console.log(error)
            }
        }

        fetchdata()
    }, [day]);


    // console.log("highlightesd date", highlightedDates)

    const [query, setQuery] = useState('')

    const isStandalone = window.matchMedia('(display-mode: standalone)').matches;



    return (
        <>
            <div className='dark:bg-[#2c2c2c] dark:text-white appmargine '>
                <Navbar />
                {
                    isStandalone || window.isNative == true
                        ?
                        <>
                        </>
                        :
                        <div
                            class="NoHeader bg-center bg-no-repeat bg-cover bg-[url('https://res.cloudinary.com/mayurs-media/image/upload/v1692687464/bgHome_byrjjp.jpg')]">
                            <header className='p-5 md:p-10 '>

                                <div className="">
                                    <div
                                        className={` bottom-0 transition ease-in-out delay-200 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
                                            }`}
                                    >
                                        <div className='flex justify-center md: pt-0 md:p-10'>
                                            <p className='pb-5 leading-loose text-4xl md:text-4xl text-center text-white font-bold'>
                                                <span className='dark:text-black'>Find the</span>
                                                <br className='block md:hidden' />
                                                <span className='dark:text-black'>perfect</span>
                                                <br className='block md:hidden' />

                                                <span className='dark:text-black'>experience</span>


                                                {/* <div className='md:hidden absolute top-0 right-0'>
                                            <img className='h-12' src="/images/assets/download-banner.png" alt="" />
                                        </div> */}



                                                <div className=' flex md:hidden items-center justify-center '>
                                                    <div className='bg-white-600 backdrop-blur-md backdrop-greyscale-2 backdrop-opacity-80 border border-t-white border-l-white rounded-md w-11/12 md:w-2/3 flex items-center justify-center flex-col p-3 rounded-lg'>
                                                        <p className='text-xl font-semibold text-white mb-3'>
                                                            Where To ?
                                                        </p>

                                                        <form>
                                                            <div class="p-3">
                                                                <div class="z-10 relative ">
                                                                    <input
                                                                        onChange={((e) => setQuery(e.target.value))}
                                                                        type="search" id="location-search" class="bg-[#E7E7E7] block p-2.5 w-72 z-20 text-xs text-gray-500 font-normal rounded-r-lg rounded-l-lg border-l-gray-50 border-l-2 border border-gray-300 focus:ring-[#C0A04C] focus:border-[#C0A04C] dark:bg-gray-700 dark:border-l-gray-700  dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-[#C0A04C]" placeholder="Search for anything on muscat" required />

                                                                    <button
                                                                        // onClick={() => {
                                                                        //     // Check if the query is not empty before navigating
                                                                        //     if (query.trim() !== '') {
                                                                        //         navigate(`/Category/events?search=${query}`);
                                                                        //     }
                                                                        // }}
                                                                        type="button" class="absolute top-0 right-0 h-full p-2.5 text-sm font-medium text-white bg-[#C0A04C] rounded-r-lg border border-[#C0A04C] hover:bg-[#C0A04C]  focus:[#A48533] dark:bg-[#C0A04C] dark:hover:bg-[#C0A04C] dark:focus:ring-[#C0A04C]">
                                                                        <img className='h-5' src="/images/icons/home-search.svg" alt="" />
                                                                        <span class="sr-only">Search</span>
                                                                    </button>
                                                                </div>
                                                            </div>
                                                        </form>


                                                    </div>
                                                </div>

                                                <span className='dark:text-black'>in</span>
                                                <br className='md:block hidden' />
                                                <span className='dark:text-black'> any </span>
                                                <br className='block md:hidden' />

                                                <span className='dark:text-black'>destination</span>
                                            </p>
                                        </div>

                                        <div onClick={() => setShowLinks(!showLinks)} className='hidden md:block z-50 '>
                                            <button
                                                ref={followButtonRef}
                                                className='m-0 -right-10 absolute  text-white bg-[#C0A04C] hover:bg-[#A48533] text-sm font-semibold py-2 pl-7 pr-6 rounded-l-full'>
                                                Follow Us
                                            </button>
                                            {showLinks
                                                ?
                                                <div
                                                    className='-right-10 absolute  px-3 bg-white rounded-l-full flex space-x-2 py-2'>
                                                    <a blank href="https://wa.me/+96891738405">
                                                        <img className='h-7' src="/images/icons/wp-a.svg" alt="" />
                                                    </a>
                                                    <a href="https://www.facebook.com/muscatwhereto">
                                                        <img className='h-7' src="/images/icons/fb-a.svg" alt="" />
                                                    </a>

                                                    <a href="https://www.instagram.com/muscat_whereto/">
                                                        <img className='h-7' src="/images/icons/ig-a.svg" alt="" />
                                                    </a>
                                                    <a href="mailto:info@muscatwhereto.com">
                                                        <img className='h-7' src="/images/icons/emal-a.svg" alt="" />
                                                    </a>
                                                </div>
                                                :
                                                <>
                                                </>
                                            }
                                        </div>

                                        <div className='hidden md:flex items-center justify-center '>
                                            <div className='bg-white dark:border-0 border-2 w-11/12 md:w-2/3 flex items-center justify-center flex-col p-3 rounded-lg dark:bg-[#2c2c2c] '>
                                                <div>
                                                    <span className='text-xl font-bold'>
                                                        Where To ?
                                                    </span>
                                                </div>
                                                <div className='flex w-full justify-center'>
                                                    <div className='w-full flex grow '>
                                                        <input onChange={((e) => setQuery(e.target.value))} type="text" id="default-input" placeholder='Search by experience, Food & wine, Live Events, Attractions, e.g. ' class="bg-[#E7E7E7] border border-gray-300 focus:ring-[#C0A04C] focus:border-[#C0A04C] text-gray-900 text-xs rounded-lg block md:w-full p-3 mx-3 dark:bg-[#454545] dark:border-0 dark:placeholder-gray-400 dark:text-white dark:focus:ring-[#C0A04C] dark:focus:border-[#C0A04C]" />
                                                    </div>

                                                    <div className='flex mx-auto justify-center'>
                                                        <button onClick={() => {
                                                            // Check if the query is not empty before navigating
                                                            if (query.trim() !== '') {
                                                                navigate(`/Category/events?search=${query}`);
                                                            }
                                                        }}
                                                            type="button" class="shadow-lg shadow-cyan-500/25 align-middle text-white bg-[#C0A04C] hover:bg-[#A48533] hover:text-white focus:[#A48533] font-medium rounded-lg text-sm px-8 py-2 text-center mr-3 md:mr-0 dark:bg-[#454545] dark:hover:bg-gray-500 dark:focus:ring-[#C0A04C] flex align-middle justify-center items-center">
                                                            <img src="/images/icons/search1.svg" className="h-4 w-4" alt="" srcset="" />
                                                            <span>Search</span>
                                                        </button>
                                                    </div>
                                                </div>


                                                <div className='flex flex-wrap align-middle items-center justify-between mt-5 w-full'>
                                                    <div>
                                                        <p className='hidden font-bold text-md md:block text-left align-middle mb-1'>
                                                            Popular Searches
                                                        </p>
                                                        <div className='hidden md:flex flex-wrap justify-between space-y-2 md:space-x-52'>
                                                            <div className='flex flex-wrap justify-center md:space-x-2  '>
                                                                <Link className='my-1' to='/category/staycation'>
                                                                    <button className='rounded-full border border-black dark:border-white pr-4 pl-4 h-6 text-xs hover:bg-black hover:text-white'>staycation</button>
                                                                </Link>
                                                                <Link className='my-1' to='/category/events'>
                                                                    <button className='rounded-full border border-black dark:border-white pr-4 pl-4 h-6 text-xs hover:bg-black hover:text-white'>friday bunch</button>
                                                                </Link>
                                                                <Link className='my-1' to='/category/thingstodo'>
                                                                    <button className='rounded-full border border-black dark:border-white pr-4 pl-4 h-6 text-xs hover:bg-black hover:text-white'>Things to do</button>
                                                                </Link>
                                                                <Link className='my-1' to='/category/kidscorner'>
                                                                    <button className='rounded-full border border-black dark:border-white pr-4 pl-4 h-6 text-xs hover:bg-black hover:text-white'>kids corner</button>
                                                                </Link>
                                                                <Link className='my-1' to='/category/weeklyoffers'>
                                                                    <button className='rounded-full border border-black dark:border-white pr-4 pl-4 h-6 text-xs hover:bg-black hover:text-white'>Weekly Offers</button>
                                                                </Link>
                                                                <Link className='my-1' to='/category/ladiesnight'>
                                                                    <button className='rounded-full border border-black dark:border-white pr-4 pl-4 h-6 text-xs hover:bg-black hover:text-white'>Ladies Night</button>
                                                                </Link>
                                                                <Link className='my-1' to='/category/editorspick'>
                                                                    <button className='rounded-full border border-black dark:border-white pr-4 pl-4 h-6 text-xs hover:bg-black hover:text-white'>Editor's Pick</button>
                                                                </Link>
                                                            </div>
                                                        </div>
                                                    </div>


                                                </div>

                                            </div>
                                        </div>

                                    </div>
                                </div>
                            </header>
                        </div>
                }


                <div className='flex justify-center items-center align-middle mt-5'>
                    <section className='w-full md:w-full sm:mx-5 md:mx-5 md:w-10/12 xl:w-9/12 2xl:w-7/12'>
                        <div className='flex justify-between align-middle '>

                            <div className="left flex items-center align-middle ">
                                <span className='text-xl font-bold md:text-2xl md:font-[700]'>Popular Category</span></div>

                            <div className="hidden right md:flex flex-wrap space-x-2">
                                {
                                    daysAndDates.map((e) => (
                                        <button
                                            onClick={() => setDayforCategory(e.date)}
                                            className={`md:block hover:bg-black hover:text-white rounded-full border-black dark:border-white px-3 py-1 text-xs border ${selectedDay == e.date
                                                ? 'bg-black text-white'
                                                : ''
                                                }`}
                                        >
                                            {e.day}
                                        </button>
                                    ))
                                }

                                <div className='block selectoption pr-2 md:hidden'>
                                    <select
                                        id="countries"
                                        className="bg-black border border-gray-300 text-white text-sm rounded-full focus:ring-[#C0A04C] focus:border-[#C0A04C] block w-full p-1.5 px-3.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-[#C0A04C] dark:focus:border-[#C0A04C]"
                                    >
                                        {daysAndDates.map((e) => (
                                            <option
                                                key={e.date} // Make sure to add a unique key prop when mapping in React
                                                value={e.date}
                                                onClick={() => setDayforCategory(e.date)}
                                                className={`hover:bg-black hover:text-white rounded-full border-black px-3 py-1 text-xs border ${selectedDay == e.date ? 'bg-black text-white' : '' // Apply different styling for the selected option
                                                    }`}
                                            >
                                                {e.day}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div>
                            <div id="content" className=' carousel p-4 flex items-center justify-start overflow-x-auto scroll-smooth md:scrollbar-hide space-x-5'>
                                {
                                    category.data == null || category.data == undefined
                                        ?
                                        <>
                                            <div className='md:h-72 flex space-x-3'>
                                                <CategorySkeleton />
                                                <CategorySkeleton />                                            </div>
                                        </>
                                        :
                                        categoryLoading
                                            ?
                                            <>
                                                <div className='md:h-72 flex space-x-3'>
                                                    <CategorySkeleton />
                                                    <CategorySkeleton />
                                                </div>
                                            </>
                                            :
                                            category.data.length === 0
                                                ?
                                                <>
                                                    <div className='flex justify-center'>
                                                        <img className='h-60' src="/images/assets/logo-main.png" alt="" />
                                                    </div>
                                                </>
                                                :
                                                category.data.map((category) => {
                                                    return (
                                                        <Link to={`/category/${category.categoryURL}`} key={category._id}>
                                                            <div className='w-44 md:w-56'>
                                                                <CategoryCard data={category} />
                                                            </div>
                                                        </Link>
                                                    );

                                                })
                                }
                            </div>
                        </div>
                        <div className='grid md:grid-cols-3 flex align-middle'>
                            <div className=""></div>

                            <div className=" hidden md:flex  justify-center items-center space-x-4">
                                <button onClick={scrollLeft}>
                                    <img className='h-10' src="/images/icons/homebackarrow.svg" alt="" />

                                </button>
                                <button onClick={scrollRight}>
                                    <img className='h-10' src="/images/icons/homefrontarrow.svg" alt="" />
                                </button>
                            </div>

                            <div className=' flex justify-end space-x-3 '>
                                <div className='flex justify-end align-middle items-center'>
                                    <Link to='/whereto' className='flex justify-end align-middle items-center'>
                                        <img className='h-6 mr-1' src="/images/icons/map.svg" alt="" />
                                        <p className='text-sm font-medium underline'>View on map</p>
                                    </Link>
                                </div>
                                <div className='flex justify-end align-middle items-center'>
                                    <Link to="/category/staycation">
                                        <p className='text-gray-400 font-medium underline underline-offset-1 text-sm pr-2 '>view all</p>
                                    </Link>
                                </div>

                            </div>

                        </div>
                    </section>
                </div>

                <UpcomingEvents />

                <EditorsPick />

                <Vouchers />

                <WhereTo />

                <ScrollToTop />

            </div >


            <div className='dark:bg-[#2c2c2c] dark:text-white'>
                <Footer />
            </div>


            <div>
                <BottomNav />
            </div>
        </>
    )

}

export default Home