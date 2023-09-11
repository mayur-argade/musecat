import React from 'react'
import moment from 'moment';

const VendorOfferCard = ({ data }) => {

    const currentDate = moment(); // Current date
    const offerDate = moment(data.expiry); // Date from the API data

    // Compare the event date with today's date
    const status = offerDate.isBefore(currentDate) ? 'Inactive' : 'Ongoing';

    return (
        <>
        <div className="w-44 md:w-52  relative">
            <img
                className="h-52 md:h-64 w-52 snap-start"
                src={data.photo}
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