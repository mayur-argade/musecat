import React, { useState, useEffect } from 'react'
import Sidebar from '../../components/shared/Sidebar/Sidebar'
import { getAllVenuesAdmin, AdminVerifyVenue } from '../../http/index'
import AddVenueModal from '../../components/EditEventModal/AddVenueModal'
import moment from 'moment'
import { Link, useNavigate } from 'react-router-dom'
import toast, { Toaster } from 'react-hot-toast';

const AdminVenue = () => {
    const [venues, setVenues] = useState([])
    const [loading, setLoading] = useState(false)
    const [showAddVenue, setShowAddVenue] = useState(false)

    const handleCategoryClick = () => {
        setShowAddVenue(true)
    }

    const closeCategoryModel = () => {
        setShowAddVenue(false)
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

    }, []);

    const verifyVenue = async (venueid) => {
        const venuedata = {
            venueid: venueid
        }
        const response = await AdminVerifyVenue(venuedata)

        if (response.data.success == true) {
            toast.success("Venue Verified Successfully")
            window.location.reload()

        }
    }

    if (venues.data == null) {
        return (
            <>
                loading
            </>
        )
    } else {
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
                                                        Venue Address
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
                                            <tbody>
                                                {
                                                    venues.data.map((cat, index) => (
                                                        <tr key={index}>
                                                            <td className="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-900">
                                                                {cat.name}
                                                            </td>
                                                            {/* </Link> */}
                                                            <td className="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-900">
                                                                {cat.address}
                                                            </td>
                                                            <td className="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-900">
                                                                <a href={`${cat.photo}`} target="_blank" rel="noopener noreferrer">Link</a>

                                                            </td>
                                                            <td className="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-900">
                                                                {cat.verified}
                                                            </td>
                                                            <td className="space-x-2 px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-900">
                                                                <button className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600">
                                                                    delete
                                                                </button>
                                                                {
                                                                    cat.verified
                                                                        ?
                                                                        <></>
                                                                        :
                                                                        <button onClick={() => verifyVenue(cat._id)} className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600">
                                                                            Verify
                                                                        </button>
                                                                }
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
            </div>
        )
    }
}

export default AdminVenue