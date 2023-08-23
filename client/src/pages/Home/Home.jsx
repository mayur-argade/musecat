import React from 'react'
import PopularCategory from '../../components/category/PopularCategory'
import UpcomingEvents from '../../components/category/UpcomingEvents'
import EditorsPick from '../../components/category/EditorsPick'
import Offer from '../../components/category/Offer'
import WhereTo from '../../components/category/WhereTo'
import Footer from '../../components/shared/Footer/Footer'
const Home = () => {
    return (
        <div className=''>

            <div class="bg-center bg-no-repeat bg-[url('https://res.cloudinary.com/mayurs-media/image/upload/v1692687464/bgHome_byrjjp.jpg')]">
                <header className='space-y-14 p-10'>
                    <div className='flex justify-center mt-20'>
                        <span className='text-6xl text-center text-white font-bold'>
                            Find the perfect experience in <br /> any destination
                        </span>
                    </div>

                    <div className='flex items-center justify-center '>
                        <div className='bg-white border-2 w-3/4 flex items-center justify-center flex-col p-5 rounded-lg'>
                            <div>
                                <span className='text-xl font-semibold'>
                                    Where To ?
                                </span>
                            </div>


                            <input type="text" id="default-input" placeholder='Search by destination, experience, Food & wine, Live Events, Attractions, e.g. ' class="bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-3/4 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />


                            <div className='flex flex-wrap align-middle justify-around mt-5 w-5/6'>
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