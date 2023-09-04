import React from 'react'

const Signup = () => {
    document.title = 'Signup'
    return (
        <section class="h-screen bg-cover bg-no-repeat bg-[url('https://res.cloudinary.com/mayurs-media/image/upload/v1692780548/mwt/signup_kwjykh.jpg')]  ">

            <section class="flex flex-col space-y-2 justify-center items-center h-screen md:mt-0 mt-0 m-10 shadow-2xl">
                <div className="title mb-3">
                    <img className='h-6 md:h-12' src="/images/logo/login-logo.png" alt="" />
                </div>

                <div class="max-w-2xs w-full bg:white bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-20 md:bg-white rounded-lg p-4 space-y-4 border border-white">
                    <div class="mb-4">
                        <h2 class="text-xl font-bold text-white md:text-black">Hello there</h2>
                    </div>
                    <div>
                        <input class="w-full p-2.5 text-xs bg-white md:bg-[#E7E7E7] focus:outline-none border border-gray-200 rounded-md text-gray-600" type="email" for="email" id='email' placeholder="Email" />
                    </div>

                    <div>
                        <input class="w-full p-2.5 text-xs bg-white md:bg-[#E7E7E7] focus:outline-none border border-gray-200 rounded-md text-gray-600" type="text" for="username" id='username' placeholder="Username" />
                    </div>

                    <div>
                        <input class="w-full p-2.5 text-xs bg-white md:bg-[#E7E7E7] focus:outline-none border border-gray-200 rounded-md text-gray-600" type="password" for="password" id='password' placeholder="Password" />
                    </div>

                    <div>
                        <input class="w-full p-2.5 text-xs bg-white md:bg-[#E7E7E7] focus:outline-none border border-gray-200 rounded-md text-gray-600" type="password" for="password" id='password' placeholder="Confirm Password" />
                    </div>
                    <div>
                        <p className='text-white text-xs font-light md:font-regular md:text-slate-400 md:text-xs'>
                        (Optional) if you wish to receive updates on whatsapp
                        </p>
                        <div>
                        <input class="w-full p-2.5 text-xs bg-white md:bg-[#E7E7E7] focus:outline-none border border-gray-200 rounded-md text-gray-600" type="text" for="text" id='text' placeholder="Mobile Number" />
                    </div>
                    </div>

                    <div className='flex justify-items-end justify-end'>
                        <a class="justify-self-end text-xs text-white md:text-black font-medium underline" href="#">Already have an account ? Login</a>
                    </div>
                    <div>
                        <button class="w-full py-2.5 bg-[#C0A04C] hover:bg-[#A48533] rounded-md text-sm font-bold text-gray-50 transition duration-200">Signup</button>
                    </div>
                    <div class="flex items-center justify-between">

                    </div>
                </div>

                {/* <div className="max-w-md w-full rounded-lg p-4 space-y-4 flex flex-col justify-center methods">
                    <button type="button" class="text-gray-900 bg-white hover:bg-white md:bg-gray-100 border border-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-gray-600 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:bg-gray-700 mr-2 mb-2">
                        <img src="/images/icons/facebook-icon.png" alt="" />
                        <span className='mx-auto text-center'>
                            Continue with Facebook
                        </span>
                    </button>
                    <button type="button" class="text-gray-900 bg-white hover:bg-gray-100 border border-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-gray-600 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:bg-gray-700 mr-2 mb-2">
                        <img src="/images/icons/google-icon.png" alt="" />
                        <span className='mx-auto text-center'>
                            Continue with Google
                        </span>
                    </button>
                    <button type="button" class="text-gray-900 bg-white hover:bg-gray-100 border border-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-gray-600 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:bg-gray-700 mr-2 mb-2">
                        <img src="/images/icons/email-icon.png" alt="" />
                        <span className='mx-auto text-center'>
                            Continue with Email
                        </span>
                    </button>
                </div> */}

            </section>

        </section >
    )
}

export default Signup

// email username password cpassword
// (Optional) if you wish to receive updates on whatsapp
// Mobile Number
// Already have an account? Login
// Signup