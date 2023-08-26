import React from 'react'
import Navbar from '../../components/shared/Navbar/Navbar'
import Footer from '../../components/shared/Footer/Footer'
import WhereToMapCard from '../../components/WhereToMapCard.jsx/WhereToMapCard'
import GoogleMap from '../../components/GoogleMap/GoogleMap'

const WhereToMap = () => {
    const location = [51.505, -0.09]
    return (
        <>
            <Navbar />
            <section>
                <div className="flex align-middle items-center md:ml-28">
                    <img className='h-16' src="/images/icons/backarrow.svg" alt="" />
                    <span className='text-2xl font-bold'> Where To Map</span>
                </div>
                <div className="flex">
                    <div className="map">
                        <GoogleMap location={location} zoomLevel={17} />
                    </div>
                    <div className="events">
                        <WhereToMapCard />
                        <WhereToMapCard />
                        <WhereToMapCard />
                    </div>
                </div>
            </section>

            <div className=" md:mr-28 md:ml-28 md:mt-8">
                <Footer />
            </div>
        </>
    )
}

export default WhereToMap