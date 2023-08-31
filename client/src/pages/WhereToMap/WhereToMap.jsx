import React from 'react'
import Navbar from '../../components/shared/Navbar/Navbar'
import Footer from '../../components/shared/Footer/Footer'
import WhereToMapCard from '../../components/WhereToMapCard.jsx/WhereToMapCard'
import GoogleMap from '../../components/GoogleMap/GoogleMap'
import SubEventCard from '../../components/Cards/SubEventCard'

const WhereToMap = () => {

    return (
        <>
            <Navbar />
            <section className='md:mr-32 md:ml-32 '>
                <div className="flex  align-middle items-center">
                    <img className='h-16' src="/images/icons/back-button.png" alt="" />
                    <span className='text-2xl font-bold'> Where To Map</span>
                </div>
                <div className="flex justify-center items-center md:flex-row flex-col w-11/12">
                    <div className="map w-9/12">
                        <GoogleMap className={" w-80 md:w-11/12 h-96"}/>
                    </div>

                    <div className="ml-10 items-center h-96 overflow-y-auto events ml-2 mr-2 pl-2 pr-2">
                        <SubEventCard />
                        <SubEventCard />
                        <SubEventCard />
                        <SubEventCard />
                    </div>
                </div>
            </section>

            <div className="">
                <Footer />
            </div>
        </>
    )
}

export default WhereToMap