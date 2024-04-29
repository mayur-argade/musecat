import React, { useEffect, useState } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import Navbar from '../../../components/shared/Navbar/Navbar'
import EventCard from '../../../components/Cards/EventCard'
import TrendingCard from '../../../components/Cards/TrendingCard'
import Footer from '../../../components/shared/Footer/Footer'
import Tabbar from '../../../components/shared/Tabbar/Tabbar'
import { ClientVenueDetails, GetTrendingEvents } from '../../../http/index'
import SkeletonCard from '../../../components/shared/skeletons/SkeletonCard'
import MapComponent from '../../../components/GoogleMap/Map'
import ScrollToTop from '../../../components/ScrollToTop/ScrollToTop'

const VenueDescription = () => {
    document.title = 'Venue Description'

    let { venueid } = useParams();
    const navigate = useNavigate()
    const [loading, setLoading] = useState('')
    const [response, setReponse] = useState({})
    const [trending, setTrending] = useState({})
    const [address, setAddress] = useState('');
    const [selectedLocation, setSelectedLocation] = useState({
        lat: null,
        lng: null
    })
    let coordinates = [];
    const [visible, setVisible] = useState(false)

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 80) {
                // Show the button when the user scrolls down 100 pixels
                setVisible(true);
            } else {
                // Hide the button when the user scrolls up
                setVisible(false);
            }
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    useEffect(() => {
        const fetchdata = async () => {
            try {
                setLoading(true)
                const { data } = await ClientVenueDetails(venueid)
                // console.log(data.data.eventDetails)
                setReponse(data)

                const trendingResponse = await GetTrendingEvents()
                setTrending(trendingResponse.data)

                setLoading(false)
                setSelectedLocation({
                    lat: data.data.venue.coordinates.lat,
                    lng: data.data.venue.coordinates.lng
                })
                coordinates.push(selectedLocation)
                console.log(coordinates)
            } catch (error) {
                console.log(error)
            }
        }
        fetchdata()

        const getGeolocation = async () => {
            try {
                const apiKey = 'AIzaSyDAm-Tbvhll6eYrRrthm42too-VSL4CVcY';
                console.log(selectedLocation)
                console.log(selectedLocation.lat, selectedLocation.lon)
                const response = await fetch(
                    `https://maps.googleapis.com/maps/api/geocode/json?latlng=${selectedLocation.lat},${selectedLocation.lng}&key=${apiKey}`
                );

                console.log(response)
                if (response.ok) {
                    const data = await response.json();
                    const formattedAddress = data.results[0]?.formatted_address || 'Address not found';
                    setAddress(formattedAddress);
                } else {
                    console.error('Error fetching geolocation data');
                }
            } catch (error) {
                console.error('Error fetching geolocation data', error);
            }
        };

        getGeolocation();

    }, [venueid]);


    const logLatLon = () => {
        console.log("nothing")
    }

    return (
        <div className='dark:bg-[#2c2c2c] dark:text-white'>
            <Navbar />
            <Tabbar />

            <section className='flex justify-center mt-3'>
                <section className='mx-5 sm:mx-5 md:mx-5 md:w-10/12 xl:w-9/12 2xl:w-7/12'>
                    <div className="hidden md:flex align-middle items-center">
                        <button className="bg-white backlogo rounded-full shadow-md shadow-gray-500">
                            <img onClick={(() => navigate(-1))} className='h-6' src="/images/icons/backarrow.svg" alt="" />
                        </button>
                        <span className='text-lg font-bold'>Venue Description</span>
                    </div>

                    {
                        response.data == null
                            ?

                            <div class="h-80 w-full mt-3 rounded-xl bg-gray-300"></div>
                            :
                            <div className="flex justify-center mt-5 ">
                                <img className='rounded-xl h-40 md:h-80 w-full object-cover md:max-h-fit  md:' src={`${response.data.venue.photo}` || "/images/assets/IMAGE.png"} alt="" />
                            </div>
                    }



                    {
                        response.data == null
                            ?
                            <div className='mt-3 mb-5 animate-pulse'>
                                <div class="h-8 mt-3 w-40 bg-gray-300"></div>
                                <div class="h-3 w-full mt-3 w-80 bg-gray-300"></div>
                                <div class="h-3 w-full mt-3 w-80 bg-gray-300"></div>
                            </div>
                            :
                            <div className='mt-3 mb-5'>
                                <p className='md:ml-5 font-bold text-lg md:text-2xl '>
                                    {response.data.venue.name}
                                </p>
                                <p className='md:ml-5 font-normal text-lg md:text-lg '>
                                    <div className='dark:bg-[#2c2c2c] dark:text-white' dangerouslySetInnerHTML={{ __html: response.data.venue.address }} />
                                </p>
                            </div>
                    }




                    <div className='mainContainer grid grid-cols-1 lg:grid-cols-3'>
                        <div className="1 col-span-2">
                            <div className="left w-full ">
                                <div className="md:grid md:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-3 large:grid-cols-4 snap-x carousel pt-0 flex items-center justify-start overflow-x-auto scroll-smooth  scrollbar-hide ">
                                    {
                                        response.data != null && (
                                            <>
                                                {loading
                                                    ?
                                                    <div className='flex'>
                                                        <SkeletonCard />
                                                    </div>
                                                    :
                                                    response.data.events.length == 0
                                                        ?
                                                        <div className='ml-60 mt-20 flex items-center justify-center w-full'>
                                                            <img className='h-60' src="/images/assets/logo-main.png" alt="" />
                                                        </div>
                                                        :
                                                        response.data.events.map((event) => (
                                                            <div className=''>
                                                                <Link className="" to={`/events/${event._id}`} >
                                                                    < EventCard width={'w-44 md:w-52'} data={event} />
                                                                </Link>
                                                            </div>
                                                        ))
                                                }
                                            </>
                                        )
                                    }
                                </div>
                            </div>
                        </div>

                        <div className="2 flex md:justify-center lg:justify-end ">
                            <div className="relative mx-auto md:mx-0">
                                <div className="block md:hidden mt-3">
                                    <p className="text-xl font-bold mt-3">
                                        Location
                                    </p>
                                </div>
                                <div>
                                    <div className='w-72 h-9/12 rounded-md'>
                                        <MapComponent enableClick={false} showInfoWindow={false} onMarkerClick={logLatLon} selectedLocation={selectedLocation} mapSize={"300px"} zoom={8} />
                                    </div>
                                    <p>
                                        {address}
                                    </p>
                                </div>

                                {
                                    trending.data != null && (
                                        <>
                                            {
                                                trending.data.length != 0 && (
                                                    <div className="md:flex flex-col ">
                                                        <div className="mt-3">
                                                            <p className="text-xl font-bold mt-3">
                                                                You may also like
                                                            </p>
                                                        </div>
                                                        <div className=''>
                                                            {
                                                                trending.data.map((event) => (
                                                                    <>
                                                                        {
                                                                            event != null && (
                                                                                <TrendingCard data={event} />
                                                                            )
                                                                        }
                                                                    </>
                                                                ))
                                                            }
                                                        </div>

                                                    </div>
                                                )
                                            }
                                        </>
                                    )
                                }


                                <ScrollToTop />
                            </div>
                        </div>
                    </div>

                </section>
            </section >

            <div className=''>
                < Footer />
            </div>
        </div>
    )

}

export default VenueDescription