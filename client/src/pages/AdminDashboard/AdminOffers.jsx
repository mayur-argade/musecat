import React, { useState, useEffect } from 'react'
import Sidebar from '../../components/shared/Sidebar/Sidebar'
import { getOffersForAdmin, AdminDeleteEvent, AdminVerifyEvent } from '../../http'
import AddOfferModal from '../../components/EditEventModal/AddOfferModal'
import moment from 'moment'
import { Link, useNavigate } from 'react-router-dom'
import { toast, Toaster } from 'react-hot-toast'

const AdminOffers = () => {
    const navigate = useNavigate()
    const [offers, setOffers] = useState([])
    const [loading, setLoading] = useState(false)
    const [showAddOffer, setShowAddOffer] = useState(false)
    const [refresh, setRefresh] = useState(false)

    useEffect(() => {
        const fetchOffers = async () => {
            setLoading(true)
            try {
                const res = await getOffersForAdmin()
                setOffers(res.data)

                setLoading(false)
            } catch (error) {
                setLoading(false)
            }
        }

        fetchOffers()

    }, [refresh]);

    const closeOfferModal = () => {
        setShowAddOffer(false)
    }

    const handleOfferClick = () => {
        setShowAddOffer(true)
    }


    const deleteEvent = async (eventid) => {
        setLoading(true);
        try {
            const promise = AdminDeleteEvent({ eventid });
            await toast.promise(promise, {
                loading: 'Deleting Offer...', // Optional loading message
                success: 'Offer Deleted Successfully', // Optional success message
                error: 'Error deleting offer:', // Optional error message prefix
            });

            setRefresh(!refresh)
        } catch (error) {
            // Handle errors if needed
        } finally {
            setLoading(false);
        }
    };

    const verifyEvent = async (eventid) => {
        setLoading(true);
        try {
            const promise = AdminVerifyEvent({ eventid });
            await toast.promise(promise, {
                loading: 'Verifying Offer...', // Optional loading message
                success: 'Offer Verified Successfully', // Optional success message
                error: (error) => `Error: ${error.response.data.data}`,
            });

            setRefresh(!refresh)
        } catch (error) {
            // Handle errors if needed
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <div className='flex '>
                <Toaster />
                <div>
                    <Sidebar />
                </div>

                <div className='pl-20 flex flex-col w-full'>
                    <div className="mt-7"></div>
                    <div className="headline ">
                        <div className="heading">
                            <div className="flex justify-between">
                                <span className="text-2xl font-semibold">Offers</span>
                                <button onClick={handleOfferClick} className='px-1.5 py-1 bg-blue-800 text-sm text-white rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600 mr-5'>Add Offer</button>

                            </div>
                            <hr className='mt-3 mb-3' />

                            <div className="maincontent flex flex-col">
                                <div className="recentOffers mt-4">
                                    <div className="overflow-x-auto">

                                        <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
                                            <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                                                <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                                    <tr>
                                                        <th scope="col" class="text-center px-6 py-3">
                                                            Event Name
                                                        </th>
                                                        <th scope="col" class="text-center px-6 py-3">
                                                            Vendor
                                                        </th>
                                                        <th scope="col" class="text-center px-6 py-3">
                                                            Category
                                                        </th>
                                                        <th scope="col" class="text-center px-6 py-3">
                                                            Status
                                                        </th>
                                                        <th scope="col" class="text-center px-6 py-3">
                                                            Venue
                                                        </th>
                                                        <th scope="col" class="text-center px-6 py-3">
                                                            Created Date
                                                        </th>
                                                        <th scope="col" class="text-center px-6 py-3">
                                                            Action
                                                        </th>
                                                    </tr>
                                                </thead>
                                                {
                                                    offers.data == null
                                                        ?
                                                        <tbody>
                                                            <tr >
                                                                <td className="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-900">
                                                                    <div class="flex items-center animate-pulse justify-between">
                                                                        <div>
                                                                            <div class="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24 mb-2.5"></div>
                                                                        </div>
                                                                    </div>
                                                                </td>
                                                                {/* </Link> */}
                                                                <td className="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-900 w-96">
                                                                    <div class="flex items-center justify-between animate-pulse">
                                                                        <div>
                                                                            <div class="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24 mb-2.5"></div>
                                                                        </div>
                                                                    </div>
                                                                </td>
                                                                <td className="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-900">
                                                                    <div class="flex items-center justify-between animate-pulse">
                                                                        <div>
                                                                            <div class="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24 mb-2.5"></div>
                                                                        </div>
                                                                    </div>
                                                                </td>
                                                                <td className="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-900">
                                                                    <div class="flex items-center justify-between animate-pulse">
                                                                        <div>
                                                                            <div class="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24 mb-2.5"></div>
                                                                        </div>
                                                                    </div>                                                        </td>
                                                                <td className="space-x-3 px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-900">
                                                                    <div class="flex items-center justify-between animate-pulse">
                                                                        <div>
                                                                            <div class="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24 mb-2.5"></div>
                                                                        </div>
                                                                    </div>
                                                                </td>
                                                            </tr>
                                                            <tr >
                                                            <td className="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-900">
                                                                <div class="flex items-center justify-between animate-pulse">
                                                                    <div>
                                                                        <div class="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24 mb-2.5"></div>
                                                                    </div>
                                                                </div>
                                                            </td>
                                                            {/* </Link> */}
                                                            <td className="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-900 w-96">
                                                                <div class="flex items-center justify-between animate-pulse">
                                                                    <div>
                                                                        <div class="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24 mb-2.5"></div>
                                                                    </div>
                                                                </div>
                                                            </td>
                                                            <td className="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-900">
                                                                <div class="flex items-center justify-between animate-pulse">
                                                                    <div>
                                                                        <div class="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24 mb-2.5"></div>
                                                                    </div>
                                                                </div>
                                                            </td>
                                                            <td className="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-900">
                                                                <div class="flex items-center justify-between animate-pulse">
                                                                    <div>
                                                                        <div class="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24 mb-2.5"></div>
                                                                    </div>
                                                                </div>
                                                            </td>
                                                            <td className="space-x-3 px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-900">
                                                                <div class="flex items-center justify-between animate-pulse">
                                                                    <div>
                                                                        <div class="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24 mb-2.5"></div>
                                                                    </div>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                        <tr >
                                                            <td className="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-900">
                                                                <div class="flex items-center justify-between animate-pulse">
                                                                    <div>
                                                                        <div class="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24 mb-2.5"></div>
                                                                    </div>
                                                                </div>
                                                            </td>
                                                            {/* </Link> */}
                                                            <td className="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-900 w-96">
                                                                <div class="flex items-center justify-between animate-pulse">
                                                                    <div>
                                                                        <div class="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24 mb-2.5"></div>
                                                                    </div>
                                                                </div>
                                                            </td>
                                                            <td className="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-900">
                                                                <div class="flex items-center justify-between animate-pulse">
                                                                    <div>
                                                                        <div class="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24 mb-2.5"></div>
                                                                    </div>
                                                                </div>
                                                            </td>
                                                            <td className="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-900">
                                                                <div class="flex items-center justify-between animate-pulse">
                                                                    <div>
                                                                        <div class="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24 mb-2.5"></div>
                                                                    </div>
                                                                </div>
                                                            </td>
                                                            <td className="space-x-3 px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-900">
                                                                <div class="flex items-center justify-between animate-pulse">
                                                                    <div>
                                                                        <div class="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24 mb-2.5"></div>
                                                                    </div>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                        <tr >
                                                            <td className="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-900">
                                                                <div class="flex items-center justify-between animate-pulse">
                                                                    <div>
                                                                        <div class="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24 mb-2.5"></div>
                                                                    </div>
                                                                </div>
                                                            </td>
                                                            {/* </Link> */}
                                                            <td className="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-900 w-96">
                                                                <div class="flex items-center justify-between animate-pulse">
                                                                    <div>
                                                                        <div class="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24 mb-2.5"></div>
                                                                    </div>
                                                                </div>
                                                            </td>
                                                            <td className="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-900">
                                                                <div class="flex items-center justify-between animate-pulse">
                                                                    <div>
                                                                        <div class="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24 mb-2.5"></div>
                                                                    </div>
                                                                </div>
                                                            </td>
                                                            <td className="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-900">
                                                                <div class="flex items-center justify-between animate-pulse">
                                                                    <div>
                                                                        <div class="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24 mb-2.5"></div>
                                                                    </div>
                                                                </div>
                                                            </td>
                                                            <td className="space-x-3 px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-900">
                                                                <div class="flex items-center justify-between animate-pulse">
                                                                    <div>
                                                                        <div class="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24 mb-2.5"></div>
                                                                    </div>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                        </tbody>
                                                        :
                                                        <tbody>
                                                            {
                                                                offers.data.map((offer, index) => (
                                                                    <tr key={offer._id}>
                                                                        <Link to={`/admin/event/${offer._id}`}>
                                                                            <td className="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-900">
                                                                                {offer.title}
                                                                            </td>
                                                                        </Link>
                                                                        <td className="text-center px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-900">
                                                                            {offer.vendorid.firstname}
                                                                        </td>
                                                                        <td className="text-center px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-900">
                                                                            {offer.eventCategory.map(subcategory => subcategory.name).join(', ')}
                                                                        </td>
                                                                        <td className="flex justify-center px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-900">
                                                                            {offer.verified ?
                                                                                <span className='bg-green-100 text-green-800 text-xs font-medium ml-0 px-2.5 py-0.5 rounded-full dark:bg-green-900 dark:text-green-300'>
                                                                                    Verified
                                                                                </span>
                                                                                :
                                                                                <span className='bg-red-100 text-red-800 text-xs font-medium ml-0 px-2.5 py-0.5 rounded-full dark:bg-red-900 dark:text-red-300'>
                                                                                    Unverified
                                                                                </span>

                                                                            }
                                                                        </td>
                                                                        <td className="text-center px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-900">
                                                                            {offer.location?.name || ""}
                                                                        </td>
                                                                        <td className="text-center px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-900">
                                                                            {moment(offer.createdAt).format('DD-MM-YYYY')}
                                                                        </td>
                                                                        <td className="flex justify-center px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-900 space-x-2">
                                                                            <button onClick={() => deleteEvent(offer._id)}className="h-6 w-6">
                                                                            <img src="/images/icons/delete.png" alt="" />
                                                                            </button>
                                                                            {
                                                                                offer.verified
                                                                                    ?
                                                                                    <></>
                                                                                    :
                                                                                    <button onClick={(() => verifyEvent(offer._id))} className="h-6 w-6">
                                                                                       <img src="/images/icons/done.png" alt="" />
                                                                                    </button>
                                                                            }
                                                                            <button onClick={(() => navigate(`/admin/event/${offer._id}`))} className="h-6 w-6">
                                                                            <img src="/images/icons/eye.png" alt="" />
                                                                            </button>
                                                                        </td>
                                                                    </tr>
                                                                ))
                                                            }
                                                        </tbody>
                                                }
                                            </table>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

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
    // }
}

export default AdminOffers