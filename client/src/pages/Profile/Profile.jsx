import React from 'react'
import Navbar from '../../components/shared/Navbar/Navbar'
import DebitCard from '../../components/Debit-Card/DebitCard'
import Footer from '../../components/shared/Footer/Footer'
const Profile = () => {
    return (
        <>
            <Navbar />
            <section>
                <div className="mb-4 mt-5">
                    <span className='font-bold text-2xl ml-44 '> Profile </span>
                </div>

                <div className="flex flex-col md:flex-row w-screen space-x-16 justify-center ">

                    <div className="left bg-slate-100 flex space-x-5 items-center p-3 rounded-lg">
                        <div className="profile">
                            <img className='h-20' src="/images/icons/profile.png" alt="" />
                        </div>

                        <div className="info">
                            <div className="flex space-x-2">
                                <div>
                                    <label for="first_name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">First name</label>
                                    <input type="text" id="first_name" class="bg-slate-100 border-none text-gray-900 text-sm rounded-lg block w-48 p-2.5 " placeholder="John" disabled />
                                </div>
                                <div>
                                    <label for="last_name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Last name</label>
                                    <input type="text" id="last_name" class="bg-slate-100 border-none text-gray-900 text-sm rounded-lg block w-48 p-2.5 " placeholder="Doe" disabled />
                                </div>
                            </div>
                            <div className="email">
                                <label for="first_name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
                                <input type="text" id="first_name" class="bg-slate-100 border-none text-gray-900 text-sm rounded-lg block w-full p-2.5 " placeholder="John" disabled />
                            </div>
                        </div>
                    </div>

                    <div className="righ flex flex-col">
                        <div>
                            <label for="first_name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">First name</label>
                            <input type="text" id="first_name" class="bg-gray-50 border-none text-gray-900 text-sm rounded-lg block w-96 p-2.5 " placeholder="John" required />
                        </div>
                        <div>
                            <label for="last_name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Last name</label>
                            <input type="text" id="last_name" class="bg-gray-50 border-none text-gray-900 text-sm rounded-lg block w-96 p-2.5 " placeholder="Doe" required />
                        </div>
                    </div>

                </div>

                <div className="mr-60 md:ml-60 flex flex-col justify-center items-center">

                    <div className='w-screen mt-5 '>
                        <label for="first_name" class=" ml-44 mr-30  block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
                        <input type="text" id="first_name" class=" ml-44 mr-30  bg-slate-100 border-none text-gray-900 text-sm rounded-lg block w-3/4 p-2.5 " placeholder="John" />
                    </div>
                </div>

                <div className="savedCards mt-10 ">
                    <div className="text-2xl ml-44">Saved Cards</div>
                    <div className="flex justify-center space-x-8">
                        <DebitCard />
                        <DebitCard />
                    </div>
                </div>
            </section>

            <div className="md:mr-28 md:ml-28 md:mt-8">
                <Footer />
            </div>
        </>
    )
}

export default Profile