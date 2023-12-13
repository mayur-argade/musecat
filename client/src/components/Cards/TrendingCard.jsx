import React from 'react'
import {Link} from 'react-router-dom'

const TrendingCard = ({ data }) => {
    // console.log(data)
    return (
        <>
        <Link to={`/events/${data._id}`}>
            <div className=" flex w-80 md:w-72 items-center align-middle bg-white hover:bg-[#C0A04C] hover:text-white cursor-pointer rounded-xl">
                <div className="image">
                    <img className='ml-0 h-28 w-28 p-1.5 object-cover rounded-xl' src={`${data.displayPhoto}`} alt="" />
                </div>
                <div className="text-left">
                    <div className="text-xs font-medium">{data.title},</div>
                    <p className='text-xs font-medium'>{data.location?.name || ""}</p>
                    <div className="text-xss font-light">Be the first to review</div>
                    <div className="text-xss font-light">Hormuz Grand Muscat, Radisson...</div>
                </div>
            </div>
        </Link>
        </>
    )
}

export default TrendingCard