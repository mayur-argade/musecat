import React from 'react'

const Offer = () => {
  return (
    <div>
        <section className='mr-32 ml-32 mt-10'>
    <div className='flex justify-between mt-10'>
        <div className="left"><span className='text-xl font-medium'>Offers</span></div>
        <div className="right"></div>
        <div className="right underline"><span>view all</span></div>
    </div>

    <div className='flex flex-wrap justify-around'>
        <img className='h-64 w-52' src="/images/assets/offer1.jpg" alt="" />
        <img className='h-64 w-52' src="/images/assets/offer2.jpg" alt="" />
        <img className='h-64 w-52' src="/images/assets/offer3.jpg" alt="" />
        <img className='h-64 w-52' src="/images/assets/offer4.jpg" alt="" />

    </div>
</section></div>
  )
}

export default Offer