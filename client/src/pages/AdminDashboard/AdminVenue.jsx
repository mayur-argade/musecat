import React, { useState, useEffect } from 'react'
import Sidebar from '../../components/shared/Sidebar/Sidebar'
import { getAllVenuesAdmin, AdminVerifyVenue, AdminDeleteVenue } from '../../http/index'
import AddVenueModal from '../../components/EditEventModal/AddVenueModal'
import moment from 'moment'
import { Link, useNavigate } from 'react-router-dom'
import toast, { Toaster } from 'react-hot-toast';
import EditVenueModel from '../../components/EditEventModal/EditVenueModel'

const AdminVenue = () => {
    const [venues, setVenues] = useState([])
    const [loading, setLoading] = useState(false)
    const [showAddVenue, setShowAddVenue] = useState(false)
    const [selectedVenue, setSelectedVenue] = useState({})
    const [refresh, setRefresh] = useState(false)

    const apiRefreshstate = () => {
        setRefresh(!refresh)
    }

    const handleCategoryClick = () => {
        setShowAddVenue(true)
    }

    const closeCategoryModel = () => {
        setRefresh(!refresh)
        setShowAddVenue(false)
    }

    const [showEditVenue, setShowEditVenue] = useState(false);

    const handleVenueModel = (cat) => {
        setSelectedVenue(cat)
        setShowEditVenue(true)
    }

    const closeVenueModel = () => {
        setShowEditVenue(false)
    }

    useEffect(() => {
        const fetchVenues = async () => {
            setLoading(true)
            try {
                const res = await getAllVenuesAdmin()
                setVenues(res.data)
                setLoading(false)
            } catch (error) {
                setLoading(false)
            }
        }

        fetchVenues()

    }, [refresh]);


    const verifyVenue = async (venueid) => {
        try {
            const venuedata = {
                venueid: venueid
            };

            // Use toast.promise to display a promise-based toast
            const promise = AdminVerifyVenue(venuedata);
            const response = await toast.promise(promise, {
                loading: 'Verifying Venue...',
                success: 'Venue Verified Successfully',
                error: (error) => `Error: ${error.response.data.data}`,
            });

            // Refresh or update the UI as needed after successful verification
            if (response.data.success === true) {
                setRefresh(!refresh);
            }
        } catch (error) {
            console.error(error);
            // No need for a separate toast.error here; it's handled in the promise configuration
        }
    };

    const deleteVenue = async (venueId) => {
        try {
            const body = {
                venueId: venueId
            };

            // Use toast.promise to display a promise-based toast
            const promise = AdminDeleteVenue(body);
            const { data } = await toast.promise(promise, {
                loading: 'Deleting...',
                success: 'Venue Deleted Successfully',
                error: (error) => `Error: ${error.response.data.data}`,
            });

            // Refresh or update the UI as needed after successful deletion
            if (data.success === true) {
                setRefresh(!refresh);
            }

        } catch (error) {
            console.error(error);
            // No need for a separate toast.error here; it's handled in the promise configuration
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
                                <span className="text-2xl font-semibold">Venues</span>
                                <button onClick={() => handleCategoryClick()} className='px-1.5 py-1 bg-blue-800 text-sm text-white rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600 mr-5'>Add Venue</button>
                            </div>

                            <hr className='mt-3 mb-3' />

                            <div className="maincontent flex flex-col">
                                <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
                                    <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                                        <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                            <tr>
                                                <th scope="col" class="px-6 py-3">
                                                    Name
                                                </th>
                                                <th scope="col" class="px-6 py-3">
                                                    Venue Short Description
                                                </th>
                                                <th scope="col" class="px-6 py-3">
                                                    Venue Banner
                                                </th>
                                                <th scope="col" class="px-6 py-3">
                                                    Status
                                                </th>
                                                <th scope="col" class="px-6 py-3">
                                                    Action
                                                </th>
                                            </tr>
                                        </thead>
                                        {
                                            venues.data == null
                                                ?
                                                <tbody>
                                                    <tr >
                                                        <td className="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-900">
                                                            <div class="flex items-center justify-between">
                                                                <div>
                                                                    <div class="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24 mb-2.5"></div>
                                                                </div>
                                                            </div>
                                                        </td>
                                                        {/* </Link> */}
                                                        <td className="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-900 w-96">
                                                            <div class="flex items-center justify-between">
                                                                <div>
                                                                    <div class="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24 mb-2.5"></div>
                                                                </div>
                                                            </div>
                                                        </td>
                                                        <td className="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-900">
                                                            <div class="flex items-center justify-between">
                                                                <div>
                                                                    <div class="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24 mb-2.5"></div>
                                                                </div>
                                                            </div>
                                                        </td>
                                                        <td className="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-900">
                                                            <div class="flex items-center justify-between">
                                                                <div>
                                                                    <div class="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24 mb-2.5"></div>
                                                                </div>
                                                            </div>                                                        </td>
                                                        <td className="space-x-3 px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-900">
                                                            <div class="flex items-center justify-between">
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
                                                        venues.data.map((cat, index) => (
                                                            <tr key={index}>
                                                                <td className="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-900">
                                                                    {cat.name}
                                                                </td>
                                                                {/* </Link> */}
                                                                <td className="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-900 w-96">
                                                                    {cat.address}
                                                                </td>
                                                                <td className="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-900">
                                                                    <a href={`${cat.photo}`} target="_blank" rel="noopener noreferrer">Link</a>

                                                                </td>
                                                                <td className="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-900">
                                                                    {cat.verified ? "Verified" : "Unverified"}
                                                                </td>
                                                                <td className="space-x-3 px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-900">
                                                                    <button onClick={() => deleteVenue(cat._id)} className="h-6 w-6">
                                                                        <img src="/images/icons/delete.png" alt="" />
                                                                    </button>
                                                                    {
                                                                        cat.verified
                                                                            ?
                                                                            <></>
                                                                            :
                                                                            <button onClick={() => verifyVenue(cat._id)} className="text-white rounded-md h-6 w-6">
                                                                                <img src="/images/icons/done.png" alt="" />
                                                                            </button>
                                                                    }
                                                                    <button onClick={() => handleVenueModel(cat)} className="h-6 w-6">
                                                                        <img src="/images/icons/adminEdit.png" alt="" />
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
            {showAddVenue && (
                <div className="fixed inset-0 flex justify-center z-50 overflow-auto bg-[#FFFFFF] bg-opacity-20 backdrop-blur-sm">
                    <div className="relative rounded-lg ">
                        <AddVenueModal
                            isOpen={showAddVenue}
                            onClose={closeCategoryModel} />
                        {/* Close button */}
                        <button
                            onClick={closeCategoryModel}
                            className="absolute top-3 -right-5 m-2 text-gray-600 hover:text-gray-800 focus:outline-none"
                        >
                            <img src="/images/icons/cancel-icon.png" alt="" />
                        </button>
                    </div>
                </div>
            )
            }

            {showEditVenue && (
                <div className="fixed inset-0 flex justify-center z-50 overflow-auto bg-[#FFFFFF] bg-opacity-20 backdrop-blur-sm">
                    <div className="relative rounded-lg ">
                        <EditVenueModel
                            isOpen={showEditVenue}
                            onClose={closeVenueModel}
                            data={selectedVenue}
                            apiRefreshstate={apiRefreshstate}
                        />
                        {/* Close button */}
                        <button
                            onClick={closeVenueModel}
                            className="absolute top-3 -right-5 m-2 text-gray-600 hover:text-gray-800 focus:outline-none"
                        >
                            <img src="/images/icons/cancel-icon.png" alt="" />
                        </button>
                    </div>
                </div>
            )
            }

        </div>
    )
}

export default AdminVenue