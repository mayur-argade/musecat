import React, { useState } from 'react'
import Navbar from '../../components/shared/Navbar/Navbar'
import Footer from '../../components/shared/Footer/Footer'
import SubEventCard from '../../components/Cards/SubEventCard'
import { useNavigate } from 'react-router-dom'
import Tabbar from '../../components/shared/Tabbar/Tabbar'
import { useEffect } from 'react'
import { getCategoryEvents, GetAllCategory, GetTrendingEvents } from '../../http/index'
import queryString from 'query-string';
import { useParams, useLocation } from 'react-router-dom';
import MapComponent from '../../components/GoogleMap/Map';

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
    let coordinates = [];
    const location = useLocation();
    const queryParams = queryString.parse(location.search);
    useEffect(() => {
        const fetchdata = async () => {
            setLoading(true)
            const categorydata = {
                category: 'events',
                query: `?search=${queryParams.value}`
            }
            try {
                const { data } = await getCategoryEvents(categorydata, `?search=${queryParams.search}`)
                // console.log(data.data)
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

    if (response.data == null) {
        return (
            <div className='h-screen w-full flex justify-center align-middle items-center'>
                <div class="relative flex justify-center items-center">
                    <div class="absolute animate-spin rounded-full h-32 w-32 border-t-4 border-b-4 border-[#C0A04C]"></div>
                    <img src="/images/logo/logo-main.png" class="h-16" />
                </div>
            </div>
        )
    }
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
                <div className="flex justify-around items-center align-middle md:flex-row flex-col ml-5 mr-5 ">
                    <div className="md:drop-shadow-2xl map w-full md:w-9/12 h-auto ">
                        <MapComponent coordinates={coordinates} selectedLocation={selectedLocation} mapSize={"500px"} zoom={10} />
                    </div>

                    <div className="mt-0 md:mt-0 flex flex-col justify-center items-center align-middle ml-10 items-center h-128 md:h-128 snap-start overflow-y-auto events ml-2 mr-2 pl-2 pr-2">
                        {
                            response.data.map((event) => (
                                <button onClick={() => setSelectedLocation(event.location.coordinates)}>
                                    <SubEventCard data={event} />
                                </button>
                            ))
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