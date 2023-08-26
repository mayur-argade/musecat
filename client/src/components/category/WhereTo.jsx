import React from 'react'

const WhereTo = () => {
    return (
        <div>
            <section className='md:mr-32 md:ml-32 mt-10'>
            <span className='text-xl font-medium  '>
                Where to ?
            </span>

            <div className='flex justify-center space-x-3'>
                <div className="flex flex-col space-y-7">
                    <img className="h-36 w-80 bg-gray-400 bg-blend-multiply hover:bg-grey-500" src="/images/assets/events.jpg" alt="" />
                    <img className="h-36 w-80 bg-gray-400 bg-blend-multiply hover:bg-grey-500" src="/images/assets/offers.jpg" alt="" />
                </div>
                <div className="2">
                    <img className="w-80 h-80 bg-gray-400 bg-blend-multiply hover:bg-grey-500"src="/images/assets/ead.jpg" alt="" />
                </div>
                <div className="flex flex-col space-y-7">
                    <img className="h-36 w-80 bg-gray-400 bg-blend-multiply hover:bg-grey-500" src="/images/assets/lnight.jpg" alt="" />
                    <img className="h-36 w-80 bg-gray-400 bg-blend-multiply hover:bg-grey-500" src="/images/assets/ttd.jpg" alt="" />
                </div>
            </div>
        </section></div>
    )
}

export default WhereTo