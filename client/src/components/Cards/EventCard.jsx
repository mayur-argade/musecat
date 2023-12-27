import React, { useState, useEffect } from 'react'
import moment from 'moment'
import { Link, useNavigate } from 'react-router-dom'
import { addToFavorites, ClientGetOffers, CategoryCount, ClientUpcomingEvents, getCategoryEvents } from '../../http/index'
import toast, { Toaster } from 'react-hot-toast';
import { useSelector } from 'react-redux'

const EventCard = ({ data, width }) => {

    // console.log(data)

    const [isLiked, setIsLiked] = useState(false)

    const { user, isAuth } = useSelector((state) => state.auth);

    const navigate = useNavigate()

    useEffect(() => {
        // Check if the user is logged in and the event.likes array includes the user's ID
        setIsLiked(isAuth && data.likes.includes(user._id));
    }, [data.likes, user, isAuth]);


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
        <>
            <div onClick={(() => navigate(`/events/${data._id}`))} className={`cursor-pointer relative mx-1 ${width} rounded-md bg-[#F3F3F3] my-2`}>
                <div className='image'>
                    <img className="rounded-md aspect-square" src={`${data.displayPhoto}`} alt="" />
                </div>
                <button onClick={(e) => {
                    e.stopPropagation(); // Prevent click event from propagating
                    favoriteFeature(data._id);
                }} className="absolute top-2 right-2 bg-white text-black rounded-full  p-2">
                    {
                        isLiked ?
                            <img className='' src="/images/icons/heart-fav.svg" alt="" />
                            :
                            <img src="/images/icons/heart.svg" alt="" />
                    }
                </button>
                <div className="content mx-1">
                    {
                        data.date.type == 'dateRange'
                            ?
                            <p className='text-xss m:text-xs  mt-1 m:mt-2 font-medium'>{moment(data.date.dateRange?.startDate ?? "").format("ddd,DD MMMM YYYY")}</p>
                            :
                            <p className='text-xss m:text-xs mt-1 m:mt-2 font-medium'>
                                {data.date.recurring.days.includes(moment().format('dddd').toLowerCase()) ? moment().format('dddd') : "date"}
                            </p>
                    }
                    <p className='text-xss m:text-xs mt-1 m:mt-2 font-medium truncate'>
                        {data.title},
                    </p>
                    <p className='text-xss m:text-xs m:mt-2 font-medium truncate'>{data.location?.name.length > 25 ? data.location?.name.substring(0, 25) : data.location.name}</p>
                    <p className="text-xss mt-1 m:mt-2 mb-1 m:text-xs font-light truncate">{data.type}</p>
                </div>
            </div>
        </>
    )
}

export default EventCard

{/* <div className='cursor-pointer' onClick={(() => navigate(`/events/${data._id}`))}>
<div className="relative rounded-md mb-6 s:w-52 m:w-44 l:w-52 h-80 mx-2 max-h-96 bg-[#F3F3F3] top-0">
    <div className='absolute bottom-0 left-0 flex flex-col'>
        <img className="relative rounded-lg h-52 w-52 object-cover" src={`${data.displayPhoto}`} alt="" />
        <button onClick={(e) => {
            e.stopPropagation(); // Prevent click event from propagating
            favoriteFeature(data._id);
        }} className="absolute top-2 right-2 bg-white text-black rounded-full z-20 p-2">
            {
                isLiked ?
                    <img className='' src="/images/icons/heart-fav.svg" alt="" />
                    :
                    <img src="/images/icons/heart.svg" alt="" />
            }
        </button>
        <div className='flex flex-col p-2' >
            {
                data.date.type == 'dateRange'
                    ?
                    <p className='text-xs mt-2 font-medium'>{moment(data.date.dateRange?.startDate ?? "").format("ddd,DD MMMM YYYY")}</p>
                    :
                    <p className='text-xs mt-2 font-medium'>
                        {data.date.recurring.days.includes(moment().format('dddd').toLowerCase()) ? moment().format('dddd') : "date"}
                    </p>
            }
            <p className='text-xs mt-2 font-medium'>
                {data.title},
            </p>
            <p className='text-xs mt-2 font-medium'>{ data.location?.name.length > 25 ? data.location?.name.substring(0,25) : data.location.name }</p>
            <p className="mt-1 mb-1 text-xs font-light">{data.type}</p>
        </div>
    </div>
</div>
</div> */}
