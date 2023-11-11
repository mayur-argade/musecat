import React from 'react'
import { Link } from 'react-router-dom'
import moment from 'moment';
import { DateTime } from 'luxon';

const PastPurchaseCard = ({ data }) => {
    let status;
    // console.log(data)
    const currentDate = DateTime.now();
    const startEventDate = data.date.dateRange?.startDate ? DateTime.fromISO(data.date.dateRange.startDate) : null;
    const eventDate = data.date.dateRange?.endDate ? DateTime.fromISO(data.date.dateRange.endDate) : null;

    if (startEventDate && eventDate) {
        if (currentDate >= startEventDate && currentDate <= eventDate) {
            status = 'Ongoing';
        } else if (currentDate > eventDate) {
            status = 'Archived';
        } else if (currentDate < startEventDate) {
            status = 'Upcoming';
        }
    } else {
        if (data.date.recurring.includes(moment().format('dddd').toLowerCase())) {
            status = 'Ongoing'
        } else {
            status = 'Upcoming'
        } // Handle cases where the date values are missing or invalid
    }
    
    return (
        <>
            <div class="relative mx-2 h-auto lg:h-96 w-64 lg:w-80 bg-[#F3F3F3] border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">

                <button class="absolute top-2 right-2 py-3.5 bg-white rounded-md w-24 h-5 flex items-center justify-center align-middle text-white">
                    <p className={`text-sm font-semibold ${status == 'Expired' || status == 'Archived' ? 'text-red-500' : 'text-green-500'}`}>{status}</p>
                </button>

                <a href="#">
                    <img class="h-72 w-full rounded-md" src={`${data.displayPhoto}`} alt="" />
                </a>

                <div class="p-1 pt-2 pb-2 mx-1">
                    <div class="">
                        <p class="title text-md lg:text-md font-bold text-left">
                            {data.title} at
                        </p>
                            
                        <span className='ml-0 text-md lg:text-md font-bold text-left mb-1  '> crown plaza</span>
                    </div>
                    <div>
                        <p class="text-xss font-light md:font-normal">
                        {data.shortDescription.length > 80 ? data.shortDescription.substring(0, 80) + '...' : data.shortDescription} at <Link to={`/venue/${data.location}`}><span className='ml-0 text-[#C0A04C] underline'>{data.location.name}</span></Link>
                        </p>
                    </div>
                </div>
            </div>


        </>
    )
}

export default PastPurchaseCard