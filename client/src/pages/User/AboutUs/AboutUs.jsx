import React, { useState, useEffect } from 'react'
import Navbar from '../../../components/shared/Navbar/Navbar'
import Footer from '../../../components/shared/Footer/Footer'
import { Link } from 'react-router-dom'
import './aboutus.css'
import InstagramPost from '../../../components/Cards/InstagramPost'
import BlurFade from '../../../components/MagicUI/BlurFade'

const AboutUs = () => {
    document.title = 'About Us'
    useEffect(() => {
        let lastScrollTop = 0;
        const maxScrollStep = window.innerHeight * 0.10; // Adjust as needed
        let isFirstScroll = true;

        const handleScroll = () => {
            const textSection = document.querySelector('.text-section');
            const imageSection = document.querySelector('.image-section');
            const triggerPoint = window.innerHeight * 0.10; // Adjust as needed

            if (window.scrollY > triggerPoint) {
                textSection.classList.add('moved');
                textSection.classList.remove('space-y-10');
                textSection.classList.add('space-y-10');
            } else {
                textSection.classList.remove('moved');
                textSection.classList.add('space-y-10');
                textSection.classList.remove('space-y-10');
            }

            // Handle image section visibility
            if (window.scrollY > triggerPoint) {
                imageSection.classList.add('visible');
            } else {
                imageSection.classList.remove('visible');
            }


        };

        // Attach the scroll event listener to the window
        window.addEventListener('scroll', handleScroll);

        // Call handleScroll() on page load
        handleScroll();

        // Cleanup the event listener on component unmount
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <div className="dark:bg-[#2c2c2c] dark:text-white">
            <Navbar />

            <section>
                <header class="bg-[#FFF8E4] h-screen m-9 rounded-2xl flex align-middle items-center mx-aut">
                    <section class="space-y-10 text-section">
                        <h1 class="font-inter text-5xl font-bold leading-tight text-center pt-14">
                            Revolutionizing Your Muscat Experience <br /> with Muscat Where To
                        </h1>
                        <p class="my-5 flex justify-center text-center w-9/12 mx-auto text-[#5E5D6D] leading-7">
                            Muscat Where To is a platform to discover the latest offers and events in Muscat. Browse through offers, find more info and directions. Find Muscat’s offers and events by type and filters like Eat & Drink, Kids Corner, Health and Beauty, Getaway Deals, Gym Memberships, Activities & Adventure and much more.
                        </p>
                        <div class="flex justify-center items-center space-x-2">
                            <button class="glow-button bg-[#C0A04C] text-white w-44 h-11 px-4 py-2 rounded-lg hover:shadow-lg">
                                Sign in
                            </button>
                            <button class="bg-[#FFF4D6] text-[#C0A04C] w-44 h-11 px-4 py-2 gap-1.5 rounded-lg">
                                Contact us
                            </button>
                        </div>
                    </section>
                    <section class="video-section image-section flex justify-center">
                        <img class="border border-8 border-white mt-10 mx-auto w-9/12 aspect-video rounded-2xl" src="https://images.unsplash.com/photo-1621680696874-edd80ce57b72?q=80&w=1591&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" />
                    </section>
                </header>
            </section>
            {/* <section className='contactmargine flex flex-col'>
                <div className='h-40 md:h-64 justify-center items-center relative'>

                    <div className="relative ">
                        <img className="h-72 md:h-80 xl:h-full object-fit" src="/images/assets/about2.jpg" alt="" />

                        <div className="md:mr-52 md:ml-52 absolute top-16 left-0 p-8 space-y-4 text-white">
                            <p className="text-2xl font-bold md:text-3xl md:font-extrabold">About us</p>
                            <p className="text-3xl font-extrabold md:text-5xl md:font-bold">Muscat Where <br /> To ?</p>
                        </div>
                    </div>

                </div>

                <section className='md:mr-52 md:ml-52 ml-3 mr-3 mt-40 2xl:mt-72 mb-10 flex flex-col justify-center '>
                    <span className='ml-0 font-bold text-2xl text-center mb-2'>Muscat's Premier Event Hub: Discover, Book, Celebrate!</span>
                    <p className='text-center font-medium text-lg leading-8'>
                        Muscat Where To is a platform to discover the latest offers and events in Muscat.Browse through offers, find more info and directions. Find Muscat’s offers and events by type and filters like Eat & Drink, Kids Corner, Health and Beauty, Getaway Deals, Gym Memberships, Activities & Adventure and much more.
                    </p>
                </section>


                <hr className='h-px my-8 bg-blue-500 border-0 dark:bg-gray-700' />

                <div className="space-y-10 mr-5 md:mr-52 md:ml-52 ">

                    <div className='w-full flex items-center justify-center'>
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                            <div className="ml-3 1 mt-5">
                                <div className="font-bold text-left text-3xl">Find Your Next Event</div>

                                <div className="mt-2 font-medium text-md leading-loose">
                                    <p className=''>Choose a venue according to cuisine type, day of the week, or other filters. Check offers including Friday Brunch, Happy Hour, Ladies Night, Live Music, Pool & beach passes and more. Save your favorite offer or event into your favorite list and rate the places you visited.</p>
                                </div>
                            </div>
                            <div className="2">
                                <img className='ml-3 h-52 md:h-64 w-96' src="images/assets/about3.png" alt="" />
                            </div>
                        </div>
                    </div>


                    <div className='w-full flex items-center justify-center'>
                        <div className="grid grid-cols-1 lg:grid-cols-2 flex-row-reverse gap-4">
                            <div className="2">
                                <img className='ml-3 h-52 md:h-64 w-96' src="/images/assets/aboutus2.png" alt="" />
                            </div>

                            <div className="ml-3 1 mt-6 ml-2">
                                <div className="font-bold text-left text-3xl">Reach out to us</div>

                                <div className="mt-2 font-medium text-md leading-loose">
                                    <p>If you wish to have your offer displayed on Muscat <br></br> Where To platform, kindly <Link to='/contactus'><span className='ml-0 text-[#C0A04C]'>contact us</span></Link> at info@muscatwhereto.com. (if you don’t hear from us, check your spam folder)</p>                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section> */}

            <InstagramPost />


            {/* <div className=''>
                < Footer />
            </div> */}

        </div>
    )
}

export default AboutUs

{/* <section className="h-screen flex justify-center items-center relative">
  <div className="absolute inset-0 flex justify-center items-center z-10">
    <img className="h-96" src="/images/assets/about.png" alt="" />
  </div>
  <div className="relative z-20 text-center">
    <span className="text-2xl font-extrabold block mb-2">About us</span>
    <p className="text-5xl font-bold relative" style={{ marginLeft: '-20px' }}>
      <span className="bg-white p-2">Muscat Where</span> To ?
    </p>
  </div>
</section> */}
