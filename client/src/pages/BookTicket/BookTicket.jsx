import React, { useState, useEffect } from 'react'
import Navbar from '../../components/shared/Navbar/Navbar'
import Tabbar from '../../components/shared/Tabbar/Tabbar'
import Footer from '../../components/shared/Footer/Footer'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { ClientEventDetailsApi, ClientBookTicket, getCustomersSavedCards } from '../../http'
import { setEvent } from '../../store/eventSlice'
import toast, { Toaster } from 'react-hot-toast';

const BookTicket = () => {
    document.title = 'Book Ticket'
    let { eventid } = useParams();
    const { user, isAuth } = useSelector((state) => state.auth)

    const [response, setReponse] = useState({});
    const [savedCard, setSavedCards] = useState([])
    const [checked, setChecked] = useState(null);
    const [termsAccepted, setTermsAccepted] = useState(false);
    console.log("terms accepted", termsAccepted)
    useEffect(() => {
        const fetchdata = async () => {
            try {
                setLoading(true)
                const { data } = await ClientEventDetailsApi(eventid)
                // console.log(data.data.eventDetails)
                setReponse(data)
                setChecked(Array(data.data.eventDetails.custom.length).fill(false))
                const { data: res } = await getCustomersSavedCards()

                console.log(res)
                setSavedCards(res.data)

                setLoading(false)
            } catch (error) {
                console.log(error)
            }
        }
        fetchdata()
    }, [eventid]);

    const [price, setPrice] = useState(

    );
    const [basePrice, setBasePrice] = useState('')
    const [tax, setTax] = useState('')
    let navigate = useNavigate();

    // console.log(event)
    const handleBack = () => {
        navigate(-1); // This function will take you back to the previous page
    };

    const handleCheckboxChange = (index) => {
        const updatedChecked = [...checked];
        updatedChecked[index] = !updatedChecked[index];
        setChecked(updatedChecked);
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

    let hasPrice = [];
    let hasSeats = [];
    let hasClassName = [];
    if (response.data != null) {
        for (const category of response.data.eventDetails.categories) {
            if (category.price != null) {
                hasPrice.push(category.className)
            }
            if (category.seats != null) {
                hasSeats.push(category.className)
            }
            if (category.className != null) {
                hasClassName.push(category.className)
            }
        }
    }

    const handleBookNowClick = () => {
        if (hasPrice.length != 0) {
            if (price) {
                submit()
            } else {
                if (!firstname || !lastname || !ticketclass || !seats) {
                    return toast.error("All fields are mandatory")
                } else if (seats <= 0) {
                    return toast.error("Enter valid seat number")
                } else if (!checked.every((isChecked) => isChecked)) {
                    return toast.error("Tick all checkboxes")
                } else if (!termsAccepted) {
                    return toast.error("Check terms and conditions")
                } else {
                    // calculatePrice()
                    const { basePrice, tax, totalPrice, baseTaxAmout } = calculatePrice()
                    setPriceWithTax(baseTaxAmout)
                    setTotalPrice(totalPrice)
                    setBasePrice(basePrice)
                    setTax(tax)
                    setPrice(true);
                }
            }
        } else {
            submit()
        }
    };

    function calculatePrice() {
        console.log(ticketclass)
        let category = response.data.eventDetails.categories.find(item => item.className == ticketclass)
        // console.log("category", category)

        const taxRate = 0.05
        let basePrice1 = category.price
        const taxAmout = basePrice1 * taxRate
        const baseTaxAmout = Math.round(basePrice1 + taxAmout)
        const tax = taxAmout * seats
        const totalPrice = baseTaxAmout * seats
        const basePrice = basePrice1 * seats
        return {
            basePrice, tax, totalPrice, baseTaxAmout
        }
    }

    const [loading, setLoading] = useState(false)
    const [firstname, setFirstname] = useState()
    const [lastname, setLastname] = useState()
    const [email, setEmail] = useState()
    const [ticketclass, setTicketclass] = useState('')
    const [seats, setSeats] = useState('')
    const [totalPrice, setTotalPrice] = useState('')
    const [priceWithTax, setPriceWithTax] = useState('')
    const [cardid, setCardid] = useState('')

    async function submit() {
        if (!checked.every((isChecked) => isChecked)) {
            return toast.error("Tick all checkboxes")
        }

        if (!termsAccepted) {
            return toast.error("Check terms and conditions")
        }

        // has price
        if (hasPrice.length != 0 && hasClassName.length != 0) {
            if (!firstname || !lastname || !email || !ticketclass || !seats) {
                toast.error("All fields are mandatory")
            } else if (seats <= 0) {
                toast.error("Enter valid seats number")
            } else {
                try {
                    const ticketdata = {
                        firstname: firstname,
                        lastname: lastname,
                        email: email,
                        type: response.data.eventDetails.type,
                        ticketclass: ticketclass,
                        seats: seats,
                        priceWithTax: priceWithTax,
                        eventid: eventid,
                        cardid: cardid
                    }
                    setLoading(true)
                    const { data } = await ClientBookTicket(ticketdata)
                    console.log("checking data for the 404 error", data)
                    setLoading(false)
                    toast.success("To book your Ticket proceed to payment page")

                    if (data.data != null) {
                        if (data.data) {
                            window.location.href = data.data;
                        }
                    } else {
                        toast.error("Failed to initiate payment service")
                    }
                } catch (error) {
                    setLoading(false)
                    console.log(error)
                    if (error.response.status == 401) {
                        toast((t) => (
                            <span>
                                <b>Token Expired</b>
                                <button onClick={() => navigate('/login')}>
                                    Login
                                </button>
                            </span>
                        ));
                    }
                    toast.error(error.response.data.data)
                }
            }
        }

        // no price has classname has seatss
        else if (hasPrice.length == 0 && hasClassName.length != 0 && hasSeats.length != 0) {
            try {
                const ticketdata = {
                    firstname: firstname,
                    type: response.data.eventDetails.type,
                    lastname: lastname,
                    email: email,
                    ticketclass: ticketclass,
                    seats: seats,
                    eventid: eventid,
                }
                setLoading(true)
                const { data } = await ClientBookTicket(ticketdata)
                // console.log("checking data for the 404 error",data)
                setLoading(false)
                if (data.seatsbooked != null) {
                    toast.success("Ticket Has been booked")
                    navigate(`/ticketstatus/${data.seatsbooked._id}`)
                } else {
                    toast.error("no price has classname has seatss We are unable to book your ticket please try later")
                }
            } catch (error) {
                setLoading(false)
                console.log(error)
                if (error.response.status == 401) {
                    toast((t) => (
                        <div className="flex space-x-3">
                            <b>Token Expired</b>
                            <button className="w-10/12 text-white bg-[#C0A04C] hover:bg-[#A48533] hover:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center mr-3 md:mr-0 dark:bg-[#C0A04C] dark:hover:bg-white dark:focus:ring-blue-800" onClick={() => navigate('/login')}>
                                Login
                            </button>
                        </div>
                    ));
                }
                toast.error(error.response.data.data)
            }
        }
        // no price
        else if (hasPrice.length == 0 && hasClassName.length != 0) {
            try {
                const ticketdata = {
                    firstname: firstname,
                    type: response.data.eventDetails.type,
                    lastname: lastname,
                    email: email,
                    seats: seats,
                    eventid: eventid,
                    ticketclass: ticketclass
                }
                setLoading(true)
                const { data } = await ClientBookTicket(ticketdata)
                // console.log("checking data for the 404 error",data)
                setLoading(false)
                if (data.seatsBooked != null) {
                    toast.success("Ticket Has been booked")
                    navigate(`/ticketstatus/${data.seatsbooked._id}`)
                } else {
                    toast.error("We are unable to book your ticket please try later")
                }
            } catch (error) {
                setLoading(false)
                console.log(error)
                if (error.response.status == 401) {
                    toast((t) => (
                        <span>
                            <b>Token Expired</b>
                            <button onClick={() => navigate('/login')}>
                                Login
                            </button>
                        </span>
                    ));
                }
                toast.error(error.response.data.data)
            }
        }
        // no price no classname no seats
        else if (hasPrice.length == 0 && hasClassName.length == 0 && hasSeats.length == 0) {
            try {
                const ticketdata = {
                    firstname: firstname,
                    type: response.data.eventDetails.type,
                    lastname: lastname,
                    email: email,
                    seats: seats,
                    eventid: eventid,
                }
                setLoading(true)
                const { data } = await ClientBookTicket(ticketdata)
                // console.log("checking data for the 404 error",data)
                setLoading(false)
                if (data.seatsbooked != null) {
                    toast.success("Ticket Has been booked")
                    navigate(`/ticketstatus/${data.seatsbooked._id}`)
                } else {
                    toast.error("no price no classname no seats We are unable to book your ticket please try later")
                }
            } catch (error) {
                setLoading(false)
                console.log(error)
                if (error.response.status == 401) {
                    toast((t) => (
                        <div className="flex space-x-3">
                            <b>Token Expired</b>
                            <button className="w-10/12 text-white bg-[#C0A04C] hover:bg-[#A48533] hover:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center mr-3 md:mr-0 dark:bg-[#C0A04C] dark:hover:bg-white dark:focus:ring-blue-800" onClick={() => navigate('/login')}>
                                Login
                            </button>
                        </div>
                    ));
                }
                toast.error(error.response.data.data)
            }
        }



    }

    // console.log()

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


    if (response.data == null) {
        return (
            <>loading</>
        )
    }
    else {
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
                            <div className="hidden  md:flex flex-col justify-center">
                                <img className='w-96 h-auto' src={response.data.eventDetails.seatingMap} alt="" />
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


                                        <img className='pt-4' src={response.data.eventDetails.seatingMap} alt="Theater" />
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

                                        <div className="flex md:flex-row flex-col space-y-3 md:space-y-0 md:space-x-3 mt-3">
                                            <div className='flex flex-col bg-[#E7E7E7] pl-2 pr-2 rounded-lg'>
                                                <label className='text-xs mt-1' htmlFor="first name">Select Class</label>
                                                <select
                                                    className='font-medium w-full md:w-56 border bg-transparent border-[#E7E7E7] focus:border-[#E7E7E7] focus:ring-[#E7E7E7]  outline-0'
                                                    onChange={(e) => setTicketclass(e.target.value)}
                                                    onClick={closePrice}
                                                >
                                                    <option>Select Class</option>
                                                    {
                                                        response.data.eventDetails.categories.map((category) => (
                                                            category.className != null && category.seats != null
                                                                ?
                                                                <option value={category.className}>{category.className} ({category.seats - category.bookedSeats.length})</option>
                                                                :
                                                                <option value={category.className}>{category.className}</option>
                                                        ))
                                                    }
                                                </select>

                                            </div>

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

                                        </div>

                                        <div className='flex flex-col justify-between mt-3'>
                                            {
                                                response.data.eventDetails.custom.map((custom, index) => (
                                                    <div className="check">
                                                        <input id="T&C"
                                                            checked={checked[index]}
                                                            onChange={() => handleCheckboxChange(index)}
                                                            type="checkbox" value="" class="w-4 h-4 text-bg-[#A48533]border-gray-300 rounded focus:ring-bg-[#A48533] dark:focus:ring-bg-[#A48533] dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                                        <label for="default-checkb" class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">{custom}</label>
                                                    </div>
                                                ))
                                            }
                                            <div className="check">
                                                <input checked={termsAccepted}
                                                    onChange={(() => setTermsAccepted(!termsAccepted))} id="T&C" type="checkbox" value="" class="w-4 h-4 text-bg-[#A48533]border-gray-300 rounded focus:ring-bg-[#A48533] dark:focus:ring-bg-[#A48533] dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />

                                                <label
                                                    for="default-checkbox" class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                                                    <a href={response.data.eventDetails.termsAndConditions} target="_blank" rel="noopener noreferrer">
                                                        Terms and Conditions
                                                    </a>
                                                </label>
                                            </div>

                                        </div>

                                        {price && (
                                            <>
                                                <div className="flex flex-col p-4 rounded">

                                                    <div className="w-full baseprice flex justify-between">
                                                        <p className='font-semibold'>Base price x{seats}</p>
                                                        <p className='font-semibold'>{basePrice} OMR</p>
                                                    </div>
                                                    <div className="w-full baseprice flex justify-between">
                                                        <p className='font-semibold'>Taxes</p>
                                                        <p className='font-semibold'>{tax} OMR</p>
                                                    </div>
                                                    <hr />
                                                    <div className="w-full baseprice flex justify-between">
                                                        <p className='font-semibold'>Total</p>
                                                        <p className='font-semibold'>{totalPrice} OMR</p>
                                                    </div>
                                                </div>

                                                <div>
                                                    Select Card
                                                    {
                                                        savedCard != null
                                                            ?
                                                            savedCard.length > 0
                                                                ?
                                                                savedCard.map((card) => (
                                                                    <div class="flex items-center pl-4 border border-gray-200 rounded dark:border-gray-700">
                                                                        <input id={card.id} name={card.id} value={card.id} onChange={((e) => setCardid(e.target.value))} type="radio" />
                                                                        <label htmlFor={card.id} class="w-full py-4 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">{card.masked_card}</label>
                                                                    </div>
                                                                ))
                                                                :
                                                                <></>
                                                            :
                                                            <>
                                                                loading
                                                            </>
                                                    }
                                                    <div class="flex items-center pl-4 border border-gray-200 rounded dark:border-gray-700">
                                                        <input id="nocard" type="radio" name="bordered-radio" />
                                                        <label htmlFor="nocard" class="w-full py-4 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Proceed Without Selecting Card</label>
                                                    </div>
                                                </div>
                                            </>
                                        )}

                                        <div onClick={handleBookNowClick} className="flex justify-center w-full mt-3">
                                            <button type="button" class="w-full md:w-full text-white bg-[#C0A04C] hover:bg-[#A48533] focus:ring-4 focus:outline-none focus:ring-bg-[#A48533] font-medium rounded-lg text-sm px-4 py-3 text-center mr-3 md:mr-0 dark:bg-[#C0A04C] dark:hover:bg-white dark:focus:ring-blue-800">
                                                {
                                                    loading
                                                        ?
                                                        <button class="flex justify-center items-center w-full bg-[#C0A04C] hover:bg-[#A48533] rounded-md text-sm font-bold text-gray-50 transition duration-200">
                                                            <img className='h-5' src="/images/icons/button-loading.svg" alt="" />
                                                        </button>
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
                        </div >

                        <div className='fixed hidden lg:flex justify-end flex-col right-5 bottom-10'>
                            <div className='flex justify-between mb-2'>
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
                            <button className='rounded-full hover:bg-[#A48533] bg-[#C0A04C] py-3 pr-6 pl-6 text-white font-semibold'>Need Help?</button>
                        </div>
                    </section >

                    <div className=''>
                        < Footer />
                    </div>
                </div >
            </>
        )
    }
}

export default BookTicket