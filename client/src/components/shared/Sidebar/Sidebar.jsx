import React from 'react'
import { Link } from 'react-router-dom'

const Sidebar = () => {
    return (
        <div class="flex bg-gray-100 text-gray-900 fixed">
            <aside class="flex h-screen w-20 flex-col items-center border-r border-gray-200 bg-white">
                <Link to='/admin/home'>
                    <div class="flex h-[4.5rem] w-full items-center justify-center border-b border-gray-200 p-2">
                        <img src="/images/logo/logo.png" />
                    </div>
                </Link>
                <nav class="flex flex-1 flex-col gap-y-4 pt-10">
                    <Link to='/admin/home' className='text-gary-400 group relative rounded-xl p-2 hover:bg-gray-50'>
                        <img src="/images/icons/pwa-home.svg" alt="" />
                        <div class="absolute inset-y-0 left-12 hidden items-center group-hover:flex">
                            <div class="relative whitespace-nowrap rounded-md bg-white px-4 py-2 text-sm font-semibold text-gray-900 drop-shadow-lg">
                                <div class="z-50 absolute inset-0 -left-1 flex items-center">
                                    <div class="h-2 w-2 rotate-45 bg-white"></div>
                                </div>
                                Home
                            </div>
                        </div>
                    </Link>
                    <Link to='/admin/users' className='text-gary-400 group relative rounded-xl p-2 hover:bg-gray-50'>
                        <img src="/images/icons/users.png" className='h-6 w-6' alt="" />
                        <div class="absolute inset-y-0 left-12 hidden items-center group-hover:flex">
                            <div class="relative whitespace-nowrap rounded-md bg-white px-4 py-2 text-sm font-semibold text-gray-900 drop-shadow-lg">
                                <div class="z-50 absolute inset-0 -left-1 flex items-center">
                                    <div class="h-2 w-2 rotate-45 bg-white"></div>
                                </div>
                                Users
                            </div>
                        </div>
                    </Link>
                    <Link to='/admin/vendors' className='text-gary-400 group relative rounded-xl p-2 hover:bg-gray-50'>
                        <img src="/images/icons/vendor.png" className='h-6 w-6' alt="" />
                        <div class="absolute inset-y-0 left-12 hidden items-center group-hover:flex">
                            <div class="relative whitespace-nowrap rounded-md bg-white px-4 py-2 text-sm font-semibold text-gray-900 drop-shadow-lg">
                                <div class="z-50 absolute inset-0 -left-1 flex items-center">
                                    <div class="h-2 w-2 rotate-45 bg-white"></div>
                                </div>
                                Vendors
                            </div>
                        </div>
                    </Link>
                    <Link to='/admin/events' className='text-gary-400 group relative rounded-xl p-2 hover:bg-gray-50'>
                        <img src="/images/icons/events.png" className='h-6 w-6' alt="" />
                        <div class="absolute inset-y-0 left-12 hidden items-center group-hover:flex">
                            <div class="relative whitespace-nowrap rounded-md bg-white px-4 py-2 text-sm font-semibold text-gray-900 drop-shadow-lg">
                                <div class="z-50 absolute inset-0 -left-1 flex items-center">
                                    <div class="h-2 w-2 rotate-45 bg-white"></div>
                                </div>
                                Events
                            </div>
                        </div>
                    </Link>
                    <Link to='/admin/offers' className='text-gary-400 group relative rounded-xl p-2 hover:bg-gray-50'>
                        <img src="/images/icons/offers.png" className='h-6 w-6' alt="" />
                        <div class="absolute inset-y-0 left-12 hidden items-center group-hover:flex">
                            <div class="relative whitespace-nowrap rounded-md bg-white px-4 py-2 text-sm font-semibold text-gray-900 drop-shadow-lg">
                                <div class="z-50 absolute inset-0 -left-1 flex items-center">
                                    <div class="h-2 w-2 rotate-45 bg-white"></div>
                                </div>
                                Offers
                            </div>
                        </div>
                    </Link>
                    <Link to='/admin/categories' className='text-gary-400 group relative rounded-xl p-2 hover:bg-gray-50'>
                        <img src="/images/icons/categories.png" className='h-6 w-6' alt="" />
                        <div class="absolute inset-y-0 left-12 hidden items-center group-hover:flex">
                            <div class="relative whitespace-nowrap rounded-md bg-white px-4 py-2 text-sm font-semibold text-gray-900 drop-shadow-lg">
                                <div class="z-50 absolute inset-0 -left-1 flex items-center">
                                    <div class="h-2 w-2 rotate-45 bg-white"></div>
                                </div>
                                Categories
                            </div>
                        </div>
                    </Link>
                    <Link to='/admin/venue' className='text-gary-400 group relative rounded-xl p-2 hover:bg-gray-50'>
                        <img src="/images/icons/location.png" className='h-6 w-6' alt="" />
                        <div class="absolute inset-y-0 left-12 hidden items-center group-hover:flex">
                            <div class="relative whitespace-nowrap rounded-md bg-white px-4 py-2 text-sm font-semibold text-gray-900 drop-shadow-lg">
                                <div class="z-50 absolute inset-0 -left-1 flex items-center">
                                    <div class="h-2 w-2 rotate-45 bg-white"></div>
                                </div>
                                Venue
                            </div>
                        </div>
                    </Link>
                </nav>

                <div class="flex flex-col items-center gap-y-4 py-10">
                </div>
            </aside>
        </div>
    )
}

export default Sidebar