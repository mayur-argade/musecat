import React from 'react'
import Footer from '../../components/shared/Footer/Footer'
import Navbar from '../../components/shared/Navbar/Navbar'
import { Link } from 'react-router-dom'

const Home = () => {

    document.title = 'Home'

    const scrollLeft = () => {
        document.getElementById("content").scrollLeft -= 400;
    }
    const scrollRight = () => {
        document.getElementById("content").scrollLeft += 400;
    }

    return (

        <div className=''>
            <Navbar />
            <div class="bg-center bg-no-repeat bg-cover bg-[url('https://res.cloudinary.com/mayurs-media/image/upload/v1692687464/bgHome_byrjjp.jpg')]">
                <header className='p-5 md:p-10 '>

                    <div className='flex justify-center md: pt-0 md:p-10'>
                        <p className='pb-5 leading-loose text-5xl md:text-4xl text-center text-white font-bold'>
                            Find the perfect experience in
                            <br className='' />
                            <br />

<div className='md:hidden absolute top-16 right-3'>
    <img className='h-12' src="/images/assets/download-banner.png" alt="" />
</div>

                            <div className='hidden md:block absolute top-96 right-0'>
                                <button className='text-white bg-[#C0A04C] text-sm font-semibold py-2 pl-7 pr-6 rounded-l-full'>
                                    Follow Us
                                </button>
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
                                                    <svg class="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                                                    </svg>
                                                    <span class="sr-only">Search</span>
                                                </button>
                                            </div>
                                        </div>
                                    </form>


                                </div>
                            </div>

                            any destination
                        </p>
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

                                    <div className='hidden md:flex flex-wrap justify-between space-y-2 md:space-x-44'>
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
                            <span className='text-2xl font-[700]'>Popular Category</span></div>

                        <div className="right md:flex flex-wrap space-x-2">
                            <button className='hidden md:block hover:bg-black hover:text-white rounded-full border-black pl-5 pr-5 text-xs border'>Sunday</button>
                            <button className='hidden md:block hover:bg-black hover:text-white rounded-full border-black pl-5 pr-5 text-xs border'>Monday</button>
                            <button className='hidden md:block hover:bg-black hover:text-white rounded-full border-black pl-5 pr-5 text-xs border'>Tuesday</button>
                            <button className='hidden md:block hover:bg-black hover:text-white rounded-full border-black pl-5 pr-5 text-xs border'>Thursday</button>
                            <button className='hidden md:block hover:bg-black hover:text-white rounded-full border-black pl-5 pr-5 text-xs border'>Friday</button>
                            <button className='hidden md:block hover:bg-black hover:text-white rounded-full border-black pl-5 pr-5 text-xs border'>Saturday</button>

                            <div className='pr-2'>
                                <select id="countries" class="md:hidden bg-black border border-gray-300 text-white text-sm rounded-full focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                    <option selected>Select Day</option>
                                    <option value="US">Sunday</option>
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
                        <div id="content" className=' carousel p-4 flex items-center justify-start overflow-x-auto scroll-smooth md:scrollbar-hide  space-x-5'>
                            <Link to='/category/staycation'>
                                <div>
                                    <div className="mb-2 rounded-lg bg-center bg-no-repeat w-56 relative h-72 max-h-72 bg-[url('https://res.cloudinary.com/mayurs-media/image/upload/v1692690811/1.1_pumpaw.png')] bg-gray-400 bg-blend-multiply">
                                        <div className='absolute bottom-0 left-0 flex flex-col p-2'>
                                            <p className='text-xl text-white font-medium'>Staycation</p>
                                            <button className='bg-white w-28 text-black rounded-md text-sm py-1.5 pl-1 pr-1 font-semibold'>
                                                13 offers
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </Link>

                            <Link to='/category/events'>
                                <div>
                                    <div className="mb-2 rounded-lg bg-center bg-no-repeat w-56 relative h-72 max-h-72 bg-[url('https://res.cloudinary.com/mayurs-media/image/upload/v1692690810/1.2_n802iw.png')]  bg-gray-400 bg-blend-multiply">
                                        <div className='absolute bottom-0 left-0 flex flex-col p-2'>
                                            <p className='text-xl text-white font-medium'>Friday Brunch</p>
                                            <button className='bg-white w-28 text-black rounded-md text-sm py-1.5 pl-1 pr-1 font-semibold'>
                                                13 offers
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </Link>



                            <Link to="/category/thingstodo">
                                <div>
                                    <div className="mb-2 rounded-lg bg-center bg-no-repeat w-56 relative h-72 max-h-72 bg-[url('https://res.cloudinary.com/mayurs-media/image/upload/v1692692203/mwt/e3_tquumk.jpg')]  bg-gray-300 bg-blend-multiply">
                                        <div className='absolute bottom-0 left-0 flex flex-col p-2'>
                                            <p className='text-xl text-white font-medium'>Things to Do</p>
                                            <button className='bg-white w-28 text-black rounded-md text-sm py-1.5 pl-1 pr-1 font-semibold'>
                                                13 offers
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </Link>


                            <Link to='/category/events'>
                                <div>
                                    <div className="mb-2 rounded-lg bg-center bg-no-repeat w-56 relative h-72 max-h-72 bg-[url('https://res.cloudinary.com/mayurs-media/image/upload/v1692696310/IMAGE_qmootq.jpg')]  bg-gray-300 bg-blend-multiply">
                                        <div className='absolute bottom-0 left-0 flex flex-col p-2'>
                                            <p className='text-xl text-white font-medium'>Events</p>
                                            <button className='bg-white w-28 text-black rounded-md text-sm py-1.5 pl-1 pr-1 font-semibold'>
                                                13 offers
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </Link>

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
                        <div className="left"><span className='text-xl font-bold'>Upcoming Events</span></div>
                        <div className="flex items-center align-middle ">
                            <div>
                                <img className="h-8 mr-2" src="/images/assets/calender-icon.png" alt="" />
                            </div>

                            <div className='hidden md:block flex space-x-1'>
                                <button className='hover:bg-black hover:text-white rounded-sm border-black pl-1 pr-1 text-xs border'>
                                    <div className='flex flex-col'>
                                        <p>
                                            Mon
                                        </p>
                                        <p>
                                            31 JUL
                                        </p>
                                    </div>
                                </button>

                                <button className='hover:bg-black hover:text-white rounded-sm border-black pl-2 pr-2 text-xs border'>
                                    <div className='flex flex-col'>
                                        <p>
                                            Tue
                                        </p>
                                        <p>
                                            1 AUG
                                        </p>
                                    </div>
                                </button>

                                <button className='hover:bg-black hover:text-white rounded-sm border-black pl-1 pr-1 text-xs border'>
                                    <div className='flex flex-col'>
                                        <p>
                                            Wed
                                        </p>
                                        <p>
                                            2 AUG
                                        </p>
                                    </div>
                                </button>

                                <button className='hover:bg-black hover:text-white rounded-sm border-black pl-1 pr-1 text-xs border'>
                                    <div className='flex flex-col'>
                                        <p>
                                            THU
                                        </p>
                                        <p>
                                            3 AUG
                                        </p>
                                    </div>
                                </button>

                                <button className='hover:bg-black hover:text-white rounded-sm border-black pl-1 pr-1 text-xs border'>
                                    <div className='flex flex-col'>
                                        <p>
                                            FRI
                                        </p>
                                        <p>
                                            4 AUG
                                        </p>
                                    </div>
                                </button>

                                <button className='hover:bg-black hover:text-white rounded-sm border-black pl-1 pr-1 text-xs border'>
                                    <div className='flex flex-col'>
                                        <p>
                                            Sat
                                        </p>
                                        <p>
                                            5 AUG
                                        </p>
                                    </div>
                                </button>

                                <button className='hover:bg-black hover:text-white rounded-sm border-black pl-1 pr-1 text-xs border'>
                                    <div className='flex flex-col'>
                                        <p>
                                            SUN
                                        </p>
                                        <p>
                                            6 AUG
                                        </p>
                                    </div>
                                </button>

                            </div>

                            <div className='block md:hidden'>
                            <button className='hover:bg-black hover:text-white rounded-sm border-black pl-1 pr-1 text-xs border mr-2'>
                                    <div className='flex flex-col'>
                                        <p>
                                            SUN
                                        </p>
                                        <p>
                                            6 AUG
                                        </p>
                                    </div>
                                </button>
                            </div>

                        </div>

                    </div>

                    <div>
                        <div className='md:flex md:justify-between carousel p-4 flex items-center justify-start overflow-x-auto scroll-smooth  scrollbar-hide mt-5 space-x-3 md:space-x-0'>

                            <Link to='/events/eventid'>
                                <div >
                                    <div className="relative rounded-2xl w-72 mt-10 mb-2 w-60 h-96 max-h-96 bg-[#F3F3F3] top-0">

                                        <div className='absolute bottom-0 left-0 flex flex-col '>
                                            <img className="relative" src="/images/assets/2.png" alt="" />
                                            <button className="absolute top-2 right-2 bg-white text-black rounded-full z-20 p-2">
                                                <img src="/images/icons/heart.svg" alt="" />
                                            </button>
                                            <div className='flex flex-col p-2'>
                                                <p className='text-sm mt-2 font-medium'>WEMA Weekend at The Vault,</p>
                                                <p className='text-sm mt-2 font-medium'> Radisson Call</p>
                                                <p className="mt-1 mb-1 text-xs font-light">Events</p>
                                                <div className='flex items-center justify-between space-x-2'>
                                                    <button type="button" className="text-white hover:bg-[#A48533]
bg-[#C0A04C] hover:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center mr-3 md:mr-0 dark:bg-[#C0A04C] dark:hover:bg-white dark:focus:ring-blue-800 w-full">Book Now</button>
                                                    <button type="button" className="text-white bg-[#C0A04C] hover:bg-[#A48533] hover:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center mr-3 md:mr-0 dark:bg-[#C0A04C] dark:hover:bg-white dark:focus:ring-blue-800 w-full">Contact us</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Link>

                            <Link to='/events/eventid'>
                                <div>
                                    <div className="rounded-2xl w-72 mt-10  mb-2 rounded-lg w-60 relative h-96 max-h-96 bg-[#F3F3F3]">
                                        <div className='absolute bottom-0 left-0 flex flex-col '>
                                            <img className='relative' src="/images/assets/3.png" alt="" />
                                            <button className="absolute top-2 right-2 bg-white text-black rounded-full z-20 p-2">
                                                <img src="/images/icons/heart.svg" alt="" />
                                            </button>
                                            <div className='flex flex-col p-2'>
                                                <p className='text-sm mt-2 font-medium'>WEMA Weekend at The Vault,</p>
                                                <p className='text-sm mt-2 font-medium'> Radisson Call</p>
                                                <p className="mt-1 mb-1 text-xs font-light">Events</p>
                                                <div className='flex items-center justify-between space-x-2'>
                                                    <button type="button" className="text-white hover:bg-[#A48533]
bg-[#C0A04C] hover:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center mr-3 md:mr-0 dark:bg-[#C0A04C] dark:hover:bg-white dark:focus:ring-blue-800 w-full">Book Now</button>
                                                    <button type="button" className="text-white bg-[#C0A04C] hover:bg-[#A48533] hover:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center mr-3 md:mr-0 dark:bg-[#C0A04C] dark:hover:bg-white dark:focus:ring-blue-800 w-full">Contact us</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Link>

                            <Link to='/events/eventid'>
                                <div>
                                    <div className="rounded-2xl w-72 mt-10  mb-2 rounded-lg w-60 relative h-96 max-h-96 bg-[#F3F3F3]">
                                        <div className='absolute bottom-0 left-0 flex flex-col '>
                                            <img className='relative' src="/images/assets/1.png" alt="" />
                                            <button className="absolute top-2 right-2 bg-white text-black rounded-full z-20 p-2">
                                                <img src="/images/icons/heart.svg" alt="" />
                                            </button>
                                            <div className='flex flex-col p-2'>
                                                <p className='text-sm mt-2 font-medium'>WEMA Weekend at The Vault,</p>
                                                <p className='text-sm mt-2 font-medium'> Radisson Call</p>
                                                <p className="mt-1 mb-1 text-xs font-light">Events</p>
                                                <div className='flex items-center justify-between space-x-2'>
                                                    <button type="button" className="text-white hover:bg-[#A48533]
bg-[#C0A04C] hover:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center mr-3 md:mr-0 dark:bg-[#C0A04C] dark:hover:bg-white dark:focus:ring-blue-800 w-full">Book Now</button>
                                                    <button type="button" className="text-white bg-[#C0A04C] hover:bg-[#A48533] hover:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center mr-3 md:mr-0 dark:bg-[#C0A04C] dark:hover:bg-white dark:focus:ring-blue-800 w-full">Contact us</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        </div>

                    </div>

                    <div className='flex justify-end space-x-2 '>
                        <p className='underline underline-offset-1 text-sm pr-2 '>view all</p>
                    </div>
                </section>
            </section>

            <section>
                <section className='md:mr-48 md:ml-48 mt-3'>
                    <div className='flex justify-between '>
                        <div className="left"><span className='text-xl font-bold'>Editors Pick</span></div>
                        <div className="right"></div>
                    </div>

                    <div>
                        <div className='md:flex md:justify-around carousel p-4 flex items-center justify-start overflow-x-auto scroll-smooth  scrollbar-hide space-x-5'>

                            <div>
                                <div className="mb-2 rounded-lg bg-center bg-no-repeat w-52 relative h-64 max-h-80 bg-[url('https://res.cloudinary.com/mayurs-media/image/upload/v1692692203/mwt/e3_tquumk.jpg')]  bg-gray-400 bg-blend-multiply">
                                    <div className='absolute bottom-0 left-0 flex flex-col p-2'>
                                        <span className='text-base text-white font-medium'>Around Musecat</span>
                                    </div>
                                </div>
                            </div>

                            <div>
                                <div className="mb-2 rounded-lg bg-center bg-no-repeat w-52 relative h-64 max-h-80 bg-[url('https://res.cloudinary.com/mayurs-media/image/upload/v1692690811/1.1_pumpaw.png')]  bg-gray-400 bg-blend-multiply">
                                    <div className='absolute bottom-0 left-0 flex flex-col p-2'>
                                        <span className='text-base text-white font-medium'>Food in Muscat</span>
                                    </div>
                                </div>
                            </div>

                            <div>
                                <div className="mb-2 rounded-lg bg-center bg-no-repeat w-52 relative h-64 max-h-80 bg-[url('https://res.cloudinary.com/mayurs-media/image/upload/v1692690810/1.2_n802iw.png')]  bg-gray-400 bg-blend-multiply">
                                    <div className='absolute bottom-0 left-0 flex flex-col p-2'>
                                        <span className='text-base text-white font-medium'>Adventures</span>
                                    </div>
                                </div>
                            </div>

                            <div>
                                <div className="mb-2 rounded-lg bg-center bg-no-repeat w-52 relative h-64 max-h-80 bg-[url('https://res.cloudinary.com/mayurs-media/image/upload/v1692687464/bgHome_byrjjp.jpg')]  bg-gray-400 bg-blend-multiply">
                                    <div className='absolute bottom-0 left-0 flex flex-col p-2'>
                                        <span className='text-base text-white font-medium'>Enjoyment</span>
                                    </div>
                                </div>
                            </div>

                        </div>

                    </div>

                    <div className='flex justify-end space-x-2 '>
                        <p className='underline underline-offset-1 text-sm pr-2 '>view all</p>


                    </div>
                </section>
            </section>

            <section>
                <section className='md:mr-48 md:ml-48 mt-3 ml-3 mr-3'>
                    <div className='flex justify-between '>
                        <div className="left"><span className='text-xl font-bold'>Offers</span></div>
                        <div className="right"></div>

                    </div>

                    <div className="ml-1 mr-1">
                        <div className='md:flex md:justify-around carousel snap-x p-4 flex items-center justify-start overflow-x-auto scroll-smooth  scrollbar-hide space-x-3 md:space-x-5'>
                            <img className='h-64 w-52 snap-start' src="/images/assets/offer1.jpg" alt="" />
                            <img className='h-64 w-52' src="/images/assets/offer2.jpg" alt="" />
                            <img className='h-64 w-52' src="/images/assets/offer3.jpg" alt="" />
                            <img className='h-64 w-52' src="/images/assets/offer4.jpg" alt="" />
                        </div>
                        <div className='flex justify-end space-x-2 '>
                            <p className='underline underline-offset-1 text-sm pr-2 '>view all</p>
                        </div>
                    </div>
                </section>
            </section>

            <section className=' relative '>
                <section className='md:mr-56 md:ml-56 mt-3'>
                    <p className='ml-6 md:ml-0 text-xl font-bold  '>
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
                        <button className='rounded-full p-2 hover:bg-[#A48533] bg-[#C0A04C]'>
                            <img className='h-6 ' src="/images/icons/uparrow.svg" alt="" />
                        </button>
                            <img className='h-10 ml-12' src="/images/icons/whatsapp-color.svg" alt="" />
                        <button>
                        </button>
                    </div>
                    <button className='rounded-full hover:bg-[#A48533] bg-[#C0A04C] py-3 pr-6 pl-6 text-white font-semibold'>Need Help?</button>
                </div>
            </section>



            <Footer />
        </div>
    )
}

export default Home