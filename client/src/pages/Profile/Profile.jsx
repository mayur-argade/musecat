import React, { useState, useEffect } from 'react'
import Navbar from '../../components/shared/Navbar/Navbar'
import DebitCard from '../../components/Debit-Card/DebitCard'
import Footer from '../../components/shared/Footer/Footer'
import { Link } from 'react-router-dom'
import { ClientProfileApi, ClientUpdateProfileApi } from '../../http/index'
import BottomNav from '../../components/shared/BottomNav/BottomNav'
import toast, { Toaster } from 'react-hot-toast';

const Profile = () => {
    document.title = 'Profile'

    const [displayModal, setDisplayModal] = useState(false)
    const [response, setReponse] = useState({});
    const [loading, setLoading] = useState(false)
    const [firstname, setFirstname] = useState('')
    const [photo, setPhoto] = useState('')
    const [lastname, setLastname] = useState('')
    const [email, setEmail] = useState('')
    const [selectedPhoto, setSelectedPhoto] = useState(null)

    useEffect(() => {
        const fetchdata = async () => {
            try {
                const { data } = await ClientProfileApi()
                console.log(data.data)
                setReponse(data)
                setFirstname(data.data.firstname)
                setLastname(data.data.lastname)
                setEmail(data.data.email)
            } catch (error) {
                console.log(error)
            }
        }

        fetchdata()
    }, []);

    async function handleUpdate() {
        try {
            const updatedata = {
                firstname: firstname,
                lastname: lastname,
                email: email,
                photo: photo
            }
            setLoading(true)
            const { data } = await ClientUpdateProfileApi(updatedata)
            setLoading(false)
            console.log("update user data", data)
            if (data.success == true) {
                toast.success("User updated Successfully")
                window.location.reload()
            }
        } catch (error) {
            console.log(error)
            toast.error(error.response.data.data)
        }

    }

    async function ImageModal() {
        setDisplayModal(!displayModal)
    }

    function capturePhoto(e) {
        const file = e.target.files[0];
        setSelectedPhoto(file)
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = function () {
            setPhoto(reader.result);
            // console.log(reader.result);
        };
    }

    if (response.data == null) {
        return (<div className='h-screen w-full flex justify-center align-middle items-center'>
            <img src="/images/icons/loadmain.svg" alt="" />
        </div>)
    } else {
        return (
            <>
                <div className="relative">
                    <Navbar />
                    <section className='hidden md:block md:mr-48 md:ml-48 mt-5 ml-4 mr-4'>
                        <Toaster />
                        <div className="profie flex flex-col md:flex-row justify-center align-middle items-center space-x-2">
                            <div className=" w-full right bg-neutral-200 pl-2 pr-2 py-2 rounded-lg">
                                <p className='text-sm'>Profile card</p>
                                <div className='flex justify-start align-middle items-center space-x-3 '>

                                    <div className="left w-2/6 md:w-auto">

                                        <button onClick={ImageModal} className="profile">
                                            <img className='h-20 w-20 object-cover rounded-full' src={response.data.photo} alt="" />
                                        </button>
                                    </div>

                                    <div className="right">
                                        <div className="flex-col md:flex-row flex md:space-x-20  md:justify-center md:items-center w-52">
                                            <div>
                                                <label for="first_name" class="block mb-2 text-xs font-medium text-gray-900 dark:text-white">First name</label>
                                                <input type="text" id="first_name" class="bg-neutral-200 border-none text-gray-900 text-sm rounded-lg block w-52 md:w-full p-1 "
                                                    placeholder={`${response.data.firstname}`} disabled />
                                            </div>
                                            <div>
                                                <label for="last_name" class="block mb-2 text-xs font-medium text-gray-900 dark:text-white">Last name</label>
                                                <input type="text" id="last_name" class="bg-neutral-200 border-none text-gray-900 text-sm rounded-lg block w-52 md:w-full p-1 "
                                                    placeholder={`${response.data.lastname}`} disabled />
                                            </div>
                                        </div>

                                        <div className="ml-1 email">
                                            <label for="first_name" class="block mb-2 text-xs font-medium text-gray-900 dark:text-white">Email</label>
                                            <input type="text" id="first_name" class="bg-neutral-200 border-none text-gray-900 text-sm rounded-lg block w-full p-1 " placeholder={`${response.data.email}`}
                                                disabled />
                                        </div>
                                    </div>

                                </div>
                            </div>

                            <div className="w-full left mt-3 space-y-5">
                                <div className='flex flex-col bg-neutral-200 pl-2 pr-2 rounded-lg'>
                                    <label className='text-xs mt-1' htmlFor="first name">first name</label>
                                    <div className="relative flex align-middle">
                                        <input
                                            type="text"
                                            className='w-full border bg-neutral-200 border-neutral-200 focus:border-neutral-200 focus:ring-neutral-200  outline-0 text-sm font-medium text-black'
                                            onChange={(e) => setFirstname(e.target.value)}
                                            placeholder='John'
                                        />
                                        <button onClick={handleUpdate} className='h-6 absoulte right-0'>
                                            <img className='h-6 absoulte right-0' src="/images/icons/edit.svg" alt="" />
                                        </button>
                                    </div>
                                </div>
                                <div className='flex flex-col bg-neutral-200 pl-2 pr-2 rounded-lg'>
                                    <label className='text-xs mt-1' htmlFor="last name">last name</label>
                                    <div className="relative flex align-middle">
                                        <input
                                            type="text"
                                            className='w-full border bg-neutral-200 border-neutral-200 focus:border-neutral-200 focus:ring-neutral-200  outline-0 text-sm font-medium text-black'
                                            onChange={(e) => setLastname(e.target.value)}
                                            placeholder='doe'
                                        />
                                        <button onClick={handleUpdate} className='h-6 absoulte right-0'>
                                            <img className='h-6 absoulte right-0' src="/images/icons/edit.svg" alt="" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="email mt-3">
                            <div className='flex flex-col bg-neutral-200 pl-2 pr-2 rounded-lg'>
                                <label className='text-xs mt-1' htmlFor="first name">email</label>
                                <div className="relative flex w-full">
                                    <input
                                        type="text"
                                        className='w-full border bg-neutral-200 border-neutral-200 focus:border-neutral-200 focus:ring-neutral-200 outline-0 text-sm font-medium text-black'
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder='John@gmail.com'
                                    />
                                    <button onClick={handleUpdate} className='h-6 absoulte right-0'>
                                        <img className='h-6 absoulte right-0' src="/images/icons/edit.svg" alt="" />
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* <div className="savedCards mt-10 ">
                            <div className="text-2xl">Saved Cards</div>
                            <div className="flex md:flex-row space-y-5 flex-col items-center justify-center align-middle md:space-x-2">
                                <div className='mt-5'>
                                    <DebitCard />
                                </div>
                                <div>
                                    <DebitCard />
                                </div>
                                <div>
                                    <DebitCard />
                                </div>
                            </div>

                        </div> */}
                    </section>

                    {
                        displayModal
                            ?
                            <div className="fixed inset-0 flex justify-center z-50 overflow-auto bg-[#FFFFFF] bg-opacity-20 backdrop-blur-sm">
                                <div className="relative rounded-lg ">
                                    <section className='md:mt-12 flex bg-white drop-shadow-2xl rounded-lg'>
                                        <div className='w-96 md:w-[1000px]'>
                                            <div className="modal bg-white px-3 py-4">
                                                <div className='space-y-4 max-h-auto  overflow-y-auto'>
                                                    <div className="flex items-center justify-center w-full">
                                                        <label for="dropzone-file" className="flex flex-col items-center justify-center w-full h-20 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                                                            <div className="flex flex-col items-center justify-center ">
                                                                <img src="/images/icons/upload-image.svg" alt="" />
                                                                <p className="text-xs text-gray-500 dark:text-gray-400">{selectedPhoto ? `Selected File: ${selectedPhoto.name}` : 'Upload Profile Photo'}</p>
                                                            </div>
                                                            <input onChange={capturePhoto}
                                                                id="dropzone-file" type="file" className="hidden" />
                                                        </label>
                                                    </div>

                                                    <div>
                                                        <button className="w-full py-2 bg-[#C0A04C] hover:bg-[#A48533] rounded-md text-sm font-bold text-gray-50 transition duration-200" onClick={handleUpdate} >Update profile</button>
                                                    </div>

                                                </div>
                                            </div>
                                        </div>
                                    </section>
                                    <button
                                        onClick={ImageModal}
                                        className="absolute top-3 -right-5 m-2 text-gray-600 hover:text-gray-800 focus:outline-none"
                                    >
                                        <img src="/images/icons/cancel-icon.png" alt="" />
                                    </button>
                                </div>
                            </div>

                            :
                            <></>
                    }

                    <section className='block mt-1 md:hidden '>
                        <div className="header flex items-center align-middle">
                            <div className="profile">
                                <img src="/images/assets/profile.png" alt="" />
                            </div>

                            <div className="name flex flex-col">
                                <span className='font-bold text-xl'>
                                    John Doe
                                </span>
                                <span className='font-light text-sm'>
                                    johndoe@email.com
                                </span>
                            </div>

                            <div className="ml-8 flex flex-col">
                                <label class="relative inline-flex items-center cursor-pointer">
                                    <input type="checkbox" value="" class="sr-only peer" />
                                    <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                                </label>
                                <span>light</span>
                            </div>
                        </div>

                        <div className="ml-8">
                            <ul className='space-y-4'>
                                <Link to='/favorites'>
                                    <li className='flex align-middle  '>
                                        <img src="/images/icons/heart.svg" alt="" />
                                        <span>Favorites</span>
                                    </li>
                                </Link>

                                <hr />

                                <Link to='/contactus' className='mt-2'>
                                    <li className='flex align-middle  mt-2'>
                                        <img src="/images/icons/star.svg" alt="" />
                                        <span>Rate us</span>
                                    </li>
                                </Link>
                                <hr />

                                <Link to='/aboutus'>
                                    <li className='flex align-middle mt-2 '>
                                        <img src="/images/icons/policy.svg" alt="" />
                                        <span>Privacy Policy</span>
                                    </li>
                                </Link>
                                <hr />

                                <Link to='/contactus'>
                                    <li className='flex align-middle mt-2 '>
                                        <img src="/images/icons/share.svg" alt="" />
                                        <span>Invite a Friend</span>
                                    </li>
                                </Link>
                                <hr />

                                <Link to='/aboutus'>
                                    <li className='flex align-middle mt-2 '>
                                        <img src="/images/icons/aboutus.svg" alt="" />
                                        <span>About Us</span>
                                    </li>
                                </Link>
                                <hr />
                            </ul>
                        </div>
                    </section>

                    <div className="">
                        <Footer />
                    </div>
                </div >

                <div>
                    <BottomNav />
                </div>
            </>
        )
    }

}

