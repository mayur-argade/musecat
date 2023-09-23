import React, { useState, useEffect } from 'react'
import Navbar from '../../components/shared/Navbar/Navbar'
import Tabbar from '../../components/shared/Tabbar/Tabbar'
import Footer from '../../components/shared/Footer/Footer'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { ClientBookTicket } from '../../http/index'
import { setEvent } from '../../store/eventSlice'
import toast, { Toaster } from 'react-hot-toast';

const BookTicket = () => {
    document.title = 'Book Ticket'

    const { event } = useSelector((state) => state.event);
    const { user, isAuth } = useSelector((state) => state.auth)

    useEffect(() => {
        console.log(event)
        if (event == null || user == null || isAuth == false) {
            navigate(-1)
        }

    }, [])


    const [price, setPrice] = useState(false);
    const [basePrice, setBasePrice] = useState('')
    const [tax, setTax] = useState('')
    let navigate = useNavigate();

    // console.log(event)
    const handleBack = () => {
        navigate(-1); // This function will take you back to the previous page
    };

    const closePrice = () => {
        setPrice(false)
    }
    const [isModalOpen, setModalOpen] = useState(false);

    const openModal = () => {
        setModalOpen(true);
    };

    const closeModal = () => {
        setModalOpen(false);
    };



    const handleBookNowClick = () => {
        if (price) {
            submit()
            // // Redirect to the next page when clicked for the second time
            // navigate('/ticketstatus/ticketid')
        } else {
            if (!firstname || !lastname || !ticketclass || !seats || !row) {
                toast.error("All fields are mandatory")
            } else if (seats <= 0) {
                toast.error("Enter valid seat number")
            } else {
                const { basePrice, tax, totalPrice } = calculatePrice()
                setTotalPrice(totalPrice)
                setBasePrice(basePrice)
                setTax(tax)
                setPrice(true);
            }

        }
    };

    function calculatePrice() {
        let basePrice;
        if (ticketclass == 'platinum') {
            basePrice = event.platinumPrice
        } else if (ticketclass == 'gold') {
            basePrice = event.goldPrice
        } else if (ticketclass == 'silver') {
            basePrice = event.silverPrice
        }
        basePrice = basePrice * seats

        var percentage = 18; // The percentage you want to calculate

        var tax = (basePrice * percentage) / 100;

        const totalPrice = basePrice + tax
        return {
            basePrice, tax, totalPrice
        }
    }
    const [loading, setLoading] = useState(false)
    const [firstname, setFirstname] = useState()
    const [lastname, setLastname] = useState()
    const [email, setEmail] = useState()
    const [ticketclass, setTicketclass] = useState('')
    const [seats, setSeats] = useState('')
    const [row, setRow] = useState('')
    const [totalPrice, setTotalPrice] = useState('')

    async function submit() {
        if (!firstname || !lastname || !ticketclass || !seats || !row) {
            toast.error("All fields are mandatory")
        } else if (seats <= 0) {
            toast.error("Enter valid seat number")
        } else {
            try {
                const ticketdata = {
                    firstname: firstname,
                    lastname: lastname,
                    email: email,
                    ticketclass: ticketclass,
                    seats: seats,
                    row: row,
                    eventid: event._id,
                    totalPrice: totalPrice,
                    basePrice: basePrice
                }
                setLoading(true)
                const { data } = await ClientBookTicket(ticketdata)
                // console.log("checking data for the 404 error",data)
                setLoading(false)
                toast.success("Your ticket has been booked proceed to checkout page")
                if (data.session_id) {
                    const externalURL = `https://uatcheckout.thawani.om/pay/${data.session_id}?key=HGvTMLDssJghr9tlN9gr4DVYt0qyBy`;

                    window.location.href = externalURL;
                    // navigate him to the checkout page
                    // navigate(`/ticketstatus/${data.seatsbooked._id}`)
                }
            } catch (error) {
                setLoading(false)
                console.log(error)
                toast.error(error.response.data.data)
            }
        }
    }

    if (event != null && isAuth == true && user != null) {
        return (
            <>
                <div className='appmargine'>
                    <Toaster />
                    <Navbar />
                    <Tabbar />
                    <section className='relative md:mr-48 md:ml-48 mt-5 ml-6 mr-6'>
                        <div className="ml-3 hidden md:flex align-middle items-center">
                            <button onClick={handleBack} className='mt-1'>
                                <img className='h-14 w-14' src="/images/icons/back-button.png" alt="" />
                            </button>
                            <p className='text-2xl font-bold'>Book Your Seat</p>
                        </div>

                        <div className="fixed top-80 -right-1 md:hidden ">
                            <button
                                onClick={openModal}
                                className="bg-[#C0A04C] text-white px-4 py-2 rounded-lg text-sm"
                            >
                                <img src="/images/icons/show.svg" alt="" />
                            </button>
                        </div>

                        <div className="grid justify-items-center gap-4 grid-cols-1 md:grid-cols-2">
                            <div className="hidden  md:flex flex-col justify-end">
                                <img src="/images/assets/theater.png" alt="" />
                            </div>

                            {isModalOpen && (
                                <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
                                    <div className="bg-white p-4 rounded-lg relative  ml-3 mr-3">

                                        <button
                                            onClick={closeModal}
                                            className="absolute top-2 right-2 text-black hover:text-gray-800"
                                        >
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                className="h-6 w-6"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                stroke="currentColor"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth="2"
                                                    d="M6 18L18 6M6 6l12 12"
                                                />
                                            </svg>
                                        </button>


                                        <img className='pt-4' src="/images/assets/theater.png" alt="Theater" />
                                    </div>
                                </div>
                            )}


                            <div className=" w-full flex justify-center md:justify-start">
                                <div className="heading">
                                    <p className='font-semibold text-xl'>Booking Form</p>
                                    <p className='font-light text-xs'>Please fill this form to receive your tickets on email</p>

                                    <form action="" className=' md:w-full mt-4'>
                                        <div className="flex md:flex-row flex-col md:space-x-3 md:space-y-0 space-y-3">
                                            <div className='flex flex-col bg-[#E7E7E7] pl-2 pr-2 rounded-lg'>
                                                <label className='text-xs mt-1' htmlFor="first name">First name</label>
                                                <input
                                                    type="text"
                                                    className='font-medium border bg-transparent border-[#E7E7E7] focus:border-[#E7E7E7] focus:ring-[#E7E7E7]  outline-0'
                                                    onChange={(e) => setFirstname(e.target.value)}
                                                    onClick={closePrice}
                                                    placeholder='John'
                                                />
                                            </div>
                                            <div className='flex flex-col bg-[#E7E7E7] pl-2 pr-2 rounded-md'>
                                                <label className='text-xs mt-1' htmlFor="first name">Last name</label>
                                                <input
                                                    type="text"
                                                    className='font-medium  border bg-transparent border-[#E7E7E7] focus:border-[#E7E7E7] focus:ring-[#E7E7E7]  outline-0'
                                                    onChange={(e) => setLastname(e.target.value)}
                                                    onClick={closePrice}
                                                    placeholder='Doe'

                                                />
                                            </div>
                                        </div>

                                        <div className='mt-3 flex flex-col bg-[#E7E7E7] pl-2 pr-2 rounded-lg mb-4'>
                                            <label className='text-xs mt-1' htmlFor="first name">Email</label>
                                            <input
                                                type="text"
                                                className='font-medium  w-full border bg-transparent border-[#E7E7E7] focus:border-[#E7E7E7] focus:ring-[#E7E7E7]  outline-0'
                                                onChange={(e) => setEmail(e.target.value)}
                                                onClick={closePrice}
                                                placeholder='John@email.com'
                                            />
                                        </div>

                                        <div className='flex flex-col bg-[#E7E7E7] pl-2 pr-2 rounded-lg'>
                                            <label className='text-xs mt-1' htmlFor="first name">Select class</label>
                                            <select
                                                className='font-medium w-full md:w-full border bg-transparent border-[#E7E7E7] focus:border-[#E7E7E7] focus:ring-[#E7E7E7]  outline-0'
                                                onChange={(e) => setTicketclass(e.target.value)}
                                                onClick={closePrice}
                                                placeholder='Doe'
                                            >
                                                <option>Select Class</option>
                                                <option value="platinum">Platinum</option>
                                                <option value="gold">Gold</option>
                                                <option value="silver">Silver</option>
                                            </select>

                                        </div>

                                        <div className="flex md:flex-row flex-col space-y-3 md:space-y-0 md:space-x-3 mt-3">
                                            <div className='flex flex-col bg-[#E7E7E7] pl-2 pr-2 rounded-lg'>
                                                <label className='text-xs mt-1' htmlFor="first name">Select No. of seats</label>
                                                <input
                                                    type="number"
                                                    className='font-medium  border bg-[#E7E7E7] border-[#E7E7E7] focus:border-[#E7E7E7] focus:ring-[#E7E7E7]  outline-0'
                                                    onChange={(e) => setSeats(e.target.value)}
                                                    onClick={closePrice}
                                                    placeholder='5'
                                                />
                                            </div>
                                            <div className='flex flex-col bg-[#E7E7E7] pl-2 pr-2 rounded-lg'>
                                                <label className='text-xs mt-1' htmlFor="first name">Select Row</label>
                                                <select
                                                    className='font-medium w-full md:w-56 border bg-transparent border-[#E7E7E7] focus:border-[#E7E7E7] focus:ring-[#E7E7E7]  outline-0'
                                                    onChange={(e) => setRow(e.target.value)}
                                                    onClick={closePrice}
                                                    placeholder='Doe'
                                                >
                                                    <option>Select Row</option>
                                                    <option value="platinum">Platinum</option>
                                                    <option value="gold">Gold</option>
                                                    <option value="silver">Silver</option>
                                                </select>

                                            </div>
                                        </div>

                                        <div className='flex flex-col justify-between mt-3'>
                                            {event.custom.map((que) => (
                                                <div class="flex items-center mb-4">
                                                    <input id="T&C" type="checkbox" value="" class="w-4 h-4 text-bg-[#A48533]border-gray-300 rounded focus:ring-bg-[#A48533] dark:focus:ring-bg-[#A48533] dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                                    <label for="default-checkbox" class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">{que}</label>
                                                </div>
                                            ))}
                                        </div>

                                        {price && (
                                            <div className="flex flex-col p-4 rounded">

                                                <div className="w-full baseprice flex justify-between">
                                                    <p className='font-semibold'>Base price x{seats}</p>
                                                    <p className='font-semibold'>{basePrice}</p>
                                                </div>
                                                <div className="w-full baseprice flex justify-between">
                                                    <p className='font-semibold'>Taxes</p>
                                                    <p className='font-semibold'>{tax}</p>
                                                </div>
                                                <hr />
                                                <div className="w-full baseprice flex justify-between">
                                                    <p className='font-semibold'>Total</p>
                                                    <p className='font-semibold'>{totalPrice}</p>
                                                </div>
                                            </div>
                                        )}

                                        <div onClick={handleBookNowClick} className="flex justify-center w-full mt-3">
                                            <button type="button" class="w-full md:w-full text-white bg-[#C0A04C] hover:bg-[#A48533] focus:ring-4 focus:outline-none focus:ring-bg-[#A48533] font-medium rounded-lg text-sm px-4 py-3 text-center mr-3 md:mr-0 dark:bg-[#C0A04C] dark:hover:bg-white dark:focus:ring-blue-800">
                                                {
                                                    loading
                                                        ?
                                                        <img className='h-5' src="/images/icons/loading.svg" alt="" />
                                                        :
                                                        <p>
                                                            Book Seat
                                                        </p>
                                                }

                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>

                        <div className='hidden md:flex justify-end flex-col absolute -right-4 bottom-5'>
                            <div className='flex justify-between mb-2'>
                                {/* <button className='rounded-full p-2 hover:bg-[#A48533] bg-[#C0A04C]'>
                                <img className='h-6 ' src="/images/icons/uparrow.svg" alt="" />
                            </button> */}
                                <img className='h-10 ml-24' src="/images/icons/whatsapp-color.svg" alt="" />
                                <button>
                                </button>
                            </div>
                            <button className='rounded-full hover:bg-[#A48533] bg-[#C0A04C] py-3 pr-6 pl-6 text-white font-semibold'>Need Help?</button>
                        </div>
                    </section>

                    <div className=''>
                        < Footer />
                    </div>
                </div>
            </>
        )
    }
    else {
        navigate('/login')

    }

}

export default BookTicket