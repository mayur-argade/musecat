import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Navbar from '../../../components/shared/Navbar/Navbar'
import BottomNav from '../../../components/shared/BottomNav/BottomNav'

const SearchPWA = () => {

    const navigate = useNavigate()
    const [query, setQuery] = useState('')

    return (
        <div className='dark:bg-[#2c2c2c] dark:text-white pb-40'>
            <Navbar />
            <section >
                <div className='searchbar mt-5 relative ml-9 mr-9 shadow-xl rounded-xl'>
                    <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                        </svg>
                    </div>
                    <input onChange={((e) => setQuery(e.target.value))} type="search" id="default-search" class="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-xl bg-white focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white" placeholder="Search around muscat" required />
                    <button onClick={(() => navigate(`/Category/events?search=${query}`))} type="button" class="absolute top-0 right-0 h-full p-2.5 text-sm font-medium text-white bg-[#C0A04C] rounded-r-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-[#C0A04C] dark:hover:bg-[#C0A04C]">
                        <img className='' src="/images/icons/home-search.svg" alt="" />
                        <span class="sr-only">Search</span>
                    </button>
                </div>

                <div className='space-y-3 py-3 w-full event-list flex flex-col justify-center align-middle items-center'>
                    <Link to='/category/events'>
                        <div className="relative">
                            <img className="rounded-xl h-36 w-80 bg-gray-400 bg-blend-multiply hover:bg-grey-500 bg-gray-400 bg-blend-multiply" src="/images/assets/events.jpg" alt="" />
                            <span className='absolute bottom-0 left-0 text-white p-2 font-bold'>Events</span>
                        </div>
                    </Link>
                    <Link to='/category/weeklyoffers'>
                        <div className='relative'>
                            <img className="rounded-xl h-36 w-80 bg-gray-400 bg-blend-multiply hover:bg-grey-500 bg-gray-400 bg-blend-multiply" src="/images/assets/offers.jpg" alt="" />
                            <span className='absolute bottom-0 left-0 text-white p-2 font-bold'>Weekly Offers</span>
                        </div>
                    </Link>
                    <Link to='/category/eat'>
                        <div className='relative'>
                            <img className="rounded-xl h-36 w-80 md:w-80 md:h-80 bg-gray-400 bg-blend-multiply hover:bg-grey-500" src="/images/assets/ead.jpg" alt="" />
                            <span className='absolute bottom-0 left-0 text-white p-2 font-bold'>Eat and drinks</span>
                        </div>
                    </Link>
                    <Link to='/category/ladiesnight'>
                        <div className='relative'>
                            <img className="rounded-xl h-36 w-80 bg-gray-400 bg-blend-multiply hover:bg-grey-500 bg-gray-400 bg-blend-multiply" src="/images/assets/lnight.jpg" alt="" />
                            <span className='absolute bottom-0 left-0 text-white p-2 font-bold'>Ladies Night</span>
                        </div>
                    </Link>

                    <Link to='/category/thingstodo'>
                        <div className='relative'>
                            <img className="rounded-xl h-36 w-80 bg-gray-400 bg-blend-multiply hover:bg-grey-500 bg-gray-400 bg-blend-multiply" src="/images/assets/ttd.jpg" alt="" />
                            <span className='absolute bottom-0 left-0 text-white p-2 font-bold'>Things to do</span>

                        </div>
                    </Link>
                </div>
            </section>
            <BottomNav />
        </div>
    )
}

export default SearchPWA

