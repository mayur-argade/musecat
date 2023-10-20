import React from 'react'
import moment from 'moment';

const VendorOfferCard = ({ data }) => {

    let status;
    const currentDate = moment(); // Current date
    const startEventDate = moment(data.date.dateRange?.startDate ?? null)
    const eventDate = moment(data.date.dateRange?.endDate ?? null);

    if (currentDate.isBetween(startEventDate, eventDate)) {
        status = 'Ongoing'
    } else if (eventDate.isBefore(currentDate)) {
        status = 'Archived'
    } else if (startEventDate.isAfter(currentDate)) {
        status = 'Upcoming'
    }

    if (data.date.recurring.includes(moment().format('dddd'))) {
        status = 'Ongoing'
    } else {
        status = 'Upcoming'
    }

    return (
        <>
            <div className="w-56 lg:w-60  relative">
                <img
                    className="rounded-md h-80 md:h-64 w-60 snap-start"
                    src={data.displayPhoto}
                    alt=""
                />
                <div className="absolute top-1 right-1 bg-white text-white p-1 pl-2 pr-2 rounded-md font-bold">
                    <p className={`text-sm font-semibold ${status == 'Inactive' ? 'text-red-500' : 'text-green-500'}`}>{status}</p>
                </div>
            </div>
        </>
    )
}

export default VendorOfferCard