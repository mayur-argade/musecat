import React from 'react'

const PopularCategory = () => {
    return (
        <div><section className='mr-32 ml-32 mt-10'>
            <div className='flex justify-between'>
                <div className="left"><span className='text-xl font-medium'>Popular Category</span></div>
                <div className="right md:flex flex-wrap space-x-2">
                    <button className='hidden md:block hover:bg-black hover:text-white rounded-full border-black pl-2 pr-2 text-xs border'>Sunday</button>
                    <button className='hidden md:block hover:bg-black hover:text-white rounded-full border-black pl-2 pr-2 text-xs border'>Monday</button>
                    <button className='hidden md:block hover:bg-black hover:text-white rounded-full border-black pl-2 pr-2 text-xs border'>Tuesday</button>
                    <button className='hidden md:block hover:bg-black hover:text-white rounded-full border-black pl-2 pr-2 text-xs border'>Thursday</button>
                    <button className='hidden md:block hover:bg-black hover:text-white rounded-full border-black pl-2 pr-2 text-xs border'>Friday</button>
                    <button className='hidden md:block hover:bg-black hover:text-white rounded-full border-black pl-2 pr-2 text-xs border'>Saturday</button>
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
                <div className='flex flex-wrap mt-3 justify-around '>
                    <div className="mb-2 rounded-lg bg-center bg-no-repeat w-56 relative h-80 max-h-80 bg-[url('https://res.cloudinary.com/mayurs-media/image/upload/v1692690811/1.1_pumpaw.png')] bg-gray-400 bg-blend-multiply">
                        <div className='absolute bottom-0 left-0 flex flex-col p-2'>
                            <span className='text-xl text-white font-medium'>Staycation</span>
                            <button className='bg-white text-black rounded-md offer'>
                                13 offers
                            </button>
                        </div>
                    </div>

                    <div className="mb-2 rounded-lg bg-center bg-no-repeat w-56 relative h-80 max-h-80 bg-[url('https://res.cloudinary.com/mayurs-media/image/upload/v1692690810/1.2_n802iw.png')]  bg-gray-400 bg-blend-multiply">
                        <div className='absolute bottom-0 left-0 flex flex-col p-2'>
                            <span className='text-xl text-white font-medium'>Friday Brunch</span>
                            <button className='bg-white text-black rounded-md offer'>
                                13 offers
                            </button>
                        </div>
                    </div>

                    <div className="mb-2 rounded-lg bg-center bg-no-repeat w-56 relative h-80 max-h-80 bg-[url('https://res.cloudinary.com/mayurs-media/image/upload/v1692692203/mwt/e3_tquumk.jpg')]  bg-gray-300 bg-blend-multiply">
                        <div className='absolute bottom-0 left-0 flex flex-col p-2'>
                            <span className='text-xl text-white font-medium'>Things to Do</span>
                            <button className='bg-white text-black rounded-md offer'>
                                13 offers
                            </button>
                        </div>
                    </div>

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
        </section></div>
    )
}

export default PopularCategory