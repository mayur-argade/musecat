import React from 'react'
import { Link } from 'react-router-dom';

const PopularCategory = () => {

    const scrollLeft = () => {
        document.getElementById("content").scrollLeft -= 400;
    }
    const scrollRight = () => {
        document.getElementById("content").scrollLeft += 400;
    }

    return (
        <div>
            <section className='md:mr-32 md:ml-32 mt-10'>
                <div className='flex justify-between align-middle '>

                    <div className="left flex items-center align-middle ">
                        <span className='text-xl font-medium'>Popular Category</span></div>

                    <div className="right md:flex flex-wrap space-x-2">
                        <button className='hidden md:block hover:bg-black hover:text-white rounded-full border-black pl-2 pr-2 text-xs border'>Sunday</button>
                        <button className='hidden md:block hover:bg-black hover:text-white rounded-full border-black pl-2 pr-2 text-xs border'>Monday</button>
                        <button className='hidden md:block hover:bg-black hover:text-white rounded-full border-black pl-2 pr-2 text-xs border'>Tuesday</button>
                        <button className='hidden md:block hover:bg-black hover:text-white rounded-full border-black pl-2 pr-2 text-xs border'>Thursday</button>
                        <button className='hidden md:block hover:bg-black hover:text-white rounded-full border-black pl-2 pr-2 text-xs border'>Friday</button>
                        <button className='hidden md:block hover:bg-black hover:text-white rounded-full border-black pl-2 pr-2 text-xs border'>Saturday</button>

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
                    <div id="content" className=' carousel p-4 flex items-center justify-start overflow-x-auto scroll-smooth md:scrollbar-hide md:space-x-14 space-x-5'>
                        <div>
                            <div className="mb-2 rounded-lg bg-center bg-no-repeat w-56 relative h-80 max-h-80 bg-[url('https://res.cloudinary.com/mayurs-media/image/upload/v1692690811/1.1_pumpaw.png')] bg-gray-400 bg-blend-multiply">
                                <div className='absolute bottom-0 left-0 flex flex-col p-2'>
                                    <span className='text-xl text-white font-medium'>Staycation</span>
                                    <button className='bg-white text-black rounded-md offer'>
                                        13 offers
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div>
                            <div className="mb-2 rounded-lg bg-center bg-no-repeat w-56 relative h-80 max-h-80 bg-[url('https://res.cloudinary.com/mayurs-media/image/upload/v1692690811/1.1_pumpaw.png')] bg-gray-400 bg-blend-multiply">
                                <div className='absolute bottom-0 left-0 flex flex-col p-2'>
                                    <span className='text-xl text-white font-medium'>Staycation</span>
                                    <button className='bg-white text-black rounded-md offer'>
                                        13 offers
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div>
                            <div className="mb-2 rounded-lg bg-center bg-no-repeat w-56 relative h-80 max-h-80 bg-[url('https://res.cloudinary.com/mayurs-media/image/upload/v1692690810/1.2_n802iw.png')]  bg-gray-400 bg-blend-multiply">
                                <div className='absolute bottom-0 left-0 flex flex-col p-2'>
                                    <span className='text-xl text-white font-medium'>Friday Brunch</span>
                                    <button className='bg-white text-black rounded-md offer'>
                                        13 offers
                                    </button>
                                </div>
                            </div>
                        </div>


                        <div>


                            <div className="mb-2 rounded-lg bg-center bg-no-repeat w-56 relative h-80 max-h-80 bg-[url('https://res.cloudinary.com/mayurs-media/image/upload/v1692692203/mwt/e3_tquumk.jpg')]  bg-gray-300 bg-blend-multiply">
                                <div className='absolute bottom-0 left-0 flex flex-col p-2'>
                                    <span className='text-xl text-white font-medium'>Things to Do</span>
                                    <button className='bg-white text-black rounded-md offer'>
                                        13 offers
                                    </button>
                                </div>
                            </div>
                        </div>


                        <div>
                            <div className="mb-2 rounded-lg bg-center bg-no-repeat w-56 relative h-80 max-h-80 bg-[url('https://res.cloudinary.com/mayurs-media/image/upload/v1692696310/IMAGE_qmootq.jpg')]  bg-gray-300 bg-blend-multiply">
                                <div className='absolute bottom-0 left-0 flex flex-col p-2'>
                                    <span className='text-xl text-white font-medium'>Events</span>
                                    <button className='bg-white text-black rounded-md offer'>
                                        13 offers
                                    </button>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>

                <div className='grid md:grid-cols-6 flex align-middle'>
                    <div className="hidden md:flex md:col-start-2 md:col-span-4  justify-center items-center space-x-4">
                        <button onClick={scrollLeft}>
                            <img className='h-10' src="/images/icons/homebackarrow.svg" alt="" />
                        </button>
                        <button onClick={scrollRight}>
                            <img className='h-10' src="/images/icons/homefrontarrow.svg" alt="" />
                        </button>
                    </div>

                    <div className='flex justify-end space-x-2 '>
                        <div className='flex justify-end align-middle'>
                            <img className='h-6' src="/images/icons/map.svg" alt="" />
                            <p className='text-sm'>View on map</p>
                        </div>
                        <Link to="/category/events">
                            <p className='underline underline-offset-1 text-sm pr-2 '>view all</p>
                        </Link>

                    </div>
                </div>
            </section>

        </div>
    )
}

export default PopularCategory