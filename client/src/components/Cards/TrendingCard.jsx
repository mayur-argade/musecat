import React from 'react'
import {Link} from 'react-router-dom'

const TrendingCard = ({ data }) => {
    // console.log(data)
    return (
        <>
        <Link to={`/events/${data._id}`}>
            <div className="dark:bg-[#454545] flex w-80 md:w-72 items-center align-middle bg-white hover:shadow-xl  cursor-pointer rounded-xl">
                <div className="image">
                    <img className='ml-0 h-28 w-28 p-1.5 object-cover rounded-xl' src={`${data.displayPhoto}`} alt="" />
                </div>
                <div className="text-left">
                    <div className="text-xs font-medium">{data.title},</div>
                    <p className='text-xs font-medium'>{data.location?.name || ""}</p>
                    <div className="text-xss font-light truncate">{data.shortDescription}</div>
                    <div className="text-xss font-light truncate">{data.shortDescription.length > 30 ? data.shortDescription.substring(0, 30) + '...' : data.shortDescription}</div>
                </div>
            </div>
        </Link>
        </>
    )
}

export default TrendingCard