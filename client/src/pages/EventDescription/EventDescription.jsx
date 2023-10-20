import React, { useState, useEffect } from 'react'
import Navbar from '../../components/shared/Navbar/Navbar'
import Tabbar from '../../components/shared/Tabbar/Tabbar'
import Accordian from '../../components/Accordian/Accordian'
import { ClientEventDetailsApi, addToFavorites, VedorDetails } from '../../http'
import EventCard from '../../components/Cards/EventCard'
import Footer from '../../components/shared/Footer/Footer'
import { Link, useNavigate, useParams, useLocation } from 'react-router-dom'
import { setEvent } from '../../store/eventSlice'
import { useDispatch } from 'react-redux'
import moment from 'moment'
import toast, { Toaster } from 'react-hot-toast';

const EventDescription = () => {
    let { eventid } = useParams();

    console.log(eventid)

    const [loading, setLoading] = useState(false)
    const [response, setReponse] = useState({});
    const [accordions, setAccordions] = useState([])

    document.title = 'Event Info'
    const dispatch = useDispatch();
    useEffect(() => {
        const fetchdata = async () => {
            try {
                setLoading(true)
                const { data } = await ClientEventDetailsApi(eventid)
                // console.log(data.data.eventDetails)
                setReponse(data)
                dispatch(setEvent(data.data));
                setLoading(false)
                let categoryprice = []
                for(const category of data.data.eventDetails.categories){
                    categoryprice.push(`${category.className} = ${category.price}`)
                } 
                setAccordions([
                    {
                        title: 'Event Information',
                        content: <div dangerouslySetInnerHTML={{ __html: data.data.eventDetails.description }} />,
                        isOpened: true
                    },
                    { title: 'Venue Details', content: 'crown plaza', isOpened: false },
                    { title: 'Features', content: data.data.eventDetails.features, isOpened: false },
                    { title: 'Categories', content: categoryprice.join(" | ") , isOpened: false },
                    {
                        title: 'Contact Us',
                        content: (
                            <>
                                <div className='flex space-x-3 mt-2 mb-2'>
                                    {data.data.eventDetails.whatsapp && (
                                        <a href={`https://wa.me/${data.data.eventDetails.whatsapp}?text=I'm interested in the event ${data.data.eventDetails.title} and would like more information`} target="_blank" rel="noopener noreferrer">
                                            <img className='h-7' src="/images/icons/wp-a.svg" alt="" />
                                        </a>
                                    )}
                                    {data.data.eventDetails.facebook && (
                                        <a href={data.data.eventDetails.facebook} target="_blank" rel="noopener noreferrer">
                                            <img className='h-7' src="/images/icons/fb-a.svg" alt="" />
                                        </a>
                                    )}
                                    {data.data.eventDetails.instagram && (
                                        <a href={data.data.eventDetails.instagram} target="_blank" rel="noopener noreferrer">
                                            <img className='h-7' src="/images/icons/ig-a.svg" alt="" />
                                        </a>
                                    )}
                                    {data.data.eventDetails.email && (
                                        <a href={`mailto:${data.data.eventDetails.email}`}>
                                            <img className='h-7' src="/images/icons/emal-a.svg" alt="" />
                                        </a>
                                    )}

                                </div>
                            </>
                        ),
                        isOpened: false
                    },
                ]);

            } catch (error) {
                console.log(error)
            }
        }
        fetchdata()
    }, [eventid]);

    let totalSeats = 0;
    let startPrice = 1000000000;
    let availableSeats = 0;
    let bookedSeats = 0;
    let eventStart;
    let eventEnd;
    if (response.data != null) {
        const availableTickets = response.data.eventDetails.categories
        availableTickets.map((category) => {
            totalSeats += category.seats;
            bookedSeats += category.bookedSeats.length
            category.price < startPrice ? startPrice = category.price : startPrice = startPrice
        })
        availableSeats = totalSeats - bookedSeats
        // console.log("availableTickets", startPrice, availableSeats)

        console.log("date printing", response.data.eventDetails.data)
        // eventStart = response.data.eventDetails.date.dateRange.startDate ; 
        // eventEnd =  response.data.eventDetails.date.dateRange.endDate ;
    }

    const favoriteFeature = async () => {
        // console.log(eventid)
        try {
            const eventdata = {
                eventid: eventid
            }
            const { data } = await addToFavorites(eventdata)
            console.log("data", data)
            toast.success(data.message)
        } catch (error) {
            console.log("error", error)
            if (error.response.status == 401) {
                toast.error("Login to continue further")
                navigate('/login')
            }
            toast.error(error.message)
        }

    }
    const location = useLocation();

    const copyCurrentPageURL = () => {
        const urlToCopy = window.location.origin + location.pathname;

        // Create a temporary input element
        const input = document.createElement('input');
        input.style.position = 'fixed';
        input.style.opacity = 0;
        input.value = urlToCopy;

        // Append the input element to the DOM
        document.body.appendChild(input);

        // Select the URL text in the input field
        input.select();
        input.setSelectionRange(0, 99999); // For mobile devices

        // Copy the URL to the clipboard
        document.execCommand('copy');

        // Remove the input element
        document.body.removeChild(input);

        toast.success("Link copied to clipboard")
    };

    const getVendorDetails = async () => {
        var data = response.data.eventDetails.vendorid
        var eventname = response.data.eventDetails.title

        try {
            const response = await VedorDetails(data)
            const externalURL = `https://wa.me/${response.data.data.mobilenumber}/?text=Interested%20in%20${eventname}.%20Can%20you%20share%20details%20and%20the%20event%20link,%20please%3F`;
            console.log("response",)
            // Use window.location.href to redirect
            window.location.href = externalURL;
        } catch (error) {
            console.log(error)
        }
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

    console.log("response", response)

    if (response.data == null) {
        <>Loading...
        </>
    } else {
        return (
            <div className='appmargine'>
                <Toaster />
                <Navbar />
                <Tabbar />
                <div className='w-full flex justify-center'>
                    <section className='w-full md:w-full sm:mx-5 md:mx-5 md:w-10/12 xl:w-8/12 2xl:w-7/12'>
                        <section className=''>
                            <section>
                                <div className="hidden md:flex align-middle items-center">
                                    <button className="backlogo" onClick={handleBack}>
                                        <img className='h-16' src="/images/icons/back-button.png" alt="" />
                                    </button>
                                    <span className='text-lg font-bold'>Event Description</span>
                                </div>

                                <div className='text-center'>
                                    <p className='text-xl md:text-3xl font-bold'>{response.data.eventDetails.title}</p>
                                    <p className='text-sm md:text-md font-light'>{response.data.eventDetails.shortDescription} at
                                        <Link to="/venue/venueid" className='text-[#C0A04C]'>
                                            <span className='ml-1 font-medium'>
                                                 crown plaza
                                            </span>
                                        </Link></p>
                                    <div className='mt-4 flex justify-center space-x-2 text-center'>
                                        <img className='h-5' src="/images/icons/eventcal.svg" alt="" />
                                        {
                                            response.data.date == 'dateRange'
                                                ?
                                                <p className='text-sm font-semibold'>{moment(response.data.date.eventDetails.dateRange.startDate).format("dddd, MMMM D, YYYY | HH:mm")} to {moment(response.data.date.dateRange.endDate).format("dddd, MMMM D, YYYY | HH:mm")}</p>
                                                :
                                                <p>{response.data.eventDetails.date.recurring.join(" ")}</p>
                                        }
                                    </div>
                                </div>

                                <div className="mt-8 grid grid-cols-4">
                                    <div className="col-span-4 md:col-span-2  flex flex-col ">
                                        <div className="w-full max-w-6xl rounded-lg relative">
                                            {/* Image */}
                                            <img className="h-96 w-full rounded" src={`${response.data.eventDetails.displayPhoto}`} alt="" />

                                            {/* Top-right Edit and View Sales */}
                                            <div className="absolute flex top-0 right-0 mt-4 mr-4 space-x-2">

                                                <button className="bg-white text-white rounded-full w-8 h-8 flex items-center justify-center ">
                                                    <img className="text-white " src="/images/icons/heart.svg" alt="" />
                                                </button>
                                            </div>

                                            {/* Bottom Rectangle */}
                                            <div className="absolute bottom-0 left-0 w-full bg-gray-800 bg-opacity-75 p-2 rounded-lg">
                                                <div className="flex items-center justify-between text-white">
                                                    {/* Like Button */}
                                                    <button className="text-white rounded-md px-3 py-1 hover:bg-red-700">
                                                        <img className='h-7' src="/images/icons/like.svg" alt="" />
                                                    </button>

                                                    {/* Like Count */}
                                                    <div className="flex items-center">
                                                        {/* <span>{response.data.eventDetails.likes.length} People liked this event</span> */}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className='flex mt-3 w-full align-middle justify-between items-center space-x-2'>
                                            <div className="relative rounded-full bg-green-100 h-8 w-8 flex items-center justify-center">
                                                <img className='h-5 w-5' src="/images/icons/call.svg" alt="" />
                                            </div>

                                            <div>
                                                <p className='font-light text-wrap text-xs'>Get exclusive updates on events, artists, offers and things to do</p>
                                            </div>

                                            <div>
                                                <button onClick={copyCurrentPageURL} className='flex items-center shadow-md shadow-gray-500 text-black hover:text-white bg-white hover:bg-[#C0A04C] focus:ring-4 focus:outline-[#C0A04C] focus:ring-blue-300 font-medium rounded-full text-sm md:py-2 pl-2 pr-2 text-center mr-3 md:mr-0 dark:bg-[#C0A04C] dark:hover:bg-white dark:focus:ring-blue-800'>
                                                    <img className='md:h-5 h-8' src="/images/icons/share.svg" alt="" />
                                                </button>

                                            </div>

                                        </div>


                                        <div className='w-full mt-3'>
                                            <div className='card w-full h- pl-4 pr-4 py-4 flex flex-col rounded-xl  border shadow-2xl shadow-[#F3F3F3] rounded-lg '>
                                                <Link to="/whereto">
                                                    <div className='p-3 pt-0 flex items-center align-middle space-x-2'>
                                                        <img className='h-5' src="/images/icons/map-1.svg" alt="" />
                                                        <p className='text-md'> crown plaza</p>
                                                        <span className='text-xs underline underline-offset-1 text-[#C0A04C]'>View on maps</span>
                                                    </div>
                                                </Link>

                                                <hr />

                                                <div className='p-2 pb-0 flex justify-between '>
                                                    <div className='flex flex-col'>
                                                        <p className='text-xs'>Ticket price starting from</p>
                                                        <p className='font-semibold text-xl'>{startPrice}</p>
                                                    </div>
                                                    <div className='flex flex-col text-right'>
                                                        <p className='text-xs'>Available Tickets</p>
                                                        <p className='font-semibold text-xl'>{availableSeats}</p>
                                                    </div>
                                                </div>

                                            </div>

                                            <div className="mt-3 space-x-5 justify-center flex align-middle items-center">
                                                {/* <Link to='/favorites' className='w-full'> */}
                                                <button
                                                    onClick={favoriteFeature}
                                                    className='flex justify-center align-middle items-center w-full drop-shadow-2xl shadow-[#F3F3F3] rounded-lg bg-white p-2'>
                                                    <img className='h-4' src="/images/icons/heart.svg" alt="" />
                                                    <span>Add to Favorite</span>
                                                </button>
                                                {/* </Link> */}
                                                <button className='flex justify-center align-middle items-center w-full drop-shadow-2xl shadow-[#F3F3F3] rounded-lg bg-white p-2'>
                                                    <img className='h-4' src="/images/icons/eventcal.svg" alt="" />
                                                    <span>Add to Calendar</span>
                                                </button>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="mt-3 md:mt-0 h-auto col-span-4 pl-5 pr-5 md:col-span-2 ">
                                        <div className="eventdesc w-full ">
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

                                        <div className="">
                                            <Link to={`/bookticket/${response.data.eventDetails._id}`}>
                                                <div className="booknow">
                                                    <button type="button" class="w-full text-white bg-[#C0A04C] hover:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-3 text-center mr-3 md:mr-0 dark:bg-[#C0A04C] dark:hover:bg-white dark:focus:ring-blue-800 hover:bg-[#A48533]">Book Now</button>
                                                </div>
                                            </Link>
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
                                                    className={`rounded-xl h-48 w-80 md:h-[386px] md:w-[1000px]`}
                                                    id="gmap_canvas" src="https://maps.google.com/maps?q=Muscat&t=&z=13&ie=UTF8&iwloc=&output=embed" frameborder="0" scrolling="no" marginheight="0" marginwidth="0">
                                                </iframe>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className='flex flex-col justify-center items-center mt-5'>
                                    <span className='text-xl font-bold'>
                                        Upcoming Events
                                    </span>

                                </div>
                                <div className='ml-2 mr-2'>
                                    <div className="md:flex md:justify-start carousel p-4 flex items-center justify-start overflow-x-auto scroll-smooth  scrollbar-hide space-x-1 md:space-x-5">
                                        {response.data.upcomingEvents.map((event) => (
                                            <div >
                                                < EventCard data={event} />
                                            </div>
                                        ))}
                                    </div>
                                </div>



                                <section>
                                    <section className='mt-3 ml-3 mr-3'>
                                        <div className='flex justify-between '>
                                            <div className="left"><span className='text-xl font-bold'>Offers</span></div>
                                            <div className="right"></div>

                                        </div>

                                        <div className="ml-1 mr-1">
                                            <div className='md:flex md:justify-start carousel snap-x p-4 flex items-center justify-start overflow-x-auto scroll-smooth  scrollbar-hide space-x-3 md:space-x-12'>
                                                {
                                                    response.data.offers.map((offer) => (
                                                        <img className='h-64 w-52 snap-start' src={`${offer.photo}`} alt="" />

                                                    ))
                                                }
                                            </div>
                                            <div className='flex justify-end space-x-2 '>
                                                <p className='underline underline-offset-1 text-sm pr-2 '>view all</p>
                                            </div>
                                        </div>
                                    </section>
                                </section>

                                <div className="standalone:hidden relative mt-8 ml-6 mr-6">
                                    <img className='h-16 md:h-auto' src="/images/assets/download.png" alt="" />

                                    <div className='hidden xl:flex justify-end flex-col absolute -right-48 bottom-0'>
                                        <div className='flex justify-between mb-2'>
                                            <button className='rounded-full p-2 hover:bg-[#A48533] bg-[#C0A04C]'>
                                                <img className='h-6 ' src="/images/icons/uparrow.svg" alt="" />
                                            </button>
                                            {/* <img className='h-10 ml-24' src="/images/icons/whatsapp-color.svg" alt="" /> */}
                                            <button>
                                            </button>
                                        </div>
                                        <button className='rounded-full hover:bg-[#A48533] bg-[#C0A04C] py-3 pr-6 pl-6 text-white font-semibold'>Need Help?</button>
                                    </div>
                                </div>
                            </section>
                        </section>
                    </section>

                </div>

                <div className=''>
                    < Footer />
                </div>
            </div>
        )
    }


}

export default EventDescription