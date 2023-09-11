import React, { useState, useEffect } from 'react'
import Navbar from '../../components/shared/Navbar/Navbar'
import PastPurchaseCard from '../../components/Cards/PastPurchaseCard'
import VendorOfferCard from '../../components/Cards/VendorOfferCard'
import Footer from '../../components/shared/Footer/Footer'
import { Link } from 'react-router-dom'
import { VendorHomeApi } from '../../http'
import AddEventModal from '../../components/EditEventModal/AddEventModal'
import AddOfferModal from '../../components/EditEventModal/AddOfferModal'

const VendorHome = () => {

    document.title = 'Vendor ~ Home'

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

    useEffect(() => {
        const fetchdata = async () => {
            try {
                const { data } = await VendorHomeApi()
                // console.log(data.data)
                setReponse(data)
            } catch (error) {
                console.log(error)
            }
        }

        fetchdata()
    }, []);

    // console.log(response)

    if (response.data == null) {
        return (<div className='h-screen w-full flex justify-center align-middle items-center'>
            <img src="/images/icons/loadmain.svg" alt="" />
        </div>)
    }
    else {
        return (
            <div>
                <Navbar />
                <section className='md:mr-48 md:ml-48 mt-5 ml-6 mr-6'>
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


                    <div className='mt-5 flex flex-col'>
                        <span className='font-bold text-2xl'>Ongoing Events</span>
                        <div className="carousel p-4 flex items-center justify-start overflow-x-auto scroll-smooth md:scrollbar-hide   justify-between">
                            {response.data.ongoingEvents != 0 ?
                                response.data.ongoingEvents.map((event) => (
                                    <Link to={`/vendor/${event._id}/bookedtickets`}>
                                        <div key={event._id} className=" flex-shrink-0">
                                            <PastPurchaseCard data={event} />
                                        </div>
                                    </Link>
                                )) : <div>no ongoing events..</div>
                            }
                        </div>
                        <Link className='flex justify-end text-right' to="/vendor/hostedevents">
                            {
                                response.data.ongoingEvents != 0 ? <span className='text-right underline underline-gray-500 mr-3 cursor-pointer text-sm text-gray-500'>view all</span> : <span></span>
                            }

                        </Link>
                    </div>

                    <div className='mt-5 flex flex-col'>
                        <span className='font-bold text-2xl'>Ongoing Offers</span>
                        <div className="ml-3 md:flex md:justify-start carousel snap-x p-4 flex items-center justify-start overflow-x-auto scrollbar-hide space-x-3 md:space-x-5">
                            {response.data.ongoingOffers.map((offer) => (
                                <div key={offer._id} className=" flex-shrink-0">
                                    <VendorOfferCard data={offer} />
                                </div>
                            ))
                            }
                        </div>
                        <span className='text-right underline underline-gray-500 mr-3 cursor-pointer text-sm text-gray-500'>view all</span>
                    </div>
                </section >

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

                <div className=''>
                    < Footer />
                </div>
            </div >
        )
    }

}

export default VendorHome