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


    if (eventType != 'dateRange') {
        const days = data.date.recurring.days.map(day => {
            return day.charAt(0).toUpperCase() + day.slice(1);
        });
        
        if (days.length === 1) {
            showDateField = `Every ${days[0]}`;
        } else if (days.length === 2) {
            showDateField = `Every ${days.join(' and ')}`;
        } else {
            const lastDay = days.pop();
            showDateField = `Every ${days.join(', ')}, and ${lastDay}`;
        }
    }
    else if (eventType == 'dateRange') {
        // 1. Start date + end date 
        // 3. start date == end date 
        const startDate = moment(data.date.dateRange.startDate).startOf('day');
        const endDate = moment(data.date.dateRange.endDate).startOf('day');
        if (data.date.dateRange.endDate) {
            if (startDate.isSame(endDate)) {
                showDateField = `${startDate.format('ddd,DD MMMM YYYY')}`;
            } else {
                if (data.showEndDate == false) {
                    showDateField = `${startDate.format('ddd,DD MMMM YYYY')}`;
                } else {
                    showDateField = `${startDate.format('Do MMM')} to ${endDate.format('Do MMM')}`;
                }
            }

        }
        // 2. Start date - end date 
        else {
            showDateField = `${moment().format('ddd,DD MMMM YYYY')}`;
        }
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
            <div onClick={(() => navigate(`/events/${data._id}`))} className={`hover:shadow-xl cursor-pointer relative mx-1 ${width} rounded-md bg-[#F3F3F3] dark:bg-[#454545] dark:text-white my-2`}>
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
                    <p className='text-xss md:text-xs  mt-1 m:mt-2 font-medium truncate'>
                        <span className='ml-0 font-normal'>
                            {showDateField}
                        </span>
                    </p>
                    <p className='text-xs md:text-sm mt-1 md:mt-2 font-semibold truncate'>
                        {data.title.charAt(0).toUpperCase() + data.title.slice(1)},
                    </p>
                    <p className='text-xs md:text-xs md:mt-1 text-[#C0A04C] font-medium truncate'>{data.location.name}</p>
                    <p className="text-xss mt-1 md:mt-2 mb-1 md:text-xs font-light truncate">{
                        data.eventCategory.map(obj => obj.name).join(', ')
                    }</p>
                </div>
            </div>
        </>
    )
}

export default EventCard
