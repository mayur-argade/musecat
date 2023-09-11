import React, { useState, useEffect } from 'react'
import { vendorProfileApi, VendorUpdateProfileApi } from '../../http'
import Navbar from '../../components/shared/Navbar/Navbar'
import DebitCard from '../../components/Debit-Card/DebitCard'
import Footer from '../../components/shared/Footer/Footer'
import { Link } from 'react-router-dom'

const Profile = () => {

    document.title = 'Vendor ~ Profile'

    const [response, setReponse] = useState({});

    const [firstname, setFirstname] = useState('')
    const [lastname, setLastname] = useState('')
    const [email, setEmail] = useState('')

    useEffect(() => {
        const fetchdata = async () => {
            try {
                const { data } = await vendorProfileApi()
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
        const updatedata = {
            firstname: firstname,
            lastname: lastname,
            email: email,
        }

        const { data } = await VendorUpdateProfileApi(updatedata)

        console.log(data)

    }

    if (response.data == null) {
        <>loading..</>
    }
    else {
        return (
            <>
                <Navbar />
                <section className='hidden md:block md:mr-48 md:ml-48 mt-5 ml-4 mr-4'>

                    <div className="profie flex flex-col md:flex-row justify-center align-middle items-center space-x-2">
                        <div className=" w-full right bg-neutral-200 pl-2 pr-2 py-2 rounded-lg">
                            <p className='text-sm'>Profile card</p>
                            <div className='flex justify-start align-middle items-center space-x-3 '>

                                <div className="left w-2/6 md:w-auto">
                                    <div className="profile">
                                        <img className='h-20' src="/images/assets/profile.png" alt="" />
                                    </div>
                                </div>

                                <div className="right">
                                    <div className="flex-col md:flex-row flex md:space-x-20  md:justify-center md:items-center w-52">
                                        <div>
                                            <label for="first_name" class="block text-xs font-medium text-gray-900 dark:text-white">First name</label>
                                            <input type="text" id="first_name" class="bg-neutral-200 border-none text-gray-900 text-sm rounded-lg block w-52 md:w-full p-1 " placeholder={`${response.data.firstname}`} disabled />
                                        </div>
                                        <div>
                                            <label for="last_name" class="block text-xs font-medium text-gray-900 dark:text-white">Last name</label>
                                            <input type="text" id="last_name" class="bg-neutral-200 border-none text-gray-900 text-sm rounded-lg block w-52 md:w-full p-1 " placeholder={`${response.data.lastname}`} disabled />
                                        </div>
                                    </div>

                                    <div className="mt-2 email">
                                        <label for="first_name" class="w-full block text-xs font-medium text-gray-900 dark:text-white">Email</label>
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
                                        placeholder='John'
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
                                    placeholder='John'
                                />
                                <button onClick={handleUpdate} className='h-6 absoulte right-0'>
                                    <img className='h-6 absoulte right-0' src="/images/icons/edit.svg" alt="" />
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="savedCards mt-10 ">
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

                    </div>
                </section>

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
            </>
        )
    }
}

export default Profile