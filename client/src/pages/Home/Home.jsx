import React from 'react'
import PopularCategory from '../../components/category/PopularCategory'
import UpcomingEvents from '../../components/category/UpcomingEvents'
import EditorsPick from '../../components/category/EditorsPick'
import Offer from '../../components/category/Offer'
import WhereTo from '../../components/category/WhereTo'
import Footer from '../../components/shared/Footer/Footer'
import Navbar from '../../components/shared/Navbar/Navbar'

const Home = () => {
    return (

        <div className=''>
            <Navbar />
            <div class="bg-center bg-no-repeat bg-[url('https://res.cloudinary.com/mayurs-media/image/upload/v1692687464/bgHome_byrjjp.jpg')]">
                <header className='p-5 md:p-10 '>

                    <div className='flex justify-center md: pt-0 md:p-10'>
                        <p className='leading-loose text-5xl text-center text-white font-bold'>
                            Find the perfect experience in
                            <br />

                            <div className=' flex md:hidden items-center justify-center '>
                                <div className='bg-white-600 backdrop-blur-md backdrop-greyscale-2 backdrop-opacity-80 border border-t-white border-l-white rounded-md w-11/12 md:w-2/3 flex items-center justify-center flex-col p-3 rounded-lg'>
                                    <span className='text-xl font-semibold text-white'>
                                        Where To ?
                                    </span>



                                    <form>
                                        <div class="p-3">
                                            <div class="z-10 relative ">
                                                <input type="search" id="location-search" class="block p-2.5 w-72 z-20 text-sm text-gray-900 bg-gray-50 rounded-r-lg rounded-l-lg border-l-gray-50 border-l-2 border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-l-gray-700  dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500" placeholder="Search for anything on muscat" required />
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
                                <span className='text-xl font-semibold'>
                                    Where To ?
                                </span>
                            </div>


                            <input type="text" id="default-input" placeholder='Search by destination, experience, Food & wine, Live Events, Attractions, e.g. ' class="bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-11/12 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />


                            <div className='flex flex-wrap align-middle justify-around mt-5 w-11/12'>
                                <div>
                                    <span className='hidden md:block text-left align-middle'>
                                        Popular Searches
                                    </span>

                                    <div className='hidden md:flex flex-wrap justify-between space-y-2 md:space-x-44'>
                                        <div className='flex md:space-x-2  '>
                                            <button className='rounded-full border border-black pr-2 pl-2 h-8 text-xs hover:bg-black hover:text-white'>staycation</button>
                                            <button className='rounded-full border border-black pr-2 pl-2 h-8 text-xs hover:bg-black hover:text-white'>friday bunch</button>
                                            <button className='rounded-full border border-black pr-2 pl-2 h-8 text-xs hover:bg-black hover:text-white'>Things to do</button>
                                            <button className='rounded-full border border-black pr-2 pl-2 h-8 text-xs hover:bg-black hover:text-white'>kids corner</button>
                                            <button className='rounded-full border border-black pr-2 pl-2 h-8 text-xs hover:bg-black hover:text-white'>Weekly Offers</button>
                                            <button className='rounded-full border border-black pr-2 pl-2 h-8 text-xs hover:bg-black hover:text-white'>Ladies Night</button>

                                        </div>

                                    </div>
                                </div>

                                <button type="button" class="align-middle h-14 text-white bg-[#C0A04C] hover:bg-white hover:text-[#C0A04C] focus:ring-4 focus:outline-none border focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center mr-3 md:mr-0 dark:bg-[#C0A04C] dark:hover:bg-white dark:focus:ring-blue-800">Search</button>

                            </div>

                        </div>
                    </div>

                </header>
            </div>

            <PopularCategory />

            <UpcomingEvents />

            <EditorsPick />

            <Offer />

            <WhereTo />

            <Footer />
        </div>
    )
}

export default Home