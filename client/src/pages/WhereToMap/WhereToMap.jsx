import React from 'react'
import Navbar from '../../components/shared/Navbar/Navbar'
import Footer from '../../components/shared/Footer/Footer'
import WhereToMapCard from '../../components/WhereToMapCard.jsx/WhereToMapCard'
import GoogleMap from '../../components/GoogleMap/GoogleMap'
import SubEventCard from '../../components/Cards/SubEventCard'
import { useNavigate } from 'react-router-dom'

const WhereToMap = () => {
    const navigate = useNavigate();
    const handleBack = () => {
        navigate(-1); // This function will take you back to the previous page
    };
    return (
        <>
            <Navbar />
            <section className='md:mr-12 md:ml-12 '>
                <div className="flex  align-middle items-center">
                    <button onClick={handleBack}>
                        <img className='h-16' src="/images/icons/back-button.png" alt="" />
                    </button>
                    <span className='text-2xl font-bold'> Where To Map</span>
                </div>
                <div className="flex justify-around items-center align-middle md:flex-row flex-col ml-5 mr-5 ">
                    <div className="md:drop-shadow-2xl map md:w-9/12 mb-10">
                        <GoogleMap className={"w-80 md:w-11/12 md:h-128 md:max-h-128"} />
                    </div>

                    <div className=" md:mt-0 flex flex-col justify-center items-center align-middle ml-10 items-center h-128 md:h-128 snap-start overflow-y-auto events ml-2 mr-2 pl-2 pr-2">
                        <SubEventCard />
                        <SubEventCard />
                        <SubEventCard />
                        <SubEventCard />
                        <SubEventCard />
                        <SubEventCard />
                    </div>
                </div>
                <div className='w-full hidden md:flex justify-end items-end flex-col '>
                    <div className='flex justify-end mb-2 mr-8 mt-3'>
                        {/* <button className='rounded-full p-2 hover:bg-[#A48533] bg-[#C0A04C]'>
                            <img className='h-6 ' src="/images/icons/uparrow.svg" alt="" />
                        </button> */}
                        <img className='h-10 ml-12 ' src="/images/icons/whatsapp-color.svg" alt="" />
                        <button>
                        </button>
                    </div>
                    <button className='mr-8 rounded-full hover:bg-[#A48533] bg-[#C0A04C] py-3 pr-6 pl-6 text-white font-semibold'>Need Help?</button>
                </div>
            </section>

            <div className="">
                <Footer />
            </div>
        </>
    )
}

export default WhereToMap