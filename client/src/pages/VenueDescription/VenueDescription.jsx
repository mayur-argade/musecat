import React from 'react'
import Navbar from '../../components/shared/Navbar/Navbar'
import EventCard from '../../components/Cards/EventCard'
import TrendingCard from '../../components/Cards/TrendingCard'
import Footer from '../../components/shared/Footer/Footer'
import GoogleMap from '../../components/GoogleMap/GoogleMap'
import Tabbar from '../../components/shared/Tabbar/Tabbar'
const VenueDescription = () => {

    document.title = 'Vendor ~ Venue Description'

    return (
        <>
            <Navbar />
            <Tabbar />

            <section className='md:mr-36 md:ml-36 mt-5 ml-6 mr-6'>
                <div className="hidden md:flex align-middle items-center">
                    <button className="backlogo rounded-full shadow-md shadow-gray-500">
                        <img className='h-6' src="/images/icons/backarrow.svg" alt="" />
                    </button>
                    <span className='text-lg font-bold'>Venue Description</span>
                </div>

                <div className="flex justify-center mt-5 ">
                    <img className='rounded-xl h-40 md:h-80 md:max-h-fit  md:' src="/images/assets/IMAGE.png" alt="" />
                </div>

                <div className='mt-3'>
                    <p className='md:ml-5 font-bold text-lg md:text-2xl'>
                        Crowne Plaza OCEC
                    </p>
                    <div>
                        <nav class="flex md:ml-5" aria-label="Breadcrumb">
                            <ol class="inline-flex items-center space-x-1 md:space-x-3">
                                <li class="inline-flex items-center">
                                    <a href="#" class="inline-flex items-center text-sm font-medium text-gray-700 hover:text-black dark:text-gray-400 dark:hover:text-white">
                                        oran
                                    </a>
                                </li>

                                <li>
                                    <div class="flex items-center">
                                        <svg class="w-3 h-3 text-gray-400 mx-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 9 4-4-4-4" />
                                        </svg>
                                        <a href="#" class="ml-1 text-sm font-medium text-gray-700 md:ml-2 hover:text-black dark:text-gray-400 dark:hover:text-white">Muscat</a>
                                    </div>
                                </li>
                            </ol>
                        </nav>

                    </div>
                </div>



                <div className='md:mt-3 md:grid md:grid-cols-6 gap-8 '>

                    <div className="caursel col-span-4">
                        <div className='mt-3 md:ml-5 mb-2'>
                            <p className='font-bold text-lg md:text-xl'>
                                Upcoming Events at Crowne Plaza
                            </p>
                        </div>
                        <div className="md:flex md:justify-start md:flex-wrap snap-x carousel  pt-0 flex items-center justify-start overflow-x-auto scroll-smooth  scrollbar-hide  ">
                            {/* <div className='snap-start'>
                                < EventCard />
                            </div>
                            <div>
                                < EventCard />
                            </div>
                            <div>
                                < EventCard />
                            </div>
                            <div>
                                < EventCard />
                            </div>
                            <div>
                                < EventCard />
                            </div>
                            <div>
                                < EventCard />
                            </div> */}
                        </div>

                        <div className="md:flex md:justify-center w-full">
                            {/* <div>
                                <button type="button" class="w-full text-white bg-[#C0A04C] hover:bg-white hover:text-[#C0A04C] focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center mr-3 md:mr-0 dark:bg-[#C0A04C] dark:hover:bg-white dark:focus:ring-blue-800">Show more</button>
                            </div> */}
                        </div>
                    </div>

                    <div className='md:flex md:flex-col md:mt-3 mt-3 text-left col-span-2 place-items-start'>
                        <p className='hidden md:block text-left md:font-bold text-lg md:text-xl font-bold text-lg md:mb-5'>Venue Address</p>
                        <p className='md:hidden text-left md:font-bold text-lg md:text-xl font-bold text-lg md:mb-5'>Location</p>
                        <div>
                            <div>
                            <div className='flex justify-center mr-5'>
                                <GoogleMap className={'md:h-80 ml-5 md:ml-0 h-52 w-80 md:w-72 mt-3 md:mr-5'} />
                            </div>
                            </div>
                        </div>

                        <div className="relative hidden md:flex flex-col ">
                            <div className="mt-3 ">
                                <p className="text-xl ml-8 font-bold mt-3">
                                    You may also like
                                </p>
                            </div>
                            <TrendingCard />
                            <TrendingCard />
                            <TrendingCard />

                            <div className='hidden md:flex justify-end flex-col absolute -right-48 bottom-5'>
                        <div className='flex justify-between mb-2'>
                            <button className='rounded-full p-2 hover:bg-[#A48533] bg-[#C0A04C]'>
                            <img className='h-6 ' src="/images/icons/uparrow.svg" alt="" />
                        </button>
                            <img className='h-10 ml-24' src="/images/icons/whatsapp-color.svg" alt="" />
                            <button>
                            </button>
                        </div>
                        <button className='rounded-full hover:bg-[#A48533] bg-[#C0A04C] py-3 pr-6 pl-6 text-white font-semibold'>Need Help?</button>
                    </div>
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

export default VenueDescription