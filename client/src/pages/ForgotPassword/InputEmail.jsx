import React, { useState } from 'react'
import { SendVerificationLink } from '../../http/index'
import toast, { Toaster } from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom'

const InputEmail = () => {

    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)
    const [email, setEmail] = useState('')

    async function submit() {
        if (!email) {
            return toast.error("Required field is missing")
        }
        try {
            setLoading(true)
            const submitdata = {
                email: email
            }
            const { data } = await SendVerificationLink(submitdata)
            toast.success(data.data)
            setLoading(false)
            console.log(data)
        } catch (error) {
            console.log(error)
        }
    }

    async function HandleBackClick() {
        console.log("button clicked")
        if (sessionStorage.getItem('prevLocation')) {
            const prevLocation = sessionStorage.getItem('prevLocation');
            // Check if the URL of prevLocation starts with "/bookticket"
            if (prevLocation.startsWith('/bookticket') || prevLocation.startsWith('/pastpurchased') || prevLocation.startsWith('/profile')) {
                // Go back two pages (navigate -2)
                navigate(-3);
            } else {
                // Go back one page (navigate -1)
                navigate(-1);
            }
        } else {
            navigate('/')
        }
    }

    return (
        <body class="relative h-screen flex justify-center align-middle items-center bg-no-repeat bg-center md:bg-object-scale-down bg-[url('https://res.cloudinary.com/mayurs-media/image/upload/v1693753508/mobile-login_kmuqyo.jpg')] md:bg-[url('https://res.cloudinary.com/mayurs-media/image/upload/v1693753508/mobile-login_kmuqyo.jpg')] md:bg-gray-400 md:bg-blend-multiply ">
            <button className='absolute top-10 left-10'>
                <img onClick={(() => HandleBackClick())} src="/images/icons/login-back.svg" alt="" />
            </button>
            <Toaster />
            <div className='flex-row items-center align-middle '>
                <div class="max-w-lg mx-auto bg-white p-7 rounded-xl shadow shadow-slate-300 flex-row align-middle items-center">
                    <h1 class="text-4xl font-medium">Reset password</h1>
                    <p class="text-slate-500">Fill up the form to reset the password</p>

                    <div action="" class="my-10">
                        <div class="flex flex-col space-y-5">
                            <label for="email">
                                <p class="font-medium text-slate-700 pb-2">Email address</p>
                                <input id="email" name="email" type="email" class="w-full py-3 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow" placeholder="Enter email address"
                                    onChange={((e) => setEmail(e.target.value))} />
                            </label>

                            {
                                loading
                                    ?
                                    <button class="flex justify-center items-center w-full  p-2 bg-[#C0A04C] hover:bg-[#A48533] rounded-md text-sm font-bold text-gray-50 transition duration-200">
                                        <img className='h-6' src="/images/icons/button-loading.svg" alt="" />
                                    </button>
                                    :
                                    <button class="w-full p-2 bg-[#C0A04C] hover:bg-[#A48533] rounded-md text-sm font-bold text-gray-50 transition duration-200" onClick={submit}>Reset Password</button>

                            }
                            <p class="text-center">Not registered yet?
                                <Link to="/signup" class="text-[#C0A04C]  font-medium inline-flex space-x-1 items-center"><span>Register now </span><span><svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                </svg></span>
                                </Link></p>
                        </div>
                    </div>
                </div>
            </div>
        </body>
    )
}

export default InputEmail