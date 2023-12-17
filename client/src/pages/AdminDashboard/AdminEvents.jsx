import React, { useState, useEffect } from 'react'
import Sidebar from '../../components/shared/Sidebar/Sidebar'
import AddEventModal from '../../components/EditEventModal/AddEventModal'
import { AdminDeleteEvent, getEventsForAdmin, AdminVerifyEvent } from '../../http/index'
import moment from 'moment'
import { Link, useNavigate } from 'react-router-dom'
import toast, { Toaster } from 'react-hot-toast';


const AdminEvents = () => {

    const [showAddEvent, setShowAddEvent] = useState(false)
    const [events, setEvents] = useState([])
    const [loading, setLoading] = useState(false)
    const [refresh, setRefresh] = useState(false)
    const navigate = useNavigate()
    useEffect(() => {
        const fetchEvents = async () => {
            setLoading(true)
            try {
                const res = await getEventsForAdmin()
                setEvents(res.data)
                setLoading(false)
            } catch (error) {
                setLoading(false)
            }
        }

        fetchEvents()

    }, [refresh]);

    const closeModal = () => {
        setShowAddEvent(false);
    };

    const handleClick = () => {
        setShowAddEvent(true)
    }



    const deleteEvent = async (eventid) => {
        setLoading(true);
        try {
            const promise = AdminDeleteEvent({ eventid });
            await toast.promise(promise, {
                loading: 'Deleting Event...', // Optional loading message
                success: 'Event Deleted Successfully', // Optional success message
                error: 'Error deleting event:', // Optional error message prefix
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
                loading: 'Verifying Event...', // Optional loading message
                success: 'Event Verified Successfully', // Optional success message
                error: 'Error verifying event:', // Optional error message prefix
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

                <div>
                    <Sidebar />
                </div>
                <Toaster />
                <div className='pl-20 flex flex-col w-full'>
                    <div className="mt-7"></div>
                    <div className="headline ">
                        <div className="heading">
                            <div className="flex justify-between">
                                <span className="text-2xl font-semibold">Events</span>
                                <button onClick={handleClick} className='px-1.5 py-1 bg-blue-800 text-sm text-white rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600 mr-5'>Add Event</button>
                            </div>
                            <hr className='mt-3 mb-3' />

                            <div className="maincontent flex flex-col">
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
                                                events.data == null
                                                    ?
                                                    <tbody>
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
                                                            events.data.map((event, index) => (
                                                                <tr key={event._id}>
                                                                    <Link to={`/admin/event/${event._id}`}>
                                                                        <td className="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-900">
                                                                            {event.title}
                                                                        </td>
                                                                    </Link>
                                                                    <td className="text-center px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-900">
                                                                        {event.vendorid.firstname}
                                                                    </td>
                                                                    <td className="text-center px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-900">
                                                                        {event.eventCategory.map(subcategory => subcategory.name).join(', ')}
                                                                    </td>
                                                                    <td className="flex justify-center px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-900">
                                                                        {event.verified ?
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
                                                                        {event.location?.name || ""}
                                                                    </td>
                                                                    <td className="text-center px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-900">
                                                                        {moment(event.createdAt).format('DD-MM-YYYY')}
                                                                    </td>
                                                                    <td className="flex justify-center px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-900 space-x-2">
                                                                        <button onClick={() => deleteEvent(event._id)} className="h-6 w-6">
                                                                            <img src="/images/icons/delete.png" alt="" />
                                                                        </button>
                                                                        {
                                                                            event.verified
                                                                                ?
                                                                                <></>
                                                                                :
                                                                                <button onClick={(() => verifyEvent(event._id))} className=" h-6 w-6">
                                                                                    <img src="/images/icons/done.png" alt="" />
                                                                                </button>
                                                                        }
                                                                        <button onClick={(() => navigate(`/admin/event/${event._id}`))} className="h-6 w-6">
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

        </div>
    )

}

export default AdminEvents