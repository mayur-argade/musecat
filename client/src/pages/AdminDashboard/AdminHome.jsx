import React, { useState, useEffect } from 'react'
import Navbar from '../../components/shared/Navbar/Navbar'
import Sidebar from '../../components/shared/Sidebar/Sidebar'
import { AdminGetUnverifiedVendors, AdminGetAllUsers, getCategoryEvents, ClientGetOffers, AdminStats, AdminVerifyVendor } from '../../http/index'
import { Link } from 'react-router-dom'

import moment from 'moment'
const AdminHome = () => {
    document.title = "Admin Dashboard"

    const [vendors, setVendors] = useState([])
    const [users, setUsers] = useState([])
    const [response, setResponse] = useState([])
    const [stats, setStats] = useState({})
    const [loading, setLoading] = useState(false)
    const [offers, setOffers] = useState([])

    useEffect(() => {
        const fetchdata = async () => {
            setLoading(true)
            try {
                const res = await AdminGetUnverifiedVendors()
                setVendors(res.data)
                // console.log(res)
                setLoading(false)
            } catch (error) {
                // console.log(error)
                setLoading(false)
            }
        }
        fetchdata()

        const fetchUsers = async () => {
            setLoading(true)
            try {
                const res = await AdminGetAllUsers()
                setUsers(res.data)
                setLoading(false)
            } catch (error) {
                setLoading(false)
            }
        }

        fetchUsers()

        const fetchevents = async () => {
            setLoading(true)
            try {
                const res = await getCategoryEvents('events')
                // console.log(data.data)
                setResponse(res.data)
                setLoading(false)
            } catch (error) {
                // console.log(error)
                setLoading(false)
            }
        }

        fetchevents()

        const fetchOffers = async () => {
            setLoading(true)
            try {
                const res = await ClientGetOffers()
                // console.log(data.data)
                setOffers(res.data)
                setLoading(false)
            } catch (error) {
                // console.log(error)
                setLoading(false)
            }
        }

        fetchOffers()


        const fetchCount = async () => {
            setLoading(true)
            try {
                const res = await AdminStats()
                // console.log(data.data)
                setStats(res.data)
                setLoading(false)
            } catch (error) {
                // console.log(error)
                setLoading(false)
            }
        }

        fetchCount()


    }, []);

    const verifyUsers = async (vendorid) => {
        setLoading(true)
        try {

            const offerdata = {
                vendorid: vendorid
            }

            const res = await AdminVerifyVendor(offerdata)
            window.alert("Vendor Verified")
            window.location.reload()
        } catch (error) {

        }
    }

    console.log("this is vendor", users)
    if (vendors.data == null || users.data == null || response.data == null || offers.data == null || stats.data == null) {
        return (
            "loading"
        )
    } else {
        return (
            <>
                <div className=' '>
                    <div className='flex flex-col w-full'>
                        <div className="navbar flex justify-between ml-10 mr-10 space-x-8">
                            <div className="left">
                                <img src="/images/logo/logo.png" alt="" />
                            </div>
                            <div className='space-x-8'>
                                <button >
                                    <img src="/images/icons/notification.svg" alt="" />
                                </button>
                                <button>
                                    <img src="/images/icons/setting.svg" alt="" />
                                </button>
                            </div>
                        </div>

                        <div className="headline ">
                            <div className="heading">
                                <span className="text-2xl font-semibold text-lg">Dashboard</span>
                                <hr className='mt-3 mb-3' />
                                <div className='flex justify-between '>

                                    <Link to='/admin/users'>
                                        <div className="m-3 cards flex justify-between md:flex-row flex-col">
                                            <div class="p-4 transition-shadow border rounded-lg shadow-sm hover:shadow-lg">
                                                <div class="flex items-start justify-between">
                                                    <div class="flex flex-col space-y-2">
                                                        <span class="text-gray-400">Total Users</span>
                                                        <span class="text-lg font-semibold text-lg">{stats.data.users}</span>
                                                    </div>
                                                    <div class="ml-2 p-10 bg-gray-200 rounded-md"></div>
                                                </div>
                                            </div>

                                        </div>
                                    </Link>

                                    <Link to='/admin/vendors'>
                                        <div className="m-3 cards flex justify-between md:flex-row flex-col">
                                            <div class="p-4 transition-shadow border rounded-lg shadow-sm hover:shadow-lg">
                                                <div class="flex items-start justify-between">
                                                    <div class="flex flex-col space-y-2">
                                                        <span class="text-gray-400">Total Vendors</span>
                                                        <span class="text-lg font-semibold text-lg">{stats.data.vendors}</span>
                                                    </div>
                                                    <div class="ml-2 p-10 bg-gray-200 rounded-md"></div>
                                                </div>
                                            </div>
                                        </div>
                                    </Link>

                                    <Link to='/admin/events'>
                                        <div className="m-3 cards flex justify-between md:flex-row flex-col">
                                            <div class="p-4 transition-shadow border rounded-lg shadow-sm hover:shadow-lg">
                                                <div class="flex items-start justify-between">
                                                    <div class="flex flex-col space-y-2">
                                                        <span class="text-gray-400">Total Events</span>
                                                        <span class="text-lg font-semibold text-lg">{stats.data.events}</span>
                                                    </div>
                                                    <div class="ml-2 p-10 bg-gray-200 rounded-md"></div>
                                                </div>
                                            </div>
                                        </div>
                                    </Link>

                                    <Link to='/admin/offers'>
                                        <div className="m-3 cards flex justify-between md:flex-row flex-col">
                                            <div class="p-4 transition-shadow border rounded-lg shadow-sm hover:shadow-lg">
                                                <div class="flex items-start justify-between">
                                                    <div class="flex flex-col space-y-2">
                                                        <span class="text-gray-400">Total Offers</span>
                                                        <span class="text-lg font-semibold text-lg">{stats.data.offers}</span>
                                                    </div>
                                                    <div class="ml-2 p-10 bg-gray-200 rounded-md"></div>
                                                </div>
                                            </div>

                                        </div>
                                    </Link>

                                    <Link to='/admin/Categories'>
                                        <div className="m-3 cards flex justify-between md:flex-row flex-col">
                                            <div class="p-4 transition-shadow border rounded-lg shadow-sm hover:shadow-lg">
                                                <div class="flex items-start justify-between">
                                                    <div class="flex flex-col space-y-2">
                                                        <span class="text-gray-400">Total Categories</span>
                                                        <span class="text-lg font-semibold text-lg">4</span>
                                                    </div>
                                                    <div class="ml-2 p-10 bg-gray-200 rounded-md"></div>
                                                </div>
                                            </div>

                                        </div>
                                    </Link>

                                    <Link to='/admin/venue'>
                                        <div className="m-3 cards flex justify-between md:flex-row flex-col">
                                            <div class="p-4 transition-shadow border rounded-lg shadow-sm hover:shadow-lg">
                                                <div class="flex items-start justify-between">
                                                    <div class="flex flex-col space-y-2">
                                                        <span class="text-gray-400">Total Venues</span>
                                                        <span class="text-lg font-semibold text-lg">4</span>
                                                    </div>
                                                    <div class="ml-2 p-10 bg-gray-200 rounded-md"></div>
                                                </div>
                                            </div>

                                        </div>
                                    </Link>
                                </div>
                            </div>
                        </div>

                        <div className="maincontent ml-4 mr-4 mt-5">

                            <div className="1st row grid grid-cols-2 gap-8 ">
                                <div className='table1 h-96 shadow-md'>
                                    <div className="title mb-2 flex justify-between">
                                        <p className='font-semibold text-lg'>Unverified Vendors</p>
                                        <Link to='/admin/vendors'>
                                        <button className='px-1.5 py-1 bg-blue-800 text-sm text-white rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600'>show all</button>
                                        </Link>
                                    </div>
                                    <div className="overflow-x-auto">
                                        <table className="min-w-full">
                                            <thead>
                                                <tr>
                                                    <th className="px-6 w-64 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                                                        Email
                                                    </th>
                                                    <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                                                        First Name
                                                    </th>
                                                    <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                                                        Last Name
                                                    </th>
                                                    <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                                                        Action
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {
                                                    vendors.data.map((vendor) => (
                                                        <tr>
                                                            <td className="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-900">
                                                                {vendor.email}
                                                            </td>
                                                            <td className="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-900">
                                                                {vendor.firstname}
                                                            </td>
                                                            <td className="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-900">
                                                                {vendor.lastname}
                                                            </td>
                                                            <td className="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-900">
                                                                <button onClick={() => verifyUsers(vendor._id)} className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600">
                                                                    Verify
                                                                </button>
                                                            </td>
                                                        </tr>
                                                    ))
                                                }
                                            </tbody>
                                        </table>
                                    </div>
                                </div>



                                <div className='table1 h-96 shadow-md'>
                                    <div className="title mb-2 flex justify-between">
                                        <p className='font-semibold text-lg'>Recently Registered Users</p>
                                        <Link to='/admin/users'>
                                        <button className='px-1.5 py-1 bg-blue-800 text-sm text-white rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600'>show all</button>
                                        </Link>
                                    </div>
                                    <div className="overflow-x-auto">
                                        <table className="min-w-full">
                                            <thead>
                                                <tr>
                                                    <th className="px-6 w-64 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                                                        Email
                                                    </th>
                                                    <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                                                        First Name
                                                    </th>
                                                    <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                                                        Last Name
                                                    </th>
                                                    {/* <th className="px-6 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">
                                                        Action
                                                    </th> */}
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {
                                                    users.data.map((user) => (
                                                        <tr>
                                                            <td className="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-900">
                                                                {user.email}
                                                            </td>
                                                            <td className="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-900">
                                                                {user.firstname}
                                                            </td>
                                                            <td className="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-900">
                                                                {user.lastname}
                                                            </td>
                                                            {/* <td className="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-900">
                                                                <button className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600">
                                                                    Verify
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

                            <div className="recentOffers mt-4">
                                <div className='table1 h-auto shadow-md'>
                                    <div className="mb-2 title flex justify-between">
                                        <p className='font-semibold text-lg'>Recently Added Events</p>
                                        <Link to='/admin/events'>
                                        <button className='px-1.5 py-1 bg-blue-800 text-sm text-white rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600'>show all</button>
                                        </Link>
                                    </div>
                                    <div className="overflow-x-auto">

                                        <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
                                            <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                                                <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                                    <tr>
                                                        <th scope="col" class="px-6 py-3">
                                                            Event Name
                                                        </th>
                                                        <th scope="col" class="px-6 py-3">
                                                            Vendor ID
                                                        </th>
                                                        <th scope="col" class="px-6 py-3">
                                                            Category
                                                        </th>
                                                        <th scope="col" class="px-6 py-3">
                                                            Date
                                                        </th>
                                                        <th scope="col" class="px-6 py-3">
                                                            Venue
                                                        </th>
                                                        <th scope="col" class="px-6 py-3">
                                                            Price starts from
                                                        </th>

                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {
                                                        response.data.map((event) => (
                                                            <tr>
                                                                <td className="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-900">
                                                                    {event.title}
                                                                </td>
                                                                <td className="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-900">
                                                                    {event.vendorid}
                                                                </td>
                                                                <td className="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-900">
                                                                    {event.category}
                                                                </td>
                                                                <td className="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-900">
                                                                    {moment(event.date).format("DD-MM-YYYY")}
                                                                </td>
                                                                <td className="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-900">
                                                                    {event.location}
                                                                </td>
                                                                <td className="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-900">
                                                                    {event.silverPrice}
                                                                </td>
                                                            </tr>
                                                        ))
                                                    }
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="recentEvents mt-4">
                                <div className='table1 h-96 shadow-md'>
                                    <div className="title mb-2 flex justify-between">
                                        <p className='font-semibold text-lg'>Recently Added Offers</p>
                                        <Link to='/admin/offers'>
                                        <button className='px-1.5 py-1 bg-blue-800 text-sm text-white rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600'>show all</button>
                                        </Link>
                                    </div>
                                    <div className="overflow-x-auto">

                                        <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
                                            <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                                                <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                                    <tr>
                                                        <th scope="col" class="px-6 py-3">
                                                            Offer Name
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
                                                                    <button className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600">
                                                                        Verify
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
            </>
        )
    }
}

export default AdminHome