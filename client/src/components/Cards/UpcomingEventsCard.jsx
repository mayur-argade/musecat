import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { addToFavorites } from '../../http/index';
import toast, { Toaster } from 'react-hot-toast';
import { useSelector } from 'react-redux';

const UpcomingEventsCard = ({ event, showNumberBox, setNumber }) => {
    const [isLiked, setIsLiked] = useState(false);
    const [screenWidth, setScreenWidth] = useState(window.innerWidth);
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
    const { user, isAuth } = useSelector((state) => state.auth);
    const navigate = useNavigate();

    useEffect(() => {
        setIsLiked(isAuth && event.likes.includes(user._id));
    }, [event.likes, user, isAuth]);

    const [ticketSale, setTicketSale] = useState(false)
    useEffect(() => {
        setTicketSale(event.categories.some((category) => category.className !== null));

        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const handleResize = () => {
        const width = window.innerWidth;
        setScreenWidth(width);
        setIsMobile(width <= 768);
    };

    const favoriteFeature = async (eventid) => {
        setIsLiked(!isLiked);
        try {
            const eventdata = { eventid: eventid };
            const { data } = await addToFavorites(eventdata);
            toast.success(data.message);
        } catch (error) {
            console.log(error);
            if (error.response.status === 401) {
                toast.error('Session expired. Please login again');
                navigate('/login');
            }
        }
    };

    const handleCalling = (phone) => {
        if (isMobile) {
            const tempLink = document.createElement('a');
            tempLink.href = `tel:+${phone}`;
            tempLink.click();
        } else {
            showNumberBox(true);
            setNumber(event.phoneNo)
        }
    };

    const handleBooking = (e) => {
        e.stopPropagation(); // Prevent event propagation to parent elements

        if (ticketSale) {
            navigate(`/bookticket/${event._id}`);
            return;
        } else {
            handleCalling();
        }
    };

    return (
        <div className='dark:text-white mt-2'>
            <div>
                <Toaster />
                <div onClick={() => navigate(`/events/${event._id}`)} className='cursor-pointer relative rounded-2xl w-52 mx-2 md:w-[19.5rem] mb-2 bg-[#F3F3F3] dark:bg-[#454545] top-0 md:mt-5'>
                    <div className='top-0 rounded-2xl'>
                        <img className='rounded-2xl object-cover aspect-square' src={event.displayPhoto} alt='' />
                        <button onClick={(e) => { e.stopPropagation(); favoriteFeature(event._id); }} className='absolute top-2 right-2 bg-white text-black rounded-full z-20 p-2'>
                            {isLiked ? <img className='' src='/images/icons/heart-fav.svg' alt='' /> : <img src='/images/icons/heart.svg' alt='' />}
                        </button>
                        <div className='flex flex-col p-2'>
                            <p className='text-base capitalize mt-2 font-medium truncate'>{event.title},</p>
                            <p className='text-base capitalize mt-2 font-medium'>{event.location?.name || '\u00A0'}</p>
                            <p className='mt-1 mb-1 text-sm font-light truncate'>{event.eventCategory.map((obj) => obj.name).join(', ')}</p>
                            <div className='flex items-center justify-between space-x-2'>

                                <button onClick={(e) => { e.stopPropagation(); handleBooking(e) }} type='button' className='text-white hover:bg-[#A48533] bg-[#C0A04C] focus:ring-0 focus:outline-none focus:ring-0 font-medium rounded-lg text-sm px-4 py-2 text-center mr-3 md:mr-0 dark:bg-[#C0A04C] dark:hover:bg-[#A48533] w-full'>
                                    {
                                        ticketSale ?
                                            <>
                                                Book Now
                                            </>
                                            :
                                            <>
                                                Call Now
                                            </>
                                    }
                                </button>

                                <Link to='/contactus' className='hidden md:block w-full'>
                                    <button type='button' className='text-white bg-[#C0A04C] hover:bg-[#A48533] hover:text-white focus:ring-0 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center mr-3 md:mr-0 dark:bg-[#C0A04C] dark:hover:bg-[#A48533] dark:focus:ring-blue-0 w-full'>
                                        Contact Us
                                    </button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    );
};

export default UpcomingEventsCard;
