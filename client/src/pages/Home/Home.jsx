import React, { useState, useRef, useEffect } from 'react'
import Footer from '../../components/shared/Footer/Footer'
import Navbar from '../../components/shared/Navbar/Navbar'
import CategoryCard from '../../components/Cards/CategoryCard'
import { Link } from 'react-router-dom'
import { addToFavorites, ClientGetOffers, CategoryCount, ClientUpcomingEvents, getCategoryEvents } from '../../http/index'
import moment from 'moment'
import EventCard from '../../components/Cards/EventCard'
import BottomNav from '../../components/shared/BottomNav/BottomNav'
import toast, { Toaster } from 'react-hot-toast';


const Home = () => {

    document.title = 'Home'

    const scrollLeft = () => {
        document.getElementById("content").scrollLeft -= 400;
    }
    const scrollRight = () => {
        document.getElementById("content").scrollLeft += 400;
    }

    const next7Days = [];
    const currentDate = moment();

    const datePickerRef = useRef(null);

    const openDatePicker = () => {
        if (datePickerRef.current) {
            datePickerRef.current.setOpen(true);
        }
    };

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
    const [date, setDate] = useState('')
    const [showLinks, setShowLinks] = useState(false)
    const [day, SetDay] = useState('')
    const [categoryLoading, setCategoryLoading] = useState(false)
    const [upcomingEventsLoading, setUpcomingEventsLoading] = useState(false)
    const [offersLoading, setOffersLoading] = useState(false)
    const [editorpickLoading, setEditorpickLoading] = useState(false)


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
            try {
                const { data } = await ClientUpcomingEvents(date)
                console.log(data.data)
                setUpcomingEvents(data)
                setUpcomingEventsLoading(false)
            } catch (error) {
                setUpcomingEventsLoading(false)
                console.log(error)
            }
        }
        fetchdata()
    }, [date]);

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

    const favoriteFeature = async (eventid) => {
        // console.log(eventid)
        try {
            const eventdata = {
                eventid: eventid
            }
            const { data } = await addToFavorites(eventdata)
            console.log(data)
            toast.success(data.message)
        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }

    }



    if (category.data == null || offers.data == null || offers.data == undefined) {
        return (<div className='h-screen w-full flex justify-center align-middle items-center'>
            <img src="/images/icons/loadmain.svg" alt="" />
        </div>)
    } else {
        return (
            <>
                <div className='appmargine'>
                    <Navbar />
                    <div
                        class="NoHeader bg-center bg-no-repeat bg-cover bg-[url('https://res.cloudinary.com/mayurs-media/image/upload/v1692687464/bgHome_byrjjp.jpg')]">
                        <header className='p-5 md:p-10 '>

                            <div className='flex justify-center md: pt-0 md:p-10'>
                                <p className='pb-5 leading-loose text-4xl md:text-4xl text-center text-white font-bold'>
                                    <span>Find the</span>
                                    <br className='block md:hidden' />
                                    <span>perfect</span>
                                    <br className='block md:hidden' />

                                    <span>experience</span>


                                    <div className='md:hidden absolute top-16 right-3'>
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
                                                        <input type="search" id="location-search" class="bg-[#E7E7E7] block p-2.5 w-72 z-20 text-xs text-gray-500 font-normal rounded-r-lg rounded-l-lg border-l-gray-50 border-l-2 border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-l-gray-700  dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500" placeholder="Search for anything on muscat" required />
                                                        <button type="submit" class="absolute top-0 right-0 h-full p-2.5 text-sm font-medium text-white bg-[#C0A04C] rounded-r-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
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
                                        <a blank href="https://wa.me/9076102474">
                                            <img className='h-7' src="/images/icons/wp-a.svg" alt="" />
                                        </a>
                                        <a href="">
                                            <img className='h-7' src="/images/icons/fb-a.svg" alt="" />
                                        </a>

                                        <a href="">
                                            <img className='h-7' src="/images/icons/ig-a.svg" alt="" />
                                        </a>
                                        <a href="">
                                            <img className='h-7' src="/images/icons/emal-a.svg" alt="" />
                                        </a>
                                    </div>
                                    :
                                    <>
                                    </>
                                }
                            </div>

                            <div className='hidden md:flex items-center justify-center '>
                                <div className='bg-white border-2 w-11/12 md:w-2/3 flex items-center justify-center flex-col p-3 rounded-lg'>
                                    <div>
                                        <span className='text-xl font-bold'>
                                            Where To ?
                                        </span>
                                    </div>


                                    <input type="text" id="default-input" placeholder='Search by destination, experience, Food & wine, Live Events, Attractions, e.g. ' class="bg-[#E7E7E7] border border-gray-300 text-gray-900 text-xs rounded-lg block w-full p-3 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />


                                    <div className='flex flex-wrap align-middle items-center justify-between mt-5 w-full'>
                                        <div>
                                            <p className='hidden font-bold text-md md:block text-left align-middle mb-1'>
                                                Popular Searches
                                            </p>

                                            <div className='hidden md:flex flex-wrap justify-between space-y-2 md:space-x-52'>
                                                <div className='flex md:space-x-2  '>
                                                    <Link to='/category/staycation'>
                                                        <button className='rounded-full border border-black pr-4 pl-4 h-6 text-xs hover:bg-black hover:text-white'>staycation</button>
                                                    </Link>
                                                    <Link to='/category/events'>
                                                        <button className='rounded-full border border-black pr-4 pl-4 h-6 text-xs hover:bg-black hover:text-white'>friday bunch</button>
                                                    </Link>
                                                    <Link to='/category/thingstodo'>
                                                        <button className='rounded-full border border-black pr-4 pl-4 h-6 text-xs hover:bg-black hover:text-white'>Things to do</button>
                                                    </Link>
                                                    <Link to='/category/kidscorner'>
                                                        <button className='rounded-full border border-black pr-4 pl-4 h-6 text-xs hover:bg-black hover:text-white'>kids corner</button>
                                                    </Link>
                                                    <Link to='/category/weeklyoffers'>
                                                        <button className='rounded-full border border-black pr-4 pl-4 h-6 text-xs hover:bg-black hover:text-white'>Weekly Offers</button>
                                                    </Link>
                                                    <Link to='/category/ladiesnight'>
                                                        <button className='rounded-full border border-black pr-4 pl-4 h-6 text-xs hover:bg-black hover:text-white'>Ladies Night</button>
                                                    </Link>

                                                </div>

                                            </div>
                                        </div>

                                        <button type="button" class="shadow-lg shadow-cyan-500/25 align-middle h-14 w-28 text-white bg-[#C0A04C] hover:bg-[#A48533] hover:text-white focus:ring-4 focus:outline-none border focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center mr-3 md:mr-0 dark:bg-[#C0A04C] dark:hover:bg-white dark:focus:ring-blue-800">Search</button>

                                    </div>

                                </div>
                            </div>

                        </header>
                    </div>

                    <section>
                        <section className='md:mr-48 md:ml-48 mt-10'>
                            <div className='flex justify-between align-middle '>

                                <div className="left flex items-center align-middle ">
                                    <span className='text-xl font-bold md:text-2xl md:font-[700]'>Popular Category</span></div>

                                <div className="right md:flex flex-wrap space-x-2">
                                    {
                                        daysAndDates.map((e) => (
                                            <button
                                                onClick={() => setDayforCategory(e.date)} className='hidden md:block hover:bg-black hover:text-white rounded-full border-black px-3 py-1 text-xs border'>{e.day}</button>
                                        ))
                                    }

                                    <div className='pr-2'>
                                        <select id="countries" class="md:hidden bg-black border border-gray-300 text-white text-sm rounded-full focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 px-3.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                            <option selected value="US">Sunday</option>
                                            <option value="CA">Monday</option>
                                            <option value="FR">Tuesday</option>
                                            <option value="DE">Thursday</option>
                                            <option value="DE">Friday</option>
                                            <option value="DE">Saturday</option>
                                        </select>
                                    </div>

                                </div>
                            </div>

                            <div>
                                <div id="content" className=' carousel p-4 flex items-center justify-start overflow-x-auto scroll-smooth md:scrollbar-hide space-x-5'>
                                    {
                                        categoryLoading
                                            ? "loading"
                                            :
                                            category.data.length === 0
                                                ? "No event listings"
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
                    </section>

                    <section>
                        <section className='md:mr-48 md:ml-48 mt-5'>
                            <div className='flex justify-between items-center '>
                                <div className="left"><span className='text-xl font-bold md:text-2xl md:font-[700]'>Upcoming Events</span></div>
                                <div className="flex items-center align-middle ">
                                    <div className="date-picker ">
                                        <img className=" h-8 mr-2" onClick={openDatePicker} src="/images/assets/calender-icon.png" alt="" />
                                        {/* <DatePicker
                                                selected={date}
                                                className='z-30 opacity-0 absolute top-0 left-0 w-1 h-1'
                                                onChange={() => setnewfilterdate(date)}
                                                dateFormat="dd-mm-yyyy"  // Customize the date format as per your requirement
                                                ref={datePickerRef}
                                            /> */}
                                        {/* <input type="date" name="calender" id="" className='' /> */}
                                    </div>
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
                                    {upcomingEventsLoading
                                        ? "loading"
                                        : upcomingEvents.data.length === 0
                                            ? "No Events for this date"
                                            :
                                            upcomingEvents.data.map((event) => (
                                                <div >
                                                    <div className="relative rounded-2xl w-52 h-85 mx-2  md:w-72 mb-2 md:h-96 max-h-96 bg-[#F3F3F3] top-0 md:mt-5">
                                                        <div className='absolute bottom-0 left-0 flex flex-col rounded-lg'>
                                                            <img className="rounded-lg object-fill rounded-lg h-52 w-52 md:h-72 md:w-72 relative top-0" src={`${event.displayPhoto}`} alt="" />
                                                            <button onClick={() => favoriteFeature(event._id)} className="absolute top-2 right-2 bg-white text-black rounded-full z-20 p-2">
                                                                <img src="/images/icons/heart.svg" alt="" />
                                                            </button>
                                                            <div className='flex flex-col p-2'>
                                                                <p className='text-sm mt-2 font-medium'>{event.title},</p>
                                                                <p className='text-sm mt-2 font-medium'>{event.location}</p>
                                                                <p className="mt-1 mb-1 text-xs font-light">Events</p>
                                                                <div className='flex items-center justify-between space-x-2'>
                                                                    <Link className='button w-full' to={`/events/${event._id}`}>
                                                                        <button type="button" className="text-white hover:bg-[#A48533]
bg-[#C0A04C] hover:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center mr-3 md:mr-0 dark:bg-[#C0A04C] dark:hover:bg-white dark:focus:ring-blue-800 w-full">Book Now</button>
                                                                    </Link>
                                                                    <Link to='/contactus' className='hidden md:block w-full'>
                                                                        <button type="button" className="text-white bg-[#C0A04C] hover:bg-[#A48533] hover:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center mr-3 md:mr-0 dark:bg-[#C0A04C] dark:hover:bg-white dark:focus:ring-blue-800 w-full">Contact us</button>
                                                                    </Link>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
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

                    <section>
                        <section className='md:mr-48 md:ml-48 mt-3'>
                            <div className='flex justify-between '>
                                <div className="left"><span className='text-xl font-bold md:text-2xl md:font-[700]'>Editors Pick</span></div>
                                <div className="right"></div>
                            </div>

                            <div>
                                <div className='md:flex md:justify-start carousel p-4 flex items-center justify-start overflow-x-auto scroll-smooth  scrollbar-hide space-x-3'>
                                    {editorpickLoading
                                        ? "loading"
                                        : editorpick.data.length === 0
                                            ? "No Events available"
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

                    <section>
                        <section className='md:mr-48 md:ml-48 mt-3 ml-3 mr-3'>
                            <div className='flex justify-between '>
                                <div className="left"><span className='text-xl font-bold md:text-2xl md:font-[700]'>Offers</span></div>
                                <div className="right"></div>

                            </div>

                            <div className="ml-1 mr-1">
                                <div className='md:flex md:justify-start carousel snap-x p-4 flex items-center justify-start overflow-x-auto scroll-smooth  scrollbar-hide space-x-3 md:space-x-10'>
                                    {
                                        offers.data.map((offer) => (
                                            <img className='h-64 w-52' src={`${offer.photo}`} alt="" />
                                        ))
                                    }
                                </div>
                                <div className='flex justify-end space-x-2 '>
                                    <p className='underline underline-offset-1 text-sm pr-2 '>view all</p>
                                </div>
                            </div>
                        </section>
                    </section>

                    <section className=' relative '>
                        <section className='md:mr-56 md:ml-56 mt-3'>
                            <p className='ml-6 md:ml-0 text-xl font-bold md:text-2xl md:font-[700]  '>
                                Where to ?
                            </p>

                            <div className='flex md:flex-row flex-col justify-center items-center md:space-x-3'>
                                <div className="flex flex-col md:space-y-7 space-y-3">
                                    <Link to='/category/staycation'>
                                        <div className="relative">
                                            <img className="h-36 w-80 bg-gray-400 bg-blend-multiply hover:bg-grey-500 bg-gray-400 bg-blend-multiply" src="/images/assets/events.jpg" alt="" />
                                            <span className='absolute bottom-0 left-0 text-white p-2 font-bold'>Events</span>
                                        </div>
                                    </Link>
                                    <Link to='/category/weeklyoffers'>
                                        <div className='relative'>
                                            <img className="h-36 w-80 bg-gray-400 bg-blend-multiply hover:bg-grey-500 bg-gray-400 bg-blend-multiply" src="/images/assets/offers.jpg" alt="" />
                                            <span className='absolute bottom-0 left-0 text-white p-2 font-bold'>Weekly Offers</span>
                                        </div>
                                    </Link>


                                </div>

                                <div className="my-3">
                                    <Link to='/category/eat'>
                                        <div className='relative'>
                                            <img className="h-36 w-80 md:w-80 md:h-80 bg-gray-400 bg-blend-multiply hover:bg-grey-500" src="/images/assets/ead.jpg" alt="" />
                                            <span className='absolute bottom-0 left-0 text-white p-2 font-bold'>Eat and drinks</span>
                                        </div>
                                    </Link>
                                </div>

                                <div className="flex flex-col md:space-y-7 space-y-3">
                                    <Link to='/category/ladiesnight'>
                                        <div className='relative'>
                                            <img className="h-36 w-80 bg-gray-400 bg-blend-multiply hover:bg-grey-500 bg-gray-400 bg-blend-multiply" src="/images/assets/lnight.jpg" alt="" />
                                            <span className='absolute bottom-0 left-0 text-white p-2 font-bold'>Ladies Night</span>
                                        </div>
                                    </Link>

                                    <Link to='/category/thingstodo'>
                                        <div className='relative'>
                                            <img className="h-36 w-80 bg-gray-400 bg-blend-multiply hover:bg-grey-500 bg-gray-400 bg-blend-multiply" src="/images/assets/ttd.jpg" alt="" />
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
                        <div className='hidden md:flex justify-end flex-col absolute right-16 bottom-10'>
                            <div className='flex justify-between mb-2'>
                                <button onClick={() => window.scrollTo({
                                    top: 0,
                                    behavior: 'smooth', // You can use 'auto' for instant scrolling
                                })} className='rounded-full p-2 hover:bg-[#A48533] bg-[#C0A04C]'>
                                    <img className='h-6 ' src="/images/icons/uparrow.svg" alt="" />
                                </button>
                                <img className='h-10 ml-12' src="/images/icons/whatsapp-color.svg" alt="" />
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


}

export default Home