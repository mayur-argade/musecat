import React, { useState, useEffect } from 'react'
import Sidebar from '../../components/shared/Sidebar/Sidebar'
import { AdminListUsers, AdminDeleteUser } from '../../http/index'
import { Link } from 'react-router-dom'
import toast, { Toaster } from 'react-hot-toast';
import AdminNavbar from '../../components/shared/Navbar/AdminNavbar';
const AdminUsers = () => {

    const [loading, setLoading] = useState(false)
    const [users, setUsers] = useState([])
    const [refresh, setRefresh] = useState(false)


    useEffect(() => {
        const fetchUsers = async () => {
            setLoading(true)
            try {
                const res = await AdminListUsers()
                setUsers(res.data)
                setLoading(false)
            } catch (error) {
                setLoading(false)
            }
        }

        fetchUsers()

    }, [refresh]);


    const deleteUser = async (userid) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this user?");

        if(confirmDelete){
            setLoading(true);

        const data = {
            userid: userid
        };

        try {
            // Use toast.promise to display a promise-based toast
            const promise = AdminDeleteUser(data);
            const res = await toast.promise(promise, {
                loading: 'Deleting User...',
                success: 'User Deleted Successfully',
                error: (error) => `Error: ${error.response.data.data}`,
            });

            // Reload the page only if the response indicates success
            if (res.data.success === true) {
                setRefresh(!refresh)
            }
        } catch (error) {
            toast.error(error.response.data.data);
        }
        }
    };


    return (
        <div>
            <div className='flex'>

                <div className='z-20'>
                    <Sidebar />
                </div>
                <Toaster />
                <div className='pl-20 flex flex-col w-full'>
                <div className='mx-4'>
                        <AdminNavbar />
                        <hr className='mb-3' />
                    </div>
                    <div className="headline ">
                        <div className="heading mx-4 pb-20 z-10">
                            <div className="head">
                                <span className="text-2xl font-semibold">Users</span>
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
                                                                username
                                                            </th>
                                                            <th scope="col" class="px-6 py-3">
                                                                firstname
                                                            </th>
                                                            <th scope="col" class="px-6 py-3">
                                                                lastname
                                                            </th>
                                                            <th scope="col" class="px-6 py-3">
                                                                Mobile number
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
                                                                            {/* <Link className='w-full' to={`/profile/${user._id}`}> */}
                                                                                <td className="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-900">
                                                                                    {user.email}
                                                                                </td>
                                                                            {/* </Link> */}
                                                                            <td className="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-900">
                                                                                {user.username}
                                                                            </td>
                                                                            <td className="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-900">
                                                                                {user.firstname}
                                                                            </td>
                                                                            <td className="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-900">
                                                                                {user.lastname}
                                                                            </td>
                                                                            <td className="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-900">
                                                                                {user.mobilenumber}
                                                                            </td>
                                                                            <td className="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-900">
                                                                                <button onClick={() => deleteUser(user._id)} className="h-6 w-6">
                                                                                    <img src="/images/icons/delete.png" alt="" />
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
                </div>
            </div>
        </div>
    )

}

export default AdminUsers