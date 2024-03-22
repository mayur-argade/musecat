import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../../../components/shared/Navbar/Navbar'
import BottomNav from '../../../components/shared/BottomNav/BottomNav'
import { AllDateEvents } from '../../../http/index'
import SubEventCard from '../../../components/Cards/SubEventCard'

const EventsPWA = () => {

    const [groupedEvents, setGroupedEvents] = useState({});
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        const fetchdata = async () => {
            setLoading(true)

            try {
                const { data } = await AllDateEvents()
                console.log(data.data)
                setGroupedEvents(data)

                setLoading(false)
            } catch (error) {
                // console.log(error)
                setLoading(false)
            }
        }

        fetchdata()
    }, []);


    return (
        <>
            <div className='h-screen dark:bg-[#2c2c2c] dark:text-white'>
                <Navbar />
                <section className='flex justify-center items-center align-middle mt-5'>
                    <section className='pb-14 w-full md:w-full sm:mx-5 md:mx-5 md:w-10/12 xl:w-9/12 2xl:w-7/12'>
                        {Object.entries(groupedEvents).map(([date, events]) => (
                            <div className='' key={date}>
                                <h2 className='ml-14'>{date != 'undefined' ? date : ""}</h2>
                                <ul className=''>
                                    {/* Render events for this date */}
                                    {events.map(event => (
                                        <li className='w-full flex justify-center items-center' key={event._id}>
                                            <SubEventCard data={event} />
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </section>
                </section>
                <div className='mb-24'></div>
            </div>
            <div>
                <BottomNav />
            </div>
        </>
    )
}

export default EventsPWA