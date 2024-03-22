import React from 'react'
import { Link } from 'react-router-dom'

const PwaCards = ({ data }) => {

    console.log(data)

    return (
        <Link to={`/events/${data._id}`}>
            <div className=" my-3 flex w-80 md:w-72 border border-2 dark:border-0 rounded-md space-x-2  bg-white dark:bg-[#454545] hover:bg-[#C0A04C] hover:text-white cursor-pointer drop-shadow-2xl">
                <div className="image">
                    <img className='ml-0  p-1.5 h-28 w-28 rounded-xl' src={`${data.displayPhoto}`} alt="" />
                </div>
                <div className="text-left mt-3">
                    <div className="text-xs font-medium">{data.title}</div>
                    <p className='text-xs font-medium'>{data.location?.name || ""}</p>
                    <div className="text-xss font-light">{data.shortDescription.length > 30 ? data.shortDescription.substring(0, 30) + '...' : data.shortDescription} </div>
                    <div className="text-xss font-light" dangerouslySetInnerHTML={{ __html: data.description.length > 30 ? data.description.substring(0, 30) + '...' : data.description }}></div>
                    <div>
                        <button className='border text-xs py-1 px-1 mt-1'> Book Tickets </button>
                    </div>
                </div>
            </div>
        </Link>
    )
}

export default PwaCards