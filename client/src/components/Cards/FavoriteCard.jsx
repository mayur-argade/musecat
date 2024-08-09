import React, { useState, useEffect } from 'react'
import moment from 'moment'
import { Link, useNavigate } from 'react-router-dom'
import { addToFavorites, ClientGetOffers, CategoryCount, ClientUpcomingEvents, getCategoryEvents } from '../../http/index'
import toast, { Toaster } from 'react-hot-toast';
import { useSelector } from 'react-redux'

const FavoriteCard = ({ data, width }) => {
    document.title = 'favorites'


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
                // toast.error("session expired Login again")
                navigate('/login')
            }
        }
    }
    return (
        <>
            <div onClick={(() => navigate(`/events/${data._id}`))} className={`cursor-pointer relative mx-1 ${width} rounded-md bg-[#F3F3F3] dark:bg-[#454545] dark:text-white my-2`}>

                <div href="#">
                    <img class="rounded-md aspect-square" src={`${data.displayPhoto}`} alt="" />
                </div>

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

                <div class="p-1 pt-4 pb-2 mx-1">
                    <div class="">
                        <p class="text-xss m:text-xs mt-1  font-medium truncate">
                            {data.title} at
                        </p>
                        <p className='text-xss m:text-xs mt-1  font-medium truncate'>{data.location?.name || ""}</p>
                    </div>
                    <div>
                        <p class="text-xss font-light md:font-normal">
                            {data.shortDescription} <Link to='/venue/venueid'><span className='ml-0 text-[#C0A04C] underline'> Crowne Plaza OCEC</span></Link>
                        </p>
                    </div>
                </div>
            </div>


        </>
    )
}
// xs:text-xm sm:
export default FavoriteCard