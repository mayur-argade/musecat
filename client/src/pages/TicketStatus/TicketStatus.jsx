import React, { useState } from 'react'
import Navbar from '../../components/shared/Navbar/Navbar'
import Tabbar from '../../components/shared/Tabbar/Tabbar'
import Footer from '../../components/shared/Footer/Footer'
import FavoriteCard from '../../components/Cards/FavoriteCard'
import TicketStatusCard from '../../components/Cards/TicketStatusCard'
import Ticket from '../../components/Ticket/Ticket'

const TicketStatus = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
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
                    <p className='text-2xl font-bold'>Ticket Status</p>
                </div>

                <div className='flex flex-col justify-around align-middle items-stretch md:flex-row '>

                    <div className="left">
                        <TicketStatusCard />
                    </div>

                    <div className="right">
                        <form action="" className=' md:w-full mt-4'>
                            <div className="flex md:flex-row flex-col md:space-x-3 md:space-y-0 space-y-3">
                                <div className='flex flex-col bg-[#E7E7E7] pl-2 pr-2 rounded-md'>
                                    <label className='text-xs mt-1' htmlFor="first name">First name</label>
                                    <input
                                        type="text"
                                        className='border bg-transparent border-[#E7E7E7] focus:border-[#E7E7E7] focus:ring-[#E7E7E7]  outline-0'
                                        placeholder='John'
                                        disabled
                                    />
                                </div>
                                <div className='flex flex-col bg-[#E7E7E7] pl-2 pr-2 rounded-md'>
                                    <label className='text-xs mt-1' htmlFor="first name">Last name</label>
                                    <input
                                        type="text"
                                        className='border bg-transparent border-[#E7E7E7] focus:border-[#E7E7E7] focus:ring-[#E7E7E7]  outline-0'
                                        placeholder='Doe'
                                        disabled
                                    />
                                </div>
                            </div>

                            <div className='mt-3 flex flex-col bg-[#E7E7E7] pl-2 pr-2 rounded-md'>
                                <label className='text-xs mt-1' htmlFor="first name">Email</label>
                                <input
                                    type="text"
                                    className='w-fullborder bg-transparent border-[#E7E7E7] focus:border-gray-100 focus:ring-gray-100  outline-0'
                                    placeholder='John@email.com'
                                    disabled
                                />
                            </div>

                            <div className="flex md:flex-row flex-col space-y-3 md:space-y-0 md:space-x-3 mt-3">
                                <div className='flex flex-col bg-[#E7E7E7] pl-2 pr-2 rounded-md'>
                                    <label className='text-xs mt-1' htmlFor="first name">Select No. of seats</label>
                                    <input
                                        type="number"
                                        className='border bg-[#E7E7E7] border-[#E7E7E7] focus:border-[#E7E7E7] focus:ring-[#E7E7E7]  outline-0'
                                        placeholder='5'
                                        disabled
                                    />
                                </div>
                                <div className='flex flex-col bg-[#E7E7E7] pl-2 pr-2 rounded-md'>
                                    <label className='text-xs mt-1' htmlFor="first name">Select Row</label>
                                    <select
                                        className='w-56 border bg-transparent border-[#E7E7E7] focus:border-[#E7E7E7] focus:ring-[#E7E7E7]  outline-0'
                                        placeholder='Doe'
                                        disabled
                                    >
                                        <option selected>Platinum</option>
                                        <option value="US">Platinum</option>
                                        <option value="CA">Gold</option>
                                        <option value="FR">Silver</option>
                                    </select>

                                </div>
                            </div>



                            <div className="flex justify-start mt-3">
                                <button
                                    type="button"
                                    onClick={openModal}
                                    className="w-full md:w-44 text-white bg-[#C0A04C] hover:bg-[#A48533] focus:ring-4 focus:outline-none focus:ring-bg-[#A48533] font-medium rounded-lg text-sm px-4 py-2 text-center mr-3 md:mr-0 dark:bg-[#C0A04C] dark:hover:bg-white dark:focus:ring-blue-800"
                                >
                                    View Ticket
                                </button>                            </div>
                        </form>
                    </div>
                </div>
            </section>

            {isModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center z-50 overflow-auto bg-[#FFFFFF] bg-opacity-20 backdrop-blur-sm">
                    <div className="relative rounded-lg ">
                        <Ticket />
                        {/* Close button */}
                        <button
                            onClick={closeModal}
                            className="absolute -top-5 -right-5 m-2 text-gray-600 hover:text-gray-800 focus:outline-none"
                        >
                         <img src="/images/icons/cancel-icon.png" alt="" />
                        </button>
                    </div>
                </div>
            )}

            <div className=''>
                < Footer />
            </div>

        </>
    )
}

export default TicketStatus