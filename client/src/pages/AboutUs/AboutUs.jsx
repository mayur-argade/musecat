import React from 'react'
import Navbar from '../../components/shared/Navbar/Navbar'
import Footer from '../../components/shared/Footer/Footer'
import { Link } from 'react-router-dom'
const AboutUs = () => {
    document.title = 'About Us'
    return (
        <>
            <Navbar />
            <section className='contactmargine flex flex-col'>
                <div className='h-40 md:h-64 justify-center items-center relative'>

                    <div className="relative ">
                        <img className="h-52 md:h-full " src="/images/assets/about2.jpg" alt="" />

                        <div className="md:mr-52 md:ml-52 absolute top-16 left-0 p-8 space-y-4 text-white">
                            <p className="text-2xl font-bold md:text-3xl md:font-extrabold">About us</p>
                            <p className="text-3xl font-extrabold md:text-5xl md:font-bold">Muscat Where <br /> To ?</p>
                        </div>
                    </div>

                </div>

                <section className='md:mr-52 md:ml-52 ml-3 mr-3 mt-40 mb-10 flex flex-col justify-center '>
                    <span className='ml-0 font-bold text-2xl text-center mb-2'>Muscat's Premier Event Hub: Discover, Book, Celebrate!</span>
                    <p className='text-center font-medium text-lg leading-8'>
                        Muscat Where To is a platform to discover the latest offers and events in Muscat.Browse through offers, find more info and directions. Find Muscat’s offers and events by type and filters like Eat & Drink, Kids Corner, Health and Beauty, Getaway Deals, Gym Memberships, Activities & Adventure and much more.
                    </p>
                </section>


                <hr className='h-px my-8 bg-blue-500 border-0 dark:bg-gray-700' />

                <div className="space-y-10 mr-5 md:mr-52 md:ml-52 ">

                    <div className='w-full flex items-center justify-center'>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="1 mt-5">
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
                        <div className="grid grid-cols-2 gap-4">
                            <div className="2">
                                <img className=' h-52 md:h-64 w-96' src="/images/assets/aboutus2.png" alt="" />
                            </div>

                            <div className="1 mt-6 ml-2">
                                <div className="font-bold text-left text-3xl">Reach out to us</div>

                                <div className="mt-2 font-medium text-md leading-loose">
                                    <p>If you wish to have your offer displayed on Muscat <br></br> Where To platform, kindly <Link to='/contactus'><span className='ml-0 text-[#C0A04C]'>contact us</span></Link> at info@muscatwhereto.com. (if you don’t hear from us, check your spam folder)</p>                                </div>
                            </div>
                        </div>
                    </div>

                    {/* <div className='hidden md:flex justify-end flex-col absolute -right-14 bottom-0'>
                        <div className='flex justify-between mb-2'>
                            <button
                                onClick={() => window.scrollTo({
                                    top: 0,
                                    behavior: 'smooth', // You can use 'auto' for instant scrolling
                                })}
                                className='rounded-full p-2 hover:bg-[#A48533] bg-[#C0A04C]'>
                                <img className='h-6 ' src="/images/icons/uparrow.svg" alt="" />
                            </button>

                            <button>
                            </button>
                        </div>
                        <button className='rounded-full hover:bg-[#A48533] bg-[#C0A04C] py-3 pr-6 pl-6 text-white font-semibold'>Need Help?</button>
                    </div> */}

                </div>
            </section>


            <div className=''>
                < Footer />
            </div>

        </>
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
