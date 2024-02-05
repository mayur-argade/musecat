import React from 'react'
import { useState, useRef, useEffect } from 'react'
import Navbar from '../../../components/shared/Navbar/Navbar'
import Tabbar from '../../../components/shared/Tabbar/Tabbar'
import { Link, useNavigate } from 'react-router-dom'
import FavoriteCard from '../../../components/Cards/FavoriteCard'
import { ClientPastPurchaseApi, GetAllCategory } from '../../../http/index'
import Footer from '../../../components/shared/Footer/Footer'
import PastPurchaseCard from '../../../components/Cards/PastPurchaseCard'
import Features from '../../../utils/Data'
import SkeletonCard from '../../../components/shared/skeletons/SkeletonCard'

const PastPurchase = () => {

    document.title = 'Past purchase'

    const [response, setReponse] = useState({});
    const [eventid, setEventid] = useState('')
    const [categories, setCategories] = useState([])
    const [selectedCategories, setSelectedCategories] = useState([])
    const [selectedDistance, setSelectedDistance] = useState([])
    const [userCord, setUserCord] = useState({})
    const [selectedFeatures, setSelectedFeatures] = useState([])
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

    const handleFeaturesChange = (feature) => {
        if (selectedFeatures.includes(feature)) {
            // Remove the feature from selectedFeatures
            setSelectedFeatures(selectedFeatures.filter((url) => url !== feature));
        } else {
            // Add the feature to selectedFeatures
            setSelectedFeatures([...selectedFeatures, feature]);
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

    // if (response.data == null || categories.data == null) {
    //     return (
    //         <div className='dark:bg-[#2c2c2c] dark:text-white h-screen w-full flex justify-center align-middle items-center'>
    //             <div class="relative flex justify-center items-center">
    //                 <div class="absolute animate-spin rounded-full h-32 w-32 border-t-4 border-b-4 border-[#C0A04C]"></div>
    //                 <img src="/images/logo/logo-main.png" class="h-16" />
    //             </div>
    //         </div>
    //     )

    // } else {
    return (
        <div className='dark:bg-[#2c2c2c] dark:text-white'>
            <div className='z-20'>
                <Navbar />
                <Tabbar />
            </div>
            <section className='relative md:mr-48 md:ml-48 mt-5 l:ml-6 l:mr-6 mx-2'>
                {response.data == null && (
                    <div className='fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 overflow-auto bg-[#FFFFFF] bg-opacity-20 backdrop-blur-sm'>
                        <div class="h-screen w-screen relative flex justify-center items-center">
                            <div class="absolute animate-spin rounded-full h-32 w-32 border-t-4 border-b-4 border-[#C0A04C]"></div>
                            <img src="/images/logo/logo-main.png" class="h-16" />
                        </div>
                    </div>
                )}
                <div className="ml-3 hidden md:flex align-middle justify-between items-center">
                    <div className='flex align-middle items-center'>
                        <button onClick={() => navigate(-1)} className=' mt-1'>
                            <img className='h-14 w-14' src="/images/icons/back-button.png" alt="" />
                        </button>
                        <p className='text-2xl font-bold'>Past Purchases</p>
                    </div>

                    <div class="filterbyfeature mr-5">
                        <div className="relative inline-block text-left">
                            <button
                                onClick={toggleDropdown}
                                className="flex align-middle space-x-3 bg-gray-50 border border-gray-300 text-gray-900 md:text-sm text-md rounded-lg focus:ring-[#A48533] focus:border-[#A48533] block w-14 md:w-52 p-1.5  dark:bg-[#454545] dark:border-gray-600 dark:placeholder-white dark:text-white dark:focus:ring-[#A48533] dark:focus:border-[#A48533]"
                            >
                                <span className='hidden md:block text-gray-500'>Filter by Features</span>
                                <span className='hidden block text-gray-500'>Filter</span>

                                <img src="/images/icons/filter.svg" alt="" />
                            </button>
                            {isOpen && (
                                <div
                                    className="origin-top-right absolute h-80 overflow-y-auto right-0 mt-2 w-36 rounded-md shadow-lg bg-white dark:bg-[#454545] dark:text-white ring-1 ring-black ring-opacity-5 w-52 z-50"
                                    ref={dropdownRef}
                                >
                                    <div className="p-5">
                                        {
                                            <div className="popular">
                                                <span className='ml-0 font-semibold text-sm'>Popular Filters</span>
                                                {response.data != null && categories.data != null && (
                                                    <>
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
                                                    </>
                                                )
                                                }

                                            </div>
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
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                </div>

                <div className="mx-2 grid grid-flow-row gap:6 md:gap-8 text-neutral-600 grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4">
                    {
                        response.data == null
                            ?
                            <>
                                <SkeletonCard />
                                <SkeletonCard />
                                <SkeletonCard />
                                <SkeletonCard />
                                <SkeletonCard />
                                <SkeletonCard />
                            </>
                            :
                            <>
                                {
                                    response.data.pastpurchased.length == 0 ?
                                        <div className='col-span-3 flex items-center justify-center'>
                                            <div className='h-80 flex flex-col justify-center items-center'>
                                                <img className='h-40 aspect-square' src="/images/assets/logo-main.png" alt="" />
                                                <span className='text-md text-center mt-1 font-semibold text-gray-700'>Zero past purchases – time for some new experiences</span>
                                            </div>
                                        </div>
                                        :
                                        <>
                                            {
                                                response.data.pastpurchased.filter((event) => {
                                                    const validEvents = event.eventid !== null

                                                    const categoryMatch =
                                                        selectedCategories.length === 0 ||
                                                        selectedCategories.some((selectedCategory) => {
                                                            if (selectedCategory.subCategories && selectedCategory.subCategories.length > 0) {
                                                                console.log("good")
                                                                return (
                                                                    selectedCategory.subCategories &&
                                                                    selectedCategory.subCategories.some((subCategory) =>
                                                                        event.eventid.eventCategory &&
                                                                        event.eventid.eventCategory.some((itemSubcategory) => (
                                                                            itemSubcategory.categoryURL === subCategory.categoryURL)
                                                                        )
                                                                    )
                                                                );
                                                            }
                                                            else {
                                                                return (
                                                                    event.eventid.eventCategory.some((itemSubcategory) =>
                                                                        itemSubcategory.categoryURL === selectedCategory.categoryURL
                                                                    )
                                                                );
                                                            }
                                                        });


                                                    const featureMatch =
                                                        selectedFeatures.length == 0 ||
                                                        event.eventid.features.some(feature => selectedFeatures.includes(feature));

                                                    return validEvents && featureMatch && categoryMatch
                                                }).map((event) => (
                                                    <Link to={`/ticketstatus/${event._id}`}>
                                                        <PastPurchaseCard data={event.eventid} />
                                                    </Link>
                                                ))
                                            }
                                        </>

                                }
                            </>
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
                    <button onClick={() => navigate('/user/helpcenter')} className='rounded-full hover:bg-[#A48533] bg-[#C0A04C] py-3 pr-6 pl-6 text-white font-semibold'>Need Help?</button>
                </div>
            </section>
            <div className=''>
                < Footer />
            </div>
        </div>
    )
    // }
}

export default PastPurchase