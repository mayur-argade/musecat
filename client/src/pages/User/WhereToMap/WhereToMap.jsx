import React, { useState } from 'react'
import Navbar from '../../../components/shared/Navbar/Navbar'
import Footer from '../../../components/shared/Footer/Footer'
import SubEventCard from '../../../components/Cards/SubEventCard'
import { useNavigate } from 'react-router-dom'
import Tabbar from '../../../components/shared/Tabbar/Tabbar'
import { useEffect } from 'react'
import { getCategoryEvents, GetAllCategory, WhereToEvents } from '../../../http/index'
import queryString from 'query-string';
import { useParams, useLocation } from 'react-router-dom';
import MapComponent from '../../../components/GoogleMap/Map';

const WhereToMap = () => {
    let [selectedLocation, setSelectedLocation] = useState({
        lat: 23.58371305879854,
        lng: 58.37132692337036,
    });
    document.title = 'Where To Map'

    const navigate = useNavigate();
    const handleBack = () => {
        navigate(-1); // This function will take you back to the previous page
    };

    const [loading, setLoading] = useState(false)
    const [response, setResponse] = useState({})
    const [mapAddress, setMapAddress] = useState({
        lat: null,
        lng: null
    })
    const handleLocationSelect = (location) => {
        setMapAddress({
            lat: location.lat,
            lng: location.lng
        })
    }
    const handleMarkerClick = (markerPosition) => {
        // Handle the marker click, e.g., log the position
        console.log("Marker Clicked:", markerPosition);
        setMapAddress({
            lat: markerPosition.lat,
            lng: markerPosition.lng
        })
    };

    let coordinates = [];
    const location = useLocation();
    const queryParams = queryString.parse(location.search);
    useEffect(() => {
        const fetchdata = async () => {
            setLoading(true)
            
            try {
                const { data } = await WhereToEvents()
                console.log(data.data)
                setResponse(data)

                setLoading(false)
            } catch (error) {
                // console.log(error)
                setLoading(false)
            }
        }

        fetchdata()
    }, [])

    if (response.data != null) {
        response.data.map((event, index) => {
            if (event && event.location.coordinates && event.location.coordinates != null) {
                coordinates.push(event.location.coordinates)
            }
        })
    }

    console.log(mapAddress)

    return (
        <div className='dark:bg-[#2c2c2c] dark:text-white'>
            <Navbar />
            <Tabbar />
            <section className='md:mr-12 md:ml-12 '>
                <div className="flex  align-middle items-center">
                    <button onClick={handleBack}>
                        <img className='h-16' src="/images/icons/back-button.png" alt="" />
                    </button>
                    <span className='text-2xl font-bold'> Where To Map</span>
                </div>
                <div className="flex justify-around align-top ">
                    <div className="md:drop-shadow-2xl map w-full md:w-9/12 h-auto ">
                        <MapComponent onMarkerClick={handleMarkerClick} enableClick={true} setMapAddress={setMapAddress} coordinates={coordinates} selectedLocation={selectedLocation} mapSize={"500px"} zoom={10} />
                    </div>

                    <div className="flex flex-col h-[32rem] overflow-y-auto">
                        {
                            response.data != null && (
                                <>
                                    {
                                        response.data
                                            .filter((event) => {
                                                // Check if mapAddress is present
                                                if (mapAddress.lat != null && mapAddress.lng != null) {
                                                    // Assuming event.location.coordinates is also an object with lat and lng properties
                                                    return (
                                                        event.location.coordinates.lat === mapAddress.lat &&
                                                        event.location.coordinates.lng === mapAddress.lng
                                                    );
                                                }
                                                // If mapAddress is not present, include all events
                                                return true;
                                            })
                                            .map((event) => (
                                                <button key={event.id} onClick={() => setSelectedLocation(event.location.coordinates)}>
                                                    <SubEventCard data={event} />
                                                </button>
                                            ))
                                    }
                                </>
                            )
                        }
                    </div>
                </div>
                <div className='fixed hidden lg:flex justify-center flex-col right-5 bottom-10'>
                    <div className='flex justify-center mb-2'>
                        <button>
                        </button>
                    </div>
                    <button onClick={() => navigate('/user/helpcenter')} className='rounded-full hover:bg-[#A48533] bg-[#C0A04C] py-3 pr-6 pl-6 text-white font-semibold'>Need Help?</button>
                </div>
            </section>

            <div className="">
                <Footer />
            </div>
        </div>
    )
}

export default WhereToMap