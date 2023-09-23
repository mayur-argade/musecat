import React from 'react'
import { Link } from 'react-router-dom'
import moment from 'moment';

const PastPurchaseCard = ({ data }) => {

    const currentdate = moment().utc()
    // console.log(currentdate._d)

    const currentEpoch = currentdate.valueOf()
    console.log("current epoch time", currentEpoch)

    const epochTimestamp = data.date
    console.log("epoch timestamp for event", epochTimestamp)

    let status = currentEpoch > epochTimestamp ? "Expired" : "Ongoing"
    // let status = "Expired"
    // console.log(data)
    return (
        <>
            <div class="relative md:m-3 h-auto w-44 md:w-44 lg:w-72 bg-[#F3F3F3] border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">

                <button class="absolute top-2 right-2 py-3.5 bg-white rounded-md w-24 h-5 flex items-center justify-center align-middle text-white">
                    <p className={`text-sm font-semibold ${status == 'Expired' || status == 'Archived' ? 'text-red-500' : 'text-green-500'}`}>{status}</p>
                </button>

                <a href="#">
                    <img class="h-70 w-full rounded-none" src={`${data.displayPhoto}`} alt="" />
                </a>

                <div class="p-1 pt-4 pb-2 mx-1">
                    <div class="">
                        <p class="title text-md md:text-xl font-bold text-left">
                            {data.title}
                        </p>
                        <p className='text-md md:text-xl font-bold text-left mb-1  '> {data.location}</p>
                    </div>
                    <div>
                        <p class="text-xss font-light md:font-normal">
                            {data.description} at <Link to={`/venue/${data.location}`}><span className='ml-0 text-[#C0A04C] underline'> {data.location}</span></Link>
                        </p>
                    </div>
                </div>
            </div>


        </>
    )
}

export default PastPurchaseCard