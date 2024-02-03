import React from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../../../components/shared/Navbar/Navbar'
import BottomNav from '../../../components/shared/BottomNav/BottomNav'

const EventsPWA = () => {
    return (
        <>
            <div className='h-screen dark:bg-[#2c2c2c] dark:text-white'>
                <Navbar />
                <section className='flex justify-center items-center align-middle mt-5'>
                    <section className='w-full md:w-full sm:mx-5 md:mx-5 md:w-10/12 xl:w-9/12 2xl:w-7/12'>
                        <div className='flex justify-between '>
                            {/* <div className="left"><span className='text-xl font-bold md:text-2xl md:font-[700]'>Where To ?</span></div> */}
                            <div className="right"></div>
                        </div>

                        <div className='mx-5 grid grid-cols-2 md:grid-cols-3 gap-3 p-3'>
                            {/* Link 1 */}
                            <div className='h-40 md:h-60 grid md:grid-cols-1 grid-rows-2 gap-3'>
                                <Link to='/category/events'>
                                    <div className='relative'>
                                        <img className='rounded-md h-40 md:h-60 w-full bg-gray-400 bg-blend-multiply hover:bg-grey-500 grayscale-10' src='/images/assets/banner-events.jpeg' alt='' />
                                        <div className="rounded absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black opacity-50 group-hover:opacity-0 rounded-lg"></div>
                                        <span className='absolute bottom-0 left-0 text-white p-2 font-bold'>Events</span>
                                    </div>
                                </Link>
                            </div>

                            {/* Link 2 */}
                            <div className='h-40 md:h-60  grid md:grid-cols-1 grid-rows-2 gap-3'>
                                <Link to='/category/weeklyoffers'>
                                    <div className='relative'>
                                        <img className=' rounded-md h-40 md:h-60 w-full bg-gray-400 bg-blend-multiply hover:bg-grey-500 grayscale-10' src='/images/assets/banner-weeklyoffers.jpeg' alt='' />
                                        <div className="rounded absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black opacity-50 group-hover:opacity-0 rounded-lg"></div>
                                        <span className='absolute bottom-0 left-0 text-white p-2 font-bold'>Weekly Offers</span>
                                    </div>
                                </Link>
                            </div>

                            {/* Link 3 */}
                            <div className='h-40 md:h-60  grid md:grid-cols-1 grid-rows-2 gap-3'>
                                <Link to='/category/eat'>
                                    <div className='relative'>
                                        <img className=' rounded-md h-40 md:h-60 w-full bg-gray-400 bg-blend-multiply hover:bg-grey-500 grayscale-20' src='/images/assets/banner-eat.jpeg' alt='' />
                                        <div className="rounded absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black opacity-50 group-hover:opacity-0 rounded-lg"></div>
                                        <span className='absolute bottom-0 left-0 text-white p-2 font-bold'>Eat and drinks</span>
                                    </div>
                                </Link>
                            </div>

                            {/* Link 4 */}
                            <div className='h-40 md:h-60  grid md:grid-cols-1 grid-rows-2 gap-3'>
                                <Link to='/category/poolandbeach'>
                                    <div className='relative'>
                                        <img className=' rounded-md h-40 md:h-60 w-full bg-gray-400 bg-blend-multiply hover:bg-grey-500' src='/images/assets/banner-poolandbeach.jpg' alt='' />
                                        <div className="rounded absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black opacity-50 group-hover:opacity-0 rounded-lg"></div>
                                        <span className='absolute bottom-0 left-0 text-white p-2 font-bold'>Pool & Beach</span>
                                    </div>
                                </Link>
                            </div>

                            {/* Link 5 */}
                            <div className='h-40 md:h-60  grid md:grid-cols-1 grid-rows-2 gap-3'>
                                <Link to='/category/ladiesnight'>
                                    <div className='relative'>
                                        <img className=' rounded-md h-40 md:h-60 w-full bg-gray-400 bg-blend-multiply hover:bg-grey-500' src='/images/assets/banner-ladiesnight.jpeg' alt='' />
                                        <div className="rounded absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black opacity-50 group-hover:opacity-0 rounded-lg"></div>
                                        <span className='absolute bottom-0 left-0 text-white p-2 font-bold'>Ladies Night</span>
                                    </div>
                                </Link>
                            </div>

                            {/* Link 6 */}
                            <div className='h-40 md:h-60  grid md:grid-cols-1 grid-rows-2 gap-3'>
                                <Link to='/category/thingstodo'>
                                    <div className='relative'>
                                        <img className=' rounded-md h-40 md:h-60 w-full bg-gray-400 bg-blend-multiply hover:bg-grey-500' src='/images/assets/banner-thingstodo.jpeg' alt='' />
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
                </section>
                <div className='mb-24'></div>
            </div>
            <div>
                <BottomNav />
            </div>
        </>
    )
}

export default EventsPWA