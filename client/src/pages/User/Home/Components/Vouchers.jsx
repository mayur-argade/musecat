import React, { useEffect, useState } from 'react'
import EventCard from '../../../../components/Cards/EventCard'
import SkeletonCard from '../../../../components/shared/skeletons/SkeletonCard'
import { Link } from 'react-router-dom'
import { ClientGetOffers } from '../../../../http'


const Vouchers = () => {

    const [offers, setOffers] = useState([])
    const [offersLoading, setOffersLoading] = useState(false)


    useEffect(() => {
        const fetchdata = async () => {
            try {
                setOffersLoading(true)
                const { data } = await ClientGetOffers()
                setOffers(data)
                setOffersLoading(false)
            } catch (error) {
                console.log(error)
            }
        }
        fetchdata()
    }, []);

    return (
        <div>
            {
                offers.data == undefined || offers.data == null
                    ?
                    <>
                    </>
                    :
                    offersLoading
                        ?
                        <section className='flex justify-center items-center align-middle mt-5'>
                            <section className='w-full md:w-full sm:mx-5 md:mx-5 lg:w-10/12 md:w-10/12 xl:w-9/12 2xl:w-7/12'>
                                <div className='flex justify-between '>
                                    <div className="left"><span className='text-xl font-bold md:text-2xl md:font-[700]'>Offers</span></div>
                                    <div className="right"></div>
                                </div>

                                <div>
                                    <div className='md:flex md:justify-start carousel p-4 flex items-center justify-start overflow-x-auto scroll-smooth  scrollbar-hide space-x-3'>
                                        <>
                                            <div className='h-30'>
                                                <SkeletonCard />
                                            </div>
                                        </>
                                    </div>

                                </div>
                                <div className='flex justify-end space-x-2 '>
                                    <Link to="/category/editorspick">
                                        <p className='underline underline-offset-1 text-sm pr-2 '>view all</p>
                                    </Link>
                                </div>
                            </section>
                        </section>
                        :
                        offers.data.length === 0
                            ?
                            <></>
                            :
                            <section className='flex justify-center items-center align-middle mt-5'>
                                <section className='w-full md:w-full sm:mx-5 md:mx-5 md:w-10/12 xl:w-9/12 2xl:w-7/12'>
                                    <div className='flex justify-between '>
                                        <div className="left"><span className='text-xl font-bold md:text-2xl md:font-[700]'>Offers</span></div>
                                        <div className="right"></div>

                                    </div>

                                    <div className="ml-1 mr-1">
                                        <div className='md:flex md:justify-start carousel snap-x p-4 flex items-center justify-start overflow-x-auto scroll-smooth  scrollbar-hide space-x-3 md:space-x-10'>
                                            {
                                                offers.data == undefined || offers.data == null
                                                    ?
                                                    <>
                                                        <div className='h-30'>
                                                            <SkeletonCard />
                                                        </div>
                                                    </>
                                                    :
                                                    offers.data.map((offer) => (
                                                        <EventCard width={'w-52'} data={offer} />
                                                    ))
                                            }
                                        </div>
                                        <div className='flex justify-end space-x-2 '>
                                            <Link to='/category/events'>
                                                <p className='underline underline-offset-1 text-sm pr-2 '>view all</p>
                                            </Link>
                                        </div>
                                    </div>
                                </section>
                            </section>
            }
        </div>
    )
}

export default Vouchers