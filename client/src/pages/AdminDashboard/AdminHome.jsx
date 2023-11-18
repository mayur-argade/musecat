import React, { useState, useEffect } from 'react'
import { AdminGetUnverifiedVendors, AdminGetAllUsers, getEventsForAdmin, getOffersForAdmin, AdminStats, AdminVerifyVendor } from '../../http/index'
import { Link, useNavigate } from 'react-router-dom'
import toast, { Toaster } from 'react-hot-toast';
import moment from 'moment'

const AdminHome = () => {
    document.title = "Admin Dashboard"

    const navigate = useNavigate()
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
                const res = await getEventsForAdmin()
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
                const res = await getOffersForAdmin()
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
        return (<div className='h-screen w-full flex justify-center align-middle items-center'>
            <img src="/images/icons/loadmain.svg" alt="" />
        </div>)
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
                                <button>
                                    <img className='h-5 w-5' src="/images/icons/logout.png" alt="" />
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
                                                    <div class="ml-2">
                                                        <img className="h-14" src="/images/icons/users.png" alt="" />
                                                    </div>
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
                                                    <div class="ml-2">
                                                        <img className="h-14" src="/images/icons/vendor.png" alt="" />
                                                    </div>
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
                                                    <div class="ml-2">
                                                        <img className="h-14" src="/images/icons/events.png" alt="" />
                                                    </div>
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
                                                    <div class="ml-2">
                                                        <img className="h-14" src="/images/icons/offers.png" alt="" />
                                                    </div>
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
                                                        <span class="text-lg font-semibold text-lg">{stats.data.category}</span>
                                                    </div>
                                                    <div class="ml-2">
                                                        <img className="h-14" src="/images/icons/categories.png" alt="" />
                                                    </div>
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
                                                        <span class="text-lg font-semibold text-lg">{stats.data.venues}</span>
                                                    </div>
                                                    <div class="ml-2">
                                                        <img className="h-14" src="/images/icons/location.png" alt="" />
                                                    </div>
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
                                                            Date
                                                        </th>
                                                        <th scope="col" class="px-6 py-3">
                                                            Venue
                                                        </th>
                                                        <th scope="col" class="px-6 py-3">
                                                            Status
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
                                                                    {event.vendorid.firstname}
                                                                </td>
                                                                <td className="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-900">
                                                                    {moment(event.createdAt).format("DD-MM-YYYY")}
                                                                </td>
                                                                <td className="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-900">
                                                                    {event.location.name}
                                                                </td>
                                                                <td className="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-900">
                                                                    {event.verified
                                                                        ?
                                                                        <span className='bg-green-100 text-green-800 text-xs font-medium ml-0 px-2.5 py-0.5 rounded-full dark:bg-green-900 dark:text-green-300'>
                                                                            Verified
                                                                        </span>
                                                                        :
                                                                        <span className='bg-red-100 text-red-800 text-xs font-medium ml-0 px-2.5 py-0.5 rounded-full dark:bg-red-900 dark:text-red-300'>
                                                                            Unverified
                                                                        </span>
                                                                    }
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
                                                            Start Date
                                                        </th>
                                                        <th scope="col" class="px-6 py-3">
                                                            Venue
                                                        </th>
                                                        <th scope="col" class="px-6 py-3">
                                                            Offer expiry
                                                        </th>

                                                        <th scope="col" class="px-6 py-3">
                                                            Action
                                                        </th>
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
                                                                    {offer.vendorid.firstname}
                                                                </td>
                                                                <td className="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-900">
                                                                    {moment(offer.createdAt).format("DD-MM-YYYY")}
                                                                </td>
                                                                <td className="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-900">
                                                                    {offer.location.name}

                                                                </td>
                                                                <td className="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-900">
                                                                    {moment(offer.createdAt).format("DD-MM-YYYY")}
                                                                </td>
                                                                <td className="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-900">
                                                                    <button onClick={(() => navigate(`/admin/event/${offer._id}`))} className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600">
                                                                        View
                                                                    </button>
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
                        </div>

                    </div>


                </div>
            </>
        )
    }
}

export default AdminHome