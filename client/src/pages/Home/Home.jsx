import React, { useState, useRef, useEffect } from 'react'
import Footer from '../../components/shared/Footer/Footer'
import Navbar from '../../components/shared/Navbar/Navbar'
import CategoryCard from '../../components/Cards/CategoryCard'
import { Link, useNavigate } from 'react-router-dom'
import { addToFavorites, ClientGetOffers, CategoryCount, ClientUpcomingEvents, getCategoryEvents } from '../../http/index'
import moment from 'moment'
import EventCard from '../../components/Cards/EventCard'
import BottomNav from '../../components/shared/BottomNav/BottomNav'
import toast, { Toaster } from 'react-hot-toast';
import SkeletonCard from '../../components/shared/skeletons/SkeletonCard'
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import UpcomingEventsCard from '../../components/Cards/UpcomingEventsCard'
import CategorySkeleton from '../../components/shared/skeletons/CategorySkeleton'

const Home = () => {

    document.title = 'Home'

    const navigate = useNavigate()

    const [date, setDate] = useState('')

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

    const calendarRef = useRef(null);

    // Close the calendar when clicking outside
    const handleCalenderClickOutside = (e) => {
        if (calendarRef.current && !calendarRef.current.contains(e.target)) {
            setShowCalender(false);
        }
    };
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        // Trigger the animation after a delay or based on your specific logic
        setTimeout(() => {
            setIsVisible(true);
        }, 1000); // Adjust the delay as needed
    }, []);

    useEffect(() => {
        document.addEventListener('mousedown', handleCalenderClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleCalenderClickOutside);
        };
    }, []);

    // const [date, setDate] = useState(new Date()); // Initialize date with today's date

    // console.log(date)


    const handleDateChange = (newDate) => {
        setDate(`?date=${(moment(newDate).format('YYYY-MM-DD'))}`);
        setShowCalender(!showCalender)
        // You can do further processing with the selected date, such as sending it to the server or updating your state.
    };


    const next7Days = [];
    const currentDate = moment();


    for (let i = 0; i < 7; i++) {
        const formattedDate = currentDate.format('D MMM'); // Format date as "9 Sep"
        const acutaldate = moment(currentDate).format("YYYY-MM-DD")
        const dayOfWeek = currentDate.format('ddd'); // Get abbreviated day of the week like "Sat"
        next7Days.push({ actualdate: acutaldate, date: formattedDate, day: dayOfWeek });
        currentDate.add(1, 'days'); // Move to the next day
    }

    // Get the current date
    const nowdate = moment();

    // Calculate the start of the current week (Sunday)
    const startOfWeek = nowdate.clone().startOf('week');

    // Initialize an array to store the dates
    const daysAndDates = [];

    // Loop from Sunday to Monday and add each date to the array
    for (let i = 0; i <= 6; i++) {
        const day = startOfWeek.clone().add(i, 'days');
        daysAndDates.push({
            day: day.format('dddd'), // Get the day name (e.g., "Sunday")
            date: day.format('YYYY-MM-DD'), // Get the date (e.g., "2023-09-17")
        });
    }

    const [category, setCategory] = useState('')
    const [upcomingEvents, setUpcomingEvents] = useState('')
    const [editorpick, setEditorpick] = useState('')
    const [offers, setOffers] = useState([])

    const [showLinks, setShowLinks] = useState(false)
    const [day, SetDay] = useState('')
    const [categoryLoading, setCategoryLoading] = useState(false)
    const [upcomingEventsLoading, setUpcomingEventsLoading] = useState(false)
    const [offersLoading, setOffersLoading] = useState(false)
    const [editorpickLoading, setEditorpickLoading] = useState(false)
    const [showCalender, setShowCalender] = useState(false)

    function setnewfilterdate(actualdate) {
        setDate(`?date=${actualdate}`)
        console.log(actualdate)
    }

    function setDayforCategory(selectedDay) {
        SetDay(`?date=${selectedDay}`)
        console.log(selectedDay)
    }

    function displayLinks() {
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
                console.log("categorydata", data)
                setCategory(data)

                setCategoryLoading(false)
            } catch (error) {
                setCategoryLoading(false)
                console.log(error)
            }
        }

        fetchdata()
    }, [day]);

    useEffect(() => {
        const fetchdata = async () => {
            setUpcomingEventsLoading(true)
            console.log("this is date passing", date)
            try {
                const { data } = await ClientUpcomingEvents(date)
                console.log("upcoming events", data.data)
                setUpcomingEvents(data)
                setUpcomingEventsLoading(false)
            } catch (error) {
                setUpcomingEventsLoading(false)
                console.log(error)
            }
        }
        fetchdata()
    }, [date]);


    // console.log("highlightesd date", highlightedDates)

    useEffect(() => {
        const fetchdata = async () => {
            try {
                const { data } = await ClientGetOffers()
                setOffers(data)
            } catch (error) {
                console.log(error)
            }
        }
        fetchdata()
    }, []);

    useEffect(() => {
        const fetchdata = async () => {
            setEditorpickLoading(true)
            try {
                const { data } = await getCategoryEvents("editorspick")
                // console.log(data.data)
                setEditorpick(data)
                setEditorpickLoading(false)
            } catch (error) {
                console.log(error)
                setEditorpickLoading(false)
            }
        }

        fetchdata()
    }, []);


    const [query, setQuery] = useState('')



    let highlightedDates = []; // Dates to highlight
    if (upcomingEvents.data != null) {
        for (const event of upcomingEvents.data) {
            if (event.date && event.date.dateRange && event.date.dateRange.startDate && event.date.dateRange.endDate) {
                const startDate = moment(event.date.dateRange.startDate);
                const endDate = moment(event.date.dateRange.endDate);

                // Generate dates within the range and push them to the highlightedDates array
                while (startDate.isSameOrBefore(endDate)) {
                    highlightedDates.push(new Date(startDate.format('YYYY-MM-DD')));
                    startDate.add(1, 'days');
                }
            }
        }
    }


    console.log(highlightedDates)
    return (
        <>
            <div className='appmargine'>
                <Navbar />
                <div
                    class="NoHeader bg-center bg-no-repeat bg-cover bg-[url('https://res.cloudinary.com/mayurs-media/image/upload/v1692687464/bgHome_byrjjp.jpg')]">
                    <header className='p-5 md:p-10 '>

                        <div className='hidden md:block'>
                            <button
                                ref={followButtonRef}
                                onClick={() => setShowLinks(!showLinks)}
                                className='absolute top-96 right-0 text-white bg-[#C0A04C] text-sm font-semibold py-2 pl-7 pr-6 rounded-l-full'>
                                Follow Us
                            </button>
                            {showLinks
                                ?
                                <div
                                    className='top-96 right-0 absolute  px-3 bg-white rounded-l-full flex space-x-2 py-2'>
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

                        <div className="">
                            <div
                                className={` bottom-0 transition ease-in-out  duration-75 ${isVisible ? 'translate-y-0 opacity-100 duration-75' : 'translate-y-4 opacity-0 duration-75'
                                    }`}
                            >
                                <div className='flex justify-center md: pt-0 md:p-10'>
                                    <p className='pb-5 leading-loose text-4xl md:text-4xl text-center text-white font-bold'>
                                        <span>Find the</span>
                                        <br className='block md:hidden' />
                                        <span>perfect</span>
                                        <br className='block md:hidden' />

                                        <span>experience</span>


                                        <div className='md:hidden absolute top-0 right-0'>
                                            <img className='h-12' src="/images/assets/download-banner.png" alt="" />
                                        </div>



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
                                                                type="search" id="location-search" class="bg-[#E7E7E7] block p-2.5 w-72 z-20 text-xs text-gray-500 font-normal rounded-r-lg rounded-l-lg border-l-gray-50 border-l-2 border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-l-gray-700  dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500" placeholder="Search for anything on muscat" required />

                                                            <button onClick={(() => navigate(`/Category/events?search=${query}`))} type="button" class="absolute top-0 right-0 h-full p-2.5 text-sm font-medium text-white bg-[#C0A04C] rounded-r-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                                                <img className='h-5' src="/images/icons/home-search.svg" alt="" />
                                                                <span class="sr-only">Search</span>
                                                            </button>
                                                        </div>
                                                    </div>
                                                </form>


                                            </div>
                                        </div>

                                        <span className=''>in</span>
                                        <br className='md:block hidden' />
                                        <span> any </span>
                                        <br className='block md:hidden' />

                                        <span>destination</span>
                                    </p>
                                </div>



                                <div className='hidden md:flex items-center justify-center '>
                                    <div className='bg-white border-2 w-11/12 md:w-2/3 flex items-center justify-center flex-col p-3 rounded-lg'>
                                        <div>
                                            <span className='text-xl font-bold'>
                                                Where To ?
                                            </span>
                                        </div>
                                        <div className='flex w-full justify-center'>
                                            <div className='w-full flex grow '>
                                                <input onChange={((e) => setQuery(e.target.value))} type="text" id="default-input" placeholder='Search by destination, experience, Food & wine, Live Events, Attractions, e.g. ' class="bg-[#E7E7E7] border border-gray-300 text-gray-900 text-xs rounded-lg block md:w-10/12 p-3 mx-3 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                                            </div>

                                            <div className='flex mx-auto justify-center'>
                                                <button onClick={(() => navigate(`/Category/events?search=${query}`))} type="button" class="shadow-lg shadow-cyan-500/25 align-middle text-white bg-[#C0A04C] hover:bg-[#A48533] hover:text-white focus:ring-4 focus:outline-none border focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center mr-3 md:mr-0 dark:bg-[#C0A04C] dark:hover:bg-white dark:focus:ring-blue-800">Search</button>
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
                                                            <button className='rounded-full border border-black pr-4 pl-4 h-6 text-xs hover:bg-black hover:text-white'>staycation</button>
                                                        </Link>
                                                        <Link className='my-1' to='/category/events'>
                                                            <button className='rounded-full border border-black pr-4 pl-4 h-6 text-xs hover:bg-black hover:text-white'>friday bunch</button>
                                                        </Link>
                                                        <Link className='my-1' to='/category/thingstodo'>
                                                            <button className='rounded-full border border-black pr-4 pl-4 h-6 text-xs hover:bg-black hover:text-white'>Things to do</button>
                                                        </Link>
                                                        <Link className='my-1' to='/category/kidscorner'>
                                                            <button className='rounded-full border border-black pr-4 pl-4 h-6 text-xs hover:bg-black hover:text-white'>kids corner</button>
                                                        </Link>
                                                        <Link className='my-1' to='/category/weeklyoffers'>
                                                            <button className='rounded-full border border-black pr-4 pl-4 h-6 text-xs hover:bg-black hover:text-white'>Weekly Offers</button>
                                                        </Link>
                                                        <Link className='my-1' to='/category/ladiesnight'>
                                                            <button className='rounded-full border border-black pr-4 pl-4 h-6 text-xs hover:bg-black hover:text-white'>Ladies Night</button>
                                                        </Link>
                                                        <Link className='my-1' to='/category/editorspick'>
                                                            <button className='rounded-full border border-black pr-4 pl-4 h-6 text-xs hover:bg-black hover:text-white'>Editor's Pick</button>
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

                <div className='flex justify-center items-center align-middle mt-5'>
                    <section className='w-full md:w-full sm:mx-5 md:mx-5 md:w-10/12 xl:w-9/12 2xl:w-7/12'>
                        <div className='flex justify-between align-middle '>

                            <div className="left flex items-center align-middle ">
                                <span className='text-xl font-bold md:text-2xl md:font-[700]'>Popular Category</span></div>

                            <div className="hidden right lg:flex flex-wrap space-x-2">
                                {
                                    daysAndDates.map((e) => (
                                        <button
                                            onClick={() => setDayforCategory(e.date)} className='md:block hover:bg-black hover:text-white rounded-full border-black px-3 py-1 text-xs border'>{e.day}</button>
                                    ))
                                }

                                <div className='selectoption pr-2 md:hidden'>
                                    <select
                                        id="countries"
                                        className="bg-black border border-gray-300 text-white text-sm rounded-full focus:ring-blue-500 focus:border-blue-500 block w-full p-1.5 px-3.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    >
                                        {daysAndDates.map((e) => (
                                            <option
                                                key={e.date} // Make sure to add a unique key prop when mapping in React
                                                onClick={() => setDayforCategory(e.date)}
                                                className="hover:bg-black hover:text-white rounded-full border-black px-3 py-1 text-xs border"
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
                                            <div className='h-60 flex space-x-3'>
                                                <CategorySkeleton />
                                                <CategorySkeleton />                                            </div>
                                        </>
                                        :
                                        categoryLoading
                                            ?
                                            <>
                                                <div className='h-60 flex space-x-3'>
                                                    <CategorySkeleton />
                                                    <CategorySkeleton />
                                                </div>
                                            </>
                                            :
                                            category.data.length === 0
                                                ?
                                                <>
                                                    <div className='flex justify-center'>
                                                        <img className='h-60' src="/images/assets/nothing.png" alt="" />
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
                                    <Link to="/category/events">
                                        <p className='text-gray-400 font-medium underline underline-offset-1 text-sm pr-2 '>view all</p>
                                    </Link>
                                </div>

                            </div>

                        </div>
                    </section>
                </div>

                <section className='flex justify-center items-center align-middle mt-5'>
                    <section className='w-full md:w-full sm:mx-5 md:mx-5 md:w-10/12 xl:w-9/12 2xl:w-7/12'>
                        <div className='flex justify-between items-center '>
                            <div className="left"><span className='text-xl font-bold md:text-2xl md:font-[700]'>Upcoming Events</span></div>
                            <div className="flex items-center align-middle ">
                                <div onClick={(() => setShowCalender(true))} className="calender date-picker ">
                                    <img className="calender h-8 mr-2" src="/images/assets/calender-icon.png" alt="" />
                                </div>
                                {
                                    showCalender && (
                                        <div >
                                            <div ref={calendarRef}>
                                                <div className='calendar-overlay'>
                                                    <div>
                                                        <div className='absolute top-0 right-0' >cancel</div>
                                                        <Calendar
                                                            className='relative z-50 w-80 rounded-lg
                     border-none drop-shadow-md text-xs'
                                                            value={date}
                                                            onChange={handleDateChange}
                                                            tileContent={({ date, view }) =>
                                                                view === 'month' && highlightedDates.some((highlightedDate) =>
                                                                    highlightedDate.getDate() === date.getDate() &&
                                                                    highlightedDate.getMonth() === date.getMonth() &&
                                                                    highlightedDate.getFullYear() === date.getFullYear()
                                                                ) ? (
                                                                    <div className="highlighted-date">
                                                                        <img className='animate-ping flex h-1.5' src="/images/icons/dot.png" alt="" />
                                                                    </div>
                                                                ) : null
                                                            }
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                    )
                                }
                                <div>
                                    <div className='hidden md:block flex space-x-1'>
                                        {next7Days.map((item) => (
                                            <button onClick={() => setnewfilterdate(item.actualdate)} className='hover:bg-black hover:text-white rounded-sm border-black pl-1 pr-1 text-xs border'>
                                                <div className='flex flex-col'>
                                                    <p>
                                                        {item.day}
                                                    </p>
                                                    <p className='font-semibold'>
                                                        {item.date}
                                                    </p>
                                                </div>
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                <div className='block md:hidden'>
                                    <button className='hover:bg-black hover:text-white rounded-sm border-black pl-1 pr-1 text-xs border mr-2'>
                                        <div className='flex flex-col'>
                                            <p>
                                                {next7Days[0].day}
                                            </p>
                                            <p>
                                                {next7Days[0].date}
                                            </p>
                                        </div>
                                    </button>
                                </div>

                            </div>

                        </div>

                        <div>
                            <div className='md:flex md:justify-start carousel p-4 flex items-center justify-start overflow-x-auto scroll-smooth  scrollbar-hide mt-5 space-x-3 md:space-x-6'>
                                {
                                    upcomingEvents.data == null || upcomingEvents.data == undefined
                                        ?
                                        <div className='h-30'>
                                            <SkeletonCard />
                                        </div>
                                        :
                                        upcomingEventsLoading
                                            ?
                                            <>
                                                <div className='h-30'>
                                                    <SkeletonCard />
                                                </div>
                                            </>
                                            : upcomingEvents.data.length === 0
                                                ?
                                                <div className='flex justify-center'>
                                                    <img className='h-60' src="/images/assets/nothing.png" alt="" />
                                                </div>
                                                :
                                                upcomingEvents.data.map((event) => (
                                                    <UpcomingEventsCard event={event} />
                                                ))
                                }
                            </div>

                        </div>

                        <div className='flex justify-end space-x-2 '>
                            <Link to="/category/events">
                                <p className='underline underline-offset-1 text-sm pr-2 '>view all</p>
                            </Link>
                        </div>
                    </section>
                </section>

                {
                    editorpick.data == null || editorpick.data == undefined
                        ?
                        <>loading..</>
                        :
                        editorpickLoading
                            ?
                            <section className='flex justify-center items-center align-middle mt-5'>
                                <section className='w-full md:w-full sm:mx-5 md:mx-5 md:w-10/12 xl:w-9/12 2xl:w-7/12'>
                                    <div className='flex justify-between '>
                                        <div className="left"><span className='text-xl font-bold md:text-2xl md:font-[700]'>Editors Pick</span></div>
                                        <div className="right"></div>
                                    </div>

                                    <div>
                                        <div className='md:flex md:justify-start carousel p-4 flex items-center justify-start overflow-x-auto scroll-smooth  scrollbar-hide space-x-3'>
                                            <>
                                                <div className='h-30'>
                                                    <SkeletonCard />
                                                </div>
                                            </>
                                        </div>

                                    </div>
                                    <div className='flex justify-end space-x-2 '>
                                        <Link to="/category/editorspick">
                                            <p className='underline underline-offset-1 text-sm pr-2 '>view all</p>
                                        </Link>
                                    </div>
                                </section>
                            </section>
                            :
                            editorpick.data.length === 0
                                ?
                                <>
                                </>
                                :
                                <section className='flex justify-center items-center align-middle mt-5'>
                                    <section className='w-full md:w-full sm:mx-5 md:mx-5 md:w-10/12 xl:w-9/12 2xl:w-7/12'>
                                        <div className='flex justify-between '>
                                            <div className="left"><span className='text-xl font-bold md:text-2xl md:font-[700]'>Editors Pick</span></div>
                                            <div className="right"></div>
                                        </div>

                                        <div>
                                            <div className='md:flex md:justify-start carousel p-4 flex items-center justify-start overflow-x-auto scroll-smooth  scrollbar-hide space-x-3'>
                                                {editorpickLoading
                                                    ?
                                                    <>
                                                        <div className='h-30'>
                                                            <SkeletonCard />
                                                        </div>
                                                    </>
                                                    : editorpick.data.length === 0
                                                        ?
                                                        <div className='flex justify-center'>
                                                            <img className='h-60' src="/images/assets/nothing.png" alt="" />
                                                        </div>
                                                        :
                                                        editorpick.data.map((event) => (
                                                            <Link to={`/events/${event._id}`}>
                                                                <EventCard data={event} />
                                                            </Link>
                                                        ))
                                                }
                                            </div>

                                        </div>
                                        <div className='flex justify-end space-x-2 '>
                                            <Link to="/category/editorspick">
                                                <p className='underline underline-offset-1 text-sm pr-2 '>view all</p>
                                            </Link>
                                        </div>
                                    </section>
                                </section>
                }


                <section className='flex justify-center items-center align-middle mt-5'>
                    <section className='w-full md:w-full sm:mx-5 md:mx-5 md:w-10/12 xl:w-9/12 2xl:w-7/12'>
                        <div className='flex justify-between '>
                            <div className="left"><span className='text-xl font-bold md:text-2xl md:font-[700]'>Offers</span></div>
                            <div className="right"></div>

                        </div>

                        <div className="ml-1 mr-1">
                            <div className='md:flex md:justify-start carousel snap-x p-4 flex items-center justify-start overflow-x-auto scroll-smooth  scrollbar-hide space-x-3 md:space-x-10'>
                                {
                                    offers.data == undefined || offers.data == null
                                        ?
                                        <>
                                            loading..
                                        </>
                                        :
                                        offers.data.map((offer) => (
                                            <Link key={offer._id} to={`events/${offer._id}`}>
                                                <img className='rounded-md h-64 w-52' src={`${offer.displayPhoto}`} alt="" />
                                            </Link>
                                        ))
                                }
                            </div>
                            <div className='flex justify-end space-x-2 '>
                                <Link to='/category/offers'>
                                    <p className='underline underline-offset-1 text-sm pr-2 '>view all</p>
                                </Link>
                            </div>
                        </div>
                    </section>
                </section>

                <section className='relative flex justify-center items-center align-middle mt-5'>
                    <section className='w-full mx-5 md:mx-0 md:w-full sm:mx-5 md:mx-5 md:w-10/12 xl:w-9/12 2xl:w-7/12'>
                        <p className='ml-6 md:ml-0 text-xl font-bold md:text-2xl md:font-[700]  '>
                            Where to ?
                        </p>

                        <div className='grid md:grid-cols-3 gap-3 p-3'>
                            <div className='grid md:grid-cols-1 grid-rows-2 gap-3'>
                                <Link to='/category/events'>
                                    <div className='relative'>
                                        <img className='h-60 w-full bg-gray-400 bg-blend-multiply hover:bg-grey-500 grayscale-10' src='/images/assets/banner-events.jpeg' alt='' />
                                        <div className="rounded absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black opacity-50 group-hover:opacity-0 rounded-lg"></div>
                                        <span className='absolute bottom-0 left-0 text-white p-2 font-bold'>Events</span>
                                    </div>
                                </Link>
                                <Link to='/category/weeklyoffers'>
                                    <div className='relative'>
                                        <img className='h-60 w-full bg-gray-400 bg-blend-multiply hover:bg-grey-500 grayscale-10' src='/images/assets/banner-weeklyoffers.jpeg' alt='' />
                                        <div className="rounded absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black opacity-50 group-hover:opacity-0 rounded-lg"></div>
                                        <span className='absolute bottom-0 left-0 text-white p-2 font-bold'>Weekly Offers</span>
                                    </div>
                                </Link>
                            </div>

                            <div className='grid md:grid-cols-1 grid-rows-2 gap-3'>
                                <Link to='/category/eat'>
                                    <div className='relative'>
                                        <img className='h-60 w-full bg-gray-400 bg-blend-multiply hover:bg-grey-500 grayscale-20' src='/images/assets/banner-eat.jpeg' alt='' />
                                        <div className="rounded absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black opacity-50 group-hover:opacity-0 rounded-lg"></div>
                                        <span className='absolute bottom-0 left-0 text-white p-2 font-bold'>Eat and drinks</span>
                                    </div>
                                </Link>
                                <Link to='/category/poolandbeach'>
                                    <div className='relative'>
                                        <img className='h-60 w-full bg-gray-400 bg-blend-multiply hover:bg-grey-500' src='/images/assets/banner-poolandbeach.jpg' alt='' />
                                        <div className="rounded absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black opacity-50 group-hover:opacity-0 rounded-lg"></div>
                                        <span className='absolute bottom-0 left-0 text-white p-2 font-bold'>Pool & Beach</span>
                                    </div>
                                </Link>
                            </div>

                            <div className='grid md:grid-cols-1 grid-rows-2 gap-3'>
                                <Link to='/category/ladiesnight'>
                                    <div className='relative'>
                                        <img className='h-60 w-full bg-gray-400 bg-blend-multiply hover:bg-grey-500' src='/images/assets/banner-ladiesnight.jpeg' alt='' />
                                        <div className="rounded absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black opacity-50 group-hover:opacity-0 rounded-lg"></div>
                                        <span className='absolute bottom-0 left-0 text-white p-2 font-bold'>Ladies Night</span>
                                    </div>
                                </Link>
                                <Link to='/category/thingstodo'>
                                    <div className='relative'>
                                        <img className='h-60 w-full bg-gray-400 bg-blend-multiply hover:bg-grey-500' src='/images/assets/banner-thingstodo.jpeg' alt='' />
                                        <div className="rounded absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black opacity-50 group-hover:opacity-0 rounded-lg"></div>
                                        <span className='absolute bottom-0 left-0 text-white p-2 font-bold'>Things to do</span>
                                    </div>
                                </Link>
                            </div>
                        </div>

                        <Link to='/category/events'>
                            <div className='flex justify-end space-x-2 '>
                                <p className='underline underline-offset-1 text-sm pr-2 '>view all</p>
                            </div>
                        </Link>
                    </section>
                    <div className='hidden lg:flex justify-end flex-col absolute right-5 bottom-10'>
                        <div className='flex justify-between mb-2'>
                            <button onClick={() => window.scrollTo({
                                top: 0,
                                behavior: 'smooth', // You can use 'auto' for instant scrolling
                            })} className='rounded-full p-2 hover:bg-[#A48533] bg-[#C0A04C]'>
                                <img className='h-6 ' src="/images/icons/uparrow.svg" alt="" />
                            </button>

                            <button>
                            </button>
                        </div>
                        <button className='rounded-full hover:bg-[#A48533] bg-[#C0A04C] py-3 pr-6 pl-6 text-white font-semibold'>Need Help?</button>
                    </div>
                </section >


                <Footer />
            </div >
            <div>
                <BottomNav />
            </div>
        </>
    )

}

export default Home