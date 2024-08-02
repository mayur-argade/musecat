import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import toast, { Toaster } from 'react-hot-toast';
import { addToNewsLetter } from '../../../http';

const Footer = () => {

    const navigate = useNavigate()
    const [email, setEmail] = useState('');


    async function submit(event) {
        event.preventDefault();
        try {
            const promise = addToNewsLetter({ email: email });
            await toast.promise(promise, {
                loading: 'Adding to newsletter ...',
                success: 'Subscribed to newsletter',
                error: (error) => `${error.response.data.data}`,
            });
        } catch (error) {
            console.log(error)
        }
    }
    const isStandalone = window.matchMedia('(display-mode: standalone)').matches;
    return (
        <>
            {
                isStandalone || window.isNative == true
                    ?
                    <div className='h-10 dark:bg-[#2c2c2c] dark:text-white'>

                    </div>
                    :
                    <div className='NoFooter pt-5'>
                        <Toaster />
                        <div className='standalone:hidden bg-[#F3F3F3] dark:bg-[#2c2c2c] dark:border-r-0 dark:border-l-0 dark:border-b-0 border border-2 border-t-indigo-500 dark:border-t-white border-b-0'>
                            <footer class="md:pr-44 md:pl-44 pt-5 pl-6 pr-6">
                                <div class=" bg-[#F3F3F3] dark:bg-[#2c2c2c] max-w-screen  py-6 sm:px-6 lg:px-8">
                                    <div className='flex flex-col mb-8 items-center md:items-start space-y-2'>
                                        <p className='text-2xl md:text-3xl text-center md:text-left font-bold'>
                                            Subscribe to Newsletter
                                        </p>

                                        <p className='text-xs font-normal'>Get all updates directly to your inbox</p>


                                        <form className='w-full'>
                                            <label for="default-search" class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
                                            <div class="relative">
                                                <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                                    <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                                                    </svg>
                                                </div>
                                                <div className='md:w-1/2 relative '>
                                                    <input onChange={(e) => setEmail(e.target.value)} type="search" id="default-search" class="block w-full p-4 pl-10 text-sm text-gray-900 border-none rounded-lg bg-white focus:ring-[#C0A04C] focus:border-[#C0A04C] dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-[#C0A04C] dark:focus:border-[#C0A04C]" required />
                                                    <button onClick={submit} type="submit" class="absolute text-white absolute right-2.5 bottom-2.5 bg-[#C0A04C] hover:bg-[#A48533] focus:ring-4 focus:outline-none focus:ring-[#A48533] font-medium rounded-lg text-sm px-4 py-2 dark:bg-[#A48533] dark:hover:bg-[#A48533] dark:focus:ring-[#A48533]">Submit</button>
                                                </div>
                                            </div>
                                        </form>

                                    </div>

                                    <div class="grid grid-cols-1 gap-8 lg:grid-cols-3">
                                        <div className='flex flex-col items-center md:items-start mt-5'>
                                            <p className='text-3xl font-bold'>Muscat Where To</p>
                                            <p class="max-w-xs mt-2 text-sm text-gray-600 dark:text-gray-400">
                                                Follow us on social media
                                            </p>
                                            <div  class="flex mt-3 space-x-3 text-gray-600">
                                                <a  href="https://wa.me/+96891738405" class="hover:opacity-75 cursor-pointer" target="_blank" rel="noreferrer">
                                                    <span class="sr-only"> whatsapp </span>
                                                    <img className='h-8 dark:hidden' src="/images/icons/whatsapp.svg" alt="" />
                                                    <img className='h-8 hidden dark:flex' src="/images/icons/whatsapp-light.svg" alt="" />
                                                </a>
                                                <a class="hover:opacity-75 cursor-pointer" target="_blank" href="https://www.facebook.com/muscatwhereto" rel="noreferrer">
                                                    <span class="sr-only"> facebook </span>
                                                    <img className='h-8 dark:hidden' src="/images/icons/facebook.svg" alt="" />
                                                    <img className='h-8 hidden dark:flex' src="/images/icons/facebook-light.svg" alt="" />
                                                </a>
                                                <a class="hover:opacity-75 cursor-pointer" href="https://www.instagram.com/muscat_whereto/" target="_blank" rel="noreferrer">
                                                    <span class="sr-only"> Instagram </span>
                                                    <img className='h-8 dark:hidden' src="/images/icons/instagram.svg" alt="" />
                                                    <img className='h-8 hidden dark:flex' src="/images/icons/instagram-light.svg" alt="" />
                                                </a>
                                                <a class="hover:opacity-75 cursor-pointer" href="mailto:info@muscatwhereto.com" target="_blank" rel="noreferrer">
                                                    <span class="sr-only"> Email </span>
                                                    <div className='flex justify-center align-middle items-center h-8 w-8 rounded-full border border-2 dark:border-white border-black'>
                                                        <img className='h-4 hidden dark:flex' src="/images/icons/threads-icon-light.svg" alt="" />
                                                        <img className='h-4 flex dark:hidden ' src="/images/icons/threads-icon.svg" alt="" />
                                                    </div>

                                                </a>
                                            </div>
                                        </div>

                                        <div class="grid grid-cols-1 gap-8 lg:col-span-2 sm:grid-cols-2 lg:grid-cols-3 justify-items-center">
                                            <div class="flex justify-center lg:justify-start">
                                                <div class="text-center lg:text-left">
                                                    <p class="font-semibold">
                                                        Popular Navigation
                                                    </p>
                                                    <nav class="hidden md:flex flex-col mt-4 space-y-5 text-sm">
                                                        <a onClick={() => navigate("/category/events")} class="hover:opacity-75 font-medium cursor-pointer" href> Events </a>
                                                        <a onClick={() => navigate("/category/weeklyoffers")} class="hover:opacity-75 font-medium cursor-pointer" href> Weekly Offers </a>
                                                        <a onClick={() => navigate("/category/kidscorner")} class="hover:opacity-75 font-medium cursor-pointer" href> Kids corner </a>
                                                    </nav>
                                                </div>
                                            </div>

                                            <div class="flex justify-center lg:justify-start">
                                                <div class="text-center lg:text-left">
                                                    <p class="font-semibold">
                                                        Information
                                                    </p>
                                                    <nav class="hidden md:flex flex-col mt-4 space-y-5 text-sm">
                                                        <a onClick={() => navigate("/aboutus")} class="hover:opacity-75 font-medium cursor-pointer" href> About </a>
                                                        <a onClick={() => navigate("/contactus")} class="hover:opacity-75 font-medium cursor-pointer" href> Contact Us </a>
                                                        <a onClick={() => navigate("/faq")} class="hover:opacity-75 font-medium cursor-pointer" href> FAQ </a>
                                                    </nav>
                                                </div>
                                            </div>

                                            <div class="flex justify-center lg:justify-start">
                                                <div class="text-center lg:text-left">
                                                    <p class="font-semibold">
                                                        The Legal Corner
                                                    </p>
                                                    <nav class="hidden md:flex flex-col mt-4 space-y-5 text-sm">
                                                        <a onClick={() => navigate("/user/privacypolicy")} class="hover:opacity-75 font-medium cursor-pointer" href> Privacy policy </a>
                                                        <a onClick={() => navigate("/user/termsandconditions")} class="hover:opacity-75 font-medium cursor-pointer" href> Terms and conditions </a>
                                                        <a onClick={() => navigate("/user/cookies")} class="hover:opacity-75 font-medium cursor-pointer" href> Cookies </a>
                                                    </nav>
                                                </div>
                                            </div>
                                        </div>


                                    </div>
                                    <p class="mt-12 text-sm font-bold text-center">
                                        © 2023 Muscat Where To. All rights reserved
                                    </p>
                                </div>
                            </footer>
                        </div>
                    </div>
            }
        </>
    )
}

export default Footer