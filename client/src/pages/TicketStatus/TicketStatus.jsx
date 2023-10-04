import React, { useState, useEffect } from 'react'
import Navbar from '../../components/shared/Navbar/Navbar'
import Tabbar from '../../components/shared/Tabbar/Tabbar'
import Footer from '../../components/shared/Footer/Footer'
import FavoriteCard from '../../components/Cards/FavoriteCard'
import TicketStatusCard from '../../components/Cards/TicketStatusCard'
import Ticket from '../../components/Ticket/Ticket'
import { useNavigate, useParams } from 'react-router-dom'
import { ClientTicketStatusApi } from '../../http/index'

const TicketStatus = () => {

    document.title = 'TicketStatus'
    let { ticketid } = useParams()
    console.log(ticketid)
    const [response, setReponse] = useState('')

    useEffect(() => {
        const fetchdata = async () => {
            try {
                const { data } = await ClientTicketStatusApi(ticketid)
                console.log(data.data)
                setReponse(data)

            } catch (error) {
                console.log(error)
            }
        }

        fetchdata()
    }, [ticketid]);

    console.log(response.data)
    const navigate = useNavigate();
    const handleBack = () => {
        navigate(-1); // This function will take you back to the previous page
    };

    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    if (response.data == null) {
        <>
            loading..
        </>
    } else {
        return (
            <>
                <Navbar />
                <Tabbar />

                <section className='relative md:mr-48 md:ml-48 mt-5 ml-6 mr-6'>
                    <div className="ml-3 hidden md:flex align-middle items-center">
                        <button onClick={handleBack} className=' mt-1'>
                            <img className='h-14 w-14' src="/images/icons/back-button.png" alt="" />
                        </button>
                        <p className='text-2xl font-bold'>Ticket Status</p>
                    </div>

                    <div className='flex flex-col justify-start align-middle items-stretch md:flex-row '>

                        <div className="left">
                            <TicketStatusCard data={response.data.event}/>
                        </div>

                        <div className="right">
                            <form action="" className=' md:w-full mt-4 space-y-2'>
                                <div className="flex md:flex-row flex-col md:space-x-3 md:space-y-0 space-y-3">
                                    <div className='flex flex-col bg-[#E7E7E7] pl-2 pr-2 rounded-lg'>
                                        <label className='text-xs mt-1' htmlFor="first name">First name</label>
                                        <input
                                            type="text"
                                            className='border bg-transparent border-[#E7E7E7] focus:border-[#E7E7E7] focus:ring-[#E7E7E7]  outline-0'
                                            placeholder={response.data.ticket.firstname}
                                            disabled
                                        />
                                    </div>
                                    <div className='flex flex-col bg-[#E7E7E7] pl-2 pr-2 rounded-lg'>
                                        <label className='text-xs mt-1' htmlFor="first name">Last name</label>
                                        <input
                                            type="text"
                                            className='border bg-transparent border-[#E7E7E7] focus:border-[#E7E7E7] focus:ring-[#E7E7E7]  outline-0'
                                            placeholder={response.data.ticket.lastname}
                                            disabled
                                        />
                                    </div>
                                </div>

                                <div className='mt-3 flex flex-col bg-[#E7E7E7] pl-2 pr-2 rounded-lg'>
                                    <label className='text-xs mt-1' htmlFor="first name">Email</label>
                                    <input
                                        type="text"
                                        className='w-fullborder bg-transparent border-[#E7E7E7] focus:border-gray-100 focus:ring-gray-100  outline-0'
                                        placeholder={response.data.ticket.email}
                                        disabled
                                    />
                                </div>
                                <div className='mt-3 flex flex-col bg-[#E7E7E7] pl-2 pr-2 rounded-lg'>
                                    <label className='text-xs mt-1' htmlFor="first name">Class</label>
                                    <input
                                        type="text"
                                        className='w-fullborder bg-transparent border-[#E7E7E7] focus:border-gray-100 focus:ring-gray-100  outline-0'
                                        placeholder={response.data.ticket.class}
                                        disabled
                                    />
                                </div>
                                <div className="flex  md:space-y-0 space-x-3 mt-3">
                                    <div className=' w-1/2 flex flex-col bg-[#E7E7E7] pl-2 pr-2 rounded-md'>
                                        <label className='text-xs mt-1' htmlFor="first name">Select No. of seats</label>
                                        <input
                                            type="number"
                                            className='border bg-[#E7E7E7] border-[#E7E7E7] focus:border-[#E7E7E7] focus:ring-[#E7E7E7]  outline-0'
                                            placeholder={response.data.ticket.seats}
                                            disabled
                                        />
                                    </div>
                                    <div className=' w-1/2 flex flex-col bg-[#E7E7E7] pl-2 pr-2 rounded-md'>
                                        <label className='text-xs mt-1' htmlFor="first name">Select row</label>
                                        <input
                                            type="number"
                                            className='border bg-[#E7E7E7] border-[#E7E7E7] focus:border-[#E7E7E7] focus:ring-[#E7E7E7]  outline-0'
                                            placeholder={response.data.ticket.row}
                                            disabled
                                        />
                                    </div>
                                </div>

                                <div className="flex justify-start mt-8">
                                    <button
                                        type="button"
                                        onClick={openModal}
                                        className="w-full md:w-44 text-white bg-[#C0A04C] hover:bg-[#A48533] focus:ring-4 focus:outline-none focus:ring-bg-[#A48533] font-semibold rounded-lg text-md px-4 py-4 text-center md:mr-3 md:mr-0 dark:bg-[#C0A04C] dark:hover:bg-white dark:focus:ring-blue-800"
                                    >
                                        View Ticket
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>

                    <div className='hidden md:flex justify-end flex-col absolute right-2 bottom-12'>
                        <div className='flex justify-between mb-2'>
                            {/* <button className='rounded-full p-2 hover:bg-[#A48533] bg-[#C0A04C]'>
                                <img className='h-6 ' src="/images/icons/uparrow.svg" alt="" />
                            </button> */}
                            {/* <img className='h-10 ml-24' src="/images/icons/whatsapp-color.svg" alt="" /> */}
                            <button>
                            </button>
                        </div>
                        <button className='rounded-full hover:bg-[#A48533] bg-[#C0A04C] py-3 pr-6 pl-6 text-white font-semibold'>Need Help?</button>
                    </div>

                </section>

                {isModalOpen && (
                    <div className="fixed inset-0 flex items-center justify-center z-50 overflow-auto bg-[#FFFFFF] bg-opacity-20 backdrop-blur-sm">
                        <div className="relative rounded-lg ">
                            <Ticket event={response.data.event} ticket={response.data.ticket} />
                            {/* Close button */}
                            <button
                                onClick={closeModal}
                                className="absolute -top-5 -right-5 m-2 text-gray-600 hover:text-gray-800 focus:outline-none"
                            >
                                <img src="/images/icons/cancel-icon.png" alt="" />
                            </button>
                        </div>
                    </div>
                )}

                <div className=''>
                    < Footer />
                </div>

            </>
        )
    }
}

export default TicketStatus