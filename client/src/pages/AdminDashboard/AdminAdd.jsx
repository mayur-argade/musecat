import React, { useState, useEffect } from 'react'
import Sidebar from '../../components/shared/Sidebar/Sidebar'
import AddEventModal from '../../components/EditEventModal/AdminAddEventModal'
import AddOfferModal from '../../components/EditEventModal/AdminAddOfferEventModal'

const AdminAdd = () => {


    const [response, setReponse] = useState({});
    const [showAddEvent, setShowAddEvent] = useState(false)
    const [showAddOffer, setShowAddOffer] = useState(false)

    const closeModal = () => {
        setShowAddEvent(false);
    };

    const closeOfferModal = () => {
        setShowAddOffer(false)
    }

    const handleClick = () => {
        setShowAddEvent(true)
    }

    const handleOfferClick = () => {
        setShowAddOffer(true)
    }


    return (
        <div>
            <div className='flex '>

                <div>
                    <Sidebar />
                </div>

                <div className='pl-20 flex flex-col w-full'>
                    <div className="navbar flex justify-end bg-red-500">

                    </div>
                    <div className="headline ">
                        <div className="heading">
                            <span className="text-2xl font-semibold">Dashboard</span>
                            <hr className='mt-3 mb-3' />
                            <div className='flex justify-between '>
                                <div className="m-3 cards flex justify-between md:flex-row flex-col">
                                    <div class="p-4 transition-shadow border rounded-lg shadow-sm hover:shadow-lg">
                                        <div class="flex items-start justify-between">
                                            <div class="flex flex-col space-y-2">
                                                <span class="text-gray-400">Total Users</span>
                                                <span class="text-lg font-semibold">100,221</span>
                                            </div>
                                            <div class="ml-2 p-10 bg-gray-200 rounded-md"></div>
                                        </div>
                                    </div>

                                </div>

                                <div className="m-3 cards flex justify-between md:flex-row flex-col">
                                    <div class="p-4 transition-shadow border rounded-lg shadow-sm hover:shadow-lg">
                                        <div class="flex items-start justify-between">
                                            <div class="flex flex-col space-y-2">
                                                <span class="text-gray-400">Total Vendors</span>
                                                <span class="text-lg font-semibold">100,221</span>
                                            </div>
                                            <div class="ml-2 p-10 bg-gray-200 rounded-md"></div>
                                        </div>
                                    </div>
                                </div>

                                <div className="m-3 cards flex justify-between md:flex-row flex-col">
                                    <div class="p-4 transition-shadow border rounded-lg shadow-sm hover:shadow-lg">
                                        <div class="flex items-start justify-between">
                                            <div class="flex flex-col space-y-2">
                                                <span class="text-gray-400">Total Events</span>
                                                <span class="text-lg font-semibold">100,221</span>
                                            </div>
                                            <div class="ml-2 p-10 bg-gray-200 rounded-md"></div>
                                        </div>
                                    </div>
                                </div>

                                <div className="m-3 cards flex justify-between md:flex-row flex-col">
                                    <div class="p-4 transition-shadow border rounded-lg shadow-sm hover:shadow-lg">
                                        <div class="flex items-start justify-between">
                                            <div class="flex flex-col space-y-2">
                                                <span class="text-gray-400">Total Offers</span>
                                                <span class="text-lg font-semibold">100,221</span>
                                            </div>
                                            <div class="ml-2 p-10 bg-gray-200 rounded-md"></div>
                                        </div>
                                    </div>

                                </div>
                            </div>


                            <div className="maincontent">
                                <div className="grid md:grid-cols-2 header">
                                    <div className='drop-shadow-xl'>
                                        <div className='h-56 m-3 rounded-lg bg-white flex flex-col space-y-2 justify-center items-center align-middle pb-6 '>
                                            <img className='' src="/images/assets/vendoraddevent.png" alt="" />
                                            <button type="button" onClick={handleClick} className="w-52 text-white bg-[#C0A04C] hover:bg-[#A48533] hover:text-white focus:ring-4  font-medium rounded-lg px-4 py-2 text-center mr-3 md:mr-0  dark:bg-[#C0A04C] dark:hover:bg-white dark:focus:ring-blue-800 flex align-middle items-center justify-center ">
                                                <img className='h-3 mr-3' src="/images/icons/+.svg" alt="" />
                                                <p className='font-bold leading-5'>Add Event</p>
                                            </button>
                                        </div>
                                    </div>
                                    <div className='drop-shadow-xl'>
                                        <div className='h-56 m-3 rounded-lg bg-white flex flex-col space-y-2 justify-center items-center align-middle pb-4 '>
                                            <img className='h-36' src="/images/assets/vendoraddoffer.png" alt="" />
                                            <button type="button" onClick={handleOfferClick} className="w-52 text-white bg-[#C0A04C] hover:bg-[#A48533] hover:text-white focus:ring-4  font-medium rounded-lg px-4 py-2 text-center mr-3 md:mr-0  dark:bg-[#C0A04C] dark:hover:bg-white dark:focus:ring-blue-800 flex align-middle items-center justify-center ">
                                                <img className='h-3 mr-3' src="/images/icons/+.svg" alt="" />
                                                <p className='font-bold leading-5'>Add Offer</p>
                                            </button>

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {showAddEvent && (
                    <div className="fixed inset-0 flex justify-center z-50 overflow-auto bg-[#FFFFFF] bg-opacity-20 backdrop-blur-sm">
                        <div className="relative rounded-lg ">
                            <AddEventModal
                                isOpen={showAddEvent}
                                onClose={closeModal} />
                            {/* Close button */}
                            <button
                                onClick={closeModal}
                                className="absolute top-3 -right-5 m-2 text-gray-600 hover:text-gray-800 focus:outline-none"
                            >
                                <img src="/images/icons/cancel-icon.png" alt="" />
                            </button>
                        </div>
                    </div>
                )}

                {showAddOffer && (
                    <div className="fixed inset-0 flex justify-center z-50 overflow-auto bg-[#FFFFFF] bg-opacity-20 backdrop-blur-sm">
                        <div className="relative rounded-lg ">
                            <AddOfferModal
                                isOpen={showAddOffer}
                                onClose={closeOfferModal} />
                            {/* Close button */}
                            <button
                                onClick={closeOfferModal}
                                className="absolute top-3 -right-5 m-2 text-gray-600 hover:text-gray-800 focus:outline-none"
                            >
                                <img src="/images/icons/cancel-icon.png" alt="" />
                            </button>
                        </div>
                    </div>
                )
                }
            </div>
        </div>
    )
}


export default AdminAdd