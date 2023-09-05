import React from 'react'
import Navbar from '../../components/shared/Navbar/Navbar'
import DebitCard from '../../components/Debit-Card/DebitCard'
import Footer from '../../components/shared/Footer/Footer'
import { Link } from 'react-router-dom'
const Profile = () => {

    document.title = 'Profile'

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
                                        <label for="first_name" class="block mb-2 text-xs font-medium text-gray-900 dark:text-white">First name</label>
                                        <input type="text" id="first_name" class="bg-neutral-200 border-none text-gray-900 text-sm rounded-lg block w-52 md:w-full p-1 " placeholder="John" disabled />
                                    </div>
                                    <div>
                                        <label for="last_name" class="block mb-2 text-xs font-medium text-gray-900 dark:text-white">Last name</label>
                                        <input type="text" id="last_name" class="bg-neutral-200 border-none text-gray-900 text-sm rounded-lg block w-52 md:w-full p-1 " placeholder="Doe" disabled />
                                    </div>
                                </div>

                                <div className="ml-1 email">
                                    <label for="first_name" class="block mb-2 text-xs font-medium text-gray-900 dark:text-white">Email</label>
                                    <input type="text" id="first_name" class="bg-neutral-200 border-none text-gray-900 text-sm rounded-lg block w-full p-1 " placeholder="John" disabled />
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
                                    placeholder='John'
                                />
                                <img className='h-6 absoulte right-0' src="/images/icons/edit.svg" alt="" />
                            </div>
                        </div>
                        <div className='flex flex-col bg-neutral-200 pl-2 pr-2 rounded-lg'>
                            <label className='text-xs mt-1' htmlFor="last name">last name</label>
                            <div className="relative flex align-middle">
                                <input
                                    type="text"
                                    className='w-full border bg-neutral-200 border-neutral-200 focus:border-neutral-200 focus:ring-neutral-200  outline-0 text-sm font-medium text-black'
                                    placeholder='John'
                                />
                                <img className='h-6 absoulte right-0' src="/images/icons/edit.svg" alt="" />
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
                                placeholder='John'
                            />
                            <img className='h-6 absoulte right-0' src="/images/icons/edit.svg" alt="" />
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