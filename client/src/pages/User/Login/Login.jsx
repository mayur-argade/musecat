import React, { useState, useRef, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch } from "react-redux";
import toast, { Toaster } from 'react-hot-toast';
import { setAuth } from "../../../store/authSlice";
import { ClientLogin, ClientGoogleLogin, googleLogin, facebookLogin } from "../../../http/index"
import { hasGrantedAllScopesGoogle, useGoogleLogin, GoogleLogin } from '@react-oauth/google'
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props'
import ResendDialogueBox from '../../../components/ResendDialogueBox/ResendDialogueBox';

const Login = () => {

    document.title = 'Login'
    const emailInputRef = useRef(null);

    const responseFacebook = async (response) => {
        try {
            setLoading(true);

            // Assuming facebookLogin is a function that returns a promise
            const res = await toast.promise(facebookLogin(response), {
                loading: 'Logging in...', // Message to display while the promise is pending
                success: 'Login successful!', // Message to display on success
            });

            console.log('success', res);
            setLoading(false);
            // console.log('this is logged in details', res.data)
            dispatch(setAuth(res.data));
            const prevLocation = '/';
            navigate(prevLocation);
        } catch (error) {
            console.error('Error during login:', error);
            setLoading(false);
            toast.error('Login failed. Please try again.');
        }
    };

    const googleLogin = async (codeResponse) => {
        console.log(codeResponse)
        try {
            setLoading(true);

            // Assuming facebookLogin is a function that returns a promise
            const res = await toast.promise(ClientGoogleLogin(codeResponse), {
                loading: 'Logging in...', // Message to display while the promise is pending
                success: 'Login successful!', // Message to display on success
            });

            console.log('success', res);
            setLoading(false);
            // console.log('this is logged in details', res.data)
            dispatch(setAuth(res.data));
            const prevLocation = '/';
            navigate(prevLocation);
        } catch (error) {
            console.error('Error during login:', error);
            setLoading(false);
            toast.error('Login failed. Please try again.');
        }
    }

    const scopes = ['profile', 'email', 'calender'];
    const login = useGoogleLogin({
        onSuccess: (tokenResponse) => { googleLogin(tokenResponse) },
        onError: (error) => { console.log('Login Failed:', error) },
        scope: 'https://www.googleapis.com/auth/calendar',
        flow: 'auth-code',
    });

    const [loading, setLoading] = useState(false)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [user, setUser] = useState([]);
    const [profile, setProfile] = useState([]);
    const [showVerificationPopup, setShowVerificationPopup] = useState(false);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    async function submit() {
        if (!email || !password) {
            return toast.error("email and password is mandatory")
        }
        setLoading(true)
        try {
            const res = await ClientLogin({ email, password })
            console.log("success", res)
            setLoading(false)
            // console.log("this is logged in details",res.data)
            dispatch(setAuth(res.data));
            const prevLocation = sessionStorage.getItem('prevLocation') || '/';
            navigate(prevLocation);
        } catch (error) {
            setLoading(false)
            console.log(error)
            if (error.response.status == 400 && error.response.data.data == "Kindly verify your account for signing in") {
                setShowVerificationPopup(true)
            }
            toast.error(error.response.data.data)
        }
    }

    useEffect(() => {
        // Focus on the email input field when the component mounts
        emailInputRef.current.focus();
    }, []);

    return (
        <section class="dark:bg-[#2c2c2c] dark:text-white relative h-screen bg-no-repeat bg-center md:bg-object-scale-down bg-[url('https://res.cloudinary.com/mayurs-media/image/upload/v1693753508/mobile-login_kmuqyo.jpg')] md:bg-[url('https://res.cloudinary.com/mayurs-media/image/upload/v1693753508/mobile-login_kmuqyo.jpg')] md:bg-gray-400 md:bg-blend-multiply ">
            <button className='absolute top-10 left-10'>
                <img onClick={() => navigate(-1)} src="/images/icons/login-back.svg" alt="" />
            </button>
            <Toaster />
            <section class="flex flex-col space-y-2 justify-center items-center h-screen md:mt-0 mt-0 m-10">
                <div className="logo image mb-3">
                    <img className='h-6 md:h-12' src="/images/logo/login-logo.png" alt="" />
                </div>

                <div class="max-w-sm max-h-72 h-auto w-full bg:white dark:bg-[#2c2c2c] dark:text-white dark:border-0 bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-20 md:bg-white rounded-xl p-4 space-y-3 border border-white">
                    <div class="mb-4">
                        <h2 class="text-xl font-bold dark:text-white text-white md:text-black">Welcome Back</h2>
                    </div>
                    <div>
                        <input class="w-full p-2 text-sm bg-white md:bg-gray-100 focus:outline-none dark:text-white dark:bg-[#454545] dark:placeholder:text-white dark:border-0 ring-0 dark:focus:outline-0 focus:outline-none border border-gray-200 rounded-md text-gray-600"
                            value={email} ref={emailInputRef} onChange={(e) => setEmail(e.target.value)}
                            type="text" placeholder="Email" />
                    </div>
                    <div>
                        <input class="w-full p-2 text-sm text-sm bg-white md:bg-gray-100 dark:text-white dark:bg-[#454545] dark:placeholder:text-white dark:border-0 ring-0 dark:focus:outline-0  focus:outline-none border border-gray-200 rounded-md text-gray-600"
                            value={password} onChange={(e) => setPassword(e.target.value)}
                            type="password" placeholder="Password" />
                    </div>
                    <div className='flex justify-items-end justify-end'>

                        <Link to='/reset' class="justify-self-end text-sm font-medium dark:text-white text-white md:text-black underline" href="#">Forgot password?</Link>
                    </div>
                    <div>
                        {
                            loading
                                ?
                                <button class="flex justify-center items-center w-full  p-2 bg-[#C0A04C] hover:bg-[#A48533] rounded-md text-sm font-bold text-gray-50 transition duration-200">
                                    <img className='h-6' src="/images/icons/button-loading.svg" alt="" />
                                </button>
                                :
                                <button class="w-full p-2 bg-[#C0A04C] hover:bg-[#A48533] rounded-md text-sm font-bold text-gray-50 transition duration-200" onClick={submit}>Login</button>

                        }
                    </div>
                    <div onClick={() => navigate('/vendor/login')} class="cursor-pointer w-full text-center text-sm font-semibold ">
                        <span className='underline underline-offset-1 text-center'>I'm a vendor</span>
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
                    <button
                        onClick={() => navigate("/signup")}
                        type="button" class="text-gray-900 bg-white hover:bg-gray-100 border border-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-gray-600 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:bg-gray-700 mr-2 mb-2">
                        <img className="flex dark:hidden" src="/images/icons/email-icon.png" alt="" />
                        <img className="dark:flex hidden" src="/images/icons/email-light.svg" alt="" />
                        <span className='mx-auto text-center'>
                            Continue for signup
                        </span>
                    </button>
                </div>
            </section>
            {
                showVerificationPopup && (
                    <div>
                        <div>
                            <div className='calendar-overlay'>
                                <div className='relative text-black'>
                                    <div className='absolute top-0 right-0'>
                                        <button onClick={() => setShowVerificationPopup(false)} className='text-white hover:underline'><img className=' bg-white rounded-full h-7 cursor-pointer' src="/images/icons/cancel-icon-new.png" alt="" /></button>
                                    </div>
                                    <ResendDialogueBox onClose={() => setShowVerificationPopup(false)} />
                                </div>
                            </div>
                        </div>
                    </div>
                )
            }
        </section>

    )
}

export default Login