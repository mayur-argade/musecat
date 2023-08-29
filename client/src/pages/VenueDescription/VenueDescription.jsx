import React from 'react'
import Navbar from '../../components/shared/Navbar/Navbar'
import EventCard from '../../components/Cards/EventCard'
import SubEventCard from '../../components/Cards/SubEventCard'
import Footer from '../../components/shared/Footer/Footer'
import Tabbar from '../../components/shared/Tabbar/Tabbar'
const VenueDescription = () => {
    return (
        <>
            <Navbar />
            <Tabbar />

            <section className='md:mr-32 md:ml-32 mt-5 ml-6 mr-6'>
                <div className="hidden md:flex align-middle items-center">
                    <button className="backlogo rounded-full shadow-md shadow-gray-500">
                        <img className='h-6' src="/images/icons/backarrow.svg" alt="" />
                    </button>
                    <span className='text-lg font-bold'>Venue Description</span>
                </div>

                <div className="flex justify-center mt-5">
                    <img className='max-h-fit md:' src="/images/assets/IMAGE.png" alt="" />
                </div>

                <div className='mt-3'>
                    <p className='font-bold text-lg md:text-2xl'>
                        Crowne Plaza OCEC
                    </p>
                    <div>
                        <nav class="flex" aria-label="Breadcrumb">
                            <ol class="inline-flex items-center space-x-1 md:space-x-3">
                                <li class="inline-flex items-center">
                                    <a href="#" class="inline-flex items-center text-sm font-medium text-gray-700 hover:text-blue-600 dark:text-gray-400 dark:hover:text-white">
                                        oran
                                    </a>
                                </li>

                                <li>
                                    <div class="flex items-center">
                                        <svg class="w-3 h-3 text-gray-400 mx-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 9 4-4-4-4" />
                                        </svg>
                                        <a href="#" class="ml-1 text-sm font-medium text-gray-700 hover:text-blue-600 md:ml-2 dark:text-gray-400 dark:hover:text-white">Muscat</a>
                                    </div>
                                </li>
                            </ol>
                        </nav>

                    </div>
                </div>



                <div className='md:mt-3 md:grid md:grid-cols-6'>

                    <div className="caursel col-span-4">
                        <div className='mt-3 mb-2'>
                            <p className='font-bold text-lg md:text-xl'>
                                Upcoming Events at Crowne Plaza
                            </p>
                        </div>
                        <div className="md:flex md:justify-start md:flex-wrap snap-x carousel  pt-0 flex items-center justify-start overflow-x-auto scroll-smooth  scrollbar-hide  ">
                            <div className='snap-start'>
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
                            </div>
                        </div>

                        <div className="md:flex md:justify-center w-full">
                            <div>
                            <button type="button" class="w-full text-white bg-[#C0A04C] hover:bg-white hover:text-[#C0A04C] focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center mr-3 md:mr-0 dark:bg-[#C0A04C] dark:hover:bg-white dark:focus:ring-blue-800">Show more</button>
                            </div>
                        </div>
                    </div>

                    <div className='md:flex md:flex-col md:mt-3 mt-3 text-left col-span-2'>
                        <p className='md:font-bold text-lg md:text-xl font-bold text-lg md:mb-5'>Location</p>
                        <div>
                            <div>
                                <div className="right rounded-sm">
                                    <iframe
                                        className="rounded-xl max-h-60 max-w-xs md:w-screen"
                                        width="920"
                                        height="386"
                                        frameborder="0"
                                        scrolling="no"
                                        marginheight="0"
                                        marginwidth="0"
                                        id="gmap_canvas"
                                        src="https://maps.google.com/maps?width=520&amp;height=386&amp;hl=en&amp;q=pimplegaon%20pune+(pimpalgaon)&amp;t=k&amp;z=12&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"
                                    ></iframe>{" "}
                                    <a href="https://add-map.com/"></a>{" "}
                                    <script
                                        type="text/javascript"
                                        src="https://embedmaps.com/google-maps-authorization/script.js?id=0be1ddff42e0997de165b8ff4033d38efb3890f2"
                                    ></script>
                                </div>
                            </div>
                        </div>

                        <div className="hidden md:flex flex-col ">
                            <div className="mt-3 ">
                                <p className="text-xl ml-8 font-bold mt-3">
                                    You may also like
                                </p>
                            </div>
                            <SubEventCard />
                            <SubEventCard />
                            <SubEventCard />
                        </div>
                    </div>
                </div>



            </section>

            <div className='md:mr-28 md:ml-28 '>
                < Footer />
            </div>
        </>
    )
}

export default VenueDescription