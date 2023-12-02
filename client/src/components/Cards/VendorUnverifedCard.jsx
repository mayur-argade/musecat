import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

const VendorUnverifedCard = ({ data }) => {

    const navigate = useNavigate()
    
    return (
        <div>
            <div onClick={() => navigate(`/vendor/event/${data._id}`)} class="relative mx-2 h-auto lg:h-96 w-64 lg:w-72 bg-[#F3F3F3] border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">

                <a href="#">
                    <img class="h-72 w-full rounded-md" src={`${data.displayPhoto}`} alt="" />
                </a>

                <div class="p-1 pt-2 pb-2 mx-1">
                    <div class="">
                        <p class="title text-md lg:text-md font-bold text-left">
                            {data.title} at
                        </p>
                        <span className='ml-0 text-md lg:text-md font-bold text-left mb-1  '>{data.location.name}</span>
                    </div>
                    <div>
                        <p class="text-xss font-light md:font-normal">
                            {data.shortDescription.length > 80 ? data.shortDescription.substring(0, 80) + '...' : data.shortDescription} at <Link to={`/venue/${data.location}`}><span className='ml-0 text-[#C0A04C] underline'>{data.location.name}</span></Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default VendorUnverifedCard