import React from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../../components/shared/Navbar/Navbar'
import BottomNav from '../../components/shared/BottomNav/BottomNav'

const SearchPWA = () => {
    return (
        <>

            <div className='contactmargine'>
                <div className='shadow-2xl'>
                    <Navbar />
                </div>

                <div class="mt-5 relative ml-9 mr-9 shadow-xl rounded-xl">
                    <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                        </svg>
                    </div>
                    <input type="search" id="default-search" class="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-xl bg-white focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search around muscat" required />
                </div>

                <div className='mt-5 flex md:flex-row flex-col justify-center items-center md:space-x-3'>
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
            </div>
            <div>
                <BottomNav />
            </div>
        </>

    )
}

export default SearchPWA