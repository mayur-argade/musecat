import React, { useState, useEffect } from 'react'
import Sidebar from '../../components/shared/Sidebar/Sidebar'
import { AdminListUsers, AdminDeleteUser } from '../../http/index'
import { Link } from 'react-router-dom'

const AdminUsers = () => {

    const [loading, setLoading] = useState(false)
    const [users, setUsers] = useState([])

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

    }, []);

    const deleteUser = async (userid) => {
        setLoading(true);

        const data = {
            userid: userid
        };

        try {
            const res = await AdminDeleteUser(data);

            if (res.data.success === true) {
                window.location.reload();
                // Reload the page only if the response indicates success
            }
        } catch (error) {
            // Handle errors here
        }
    };

    console.log(users.data)

    if (users.data == null) {
        return (
            <>
                "loading"
            </>
        )
    }
    else {
        return (
            <div>
                <div className='flex'>

                    <div>
                        <Sidebar />
                    </div>

                    <div className='pl-20 flex flex-col w-full'>
                        <div className="navbar flex justify-end ml-10 mr-10 space-x-8">
                            <div className='space-x-8'>
                                <button >
                                    <img src="/images/icons/notification.svg" alt="" />
                                </button>
                                <button>
                                    <img src="/images/icons/setting.svg" alt="" />
                                </button>
                            </div>
                        </div>
                        <div className="headline ">
                            <div className="heading">
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
                                                        <tbody>
                                                            {
                                                                users.data.map((user) => (
                                                                    <tr>
                                                                        <Link className='w-full' to={`/profile/${user._id}`}>
                                                                            <td className="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-900">
                                                                                {user.email}
                                                                            </td>
                                                                        </Link>
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
                                                                            <button onClick={() => deleteUser(user._id)} className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600">
                                                                                Delete
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
                    </div>
                </div>
            </div>
        )
    }
}

export default AdminUsers