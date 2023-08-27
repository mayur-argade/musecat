import React from 'react'

const UpcomingEvents = () => {
    return (
        <div><section className='md:mr-32 md:ml-32 mt-10'>
            <div className='flex justify-between items-center '>
                <div className="left"><span className='text-xl font-medium'>Upcoming Events</span></div>
                <div className="flex items-center align-middle ">
                    <div>
                        <img className="h-8 mr-2" src="/images/assets/calender-icon.png" alt="" />
                    </div>

                    <div className='hidden md:block flex space-x-1'>
                        <button className='hover:bg-black hover:text-white rounded-sm border-black pl-2 pr-2 text-xs border'>
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

                        <button className='hover:bg-black hover:text-white rounded-sm border-black pl-2 pr-2 text-xs border'>
                            <div className='flex flex-col'>
                                <p>
                                    Wed
                                </p>
                                <p>
                                    2 AUG
                                </p>
                            </div>
                        </button>

                        <button className='hover:bg-black hover:text-white rounded-sm border-black pl-2 pr-2 text-xs border'>
                            <div className='flex flex-col'>
                                <p>
                                    THU
                                </p>
                                <p>
                                    3 AUG
                                </p>
                            </div>
                        </button>

                        <button className='hover:bg-black hover:text-white rounded-sm border-black pl-2 pr-2 text-xs border'>
                            <div className='flex flex-col'>
                                <p>
                                    FRI
                                </p>
                                <p>
                                    4 AUG
                                </p>
                            </div>
                        </button>

                        <button className='hover:bg-black hover:text-white rounded-sm border-black pl-2 pr-2 text-xs border'>
                            <div className='flex flex-col'>
                                <p>
                                    Sat
                                </p>
                                <p>
                                    5 AUG
                                </p>
                            </div>
                        </button>

                        <button className='hover:bg-black hover:text-white rounded-sm border-black pl-2 pr-2 text-xs border'>
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
                        <select id="countries" class="bg-black border active:bg-white active:text-black border-gray-300 text-white text-sm rounded-full focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
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
                <div className='md:flex md:justify-around carousel p-4 flex items-center justify-start overflow-x-auto scroll-smooth  scrollbar-hide space-x-5'>
                    <div>
                        <div className="mt-10 mb-2 rounded-lg w-60 relative h-80 max-h-80 bg-teal-50">
                            <div className='absolute bottom-0 left-0 flex flex-col p-2'>
                                <img src="/images/assets/1.png" alt="" />
                                <div className='flex flex-col'>
                                    <span className='text-base mt-2 font-bold'>WEMA Weekend at The Vault, Radisson Call</span>
                                    <span className="mt-1 mb-1 text-xs font-light">Events</span>
                                    <button type="button" class="text-white bg-[#C0A04C] hover:bg-white hover:text-[#C0A04C] focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center mr-3 md:mr-0 dark:bg-[#C0A04C] dark:hover:bg-white dark:focus:ring-blue-800">Book Now</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div>
                        <div className="mt-10 mb-2 rounded-lg w-60 relative h-80 max-h-80 bg-teal-50">
                            <div className='absolute bottom-0 left-0 flex flex-col p-2'>
                                <img src="/images/assets/2.png" alt="" />
                                <div className='flex flex-col'>
                                    <span className='text-base mt-2 font-bold'>WEMA Weekend at The Vault, Radisson Call</span>
                                    <span className="mt-1 mb-1 text-xs font-light">Events</span>
                                    <button type="button" class="text-white bg-[#C0A04C] hover:bg-white hover:text-[#C0A04C] focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center mr-3 md:mr-0 dark:bg-[#C0A04C] dark:hover:bg-white dark:focus:ring-blue-800">Book Now</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div>
                        <div className="mt-10  mb-2 rounded-lg w-60 relative h-80 max-h-80 bg-teal-50">
                            <div className='absolute bottom-0 left-0 flex flex-col p-2'>
                                <img src="/images/assets/3.png" alt="" />
                                <div className='flex flex-col'>
                                    <span className='text-base mt-2 font-bold'>WEMA Weekend at The Vault, Radisson Call</span>
                                    <span className="mt-1 mb-1 text-xs font-light">Events</span>
                                    <button type="button" class="text-white bg-[#C0A04C] hover:bg-white hover:text-[#C0A04C] focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center mr-3 md:mr-0 dark:bg-[#C0A04C] dark:hover:bg-white dark:focus:ring-blue-800">Book Now</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div>
                        <div className="mt-10  mb-2 rounded-lg w-60 relative h-80 max-h-80 bg-teal-50">
                            <div className='absolute bottom-0 left-0 flex flex-col p-2'>
                                <img src="/images/assets/1.png" alt="" />
                                <div className='flex flex-col'>
                                    <span className='text-base mt-2 font-bold'>WEMA Weekend at The Vault, Radisson Call</span>
                                    <span className="mt-1 mb-1 text-xs font-light">Events</span>
                                    <button type="button" class="text-white bg-[#C0A04C] hover:bg-white hover:text-[#C0A04C] focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center mr-3 md:mr-0 dark:bg-[#C0A04C] dark:hover:bg-white dark:focus:ring-blue-800">Book Now</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>

            <div className='flex justify-end space-x-2 '>
                <p className='underline underline-offset-1 text-sm pr-2 '>view all</p>


            </div>
        </section></div>
    )
}

export default UpcomingEvents