import React, { useState, useEffect } from 'react'
import Navbar from '../../../components/shared/Navbar/Navbar'
import Tabbar from '../../../components/shared/Tabbar/Tabbar'
import Footer from '../../../components/shared/Footer/Footer'
import FavoriteCard from '../../../components/Cards/FavoriteCard'
import TicketStatusCard from '../../../components/Cards/TicketStatusCard'
import Ticket from '../../../components/Ticket/Ticket'
import { useNavigate, useParams, useLocation } from 'react-router-dom'
import { ClientTicketStatusApi, UpdateTicketStatusPayment } from '../../../http/index'
import queryString from 'query-string';
import toast, { Toaster } from 'react-hot-toast';

const TicketStatus = () => {

    document.title = 'TicketStatus'
    let { ticketid } = useParams()
    // console.log(ticketid)

    const [response, setReponse] = useState('')
    const [download, setDownload] = useState(false)

    const location = useLocation();

    const [visible, setVisible] = useState(false)

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 80) {
                // Show the button when the user scrolls down 100 pixels
                setVisible(true);
            } else {
                // Hide the button when the user scrolls up
                setVisible(false);
            }
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    useEffect(() => {
        const fetchdata = async () => {
            try {
                const ticketdata = {
                    ticketid: ticketid
                }
                const res = await UpdateTicketStatusPayment(ticketdata)
                console.log("response", res)
                const queryParams = new URLSearchParams(location.search);
                const downloadParam = queryParams.get('download');
                if (downloadParam === 'true') {
                    setIsModalOpen(true);
                    // setTimeout(() => {
                    //     setDownload(true)
                    // }, 1000);
                    queryParams.delete('download');
                }
                const { data } = await ClientTicketStatusApi(ticketid)
                console.log(data.data)
                setReponse(data)
                if (data.success == 'true') {
                    window.location.reload()
                }
            } catch (error) {
                console.log(error)
            }
        }

        fetchdata()

    }, [ticketid]);



    // console.log(response.data)
    const navigate = useNavigate();
    const handleBack = () => {
        navigate(-1); // This function will take you back to the previous page
    };

    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => {
        if (response.data != null && response.data.ticket.status == 'verified') {
            setIsModalOpen(true);
        }
        else {
            toast.error("Ticket/Voucher are availble for verified tickets only")
        }
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    return (
        <div className='dark:bg-[#2c2c2c] dark:text-white'>
            <div>
                <Navbar />
                <Tabbar />
            </div>

            <section className='px-5 w-full flex justify-center'>
                <section className='w-full md:w-11/12 md:mx-5 md:w-10/12 xl:w-8/12 2xl:w-7/12'>
                    <Toaster />
                    {response.data == null && (
                        <div className='fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 overflow-auto bg-[#FFFFFF] bg-opacity-20 backdrop-blur-sm'>
                            <div class="h-screen w-screen relative flex justify-center items-center">
                                <div class="absolute animate-spin rounded-full h-32 w-32 border-t-4 border-b-4 border-[#C0A04C]"></div>
                                <img src="/images/logo/logo-main.png" class="h-16" />
                            </div>
                        </div>
                    )}
                    <div className="ml-3 hidden md:flex align-middle items-center">
                        <button onClick={handleBack} className=' mt-1'>
                            <img className='h-14 w-14' src="/images/icons/back-button.png" alt="" />
                        </button>
                        {
                            response.data == null
                                ?
                                <div className='flex flex-col justify-center items-center'>
                                    <div class="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4"></div>
                                </div>
                                :
                                <p className='text-2xl font-bold'>{response.data.event.type == 'event' ? "Ticket" : "Voucher"} Status</p>
                        }
                    </div>

                    <div className='flex flex-col justify-center align-middle items-stretch md:flex-row '>

                        <div className="left">
                            {
                                response.data == null
                                    ?
                                    <>
                                        <div class="h-80 w-72 bg-gray-300 mr-5"></div>
                                    </>
                                    :
                                    <TicketStatusCard data={response.data.event} />
                            }
                        </div>

                        <div className="right">
                            <form action="" className=' md:w-full mt-4 space-y-2'>
                                <div className="flex md:flex-row flex-col md:space-x-3 md:space-y-0 space-y-3">
                                    <div className='flex flex-col bg-[#E7E7E7] pl-2 pr-2 rounded-lg dark:bg-[#454545]'>
                                        <label className='text-xs mt-1' htmlFor="first name">First name</label>
                                        {
                                            response.data == null
                                                ?
                                                <input
                                                    type="text"
                                                    className=' dark:placeholder:text-white border bg-transparent border-0 focus:border-0 focus:ring-0 dark:focus:ring-0 dark:bg-[#454545]  outline-0'
                                                    disabled
                                                />
                                                :
                                                <input
                                                    type="text"
                                                    className=' dark:placeholder:text-white border bg-transparent border-0 focus:border-0 focus:ring-0 dark:focus:ring-0 dark:bg-[#454545]  outline-0'
                                                    placeholder={response.data.ticket.firstname}
                                                    disabled
                                                />
                                        }
                                    </div>
                                    <div className='flex flex-col bg-[#E7E7E7] pl-2 pr-2 rounded-lg dark:bg-[#454545]'>
                                        <label className='text-xs mt-1' htmlFor="first name">Last name</label>
                                        {
                                            response.data == null
                                                ?
                                                <input
                                                    type="text"
                                                    className=' dark:placeholder:text-white border bg-transparent border-0 focus:border-0 focus:ring-0 dark:focus:ring-0 dark:bg-[#454545]  outline-0'
                                                    disabled
                                                />
                                                :
                                                <input
                                                    type="text"
                                                    className=' dark:placeholder:text-white border bg-transparent border-0 focus:border-0 focus:ring-0 dark:focus:ring-0 dark:bg-[#454545]  outline-0'
                                                    placeholder={response.data.ticket.lastname}
                                                    disabled
                                                />
                                        }
                                    </div>
                                </div>

                                <div className='mt-3 flex flex-col bg-[#E7E7E7] pl-2 pr-2 rounded-lg dark:bg-[#454545]'>
                                    <label className='text-xs mt-1' htmlFor="first name">Email</label>
                                    {
                                        response.data == null
                                            ?
                                            <input
                                                type="text"
                                                className='w-full  dark:placeholder:text-white border bg-transparent border-0 focus:border-0 focus:ring-0 dark:focus:ring-0 dark:bg-[#454545] outline-0'
                                                disabled
                                            />
                                            :
                                            <input
                                                type="text"
                                                className='w-full  dark:placeholder:text-white border bg-transparent border-0 focus:border-0 focus:ring-0 dark:focus:ring-0 dark:bg-[#454545] outline-0'
                                                placeholder={response.data.ticket.email}
                                                disabled
                                            />
                                    }
                                </div>
                                <div className='mt-3 flex flex-col bg-[#E7E7E7] pl-2 pr-2 rounded-lg dark:bg-[#454545]'>
                                    <label className='text-xs mt-1' htmlFor="first name">Class</label>
                                    {
                                        response.data == null
                                            ?
                                            <input
                                                type="text"
                                                className='w-full dark:placeholder:text-white border bg-transparent border-0 focus:border-0 focus:ring-0 dark:focus:ring-0 dark:bg-[#454545] outline-0'
                                                disabled
                                            />
                                            :
                                            <input
                                                type="text"
                                                className='w-full dark:placeholder:text-white border bg-transparent border-0 focus:border-0 focus:ring-0 dark:focus:ring-0 dark:bg-[#454545] outline-0'
                                                placeholder={response.data.ticket.class}
                                                disabled
                                            />
                                    }
                                </div>
                                <div className="flex md:space-y-0 space-x-3 mt-3 ">
                                    <div className=' w-1/2 flex flex-col bg-[#E7E7E7] pl-2 pr-2 rounded-md dark:bg-[#454545]'>
                                        <label className='text-xs mt-1' htmlFor="first name">No. of seats</label>
                                        {
                                            response.data == null
                                                ?
                                                <input
                                                    type="number"
                                                    className=' dark:placeholder:text-white border bg-[#E7E7E7] border-0 focus:border-0 focus:ring-0 dark:focus:ring-0 dark:bg-[#454545]  outline-0'
                                                    disabled
                                                />
                                                :
                                                <input
                                                    type="number"
                                                    className=' dark:placeholder:text-white border bg-[#E7E7E7] border-0 focus:border-0 focus:ring-0 dark:focus:ring-0 dark:bg-[#454545]  outline-0'
                                                    placeholder={response.data.ticket.seats}
                                                    disabled
                                                />
                                        }

                                    </div>
                                    <div className=' w-1/2 flex flex-col bg-[#E7E7E7] pl-2 pr-2 rounded-md dark:bg-[#454545]'>
                                        <label className='text-xs mt-1' htmlFor="first name">Ticket Status</label>
                                        {
                                            response.data == null
                                                ?
                                                <input
                                                    type="number"
                                                    className=' dark:placeholder:text-white border bg-[#E7E7E7] border-0 focus:border-0 focus:ring-0 dark:focus:ring-0 dark:bg-[#454545]  outline-0'
                                                    disabled
                                                />
                                                :
                                                <input
                                                    type="number"
                                                    className=' dark:placeholder:text-white border bg-[#E7E7E7] border-0 focus:border-0 focus:ring-0 dark:focus:ring-0 dark:bg-[#454545]  outline-0'
                                                    placeholder={response.data.ticket.status}
                                                    disabled
                                                />
                                        }

                                    </div>
                                </div>

                                <div className="flex justify-start mt-8">
                                    <button
                                        type="button"
                                        onClick={openModal}
                                        className="w-full md:w-44 text-white bg-[#C0A04C] hover:bg-[#A48533] focus:ring-4 focus:outline-none focus:ring-bg-[#A48533] font-semibold rounded-lg text-md px-4 py-4 text-center md:mr-3 md:mr-0 dark:bg-[#C0A04C] dark:hover:bg-[#A48533] dark:focus:ring-0"
                                    >
                                        View Ticket
                                    </button>
                                    {
                                        response.data != null && response.data.ticket.status != 'verified' && (
                                            <button
                                                type="button"
                                                onClick={() => navigate(`/bookticket/${response.data.event._id}`)}
                                                className="w-full md:w-44 text-white bg-[#C0A04C] hover:bg-[#A48533] focus:ring-4 focus:outline-none focus:ring-bg-[#A48533] font-semibold rounded-lg text-md px-4 py-4 text-center md:mr-3 md:mr-0 dark:bg-[#C0A04C] dark:hover:bg-[#A48533] dark:focus:ring-0"
                                            >
                                                Book Again
                                            </button>
                                        )

                                    }
                                </div>
                            </form>
                        </div>
                    </div>



                </section>
            </section>

            {isModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center z-50 overflow-auto bg-[#FFFFFF] bg-opacity-20 backdrop-blur-sm">
                    <div className="relative rounded-lg ">
                        <Ticket download={download} event={response.data.event} ticket={response.data.ticket} />
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
            <div className='fixed hidden lg:flex justify-center flex-col right-5 bottom-10'>
                <div className='flex justify-center mb-2'>
                    {
                        visible && (
                            <button onClick={() => window.scrollTo({
                                top: 0,
                                behavior: 'smooth', // You can use 'auto' for instant scrolling
                            })} className='rounded-full p-2 hover:bg-[#A48533] bg-[#C0A04C]'>
                                <img className='h-6 ' src="/images/icons/uparrow.svg" alt="" />
                            </button>
                        )
                    }

                    <button>
                    </button>
                </div>
                <button onClick={() => navigate('/user/helpcenter')} className='rounded-full hover:bg-[#A48533] bg-[#C0A04C] py-3 pr-6 pl-6 text-white font-semibold'>Need Help?</button>
            </div>
            <div className=''>
                < Footer />
            </div>

        </div>
    )
    // }
}

export default TicketStatus