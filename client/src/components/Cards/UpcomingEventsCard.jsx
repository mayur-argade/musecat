import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { addToFavorites, ClientGetOffers, CategoryCount, ClientUpcomingEvents, getCategoryEvents } from '../../http/index'
import toast, { Toaster } from 'react-hot-toast';
import { useSelector } from 'react-redux'

const UpcomingEventsCard = ({ event }) => {

    const [isLiked, setIsLiked] = useState(false)

    const { user, isAuth } = useSelector((state) => state.auth);

    const navigate = useNavigate()

    useEffect(() => {
        // Check if the user is logged in and the event.likes array includes the user's ID
        setIsLiked(isAuth && event.likes.includes(user._id));
    }, [event.likes, user, isAuth]);


    const favoriteFeature = async (eventid) => {
        // console.log(eventid)
        setIsLiked(!isLiked)
        try {
            const eventdata = {
                eventid: eventid
            }
            const { data } = await addToFavorites(eventdata)
            console.log(data)
            toast.success(data.message)
        } catch (error) {
            console.log(error)
            if (error.response.status == 401) {
                toast.error("Token Expired Login again")
                navigate('/login')
            }
        }

    }
    return (
        <div className=' dark:text-white'>
            <div  >
                <Toaster />
                <div onClick={(() => navigate(`/events/${event._id}`))} className="cursor-pointer relative rounded-2xl w-52 h-85 mx-2  md:w-72 mb-2 md:h-[30rem] max-h-[30rem] bg-[#F3F3F3] dark:bg-[#454545] top-0 md:mt-5">
                    <div className='absolute bottom-0 left-0 flex flex-col rounded-lg'>
                        <img className="rounded-lg object-cover bg-center rounded-lg h-52 w-52 md:h-96 md:w-72 relative top-0" src={`${event.displayPhoto}`} alt="" />
                        <button onClick={(e) => {
                            e.stopPropagation();
                            favoriteFeature(event._id)
                        }} className="absolute top-2 right-2 bg-white text-black rounded-full z-20 p-2">
                            {
                                isLiked ?
                                    <img className='' src="/images/icons/heart-fav.svg" alt="" />
                                    :
                                    <img src="/images/icons/heart.svg" alt="" />
                            }

                        </button>
                        <div className='flex flex-col p-2'>
                            <p className='text-sm mt-2 font-medium'>{event.title},</p>
                            <p className='text-sm mt-2 font-medium'>{event.location?.name || "\u00A0"}</p>
                            <p className="mt-1 mb-1 text-xs font-light">Events</p>
                            <div className='flex items-center justify-between space-x-2'>
                                <Link className='button w-full' to={`/events/${event._id}`}>
                                    <button type="button" className="text-white hover:bg-[#A48533]
bg-[#C0A04C] hover:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center mr-3 md:mr-0 dark:bg-[#C0A04C] dark:hover:bg-white w-full">Book Now</button>
                                </Link>
                                <Link to='/contactus' className='hidden md:block w-full'>
                                    <button type="button" className="text-white bg-[#C0A04C] hover:bg-[#A48533] hover:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center mr-3 md:mr-0 dark:bg-[#C0A04C] dark:hover:bg-white dark:focus:ring-blue-800 w-full">Contact us</button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    )
}

export default UpcomingEventsCard