import React, { useState } from 'react'
import Navbar from '../../components/shared/Navbar/Navbar'
import Tabbar from '../../components/shared/Tabbar/Tabbar'
import Accordian from '../../components/Accordian/Accordian'
import Footer from '../../components/shared/Footer/Footer'
import { Link, useNavigate } from 'react-router-dom'
import EditEventModal from '../../components/EditEventModal/EditEventModal'

const VendorEventDescripton = () => {
    const openModal = () => {
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
    };

    const [showModal, setShowModal] = useState(false)

    const handleShowModal = () => {
        setShowModal(true)
    }

    document.title = 'Vendor ~ Event Info'
    const navigate = useNavigate();
    const handleBack = () => {
        navigate(-1); // This function will take you back to the previous page
    };
    const [accordions, setAccordions] = useState([
        {
            title: 'Event Information',
            content:
                "Amr Diab, the legendary Egyptian singer is set to perform at the Etihad Arena in Abu Dhabi, promising a night of unforgettable entertainment. As one of the most successful musicians in the Arab world and a Guinness World Record Holder, Amr Diab's music has captured the hearts of millions of fans worldwide. So get ready to experience a night like no other. From the moment you step into the Etihad Arena, you will feel excitement and anticipation in the air as the legendary Amr Diab takes the stage.Agenda: Doors Open: 07:30 pm / Show Starts: 08:30 pm No Re-admission. All ages require a valid entrance ticket & there are no discounted tickets for those aged 2yrs-16yrs.Accessible seating available - please call 600 511 115",
            isOpened: true
        },
        { title: 'Venue Details', content: 'something related to venue address landmark or something else', isOpened: false },
        { title: 'Features', content: 'something related to Features address landmark or something else', isOpened: false },
    ]);

    const handleAccordionClick = (index) => {
        const updatedAccordions = accordions.map((accordion, i) => ({
            ...accordion,
            isOpened: i === index ? !accordion.isOpened : false,
        }));
        setAccordions(updatedAccordions);
    };
    return (
        <>
            <Navbar />
            <section className='relative md:mr-48 md:ml-48 mt-5 ml-4 mr-4'>

                <div className="hidden md:flex align-middle items-center">
                    <button onClick={handleBack} className=' mt-1'>
                        <img className='h-14 w-14' src="/images/icons/back-button.png" alt="" />
                    </button>
                    <span className='text-lg font-bold'>Event Description</span>
                </div>

                <div className='mt-3 text-center'>
                    <p className='text-xl md:text-3xl font-bold'>Breakfast and Pool Pass at Crowne Plaza OCEC</p>
                    <p className='text-sm md:text-md font-light'>Turn your breakfast into a day out by the pool at
                        <Link to="/venue/venueid" className='text-[#C0A04C]'>
                            <span>

                                Crowne Plaza OCEC
                            </span>
                        </Link></p>
                    <div className='mt-4 flex justify-center text-center'>
                        <img src=".images/icons/calender.svg" alt="" />
                        <p className='text-sm font-semibold'>Saturday, September 9, 2023 | 19:30</p>
                    </div>
                </div>

                <div className=" grid grid-cols-4">
                    <div className="col-span-4 md:col-span-2  flex flex-col items-stretch justify-center">
                        <div className="w-full max-w-6xl rounded-lg relative">
                            {/* Image */}
                            <img className="h-80 w-full rounded-lg" src="/images/assets/eventdescription.png" alt="" />

                            {/* Top-right Edit and View Sales */}
                            <div className="absolute flex top-0 right-0 mt-4 mr-4 space-x-2">

                                <button className="bg-white text-black text-sm rounded-lg w-15 h-8 pl-3 pr-3 flex items-center justify-center ">
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
                                        <span>1,531 People liked this event</span>
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

                        <div className='mt-3 w-full pl-4 pr-4 py-4 flex flex-col rounded-lg shadow-xl shadow-gray-300'>

                            <div className='p-3 flex items-center align-middle space-x-2'>
                                <img className='h-5' src="/images/icons/map-1.svg" alt="" />
                                <p className='text-md'>Theatre of Arts</p>
                                <span className='text-xs underline underline-offset-1 '>View on maps</span>
                            </div>

                            <hr />

                            <div className='p-2 pb-0 flex justify-between '>
                                <div className='flex flex-col'>
                                    <span className='text-xs'>Ticket price starting from</span>
                                    <span className='font-semibold text-xl'>OMR 390</span>
                                </div>
                                <div className='flex flex-col text-right'>
                                    <p className='text-xs'>Available Tickets</p>
                                    <p className='font-semibold text-xl'>125</p>
                                </div>
                            </div>

                        </div>

                        <div className="mt-3 space-x-5 w-full  justify-center flex align-middle items-center">
                            <button className='w-full flex items-center justify-center shadow-md shadow-gray-500 text-black hover:text-white bg-white hover:bg-[#C0A04C] focus:ring-4 focus:outline-[#C0A04C] focus:ring-blue-300 font-medium rounded-lg text-sm py-2 pl-1 pr-4 text-center mr-3 md:mr-0 dark:bg-[#C0A04C] dark:hover:bg-white dark:focus:ring-blue-800'>
                                <img className='h-4' src="/images/icons/heart.svg" alt="" />
                                <span>Add to Favorite</span>
                            </button>
                            <button className='w-full flex items-center justify-center shadow-md shadow-gray-500 text-black hover:text-white bg-white hover:bg-[#C0A04C] focus:ring-4 focus:outline-[#C0A04C] focus:ring-blue-300 font-medium rounded-lg text-sm py-2 pl-1 pr-4 text-center mr-3 md:mr-0 dark:bg-[#C0A04C] dark:hover:bg-white dark:focus:ring-blue-800'>
                                <img className='h-4' src="/images/icons/heart.svg" alt="" />
                                <span>Add to Calendar</span>
                            </button>
                        </div>
                    </div>

                    <div className="mt-6 h-auto col-span-4 pl-5 pr-5 md:col-span-2 ">
                        {accordions.map((accordion, index) => (
                            <Accordian
                                className='mx-auto'
                                textcol={'font-semibold'}
                                key={index}
                                title={accordion.title}
                                content={accordion.content}
                                isOpened={accordion.isOpened}
                                onClick={() => handleAccordionClick(index)}
                            />
                        ))}

                        <div className="space-y-3">
                            <div className="contactus">
                                <button type="button" class="w-full border text-[#C0A04C] hover:text-white bg-white hover:bg-[#C0A04C] focus:ring-4 focus:outline-[#C0A04C] focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center mr-3 md:mr-0 dark:bg-[#C0A04C] dark:hover:bg-white dark:focus:ring-blue-800">Contact Us</button>

                            </div>
                            <div className="booknow">
                                <button type="button" class="w-full text-white bg-[#C0A04C] hover:bg-white hover:text-[#C0A04C] focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center mr-3 md:mr-0 dark:bg-[#C0A04C] dark:hover:bg-white dark:focus:ring-blue-800">Book Now</button>
                            </div>
                        </div>
                    </div>
                </div>

                <div className='flex flex-col justify-center items-center mt-5'>
                    <span className='text-xl font-bold'>
                        Location
                    </span>
                    <div>
                        <div class="mapouter">
                            <div class="gmap_canvas">
                                <iframe
                                    className={`rounded-xl h-[300px] w-[1000px]`}
                                    id="gmap_canvas" src="https://maps.google.com/maps?q=Muscat&t=&z=13&ie=UTF8&iwloc=&output=embed" frameborder="0" scrolling="no" marginheight="0" marginwidth="0">
                                </iframe>
                            </div>
                        </div>
                    </div>
                </div>

            </section>
            {showModal && (
                <div className="fixed inset-0 flex justify-center z-50 overflow-auto bg-[#FFFFFF] bg-opacity-20 backdrop-blur-sm">
                    <div className="relative rounded-lg ">
                        <EditEventModal
                            isOpen={showModal}
                            onClose={closeModal} />
                        {/* Close button */}
                        <button
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

export default VendorEventDescripton