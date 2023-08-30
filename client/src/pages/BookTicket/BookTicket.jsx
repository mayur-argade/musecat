import React, { useState } from 'react'
import Navbar from '../../components/shared/Navbar/Navbar'
import Tabbar from '../../components/shared/Tabbar/Tabbar'
import Footer from '../../components/shared/Footer/Footer'

const BookTicket = () => {
    const [price, setPrice] = useState(false);

    const [isModalOpen, setModalOpen] = useState(false);

    const openModal = () => {
        setModalOpen(true);
    };

    const closeModal = () => {
        setModalOpen(false);
    };

    const handleBookNowClick = () => {
        setPrice(true);
    };

    return (
        <>
            <Navbar />
            <Tabbar />
            <section className='md:mr-48 md:ml-48 mt-5 ml-6 mr-6'>
                <div className="ml-3 hidden md:flex align-middle items-center">
                    <button className=' mt-1'>
                        <img className='h-14 w-14' src="/images/icons/back-button.png" alt="" />
                    </button>
                    <p className='text-2xl font-bold'>Book Your Seat</p>
                </div>

                <div className="fixed top-80 -right-1 md:hidden ">
                    <button
                        onClick={openModal}
                        className="bg-[#C0A04C] text-white px-4 py-2 rounded-lg text-sm"
                    >
                        <img src="/images/icons/show.svg" alt="" />
                    </button>
                </div>

                <div className="grid justify-items-center gap-4 grid-cols-1 md:grid-cols-2">
                    <div className="hidden  md:flex flex-col justify-end">
                        <img src="/images/assets/theater.png" alt="" />
                    </div>

                    {isModalOpen && (
                        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
                            <div className="bg-white p-4 rounded-lg relative  ml-3 mr-3">
                                
                                <button
                                    onClick={closeModal}
                                    className="absolute top-2 right-2 text-black hover:text-gray-800"
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-6 w-6"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M6 18L18 6M6 6l12 12"
                                        />
                                    </svg>
                                </button>

                                
                                <img className='pt-4' src="/images/assets/theater.png" alt="Theater" />
                            </div>
                        </div>
                    )}


                    <div className=" w-full flex justify-center md:justify-start">
                        <div className="heading">
                            <p className='font-semibold text-xl'>Booking Form</p>
                            <p className='font-light text-xs'>Please fill this form to receive your tickets on email</p>

                            <form action="" className=' md:w-full mt-4'>
                                <div className="flex md:flex-row flex-col md:space-x-3 md:space-y-0 space-y-3">
                                    <div className='flex flex-col bg-[#E7E7E7] pl-2 pr-2 rounded-md'>
                                        <label className='text-xs mt-1' htmlFor="first name">First name</label>
                                        <input
                                            type="text"
                                            className='border bg-transparent border-[#E7E7E7] focus:border-[#E7E7E7] focus:ring-[#E7E7E7]  outline-0'
                                            placeholder='John'
                                        />
                                    </div>
                                    <div className='flex flex-col bg-[#E7E7E7] pl-2 pr-2 rounded-md'>
                                        <label className='text-xs mt-1' htmlFor="first name">Last name</label>
                                        <input
                                            type="text"
                                            className='border bg-transparent border-[#E7E7E7] focus:border-[#E7E7E7] focus:ring-[#E7E7E7]  outline-0'
                                            placeholder='Doe'
                                        />
                                    </div>
                                </div>

                                <div className='mt-3 flex flex-col bg-[#E7E7E7] pl-2 pr-2 rounded-md'>
                                    <label className='text-xs mt-1' htmlFor="first name">Email</label>
                                    <input
                                        type="text"
                                        className='w-fullborder bg-transparent border-[#E7E7E7] focus:border-gray-100 focus:ring-gray-100  outline-0'
                                        placeholder='John@email.com'
                                    />
                                </div>

                                <div className="flex md:flex-row flex-col space-y-3 md:space-y-0 md:space-x-3 mt-3">
                                    <div className='flex flex-col bg-[#E7E7E7] pl-2 pr-2 rounded-md'>
                                        <label className='text-xs mt-1' htmlFor="first name">Select No. of seats</label>
                                        <input
                                            type="number"
                                            className='border bg-[#E7E7E7] border-[#E7E7E7] focus:border-[#E7E7E7] focus:ring-[#E7E7E7]  outline-0'
                                            placeholder='5'
                                        />
                                    </div>
                                    <div className='flex flex-col bg-[#E7E7E7] pl-2 pr-2 rounded-md'>
                                        <label className='text-xs mt-1' htmlFor="first name">Select Row</label>
                                        <select
                                            className='w-56 border bg-transparent border-[#E7E7E7] focus:border-[#E7E7E7] focus:ring-[#E7E7E7]  outline-0'
                                            placeholder='Doe'
                                        >
                                            <option selected>Select ROW</option>
                                            <option value="US">Platinum</option>
                                            <option value="CA">Gold</option>
                                            <option value="FR">Silver</option>
                                        </select>

                                    </div>
                                </div>

                                <div className='flex justify-between mt-3'>
                                    <div class="flex items-center mb-4">
                                        <input id="default-checkbox" type="checkbox" value="" class="w-4 h-4 text-bg-[#A48533]border-gray-300 rounded focus:ring-bg-[#A48533] dark:focus:ring-bg-[#A48533] dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                        <label for="default-checkbox" class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Are you 18plus ?</label>
                                    </div>
                                    <span className='underline '>T&C</span>
                                </div>

                                {price && (
                                    <div className="flex flex-col p-4 rounded">

                                        <div className="w-full baseprice flex justify-between">
                                            <p className='font-semibold'>Base price {`x5`}</p>
                                            <p className='font-semibold'>OMR 950</p>
                                        </div>
                                        <div className="w-full baseprice flex justify-between">
                                            <p className='font-semibold'>Taxes</p>
                                            <p className='font-semibold'>OMR 164</p>
                                        </div>
                                        <hr />
                                        <div className="w-full baseprice flex justify-between">
                                            <p className='font-semibold'>Total</p>
                                            <p className='font-semibold'>OMR 1114</p>
                                        </div>
                                    </div>
                                )}

                                <div onClick={handleBookNowClick} className="flex justify-center w-full mt-3">
                                    <button type="button" class="w-full md:w-full text-white bg-[#C0A04C] hover:bg-[#A48533] focus:ring-4 focus:outline-none focus:ring-bg-[#A48533] font-medium rounded-lg text-sm px-4 py-2 text-center mr-3 md:mr-0 dark:bg-[#C0A04C] dark:hover:bg-white dark:focus:ring-blue-800">Book Now</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </section>

            <div className=''>
                < Footer />
            </div>
        </>
    )
}

export default BookTicket