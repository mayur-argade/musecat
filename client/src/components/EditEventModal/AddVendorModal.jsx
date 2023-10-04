import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { VendorRegister } from '../../http/index'
import { useDispatch } from "react-redux";
import { setAuth } from "../../store/authSlice";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from 'react-hot-toast';

const AddVendorModal = ({ onClose }) => {
    const navigate = useNavigate();

    const [loading, setLoading] = useState(false)
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

    function captureLogo(e) {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = function () {
            setLogo(reader.result);
            console.log(reader.result);
        };
    }

    function captureImage(e) {
        const file = e.target.files[0];
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
            toast.success("Vendor Added")
        } catch (error) {
            console.log(error)
            toast.error(error.response.data.data)
        }
        onClose(); //
    }

    return (
        <div>
            <div>
                {
                    !loading
                        ?
                        <section className='md:mt-12 flex bg-white drop-shadow-2xl rounded-lg'>
                            <div className='w-96 md:w-[1000px]'>
                                <div className="modal bg-white px-3 py-4">
                                    <div className='space-y-4 max-h-auto  overflow-y-auto'>
                                    <div className='text-left flex justify-start items-start align-middle'>
                                    <p className='text-md font-bold'>Add Vendor </p>
                                </div>
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
                                                    <p className="text-xs text-gray-500 dark:text-gray-400">Upload Logo</p>
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
                                                    <p className="text-xs text-gray-500 dark:text-gray-400">Upload Image</p>
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

                                </div>
                            </div>
                        </section>
                        :
                        <div className="h-screen w-full flex justify-center align-middle items-center">
                            <img src="/images/icons/loading.svg" alt="" />
                        </div>
                }
            </div>
        </div>
    )
}

export default AddVendorModal

