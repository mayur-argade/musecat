import React from 'react'
import { Link } from 'react-router-dom'

const TrendingCard = ({ data }) => {
    // console.log(data)
    return (
        <>
            <Link to={`/events/${data._id}`}>
                <div className="dark:bg-[#454545] flex w-full   items-center align-middle bg-white hover:shadow-xl  cursor-pointer rounded-xl">
                    <div className="image">
                        <img className='ml-0 h-28 w-28 p-1.5 object-cover rounded-xl' src={`${data.displayPhoto}`} alt="" />
                    </div>
                    <div className="text-left">
                        <div className="text-xs font-bold mb-1">
                            {data.title}
                        </div>
                        <p className="text-xs font-base mb-1">
                            {data.location?.name || ""}
                        </p>
                        <div className="text-xss font-light truncate mb-1">
                            {data.shortDescription}
                        </div>
                        <div className="text-xss font-light truncate">
                            {[...new Set(data.eventCategory.split(0, 2).map(subcategory => subcategory.name))].join(', ')}
                        </div>
                    </div>

                </div>
            </Link>
        </>
    )
}

export default TrendingCard