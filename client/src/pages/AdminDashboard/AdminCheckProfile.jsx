import React, { useState, useEffect } from 'react'
import { GetVendorData, AdminGetVendorEvents } from '../../http/index'
import Sidebar from '../../components/shared/Sidebar/Sidebar'
import toast, { Toaster } from 'react-hot-toast';
import { Link, useParams } from 'react-router-dom'
import moment from 'moment'
// import TrendingCard from '../../components/Cards/TrendingCard';
import SubEventCard from '../../components/Cards/SubEventCard';


const AdminCheckProfile = () => {

    const { userid } = useParams()
    const [response, setResponse] = useState({})
    const [events, setEvents] = useState({})
    // console.log("userid",userid)

    useEffect(() => {
        const fetchData = async () => {

            const { data } = await GetVendorData(userid)
            // console.log(data)
            setResponse(data)
            console.log("vendordata", data)
        }

        fetchData()

        const fetchEvents = async () => {
            try {
                const { data } = await AdminGetVendorEvents(userid)
                setEvents(data)
            } catch (error) {
                console.log(error)
            }

        }

        fetchEvents()

    }, [userid])

    // console.log(events)
    if (response.data == null || events.data == null) {
        return (<div className='h-screen w-full flex justify-center align-middle items-center'>
            <img src="/images/icons/loadmain.svg" alt="" />
        </div>)
    } else {
        return (
            <div>
                <div>
                    <div className='flex '>

                        <div>
                            <Sidebar />
                        </div>

                        <div className='pl-20 flex flex-col w-full'>
                            <Toaster />
                            <div className="mt-7"></div>
                            <div className="headline ">
                                <div className="heading">
                                    <div className="flex justify-between">
                                        <span className="text-2xl font-semibold">Vendor</span>
                                        {/* <button className='px-1.5 py-1 bg-blue-800 text-sm text-white rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600 mr-5'>Update Vendor</button> */}

                                    </div>
                                    <hr className='mt-3 mb-3' />

                                    <div className="maincontent flex flex-col">
                                        <div class="bg-gray-100">
                                            <div class=" my-5 p-5">
                                                <div class="md:flex no-wrap md:-mx-2 ">

                                                    <div class="w-full md:w-3/12 md:mx-2">
                                                        <div class="bg-white p-3 border-t-4 border-green-400">
                                                            <div class="image overflow-hidden">
                                                                <img class="h-auto w-full mx-auto"
                                                                    src='/images/assets/e1.jpg'
                                                                    alt="" />
                                                            </div>
                                                            <h1 class="text-gray-900 font-bold text-xl leading-8 my-1">{response.data.firstname} {response.data.lastname}</h1>
                                                            <h3 class="text-gray-600 font-lg text-semibold leading-6">Owner of {response.data.companyname}</h3>
                                                            <p class="text-sm text-gray-500 hover:text-gray-600 leading-6">
                                                                {response.data.address}
                                                            </p>
                                                            <ul
                                                                class="bg-gray-100 text-gray-600 hover:text-gray-700 hover:shadow py-2 px-3 mt-3 divide-y rounded shadow-sm">
                                                                <li class="flex items-center py-3">
                                                                    <span>isVerified</span>
                                                                    <span class="ml-auto"><span
                                                                        class={`${response.data.isVerified ? "bg-green-500" : "bg-red-500"} py-1 px-2 rounded text-white text-sm`}>{response.data.isVerified ? "Verified" : "UnVerified"}</span></span>
                                                                </li>
                                                                {/* <li class="flex items-center py-3">
                                                                    <span>Registered At</span>
                                                                    <span class="ml-auto">{moment(response.data.createdAt).format("DD-MM-YYYY")}</span>
                                                                </li> */}
                                                            </ul>
                                                        </div>

                                                        <div class="my-4"></div>

                                                    </div>

                                                    <div class="w-full md:w-9/12 mx-2 h-64">

                                                        <div class="bg-white p-3 shadow-sm rounded-sm">
                                                            <div class="flex items-center space-x-2 font-semibold text-gray-900 leading-8">
                                                                <span clas="text-green-500">
                                                                    <svg class="h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                                                        stroke="currentColor">
                                                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                                            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                                                    </svg>
                                                                </span>
                                                                <span class="tracking-wide">About</span>
                                                            </div>
                                                            <div class="text-gray-700">
                                                                <div class="grid md:grid-cols-2 text-sm">
                                                                    <div class="grid grid-cols-2">
                                                                        <div class="px-4 py-2 font-semibold">First Name</div>
                                                                        <div class="px-4 py-2">{response.data.firstname}</div>
                                                                    </div>
                                                                    <div class="grid grid-cols-2">
                                                                        <div class="px-4 py-2 font-semibold">Last Name</div>
                                                                        <div class="px-4 py-2">{response.data.lastname}</div>
                                                                    </div>
                                                                    <div class="grid grid-cols-2">
                                                                        <div class="px-4 py-2 font-semibold">Contact No.</div>
                                                                        <div class="px-4 py-2">{response.data.mobilenumber}</div>
                                                                    </div>
                                                                    <div class="grid grid-cols-2">
                                                                        <div class="px-4 py-2 font-semibold">Current Address</div>
                                                                        <div class="px-4 py-2">{response.data.address}</div>
                                                                    </div>
                                                                    <div class="grid grid-cols-2">
                                                                        <div class="px-4 py-2 font-semibold">Email.</div>
                                                                        <div class="px-4 py-2">
                                                                            <a class="text-blue-800" href="mailto:jane@example.com">{response.data.email}</a>
                                                                        </div>
                                                                    </div>
                                                                    <div class="grid grid-cols-2">
                                                                        <div class="px-4 py-2 font-semibold">Account Type.</div>
                                                                        <div class="px-4 py-2">
                                                                            <a class="text-blue-800" href="mailto:jane@example.com">{response.data.accountType}

                                                                            </a>
                                                                        </div>
                                                                    </div>
                                                                    <div class="grid grid-cols-2">
                                                                        <div class="px-4 py-2 font-semibold">Company Logo</div>
                                                                        <div class="px-4 py-2">
                                                                            <a class="text-blue-800" href={response.data.logo} target="_blank" >Link
                                                                            </a>

                                                                        </div>
                                                                    </div>
                                                                    <div class="grid grid-cols-2">
                                                                        <div class="px-4 py-2 font-semibold">Cr Image</div>
                                                                        <div class="px-4 py-2">
                                                                            <a class="text-blue-800" href={response.data.crImage} target="_blank" >Link
                                                                            </a>

                                                                        </div>
                                                                    </div>

                                                                    <div class="grid grid-cols-2">
                                                                        <div class="px-4 py-2 font-semibold">Social Media</div>
                                                                        <div class="px-4 py-2">{response.data.socialmedia}</div>
                                                                    </div>
                                                                </div>
                                                            </div>

                                                        </div>


                                                        <div class="my-4"></div>


                                                        <div class="bg-white p-3 shadow-sm rounded-sm">

                                                            <div class="grid grid-cols-1">
                                                                <div>
                                                                    <div class="flex items-center space-x-2 font-semibold text-gray-900 leading-8 mb-3">
                                                                        <span clas="text-green-500">
                                                                            <svg class="h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                                                                stroke="currentColor">
                                                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                                                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                                                            </svg>
                                                                        </span>
                                                                        <span class="tracking-wide">Hosted Events</span>
                                                                    </div>
                                                                    <div className='grid grid-cols-2'>
                                                                        {
                                                                            events.data.length == 0
                                                                                ?
                                                                                <>
                                                                                    "emppty"
                                                                                </>
                                                                                :
                                                                                events.data.map((event) => (
                                                                                    <Link to={`/admin/event/${event._id}`}>
                                                                                        <SubEventCard data={event} />
                                                                                    </Link>
                                                                                ))

                                                                        }
                                                                    </div>
                                                                </div>
                                                            </div>

                                                        </div>

                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div >
        )
    }

}

export default AdminCheckProfile