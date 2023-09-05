import React from 'react'
import { Link } from 'react-router-dom'

const Login = () => {
    document.title = 'Login'

    return (

        <section class="h-screen bg-no-repeat bg-center md:bg-object-scale-down bg-[url('https://res.cloudinary.com/mayurs-media/image/upload/v1693753508/mobile-login_kmuqyo.jpg')] md:bg-[url('https://res.cloudinary.com/mayurs-media/image/upload/v1693753508/mobile-login_kmuqyo.jpg')] md:bg-gray-400 md:bg-blend-multiply ">

            <section class="flex flex-col space-y-2 justify-center items-center h-screen md:mt-0 mt-0 m-10">
                <div className="logo image mb-3">
                    <img className='h-6 md:h-12' src="/images/logo/login-logo.png" alt="" />
                </div>

                <div class="max-w-sm max-h-64 w-full bg:white bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-20 md:bg-white rounded-xl p-4 space-y-3 border border-white">
                    <div class="mb-4">
                        <h2 class="text-xl font-bold text-white md:text-black">Welcome Back</h2>
                    </div>
                    <div>
                        <input class="w-full p-2 text-sm bg-white md:bg-gray-100 focus:outline-none border border-gray-200 rounded-md text-gray-600" type="text" placeholder="Email" />
                    </div>
                    <div>
                        <input class="w-full p-2 text-sm text-sm bg-white md:bg-gray-100 focus:outline-none border border-gray-200 rounded-md text-gray-600" type="password" placeholder="Password" />
                    </div>
                    <div className='flex justify-items-end justify-end'>
                        <a class="justify-self-end text-sm font-medium text-white md:text-black underline" href="#">Forgot password?</a>
                    </div>
                    <div>
                        <Link to='/home'>
                            <button class="w-full p-2 bg-[#C0A04C] hover:bg-[#A48533] rounded-md text-sm font-bold text-gray-50 transition duration-200">Login</button>
                        </Link>
                    </div>
                    <div class="flex items-center justify-between">

                    </div>
                </div>

                <div className="max-w-sm w-full rounded-lg p-4 space-y-4 flex flex-col justify-center methods">
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
                </div>

            </section>

        </section>

    )
}

export default Login