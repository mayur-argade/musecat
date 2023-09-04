import React from 'react'
import { Link } from 'react-router-dom'

const TicketStatusCard = () => {
    return (
        <>
            <div class="relative md:m-3 h-auto w-54 md:w-44 lg:w-72 bg-[#F3F3F3] border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">

                <button class="absolute top-2 right-2 bg-white rounded-full w-7 h-7 flex items-center justify-center align-middle text-white">
                    <img src="/images/icons/heart-fav.svg" alt="" />
                </button>

                <a href="#">
                    <img class="h-70 w-full rounded-t-lg" src="/images/assets/eventdescription.png" alt="" />
                </a>
                <div class="p-1 pt-4 pb-2 mx-1">
                    <div class="">
                    <p class="title text-md md:text-md font-bold text-left">
                            Breakfast and Pool Pass at
                        </p>
                        <p className='text-md md:text-md font-bold text-left mb-1  leading-loose'> Crowne Plaza OCEC</p>
                    </div>
                    <div>
                        <p class="text-xss font-light md:font-normal">
                            Turn your breakfast into a day out by the pool at <Link to='/venue/venueid'><span className='ml-0 text-[#C0A04C] underline'> Crowne Plaza OCEC</span></Link>
                        </p>
                    </div>
                </div>
            </div>


        </>
    )
}

export default TicketStatusCard