export default Profile


{/* <div className="mb-4 mt-5">
                    <span className='font-bold text-2xl md:ml-44 '> Profile </span>
                </div>

                <div className="flex flex-col md:flex-row w-screen space-x-16 justify-center ">

                    <div className="ml-7 mb-5 mr-7 bg-neutral-200 flex-col md:flex-row flex space-x-5 items-center p-3 rounded-lg">
                        <div className="profile">
                            <img className='h-20' src="/images/assets/profile.png" alt="" />
                        </div>

                        <div className="info">
                            <div className="flex-col md:flex-row flex md:space-x-2 justify-start items-start">
                                <div>
                                    <label for="first_name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">First name</label>
                                    <input type="text" id="first_name" class="bg-neutral-200 border-none text-gray-900 text-sm rounded-lg block w-72 md:w-48 p-2.5 " placeholder="John" disabled />
                                </div>
                                <div>
                                    <label for="last_name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Last name</label>
                                    <input type="text" id="last_name" class="bg-neutral-200 border-none text-gray-900 text-sm rounded-lg block w-72 md:w-48 p-2.5 " placeholder="Doe" disabled />
                                </div>
                            </div>
                            <div className="email">
                                <label for="first_name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
                                <input type="text" id="first_name" class="bg-neutral-200 border-none text-gray-900 text-sm rounded-lg block w-full p-2.5 " placeholder="John" disabled />
                            </div>
                        </div>
                    </div>

                    <div className="righ flex flex-col space-y-3">
                        <div>
                            <label for="first_name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">First name</label>
                            <input type="text" id="first_name" class="bg-neutral-200 border-none text-gray-900 text-sm rounded-lg block w-72 md:w-96 p-2.5 " placeholder="John" required />
                        </div>
                        <div>
                            <label for="last_name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Last name</label>
                            <input type="text" id="last_name" class="bg-neutral-200 border-none text-gray-900 text-sm rounded-lg block  w-72 md:w-96 p-2.5 " placeholder="Doe" required />
                        </div>
                    </div>

                </div>

                <div className="mr-60 md:ml-60 flex flex-col justify-center items-center">

                    <div className='ml-4 w-screen mt-3 md:mt-5 '>
                        <label for="first_name" class="ml-44 md:ml-44 mr-30  block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
                        <input type="text" id="first_name" class="ml-44 md:ml-44 mr-30  bg-neutral-200 border-none text-gray-900 text-sm rounded-lg block w-72 md:w-9/12 p-2.5 " placeholder="John" />
                    </div>

                </div> */}