import React, { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import toast, { Toaster } from 'react-hot-toast';
import { resetVendorPassword } from '../../http/index'

const ResetPasswordVendor = () => {

    const navigate = useNavigate()
    let { token } = useParams();

    const [password, setPassword] = useState('')
    const [cpassword, setCpassword] = useState('')
    const [loading, setLoading] = useState(false)

    async function submit() {
        try {
            if (password != cpassword) {
                return toast.error("Password and confirm password should be same")
            }
            setLoading(true)
            const passworddata = {
                token: token,
                password: password
            }
            const { data } = await resetVendorPassword(passworddata)
            setLoading(false)
            if (data.success == true) {
                toast.success("Password has been updated you can login using new password")
                navigate('/vendor/login')
            }
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
        <body class="dark:bg-[#2c2c2c] dark:text-white relative h-screen flex justify-center align-middle items-center bg-no-repeat bg-center md:bg-object-scale-down bg-[url('https://res.cloudinary.com/mayurs-media/image/upload/v1693753508/mobile-login_kmuqyo.jpg')] md:bg-[url('https://res.cloudinary.com/mayurs-media/image/upload/v1693753508/mobile-login_kmuqyo.jpg')] md:bg-gray-400 md:bg-blend-multiply ">
            <button className='absolute top-10 left-10'>
                <img onClick={(() => HandleBackClick())} src="/images/icons/login-back.svg" alt="" />
            </button>
            <Toaster />
            <div className='flex-row items-center align-middle '>
                <div class="max-w-lg mx-auto bg-white p-8 rounded-xl shadow shadow-slate-300">
                    <h1 class="text-4xl font-medium">Reset password</h1>
                    <p class="text-slate-500">Fill up the form to reset the password</p>

                    <div action="" class="my-10">
                        <div class="flex flex-col space-y-5">
                            <label for="Password">
                                <p class="font-medium text-slate-700 pb-2">Password</p>
                                <input id="password" name="password" type="password" class="w-full py-3 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow"
                                    onChange={((e) => setPassword(e.target.value))} />
                            </label>
                            <label for="Confirm Password">
                                <p class="font-medium text-slate-700 pb-2">Confirm Password</p>
                                <input id="password" name="password" type="password" class="w-full py-3 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow"
                                    onChange={((e) => setCpassword(e.target.value))} />
                            </label>
                            <button
                                onClick={submit}
                                class="w-full py-3 font-medium text-white bg-[#C0A04C] hover:bg-[#A48533] rounded-lg border-indigo-500 hover:shadow inline-flex space-x-2 items-center justify-center">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 5.25a3 3 0 013 3m3 0a6 6 0 01-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1121.75 8.25z" />
                                </svg>

                                <span>Reset password</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </body>
    )
}

export default ResetPasswordVendor
