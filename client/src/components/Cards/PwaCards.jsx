import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const PwaCards = ({ data, setNumber }) => {

    const navigate = useNavigate();
    const [ticketSale, setTicketSale] = useState(false)
    const isMobile = window.matchMedia('(display-mode: standalone)').matches;
    const handleCalling = (phone) => {
        if (isMobile) {
            const tempLink = document.createElement('a');
            tempLink.href = `tel:+${phone}`;
            tempLink.click();
        } else {
            setNumber(data.phoneNo)
        }
    };


    useEffect(() => {
        setTicketSale(data.categories.some((category) => category.className !== null));
    }, []);

    const handleBooking = (e) => {
        e.stopPropagation(); // Prevent event propagation to parent elements

        if (ticketSale) {
            navigate(`/bookticket/${data._id}`);
            return;
        } else {
            handleCalling(data.phoneNo);
        }
    };
    return (
        <div onClick={() => navigate(`/events/${data._id}`)} className=" my-3 flex w-80 md:w-72 border border-2 dark:border-0 rounded-md space-x-2  bg-white dark:bg-[#454545] hover:bg-[#C0A04C] hover:text-white cursor-pointer drop-shadow-2xl">
            <div className="image">
                <img className='ml-0  p-1.5 h-28 w-28 rounded-xl' src={`${data.displayPhoto}`} alt="" />
            </div>
            <div className="flex-col justify-between text-left mt-3">
                <div>
                    <div className="text-xs font-medium">{data.title}</div>
                    <p className='text-xs font-medium'>{data.location?.name || ""}</p>
                </div>
                <div className='py-3'></div>
                <div>
                    <button onClick={(e) => { e.stopPropagation(); handleBooking(e) }} className='text-white hover:bg-[#A48533] bg-[#C0A04C] focus:ring-0 focus:outline-none focus:ring-0 font-medium rounded text-xs py-1 px-1 mt-1'>
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
                </div>
            </div>
        </div>
    )
}

export default PwaCards