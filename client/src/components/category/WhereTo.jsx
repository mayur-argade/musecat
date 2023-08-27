import React from 'react'

const WhereTo = () => {
    return (
        <div>
            <section className='md:mr-32 md:ml-32 mt-10'>
                <span className='text-xl font-medium  '>
                    Where to ?
                </span>

                <div className='flex md:flex-row flex-col justify-center items-center md:space-x-3'>
                    <div className="flex flex-col md:space-y-7 space-y-3">
                        <div className="relative">
                            <img className="h-36 w-80 bg-gray-400 bg-blend-multiply hover:bg-grey-500 bg-gray-400 bg-blend-multiply" src="/images/assets/events.jpg" alt="" />
                            <span className='absolute bottom-0 left-0 text-white p-2 font-bold'>Events</span>
                        </div>

                        <div className='relative'>
                            <img className="h-36 w-80 bg-gray-400 bg-blend-multiply hover:bg-grey-500 bg-gray-400 bg-blend-multiply" src="/images/assets/offers.jpg" alt="" />
                            <span className='absolute bottom-0 left-0 text-white p-2 font-bold'>Weekly Offers</span>
                        </div>

                    </div>

                    <div className="my-3">
                        <div className='relative'>
                            <img className="h-36 w-80 md:w-80 md:h-80 bg-gray-400 bg-blend-multiply hover:bg-grey-500" src="/images/assets/ead.jpg" alt="" />
                            <span className='absolute bottom-0 left-0 text-white p-2 font-bold'>Eat and drinks</span>

                        </div>
                    </div>

                    <div className="flex flex-col md:space-y-7 space-y-3">
                        <div className='relative'>
                            <img className="h-36 w-80 bg-gray-400 bg-blend-multiply hover:bg-grey-500 bg-gray-400 bg-blend-multiply" src="/images/assets/lnight.jpg" alt="" />
                            <span className='absolute bottom-0 left-0 text-white p-2 font-bold'>Ladies Night</span>

                        </div>

                        <div className='relative'>

                            <img className="h-36 w-80 bg-gray-400 bg-blend-multiply hover:bg-grey-500 bg-gray-400 bg-blend-multiply" src="/images/assets/ttd.jpg" alt="" />
                            <span className='absolute bottom-0 left-0 text-white p-2 font-bold'>Things to do</span>

                        </div>
                    </div>
                </div>
            </section></div>
    )
}

export default WhereTo