import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { VendorRegister } from '../../http/index'
import { useDispatch } from "react-redux";
import { setAuth } from "../../store/authSlice";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from 'react-hot-toast';

const VendorSignup = () => {
    document.title = "Vendor ~ Signup"

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [firstname, setFirstname] = useState('')
    const [lastname, setLastname] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [mobile, setMobile] = useState('')
    const [registerAddress, setRegisterAddress] = useState('')
    const [accountType, setAccountType] = useState('')
    const [companyName, setCompanyName] = useState('')
    const [companyDisplayName, setCompanyDisplayName] = useState('')
    const [crNo, setCrNo] = useState('')
    const [website, setWebsite] = useState('')
    const [logo, setLogo] = useState('')
    const [crImage, setCrImage] = useState('')
    const [selectedLogo, setSelectedLogo] = useState(null)
    const [selectedCrImage, setSelectedCrImage] = useState(null)

    function captureLogo(e) {
        const file = e.target.files[0];
        setSelectedLogo(file)
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = function () {
            setLogo(reader.result);
            console.log(reader.result);
        };
    }

    function captureImage(e) {
        const file = e.target.files[0];
        setSelectedCrImage(file)
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = function () {
            setCrImage(reader.result);
            console.log(reader.result);
        };
    }
    async function submit() {

        if (!firstname || !lastname || !email || !password || !mobile || !registerAddress || !accountType || !companyName || !companyDisplayName || !crNo || !website || !logo || !crImage) {
            window.alert("all fields are mandatory")
        }

        if (mobile.length !== 8) {
            return toast.error("Please input valid phone number")
        }

        const signupdata = {
            firstname: firstname,
            lastname: lastname,
            email: email,
            password: password,
            mobilenumber: mobile,
            address: registerAddress,
            accountType: accountType,
            companyname: companyName,
            companyDisplayName: companyDisplayName,
            crNo: crNo,
            website: website,
            logo: logo,
            crImage: crImage
        }
        console.log(signupdata)
        try {
            const { data } = await VendorRegister(signupdata)
            console.log(data)
            dispatch(setAuth(data));
            navigate('/vendor/home');
        } catch (error) {
            console.log(error)
            toast.error(error.response.data.message)
        }
    }

    return (
        <section className="relative h-screen bg-center bg-no-repeat bg-[url('https://res.cloudinary.com/mayurs-media/image/upload/v1692780548/mwt/signup_kwjykh.jpg')] md:bg-gray-400 md:bg-blend-multiply ">
            <button onClick={() => navigate(-1)} className='absolute top-10 left-10'>
                <img src="/images/icons/login-back.svg" alt="" />
            </button>
            <Toaster />
            <section className="flex flex-col space-y-2 justify-center items-center h-screen md:mt-0 mt-0 m-10">
                <div className="title">
                    <img className='h-6 md:h-12' src="/images/assets/vendorlogin.png" alt="" />
                </div>

                <div className="max-w-xs w-full h-auto bg:white bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-20 md:bg-white rounded-lg p-4 space-y-4 border border-white">
                    <div className="mb-4">
                        <h2 className="text-xl font-bold text-white md:text-black">Hello there</h2>
                    </div>

                    <div className='space-y-4 max-h-96  overflow-y-auto'>
                        <div>
                            <input className="w-full p-2.5 text-xs bg-white md:bg-gray-100 focus:outline-none border border-gray-200 rounded-md text-gray-600" type="email"
                                value={email} onChange={(e) => setEmail(e.target.value)} for="email" id='email' placeholder="Email" />
                        </div>

                        <div>
                            <input className="w-full p-2.5 text-xs bg-white md:bg-gray-100 focus:outline-none border border-gray-200 rounded-md text-gray-600" type="text" for="firstname" id='firstname'
                                value={firstname} onChange={(e) => setFirstname(e.target.value)}
                                placeholder="First Name" />
                        </div>

                        <div>
                            <input className="w-full p-2.5 text-xs bg-white md:bg-gray-100 focus:outline-none border border-gray-200 rounded-md text-gray-600" type="text" for="lastname" id='lastname'
                                value={lastname} onChange={(e) => setLastname(e.target.value)}
                                placeholder="Last Name" />
                        </div>

                        <div>
                            <input className="w-full p-2.5 text-xs bg-white md:bg-gray-100 focus:outline-none border border-gray-200 rounded-md text-gray-600" type="password" for="password" id='password'
                                value={password} onChange={(e) => setPassword(e.target.value)}
                                placeholder="Password" />
                        </div>

                        <div>
                            <input className="w-full p-2.5 text-xs bg-white md:bg-gray-100 focus:outline-none border border-gray-200 rounded-md text-gray-600" type="password" for="password" id='password' placeholder="Confirm Password" />
                        </div>
                        <div>
                            <div>
                                <input className="w-full p-2.5 text-xs bg-white md:bg-gray-100 focus:outline-none border border-gray-200 rounded-md text-gray-600" type="number" for="text" id='text'
                                    pattern="\d{8}"
                                    value={mobile} onChange={(e) => setMobile(e.target.value)}
                                    placeholder="Mobile Number" />
                            </div>
                        </div>

                        <div>
                            <input className="w-full p-2.5 text-xs bg-white md:bg-gray-100 focus:outline-none border border-gray-200 rounded-md text-gray-600" type="text" for="address" id='address'
                                value={registerAddress} onChange={(e) => setRegisterAddress(e.target.value)} placeholder="Registerd Address" />
                        </div>

                        <div className="flex align-middle items-center space-x-1">
                            <input
                                type="radio"
                                value="business"
                                onChange={(e) => setAccountType(e.target.value)}
                                checked={accountType === "business"} // Check if "Business" is selected
                                id="business"
                            />
                            <label className="text-sm font-normal" htmlFor="business">
                                Business
                            </label>
                        </div>
                        <div className="flex align-middle items-center space-x-1">
                            <input
                                type="radio"
                                value="individual"
                                onChange={(e) => setAccountType(e.target.value)}
                                checked={accountType === "individual"} // Check if "Individual" is selected
                                id="individual"
                            />
                            <label className="text-sm font-normal" htmlFor="individual">
                                Individual
                            </label>
                        </div>

                        <div>
                            <input className="w-full p-2.5 text-xs bg-white md:bg-gray-100 focus:outline-none border border-gray-200 rounded-md text-gray-600" type="text" for="companyname" id='companyname'
                                value={companyName} onChange={(e) => setCompanyName(e.target.value)}
                                placeholder="Company Name (as per CR)" />
                        </div>

                        <div>
                            <input className="w-full p-2.5 text-xs bg-white md:bg-gray-100 focus:outline-none border border-gray-200 rounded-md text-gray-600" type="text" for="companyDisplayName" id='companyDisplayName'
                                value={companyDisplayName} onChange={(e) => setCompanyDisplayName(e.target.value)}
                                placeholder="Company Display Name" />
                        </div>


                        <div className="flex items-center justify-center w-full">
                            <label for="dropzone-file" className="flex flex-col items-center justify-center w-full h-20 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                                <div className="flex flex-col items-center justify-center ">
                                    <img src="/images/icons/upload-image.svg" alt="" />
                                    <p className="text-xs text-gray-500 dark:text-gray-400">{selectedLogo ? `Selected File: ${selectedLogo.name}` : 'Upload logo'}</p>
                                </div>
                                <input onChange={captureLogo}
                                    id="dropzone-file" type="file" className="hidden" />
                            </label>
                        </div>

                        <div>
                            <input className="w-full p-2.5 text-xs bg-white md:bg-gray-100 focus:outline-none border border-gray-200 rounded-md text-gray-600" type="text" for="crNo" id='crNo'
                                value={crNo} onChange={(e) => setCrNo(e.target.value)}
                                placeholder="CR. No" />
                        </div>

                        <div className="flex items-center justify-center w-full">
                            <label for="crimage" className="flex flex-col items-center justify-center w-full h-20 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                                <div className="flex flex-col items-center justify-center ">
                                    <img src="/images/icons/upload-image.svg" alt="" />

                                    <p className="text-xs text-gray-500 dark:text-gray-400">{selectedCrImage ? `Selected File: ${selectedCrImage.name}` : 'Upload logo'}</p>
                                </div>
                                <input onChange={captureImage} id="crimage" type="file" className="hidden" />
                            </label>
                        </div>

                        <div>
                            <input className="w-full p-2.5 text-xs bg-white md:bg-gray-100 focus:outline-none border border-gray-200 rounded-md text-gray-600" type="text" for="website"
                                value={website} onChange={(e) => setWebsite(e.target.value)}
                                id='username' placeholder="Website (optional)" />
                        </div>
                    </div>

                    <div>
                        <button className="w-full py-2 bg-[#C0A04C] hover:bg-[#A48533] rounded-md text-sm font-bold text-gray-50 transition duration-200" onClick={submit} >Signup</button>
                    </div>
                    <div className="flex items-center justify-between">

                    </div>
                </div>



            </section>

        </section >
    )
}

export default VendorSignup