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
                                <p className='text-sm font-medium mb-3'>
                                    If you are a Business Owner or Venue or Event Manager, please contact us for details to feature your business, event or offer
                                </p>
                            </div>


                            <div className=" mx-auto  ">
                                <div className="flex flex-col md:flex-row md:space-x-5">
                                    <div className="md:w-1/2">
                                        <div className='flex flex-col bg-white pl-2 pr-2 rounded-md'>
                                            <label className='text-xs mt-1' htmlFor="first name">First name</label>
                                            <input
                                                type="text"
                                                className='border bg-transparent border-white focus:border-white focus:ring-white  outline-0 text-sm font-medium text-black'
                                                placeholder='John'

                                            />
                                        </div>
                                    </div>
                                    <div className="md:w-1/2">
                                        <div className='flex flex-col bg-white pl-2 pr-2 rounded-md'>
                                            <label className='text-xs mt-1' htmlFor="first name">last name</label>
                                            <input
                                                type="text"
                                                className='border bg-transparent border-white focus:border-white focus:ring-white  outline-0 text-sm font-medium text-black'
                                                placeholder='John'

                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="row2 mt-4">
                                    <div className='flex flex-col bg-white pl-2 pr-2 rounded-md'>
                                        <label className='text-xs mt-1' htmlFor="first name">email</label>
                                        <input
                                            type="text"
                                            className='border bg-transparent border-white focus:border-white focus:ring-white  outline-0 text-sm font-medium text-black'
                                            placeholder='John@gmail.com'

                                        />
                                    </div>
                                </div>
                                <div className="row3 mt-4 ">

                                    <div className='flex flex-col bg-white pl-2 pr-2 rounded-md'>
                                        <label className='text-xs mt-1' htmlFor="first name">message</label>
                                        <textarea
                                            type="text"
                                            className='border h-24 bg-transparent border-white focus:border-white focus:ring-white  outline-0 text-sm font-medium text-black'
                                            placeholder='write your message here...'

                                        />
                                    </div>

                                </div>
                                <div className="flex justify-center mt-5">
                                    <button type="button" class="text-white bg-[#C0A04C] hover:bg-white hover:text-[#C0A04C] focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center mr-3 md:mr-0 dark:bg-[#C0A04C] dark:hover:bg-white dark:focus:ring-blue-800">Send Message</button>
                                </div>
                                <div className="flex flex-col justify-center items-center mt-5 space-y-2">
                                    <span className='text-sm font-bold'>
                                        IMPORTANT!
                                    </span>
                                    <p className='text-sm font-normal'>
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

                <div className="relative ml-4 mt-4 ">
                    <span className='font-bold text-lg md:ml-4'>our socials</span>
                    <img className='ml-24 h-8' src="/images/assets/arrow.png" alt="" />
                    <div className="ml-36 flex space-x-3 socialmedia">
                        <img className='h-7' src="/images/icons/wp-a.svg" alt="" />
                        <img className='h-7' src="/images/icons/fb-a.svg" alt="" />
                        <img className='h-7' src="/images/icons/ig-a.svg" alt="" />
                        <img className='h-7' src="/images/icons/emal-a.svg" alt="" />
                    </div>

                    <div className='hidden md:flex justify-end flex-col absolute -right-28 bottom-0'>
                        <div className='flex justify-between mb-2'>
                            {/* <button className='rounded-full p-2 hover:bg-[#A48533] bg-[#C0A04C]'>
                            <img className='h-6 ' src="/images/icons/uparrow.svg" alt="" />
                        </button> */}
                            <img className='h-10 ml-24' src="/images/icons/whatsapp-color.svg" alt="" />
                            <button>
                            </button>
                        </div>
                        <button className='rounded-full hover:bg-[#A48533] bg-[#C0A04C] py-3 pr-6 pl-6 text-white font-semibold'>Need Help?</button>
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