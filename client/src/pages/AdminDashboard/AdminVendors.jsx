import React, { useState, useEffect } from 'react'
import { AdminListVendors, AdminDeleteVendor, AdminVerifyVendor } from '../../http/index'
import Sidebar from '../../components/shared/Sidebar/Sidebar'
import AddVendorModal from '../../components/EditEventModal/AddVendorModal'
import toast, { Toaster } from 'react-hot-toast';

const AdminVendors = () => {

    const [loading, setLoading] = useState(false)
    const [deleteLoading, setDeleteLoading] = useState(false)
    const [users, setUsers] = useState([])
    const [showAddVendor, setShowAddVendor] = useState(false)

    useEffect(() => {
        const fetchUsers = async () => {
            setLoading(true)
            try {
                const res = await AdminListVendors()
                setUsers(res.data)
                setLoading(false)
            } catch (error) {
                setLoading(false)
            }
        }

        fetchUsers()

    }, []);

    const deleteUser = async (userid) => {
        const data = {
            vendorid: userid
        }
        try {
            setDeleteLoading(true)
            const res = await AdminDeleteVendor(data)
            setDeleteLoading(false)
            toast.success(res.data.data)
            window.location.reload()
        } catch (error) {
            setDeleteLoading(false)
            toast.error(error.response.data.data)
            console.log(error)
        }
    }

    const verifyUsers = async (vendorid) => {
        setLoading(true)
        try {

            const offerdata = {
                vendorid: vendorid
            }

            const res = await AdminVerifyVendor(offerdata)
            toast.success("Vendor verified")
            window.location.reload()
        } catch (error) {
            toast.error(error.response.data.data)
        }
    }

    const handleVendorClick = () => {
        setShowAddVendor(true)
    }

    const closeVendorModal = () => {
        setShowAddVendor(false)
    }

    console.log(users.data)

    if (users.data == null) {
        return (
            <>
                "loading"
            </>
        )
    } else {
        return (
            <div> <div>
                <div className='flex '>

                    <div>
                        <Sidebar />
                    </div>

                    <div className='pl-20 flex flex-col w-full'>
                        <Toaster />
                        <div className="mt-7"></div>
                        <div className="headline ">
                            <div className="heading">
                                <div className="flex justify-between">
                                    <span className="text-2xl font-semibold">Vendors</span>
                                    <button onClick={handleVendorClick} className='px-1.5 py-1 bg-blue-800 text-sm text-white rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600 mr-5'>Add Vendor</button>

                                </div>
                                <hr className='mt-3 mb-3' />

                                <div className="maincontent flex flex-col">
                                    <div className="recentOffers mt-4">
                                        <div className='table1 h-auto shadow-md'>
                                            <div className="overflow-x-auto">

                                                <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
                                                    <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                                                        <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                                            <tr>
                                                                <th scope="col" class="px-6 py-3">
                                                                    Email
                                                                </th>
                                                                <th scope="col" class="px-6 py-3">
                                                                    Firstname
                                                                </th>
                                                                <th scope="col" class="px-6 py-3">
                                                                    lastname
                                                                </th>
                                                                <th scope="col" class="px-6 py-3">
                                                                    Company Name
                                                                </th>
                                                                <th scope="col" class="px-6 py-3">
                                                                    Mobile Number
                                                                </th>
                                                                <th scope="col" class="px-6 py-3">
                                                                    Action
                                                                </th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            {
                                                                users.data.map((user) => (
                                                                    <tr>
                                                                        <td className="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-900">
                                                                            {user.email}
                                                                        </td>
                                                                        <td className="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-900">
                                                                            {user.firstname}
                                                                        </td>
                                                                        <td className="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-900">
                                                                            {user.lastname}
                                                                        </td>
                                                                        <td className="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-900">
                                                                            {user.companyname}
                                                                        </td>
                                                                        <td className="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-900">
                                                                            {user.mobilenumber}
                                                                        </td>
                                                                        <td className="space-x-2 px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-900">
                                                                            <button onClick={() => deleteUser(user._id)} className="px-4 py-2  bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600">

                                                                                <p>
                                                                                    Delete
                                                                                </p>

                                                                            </button>
                                                                            {
                                                                                user.isVerified
                                                                                    ?
                                                                                    <></>
                                                                                    :
                                                                                    <button onClick={() => verifyUsers(user._id)} className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600">
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
                        </div>
                    </div>
                </div>
            </div>

                {showAddVendor && (
                    <div className="fixed inset-0 flex justify-center z-50 overflow-auto bg-[#FFFFFF] bg-opacity-20 backdrop-blur-sm">
                        <div className="relative rounded-lg ">
                            <AddVendorModal
                                isOpen={showAddVendor}
                                onClose={closeVendorModal} />

                            <button
                                onClick={closeVendorModal}
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

export default AdminVendors