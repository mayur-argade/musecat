import React from 'react'
import { Link } from 'react-router-dom'
import moment from 'moment';
import { DateTime } from 'luxon';

const PastPurchaseCard = ({ data, width, height }) => {
    let status;
    console.log(data)
    const currentDate = DateTime.now().toISODate();  // Get current date only
    const startEventDate = data.date.dateRange?.startDate ? DateTime.fromISO(data.date.dateRange.startDate).toISODate() : null;
    const eventDate = data.date.dateRange?.endDate ? DateTime.fromISO(data.date.dateRange.endDate).toISODate() : null;

    if (data.verified === false) {
        status = "Unverified";
    }
    else if (data.archived == true){
        status = "Archived"
    } else {
        if (startEventDate !== null && eventDate !== null) {
            if (currentDate >= startEventDate && currentDate <= eventDate) {
                status = 'Ongoing';
            } else if (currentDate > eventDate) {
                status = 'Archived';
            } else if (currentDate < startEventDate) {
                status = 'Upcoming';
            }
        } else if (startEventDate !== null) {
            // Handle case where eventDate is null, but startEventDate is not
            if (currentDate < startEventDate) {
                status = 'Upcoming';
            } else {
                status = 'Ongoing';  // or adjust as per your logic
            }
        } else {
            const recurringDays = data.date.recurring.days.map(day => day.toLowerCase());
            if (recurringDays.includes(moment().format('dddd').toLowerCase())) {
                status = 'Ongoing';
            } else {
                status = 'Upcoming';
            }
        }
    }

    return (
        <>
            <div className={`cursor-pointer relative mx-1 ${width} rounded-md bg-[#F3F3F3] dark:bg-[#454545] my-2`}>

                <button class="dark:bg-[#454545] absolute top-2 right-2 l:py-3.5 bg-white rounded-md w-16 h-3 px-2 py-2 l:w-24 l:h-5 flex items-center justify-center align-middle text-white">
                    <p className={`text-xss l:text-sm font-semibold ${status == 'Expired' || status == 'Archived' || status == 'Unverified' ? 'text-red-500' : 'text-green-500'}`}>{status}</p>
                </button>

                <div href="#">
                    <img class="rounded-md aspect-square " src={`${data.displayPhoto}`} alt="" />
                </div>

                <div class="p-1 pt-2 pb-2 mx-1 dark:text-white">
                    <div class="">
                        <p class="text-xss m:text-xs mt-1  font-medium truncate">
                            {data.title} at
                        </p>
                        <span className='ml-0 text-xss m:text-xs mt-1  font-bold truncate'>{data.location?.name || ""}</span>
                    </div>
                    <div>
                        <p class="text-xss font-light md:font-normal truncate">
                            {data.shortDescription.length > 80 ? data.shortDescription.substring(0, 80) + '...' : data.shortDescription} at 
                        </p>
                        <p class="text-xss font-light md:font-normal truncate">
                        <Link to={`/venue/${data.location}`}><span className='ml-0 text-[#C0A04C] underline'>{data.location?.name || ""}</span></Link>
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