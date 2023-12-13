import React from 'react'
import { Link } from 'react-router-dom'
import moment from 'moment';
import { DateTime } from 'luxon';

const PastPurchaseCard = ({ data }) => {
    let status;
    console.log(data)
    const currentDate = DateTime.now();
    const startEventDate = data.date.dateRange?.startDate ? DateTime.fromISO(data.date.dateRange.startDate) : null;
    const eventDate = data.date.dateRange?.endDate ? DateTime.fromISO(data.date.dateRange.endDate) : null;

    if (data.verified == false) {
        status = "Unverified"
    } else {
        if (startEventDate && eventDate) {
            if (currentDate >= startEventDate && currentDate <= eventDate) {
                status = 'Ongoing';
            } else if (currentDate > eventDate) {
                status = 'Archived';
            } else if (currentDate < startEventDate) {
                status = 'Upcoming';
            }
        } else {
            if (data.date.recurring.days.includes(moment().format('dddd').toLowerCase())) {
                status = 'Ongoing'
            } else {
                status = 'Upcoming'
            } // Handle cases where the date values are missing or invalid
        }
    }

    return (
        <>
            <div class="relative mx-3 my-3 h-auto lg:h-96 bg-[#F3F3F3] border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">

                <button class="absolute top-2 right-2 py-3.5 bg-white rounded-md w-24 h-5 flex items-center justify-center align-middle text-white">
                    <p className={`text-sm font-semibold ${status == 'Expired' || status == 'Archived' || status == 'Unverified' ? 'text-red-500' : 'text-green-500'}`}>{status}</p>
                </button>

                <a href="#">
                    <img class="h-72 w-full rounded-md object-fit" src={`${data.displayPhoto}`} alt="" />
                </a>

                <div class="p-1 pt-2 pb-2 mx-1">
                    <div class="">
                        <p class="title text-md lg:text-md font-bold text-left">
                            {data.title} at
                        </p>
                        <span className='ml-0 text-md lg:text-md font-bold text-left mb-1  '>{data.location?.name || ""}</span>
                    </div>
                    <div>
                        <p class="text-xss font-light md:font-normal">
                            {data.shortDescription.length > 80 ? data.shortDescription.substring(0, 80) + '...' : data.shortDescription} at <Link to={`/venue/${data.location}`}><span className='ml-0 text-[#C0A04C] underline'>{data.location?.name || ""}</span></Link>
                        </p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default PastPurchaseCard

// {/* <div className="my-8 rounded shadow-lg shadow-gray-200 dark:shadow-gray-900 bg-white dark:bg-gray-800 duration-300 hover:-translate-y-1">
//                 {/* Clickable Area */}
//                 <a href="link" className="cursor-pointer">
//                     <figure>
//                         {/* Image */}
//                         <img src={`${data.displayPhoto}`} className="rounded-t h-72 w-full" alt="Post" />

//                         <figcaption className="p-4">
//                             {/* Title */}
//                             <p className="text-lg mb-4 font-bold leading-relaxed text-gray-800 dark:text-gray-300">{data.title}</p>

//                             {/* Description */}
//                             <small className="leading-5 text-gray-500 dark:text-gray-400">{data.description}</small>
//                         </figcaption>
//                     </figure>
//                 </a>
//             </div> */}