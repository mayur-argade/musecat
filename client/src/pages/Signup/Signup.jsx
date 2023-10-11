import React, { useState } from 'react'
import { ClientRegister } from '../../http'
import { useDispatch } from "react-redux";
import { setAuth } from "../../store/authSlice";
import { Link, useNavigate } from "react-router-dom";
import toast, { Toaster } from 'react-hot-toast';

const Signup = () => {
    document.title = 'Signup'

    const [loading, setLoading] = useState(false)
    const [email, setEmail] = useState('')
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [mobileNumber, setMobileNumber] = useState('')

    const navigate = useNavigate();
    const dispatch = useDispatch();

    async function submit() {
        try {
            if (!email || !username || !password || !mobileNumber) {
                alert("all fields are mandatory")
            }
            const clientdata = {
                email: email,
                username: username,
                password: password,
                mobilenumber: mobileNumber
            }
            setLoading(true)
            const { data } = await ClientRegister(clientdata)
            // console.log()
            // dispatch(setAuth(data));
            setLoading(false)
            if (data.success == true) {
                toast.success("Registration successfull Kindly check your email for verification")
            }
        } catch (error) {
            setLoading(false)
            toast.error(error.response.data.data)
        }

    }

    return (
        <section class="relative h-screen bg-cover bg-no-repeat bg-[url('https://res.cloudinary.com/mayurs-media/image/upload/v1692780548/mwt/signup_kwjykh.jpg')]  ">
            <button onClick={() => navigate(-1)} className='absolute top-10 left-10'>
            <img src="/images/icons/login-back.svg" alt="" />
            </button>
            
            <Toaster />
            <section class="flex flex-col space-y-2 justify-center items-center h-screen md:mt-0 mt-0 m-10 ">
                <div className="title mb-3">
                    <img className='h-6 md:h-12' src="/images/logo/login-logo.png" alt="" />
                </div>

                <div class="max-w-2xs w-full bg:white bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-20 md:bg-white rounded-lg p-4 space-y-4 border border-white">
                    <div class="mb-4">
                        <h2 class="text-xl font-bold text-white md:text-black">Hello there</h2>
                    </div>
                    <div>
                        <input class="w-full p-2.5 text-xs bg-white md:bg-[#E7E7E7] focus:outline-none border border-gray-200 rounded-md text-gray-600"
                            value={email} onChange={(e) => setEmail(e.target.value)}
                            type="email" for="email" id='email' placeholder="Email" />
                    </div>

                    <div>
                        <input class="w-full p-2.5 text-xs bg-white md:bg-[#E7E7E7] focus:outline-none border border-gray-200 rounded-md text-gray-600"
                            value={username} onChange={(e) => setUsername(e.target.value)}
                            type="text" for="username" id='username' placeholder="Username" />
                    </div>

                    <div>
                        <input class="w-full p-2.5 text-xs bg-white md:bg-[#E7E7E7] focus:outline-none border border-gray-200 rounded-md text-gray-600"
                            value={password} onChange={(e) => setPassword(e.target.value)}
                            type="password" for="password" id='password' placeholder="Password" />
                    </div>

                    <div>
                        <input class="w-full p-2.5 text-xs bg-white md:bg-[#E7E7E7] focus:outline-none border border-gray-200 rounded-md text-gray-600" type="password" for="password" id='password' placeholder="Confirm Password" />
                    </div>
                    <div>
                        <p className='text-white text-xs font-light md:font-regular md:text-slate-400 md:text-xs'>
                            (Optional) if you wish to receive updates on whatsapp
                        </p>
                        <div>
                            <input class="w-full p-2.5 text-xs bg-white md:bg-[#E7E7E7] focus:outline-none border border-gray-200 rounded-md text-gray-600" value={mobileNumber} onChange={(e) => setMobileNumber(e.target.value)}
                                type="number" for="text" id='text' placeholder="Mobile Number" />
                        </div>
                    </div>

                    <div className='flex justify-items-end justify-end'>
                        <Link to="/login">
                            <a class="justify-self-end text-xs text-white md:text-black font-medium underline" href="#">Already have an account ? Login</a>
                        </Link>
                    </div>
                    <div>
                        {
                            loading
                                ?
                                <button class="flex justify-center items-center w-full  p-2 bg-[#C0A04C] hover:bg-[#A48533] rounded-md text-sm font-bold text-gray-50 transition duration-200">
                                    <img className='h-6' src="/images/icons/button-loading.svg" alt="" />
                                </button>
                                :
                                <button class="w-full p-2 bg-[#C0A04C] hover:bg-[#A48533] rounded-md text-sm font-bold text-gray-50 transition duration-200" onClick={submit}>Signup</button>

                        }
                    </div>
                    <div class="flex items-center justify-between">

                    </div>
                </div>
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