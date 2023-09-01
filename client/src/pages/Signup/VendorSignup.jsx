import React from 'react'
import { Link } from 'react-router-dom'
const VendorSignup = () => {
    return (
        <section class="h-screen bg-center bg-no-repeat bg-[url('https://res.cloudinary.com/mayurs-media/image/upload/v1692780548/mwt/signup_kwjykh.jpg')] md:bg-gray-400 md:bg-blend-multiply ">

            <section class="flex flex-col space-y-2 justify-center items-center h-screen md:mt-0 mt-0 m-10">
                <div className="title">
                    <img className='h-6 md:h-12' src="/images/assets/vendorlogin.png" alt="" />
                </div>

                <div class="max-w-xs w-full h-auto bg:white bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-20 md:bg-white rounded-lg p-4 space-y-4 border border-white">
                    <div class="mb-4">
                        <h2 class="text-xl font-bold text-white md:text-black">Hello there</h2>
                    </div>

                    <div className='space-y-4 max-h-96  overflow-y-auto'>
                    <div>
                        <input class="w-full p-2.5 text-xs bg-white md:bg-gray-100 focus:outline-none border border-gray-200 rounded-md text-gray-600" type="email" for="email" id='email' placeholder="Email" />
                    </div>

                    <div>
                        <input class="w-full p-2.5 text-xs bg-white md:bg-gray-100 focus:outline-none border border-gray-200 rounded-md text-gray-600" type="text" for="username" id='username' placeholder="First Name" />
                    </div>

                    <div>
                        <input class="w-full p-2.5 text-xs bg-white md:bg-gray-100 focus:outline-none border border-gray-200 rounded-md text-gray-600" type="text" for="username" id='username' placeholder="Last Name" />
                    </div>

                    <div>
                        <input class="w-full p-2.5 text-xs bg-white md:bg-gray-100 focus:outline-none border border-gray-200 rounded-md text-gray-600" type="password" for="password" id='password' placeholder="Password" />
                    </div>

                    <div>
                        <input class="w-full p-2.5 text-xs bg-white md:bg-gray-100 focus:outline-none border border-gray-200 rounded-md text-gray-600" type="password" for="password" id='password' placeholder="Confirm Password" />
                    </div>
                    <div>
                        <div>
                            <input class="w-full p-2.5 text-xs bg-white md:bg-gray-100 focus:outline-none border border-gray-200 rounded-md text-gray-600" type="text" for="text" id='text' placeholder="Mobile Number" />
                        </div>
                    </div>

                    <div>
                        <input class="w-full p-2.5 text-xs bg-white md:bg-gray-100 focus:outline-none border border-gray-200 rounded-md text-gray-600" type="text" for="username" id='username' placeholder="Registerd Address" />
                    </div>

                    <div>
                        <p className='font-semibold text-sm ml-1'>Type of Account</p>
                        <div className='flex space-x-10 mt-1'>
                            <div className='flex align-middle items-center space-x-1'>
                                <input type="radio" name="" id="business" />
                                <label className='text-sm font-normal' htmlFor="business">Business</label>
                            </div>
                            <div className='flex align-middle items-center space-x-1'>
                                <input type="radio" name="" id="individual" />
                                <label className='text-sm font-normal' htmlFor="individual">Individual</label>
                            </div>
                        </div>
                    </div>

                    <div>
                        <input class="w-full p-2.5 text-xs bg-white md:bg-gray-100 focus:outline-none border border-gray-200 rounded-md text-gray-600" type="text" for="username" id='username' placeholder="Company Name (as per CR)" />
                    </div>

                    <div>
                        <input class="w-full p-2.5 text-xs bg-white md:bg-gray-100 focus:outline-none border border-gray-200 rounded-md text-gray-600" type="text" for="username" id='username' placeholder="Company Display Name" />
                    </div>


                    <div class="flex items-center justify-center w-full">
                        <label for="dropzone-file" class="flex flex-col items-center justify-center w-full h-20 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                            <div class="flex flex-col items-center justify-center ">
                                <img src="/images/icons/upload-image.svg" alt="" />
                                <p class="text-xs text-gray-500 dark:text-gray-400">Upload Image</p>
                            </div>
                            <input id="dropzone-file" type="file" class="hidden" />
                        </label>
                    </div>

                    <div>
                        <input class="w-full p-2.5 text-xs bg-white md:bg-gray-100 focus:outline-none border border-gray-200 rounded-md text-gray-600" type="text" for="username" id='username' placeholder="CR. No" />
                    </div>

                    <div class="flex items-center justify-center w-full">
                        <label for="dropzone-file" class="flex flex-col items-center justify-center w-full h-20 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                            <div class="flex flex-col items-center justify-center ">
                                <img src="/images/icons/upload-image.svg" alt="" />
                                <p class="text-xs text-gray-500 dark:text-gray-400">Upload Image</p>
                            </div>
                            <input id="dropzone-file" type="file" class="hidden" />
                        </label>
                    </div>

                    <div>
                        <input class="w-full p-2.5 text-xs bg-white md:bg-gray-100 focus:outline-none border border-gray-200 rounded-md text-gray-600" type="text" for="username" id='username' placeholder="Website (optional)" />
                    </div>
                    </div>

                    <div>
                        <Link to="/vendor/home">
                        <button class="w-full py-2 bg-[#C0A04C] hover:bg-[#A48533] rounded-md text-sm font-bold text-gray-50 transition duration-200">Signup</button>
                        </Link>
                    </div>
                    <div class="flex items-center justify-between">

                    </div>
                </div>

               

            </section>

        </section >
    )
}

export default VendorSignup