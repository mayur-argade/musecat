import React from 'react'
import { useState, useRef, useEffect } from 'react'
import Tabbar from '../../components/shared/Tabbar/Tabbar'
import Navbar from '../../components/shared/Navbar/Navbar'
import EventCard from '../../components/Cards/EventCard'
import MapComponent from '../../components/GoogleMap/Map';
import Footer from '../../components/shared/Footer/Footer'
import TrendingCard from '../../components/Cards/TrendingCard'
import { getCategoryEvents, GetAllCategory, GetTrendingEvents } from '../../http/index'
import { useParams, useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom'
import SkeletonCard from '../../components/shared/skeletons/SkeletonCard'
import queryString from 'query-string';
import './events.css'
import Features from '../../utils/Data'

const Events = () => {
    let [selectedLocation, setSelectedLocation] = useState({
        lat: 23.58371305879854,
        lng: 58.37132692337036,
    });

    let coordinates = [];
    let { category } = useParams();
    const categorydisplayname = category
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);


    document.title = `muscat ~ ${category}`


    const [loading, setLoading] = useState(false)
    const [response, setResponse] = useState({});
    const [search, setSearch] = useState('')
    const [categories, setCategories] = useState([])
    const [selectedCategories, setSelectedCategories] = useState([])
    const [selectedDistance, setSelectedDistance] = useState([])
    const [selectedFeatures, setSelectedFeatures] = useState([])
    const [categoryName, setCategoryName] = useState('')
    const [categoryLoading, setCategoryLoading] = useState(false)
    const [trending, setTrending] = useState({})
    const [checkCategory, setCheckCategory] = useState(false)
    const [filterDate, setFilterDate] = useState(null)
    // console.log("selected distance", selectedDistance)

    const handleFeaturesChange = (feature) => {
        if (selectedFeatures.includes(feature)) {
            // Remove the feature from selectedFeatures
            setSelectedFeatures(selectedFeatures.filter((url) => url !== feature));
        } else {
            // Add the feature to selectedFeatures
            setSelectedFeatures([...selectedFeatures, feature]);
        }
    }

    console.log(selectedFeatures)
    const handleCategoryChange = (categoryURL) => {
        // console.log(categoryURL)
        // Check if the categoryURL is already in selectedCategories
        if (selectedCategories.includes(categoryURL)) {
            // Remove the categoryURL from selectedCategories
            setSelectedCategories(selectedCategories.filter((url) => url !== categoryURL));
        } else {
            // Add the categoryURL to selectedCategories
            setSelectedCategories([...selectedCategories, categoryURL]);
        }
    };


    const handleDistanceChange = (distance) => {
        getUserLocation()
        if (selectedDistance.includes(distance)) {
            setSelectedDistance(selectedDistance.filter((dis) => dis !== distance))
        } else {
            setSelectedDistance([...selectedDistance, distance])
        }
    }

    const [userCord, setUserCord] = useState({})
    async function getUserLocation() {
        try {
            const position = await new Promise((resolve, reject) => {
                navigator.geolocation.getCurrentPosition(resolve, reject);
            });

            const userLocation = {
                latitude: position.coords.latitude,
                longitude: position.coords.longitude,
            };

            setUserCord(userLocation)
            // Use userLocation for filtering.
        } catch (error) {
            console.error('Error getting user location:', error);
        }
    }

    // console.log("userlocation", userLocation)
    function calculateDistance(lat1, lon1, lat2, lon2) {
        // console.log(lat1, lon1, lat2, lon2)
        const R = 6371; // Radius of the Earth in kilometers
        const dLat = (lat2 - lat1) * (Math.PI / 180);
        const dLon = (lon2 - lon1) * (Math.PI / 180);
        const a =
            Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(lat1 * (Math.PI / 180)) *
            Math.cos(lat2 * (Math.PI / 180)) *
            Math.sin(dLon / 2) * Math.sin(dLon / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        const distance = R * c; // Distance in kilometers
        // console.log("distance", distance)
        return distance;
    }

    const location = useLocation();
    const queryParams = queryString.parse(location.search);
    // console.log(queryParams.search)

    const [query, setQuery] = useState('')

    let categoryname;

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                setCategoryLoading(true)
                const res = await GetAllCategory()
                setCategories(res.data)
                const assignedcategory = res.data.data.find((category) => category.categoryURL == categorydisplayname)
                if (assignedcategory) {
                    setCategoryName(assignedcategory.name)
                }
                else {
                    setCategoryName(categorydisplayname)
                }
                setCategoryLoading(false)
                setCheckCategory(true)
            } catch (error) {
                setCategoryLoading(false)
                // console.log(error)
            }
        }
        fetchCategories()

        const fetchdata = async () => {
            setLoading(true)
            const categorydata = {
                category: category,
                query: `?search=${queryParams.value}`,
                filterdate: filterDate
            }
            try {
                const { data } = await getCategoryEvents(categorydata, `?search=${queryParams.search}`)
                // console.log(data.data)
                setResponse(data)

                const trendingResponse = await GetTrendingEvents()
                setTrending(trendingResponse.data)
                setLoading(false)
            } catch (error) {
                // console.log(error)
                setLoading(false)
            }
        }

        fetchdata()

    }, [category, filterDate]);

    if (response.data != null) {
        response.data.map((event, index) => (
            coordinates.push(event.location.coordinates)
        ))
    }




    // Close the dropdown when clicking anywhere outside of it
    const handleClickOutside = (event) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
            setIsOpen(false);
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

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

    // console.log("trending events", trending)
    if (response.data == null || trending.data == null) {
        return (
            <div className='h-screen w-full flex justify-center align-middle items-center'>
                <div class="relative flex justify-center items-center">
                    <div class="absolute animate-spin rounded-full h-32 w-32 border-t-4 border-b-4 border-[#C0A04C]"></div>
                    <img src="/images/logo/logo-main.png" class="h-16" />
                </div>
            </div>
        )
    } else {
        return (
            <div className='contactmargine'>
                <Navbar />
                <div className="hidden md:block">
                    <Tabbar />
                </div>

                <section>
                    <section className="screenWrapper flex justify-center items-center align-middle mt-5">
                        <section className='w-full md:w-full sm:mx-5 md:mx-5 md:w-9/12  xl:w-9/12 2xl:w-8/12'>
                            <div className="hidden md:flex justify-center mt-3  ">
                                <span className='capitalize text-2xl font-bold'>
                                    {
                                        categoryName
                                    }
                                </span>
                            </div>

                            <div className='mb-2 md:mb-0 md:py-2 w-full flex justify-center lg:justify-end align-middle items-center'>
                                <div className="search">
                                    <div class="px-4">
                                        <div class="relative mt-1">
                                            <div class="absolute inset-y-0 right-4 flex items-center pl-3 pointer-events-none">
                                                <svg class="w-5 h-5 text-gray-500 dark:text-gray-400" fill="currentColor" viewBox="0 0 20 20"
                                                    xmlns="http://www.w3.org/2000/svg">
                                                    <path fill-rule="evenodd"
                                                        d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                                                        clip-rule="evenodd"></path>
                                                </svg>
                                            </div>
                                            <input
                                                type="text"
                                                id="table-search"
                                                className={`placeholder-gray-50 md:placeholder-gray-500 bg-gray-50 border border-gray-300 text-gray-900 md:text-gray-900 text-sm rounded-lg focus:ring-[#C0A04C] focus:border-[#C0A04C] block pl-5 p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-[#C0A04C] dark:focus:border-[#C0A04C] w-14 md:w-44 focus:w-32 md:focus:w-44`}
                                                onChange={(e) => setSearch(e.target.value)}
                                                placeholder="Search "
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div class="filterbyfeature">
                                    <div className="relative inline-block text-left">
                                        <button
                                            onClick={toggleDropdown}
                                            className="flex align-middle space-x-3 bg-gray-50 border border-gray-300 text-gray-900 md:text-sm text-md rounded-lg focus:ring-[#C0A04C] focus:border-[#C0A04C] block w-14 md:w-52 p-1.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-[#C0A04C] dark:focus:border-[#C0A04C]"
                                        >
                                            <span className='hidden md:block text-gray-500'>Filter by Features</span>
                                            <span className='hidden block text-gray-500'>Filter</span>

                                            <img src="/images/icons/filter.svg" alt="" />
                                        </button>
                                        {isOpen && (
                                            <div
                                                className="origin-top-right absolute right-0 mt-2 h-80 overflow-y-auto w-52 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-50"
                                                ref={dropdownRef}
                                            >
                                                <div className="p-5">
                                                    {
                                                        category == 'events' && (
                                                            <div className="popular">
                                                                <span className='ml-0 font-semibold text-sm'>Popular Filters</span>
                                                                {
                                                                    categories.data.map((e) => (
                                                                        <div class="flex items-center mb-1 mt-2">
                                                                            <input id={e.categoryURL} type="checkbox"
                                                                                onChange={() => handleCategoryChange(e)}
                                                                                checked={selectedCategories.includes(e)}
                                                                                value={e} class="w-4 h-4 text-[#C0A04C] border-gray-300 rounded focus:ring-[#C0A04C] dark:focus:ring-[#C0A04C] dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                                                            <label for="staycation" class="ml-2 text-sm font-normal text-gray-900 dark:text-gray-300">{e.name}</label>
                                                                        </div>
                                                                    ))
                                                                }
                                                            </div>
                                                        )
                                                    }

                                                    <hr className='h-px my-3 bg-gray-500 border-0 dark:bg-gray-700' />

                                                    <div className="popular">
                                                        <span className='ml-0 font-semibold text-sm'>Features</span>
                                                        {
                                                            Features.list.map((e) => (
                                                                <div class="flex items-center mb-1 mt-2">
                                                                    <input id={e} type="checkbox"
                                                                        onChange={() => handleFeaturesChange(e)}
                                                                        checked={selectedFeatures.includes(e)}
                                                                        value={e} class="w-4 h-4 text-[#C0A04C] border-gray-300 rounded focus:ring-[#C0A04C] dark:focus:ring-[#C0A04C] dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                                                    <label for="staycation" class="ml-2 text-sm font-normal text-gray-900 dark:text-gray-300">{e}</label>
                                                                </div>
                                                            ))
                                                        }
                                                    </div>

                                                    <hr className='h-px my-3 bg-gray-500 border-0 dark:bg-gray-700' />

                                                    <div className="distance">
                                                        <span className='ml-0 font-semibold text-sm'>Distance From Muscat</span>
                                                        <div class="flex items-center mb-1 mt-2">
                                                            <input onChange={() => handleDistanceChange(4)}
                                                                checked={selectedDistance.includes(4)} id="4km" type="checkbox" value="" class="w-4 h-4 text-[#C0A04C] border-gray-300 rounded focus:ring-[#C0A04C] dark:focus:ring-[#C0A04C] dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                                            <label for="4km" class="ml-2 text-sm font-normal text-gray-900 dark:text-gray-300">Less than 4 km</label>
                                                        </div>

                                                        <div class="flex items-center mb-1">
                                                            <input onChange={() => handleDistanceChange(10)}
                                                                checked={selectedDistance.includes(10)} id="10km" type="checkbox" value="" class="w-4 h-4 text-[#C0A04C] border-gray-300 rounded focus:ring-[#C0A04C] dark:focus:ring-[#C0A04C] dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                                            <label for="10km" class="ml-2 text-sm font-normal text-gray-900 dark:text-gray-300">Less than 10 km</label>
                                                        </div>

                                                        <div class="flex items-center mb-1">
                                                            <input id="more10km" type="checkbox" value="" class="w-4 h-4 text-[#C0A04C] border-gray-300 rounded focus:ring-[#C0A04C] dark:focus:ring-[#C0A04C] dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                                            <label for="more10km" class="ml-2 text-sm font-normal text-gray-900 dark:text-gray-300">More than 10 km</label>
                                                        </div>


                                                    </div>

                                                    <hr className='h-px my-3 bg-gray-500 border-0 dark:bg-gray-700' />
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                <div className="datepicker">
                                    <div className="px-4">
                                        <label for=""></label>
                                        <input
                                            id=""
                                            onChange={(e) => setFilterDate(e.target.value)}
                                            className='cursor-pointer bg-gray-50 border border-gray-300 text-black placeholder-gray-500 text-sm rounded-lg focus:ring-[#C0A04C] focus:border-[#C0A04C] block p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-[#C0A04C] dark:focus:border-[#C0A04C] w-32 md:w-40' type="date" />
                                    </div>
                                </div>
                            </div>

                            <div className='mainContainer grid grid-cols-1 lg:grid-cols-3'>
                                <div className="1 col-span-2">
                                    <div className="left w-full ">
                                        <div className="md:grid md:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-3 large:grid-cols-4 snap-x carousel pt-0 flex items-center justify-start overflow-x-auto scroll-smooth  scrollbar-hide ">
                                            {loading
                                                ?
                                                <div className='md:flex md:justify-start md:space-x-3 md:flex-wrap snap-x carousel pt-0 flex items-center justify-start overflow-x-auto scroll-smooth  scrollbar-hide '>
                                                    <SkeletonCard />
                                                    <SkeletonCard />
                                                    <SkeletonCard />
                                                </div>
                                                :
                                                response.data.length == 0
                                                    ?
                                                    <div className='mb-10 md:ml-60 md:mt-20  flex items-center justify-center w-full'>
                                                        <img className='h-52 md:h-60' src="/images/assets/nothing.png" alt="" />
                                                    </div>
                                                    :
                                                    response.data
                                                        .filter((item) => {
                                                            const searchResults = search.toLocaleLowerCase() === '' ? true : item.title.toLowerCase().includes(search);


                                                            const categoryMatch =
                                                                selectedCategories.length === 0 ||
                                                                selectedCategories.some((selectedCategory) => {
                                                                    return (
                                                                        selectedCategory.subCategories &&
                                                                        selectedCategory.subCategories.some((subCategory) =>
                                                                            item.eventCategory &&
                                                                            item.eventCategory.some((itemSubcategory) => (
                                                                                itemSubcategory.categoryURL === subCategory.categoryURL)
                                                                            )
                                                                        )
                                                                    );
                                                                });

                                                            const featureMatch =
                                                                selectedFeatures.length == 0 ||
                                                                item.features.some(feature => selectedFeatures.includes(feature));


                                                            if (selectedDistance.length > 0) {
                                                                if (userCord != null) {
                                                                    const eventDistance = calculateDistance(
                                                                        userCord.latitude,
                                                                        userCord.longitude,
                                                                        item.location.coordinates.lat,
                                                                        item.location.coordinates.lng
                                                                    );

                                                                    const distanceFilterMatch = !selectedDistance || eventDistance <= selectedDistance;

                                                                    return distanceFilterMatch && searchResults && featureMatch && categoryMatch;
                                                                }
                                                            } else {
                                                                // No distance filter applied
                                                                return searchResults && featureMatch && categoryMatch;
                                                            }
                                                        }).map((event) => (
                                                            <div className='' key={event._id}>
                                                                <EventCard data={event} />
                                                            </div>
                                                        ))
                                            }
                                        </div>
                                    </div>
                                </div>

                                <div className="2 flex md:justify-center lg:justify-end ">
                                    <div className="relative mx-auto md:mx-0">
                                        <div>
                                            <div className='w-72 h-9/12 rounded-md'>
                                                <MapComponent coordinates={coordinates} selectedLocation={selectedLocation} mapSize={"300px"} zoom={10} />
                                            </div>
                                        </div>

                                        <div className="md:flex flex-col ">
                                            <div className="mt-3">
                                                <p className="text-xl font-bold mt-3">
                                                    Trending In Muscat
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

                                            <div className='fixed hidden lg:flex justify-end flex-col right-5 bottom-10'>
                                                <div className='flex justify-between mb-2'>
                                                    {
                                                        visible && (
                                                            <button onClick={() => window.scrollTo({
                                                                top: 0,
                                                                behavior: 'smooth', // You can use 'auto' for instant scrolling
                                                            })} className='rounded-full p-2 hover:bg-[#A48533] bg-[#C0A04C]'>
                                                                <img className='h-6 ' src="/images/icons/uparrow.svg" alt="" />
                                                            </button>
                                                        )
                                                    }

                                                    <button>
                                                    </button>
                                                </div>
                                                <button className='rounded-full hover:bg-[#A48533] bg-[#C0A04C] py-3 pr-6 pl-6 text-white font-semibold'>Need Help?</button>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </section>
                    </section>

                </section>

                <div className=''>
                    < Footer />
                </div>
            </div>
        )
    }

}

export default Events