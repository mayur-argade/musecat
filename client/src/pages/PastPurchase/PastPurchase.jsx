import React from 'react'
import { useState, useRef, useEffect } from 'react'
import Navbar from '../../components/shared/Navbar/Navbar'
import Tabbar from '../../components/shared/Tabbar/Tabbar'
import { Link, useNavigate } from 'react-router-dom'
import FavoriteCard from '../../components/Cards/FavoriteCard'
import { ClientPastPurchaseApi, GetAllCategory } from '../../http'
import Footer from '../../components/shared/Footer/Footer'
import PastPurchaseCard from '../../components/Cards/PastPurchaseCard'

const PastPurchase = () => {

    document.title = 'Past purchase'

    const [response, setReponse] = useState({});
    const [eventid, setEventid] = useState('')
    const [categories, setCategories] = useState([])
    const [selectedCategories, setSelectedCategories] = useState([])
    const [selectedDistance, setSelectedDistance] = useState([])
    const [userCord, setUserCord] = useState({})

    const navigate = useNavigate();
    useEffect(() => {
        const fetchdata = async () => {
            try {
                const { data } = await ClientPastPurchaseApi()
                console.log(data.data)
                setReponse(data)
            } catch (error) {
                console.log(error)
            }
        }

        fetchdata()

        const fetchCategories = async () => {
            try {

                const res = await GetAllCategory()
                setCategories(res.data)
                // console.log("categories", response.data.data)
            } catch (error) {
                // console.log(error)
            }
        }
        fetchCategories()

    }, []);

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

    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);

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

    if (response.data == null || categories.data == null) {
        return (<div className='h-screen w-full flex justify-center align-middle items-center'>
            <img src="/images/icons/loadmain.svg" alt="" />
        </div>)
    } else {
        return (
            <>
                <Navbar />
                <Tabbar />

                <section className='relative md:mr-48 md:ml-48 mt-5 ml-6 mr-6'>
                    <div className="ml-3 hidden md:flex align-middle justify-between items-center">
                        <div className='flex align-middle items-center'>
                            <button className=' mt-1'>
                                <img className='h-14 w-14' src="/images/icons/back-button.png" alt="" />
                            </button>
                            <p className='text-2xl font-bold'>Past Purchases</p>
                        </div>

                        <div class="filterbyfeature mr-5">
                                    <div className="relative inline-block text-left">
                                        <button
                                            onClick={toggleDropdown}
                                            className="flex align-middle space-x-3 bg-gray-50 border border-gray-300 text-gray-900 md:text-sm text-md rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-14 md:w-52 p-1.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        >
                                            <span className='hidden md:block text-gray-500'>Filter by Features</span>
                                            <span className='hidden block text-gray-500'>Filter</span>

                                            <img src="/images/icons/filter.svg" alt="" />
                                        </button>
                                        {isOpen && (
                                            <div
                                                className="origin-top-right absolute right-0 mt-2 w-36 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 w-52 z-50"
                                                ref={dropdownRef}
                                            >
                                                <div className="p-5">
                                                    {
                                                            <div className="popular">
                                                                <span className='ml-0 font-semibold text-sm'>Popular Filters</span>
                                                                {
                                                                    categories.data.map((e) => (
                                                                        <div class="flex items-center mb-1 mt-2">
                                                                            <input id={e.categoryURL} type="checkbox"
                                                                                onChange={() => handleCategoryChange(e.categoryURL)}
                                                                                checked={selectedCategories.includes(e.categoryURL)}
                                                                                value={e.categoryURL} class="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                                                            <label for={e.categoryURL} class="ml-2 text-sm font-normal text-gray-900 dark:text-gray-300">{e.name}</label>
                                                                        </div>
                                                                    ))
                                                                }
                                                            </div>
                                                    }


                                                    <hr className='h-px my-3 bg-gray-500 border-0 dark:bg-gray-700' />

                                                    <div className="distance">
                                                        <span className='ml-0 font-semibold text-sm'>Distance From Muscat</span>
                                                        <div class="flex items-center mb-1 mt-2">
                                                            <input onChange={() => handleDistanceChange(4)}
                                                                checked={selectedDistance.includes(4)} id="4km" type="checkbox" value="" class="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                                            <label for="4km" class="ml-2 text-sm font-normal text-gray-900 dark:text-gray-300">Less than 4 km</label>
                                                        </div>

                                                        <div class="flex items-center mb-1">
                                                            <input onChange={() => handleDistanceChange(10)}
                                                                checked={selectedDistance.includes(10)} id="10km" type="checkbox" value="" class="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                                            <label for="10km" class="ml-2 text-sm font-normal text-gray-900 dark:text-gray-300">Less than 10 km</label>
                                                        </div>

                                                        <div class="flex items-center mb-1">
                                                            <input id="more10km" type="checkbox" value="" class="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                                            <label for="more10km" class="ml-2 text-sm font-normal text-gray-900 dark:text-gray-300">More than 10 km</label>
                                                        </div>


                                                    </div>

                                                    <hr className='h-px my-3 bg-gray-500 border-0 dark:bg-gray-700' />
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>

                    </div>

                    <div className="grid  xs:grid-cols-2  justify-items-center md:flex-wrap gap-y-4 md:justify-start md:flex lg:grid-cols-2 xl:grid-cols-3 gap-4">
                        {response.data.pastpurchased
                            .sort((a, b) => b.date - a.date)
                            .map((event) => (
                                <Link to={`/ticketstatus/${event.ticketid}`}>
                                    <PastPurchaseCard data={event} />
                                </Link>
                            ))
                        }

                    </div>

                    <div className='hidden md:flex justify-end flex-col absolute -right-44 bottom-5'>
                        <div className='flex justify-between mb-2'>
                            {/* <button className='rounded-full p-2 hover:bg-[#A48533] bg-[#C0A04C]'>
                                <img className='h-6 ' src="/images/icons/uparrow.svg" alt="" />
                            </button> */}
                            {/* <img className='h-10 ml-24' src="/images/icons/whatsapp-color.svg" alt="" /> */}
                            <button>
                            </button>
                        </div>
                        <button className='rounded-full hover:bg-[#A48533] bg-[#C0A04C] py-3 pr-6 pl-6 text-white font-semibold'>Need Help?</button>
                    </div>
                </section>
                <div className=''>
                    < Footer />
                </div>
            </>
        )
    }
}

export default PastPurchase