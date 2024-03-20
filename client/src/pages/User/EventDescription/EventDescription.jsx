import React, { useState, useEffect, useRef } from 'react'
import Navbar from '../../../components/shared/Navbar/Navbar'
import Tabbar from '../../../components/shared/Tabbar/Tabbar'
import Accordian from '../../../components/Accordian/Accordian'
import { ClientEventDetailsApi, addToFavorites, addToCalender } from '../../../http/index'
import EventCard from '../../../components/Cards/EventCard'
import Footer from '../../../components/shared/Footer/Footer'
import { Link, useNavigate, useParams, useLocation } from 'react-router-dom'
import { setEvent } from '../../../store/eventSlice'
import { useDispatch } from 'react-redux'
import moment from 'moment'
import toast, { Toaster } from 'react-hot-toast';
import MapComponent from '../../../components/GoogleMap/Map'
import { useSelector } from 'react-redux'

const EventDescription = () => {
    document.title = 'Event Info'

    let { eventid } = useParams();

    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [images, setImages] = useState([]);
    const handleShowNextImage = () => {
        setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    };
    const handleShowPrevImage = () => {
        setCurrentImageIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
    };

    const onMarkerClick = () => {
        console.log("ok")
    }
    const [isStandalone, setIsStandalone] = useState(false);

    useEffect(() => {
        // Check if the PWA is in standalone mode
        const mediaQuery = window.matchMedia('(display-mode: standalone)');
        setIsStandalone(mediaQuery.matches);

        // Listen for changes to the display mode
        const handleChange = (event) => {
            setIsStandalone(event.matches);
        };

        mediaQuery.addEventListener('change', handleChange);

        // Clean up the event listener
        return () => {
            mediaQuery.removeEventListener('change', handleChange);
        };
    }, []);

    const [isDropdownOpen, setDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);
    const toggleDropdown = () => {
        setDropdownOpen(!isDropdownOpen);
    };

    const [isLiked, setIsLiked] = useState(false)
    const { user, isAuth } = useSelector((state) => state.auth);
    const [selectedLocation, setSelectedLocation] = useState({
        lat: 23.58371305879854,
        lng: 58.37132692337036,
    });

    const [loading, setLoading] = useState(false)
    const [response, setReponse] = useState({});
    const [accordions, setAccordions] = useState([])
    const [fetchLikes, setFetchLikes] = useState(false)
    // console.log("isMobile",isMobileDevice)
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

    const [screenWidth, setScreenWidth] = useState(window.innerWidth);
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 768); // Set an initial value based on the screen width

    // Function to update screen size and isMobile when the window is resized
    const handleResize = () => {
        const width = window.innerWidth;
        setScreenWidth(width);
        setIsMobile(width <= 768);
    };

    const [showNumber, setShowNumber] = useState(false)
    const handleCalling = (phone) => {
        if (isMobile) {
            const tempLink = document.createElement('a');
            tempLink.href = `tel:+${phone}`; // Replace with your actual phone number
            tempLink.click();
            // window.open = (`tel:+${phone}`, '_self')
        } else {
            setShowNumber(true)
        }
    }


    // Add event listener for window resize
    useEffect(() => {
        window.addEventListener('resize', handleResize);

        // Clean up the event listener when the component unmounts
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const [ticketSale, setTicketSale] = useState(true)
    const [showBooking, setShowBooking] = useState(true)

    const dispatch = useDispatch();

    const [isExternalLink, setIsExternalLink] = useState(false)
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
                for (const category of data.data.eventDetails.categories) {
                    if (category.className != null && category.price != null) {
                        categoryprice.push(`${category.className} = ${category.price}`)
                    }
                }

                for (const category of data.data.eventDetails.categories) {
                    // console.log("category name is what", category.className)
                    if (category.className == null) {
                        setTicketSale(false)
                        if ((data.data.eventDetails.whatsapp == '' || data.data.eventDetails.whatsapp == null) || (data.data.eventDetails.website == '' && data.data.eventDetails.website == null)) {
                            setShowBooking(false)
                        }
                    }
                }

                setSelectedLocation({
                    lat: data.data.eventDetails.location.coordinates.lat,
                    lng: data.data.eventDetails.location.coordinates.lng
                })

                setImages((prevImages) => {
                    const uniqueImages = new Set([
                        ...(data.data.eventDetails.displayPhoto ? [data.data.eventDetails.displayPhoto] : []),
                        ...(data.data.eventDetails.AdditionalPhotos || []),
                        ...(data.data.eventDetails.banner || []),
                        ...(data.data.eventDetails.video ? [data.data.eventDetails.video] : []),
                        ...prevImages,
                    ]);

                    // Convert the Set back to an array
                    return [...uniqueImages];
                });


                // Assuming setAccordions is a state update function
                const newAccordions = [];

                // Event Details
                if (data.data.eventDetails.description) {
                    newAccordions.push({
                        title: 'Event Details',
                        content: <div className='dark:bg-[#2c2c2c] dark:text-white' dangerouslySetInnerHTML={{ __html: data.data.eventDetails.description }} />,
                        isOpened: true,
                    });
                }

                // Venue Details
                if (data.data.eventDetails.venueInfo) {
                    newAccordions.push({
                        title: 'Venue Details',
                        content: <div className='dark:bg-[#2c2c2c] dark:text-white' dangerouslySetInnerHTML={{ __html: data.data.eventDetails.venueInfo }} />,
                        isOpened: false,
                    });
                }

                // Features
                if (data.data.eventDetails.features && data.data.eventDetails.features.length > 0) {
                    newAccordions.push({
                        title: 'Features',
                        content: data.data.eventDetails.features.join(" | "),
                        isOpened: false,
                    });
                }

                // Categories
                if (categoryprice.length > 0) {
                    newAccordions.push({
                        title: 'Categories',
                        content: categoryprice.join(" | "),
                        isOpened: false,
                    });
                }

                // Contact Us
                if (
                    data.data.eventDetails.facebook ||
                    data.data.eventDetails.instagram ||
                    data.data.eventDetails.email ||
                    data.data.eventDetails.website
                ) {
                    newAccordions.push({
                        title: 'Contact Details',
                        content: (
                            <>
                                <div className='flex space-x-3 mt-2 mb-2'>
                                    {data.data.eventDetails.facebook && (
                                        <a href={data.data.eventDetails.facebook} target="_blank" rel="noopener noreferrer">
                                            <img className='h-7' src="/images/icons/facebook.png" alt="" />
                                        </a>
                                    )}
                                    {data.data.eventDetails.instagram && (
                                        <a href={data.data.eventDetails.instagram} target="_blank" rel="noopener noreferrer">
                                            <img className='h-7' src="/images/icons/instagram.png" alt="" />
                                        </a>
                                    )}
                                    {data.data.eventDetails.email && (
                                        <a href={`mailto:${data.data.eventDetails.email}`}>
                                            <img className='h-7' src="/images/icons/mail.png" alt="" />
                                        </a>
                                    )}
                                    {data.data.eventDetails.website && (
                                        <a href={data.data.eventDetails.website}>
                                            <img className='h-7' src="/images/icons/web.png" alt="" />
                                        </a>
                                    )}
                                </div>
                            </>
                        ),
                        isOpened: false,
                    });
                }

                // Update the state with the new accordions
                setAccordions(newAccordions);

                setIsLiked(isAuth && data.data.eventDetails.likes.includes(user._id))

            } catch (error) {
                console.log(error)
            }
        }


        fetchdata()

    }, [eventid, user, isAuth, fetchLikes]);

    const ContentDisplay = ({ currentContent }) => {
        // console.log(currentContent)
        if (isVideo(currentContent)) {
            return (
                <video className="h-auto w-full rounded" controls>
                    <source src={currentContent} type="video/mp4" />
                    Your browser does not support the video tag.
                </video>
            );
        } else {
            return <img className="h-auto w-full rounded" src={currentContent} alt="" />;
        }
    };

    // Helper functions to check content type
    const isImage = (url) => /\.(jpeg|jpg|gif|png)$/.test(url);
    const isVideo = (url) => /\.(mp4|webm|ogg)$/.test(url);




    let totalSeats = 0;
    let startPrice = 1000000000;
    let availableSeats = 0;
    let bookedSeats = 0;
    let NoOfDays = 1;
    let eventStart;
    let eventEnd;
    if (response.data != null) {
        if (response.data.eventDetails && response.data.eventDetails.categories) {

            const dateType = response.data.eventDetails.date.type

            if (dateType == 'dateRange') {
                console.log("check one passed")
                if (response.data.eventDetails.date.dateRange.endDate && response.data.eventDetails.date.dateRange.startDate) {
                    const eventEndDate = moment(response.data.eventDetails.date.dateRange.endDate)
                    const eventStartDate = moment(response.data.eventDetails.date.dateRange.startDate)
                    NoOfDays = eventEndDate.diff(eventStartDate, 'days') + 1
                }
                console.log("no of days", NoOfDays + 1)
            } else {
                if (response.data.eventDetails.date.recurring.endDate && response.data.eventDetails.date.recurring.startDate) {
                    const eventEndDate = moment(response.data.eventDetails.date.recurring.endDate)
                    const eventStartDate = moment(response.data.eventDetails.date.recurring.startDate)
                    NoOfDays = eventEndDate.diff(eventStartDate, 'days') + 1
                }
            }

            const availableTickets = response.data.eventDetails.categories
            availableTickets.map((category) => {
                if (category.seats != null) {

                    totalSeats += category.seats * NoOfDays;
                    bookedSeats += category.bookedSeats.length
                    availableSeats = totalSeats - bookedSeats
                } else {
                    availableSeats = "∞"
                }
                if (category.price != null) {
                    category.price < startPrice ? startPrice = category.price : startPrice = startPrice
                } else {
                    startPrice = 0
                }
            })
        }
    }


    const favoriteFeature = async () => {
        // console.log(eventid)
        setIsLiked(!isLiked)

        try {
            const eventdata = {
                eventid: eventid
            }
            const { data } = await addToFavorites(eventdata)
            // console.log("data", data)
            toast.success(data.message)
            setFetchLikes(!fetchLikes)
        } catch (error) {
            console.log("error", error)
            if (error.response.status == 401) {
                toast.error("Login to continue further")
                navigate('/login')
            }
        }

    }

    const addToGoogleCalender = async (vendorid) => {
        setLoading(true);

        try {
            let startTime = response.data.eventDetails.date.type == 'dateRange' ? response.data.eventDetails.date.dateRange.startDate : response.data.eventDetails.date.recurring.startDate
            let endTime = response.data.eventDetails.date.type == 'dateRange' ? response.data.eventDetails.date.dateRange.endDate : response.data.eventDetails.date.recurring.endDate
            const calenderdata = {
                title: response.data.eventDetails.title,
                shortDescription: response.data.eventDetails.shortDescription,
                location: response.data.eventDetails.location.name,
                startTime: startTime,
                endTime: endTime
            }
            await toast.promise(addToCalender(calenderdata), {
                loading: 'Adding to you calender...',
                success: 'Event Added to your calender',
                error: (error) => `${error.response.data.data || "something went wrong"}`,
            });

            // Refresh or update the UI as needed after successful verification
            // setRefresh(!refresh);
        } catch (error) {
            // toast.error(error.response.data.data);
            // console.log("error", error)
            if (error.response.status == 401) {
                toast.error("Login to continue further")
                navigate('/login')
            }
        }
    };

    const location = useLocation();

    const navigate = useNavigate();
    const handleBack = () => {
        navigate(-1); // This function will take you back to the previous page
    };

    const handleAccordionClick = (index) => {
        setAccordions((prevAccordions) => {
            return prevAccordions.map((accordion, i) => ({
                ...accordion,
                isOpened: i === index ? !accordion.isOpened : accordion.isOpened,
            }));
        });
    };

    const shareonFacebook = () => {
        const facebookShareURL = `https://www.facebook.com/sharer/sharer.php?u=${window.location.origin + location.pathname}`;
        window.open(facebookShareURL, '_blank');
    }

    const shareonMail = () => {
        const subject = 'Check out this link';
        const emailBody = `I thought you might find this interesting: ${window.location.origin + location.pathname}`;
        window.location.href = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(emailBody)}`;
    }

    const shareonWhatsapp = () => {
        const shareonwhatsapp = `https://api.whatsapp.com/send?text=${window.location.origin + location.pathname}`;
        window.open(shareonwhatsapp, '_blank');
    }


    const handleBooking = (eventid) => {
        if (ticketSale) {
            navigate(`/bookticket/${eventid}`)
        }
        else {
            if (response.data.eventDetails.website != '' && response.data.eventDetails.website != null) {
                const tempLink = document.createElement('a');
                tempLink.href = `${response.data.eventDetails.website}`; // Replace with your actual phone number
                tempLink.click();
            }
            else {
                toast.error("Event booking is not enabled")
            }
        }
    }


    return (
        <div className='h-full dark:bg-[#2c2c2c] dark:text-white'>
            <div className='z-20 '>
                <Toaster />
                <Navbar />
                <Tabbar />
            </div>
            <div className='px-5 w-full flex justify-center'>
                <section className='w-full md:w-11/12 md:mx-5 md:w-10/12 xl:w-8/12 2xl:w-7/12'>
                    {response.data == null && (
                        <div className='fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 overflow-auto bg-[#FFFFFF] bg-opacity-20 backdrop-blur-sm'>
                            <div class="h-screen w-screen relative flex justify-center items-center">
                                <div class="absolute animate-spin rounded-full h-32 w-32 border-t-4 border-b-4 border-[#C0A04C]"></div>
                                <img src="/images/logo/logo-main.png" class="h-16" />
                            </div>
                        </div>
                    )}
                    <section className=''>
                        <section>
                            <div className="hidden md:flex align-middle items-center">
                                <button className="backlogo" onClick={() => navigate(-1)}>
                                    <img className='h-16' src="/images/icons/back-button.png" alt="" />
                                </button>
                                {
                                    response.data != null && (
                                        <span className='text-lg font-bold'>
                                            {
                                                response.data.eventDetails.type == 'event'
                                                    ?
                                                    <>Event</>
                                                    :
                                                    <>Voucher</>
                                            } Description
                                        </span>
                                    )
                                }
                            </div>

                            <div className='mt-5 text-center'>
                                {
                                    response.data == null
                                        ?
                                        <>
                                            <div className='flex flex-col justify-center items-center'>
                                                <div class="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4"></div>
                                            </div>
                                            <div className='flex flex-col justify-center items-center'>
                                                <div class="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-96 mb-4"></div>
                                            </div>
                                            <div className='flex flex-col justify-center items-center'>
                                                <div class="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-96 mb-4"></div>
                                            </div>
                                        </>
                                        :
                                        <>
                                            <p className='text-xl md:text-3xl font-bold'>{response.data.eventDetails.title}</p>
                                            <p className='text-sm md:text-md font-light'>{response.data.eventDetails.shortDescription} at
                                                <Link to={`/venue/${response.data.eventDetails.location._id}`} className='text-[#C0A04C]'>
                                                    <span className='ml-1 font-medium'>
                                                        {response.data.eventDetails.location?.name || ""}
                                                    </span>
                                                </Link></p>
                                            <div className='mt-4 flex justify-center space-x-2 text-center'>
                                                <img className='h-5 flex dark:hidden' src="/images/icons/eventcal.svg" alt="" />
                                                <img className='h-5 hidden dark:flex' src="/images/icons/eventcal-light.svg" alt="" />
                                                {
                                                    response.data.eventDetails.date.type == 'dateRange'
                                                        ?
                                                        <p className='text-xs md:text-sm font-semibold'>{moment(response.data.eventDetails.date.dateRange.startDate).format("dddd, MMMM D, YYYY")}
                                                            {response.data.eventDetails.showEndDate
                                                                ?
                                                                <>
                                                                    <span className="mx-3">
                                                                        to
                                                                    </span>
                                                                    {moment(response.data.eventDetails.date.dateRange.endDate).format("dddd, MMMM D, YYYY")}
                                                                </>
                                                                :
                                                                <>
                                                                </>
                                                            }
                                                        </p>
                                                        :
                                                        <p>
                                                            On {response.data.eventDetails.date.recurring.days
                                                                .join(", ")
                                                                .charAt(0)
                                                                .toUpperCase() +
                                                                response.data.eventDetails.date.recurring.days.join(", ").slice(1)}
                                                        </p>
                                                }
                                            </div>
                                        </>
                                }
                            </div>

                            <div className="mt-8 grid grid-cols-4">
                                <div className="col-span-4 md:col-span-2  flex flex-col ">
                                    {
                                        response.data == null
                                            ?
                                            <>
                                                <div class="h-96 bg-gray-300"></div>
                                            </>
                                            :
                                            <>
                                                <div className="w-full max-w-6xl rounded-lg relative">
                                                    {/* Image */}
                                                    <ContentDisplay currentContent={images[currentImageIndex]} />

                                                    {/* Top-right Edit and View Sales */}
                                                    <div className="absolute flex top-0 right-0 mt-4 mr-4 space-x-2">

                                                        <button onClick={() => favoriteFeature(response.data._id)} className="bg-white text-white rounded-full w-8 h-8 flex items-center justify-center ">
                                                            {/* <img className='' src="/images/icons/heart-fav.svg" alt="" /> */}

                                                            {
                                                                isLiked ?
                                                                    <img className='' src="/images/icons/heart-fav.svg" alt="" />
                                                                    :
                                                                    <img src="/images/icons/heart.svg" alt="" />
                                                            }
                                                        </button>
                                                    </div>

                                                    {/* Bottom Rectangle */}
                                                    <div className="absolute bottom-0 left-0 w-full bg-gray-800 bg-opacity-25 p-2 rounded-lg">
                                                        <div className="flex items-center justify-between text-white">
                                                            {/* Like Button */}
                                                            <button className="text-white rounded-md px-3 py-1 hover:bg-red-700">

                                                            </button>

                                                            {/* Like Count */}
                                                            <div className="flex items-center">
                                                                <img className='h-4' src="/images/icons/like.svg" alt="" />
                                                                <span className='ml-1'>
                                                                    {response.data.eventDetails.likes.length === 0
                                                                        ? "be the first one to like this"
                                                                        : response.data.eventDetails.likes.length < 10
                                                                            ? "Several people liked this"
                                                                            : `${response.data.eventDetails.likes.length} People liked this `}
                                                                </span>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    {
                                                        images.length > 1
                                                            ?
                                                            <div className="absolute flex items-center -bottom-10 left-1/2 transform -translate-x-1/2 space-x-2">
                                                                <button onClick={() => {
                                                                    handleShowPrevImage();
                                                                    window.scrollTo({
                                                                        top: 90,
                                                                        behavior: 'smooth', // You can use 'auto' for instant scrolling
                                                                    })
                                                                }} className="bg-[#C0A04C] text-white text-sm rounded-lg px-3 py-1">
                                                                    Prev
                                                                </button>
                                                                <button onClick={() => {
                                                                    handleShowNextImage();
                                                                    window.scrollTo({
                                                                        top: 90,
                                                                        behavior: 'smooth', // You can use 'auto' for instant scrolling
                                                                    })
                                                                }

                                                                } className="bg-[#C0A04C] text-white text-sm rounded-lg px-3 py-1">
                                                                    Next
                                                                </button>
                                                            </div>
                                                            :
                                                            <></>
                                                    }
                                                </div>

                                                <div className='flex mt-3 w-full align-middle justify-between items-center space-x-2'>
                                                    {
                                                        response.data.eventDetails.phoneNo && (
                                                            <div onClick={() => handleCalling(response.data.eventDetails.phoneNo)} className="relative rounded-full bg-green-100 h-8 w-8 flex items-center justify-center">
                                                                <img className='h-5 w-5' src="/images/icons/call.svg" alt="" />
                                                            </div>
                                                        )
                                                    }

                                                    <div>
                                                        <p className='font-light text-wrap text-xs'></p>
                                                    </div>

                                                    <div className="dropdown-container relative">
                                                        <button
                                                            onClick={toggleDropdown}
                                                            className='relative flex justify-center align-middle items-center space-x-2 bg-[#C0A04C] hover:bg-[#A48533] dark:bg-[#C0A04C] dark:hover:bg-[#A48533] px-2 rounded-md shadow-md shadow-gray-500 font-medium text-sm md:py-1'>
                                                            <img className='md:h-3 h-3 mr-1 ' src="/images/icons/share.svg" alt="" />
                                                            Share
                                                        </button>
                                                        {isDropdownOpen && (
                                                            <div
                                                                className="z-50 dropdown absolute right-0 top-full mt-2 w-32 p-3 bg-white rounded-md drop-shadow-md"
                                                                ref={dropdownRef}
                                                            >
                                                                <div className="flex space-x-3 socialmedia">
                                                                    <img onClick={shareonWhatsapp} className='cursor-pointer h-7' src="/images/icons/wp-a.svg" alt="" />
                                                                    <img onClick={shareonFacebook} className='cursor-pointer h-7' src="/images/icons/fb-a.svg" alt="" />
                                                                    <img onClick={shareonMail} className='cursor-pointer h-7' src="/images/icons/emal-a.svg" alt="" />
                                                                </div>
                                                            </div>
                                                        )}
                                                    </div>

                                                </div>


                                                <div className='w-full mt-3'>
                                                    <div className='card w-full h- pl-4 pr-4 py-4 flex flex-col rounded-xl  border shadow-2xl shadow-[#F3F3F3] rounded-lg '>
                                                        <Link to="/whereto">
                                                            <div className='p-3 pt-0 flex items-center align-middle space-x-2'>
                                                                <img className='h-5 flex dark:hidden' src="/images/icons/map-1.svg" alt="" />
                                                                <img className='h-5 hidden dark:flex' src="/images/icons/map-light.svg" alt="" />
                                                                <p className='text-md'>{response.data.eventDetails.location?.name || ""}</p>
                                                                <span className='text-xs underline underline-offset-1 text-[#C0A04C]'>View map</span>
                                                            </div>
                                                        </Link>

                                                        {

                                                            response.data.eventDetails.categories[0].className != null &&
                                                            (
                                                                <>
                                                                    <hr />

                                                                    <div className='p-2 pb-0 flex justify-between '>
                                                                        <div className='flex flex-col'>
                                                                            <p className='text-xs'>Ticket price starting from</p>
                                                                            <p className='font-semibold text-xl'>OMR {startPrice}</p>
                                                                        </div>
                                                                        <div className='flex flex-col text-right'>
                                                                            <p className='text-xs'>Available Tickets</p>
                                                                            <p className='font-semibold text-xl'>{availableSeats}</p>
                                                                        </div>
                                                                    </div>
                                                                </>
                                                            )
                                                        }

                                                    </div>

                                                    <div className="mt-3 space-x-5 justify-center flex align-middle items-center">
                                                        {/* <Link to='/favorites' className='w-full'> */}
                                                        <button
                                                            onClick={favoriteFeature}
                                                            className='dark:bg-[#454545] flex justify-center align-middle items-center w-auto md:w-full drop-shadow-2xl shadow-[#F3F3F3] rounded-lg bg-white p-2'>
                                                            {
                                                                isLiked ?
                                                                    <img className='h-4' src="/images/icons/heart-fav.svg" alt="" />
                                                                    :
                                                                    <img className='h-4' src="/images/icons/heart.svg" alt="" />
                                                            }
                                                            <span className='dark:text-white'>Add to Favorite</span>
                                                        </button>
                                                        {/* </Link> */}
                                                        <button onClick={() => addToGoogleCalender()} className='dark:bg-[#454545] flex justify-center align-middle items-center w-auto md:w-full drop-shadow-2xl shadow-[#F3F3F3] rounded-lg bg-white p-2'>
                                                            <img className='flex dark:hidden h-4' src="/images/icons/eventcal.svg" alt="" />
                                                            <img className='dark:flex hidden h-4' src="/images/icons/eventcal-light.svg" alt="" />
                                                            <span className='dark:text-white'>Add to Calendar</span>
                                                        </button>
                                                    </div>
                                                </div>
                                            </>
                                    }

                                </div>

                                <div className="mt-3 md:mt-0 h-auto col-span-4 pl-5 pr-5 md:col-span-2 ">
                                    {
                                        response.data == null
                                            ?
                                            <>
                                                <div class="animate-pulse">
                                                    <div class="h-8 bg-gray-300 mb-2"></div>
                                                    <div class="h-8 bg-gray-300 mb-2"></div>
                                                    <div class="h-8 bg-gray-300 mb-2"></div>
                                                    <div class="h-8 bg-gray-300 "></div>
                                                </div>
                                            </>
                                            :
                                            <>
                                                <div className="eventdesc w-full ">
                                                    {accordions.map((accordion, index) => (
                                                        <Accordian
                                                            className='mx-auto dark:bg-[#454545] dark:text-white'
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
                                            </>
                                    }

                                    {
                                        response.data != null && (
                                            <div className="">
                                                {
                                                    response.data.eventDetails.date.type == 'dateRange'
                                                        ?
                                                        moment(response.data.eventDetails.date.dateRange.endDate).isBefore(moment(), 'day')
                                                            ?
                                                            <>
                                                                {
                                                                    response.data.eventDetails.whatsapp && (
                                                                        <a className="text-gray-900 bg-white hover:bg-gray-100 border border-0 focus:ring-0 focus:outline-none focus:ring-0 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-0 dark:bg-[#454545] dark:border-0 dark:text-white dark:hover:bg-gray-700 mr-2 mb-2" href={`https://wa.me/${response.data.eventDetails.whatsapp}?text=I'm interested in the event ${response.data.eventDetails.title} and would like more information`} target="_blank" rel="noopener noreferrer">
                                                                            {/* <button type="button" class=""> */}
                                                                            <img className='h-5 mr-2' src="/images/icons/whatsapp.png" alt="" />
                                                                            Book via WhatsApp
                                                                            {/* </button> */}
                                                                        </a>
                                                                    )
                                                                }
                                                                {
                                                                    response.data.eventDetails.phoneNo && (
                                                                        <a className="text-gray-900 bg-white hover:bg-gray-100 border border-0 focus:ring-0 focus:outline-none focus:ring-0 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-0 dark:bg-[#454545] dark:border-0 dark:text-white dark:hover:bg-gray-700 mr-2 mb-2" onClick={() => handleCalling(response.data.eventDetails.phoneNo)}>
                                                                            {/* <button type="button" class=""> */}
                                                                            <img className='h-5 mr-2' src="/images/icons/phone.png" alt="" />
                                                                            Call Now
                                                                            {/* </button> */}
                                                                        </a>
                                                                    )
                                                                }
                                                                {
                                                                    showBooking && (
                                                                        <div className="booknow">
                                                                            <button onClick={(() => toast("Booking time is over"))} type="button" class="w-full text-white bg-[#C0A04C] hover:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-3 text-center mr-3 md:mr-0 dark:bg-[#C0A04C] dark:hover:bg-[#A48533] dark:focus:ring-blue-800 hover:bg-[#A48533]">
                                                                                {
                                                                                    response.data.eventDetails.type == 'event'
                                                                                        ?
                                                                                        <div className='space-x-3'>
                                                                                            Buy Ticket
                                                                                            <img src="/images/icons/external-link.svg" alt="" />
                                                                                        </div>
                                                                                        :
                                                                                        <>
                                                                                            Buy Voucher
                                                                                        </>
                                                                                }
                                                                            </button>
                                                                        </div>
                                                                    )
                                                                }

                                                            </>
                                                            :
                                                            <>
                                                                <div className="flex">
                                                                    {
                                                                        response.data.eventDetails.whatsapp && (
                                                                            <a className="text-gray-900 bg-white hover:bg-gray-100 border border-0 focus:ring-0 focus:outline-none focus:ring-0 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-0 dark:bg-[#454545] dark:border-0 dark:text-white dark:hover:bg-gray-700 mr-2 mb-2" href={`https://wa.me/${response.data.eventDetails.whatsapp}?text=I'm interested in the event ${response.data.eventDetails.title} and would like more information`} target="_blank" rel="noopener noreferrer">
                                                                                {/* <button type="button" class=""> */}
                                                                                <img className='h-5 mr-2' src="/images/icons/whatsapp.png" alt="" />
                                                                                Book via Whatsapp
                                                                                {/* </button> */}
                                                                            </a>
                                                                        )
                                                                    }
                                                                    {
                                                                        response.data.eventDetails.phoneNo && (
                                                                            <a className="text-gray-900 bg-white hover:bg-gray-100 border border-0 focus:ring-0 focus:outline-none focus:ring-0 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-0 dark:bg-[#454545] dark:border-0 dark:text-white dark:hover:bg-gray-700 mr-2 mb-2" onClick={() => handleCalling(response.data.eventDetails.phoneNo)}>
                                                                                {/* <button type="button" class=""> */}
                                                                                <img className='h-5 mr-2' src="/images/icons/phone.png" alt="" />
                                                                                Call Now
                                                                                {/* </button> */}
                                                                            </a>
                                                                        )
                                                                    }
                                                                </div>
                                                                {
                                                                    showBooking && (
                                                                        <div className="booknow">
                                                                            <>
                                                                                <button type="button" onClick={() => handleBooking(response.data.eventDetails._id)} class="w-full text-white bg-[#C0A04C] hover:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-3 text-center mr-3 md:mr-0 dark:bg-[#C0A04C] dark:hover:bg-[#A48533] dark:focus:ring-blue-800 hover:bg-[#A48533]">
                                                                                    {
                                                                                        response.data.eventDetails.type == 'event'
                                                                                            ?
                                                                                            <div className='flex justify-center align-middle items-center space-x-5'>
                                                                                                {
                                                                                                    isExternalLink ?
                                                                                                        <>
                                                                                                            <>Get Ticket test</>
                                                                                                            <img className='ml-3 h-4' src="/images/icons/external-link.svg" alt="" />
                                                                                                        </>
                                                                                                        :
                                                                                                        <>Get Tickets </>
                                                                                                }
                                                                                            </div>
                                                                                            :
                                                                                            <>
                                                                                                Buy Voucher
                                                                                            </>
                                                                                    }
                                                                                </button>
                                                                                {
                                                                                    response.data.eventDetails.website != "" && (
                                                                                        <button type="button" onClick={() => handleBooking(response.data.eventDetails._id)} class="mt-3 w-full text-[#A48533] border border-[#A48533] bg-white hover:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-3 text-center mr-3 md:mr-0 dark:bg-[#C0A04C] dark:hover:bg-[#A48533] dark:focus:ring-blue-800 hover:bg-[#A48533]">
                                                                                            {
                                                                                                response.data.eventDetails.type == 'event'
                                                                                                    ?
                                                                                                    <div className='flex justify-center align-middle items-center space-x-5'>
                                                                                                        {
                                                                                                            isExternalLink ?
                                                                                                                <>
                                                                                                                    <>More Info</>
                                                                                                                    <img className='ml-3 h-4' src="/images/icons/external-link.svg" alt="" />
                                                                                                                </>
                                                                                                                :
                                                                                                                <>More Info</>
                                                                                                        }
                                                                                                    </div>
                                                                                                    :
                                                                                                    <>
                                                                                                        Buy Voucher
                                                                                                    </>
                                                                                            }
                                                                                        </button>
                                                                                    )
                                                                                }
                                                                            </>
                                                                        </div>
                                                                    )
                                                                }


                                                            </>
                                                        :
                                                        <>
                                                            {
                                                                response.data.eventDetails.whatsapp
                                                                    ?

                                                                    <a className="text-gray-900 bg-white hover:bg-gray-100 border border-0 focus:ring-0 focus:outline-none focus:ring-0 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-0 dark:bg-[#454545] dark:border-0 dark:text-white dark:hover:bg-gray-700 mr-2 mb-2" href={`https://wa.me/${response.data.eventDetails.whatsapp}?text=I'm interested in the event ${response.data.eventDetails.title} and would like more information`} target="_blank" rel="noopener noreferrer">
                                                                        {/* <button type="button" class=""> */}
                                                                        <img className='h-5 mr-2' src="/images/icons/whatsapp.png" alt="" />
                                                                        Book via WhatsApp
                                                                        {/* </button> */}
                                                                    </a>

                                                                    :
                                                                    <></>
                                                            }
                                                            {
                                                                response.data.eventDetails.phoneNo && (
                                                                    <a className="text-gray-900 bg-white hover:bg-gray-100 border border-0 focus:ring-0 focus:outline-none focus:ring-0 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-0 dark:bg-[#454545] dark:border-0 dark:text-white dark:hover:bg-gray-700 mr-2 mb-2" onClick={() => handleCalling(response.data.eventDetails.phoneNo)}>
                                                                        {/* <button type="button" class=""> */}
                                                                        <img className='h-5 mr-2' src="/images/icons/phone.png" alt="" />
                                                                        Call Now
                                                                        {/* </button> */}
                                                                    </a>
                                                                )
                                                            }

                                                            {
                                                                showBooking && (
                                                                    <div className="booknow">
                                                                        <button type="button" onClick={() => handleBooking(response.data.eventDetails._id)} class="w-full text-white bg-[#C0A04C] hover:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-3 text-center mr-3 md:mr-0 dark:bg-[#C0A04C] dark:hover:bg-[#A48533] dark:focus:ring-blue-800 hover:bg-[#A48533]">
                                                                            {
                                                                                response.data.eventDetails.type == 'event'
                                                                                    ?
                                                                                    <>
                                                                                        Buy Ticket
                                                                                    </>
                                                                                    :
                                                                                    <>
                                                                                        Buy Voucher
                                                                                    </>
                                                                            }
                                                                        </button>
                                                                    </div>

                                                                )
                                                            }


                                                        </>

                                                }
                                            </div>
                                        )
                                    }


                                </div>

                            </div>

                            {
                                showNumber && (
                                    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
                                        <div className="bg-white dark:bg-[#454545] dark:text-white p-4 rounded-lg relative  ml-3 mr-3">

                                            <button
                                                onClick={() => setShowNumber(false)}
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

                                            <div className='p-4 flex space-x-3 align-middle justify-center items-center'>
                                                <img className='h-6 mr-2' src="/images/icons/phone.png" alt="" />
                                                <span>+{response.data.eventDetails.phoneNo}</span>
                                            </div>
                                            {/* <img className='pt-4' src={response.data.eventDetails.seatingMap} alt="Theater" /> */}
                                        </div>
                                    </div>
                                )
                            }


                            <div className='flex flex-col justify-center items-center mt-10'>
                                <span className='text-2xl font-bold'>
                                    Location
                                </span>
                                {
                                    response.data != null && (
                                        <div className='w-full mt-5'>
                                            <MapComponent onMarkerClick={onMarkerClick} selectedLocation={selectedLocation} mapSize={"300px"} zoom={13} />
                                        </div>
                                    )
                                }

                            </div>

                            <div className='flex justify-center items-center mt-10'>
                                <span className='text-2xl font-bold'>
                                    You Might Also Like
                                </span>
                            </div>
                            <div className='ml-2 mr-2 mt-5'>
                                <div className="flex w-full justify-between overflow-x-auto">
                                    {response.data != null && (
                                        <>
                                            {
                                                response.data.upcomingEvents.map((event) => (
                                                    <div >
                                                        < EventCard width={'w-44 md:w-52'} data={event} />
                                                    </div>
                                                ))
                                            }
                                        </>
                                    )
                                    }
                                </div>
                            </div>


                            {
                                response.data != null && (
                                    <>
                                        {
                                            response.data.offers.length > 0
                                                ?
                                                <section>
                                                    <section className=''>
                                                        <div className='flex justify-center items-center mt-5'>
                                                            <span className='text-2xl font-bold'>
                                                                Offers
                                                            </span>
                                                        </div>

                                                        <div className="">
                                                            <div className='flex w-full justify-between overflow-x-auto'>
                                                                {
                                                                    response.data.offers.map((offer) => (
                                                                        < EventCard width={'w-44 md:w-52'} data={offer} />
                                                                    ))
                                                                }
                                                            </div>
                                                            <div className='flex justify-end space-x-2 '>
                                                                <p className='underline underline-offset-1 text-sm pr-2 '>view all</p>
                                                            </div>
                                                        </div>
                                                    </section>
                                                </section>
                                                :
                                                <></>
                                        }
                                    </>
                                )
                            }

                            <div className="relative mt-8 ml-6 mr-6">
                                {
                                    !isStandalone && (
                                        <img className='h-16 md:h-auto' src="/images/assets/download.png" alt="" />
                                    )
                                }

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
                                    <button onClick={() => navigate('/user/helpcenter')} className='rounded-full hover:bg-[#A48533] bg-[#C0A04C] py-3 pr-6 pl-6 text-white font-semibold'>Need Help?</button>
                                </div>
                            </div>
                        </section>
                    </section>
                </section>

            </div>

            <div className=''>
                < Footer />
            </div>
        </div >
    )



}

export default EventDescription