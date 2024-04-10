import React, { useState, useEffect } from 'react'
import { AdminListVendors, AdminDeleteVendor, AdminVerifyVendor } from '../../http/index'
import Sidebar from '../../components/shared/Sidebar/Sidebar'
import AddVendorModal from '../../components/EditEventModal/AddVendorModal'
import toast, { Toaster } from 'react-hot-toast';
import { Link } from 'react-router-dom'
import AdminNavbar from '../../components/shared/Navbar/AdminNavbar'

const AdminVendors = () => {

    const [loading, setLoading] = useState(false)
    const [deleteLoading, setDeleteLoading] = useState(false)
    const [users, setUsers] = useState([])
    const [showAddVendor, setShowAddVendor] = useState(false)
    const [refresh, setRefresh] = useState(false)

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

    }, [refresh]);

    const deleteUser = async (userid) => {
        const confirm = window.confirm("Are you sure you want to delete this vendor ?")

        if (confirm) {
            const data = {
                vendorid: userid
            };

            try {
                // Use toast.promise to display a promise-based toast
                const promise = AdminDeleteVendor(data);
                const res = await toast.promise(promise, {
                    loading: 'Deleting User...',
                    success: (response) => response.data.data,
                    error: (error) => `Error: ${error.response.data.data}`,
                });

                // Refresh or update the UI as needed after successful deletion
                if (res.data.success === true) {
                    setRefresh(!refresh);
                }
            } catch (error) {
                toast.error(error.response.data.data);
                console.error(error);
            }
        }
    };

    const verifyUsers = async (vendorid) => {
        setLoading(true);

        try {
            const offerdata = {
                vendorid: vendorid
            };

            // Use toast.promise to display a promise-based toast
            await toast.promise(AdminVerifyVendor(offerdata), {
                loading: 'Verifying Vendor...',
                success: 'Vendor Verified Successfully',
                error: (error) => `Error: ${error.response.data.data}`,
            });

            // Refresh or update the UI as needed after successful verification
            setRefresh(!refresh);
        } catch (error) {
            toast.error(error.response.data.data);
        }
    };

    const handleVendorClick = () => {
        setShowAddVendor(true)
    }

    const closeVendorModal = () => {
        setRefresh(!refresh)
        setShowAddVendor(false)
    }

    return (
        <div>
            <div>
                <div className='flex '>

                    <div className='z-20'>
                        <Sidebar />
                    </div>

                    <div className='pl-20 flex flex-col w-full'>
                        <Toaster />
                        <div className='mx-4'>
                            <AdminNavbar />
                            <hr className='mb-3' />
                        </div>
                        <div className="headline ">
                            <div className="heading">
                                <div className="flex justify-between">
                                    <span className="text-2xl font-semibold">Vendors</span>
                                    <button onClick={handleVendorClick} className='px-1.5 py-1 bg-blue-800 text-sm text-white rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600 mr-5'>Add Vendor</button>

                                </div>
                                <hr className='mt-3 mb-3' />

                                <div className="z-10 maincontent flex flex-col mx-4">
                                    <div className="recentOffers mt-4">
                                        <div className='table1 h-auto shadow-md'>
                                            <div className="overflow-x-auto">

                                                <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
                                                    <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                                                        <thead class="z-10 text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
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
                                                        {
                                                            users.data == null
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
                                                                        users.data.map((user) => (
                                                                            <tr>
                                                                                <Link className='w-full' to={`/admin/profile/${user._id}`}>
                                                                                    <td className="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-900">
                                                                                        {user.email}
                                                                                    </td>
                                                                                </Link>
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
                                                                                    <button onClick={() => deleteUser(user._id)} className="rounded-md h-6 w-6">
                                                                                        <img src="/images/icons/delete.png" alt="" />
                                                                                    </button>
                                                                                    {
                                                                                        user.isVerified
                                                                                            ?
                                                                                            <></>
                                                                                            :
                                                                                            <button onClick={() => verifyUsers(user._id)} className="text-white rounded-md h-6 w-6">
                                                                                                <img src="/images/icons/done.png" alt="" />
                                                                                            </button>
                                                                                    }
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
                    </div>
                </div>
            </div>

            {
                showAddVendor && (
                    <div className='calendar-overlay'>
                        <div className="rounded-md">
                            <div className="relative rounded-lg ">
                                <AddVendorModal
                                    isOpen={showAddVendor}
                                    onClose={closeVendorModal} />

                                <button
                                    onClick={closeVendorModal}
                                    className="absolute top-0 right-0 m-2 text-gray-600 hover:text-gray-800 focus:outline-none"
                                >
                                    <img src="/images/icons/cancel-icon.png" alt="" />
                                </button>
                            </div>
                        </div>
                    </div>
                )
            }
        </div >
    )
}

export default AdminVendors