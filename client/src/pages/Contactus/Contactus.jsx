import React, { useState, useEffect } from 'react'
import Navbar from '../../components/shared/Navbar/Navbar'
import Footer from '../../components/shared/Footer/Footer'
import { useNavigate } from 'react-router-dom'
import { ClientContactUs } from '../../http/index'
import toast, { Toaster } from 'react-hot-toast';
import validator from 'validator';

const Contactus = () => {
    document.title = 'Contact Us'

    const navigate = useNavigate();
    
    const [loading, setLoading] = useState(false)
    const [firstname, setFirstname] = useState('')
    const [lastname, setLastname] = useState('')
    const [email, setEmail] = useState('')
    const [message, setMessage] = useState('')


    async function submit() {
        if (!firstname || !lastname || !email || !message) {
            toast.error("All field are mandatory")
        } else if (!validator.isEmail(email)) {
            toast.error("Enter valid Email address")
        }
        else {
            setLoading(true)
            try {
                const contactdata = {
                    firstname: firstname,
                    lastname: lastname,
                    email: email,
                    message: message
                }
                const res = await ClientContactUs(contactdata)
                setLoading(false)
                toast.success("Message sent")
            } catch (error) {
                setLoading(false)
                // console.log(error.response.data.data)
                toast.error(error.response.data.data)
            }
        }

    }

    return (
        <div className='contactmargine dark:bg-[#2c2c2c] dark:text-white'>
            <Navbar />
            <section className='md:mr-48 md:ml-48 mt-3'>
                <Toaster />
                <div className="title ">
                    <span className='text-2xl font-bold'
                    >Contact US</span>
                </div>

                <div className="flex justify-center mt-5">

                    <div className="m-4 space-y-4 bg-[#D0D0D0] dark:bg-[#454545] dark:border-[#454545] dark:text-white border border-b-4 border-b-[#C0A04C] dark:border-b-[#C0A04C] p-5 rounded-lg ">

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
                                        <div className='flex flex-col bg-white dark:bg-[#2c2c2c] pl-2 pr-2 rounded-md'>
                                            <label className='text-xs mt-1' htmlFor="first name">First name</label>
                                            <input
                                                type="text"
                                                className='ring-0 dark:border-0 dark:text-white border bg-transparent border-white focus:border-white focus:ring-white  outline-0 text-sm font-medium text-black'
                                                onChange={(e) => setFirstname(e.target.value)}
                                                required
                                            />
                                        </div>
                                    </div>
                                    <div className="md:w-1/2 mt-5 md:mt-0">
                                        <div className='flex flex-col bg-white dark:bg-[#2c2c2c] pl-2 pr-2 rounded-md'>
                                            <label className='text-xs mt-1' htmlFor="first name">last name</label>
                                            <input
                                                type="text"
                                                className='ring-0 dark:border-0 dark:text-white border bg-transparent border-white focus:border-white focus:ring-white  outline-0 text-sm font-medium text-black'
                                                onChange={(e) => setLastname(e.target.value)}
                                                required
                                            />
                                        </div>
                                    </div>

                                </div>
                                <div className="row2 mt-4">
                                    <div className='flex flex-col bg-white dark:bg-[#2c2c2c] pl-2 pr-2 rounded-md'>
                                        <label className='text-xs mt-1' htmlFor="first name">email</label>
                                        <input
                                            type="email"
                                            className='ring-0 dark:border-0 dark:text-white border bg-transparent border-white focus:border-white focus:ring-white  outline-0 text-sm font-medium text-black'
                                            onChange={(e) => setEmail(e.target.value)}
                                            required
                                        />
                                    </div>
                                </div>
                                <div className="row3 mt-4 ">

                                    <div className='flex flex-col bg-white dark:bg-[#2c2c2c] pl-2 pr-2 rounded-md'>
                                        <label className='text-xs mt-1' htmlFor="first name">message</label>
                                        <textarea
                                            type="text"
                                            className='ring-0 dark:border-0 dark:text-white border h-24 bg-transparent border-white focus:border-white focus:ring-white  outline-0 text-sm font-medium text-black'
                                            onChange={(e) => setMessage(e.target.value)}
                                            required
                                        />
                                    </div>

                                </div>
                                <div className="flex justify-center mt-5">
                                    <button onClick={submit} type="button" class="text-white bg-[#C0A04C] hover:bg-[#A48533] hover:text-white font-medium rounded-lg text-sm px-4 w-40 py-2 text-center mr-3 md:mr-0 dark:bg-[#C0A04C] dark:hover:bg-[#A48533] dark:focus:ring-[#A48533]" >Send Message</button>
                                </div>
                                <div className="flex flex-col justify-center items-center mt-5 space-y-2">
                                    <span className='text-sm font-bold'>
                                        IMPORTANT!
                                    </span>
                                    <p className='text-sm font-normal'>
                                        If you have not heard from us, check your spam folder or contact us directly at
                                    </p>
                                    <a href="mailto:info@muscatwhereto.com" className='font-bold text-sm'>
                                        info@muscatwhereto.com
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="relative ml-4 mt-4 ">
                    <span className='font-bold text-lg md:ml-4'>our socials</span>
                    <img className='ml-24 h-8' src="/images/assets/arrow.png" alt="" />
                    <div className="ml-36 flex space-x-3 socialmedia">

                        <a href="https://wa.me/+96891738405" target="_blank" rel="noopener noreferrer">
                            <img className='h-7' src="/images/icons/wp-a.svg" alt="" />
                        </a>

                        <a href="https://www.facebook.com/muscatwhereto" target="_blank" rel="noopener noreferrer">
                            <img className='h-7' src="/images/icons/fb-a.svg" alt="" />
                        </a>


                        <a href="https://www.instagram.com/muscat_whereto/" target="_blank" rel="noopener noreferrer">
                            <img className='h-7' src="/images/icons/ig-a.svg" alt="" />
                        </a>

                        <a href="mailto:info@muscatwhereto.com">
                            <img className='h-7' src="/images/icons/emal-a.svg" alt="" />
                        </a>
                    </div>

                    <div className='hidden md:flex justify-end flex-col absolute -right-28 bottom-0'>
                        <div className='flex justify-between mb-2'>
                            {/* <button className='rounded-full p-2 hover:bg-[#A48533] bg-[#C0A04C]'>
                            <img className='h-6 ' src="/images/icons/uparrow.svg" alt="" />
                        </button> */}
                            {/* <img className='h-10 ml-24' src="/images/icons/whatsapp-color.svg" alt="" /> */}
                            <button>
                            </button>
                        </div>
                        <button onClick={() => navigate('/user/helpcenter')} className='rounded-full hover:bg-[#A48533] bg-[#C0A04C] py-3 pr-6 pl-6 text-white font-semibold'>Need Help?</button>
                    </div>
                </div>
            </section>


            <div className="">
                <Footer />
            </div>
        </div>
    )
}

export default Contactus