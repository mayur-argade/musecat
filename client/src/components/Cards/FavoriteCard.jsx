import React from 'react'
import { Link } from 'react-router-dom'
const FavoriteCard = ({data}) => {
    document.title = 'favorites'
    return (
        <>
            <div class="standalone:mb-5 relative md:m-3 h-auto w-44 md:w-44 lg:w-72 bg-[#F3F3F3] border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">

                <button class="absolute top-2 right-2 bg-white rounded-full w-7 h-7 flex items-center justify-center align-middle text-white">
                    <img className='' src="/images/icons/heart-fav.svg" alt="" />
                </button>

                <a href="#">
                    <img class="h-48 w-40 md:w-44 md:h-80  w-full rounded-t-lg" src={`${data.displayPhoto}`} alt="" />
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
                            {data.description} <Link to='/venue/venueid'><span className='ml-0 text-[#C0A04C] underline'> Crowne Plaza OCEC</span></Link>
                        </p>
                    </div>
                </div>
            </div>


        </>
    )
}
// xs:text-xm sm:
export default FavoriteCard