import React from 'react'
import Navbar from '../../components/shared/Navbar/Navbar'
import Footer from '../../components/shared/Footer/Footer'
import { Link } from 'react-router-dom'
const AboutUs = () => {
    document.title = 'About Us'
    return (
        <>
            <Navbar />
            <section className='contactmargine'>
                <div className='h-40 md:h-64 mt-32 md:mt-52 justify-center items-center relative'>

                    <section className="flex md:grid md:grid-cols-6 h-11/12 items-center md:mt-16 relative">
                        <div className="col-start-1 col-end-3 md:col-start-2 md:col-end-4 justify-items-start relative z-20">
                            <div className="ml-3 -mt-2 space-y-4">
                                <p className="text-2xl font-bold md:text-3xl md:font-extrabold">About us</p>
                                <p className="text-3xl font-extrabold md:text-5xl md:font-bold">Muscat Where <br /> To ?</p>
                            </div>
                        </div>

                        <div className="col-start-3 col-end-6 absolute z-10 -mt-16 img">
                            <img className="ml-40 md:ml-0 h-64 w-52 md:h-96 md:w-full" src="/images/assets/about.png" alt="" />
                        </div>
                    </section>
                </div>

                <section className='md:mr-52 md:ml-52 ml-3 mr-3'>
                    <p className='text-center font-medium text-lg'>
                        Muscat Where To is a platform to discover the latest offers and events in Muscat.Browse through offers, find more info and directions. Find Muscat’s offers and events by type and filters like Eat & Drink, Kids Corner, Health and Beauty, Getaway Deals, Gym Memberships, Activities & Adventure and much more.
                    </p>
                </section>

                <div className="img mt-8 mb-10">
                    <img className='h-52 md:h-full' src="/images/assets/about2.jpg" alt="" />
                </div>

                <hr className='h-px my-8 bg-blue-500 border-0 dark:bg-gray-700' />

                <div className="relative space-y-10 md:mr-36 md:ml-36 ">

                    <div className='flex mr-5 md:mr-24 md:ml-24 justify-between md:flex-row flex-col align-items items-start ml-5 md:ml-0 md:items-center'>

                        <div className="font-bold text-left text-5xl">Find Your <br /> Next Event</div>

                        <div className="mt-2 w-11/12 md:w-6/12 font-medium text-lg leading-loose">
                            <p className=''>Choose a venue according to cuisine type, day of the week or other filters. Check offers including Friday Brunch, Happy Hour, Ladies Night, Live Music, Pool & beach passes and more.Save your favorite offer or event into your favorite list and rate the places you visited.</p>
                        </div>
                    </div>

                    <div className='flex mr-5 md:mr-24 md:ml-24 justify-around md:flex-row flex-col-reverse align-items items-center'>

                        <div className="mt-2 w-11/12 md:w-6/12 font-medium text-lg leading-loose"><p>If you wish to have your offer displayed on Muscat Where To platform, kindly <Link to='/contactus'><span className='ml-0 text-[#C0A04C]'>contact us</span></Link> at info@muscatwhereto.com. (if you don’t hear from us, check your spam folder)</p></div>

                        <div className="">
                            <img className='ml-3 h-52 md:h-64' src="images/assets/about3.png" alt="" />
                        </div>
                    </div>

                    <div className='hidden md:flex justify-end flex-col absolute -right-14 bottom-0'>
                        <div className='flex justify-between mb-2'>
                            <button
                                onClick={() => window.scrollTo({
                                    top: 0,
                                    behavior: 'smooth', // You can use 'auto' for instant scrolling
                                })}
                                className='rounded-full p-2 hover:bg-[#A48533] bg-[#C0A04C]'>
                                <img className='h-6 ' src="/images/icons/uparrow.svg" alt="" />
                            </button>
                            <img className='h-10 ml-12' src="/images/icons/whatsapp-color.svg" alt="" />
                            <button>
                            </button>
                        </div>
                        <button className='rounded-full hover:bg-[#A48533] bg-[#C0A04C] py-3 pr-6 pl-6 text-white font-semibold'>Need Help?</button>
                    </div>

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
