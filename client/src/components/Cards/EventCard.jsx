import React from 'react'
import moment from 'moment'

const EventCard = ({ data }) => {



    return (
        <>
            <div >
                <div className="relative rounded-md mb-6 w-52 h-80 mx-3 max-h-96 bg-[#F3F3F3] top-0">
                    <div className='absolute bottom-0 left-0 flex flex-col '>
                        <img className="relative rounded-lg h-52 w-52 object-cover" src={`${data.displayPhoto}`} alt="" />
                        <button className="absolute top-2 right-2 bg-white text-black rounded-full z-20 p-2">
                            <img src="/images/icons/heart.svg" alt="" />
                        </button>
                        <div className='flex flex-col p-2'>
                            {
                                data.date.type == 'dateRange'
                                    ?
                                    <p className='text-xs mt-2 font-medium'>{moment(data.date.dateRange?.startDate ?? "").format("ddd, Do MMMM YYYY")}</p>
                                    :
                                    <p className='text-xs mt-2 font-medium'>
                                        {data.date.recurring.includes(moment().format('dddd').toLowerCase()) ? moment().format('dddd') : "date"}
                                    </p>
                            }
                            <p className='text-xs mt-2 font-medium'>{data.title},</p>
                            <p className='text-xs mt-2 font-medium'> crown plaza</p>
                            <p className="mt-1 mb-1 text-xs font-light">{data.eventCategory}</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default EventCard