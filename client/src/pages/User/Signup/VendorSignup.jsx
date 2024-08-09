import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { VendorRegister, handleUpload } from '../../../http/index'
import { useDispatch } from "react-redux";
import { setAuth } from "../../../store/authSlice";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from 'react-hot-toast';
import axios from 'axios'
import './vendorSignup.css'


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
    const [showBusinessInfo, setShowBusinessInfo] = useState(false)
    const [Baddress, setBaddress] = useState('')
    const [poBox, setPoBox] = useState('')
    const [postcode, setPostcode] = useState('')
    const [Crfile, setCrfile] = useState(null)
    const [fileURL, setFileURL] = useState('');
    const [loading, setLoading] = useState(false)

    function captureLogo(e) {
        const file = e.target.files[0];
        setSelectedLogo(file)
        if (file) {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onloadend = function () {
                setLogo(reader.result);
                console.log(reader.result);
            };
        }
    }

    const handleFileChange = (event) => {
        setCrfile(event.target.files[0]);
    };

    async function submit() {

        // if (!Crfile || Crfile == null) {
        //     return toast.error("CR Pdf is missing")
        // }
        if (!firstname) {
            return toast.error("Firstname is mandatory")
        }
        else if (!lastname) {
            return toast.error("lastname is mandatory")
        }
        else if (!email) {
            return toast.error("Email is mandatory")
        }
        else if (!password) {
            return toast.error("Password is mandatory")
        }
        else if (!mobile) {
            return toast.error("Mobile Number is mandatory")
        }
        else if (!registerAddress) {
            return toast.error("Register address is mandatory")
        }
        else if (!accountType) {
            return toast.error("Please select account type")
        }
        else if (!companyName) {
            return toast.error("Company name is mandatory")
        }
        else if (!companyDisplayName) {
            return toast.error("Please provide Company display name")
        }
        // else if (!crNo) {
        //     return toast.error("Provide CR no.")
        // }
        else if (!logo) {
            return toast.error("Please provide company logo")
        }

        let response
        const formData = new FormData();
        formData.append('file', Crfile);

        setLoading(true)
        response = await handleUpload(formData)
            .then((response) => {
                console.log('Upload successful:', response);
                console.log(response.data.data)
                setFileURL(response.data.data)
                return response.data.data
                // Do something with the response if needed
            })
            .catch((error) => {
                console.error('Error during upload:', error);
                // Handle the error if needed
            });

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
            crImage: response
        }
        console.log(signupdata)
        try {
            const { data } = await VendorRegister(signupdata)
            console.log(data)
            setLoading(false)
            dispatch(setAuth(data));

            toast.success(`Verification mail has been sent to your email ${email} kindly verify your email address`)

            setTimeout(() => {
                navigate('/vendor/home');
            }, 2000);

        } catch (error) {
            setLoading(false)
            console.log(error)
            toast.error(error.response.data.data)
        }
    }

    return (
        <section className="overflow-hidden md:bg-gray-400 dark:md:bg-blend-multiply relative h-screen bg-cover bg-no-repeat bg-[url('https://res.cloudinary.com/mayurs-media/image/upload/v1692780548/mwt/signup_kwjykh.jpg')]  ">
            <button onClick={() => navigate(-1)} className='absolute top-10 left-10'>
                <img src="/images/icons/login-back.svg" alt="" />
            </button>
            <Toaster />
            <section className="flex flex-col space-y-2 justify-center items-center h-screen md:mt-0 mt-0 m-10">
                <div className="title">
                    <img className='h-6 md:h-12' src="/images/assets/vendorlogin.png" alt="" />
                </div>

                <div className="dark:bg-[#2c2c2c] dark:border-0 max-w-xs w-full h-auto bg:white bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-20 md:bg-white rounded-lg p-4 space-y-4 border border-white">
                    <div className="mb-4">
                        <h2 className="dark:text-white text-xl font-bold text-white md:text-black">Hello there</h2>
                    </div>

                    <div className='space-y-4 max-h-96 overflow-y-auto scrollbar'>
                        <div>
                            <input className="dark:text-white w-full p-2.5 text-xs bg-white md:bg-gray-100 dark:bg-[#454545] dark:placeholder:text-white dark:border-0 ring-0 dark:text-white dark:focus:outline-0  focus:outline-none border border-gray-200 rounded-md text-gray-600" type="email"
                                value={email} onChange={(e) => setEmail(e.target.value)} for="email" id='email' placeholder="Email" />
                        </div>

                        <div>
                            <input className="w-full p-2.5 text-xs bg-white md:bg-gray-100 dark:bg-[#454545] dark:placeholder:text-white dark:border-0 ring-0 dark:text-white dark:focus:outline-0  focus:outline-none border border-gray-200 rounded-md text-gray-600" type="text" for="firstname" id='firstname'
                                value={firstname} onChange={(e) => setFirstname(e.target.value)}
                                placeholder="First Name" />
                        </div>

                        <div>
                            <input className="w-full p-2.5 text-xs bg-white md:bg-gray-100 dark:bg-[#454545] dark:placeholder:text-white dark:border-0 ring-0 dark:text-white dark:focus:outline-0  focus:outline-none border border-gray-200 rounded-md text-gray-600" type="text" for="lastname" id='lastname'
                                value={lastname} onChange={(e) => setLastname(e.target.value)}
                                placeholder="Last Name" />
                        </div>

                        <div>
                            <input className="w-full p-2.5 text-xs bg-white md:bg-gray-100 dark:bg-[#454545] dark:placeholder:text-white dark:border-0 ring-0 dark:text-white dark:focus:outline-0  focus:outline-none border border-gray-200 rounded-md text-gray-600" type="password" for="password" id='password'
                                value={password} onChange={(e) => setPassword(e.target.value)}
                                placeholder="Password" />
                        </div>

                        <div>
                            <input className="w-full p-2.5 text-xs bg-white md:bg-gray-100 dark:bg-[#454545] dark:placeholder:text-white dark:border-0 ring-0 dark:text-white dark:focus:outline-0  focus:outline-none border border-gray-200 rounded-md text-gray-600" type="password" for="password" id='password' placeholder="Confirm Password" />
                        </div>
                        <div>
                            <div>
                                <input className="w-full p-2.5 text-xs bg-white md:bg-gray-100 dark:bg-[#454545] dark:placeholder:text-white dark:border-0 ring-0 dark:text-white dark:focus:outline-0  focus:outline-none border border-gray-200 rounded-md text-gray-600" type="tel" for="text" id='text'
                                    pattern="\d{8}"
                                    value={mobile} onChange={(e) => setMobile(e.target.value)}
                                    placeholder="Mobile Number" />
                            </div>
                        </div>

                        <div>
                            <input className="w-full p-2.5 text-xs bg-white md:bg-gray-100 dark:bg-[#454545] dark:placeholder:text-white dark:border-0 ring-0 dark:text-white dark:focus:outline-0  focus:outline-none border border-gray-200 rounded-md text-gray-600" type="text" for="address" id='address'
                                value={registerAddress} onChange={(e) => setRegisterAddress(e.target.value)} placeholder="Registerd Address" />
                        </div>

                        <div className="flex align-middle items-center space-x-1">
                            <input
                                type="radio"
                                value="business"
                                onChange={(e) => {
                                    setAccountType(e.target.value);
                                    setShowBusinessInfo(true)
                                }}
                                checked={accountType === "business"} // Check if "Business" is selected
                                id="business"
                            />
                            <label className="dark:text-white text-sm font-normal" htmlFor="business">
                                Business
                            </label>
                        </div>
                        <div className="flex align-middle items-center space-x-1">
                            <input
                                type="radio"
                                value="individual"
                                onChange={(e) => {
                                    setAccountType(e.target.value);
                                    setShowBusinessInfo(false)
                                }}
                                checked={accountType === "individual"} // Check if "Individual" is selected
                                id="individual"
                            />
                            <label className="dark:text-white  text-sm font-normal" htmlFor="individual">
                                Individual
                            </label>
                        </div>


                        {
                            showBusinessInfo
                                ?
                                <div className="business space-y-2">
                                    <div>
                                        <input className="w-full p-2.5 text-xs bg-white md:bg-gray-100 dark:bg-[#454545] dark:placeholder:text-white dark:border-0 ring-0 dark:text-white dark:focus:outline-0  focus:outline-none border border-gray-200 rounded-md text-gray-600" type="text" for="lastname" id='lastname'
                                            value={Baddress} onChange={(e) => setBaddress(e.target.value)}
                                            placeholder="Address" />
                                    </div>
                                    <div>
                                        <input className="w-full p-2.5 text-xs bg-white md:bg-gray-100 dark:bg-[#454545] dark:placeholder:text-white dark:border-0 ring-0 dark:text-white dark:focus:outline-0  focus:outline-none border border-gray-200 rounded-md text-gray-600" type="text" for="lastname" id='lastname'
                                            value={poBox} onChange={(e) => setPoBox(e.target.value)}
                                            placeholder="P.O. Box" />
                                    </div>
                                    <div>
                                        <input className="w-full p-2.5 text-xs bg-white md:bg-gray-100 dark:bg-[#454545] dark:placeholder:text-white dark:border-0 ring-0 dark:text-white dark:focus:outline-0  focus:outline-none border border-gray-200 rounded-md text-gray-600" type="text" for="lastname" id='lastname'
                                            value={postcode} onChange={(e) => setPostcode(e.target.value)}
                                            placeholder="Post code" />
                                    </div>
                                </div>
                                :
                                <></>
                        }


                        <div>
                            <input className="w-full p-2.5 text-xs bg-white md:bg-gray-100 dark:bg-[#454545] dark:placeholder:text-white dark:border-0 ring-0 dark:text-white dark:focus:outline-0  focus:outline-none border border-gray-200 rounded-md text-gray-600" type="text" for="companyname" id='companyname'
                                value={companyName} onChange={(e) => {
                                    const alphabetsOnly = e.target.value.replace(/[^A-Za-z ]+/g, ' ');
                                    setCompanyName(alphabetsOnly);
                                }}
                                placeholder="Company Name (as per CR)" />
                        </div>

                        <div>
                            <input className="w-full p-2.5 text-xs bg-white md:bg-gray-100 dark:bg-[#454545] dark:placeholder:text-white dark:border-0 ring-0 dark:text-white dark:focus:outline-0  focus:outline-none border border-gray-200 rounded-md text-gray-600" type="text" for="companyDisplayName" id='companyDisplayName'
                                value={companyDisplayName} onChange={(e) => setCompanyDisplayName(e.target.value)}
                                placeholder="Company Display Name" />
                        </div>


                        <div className="flex items-center justify-center w-full">
                            <label for="dropzone-file" className="flex flex-col items-center justify-center w-full h-20 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-[#454545] hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                                <div className="flex flex-col items-center justify-center ">
                                    <img src="/images/icons/upload-image.svg" alt="" />
                                    <p className="text-xs text-gray-500 dark:text-gray-400">{selectedLogo ? `Selected File: ${selectedLogo.name}` : 'Upload logo'}</p>
                                </div>
                                <input onChange={captureLogo} accept="image/*"
                                    id="dropzone-file" type="file" className="hidden" />
                            </label>
                        </div>

                        <div>
                            <input className="w-full p-2.5 text-xs bg-white md:bg-gray-100 dark:bg-[#454545] dark:placeholder:text-white dark:border-0 ring-0 dark:text-white dark:focus:outline-0  focus:outline-none border border-gray-200 rounded-md text-gray-600" type="number" for="crNo" id='crNo'
                                value={crNo} onChange={(e) => setCrNo(e.target.value)}
                                placeholder="CR. No" />
                        </div>

                        <div className="flex items-center justify-center w-full">
                            <label for="crimage" className="flex flex-col items-center justify-center w-full h-20 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-[#454545] hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                                <div className="flex flex-col items-center justify-center ">
                                    <img src="/images/icons/upload-image.svg" alt="" />

                                    <p className="text-xs text-gray-500 dark:text-gray-400">
                                        {Crfile ? `Selected File: ${Crfile.name}` : 'Upload CR PDF'}
                                    </p>

                                </div>
                                <input onChange={(e) => setCrfile(e.target.files[0])} accept="application/pdf" id="crimage" type="file" className="hidden" />
                            </label>
                        </div>

                        <div>
                            <input className="w-full p-2.5 text-xs bg-white md:bg-gray-100 dark:bg-[#454545] dark:placeholder:text-white dark:border-0 ring-0 dark:text-white dark:focus:outline-0  focus:outline-none border border-gray-200 rounded-md text-gray-600" type="text" for="website"
                                value={website} onChange={(e) => setWebsite(e.target.value)}
                                id='username' placeholder="Website (optional)" />
                        </div>
                    </div>

                    <div>
                        {
                            loading
                                ?
                                <button class="flex justify-center items-center w-full  p-2 bg-[#C0A04C] hover:bg-[#A48533] rounded-md text-sm font-bold text-gray-50 transition duration-200">
                                    <img className='h-6' src="/images/icons/button-loading.svg" alt="" />
                                </button>
                                :
                                <button className="w-full py-2 bg-[#C0A04C] hover:bg-[#A48533] rounded-md text-sm font-bold text-gray-50 transition duration-200" onClick={submit} >Signup</button>
                        }
                    </div>
                    <div className="flex items-center justify-between">

                    </div>
                </div>



            </section>

        </section >
    )
}

export default VendorSignup