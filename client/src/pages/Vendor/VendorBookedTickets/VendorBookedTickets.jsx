import React, { useState, useEffect, useRef } from 'react'
import Navbar from '../../../components/shared/Navbar/Navbar'
import Table from '../../../components/Table/Table';
import Footer from '../../../components/shared/Footer/Footer';
import { VendorBookedTicketApi, vendorUpdateTicketStatus, ClientEventDetailsApi } from '../../../http/index'
import { useNavigate, useParams } from 'react-router-dom';
import ReactHTMLTableToExcel from 'react-html-table-to-excel'
import toast, { Toaster } from 'react-hot-toast';

const VendorBookedTickets = () => {
    document.title = 'Vendor ~ Booked Tickets'

    const [response, setReponse] = useState({});
    const [selectedCategories, setSelectedCategories] = useState([])
    const [serialNumbers, setSerialNumbers] = useState([]);
    const [visible, setVisible] = useState(false)
    const [ticketId, setTicketId] = useState('')
    const [status, setStatus] = useState('')
    const [bookedSeatsLength, setBookedSeatsLength] = useState(0)
    const [event, setEvent] = useState('')
    const [refresh, setRefresh] = useState(false)
    let { eventid } = useParams();

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
                const { data } = await VendorBookedTicketApi(eventid)
                console.log(data.data)
                setReponse(data)
                const filteredData = data.data.filter(item => item.status !== 'canceled' && item.status !== 'refunded');
                const totalSeats = filteredData.reduce((total, item) => total + item.allotedSeats.length, 0);
                setBookedSeatsLength(totalSeats)
                // Generate serial numbers based on the length of the data
                const generatedSerialNumbers = Array.from({ length: data.data.tickets.length }, (_, index) => index + 1);
                setSerialNumbers(generatedSerialNumbers);

            } catch (error) {
                console.log(error)
            }
        }

        fetchdata()

        const fetchEvent = async () => {
            try {
                const { data } = await ClientEventDetailsApi(eventid)

                setEvent(data)
            } catch (error) {

            }
        }
        fetchEvent()
    }, [refresh, eventid]);

    const navigate = useNavigate();
    const handleBack = () => {
        navigate(-1); // This function will take you back to the previous page
    };

    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);

    // Close the dropdown when clicking anywhere outside of it
    const handleClickOutside = (event) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
            setIsOpen(false);
        }
    };

    const handleCategoryChange = (categoryURL) => {
        // console.log(categoryURL)
        // Check if the categoryURL is already in selectedCategories
        if (selectedCategories.includes(categoryURL)) {
            // Remove the categoryURL from selectedCategories
            setSelectedCategories(selectedCategories.filter((url) => url !== categoryURL));
        } else {
            // Add the categoryURL to selectedCategories
            setSelectedCategories([...selectedCategories, categoryURL]);
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const changeStatus = async (ticketid, status) => {
        try {
            await toast.promise(
                vendorUpdateTicketStatus({
                    ticketid: ticketid,
                    status: status
                }),
                {
                    loading: 'Updating ticket status...',
                    success: 'Ticket status updated successfully',
                    error: 'Failed to update ticket status'
                }
            );

            // Reload the window after a successful update
            setRefresh(!refresh)
        } catch (error) {
            console.log(error);
        }
    };


    if (response.data == null || event.data == null) {
        return (
            <div className='dark:bg-[#2c2c2c] h-screen w-full flex justify-center align-middle items-center'>
                <div class="relative flex justify-center items-center">
                    <div class="absolute animate-spin rounded-full h-32 w-32 border-t-4 border-b-4 border-[#C0A04C]"></div>
                    <img src="/images/logo/logo-main.png" className="dark:hidden flex h-16 aspect-square" />
                    <img src="/images/logo/logo-main-light.png" className="hidden dark:flex h-16 aspect-square" />
                </div>
            </div>
        )
    } else {
        return (
            <div className='dark:bg-[#2c2c2c] dark:text-white'>
                <div className='shadow-md'>
                    <Navbar />
                </div>
                <Toaster />
                <section className='relative md:mr-48 md:ml-48 mt-5 ml-6 mr-6'>
                    <div className='flex flex-col md:flex-row align-middle md:items-center  md:justify-between'>
                        <div className="flex align-middle items-center">
                            <button onClick={handleBack} className=' mt-1'>
                                <img className='h-14 w-14' src="/images/icons/back-button.png" alt="" />
                            </button>
                            <p className='text-xl font-bold'>Booked Tickets</p>
                        </div>

                        <div className="mb-3 md:mb-0 flex space-x-2 align-middle">
                            <div class="filterbyfeature">
                                <div className="relative inline-block text-left">
                                    <button
                                        onClick={toggleDropdown}
                                        className="flex align-middle space-x-3 bg-gray-50 border border-gray-300 text-gray-900 md:text-sm text-md rounded-lg  block w-28 md:w-52 p-1.5  dark:bg-[#454545] dark:border-[#454545] dark:placeholder-gray-400 dark:text-white dark:focus:ring-[#A48533] dark:focus:border-[#A48533]"
                                    >
                                        <span className='hidden md:block dark:text-white text-gray-500'>Filter by Categories</span>
                                        <span className='md:hidden block dark:text-white text-gray-500'>Filter</span>

                                        <img src="/images/icons/filter.svg" alt="" />
                                    </button>
                                    {isOpen && (
                                        <div
                                            className="origin-top-right absolute right-0 mt-2 w-36 rounded-md shadow-lg bg-white dark:bg-[#454545] ring-1 ring-black ring-opacity-5 w-52 z-50"
                                            ref={dropdownRef}
                                        >
                                            <div className="p-5">
                                                <div className="popular">
                                                    <span className='ml-0 font-semibold text-sm'>Class</span>
                                                    {event.data.eventDetails.categories.map((category) => (
                                                        <div class="flex items-center mb-1 mt-2">
                                                            <input
                                                                id={category.className}
                                                                type="checkbox"
                                                                onChange={() => handleCategoryChange(category)}
                                                                checked={selectedCategories.includes(category)}
                                                                value={category}
                                                                class="w-4 h-4 text-[#C0A04C] border-gray-300 rounded focus:ring-[#A48533] dark:focus:ring-[#C0A04C] dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                                            <label for="platinum" class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">{category.className}</label>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>


                            <div className="flex align-middle justify-center items-center totalseats space-x-2">
                                <p className='font-semibold text-sm'>total seats sold</p>
                                <p className='text-white font-semibold bg-black px-4 py-2 rounded-lg text-sm'>{bookedSeatsLength}</p>
                            </div>

                            <ReactHTMLTableToExcel
                                id="exportbutton"
                                className="flex justify-center items-center align-middle space-x-1 text-white bg-[#C0A04C] hover:bg-[#A48533] hover:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-1 text-center mr-3 md:mr-0 dark:bg-[#C0A04C] dark:hover:bg-[#A48533]"
                                table="ticketTable"
                                filename="tickets"
                                sheet="tickets"
                                buttonText="Export to Excel"
                            />
                        </div>
                    </div>

                    <div className="">
                        <div class="relative overflow-x-auto rounded-lg">
                            <table id="ticketTable" class="rounded-lg w-full text-sm text-left text-gray-500 dark:text-gray-400 rounded-lg">
                                <thead class="text-xs text-gray-700 uppercase bg-[#EEEEEE] dark:bg-[#454545] dark:text-white">
                                    <tr>
                                        <th scope="col" class="px-6 py-3">
                                            <p className='text-xss'>
                                                S. No
                                            </p>
                                        </th>
                                        <th scope="col" class="px-6 py-3">
                                            <p className='text-xss'>
                                                First Name
                                            </p>
                                        </th>
                                        <th scope="col" class="px-6 py-3">
                                            <p className='text-xss'>
                                                Last Name
                                            </p>
                                        </th>
                                        <th scope="col" class="px-6 py-3">
                                            <p className='text-xss'>
                                                Email
                                            </p>
                                        </th>
                                        <th scope="col" class="px-6 py-3">
                                            <p className='text-xss'>
                                                Class
                                            </p>
                                        </th>
                                        <th scope="col" class="px-6 py-3">
                                            <p className='text-xss'>
                                                No of Seats
                                            </p>
                                        </th>
                                        <th scope="col" class="px-6 py-3">
                                            <p className='text-xss'>
                                                Alloted Seats
                                            </p>
                                        </th>
                                        <th scope="col" class="px-6 py-3">
                                            <p className='text-xss'>
                                                Status
                                            </p>
                                        </th>
                                        <th scope="col" class="px-6 py-3">
                                            <p className='text-xss'>
                                                Price
                                            </p>
                                        </th>
                                        <th scope="col" class="px-6 py-3">
                                            <p className='text-xss'>
                                                Action
                                            </p>
                                        </th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {response.data.filter((ticket) => {

                                        const categoryMatch = selectedCategories.length === 0 || selectedCategories.some((category) => (
                                            category.className == ticket.class
                                        ))

                                        return categoryMatch
                                    })
                                        .map((ticket, index) => (
                                            <tr key={ticket._id} class="bg-[#EEEEEE] border-b dark:bg-[#454545] dark:border-gray-500 dark:text-white">
                                                <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                    {index + 1}
                                                </th>
                                                <td class="px-6 py-4">
                                                    <p className='text-xs text-black dark:text-white dark:font-normal font-medium'>
                                                        {ticket.firstname}
                                                    </p>
                                                </td>
                                                <td class="px-6 py-4">
                                                    <p className='text-xs text-black dark:text-white dark:font-normal font-medium'>
                                                        {ticket.lastname}
                                                    </p>
                                                </td>
                                                <td class="px-6 py-4">
                                                    <p className='text-xs text-black dark:text-white dark:font-normal font-medium'>
                                                        {ticket.email}
                                                    </p>
                                                </td>
                                                <td class="px-6 py-4">
                                                    <p className='text-xs text-black dark:text-white dark:font-normal font-medium'>
                                                        {ticket.class}
                                                    </p>
                                                </td>
                                                <td class="px-6 py-4">
                                                    <p className='text-xs text-black dark:text-white dark:font-normal font-medium'>
                                                        {ticket.seats}
                                                    </p>
                                                </td>
                                                <td class="px-6 py-4">
                                                    <p className='text-xs text-black dark:text-white dark:font-normal font-medium'>
                                                        {ticket.allotedSeats.join(', ')}
                                                    </p>
                                                </td>
                                                <td class="px-6 py-4">
                                                    <p className='text-xs text-black dark:text-white dark:font-normal font-medium'>
                                                        {ticket.status}
                                                    </p>
                                                </td>
                                                <td class="px-6 py-4">
                                                    <p className='text-xs text-black dark:text-white dark:font-normal font-medium'>
                                                        {ticket.totalPrice}
                                                    </p>
                                                </td>
                                                <td class="px-6 py-4 flex space-x-1">
                                                    {
                                                        ticket.status == 'verified'
                                                            ?
                                                            <>
                                                                <button onClick={() => changeStatus(ticket._id, 'canceled')}>
                                                                    <img className='h-6 w-6 ml-1' src="/images/icons/cancel-vendor.svg" alt="" />
                                                                </button>
                                                            </>
                                                            :
                                                            <>

                                                            </>
                                                    }
                                                </td>
                                            </tr>
                                        ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {
                        response.data.length == 0 && (
                            <div className='w-full flex justify-center align-middle items-center'>
                                <div className='h-80 flex flex-col justify-center items-center'>
                                    <img src="/images/logo/logo-main.png" className="dark:hidden flex h-40 aspect-square" />
                                    <img src="/images/logo/logo-main-light.png" className="hidden dark:flex h-40 aspect-square" />
                                    <span className='text-md text-center mt-1 font-semibold text-gray-700 dark:text-gray-300'>No tickets have been booked for this event yet.</span>
                                </div>
                            </div>
                        )
                    }
                    {response.data.seatsBooked != 0 ?
                        <div className='fixed hidden lg:flex justify-end flex-col right-5 bottom-10'>
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
                            {/* <button onClick={() => navigate('/user/helpcenter')} className='rounded-full hover:bg-[#A48533] bg-[#C0A04C] py-3 pr-6 pl-6 text-white font-semibold'>Need Help?</button> */}
                        </div>
                        :
                        <></>
                    }
                </section>


                <div className=''>
                    < Footer />
                </div>
            </div>
        )
    }

}

export default VendorBookedTickets