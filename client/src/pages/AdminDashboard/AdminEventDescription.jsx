import React, { useState, useEffect } from 'react'
import Navbar from '../../components/shared/Navbar/Navbar'
import Accordian from '../../components/Accordian/Accordian'
import { getEventDataApi } from '../../http/index'
import Footer from '../../components/shared/Footer/Footer'
import { Link, useNavigate, useParams } from 'react-router-dom'
import EditEventModal from '../../components/EditEventModal/EditEventModal'
import moment from 'moment'

const AdminEventDescription = () => {

    let { eventid } = useParams();

    console.log(eventid)

    const [response, setReponse] = useState({});

    document.title = 'Vendor ~ Event Info'

    useEffect(() => {
        const fetchdata = async () => {
            try {
                const { data } = await getEventDataApi(eventid)
                console.log(data.data)
                setReponse(data)
                setAccordions([
                    {
                        title: 'Event Information',
                        content:
                            `${data.data.description}`,
                        isOpened: true
                    },
                    { title: 'Venue Details', content: `${data.data.location}`, isOpened: false },
                    { title: 'Features', content: `${data.data.features}`, isOpened: false },
                ]);

            } catch (error) {
                console.log(error)
            }
        }

        fetchdata()
    }, [eventid]);

    const openModal = () => {
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
    };

    const [showModal, setShowModal] = useState(false)

    const [accordions, setAccordions] = useState([])

    const handleShowModal = () => {
        setShowModal(true)
    }

    const navigate = useNavigate();
    const handleBack = () => {
        navigate(-1); // This function will take you back to the previous page
    };

    const handleAccordionClick = (index) => {
        const updatedAccordions = accordions.map((accordion, i) => ({
            ...accordion,
            isOpened: i === index ? !accordion.isOpened : false,
        }));
        setAccordions(updatedAccordions);
    };

    if (response.data == null) {
        return (<div className='h-screen w-full flex justify-center align-middle items-center'>
            <img src="/images/icons/loadmain.svg" alt="" />
        </div>)
    }
    else {
        return (
            <section className='relative md:mr-48 md:ml-48 mt-5 ml-4 mr-4'>

                <div className="hidden md:flex align-middle items-center">
                    <button onClick={handleBack} className=' mt-1'>
                        <img className='h-14 w-14' src="/images/icons/back-button.png" alt="" />
                    </button>
                    <span className='text-lg font-bold'>Event Description</span>
                </div>

                <div className='text-center'>
                    <p className='text-xl md:text-3xl font-bold'>{response.data.title}</p>
                    <p className='text-sm md:text-md font-light'>{response.data.description} at
                        <Link to="/venue/venueid" className='text-[#C0A04C]'>
                            <span className='ml-1'>
                                {response.data.location}
                            </span>
                        </Link></p>
                    <div className='mt-4 flex justify-center text-center'>
                        <img src="/images/icons/calender.svg" alt="" />
                        <p className='text-sm font-semibold'>{moment(response.data.date).format("dddd, MMMM D, YYYY | HH:mm")}</p>
                    </div>
                </div>

                <div className="mt-5  grid grid-cols-4">
                    <div className="col-span-4 md:col-span-2  flex flex-col items-stretch justify-center">
                        <div className="w-full max-w-6xl rounded-lg relative">
                            {/* Image */}
                            <img className="h-80 w-full rounded-lg" src={`${response.data.displayPhoto}`} alt="" />

                            {/* Top-right Edit and View Sales */}
                            <div className="absolute flex top-0 right-0 mt-4 mr-4 space-x-2">

                                <button onClick={() => navigate(`/admin/${response.data._id}/bookedtickets`)} className="bg-white text-black text-sm rounded-lg w-15 h-8 pl-3 pr-3 flex items-center justify-center ">
                                    View Sales
                                </button>

                                <button onClick={handleShowModal} className="bg-white text-white rounded-full w-8 h-8 flex items-center justify-center ">
                                    <img className="text-white " src="/images/icons/edit.svg" alt="" />
                                </button>
                            </div>

                            {/* Bottom Rectangle */}
                            <div className="absolute bottom-0 left-0 w-full bg-gray-800 bg-opacity-75 p-2">
                                <div className="flex items-center justify-between text-white">
                                    {/* Like Button */}
                                    <button className="text-white rounded-md px-3 py-1 hover:bg-red-700">
                                        <img className='h-7' src="/images/icons/like.svg" alt="" />
                                    </button>

                                    {/* Like Count */}
                                    <div className="flex items-center">
                                        <span>{response.data.likes.length} People liked this event</span>
                                    </div>
                                </div>
                            </div>
                        </div>


                        <div className='flex mt-3 w-full  align-middle items-strech space-x-2'>
                            <div className="relative rounded-full bg-green-100 h-8 w-8 flex items-center justify-center">
                                <img className='h-5 w-5' src="/images/icons/call.svg" alt="" />
                            </div>

                            <div>
                                <p className='font-light text-wrap text-xs'>Get exclusive updates on events, artists, offers and things to do</p>
                            </div>
                            <div>
                                <button className='flex items-center shadow-md shadow-gray-500 text-black hover:text-white bg-white hover:bg-[#C0A04C] focus:ring-4 focus:outline-[#C0A04C] focus:ring-blue-300 font-medium rounded-lg text-sm py-2 pl-1 pr-4 text-center mr-3 md:mr-0 dark:bg-[#C0A04C] dark:hover:bg-white dark:focus:ring-blue-800'>
                                    <img className='h-4' src="/images/icons/share.svg" alt="" />
                                    <span>Share</span>
                                </button>

                            </div>

                        </div>


                    </div>

                    <div className="mt-3 md:mt-0 h-auto col-span-4 pl-5 pr-5 md:col-span-2 ">
                        <div className='card w-full h- pl-4 pr-4 py-4 flex flex-col rounded-xl  border shadow-2xl shadow-[#F3F3F3] rounded-lg '>

                            <div className='p-3 pt-0 flex items-center align-middle space-x-2'>
                                <img className='h-5' src="/images/icons/map-1.svg" alt="" />
                                <p className='text-md'>{response.data.location}</p>
                                <span className='text-xs underline underline-offset-1 text-[#C0A04C]'>View on maps</span>
                            </div>

                            <hr />

                            <div className='p-2 pb-0 flex justify-between '>
                                <div className='flex flex-col'>
                                    <p className='text-xs'>Ticket price starting from</p>
                                    <p className='font-semibold text-xl'>{response.data.silverPrice}</p>
                                </div>
                                <div className='flex flex-col text-right'>
                                    <p className='text-xs'>Available Tickets</p>
                                    <p className='font-semibold text-xl'>{(response.data.goldSeats + response.data.platinumSeats + response.data.silverSeats) - response.data.bookedSeats.length}</p>
                                </div>
                            </div>

                        </div>

                        <div className="mt-3 space-x-5 justify-center flex align-middle items-center">
                            <Link to='' className='w-full'>
                                <button className='flex justify-center align-middle items-center w-full drop-shadow-2xl shadow-[#F3F3F3] rounded-lg bg-white p-2'>
                                    <img className='h-4' src="/images/icons/heart.svg" alt="" />
                                    <span>Add to Favorite</span>
                                </button>
                            </Link>
                            <button className='flex justify-center align-middle items-center w-full drop-shadow-2xl shadow-[#F3F3F3] rounded-lg bg-white p-2'>
                                <img className='h-4' src="/images/icons/vendor-calender.svg" alt="" />
                                <span>Add to Calendar</span>
                            </button>
                        </div>

                        <div className="">
                            <div className="contactus mb-5 mt-5">
                                <Link to='/contactus'>
                                    <button type="button" class="border border-[#C0A04C] w-full border text-[#C0A04C] hover:text-white bg-white hover:bg-[#C0A04C] focus:ring-4 focus:outline-[#C0A04C] focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-3 text-center mr-3 md:mr-0 dark:bg-[#C0A04C] dark:hover:bg-white dark:focus:ring-blue-800">Contact Us</button>
                                </Link>

                            </div>
                            <Link to="">
                                <div className="booknow">
                                    <button type="button" class="w-full text-white bg-[#C0A04C] hover:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-3 text-center mr-3 md:mr-0 dark:bg-[#C0A04C] dark:hover:bg-white dark:focus:ring-blue-800 hover:bg-[#A48533]">Book Now</button>
                                </div>
                            </Link>
                        </div>
                    </div>
                </div>

                <div className="eventdesc w-full mt-8">
                    {accordions.map((accordion, index) => (
                        <Accordian
                            className='mx-auto'
                            textcol={'font-semibold'}
                            contentfont={'font-medium text-gray-500'}
                            key={index}
                            title={accordion.title}
                            content={accordion.content}
                            isOpened={accordion.isOpened}
                            onClick={() => handleAccordionClick(index)}
                        />
                    ))}
                </div>

                <div className='flex flex-col justify-center items-center mt-5'>
                    <span className='text-xl font-bold'>
                        Location
                    </span>
                    <div>
                        <div class="mapouter">
                            <div class="gmap_canvas">
                                <iframe
                                    className={`rounded-xl h-48 w-80 md:h-[300px] md:w-[1000px]`}
                                    id="gmap_canvas" src="https://maps.google.com/maps?q=Muscat&t=&z=13&ie=UTF8&iwloc=&output=embed" frameborder="0" scrolling="no" marginheight="0" marginwidth="0">
                                </iframe>
                            </div>
                        </div>
                    </div>
                </div>

            </section>

  )
}
}

export default AdminEventDescription