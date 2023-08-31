import React from 'react'

const VendorOfferCard = ({ status }) => {
    return (
        <div className="relative">
            <img
                className="h-64 w-52 snap-start"
                src="/images/assets/offer1.jpg"
                alt=""
            />
            <div className="absolute top-1 right-1 bg-white text-white p-1 pl-2 pr-2 rounded-md font-bold">
                <p className={`text-sm font-semibold ${status == 'Inactive' ? 'text-red-500' : 'text-green-500'}`}>{status}</p>
            </div>
        </div>
    )
}

export default VendorOfferCard