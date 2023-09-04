import React from 'react'

const Footer = () => {
    return (
        <>
            <div className='bg-[#F3F3F3] border border-2 border-t-indigo-500 mt-8'>
                <footer class="md:pr-44 md:pl-44 pt-5 pl-6 pr-6">
                    <div class=" bg-[#F3F3F3] max-w-screen  py-6 sm:px-6 lg:px-8">
                        <div className='flex flex-col mb-8 items-center md:items-start space-y-2'>
                            <p className='text-2xl md:text-3xl text-center md:text-left font-bold'>
                                Subscribe to Newsletter
                            </p>

                            <p className='text-xs font-normal'>Get all updates directly to your inbox</p>


                            <form className='w-full'>
                                <label for="default-search" class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
                                <div class="relative">
                                    <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                        <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                                        </svg>
                                    </div>
                                    <div className='md:w-1/2 relative '>
                                        <input type="search" id="default-search" class="block w-full p-4 pl-10 text-sm text-gray-900 border-none rounded-lg bg-white focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                                        <button type="submit" class="absolute text-white absolute right-2.5 bottom-2.5 bg-[#C0A04C] hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
                                    </div>
                                </div>
                            </form>

                        </div>

                        <div class="grid grid-cols-1 gap-8 lg:grid-cols-3">
                            <div className='flex flex-col items-center md:items-start mt-5'>
                                <p className='text-3xl font-bold'>Muscat</p>
                                <p class="max-w-xs mt-2 text-sm text-gray-600">
                                    Follow us on social media
                                </p>
                                <div class="flex mt-3 space-x-3 text-gray-600">
                                    <a class="hover:opacity-75" href target="_blank" rel="noreferrer">
                                        <span class="sr-only"> whatsapp </span>
                                       <img className='h-8' src="/images/icons/whatsapp.svg" alt="" />
                                    </a>
                                    <a class="hover:opacity-75" href target="_blank" rel="noreferrer">
                                        <span class="sr-only"> facebook </span>
                                        <img className='h-8' src="/images/icons/facebook.svg" alt="" />
                                    </a>
                                    <a class="hover:opacity-75" href target="_blank" rel="noreferrer">
                                        <span class="sr-only"> Instagram </span>
                                        <img className='h-8' src="/images/icons/instagram.svg" alt="" />
                                    </a>
                                    <a class="hover:opacity-75" href target="_blank" rel="noreferrer">
                                        <span class="sr-only"> Email </span>
                                        <img className='h-8' src="/images/icons/email.svg" alt="" />
                                    </a>
                                </div>
                            </div>

                            <div class="grid grid-cols-1 gap-8 lg:col-span-2 sm:grid-cols-2 lg:grid-cols-3 justify-items-center">
                                <div class="flex justify-center lg:justify-start">
                                    <div class="text-center lg:text-left">
                                        <p class="font-semibold">
                                            Popular Navigation
                                        </p>
                                        <nav class="hidden md:flex flex-col mt-4 space-y-5 text-sm">
                                            <a class="hover:opacity-75 font-medium" href> Events </a>
                                            <a class="hover:opacity-75 font-medium" href> Weekly Offers </a>
                                            <a class="hover:opacity-75 font-medium" href> Kids corner </a>
                                        </nav>
                                    </div>
                                </div>

                                <div class="flex justify-center lg:justify-start">
                                    <div class="text-center lg:text-left">
                                        <p class="font-semibold">
                                            Information
                                        </p>
                                        <nav class="hidden md:flex flex-col mt-4 space-y-5 text-sm">
                                            <a class="hover:opacity-75 font-medium" href> About </a>
                                            <a class="hover:opacity-75 font-medium" href> Contact Us </a>
                                            <a class="hover:opacity-75 font-medium" href> Home </a>
                                        </nav>
                                    </div>
                                </div>

                                <div class="flex justify-center lg:justify-start">
                                    <div class="text-center lg:text-left">
                                        <p class="font-semibold">
                                            The Legal Corner
                                        </p>
                                        <nav class="hidden md:flex flex-col mt-4 space-y-5 text-sm">
                                            <a class="hover:opacity-75 font-medium" href> Privacy policy </a>
                                            <a class="hover:opacity-75 font-medium" href> Terms and conditions </a>
                                            <a class="hover:opacity-75 font-medium" href> Cookies </a>
                                        </nav>
                                    </div>
                                </div>
                            </div>


                        </div>
                        <p class="mt-12 text-sm font-bold text-center">
                            © 2023 Muscat. All rights reserved
                        </p>
                    </div>
                </footer>
            </div>
        </>
    )
}

export default Footer