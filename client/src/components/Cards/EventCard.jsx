import React, { useState, useEffect } from 'react'
import moment from 'moment'
import { Link, useNavigate } from 'react-router-dom'
import { addToFavorites, ClientGetOffers, CategoryCount, ClientUpcomingEvents, getCategoryEvents } from '../../http/index'
import toast, { Toaster } from 'react-hot-toast';
import { useSelector } from 'react-redux'

const EventCard = ({ data, width, showNumberBox }) => {

    // console.log(data)

    const [isLiked, setIsLiked] = useState(false)
    let eventType = data.date.type;
    let showDateField = `${moment().format("ddd,DD MMMM YYYY")}`

    if (eventType == 'recurring') {
        showDateField = `every ${data.date.recurring.days.join(',')}`
    }
    else if (eventType == 'dateRange') {
        if (data.date.dateRange.endDate == null || data.date.dateRange.endDate == 'null' || data.date.showEndDate == false) {
            showDateField = moment().format("ddd,DD MMMM YYYY")
        }
        else {
            showDateField = `${moment(data.date.dateRange.startDate).format('Do MMM')} to ${moment(data.date.dateRange.endDate).format('Do MMM')}`
        }
    }

    let startDateEvent;


    if (data.date.type == 'dateRange') {

        startDateEvent = data.date.dateRange.startDate
    } else {
        startDateEvent = data.date.recurring.StartDate
    }

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
                toast.error("session expired Login again")
                navigate('/login')
            }
        }
    }

    return (
        <>
            <div onClick={(() => navigate(`/events/${data._id}`))} className={`cursor-pointer relative mx-1 ${width} rounded-md bg-[#F3F3F3] dark:bg-[#454545] dark:text-white my-2`}>
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
                <div className="p-1 pt-4 pb-2 mx-1">
                    <p className='text-xss m:text-xs  mt-1 m:mt-2 font-medium'>On 
                    <span className='ml-1 font-semibold'>
                        {showDateField}
                    </span>
                    </p>
                    <p className='text-xss m:text-xs mt-1 m:mt-2 font-bold truncate'>
                    {data.title.charAt(0).toUpperCase() + data.title.slice(1)},
                    </p>
                    <p className='text-xss m:text-xs m:mt-2 font-medium truncate'>{data.location?.name.length > 25 ? data.location?.name.substring(0, 25) : data.location.name}</p>
                    <p className="text-xss mt-1 m:mt-2 mb-1 m:text-xs font-light truncate">{
                        data.eventCategory.map(obj => obj.name).join(', ')
                    }</p>
                </div>
            </div>
        </>
    )
}

export default EventCard
