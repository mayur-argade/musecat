import React from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../../components/shared/Navbar/Navbar'
import BottomNav from '../../components/shared/BottomNav/BottomNav'

const EventsPWA = () => {
    return (
        <>
            <div className=''>
                <Navbar />
                <div className='mt-5 flex md:flex-row flex-col justify-center items-center md:space-x-3'>
                    <div className="flex flex-col md:space-y-7 space-y-3">
                        <Link to='/category/events'>
                            <div className="relative">
                                <img className="h-36 w-80 bg-gray-400 bg-blend-multiply hover:bg-grey-500 bg-gray-400 bg-blend-multiply rounded" src="/images/assets/banner-events.jpeg" alt="" />
                                <span className='absolute bottom-0 left-0 text-white p-2 font-bold'>Events</span>
                            </div>
                        </Link>
                        <Link to='/category/weeklyoffers'>
                            <div className='relative'>
                                <img className="h-36 w-80 bg-gray-400 bg-blend-multiply hover:bg-grey-500 bg-gray-400 bg-blend-multiply rounded" src="/images/assets/banner-weeklyoffers.jpeg" alt="" />
                                <span className='absolute bottom-0 left-0 text-white p-2 font-bold'>Weekly Offers</span>
                            </div>
                        </Link>


                    </div>

                    <div className="my-3">
                        <Link to='/category/eat'>
                            <div className='relative'>
                                <img className="h-36 w-80 md:w-80 md:h-80 bg-gray-400 bg-blend-multiply hover:bg-grey-500 rounded" src="/images/assets/banner-eat.jpeg" alt="" />
                                <span className='absolute bottom-0 left-0 text-white p-2 font-bold'>Eat and drinks</span>
                            </div>
                        </Link>
                    </div>

                    <div className="flex flex-col md:space-y-7 space-y-3">
                        <Link to='/category/ladiesnight'>
                            <div className='relative'>
                                <img className="h-36 w-80 bg-gray-400 bg-blend-multiply hover:bg-grey-500 bg-gray-400 bg-blend-multiply rounded" src="/images/assets/banner-ladiesnight.jpeg" alt="" />
                                <span className='absolute bottom-0 left-0 text-white p-2 font-bold'>Ladies Night</span>
                            </div>
                        </Link>

                        <Link to='/category/thingstodo'>
                            <div className='relative '>
                                <img className="h-36 w-80 bg-gray-400 bg-blend-multiply hover:bg-grey-500 bg-gray-400 bg-blend-multiply rounded" src="/images/assets/banner-thingstodo.jpeg" alt="" />
                                <span className='absolute bottom-0 left-0 text-white p-2 font-bold'>Things to do</span>

                            </div>
                        </Link>
                    </div>

                </div>
                <div className='mb-24'></div>
            </div>
            <div>
                    <BottomNav />
                </div>
        </>
    )
}

export default EventsPWA