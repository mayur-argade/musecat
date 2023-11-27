import React, { useEffect, useState } from 'react'
import Navbar from '../../components/shared/Navbar/Navbar'
import Footer from '../../components/shared/Footer/Footer'
import { GetVendorNotification } from '../../http/index'

const VendorNotification = () => {

    document.title = 'Vendor ~ Notification'

    const [response, setResponse] = useState({});


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
    }, []);


    if (response.data == null) {
        return (
            <div className='h-screen w-full flex justify-center align-middle items-center'>
                <div class="relative flex justify-center items-center">
                    <div class="absolute animate-spin rounded-full h-32 w-32 border-t-4 border-b-4 border-[#C0A04C]"></div>
                    <img src="/images/logo/logo-main.png" class="h-16" />
                </div>
            </div>
        )
    } else {
        return (
            <div>
                <Navbar />
                <section className='md:mr-48 md:ml-48 mt-5 ml-6 mr-6'>
                    <div className='flex align-middle items-center  justify-between'>
                        <div className="flex align-middle items-center">
                            <button className=' mt-1'>
                                <img className='h-14 w-14' src="/images/icons/back-button.png" alt="" />
                            </button>
                            <p className='text-xl font-bold'>Notification center</p>
                        </div>
                        <button type="button" class="text-white bg-[#C0A04C] hover:bg-[#A48533] hover:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center mr-3 md:mr-0 dark:bg-[#C0A04C] dark:hover:bg-white dark:focus:ring-blue-800">Clear All</button>
                    </div>
                    <div className='w-full flex flex-col space-y-4'>
                        {
                            response.data.map((response, index) => (
                                <div key={index} className='w-full bg-[#DDDDDD] h-auto p-2 rounded-lg'>
                                    <p className='text-sm pl-2 pr-2 leading-6'>
                                        {response}
                                    </p>
                                </div>
                            ))
                        }
                    </div>
                </section>
                <div className=''>
                    < Footer />
                </div>
            </div>
        )
    }

}

export default VendorNotification