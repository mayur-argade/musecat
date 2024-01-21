import React from 'react'
import moment from 'moment';
import { DateTime } from 'luxon';

const VendorOfferCard = ({ data }) => {
    let status;
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
        if (data.date.recurring.days.includes(moment().format('dddd').toLowerCase())) {
            status = 'Ongoing'
        } else {
            status = 'Upcoming'
        } // Handle cases where the date values are missing or invalid
    }

    return (
        <>
            <div className="w-56 lg:w-60  relative">
                <img
                    className="rounded-md h-80 md:h-64 w-60 snap-start"
                    src={data.displayPhoto}
                    alt=""
                />
                <div className="absolute top-1 right-1 bg-white dark:bg-[#454545] text-white p-1 pl-2 pr-2 rounded-md font-bold">
                    <p className={`text-sm font-semibold ${status == 'Inactive' ? 'text-red-500' : 'text-green-500'}`}>{status}</p>
                </div>
            </div>
        </>
    )
}

export default VendorOfferCard