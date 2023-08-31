import React from 'react'
import Navbar from '../../components/shared/Navbar/Navbar'
import PastPurchaseCard from '../../components/Cards/PastPurchaseCard'
import VendorOfferCard from '../../components/Cards/VendorOfferCard'
import Footer from '../../components/shared/Footer/Footer'
const VendorHome = () => {
    return (
        <div>
            <Navbar />
            <section className='md:mr-48 md:ml-48 mt-5 ml-6 mr-6'>
                <div className="grid md:grid-cols-2 header">
                    <div className='drop-shadow-xl'>

                        <div className='h-56 m-3 rounded-lg bg-white flex flex-col space-y-2 justify-center items-center align-middle pb-6 '>
                            <img className='' src="/images/assets/vendoraddevent.png" alt="" />
                            <button type="button" className="w-52 text-white bg-[#C0A04C] hover:bg-[#A48533] hover:text-white focus:ring-4  font-medium rounded-lg px-4 py-2 text-center mr-3 md:mr-0  dark:bg-[#C0A04C] dark:hover:bg-white dark:focus:ring-blue-800 flex align-middle items-center justify-center ">
                                <img className='h-3 mr-3' src="/images/icons/+.svg" alt="" />
                                <p className='font-bold leading-5'>Add Event</p>
                            </button>

                        </div>
                    </div>
                    <div className='drop-shadow-xl'>
                        <div className='h-56 m-3 rounded-lg bg-white flex flex-col space-y-2 justify-center items-center align-middle pb-4 '>
                            <img className='h-36' src="/images/assets/vendoraddoffer.png" alt="" />
                            <button type="button" className="w-52 text-white bg-[#C0A04C] hover:bg-[#A48533] hover:text-white focus:ring-4  font-medium rounded-lg px-4 py-2 text-center mr-3 md:mr-0  dark:bg-[#C0A04C] dark:hover:bg-white dark:focus:ring-blue-800 flex align-middle items-center justify-center ">
                                <img className='h-3 mr-3' src="/images/icons/+.svg" alt="" />
                                <p className='font-bold leading-5'>Add Offer</p>
                            </button>

                        </div>
                    </div>
                </div>

                <div className='mt-5 flex flex-col'>
                    <span className='font-bold text-2xl'>Ongoing Events</span>
                    <div className="carousel p-4 flex items-center justify-start overflow-x-auto scroll-smooth md:scrollbar-hide md:space-x-14 space-x-5 justify-between">
                        <div className=' flex-shrink-0'>
                            <PastPurchaseCard status={"Upcoming"} />
                        </div>
                        <div>
                            <PastPurchaseCard status={"Upcoming"} />
                        </div>
                        <div>
                            <PastPurchaseCard status={"Upcoming"} />
                        </div>
                    </div>
                    <span className='text-right underline underline-gray-500 mr-3 cursor-pointer text-sm text-gray-500'>view all</span>
                </div>

                <div className='mt-5 flex flex-col'>
                    <span className='font-bold text-2xl'>Ongoing Offers</span>
                    <div className="ml-3 md:flex md:justify-around carousel snap-x p-4 flex items-center justify-start overflow-x-auto scrollbar-hide space-x-3 md:space-x-5">
                        <div className=" flex-shrink-0">
                            <VendorOfferCard status={"Active"} />
                        </div>
                        <div className=" flex-shrink-0">
                            <VendorOfferCard status={"Active"} />
                        </div>
                        <div className=" flex-shrink-0">
                            <VendorOfferCard status={"Active"} />
                        </div>
                        <div className=" flex-shrink-0">
                            <VendorOfferCard status={"Active"} />
                        </div>

                    </div>
                    <span className='text-right underline underline-gray-500 mr-3 cursor-pointer text-sm text-gray-500'>view all</span>
                </div>
            </section>

            <div className=''>
                < Footer />
            </div>
        </div>
    )
}

export default VendorHome