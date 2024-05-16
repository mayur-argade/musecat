import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { vendorLogin, vendorFacebookLogin, vendorGoogleLogin } from '../../../http/index'
import { useDispatch } from "react-redux";
import { setAuth } from "../../../store/authSlice";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from 'react-hot-toast';
import { hasGrantedAllScopesGoogle, useGoogleLogin, GoogleLogin } from '@react-oauth/google'
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props'


const VendorLogin = () => {
    const fb_clientId = process.env.REACT_APP_FB_CLIENT_ID
    console.log(fb_clientId)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const responseFacebook = async (response) => {
        try {
            setLoading(true);

            // Assuming vendorFacebookLogin is a function that returns a promise
            const res = await toast.promise(vendorFacebookLogin(response), {
                loading: 'Logging in...',
                success: 'Login successful!',
                error: (error) => `${error.response?.data?.data || 'An error occurred. Please try again.'}`
            });

            setLoading(false);
            // console.log('this is logged in details', res.data)
            dispatch(setAuth(res.data));
            const prevLocation = '/';
            navigate(prevLocation);
        } catch (error) {
            console.error(error);

        }
    };

    const googleLogin = async (codeResponse) => {
        console.log(codeResponse)
        try {
            setLoading(true);

            // Assuming facebookLogin is a function that returns a promise
            const res = await toast.promise(vendorGoogleLogin(codeResponse), {
                loading: 'Logging in...', // Message to display while the promise is pending
                success: 'Login successful!', // Message to display on success
                error: (error) => `${error.response?.data?.data || 'An error occurred. Please try again.'}`
            });

            console.log('success', res);
            setLoading(false);
            // console.log('this is logged in details', res.data)
            dispatch(setAuth(res.data));
            const prevLocation = '/';
            navigate(prevLocation);
        } catch (error) {
            // console.error('Error during login:', error);
            // setLoading(false);
            // toast.error('Login failed. Please try again.');
        }
    }

    const login = useGoogleLogin({
        onSuccess: (tokenResponse) => { googleLogin(tokenResponse) },
        onError: (error) => { console.log('Login Failed:', error) },
        scope: 'https://www.googleapis.com/auth/calendar',
        flow: 'auth-code',
    });

    async function submit() {
        if (!email || !password) {
            window.alert("both fields are required")
        } try {
            const { data } = await vendorLogin({ email, password })
            console.log(data)
            dispatch(setAuth(data));
            if (data.user.role == "admin") {
                navigate('/admin/home')
            } else {
                navigate('/vendor/home');
            }
        } catch (error) {
            // console.log(error.response.data.data)
            toast.error(error.response.data.data)
            console.log(error)
        }
    }

    return (
        <section className="dark:bg-[#2c2c2c] dark:text-white relative h-screen bg-no-repeat bg-center md:bg-object-scale-down bg-[url('https://res.cloudinary.com/mayurs-media/image/upload/v1693753508/mobile-login_kmuqyo.jpg')] md:bg-[url('https://res.cloudinary.com/mayurs-media/image/upload/v1693753508/mobile-login_kmuqyo.jpg')] md:bg-gray-400 md:bg-blend-multiply ">
            <button onClick={() => navigate("/")} className='absolute top-10 left-10'>
                <img src="/images/icons/login-back.svg" alt="" />
            </button>
            <Toaster />
            <section className="flex flex-col space-y-2 justify-center items-center h-screen md:mt-0 mt-0 m-10">
                <div className="title">
                    <img className='h-6 md:h-14' src="/images/assets/vendorlogin.png" alt="" />
                </div>

                <div className="max-w-sm w-full bg:white dark:bg-[#2c2c2c] dark:border-0 dark:text-white bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-20 md:bg-white rounded-xl p-4 space-y-4 border border-white">
                    <div className="mb-4">
                        <h2 className="text-xl font-bold dark:text-white text-white md:text-black">Welcome Back</h2>
                    </div>
                    <div>
                        <input className="w-full p-2 text-sm bg-white md:bg-gray-100 dark:text-white dark:bg-[#454545] dark:placeholder:text-white dark:border-0 ring-0 dark:focus:outline-0  focus:outline-none border border-gray-200 rounded-md text-gray-600" type="text" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
                    </div>
                    <div>
                        <input className="w-full p-2 text-sm text-sm bg-white md:bg-gray-100 dark:text-white dark:bg-[#454545] dark:placeholder:text-white dark:border-0 ring-0 dark:focus:outline-0  focus:outline-none border border-gray-200 rounded-md text-gray-600" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
                    </div>
                    <Link to='/vendor/reset'>
                        <div className='flex justify-items-end justify-end'>
                            <span className="justify-self-end text-sm text-white md:text-black hover:underline dark:text-white " href="#">Forgot password?</span>
                        </div>
                    </Link>

                    <div>
                        {/* <Link to='/vendor/home'> */}
                        <button className="w-full p-2 bg-[#C0A04C] hover:bg-[#A48533] rounded-md text-sm font-bold text-gray-50 transition duration-200" onClick={submit} >Login</button>
                        {/* </Link> */}
                    </div>
                    <div onClick={() => navigate('/login')} class="cursor-pointer w-full text-center text-sm font-semibold ">
                        <span className='underline underline-offset-1 text-center'>Not a vendor</span>
                    </div>
                </div>

                <div className="max-w-sm w-full rounded-lg p-4 space-y-4 flex flex-col justify-center methods">
                    <button
                        onClick={() => login()}
                        type="button" class="text-gray-900 bg-white hover:bg-gray-100 border border-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-gray-600 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:bg-gray-700 mr-2 mb-2">
                        <img src="/images/icons/google-icon.png" alt="" />
                        <span className='mx-auto text-center'>
                            Continue with Google
                        </span>
                    </button>
                    <FacebookLogin
                        appId="1346318836020986"
                        autoLoad={false}
                        fields="name,email,picture"
                        callback={responseFacebook}
                        render={renderProps => (
                            <button
                                onClick={renderProps.onClick}
                                type="button" class="text-gray-900 bg-white hover:bg-gray-100 border border-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-gray-600 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:bg-gray-700 mr-2 mb-2">
                                <img src="/images/icons/facebook-icon.png" alt="" />
                                <span className='mx-auto text-center'>
                                    Continue with Facebook
                                </span>
                            </button>
                        )
                        }
                    />
                    <button onClick={() => navigate("/vendor/signup")} type="button" class="text-gray-900 bg-white hover:bg-gray-100 border border-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-gray-600 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:bg-gray-700 mr-2 mb-2">
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

export default VendorLogin