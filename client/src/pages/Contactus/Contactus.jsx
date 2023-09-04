import React from 'react'
import Navbar from '../../components/shared/Navbar/Navbar'
import Footer from '../../components/shared/Footer/Footer'
const Contactus = () => {
    return (
        <>
            <Navbar />
            <section className='md:mr-48 md:ml-48 mt-3'>
                <div className="title ">
                    <span className='text-2xl font-bold'
                    >Contact US</span>
                </div>

                <div className="flex justify-center mt-5">

                    <div className="space-y-4  bg-[#D0D0D0] border border-b-4 border-b-[#C0A04C] p-5 rounded-lg ">

                        <div className="space-y-5 ">
                            <div className="flex flex-col text-center justify-center items-center space-y-2">
                                <span className='text-sm font-medium'>
                                    If you have any questions or comments, please, fill out the form.
                                </span >
                                <p className='text-sm font-semibold mb-3'>
                                    If you are a Business Owner or Venue or Event Manager, please contact us for details to feature your business, event or offer
                                </p>
                            </div>


                            <div className=" mx-auto  ">
                                <div className="flex flex-col md:flex-row md:space-x-5">
                                    <div className="md:w-1/2">
                                        <div>
                                            <label for="first_name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">First name</label>
                                            <input type="text" id="first_name" class="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="John" required />
                                        </div>
                                    </div>
                                    <div className="md:w-1/2">
                                        <div>
                                            <label for="first_name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Last name</label>
                                            <input type="text" id="first_name" class="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="John" required />
                                        </div>
                                    </div>
                                </div>
                                <div className="row2">
                                    <div>
                                        <label for="first_name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
                                        <input type="text" id="first_name" class="bg-white border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="John" required />
                                    </div>
                                </div>
                                <div className="row3">

                                    <label for="message" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Message</label>
                                    <textarea id="message" rows="4" class="block p-2.5 w-full text-sm text-gray-900 bg-white rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Write your thoughts here..."></textarea>

                                </div>
                                <div className="flex justify-center mt-5">
                                    <button type="button" class="text-white bg-[#C0A04C] hover:bg-white hover:text-[#C0A04C] focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center mr-3 md:mr-0 dark:bg-[#C0A04C] dark:hover:bg-white dark:focus:ring-blue-800">Send Message</button>
                                </div>
                                <div className="flex flex-col justify-center items-center mt-5">
                                    <span className='text-sm font-bold'>
                                        IMPORTANT!
                                    </span>
                                    <p className='text-sm'>
                                        If you have not heard from us, check your spam folder or contact us directly at
                                    </p>
                                    <span className='font-bold text-sm'>
                                        info@muscatwhereto.com
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <div className="">
                <Footer />
            </div>
        </>
    )
}

export default Contactus