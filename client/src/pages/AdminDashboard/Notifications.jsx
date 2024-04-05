import { useNavigate } from 'react-router-dom'
import { GetVendorNotification, DeleteUserNotification, AdminSendNotification } from '../../http/index'
import toast, { Toaster } from 'react-hot-toast';
import React, { useState, useEffect, useRef } from 'react'
import Sidebar from '../../components/shared/Sidebar/Sidebar'

const Notifications = () => {
    const navigate = useNavigate()
    const [response, setResponse] = useState({});
    const [refresh, setRefresh] = useState(false)
    const [message, setMessage] = useState('');
    const [user, setUser] = useState(false);
    const [vendor, setVendor] = useState(false);
    const [displayModal, setDisplayModal] = useState(false)

    async function notificationModal() {
        setDisplayModal(!displayModal)
    }


    useEffect(() => {
        const fetchdata = async () => {
            try {
                const { data } = await GetVendorNotification()
                console.log(data.data)
                setResponse(data)
            } catch (error) {
                console.log(error)
            }
        }

        fetchdata()
    }, [refresh]);

    const deleteNotification = async () => {
        try {
            // Use toast.promise to display a promise-based toast
            const promise = DeleteUserNotification();
            const res = await toast.promise(promise, {
                loading: 'Deleting notifications...',
                success: (response) => response.data.data,
                error: (error) => `Error: ${error.response.data.data}`,
            });

            // Refresh or update the UI as needed after successful deletion
            if (res.data.success === true) {
                setRefresh(!refresh);
            }
        } catch (error) {
            // toast.error(error.response.data.data);
            console.error(error);
        }
    };

    const handleSubmit = async () => {
        try {
            const notificationdata = {
                user: user,
                vendor: vendor,
                msg: message
            }
            // Use toast.promise to display a promise-based toast
            const promise = AdminSendNotification(notificationdata);
            const res = await toast.promise(promise, {
                loading: 'Sending Notifications....',
                success: (response) => response.data.data,
                error: (error) => `Error: ${error.response.data.data}`,
            });
            setDisplayModal(false)
        } catch (error) {
            // toast.error(error.response.data.data);
            console.error(error);
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
                                <span className="text-2xl font-semibold">Notification Center</span>
                                {/* <button onClick={handleClick} className='px-1.5 py-1 bg-blue-800 text-sm text-white rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600 mr-5'>Add Event</button> */}
                            </div>
                            <hr className='mt-3 mb-3' />

                            <div className="maincontent flex flex-col">
                                <section className='md:mr-20 md:ml-20 mt-5 ml-6 mr-6'>
                                    <div className='flex align-middle items-center space-x-4 justify-end'>
                                        <button onClick={() => deleteNotification()} type="button" class="text-white bg-[#C0A04C] hover:bg-[#A48533] hover:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center mr-3 md:mr-0 dark:bg-[#C0A04C] dark:hover:bg-white dark:focus:ring-blue-800">Clear All</button>
                                        <button onClick={() => notificationModal()} type="button" class="text-white bg-[#C0A04C] hover:bg-[#A48533] hover:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center mr-3 md:mr-0 dark:bg-[#C0A04C] dark:hover:bg-white dark:focus:ring-blue-800">Send Notification</button>
                                    </div>
                                    <div className='w-full flex flex-col space-y-4'>
                                        {/* {
                                            response.data == null
                                                ?
                                                <div className='h-screen w-full flex justify-center align-middle items-center'>
                                                    <div class="relative flex justify-center items-center">
                                                        <div class="absolute animate-spin rounded-full h-32 w-32 border-t-4 border-b-4 border-[#C0A04C]"></div>
                                                        <img src="/images/logo/logo-main.png" class="h-16" />
                                                    </div>
                                                </div>
                                                :
                                                <>
                                                    {response.data.map((response, index) => (
                                                        <div key={index} className='w-full bg-[#DDDDDD] h-auto p-2 rounded-lg'>
                                                            <p className='text-sm pl-2 pr-2 leading-6'>
                                                                {response}
                                                            </p>
                                                        </div>
                                                    ))}
                                                </>
                                        } */}
                                    </div>
                                    {
                                        displayModal
                                            ?
                                            <div className="fixed inset-5 flex justify-center z-50 overflow-auto bg-[#FFFFFF] bg-opacity-20 backdrop-blur-sm">
                                                <div className="relative rounded-lg ">
                                                    <section className='md:mt-12 flex bg-white drop-shadow-2xl rounded-lg'>
                                                        <div className='w-96 md:w-[35rem]'>
                                                            <div className="modal bg-white px-5 py-5">
                                                                <span className="ml-0 font-medium text-md">Send Notification</span>
                                                                <div className="flex space-x-3 align-middle items-center">
                                                                    <div class="flex  items-center pl-3">
                                                                        <input
                                                                            type="checkbox"
                                                                            value={user}
                                                                            onChange={() => setUser(!user)}
                                                                            class="w-4 h-4 rounded text-[#A48533] focus:ring-[#A48533]" />
                                                                        <label class="w-full py-3 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">User</label>
                                                                    </div>
                                                                    <div class="flex  items-center pl-3">
                                                                        <input
                                                                            type="checkbox"
                                                                            value={vendor}
                                                                            onChange={() => setVendor(!vendor)}
                                                                            class="w-4 h-4 rounded text-[#A48533] focus:ring-[#A48533]" />
                                                                        <label class="w-full py-3 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Vendor</label>
                                                                    </div>
                                                                </div>

                                                                <div className='flex flex-col border border-black border-1 dark:bg-[#2c2c2c] pl-2 pr-2 rounded-md'>
                                                                    <label className='text-xs mt-1' htmlFor="first name">Message</label>
                                                                    <textarea
                                                                        type="text"
                                                                        // value={message}
                                                                        className='ring-0 dark:border-0 dark:text-white border h-24 bg-transparent border-0 focus:border-0 focus:ring-0  outline-0 text-sm font-medium text-black'
                                                                        onChange={(e) => setMessage(e.target.value)}
                                                                        required
                                                                    />
                                                                </div>
                                                                <div className='mt-2'>
                                                                    <button className="w-full py-2 bg-[#C0A04C] hover:bg-[#A48533] rounded-md text-sm font-bold text-gray-50 transition duration-200" onClick={handleSubmit} >Send Notification</button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </section>
                                                    <button
                                                        onClick={notificationModal}
                                                        className="absolute top-3 -right-5 m-2 text-gray-600 hover:text-gray-800 focus:outline-none"
                                                    >
                                                        <img src="/images/icons/cancel-icon.png" alt="" />
                                                    </button>
                                                </div>
                                            </div>

                                            :
                                            <></>
                                    }
                                </section >
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Notifications