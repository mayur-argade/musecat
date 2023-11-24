import React, { useState, useEffect } from 'react'
import moment from 'moment'
import { Link, useNavigate } from 'react-router-dom'
import { addToFavorites, ClientGetOffers, CategoryCount, ClientUpcomingEvents, getCategoryEvents } from '../../http/index'
import toast, { Toaster } from 'react-hot-toast';
import { useSelector } from 'react-redux'

const FavoriteCard = ({ data }) => {
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
                toast.error("Token Expired Login again")
                navigate('/login')
            }
        }
    }
    return (
        <>
            <div class="standalone:mb-5 relative my-3 h-auto lg:h-96 bg-[#F3F3F3] border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">

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

                <a href="#">
                    <img class="h-72 w-full rounded-md object-fit" src={`${data.displayPhoto}`} alt="" />
                </a>
                <div class="p-1 pt-4 pb-2 mx-1">
                    <div class="">
                        <p class="title text-md md:text-md font-bold text-left">
                            {data.title} at
                        </p>
                        <p className='text-md md:text-md font-bold text-left mb-1  leading-loose'>{data.location.name}</p>
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