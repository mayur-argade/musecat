import React from 'react'
import { useState, useRef, useEffect, forwardRef } from 'react'
import Tabbar from '../../../components/shared/Tabbar/Tabbar'
import Navbar from '../../../components/shared/Navbar/Navbar'
import EventCard from '../../../components/Cards/EventCard'
import MapComponent from '../../../components/GoogleMap/Map';
import Footer from '../../../components/shared/Footer/Footer'
import TrendingCard from '../../../components/Cards/TrendingCard'
import { getCategoryEvents, GetAllCategory, GetTrendingEvents, AllDateEvents } from '../../../http/index'
import { useParams, useLocation } from 'react-router-dom';
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import SkeletonCard from '../../../components/shared/skeletons/SkeletonCard'
import queryString from 'query-string';
import { Features } from '../../../utils/Data'
import './events.css'
import DatePicker from "react-datepicker";
import moment from 'moment'
import "react-datepicker/dist/react-datepicker.css";
import BottomNav from '../../../components/shared/BottomNav/BottomNav'
import ScrollToTop from '../../../components/ScrollToTop/ScrollToTop'
import BlurFade from '../../../components/MagicUI/BlurFade'

const Events = () => {

    const navigate = useNavigate()
    const [searchParams] = useSearchParams();
    const homeDate = searchParams.get('date');

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

    const [searchActive, setSearchActive] = useState(false);
    const [hideFilter, setHideFilter] = useState(false);
    const [hideDate, setHideDate] = useState(false);

    const searchInputRef = useRef(null);

    const toggleSearch = () => {
        setHideFilter(true);
        setHideDate(true);
    };

    const MakeNormal = () => {
        setHideFilter(false);
        setHideDate(false);
    }

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
    console.log("selectedCategories", selectedCategories)

    const [mapAddress, setMapAddress] = useState({
        lat: null,
        lng: null
    })

    const handleMarkerClick = (markerPosition) => {
        // Handle the marker click, e.g., log the position
        console.log("Marker Clicked:", markerPosition);
        setMapAddress({
            lat: markerPosition.lat,
            lng: markerPosition.lng
        })
    };

    const ExampleCustomInput = forwardRef(({ value, onClick }, ref) => (
        <button
            onClick={onClick} ref={ref}
            className="flex items-center cursor-pointer bg-gray-50 border border-gray-300 text-black placeholder-gray-500 text-sm rounded-lg focus:ring-[#C0A04C] focus:border-[#C0A04C] p-2 dark:bg-[#454545] dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-[#C0A04C] dark:focus:border-[#C0A04C] w-40"
        >
            {
                filterDate
                    ?
                    <div className='flex align-middle items-center'>
                        <span className='text-[#A48533] font-semibold'>
                            {moment(filterDate).format('DD-MM-YYYY')}
                        </span>
                        <div onClick={() => setFilterDate(null)}>
                            <img className='h-4 ml-2 flex dark:hidden' src="/images/icons/cancel-icon.png" alt="" />
                            <img className='h-4 ml-2 dark:flex hidden' src="/images/icons/cancel-icon-light.png" alt="" />
                        </div>
                    </div>
                    :
                    <>
                        <span className="text-gray-500 dark:text-white">Calendar</span>
                        <img className="ml-2 w-4 h-4 flex dark:hidden" src="/images/icons/calendar.png" alt="" />
                        <img className="ml-2 w-4 h-4 hidden dark:flex" src="/images/icons/calendar-light.png" alt="" />
                    </>

            }
        </button>

    ));

    const ChangeFilterDate = (date) => {
        console.log("date which is passed by calender", date)
        const format = new Date(date)
        const datemoment = moment(format).format("YYYY-MM-DD")
        console.log("Date Moment changing via calender", datemoment)
        setFilterDate(format)
    }
    console.log("filter date which is setted by calender", filterDate)

    const handleFeaturesChange = (feature) => {
        if (selectedFeatures.includes(feature)) {
            // Remove the feature from selectedFeatures
            setSelectedFeatures(selectedFeatures.filter((url) => url !== feature));
        } else {
            // Add the feature to selectedFeatures
            setSelectedFeatures([...selectedFeatures, feature]);
        }
    }

    // console.log(selectedFeatures)
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
    const subcategory = queryString.parse(location.subcategory)
    const offerDay = queryString.parse(location.day)


    const [groupedEvents, setGroupedEvents] = useState([])
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
                query: queryParams.search,
                filterdate: filterDate,
                subCategory: queryParams.subcategory,
                offerDay: queryParams.day
            }
            try {
                const { data } = await getCategoryEvents(categorydata)
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
    }, [category, filterDate, queryParams.subcategory, queryParams.day]);


    useEffect(() => {
        const fetchdata = async () => {
            setLoading(true)
            const dateData = {
                date: filterDate,
                trending: trending
            }
            try {
                const { data } = await AllDateEvents(dateData)
                console.log(data.data)
                setGroupedEvents(data)

                setLoading(false)
            } catch (error) {
                // console.log(error)
                setLoading(false)
            }
        }

        // setFilterDate(formattedDate)
        fetchdata()
    }, [filterDate]);

    useEffect(() => {
        if (homeDate) {
            console.log("date which is passed by quert", homeDate)
            const convertedDate = new Date(homeDate)
            const datemomentconverted = moment(convertedDate).format("YYYY-MM-DD")
            console.log("Date Moment changing via calender", datemomentconverted)
            setFilterDate(convertedDate)
        }
    }, [])


    if (response.data != null) {
        response.data.map((event, index) => {
            if (event && event.location.coordinates && event.location.coordinates != null) {
                coordinates.push(event.location.coordinates)
            }
        })
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

    const [showDatePicker, setShowDatePicker] = useState(false);

    const handleComponentClick = () => {
        setShowDatePicker(true);
    };

    return (
        <div className='h-screen dark:bg-[#2c2c2c] dark:text-white contactmargine '>
            <div className='z-20 '>
                <Navbar />
                <div className="hidden md:block">
                    <Tabbar />
                </div>
            </div>

            <section className='dark:bg-[#2c2c2c] dark:text-white pb-20'>
                <section className="screenWrapper flex justify-center items-center align-middle mt-5">
                    <section className='w-full md:w-full sm:mx-5 md:mx-5 md:w-10/12 xl:w-9/12 2xl:w-7/12'>
                        {response.data == null && (
                            <div className='fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 overflow-auto bg-[#FFFFFF] bg-opacity-20 backdrop-blur-sm'>
                                <div class="h-screen w-screen relative flex justify-center items-center">
                                    <div class="absolute animate-spin rounded-full h-32 w-32 border-t-4 border-b-4 border-[#C0A04C]"></div>
                                    <img src="/images/logo/logo-main.png" class="h-16" />
                                </div>
                            </div>
                        )}
                        <div className="hidden md:flex justify-center mt-3  ">
                            <span className='capitalize text-2xl font-bold'>
                                {
                                    queryParams.subcategory ?
                                        <>{queryParams.subcategory}</>
                                        :
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
                                            ref={searchInputRef}
                                            type="text"
                                            id="table-search"
                                            className={`dark:bg-[#454545] dark:placeholder-[#454545] placeholder-gray-50 md:placeholder-gray-500 bg-gray-50 border border-gray-300 text-gray-900 md:text-gray-900 text-sm rounded-lg focus:ring-[#C0A04C] focus:border-[#C0A04C] block pl-5 p-2 dark:border-[#454545] dark:text-white dark:focus:ring-[#C0A04C] dark:focus:border-[#C0A04C] w-14 md:w-44 focus:w-32 md:focus:w-44`}
                                            onChange={(e) => setSearch(e.target.value)}
                                            placeholder="Search "
                                            onFocus={toggleSearch}
                                            onBlur={MakeNormal}
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className={`filterbyfeature ${hideFilter ? 'hidden md:block' : ''}`}>
                                <div className="relative inline-block text-left">
                                    <button
                                        onClick={toggleDropdown}
                                        className="flex align-middle space-x-3 bg-gray-50 border border-gray-300 dark:bg-[#454545] dark:text-white text-gray-900 md:text-sm text-md rounded-lg focus:ring-[#C0A04C] focus:border-[#C0A04C] block w-14 md:w-52 p-1.5 dark:border-[#454545] dark:text-white dark:focus:ring-[#C0A04C] dark:focus:border-[#C0A04C]"
                                    >
                                        <span className='hidden md:block text-gray-500 dark:text-white'>Filter by Features</span>
                                        <span className='hidden block text-gray-500 dark:text-white'>Filter</span>

                                        <img className='dark:hidden flex' src="/images/icons/filter.svg" alt="" />
                                        <img className="hidden dark:flex" src='/images/icons/filter-light.svg' alt="" />
                                    </button>
                                    {isOpen && (
                                        <div
                                            className="dark:bg-[#454545] dark:text-white origin-top-right absolute left-0 mt-2 h-80 overflow-y-auto w-52 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-50"
                                            ref={dropdownRef}
                                        >
                                            <div className="p-5">
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

                            <div className="flex items-center space-x-2">
                                <span className="datepicker-toggle ">
                                    <DatePicker
                                        className='z-50'
                                        selected={filterDate}
                                        onChange={(date) => ChangeFilterDate(date)}
                                        customInput={<ExampleCustomInput />}
                                        minDate={moment().toDate()}
                                        popperModifiers={{
                                            preventOverflow: {
                                                enabled: true,
                                            },
                                        }}
                                    />
                                </span>
                            </div>

                        </div>

                        <div className='min-h-screen  mainContainer grid grid-cols-1 lg:grid-cols-3'>
                            <div className="1 h-11/12 col-span-2 overflow-x-auto">
                                <div className="left w-full flex justify-center">
                                    <>
                                        {
                                            category == 'events' ?
                                                <>
                                                    <div>

                                                        {Object.entries(groupedEvents).map(([date, events]) => {
                                                            // Filter events based on the search term, convert to lowercase for case-insensitive comparison
                                                            const filteredEvents = events.filter(event =>
                                                                search.toLocaleLowerCase() === '' ? true : event.title.toLowerCase().includes(search.toLocaleLowerCase())
                                                            );

                                                            // Only render dates that have matching events
                                                            if (filteredEvents.length > 0) {
                                                                return (
                                                                    <div className='mb-8' key={date}>
                                                                        <h2 className='ml-2 text-md font-bold'>
                                                                            {date !== 'undefined' ? moment(date).format('dddd, MMMM Do YYYY') : ''}
                                                                        </h2>
                                                                        <ul className='grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3'>
                                                                            {filteredEvents.map(event => (
                                                                                <li className='' key={event._id}>
                                                                                    <EventCard key={event._id} data={event} />
                                                                                </li>
                                                                            ))}
                                                                        </ul>
                                                                    </div>
                                                                );
                                                            }

                                                            // If no events match, return null to skip rendering this date
                                                            return null;
                                                        })}
                                                    </div>
                                                </>
                                                :
                                                <div className="mx-2 grid grid-flow-row gap:6 md:gap-4 text-neutral-600 grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4">
                                                    {
                                                        response.data != null && (
                                                            <>
                                                                {
                                                                    loading
                                                                        ?
                                                                        <>
                                                                            <SkeletonCard />
                                                                            <SkeletonCard />
                                                                            <SkeletonCard />
                                                                        </>
                                                                        :
                                                                        response.data.length == 0
                                                                            ?
                                                                            <div className='col-span-3'>
                                                                                <div className='h-80 flex flex-col justify-center items-center'>
                                                                                    <img className='flex dark:hidden h-40 aspect-square' src="/images/assets/logo-main.png" alt="" />
                                                                                    <img className='hidden dark:flex h-40 aspect-square' src="/images/logo/logo-main-light.png" alt="" />
                                                                                    <span className='text-md text-center mt-1 font-semibold text-gray-700 dark:text-gray-300'>Looks like this category is taking a little break. Check back later for exciting updates!</span>
                                                                                </div>
                                                                            </div>
                                                                            :
                                                                            response.data
                                                                                .filter((item) => {
                                                                                    const searchResults = search.toLocaleLowerCase() === ''
                                                                                        ? true
                                                                                        : item.title.toLocaleLowerCase().includes(search.toLocaleLowerCase());

                                                                                    const categoryMatch =
                                                                                        selectedCategories.length === 0 ||
                                                                                        selectedCategories.some((selectedCategory) => {
                                                                                            return item.eventCategory.some((itemSubcategory) =>
                                                                                                itemSubcategory.categoryURL === selectedCategory.categoryURL
                                                                                            );
                                                                                        }) ||
                                                                                        selectedCategories.some((selectedCategory) => {
                                                                                            if (selectedCategory.subCategories && selectedCategory.subCategories.length > 0) {
                                                                                                console.log("good");
                                                                                                return (
                                                                                                    selectedCategory.subCategories &&
                                                                                                    selectedCategory.subCategories.some((subCategory) =>
                                                                                                        item.eventCategory &&
                                                                                                        item.eventCategory.some((itemSubcategory) => (
                                                                                                            itemSubcategory.categoryURL === subCategory.categoryURL
                                                                                                        ))
                                                                                                    )
                                                                                                );
                                                                                            } else {
                                                                                                console.log("good"); // This will be executed regardless of subCategories
                                                                                                return item.eventCategory.some((itemSubcategory) =>
                                                                                                    itemSubcategory.categoryURL === selectedCategory.categoryURL
                                                                                                );
                                                                                            }
                                                                                        });

                                                                                    const featureMatch =
                                                                                        selectedFeatures.length == 0 ||
                                                                                        item.features.some(feature => selectedFeatures.includes(feature));

                                                                                    const locationMatch =
                                                                                        mapAddress.lat != null && mapAddress.lng != null ?
                                                                                            item.location.coordinates.lat == mapAddress.lat &&
                                                                                            item.location.coordinates.lng == mapAddress.lng :
                                                                                            true;

                                                                                    if (selectedDistance.length > 0) {
                                                                                        if (userCord != null) {
                                                                                            const eventDistance = calculateDistance(
                                                                                                userCord.latitude,
                                                                                                userCord.longitude,
                                                                                                item.location.coordinates.lat,
                                                                                                item.location.coordinates.lng
                                                                                            );

                                                                                            const distanceFilterMatch = !selectedDistance || eventDistance <= selectedDistance;

                                                                                            return distanceFilterMatch && searchResults && featureMatch && categoryMatch && locationMatch;
                                                                                        }
                                                                                    } else {
                                                                                        // No distance filter applied
                                                                                        return searchResults && featureMatch && categoryMatch && locationMatch;
                                                                                    }
                                                                                }).map((event) => (
                                                                                    <BlurFade>
                                                                                        <EventCard key={event._id} data={event} />
                                                                                    </BlurFade>
                                                                                ))
                                                                }
                                                            </>
                                                        )

                                                    }
                                                </div>
                                        }
                                    </>
                                </div>
                            </div>

                            <div className="hidden 2 md:flex md:justify-center lg:justify-end mt-2">
                                <div className="relative mx-auto md:mx-0">
                                    <div>
                                        <div className='w-72 h-9/12 rounded-md'>
                                            <MapComponent onlyMarkerClick={true} onMarkerClick={handleMarkerClick} enableClick={true} setMapAddress={setMapAddress} coordinates={coordinates} selectedLocation={selectedLocation} mapSize={"300px"} zoom={8} />
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
                                        {
                                            trending.data != null && (
                                                <>
                                                    {
                                                        trending.data.length != 0
                                                            ?
                                                            <>
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
                                                            </>
                                                            :
                                                            <></>
                                                    }
                                                </>
                                            )

                                        }

                                        <ScrollToTop />
                                    </div>

                                </div>
                            </div>
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

        </div >
    )

}

export default Events