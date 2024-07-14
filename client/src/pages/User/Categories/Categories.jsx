import React, { useState, useEffect } from 'react'
import Navbar from '../../../components/shared/Navbar/Navbar'
import Tabbar from '../../../components/shared/Tabbar/Tabbar'
import Footer from '../../../components/shared/Footer/Footer'
import BottomNav from '../../../components/shared/BottomNav/BottomNav'
import { WhereToEvents, GetAllCategory } from '../../../http/index';
import { Link, useLocation } from 'react-router-dom'
import MapComponent from '../../../components/GoogleMap/Map'
import SubEventCard from '../../../components/Cards/SubEventCard'

const Categories = () => {

    let [selectedLocation, setSelectedLocation] = useState({
        lat: 23.58371305879854,
        lng: 58.37132692337036,
    });
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

    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        const fetchCategories = async () => {
            setLoading(true);
            try {
                const res = await GetAllCategory();
                setCategories(res.data.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching categories:', error);
                setLoading(false);
            }
        };
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

        fetchCategories();

    }, []);


    if (response.data != null) {
        response.data.map((event, index) => {
            if (event && event.location.coordinates && event.location.coordinates != null) {
                coordinates.push(event.location.coordinates)
            }
        })
    }

    return (
        <div className='relative h-screen dark:bg-[#2c2c2c] dark:text-white contactmargine '>
            <div className='z-20 '>
                <Navbar />
                <div className="hidden md:block">
                    <Tabbar />
                </div>
            </div>

            <section className='dark:bg-[#2c2c2c] dark:text-white pb-20'>
                <section className="screenWrapper flex justify-center items-center align-middle mt-5">
                    <section className='w-full md:w-full sm:mx-5 md:mx-5 md:w-10/12 xl:w-9/12 2xl:w-7/12'>
                        {/* {response.data == null && (
                            <div className='fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 overflow-auto bg-[#FFFFFF] bg-opacity-20 backdrop-blur-sm'>
                                <div class="h-screen w-screen relative flex justify-center items-center">
                                    <div class="absolute animate-spin rounded-full h-32 w-32 border-t-4 border-b-4 border-[#C0A04C]"></div>
                                    <img src="/images/logo/logo-main.png" class="h-16" />
                                </div>
                            </div>
                        )} */}
                        <div className="hidden md:flex justify-center mt-3  ">
                            <span className='capitalize text-2xl font-bold'>
                                Categories
                            </span>
                        </div>



                        <div className='min-h-screen  mainContainer grid grid-cols-1 '>
                            <div className="1 h-11/12 col-span-2 overflow-x-auto">
                                <div className='mx-5 grid grid-cols-2 md:grid-cols-4 gap-3 p-3'>
                                    {/* Link 1 */}
                                    {
                                        !loading && categories && categories.map(category => (
                                            <>
                                                <div className='h-40 md:h-60 grid md:grid-cols-1 grid-rows-2 gap-3'>
                                                    <Link to={`/category/${category.categoryURL}`}>
                                                        <div className='relative'>
                                                            <img className='rounded-md h-40 md:h-60 w-full bg-gray-400 bg-blend-multiply hover:bg-grey-500 grayscale-10' src={category.photo} alt='' />
                                                            <div className="rounded absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black opacity-50 group-hover:opacity-0 rounded-lg"></div>
                                                            <span className='absolute bottom-0 left-0 text-white p-2 font-bold'>{category.name}</span>
                                                        </div>
                                                    </Link>
                                                </div>
                                            </>
                                        ))
                                    }

                                </div>
                            </div>

                            {/* <div className="hidden 2  md:flex md:justify-center lg:justify-end mt-2">
                                <div className="relative mx-auto md:mx-0">
                                    <div>
                                        <div className='w-72 h-9/12 rounded-md'>
                                            <MapComponent onlyMarkerClick={true} onMarkerClick={handleMarkerClick} enableClick={true} setMapAddress={setMapAddress} coordinates={coordinates} selectedLocation={selectedLocation} mapSize={"300px"} zoom={10} />
                                            {
                                                mapAddress.lat != null || mapAddress.lng != null
                                                    ?
                                                    <div className='w-full flex justify-end align-middle items-center'>
                                                        <button onClick={() => setMapAddress({ lat: null, lng: null })} type="button" class="mt-1 text-white bg-[#C0A04C] hover:bg-[#A48533] dark:hover:bg-[#A48533] hover:text-white rounded text-xs py-1 px-2 text-center dark:bg-[#C0A04C] " >Reset Map</button>
                                                    </div>
                                                    :
                                                    <></>
                                            }
                                        </div>
                                    </div>

                                    <div className="md:flex flex-col ">
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

                                </div>
                            </div> */}

                        </div>

                    </section>
                </section>
            </section>

            <div className='dark:bg-[#2c2c2c] dark:text-white'>
                < Footer />
            </div>

            <div>
                <BottomNav />
            </div>
        </div>
    )
}

export default Categories