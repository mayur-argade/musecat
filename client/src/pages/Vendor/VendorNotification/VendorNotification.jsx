import React, { useEffect, useState } from 'react'
import Navbar from '../../../components/shared/Navbar/Navbar'
import Footer from '../../../components/shared/Footer/Footer'
import { GetVendorNotification, DeleteVendorNotification } from '../../../http/index'
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const VendorNotification = () => {

    document.title = 'Vendor ~ Notification'

    const navigate = useNavigate()

    const [response, setResponse] = useState({});
    const [refresh, setRefresh] = useState(false)

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
            const promise = DeleteVendorNotification();
            const res = await toast.promise(promise, {
                loading: 'Deleting notification...',
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
    return (
        <div className='dark:bg-[#2c2c2c] dark:text-white'>
            <Navbar />
            <section className='md:mr-48 md:ml-48 mt-5 ml-6 mr-6 '>
                <Toaster />
                <div className='flex align-middle items-center  justify-between'>
                    <div className="flex align-middle items-center">
                        <button onClick={() => navigate(-1)} className=' mt-1'>
                            <img className='h-14 w-14' src="/images/icons/back-button.png" alt="" />
                        </button>
                        <p className='text-xl font-bold'>Notification center</p>
                    </div>
                    <button type="button" onClick={() => deleteNotification()} class="text-white bg-[#C0A04C] hover:bg-[#A48533] hover:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center mr-3 md:mr-0 dark:bg-[#C0A04C] dark:hover:bg-[#A48533] dark:focus:ring-0">Clear All</button>
                </div>
                <div className='w-full flex flex-col space-y-4'>
                    {
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
                                {
                                    response.data.length == 0
                                        ?
                                        <div className='grid grid-flow-row grid-cols-1 '>
                                            <div className='h-80 flex flex-col justify-center items-center'>
                                                <img className='h-40 aspect-square' src="/images/assets/logo-main.png" alt="" />
                                                <span className='text-md text-center mt-1 font-semibold text-gray-700 dark:text-gray-300'>Not a peep! Your notifications are enjoying some quiet time.</span>
                                            </div>
                                        </div>
                                        :
                                        <>
                                            {response.data.map((response, index) => (
                                                <div key={index} className='dark:bg-[#454545] w-full bg-[#DDDDDD] h-auto p-2 rounded-lg'>
                                                    <p className='text-sm pl-2 pr-2 leading-6'>
                                                        {response}
                                                    </p>
                                                </div>
                                            ))}
                                        </>
                                }
                            </>
                    }
                </div>
            </section>
            <div className=''>
                < Footer />
            </div>
        </div>
    )

}

export default VendorNotification