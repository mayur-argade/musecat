import React, { useState, useEffect } from 'react'
import Sidebar from '../../components/shared/Sidebar/Sidebar'
import { AdminDeleteOffer, ClientGetOffers } from '../../http'
import moment from 'moment'

const AdminOffers = () => {

    const [offers, setOffers] = useState([])
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        const fetchOffers = async () => {
            setLoading(true)
            try {
                const res = await ClientGetOffers()
                setOffers(res.data)
                setLoading(false)
            } catch (error) {
                setLoading(false)
            }
        }

        fetchOffers()

    }, []);

    const deleteOffer = async (offerid) => {
        setLoading(true)
        try {
            console.log("offerid", offerid)

            const offerdata = {
                offerid: offerid
            }

            const res = await AdminDeleteOffer(offerdata)
            window.alert(res.data.data)
            window.location.reload()
        } catch (error) {

        }
    }

    if (offers.data == null) {
        return (
            <>
                "loading"
            </>
        )
    }
    else {
        return (
            <div>
                <div className='flex '>

                    <div>
                        <Sidebar />
                    </div>

                    <div className='pl-20 flex flex-col w-full'>
                        <div className="navbar flex justify-end mr-10 space-x-8">
                            <button>
                                <img src="/images/icons/notification.svg" alt="" />
                            </button>
                            <button>
                                <img src="/images/icons/setting.svg" alt="" />
                            </button>
                        </div>
                        <div className="headline ">
                            <div className="heading">
                                <span className="text-2xl font-semibold">Offers</span>
                                <hr className='mt-3 mb-3' />

                                <div className="maincontent flex flex-col">
                                    <div className="recentOffers mt-4">
                                        <div className="overflow-x-auto">

                                            <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
                                                <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                                                    <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                                        <tr>
                                                            <th scope="col" class="px-6 py-3">
                                                                Event Name
                                                            </th>
                                                            <th scope="col" class="px-6 py-3">
                                                                Vendor Name
                                                            </th>
                                                            <th scope="col" class="px-6 py-3">
                                                                Category
                                                            </th>
                                                            <th scope="col" class="px-6 py-3">
                                                                Start Date
                                                            </th>
                                                            <th scope="col" class="px-6 py-3">
                                                                Venue
                                                            </th>
                                                            <th scope="col" class="px-6 py-3">
                                                                Offer expiry
                                                            </th>

                                                            {/* <th scope="col" class="px-6 py-3">
                                                                Action
                                                            </th> */}
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {
                                                            offers.data.map((offer) => (
                                                                <tr>
                                                                    <td className="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-900">
                                                                        {offer.title}
                                                                    </td>
                                                                    <td className="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-900">
                                                                        {offer.vendorid}
                                                                    </td>
                                                                    <td className="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-900">
                                                                        {offer.category}
                                                                    </td>
                                                                    <td className="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-900">
                                                                        {moment(offer.date).format("DD-MM-YYYY")}
                                                                    </td>
                                                                    <td className="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-900">
                                                                        {/* {offer.location} */}
                                                                        Crown Plaza
                                                                    </td>
                                                                    <td className="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-900">
                                                                        {moment(offer.expiry).format("DD-MM-YYYY")}
                                                                    </td>
                                                                    {/* <td className="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-900">
                                                                        <button onClick={() => deleteOffer(offer._id)} className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600">
                                                                            Delete
                                                                        </button>
                                                                    </td> */}
                                                                </tr>
                                                            ))
                                                        }
                                                    </tbody>
                                                </table>
                                            </div>

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default AdminOffers