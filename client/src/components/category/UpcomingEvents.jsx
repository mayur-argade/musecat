import React from 'react'

const UpcomingEvents = () => {
    return (
        <div><section className='md:mr-32 md:ml-32 mt-10'>
            <div className='flex justify-between'>
                <div className="left"><span className='text-xl font-medium'>Upcoming Events</span></div>
                <div className="flex md:flex flex-wrap space-x-2 align-middle ">
                    <img className="h-8" src="/images/assets/calender-icon.png" alt="" />
                    <button className='hidden md:block hover:bg-black hover:text-white rounded-sm border-black pl-2 pr-2 text-xs border'>
                        <div className='flex flex-col'>
                            <span>
                                Mon
                            </span>
                            <span>
                                31 JUL
                            </span>
                        </div>
                    </button>
                    <button className='hidden md:block hover:bg-black hover:text-white rounded-sm border-black pl-2 pr-2 text-xs border'>
                        <div className='flex flex-col'>
                            <span>
                                Tue
                            </span>
                            <span>
                                1 AUG
                            </span>
                        </div>
                    </button>
                    <button className='hidden md:block hover:bg-black hover:text-white rounded-sm border-black pl-2 pr-2 text-xs border'>
                        <div className='flex flex-col'>
                            <span>
                                Wed
                            </span>
                            <span>
                                2 AUG
                            </span>
                        </div>
                    </button>
                    <button className='hidden md:block hover:bg-black hover:text-white rounded-sm border-black pl-2 pr-2 text-xs border'>
                        <div className='flex flex-col'>
                            <span>
                                THU
                            </span>
                            <span>
                                3 AUG
                            </span>
                        </div>
                    </button>
                    <button className='hidden md:block hover:bg-black hover:text-white rounded-sm border-black pl-2 pr-2 text-xs border'>
                        <div className='flex flex-col'>
                            <span>
                                FRI
                            </span>
                            <span>
                                4 AUG
                            </span>
                        </div>
                    </button>
                    <button className='hidden md:block hover:bg-black hover:text-white rounded-sm border-black pl-2 pr-2 text-xs border'>
                        <div className='flex flex-col'>
                            <span>
                                Sat
                            </span>
                            <span>
                                5 AUG
                            </span>
                        </div>
                    </button>
                    <button className='hidden md:block hover:bg-black hover:text-white rounded-sm border-black pl-2 pr-2 text-xs border'>
                        <div className='flex flex-col'>
                            <span>
                                SUN
                            </span>
                            <span>
                                6 AUG
                            </span>
                        </div>
                    </button>
                    <div>
                        <select id="countries" class="md:hidden bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
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
                <div className='flex flex-wrap justify-between mr-6 ml-6 mt-2'>
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
        </section></div>
    )
}

export default UpcomingEvents