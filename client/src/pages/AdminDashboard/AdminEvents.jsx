import React, { useState, useEffect } from 'react'
import Sidebar from '../../components/shared/Sidebar/Sidebar'
import AddEventModal from '../../components/EditEventModal/AdminAddEventModal'
import { AdminDeleteEvent, getCategoryEvents } from '../../http/index'
import moment from 'moment'
import { Link } from 'react-router-dom'

const AdminEvents = () => {

    const [showAddEvent, setShowAddEvent] = useState(false)
    const [events, setEvents] = useState([])
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        const fetchEvents = async () => {
            setLoading(true)
            try {
                const res = await getCategoryEvents('events')
                setEvents(res.data)
                setLoading(false)
            } catch (error) {
                setLoading(false)
            }
        }

        fetchEvents()

    }, []);

    const closeModal = () => {
        setShowAddEvent(false);
    };

    const handleClick = () => {
        setShowAddEvent(true)
    }

    const deleteEvent = async (eventid) => {
        console.log(eventid)
        setLoading(true)
        try {
            console.log("eventid", eventid)

            const offerdata = {
                eventid: eventid
            }

            const res = await AdminDeleteEvent(offerdata)
            window.alert(res.data.data)
            window.location.reload()
        } catch (error) {

        }
    }


    if (events.data == null) {
        return (
            <>
                "loading"
            </>
        )
    }
    else {
        return (
            <div>
                <div className='flex '>

                    <div>
                        <Sidebar />
                    </div>

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
                                                        <th scope="col" class="px-6 py-3">
                                                            Event Name
                                                        </th>
                                                        <th scope="col" class="px-6 py-3">
                                                            Vendor ID
                                                        </th>
                                                        <th scope="col" class="px-6 py-3">
                                                            Category
                                                        </th>
                                                        <th scope="col" class="px-6 py-3">
                                                            Date
                                                        </th>
                                                        <th scope="col" class="px-6 py-3">
                                                            Venue
                                                        </th>
                                                        <th scope="col" class="px-6 py-3">
                                                            Price starts from
                                                        </th>

                                                        <th scope="col" class="px-6 py-3">
                                                            Action
                                                        </th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {
                                                        events.data.map((event, index) => (
                                                            <tr key={event._id}>
                                                                <Link to={`/admin/event/${event._id}`}>
                                                                    <td className="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-900">
                                                                        {event.title}
                                                                    </td>
                                                                </Link>
                                                                <td className="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-900">
                                                                    {event.vendorid}
                                                                </td>
                                                                <td className="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-900">
                                                                    {event.category}
                                                                </td>
                                                                <td className="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-900">
                                                                    {moment(event.date).format("DD-MM-YYYY")}
                                                                </td>
                                                                <td className="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-900">
                                                                    {event.location}
                                                                </td>
                                                                <td className="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-900">
                                                                    {event.silverPrice}
                                                                </td>
                                                                <td className="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-900">
                                                                    <button onClick={() => deleteEvent(event._id)} className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600">
                                                                        delete
                                                                    </button>
                                                                </td>
                                                            </tr>
                                                        ))
                                                    }
                                                </tbody>
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
}

export default AdminEvents