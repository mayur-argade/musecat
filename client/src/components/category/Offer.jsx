import React from 'react'

const Offer = () => {
    return (
        <div>
            <section className='md:mr-32 md:ml-32 mt-10 ml-3 mr-3'>
                <div className='flex justify-between mt-10'>
                    <div className="left"><span className='text-xl font-medium'>Offers</span></div>
                    <div className="right"></div>
                    <div className="right underline"><span>view all</span></div>
                </div>

                <div className="ml-1 mr-1">
                    <div className='md:flex md:justify-around carousel snap-x p-4 flex items-center justify-start overflow-x-auto scroll-smooth  scrollbar-hide space-x-3 md:space-x-5'>
                        <img className='h-64 w-52 snap-start' src="/images/assets/offer1.jpg" alt="" />
                        <img className='h-64 w-52' src="/images/assets/offer2.jpg" alt="" />
                        <img className='h-64 w-52' src="/images/assets/offer3.jpg" alt="" />
                        <img className='h-64 w-52' src="/images/assets/offer4.jpg" alt="" />
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Offer