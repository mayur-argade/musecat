import React, { useState, useEffect, useRef } from 'react'
import Navbar from '../../../components/shared/Navbar/Navbar'
import { useNavigate } from 'react-router-dom';
import PastPurchaseCard from '../../../components/Cards/PastPurchaseCard';
import VendorOfferCard from '../../../components/Cards/VendorOfferCard';
import Footer from '../../../components/shared/Footer/Footer';
import { VendorHostedEventsApi, GetAllCategory } from '../../../http/index';
import { Link } from 'react-router-dom';
import { Features } from '../../../utils/Data'
import SkeletonCard from '../../../components/shared/skeletons/SkeletonCard';
const VendorHostedEvents = () => {

    document.title = 'Vendor ~ Hosted Events'

    const [response, setReponse] = useState({});
    const [searchQuery, setSearchQuery] = useState('');
    const [showArchived, setShowArchived] = useState(false)
    const [categories, setCategories] = useState([])
    const [selectedCategories, setSelectedCategories] = useState([])
    const [selectedFeatures, setSelectedFeatures] = useState([])
    const [categoryLoading, setCategoryLoading] = useState(false)
    const [checkCategory, setCheckCategory] = useState(false)
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                setCategoryLoading(true)
                const res = await GetAllCategory()
                setCategories(res.data)
                setCategoryLoading(false)
                setCheckCategory(true)
            } catch (error) {
                setCategoryLoading(false)
                // console.log(error)
            }
        }
        fetchCategories()

        const fetchdata = async () => {
            try {
                const { data } = await VendorHostedEventsApi()
                console.log(data.data)
                setReponse(data)
            } catch (error) {
                console.log(error)
            }
        }

        fetchdata()
    }, []);

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

    const handleBack = () => {
        navigate(-1); // This function will take you back to the previous page
    };

    return (
        <div className='dark:bg-[#2c2c2c] dark:text-white'>
            <div className="z-50 sticky top-0 shadow-lg">
                <Navbar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
            </div>

            <div className='flex justify-center items-center align-middle mt-5'>
                <section className='w-full sm:mx-5 md:mx-5 md:w-9/12 xl:w-8/12 2xl:w-7/12'>
                    <div className='flex justify-end md:justify-between align-middle items-center'>
                        <div className="ml-3 hidden md:flex align-middle items-center">
                            <button onClick={handleBack}>
                                <img className='h-16' src="/images/icons/back-button.png" alt="" />
                            </button>
                            <p className='text-xl font-bold'>
                                Hosted
                                {
                                    showArchived
                                        ?
                                        <span className='mx-2'>
                                            Archived
                                        </span>
                                        :
                                        <span className='mx-2'>
                                            Ongoing
                                        </span>
                                }
                                Events
                            </p>
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
                                        className="origin-top-right absolute right-0 mt-2 h-80 overflow-y-auto w-52 rounded-md shadow-lg bg-white dark:bg-[#454545] dark:text-white ring-1 ring-black ring-opacity-5 z-50"
                                        ref={dropdownRef}
                                    >
                                        <div className="p-5">
                                            <div className="popular">
                                                <span className='ml-0 font-semibold text-sm'>Category</span>
                                                <div className="flex items-center mb-1 mt-2">
                                                    <input
                                                        id="group2"
                                                        name="status"
                                                        type="radio"
                                                        checked={!showArchived}
                                                        onChange={() => setShowArchived(false)}
                                                        className="w-4 h-4 text-[#C0A04C] border-gray-300 rounded focus:ring-[#C0A04C] dark:focus:ring-[#C0A04C] dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                                    />
                                                    <label htmlFor="group2" className="ml-2 text-sm font-normal text-gray-900 dark:text-gray-300">
                                                        Ongoing
                                                    </label>
                                                </div>
                                                <div className="flex items-center mb-1 mt-2">
                                                    <input
                                                        id="group1"
                                                        name="status"
                                                        type="radio"
                                                        checked={showArchived}
                                                        onChange={() => setShowArchived(true)}
                                                        className="w-4 h-4 text-[#C0A04C] border-gray-300 rounded focus:ring-[#C0A04C] dark:focus:ring-[#C0A04C] dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                                    />
                                                    <label htmlFor="group1" className="ml-2 text-sm font-normal text-gray-900 dark:text-gray-300">
                                                        Archived
                                                    </label>
                                                </div>

                                            </div>

                                            <div className="popular">
                                                <span className='ml-0 font-semibold text-sm'>Popular Filters</span>
                                                {
                                                    categories.data != null && (
                                                        categories.data.map((e) => (
                                                            <div class="flex items-center mb-1 mt-2">
                                                                <input id={e.categoryURL} type="checkbox"
                                                                    onChange={() => handleCategoryChange(e)}
                                                                    checked={selectedCategories.includes(e)}
                                                                    value={e} class="w-4 h-4 text-[#C0A04C] rounded dark:focus:ring-[#C0A04C] " />
                                                                <label for="staycation" class="ml-2 text-sm font-normal text-gray-900 dark:text-gray-300">{e.name}</label>
                                                            </div>
                                                        ))
                                                    )
                                                }
                                            </div>
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

                    <div className='grid grid-flow-row gap:8 md:mx-3 md:gap-3 text-neutral-600 grid-cols-2 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4'>
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
                                        showArchived
                                            ?
                                            <>
                                                {
                                                    response.data.expiredEvents.filter((item) => {
                                                        const searchResult = searchQuery.toLocaleLowerCase() === '' ? item : item.title.toLowerCase().includes(searchQuery)
                                                        const categoryMatch =
                                                            selectedCategories.length === 0 ||
                                                            selectedCategories.some((selectedCategory) => {
                                                                if (selectedCategory.subCategories && selectedCategory.subCategories.length > 0) {
                                                                    console.log("good")
                                                                    return (
                                                                        selectedCategory.subCategories &&
                                                                        selectedCategory.subCategories.some((subCategory) =>
                                                                            item.eventCategory &&
                                                                            item.eventCategory.some((itemSubcategory) => (
                                                                                itemSubcategory.categoryURL === subCategory.categoryURL)
                                                                            )
                                                                        )
                                                                    );
                                                                }
                                                                else {
                                                                    return (
                                                                        item.eventCategory.some((itemSubcategory) =>
                                                                            itemSubcategory.categoryURL === selectedCategory.categoryURL
                                                                        )
                                                                    );
                                                                }
                                                            });


                                                        const featureMatch =
                                                            selectedFeatures.length == 0 ||
                                                            item.features.some(feature => selectedFeatures.includes(feature));

                                                        return searchResult && categoryMatch && featureMatch
                                                    }).map((event) => (
                                                        <Link to={`/vendor/event/${event._id}`}>
                                                            <PastPurchaseCard height={'h-72'} data={event} />
                                                        </Link>
                                                    ))
                                                }
                                            </>
                                            :
                                            <>
                                                {
                                                    response.data.events.filter((item) => {
                                                        const searchResult = searchQuery.toLocaleLowerCase() === '' ? item : item.title.toLowerCase().includes(searchQuery)
                                                        const categoryMatch =
                                                            selectedCategories.length === 0 ||
                                                            selectedCategories.some((selectedCategory) => {
                                                                if (selectedCategory.subCategories && selectedCategory.subCategories.length > 0) {
                                                                    console.log("good")
                                                                    return (
                                                                        selectedCategory.subCategories &&
                                                                        selectedCategory.subCategories.some((subCategory) =>
                                                                            item.eventCategory &&
                                                                            item.eventCategory.some((itemSubcategory) => (
                                                                                itemSubcategory.categoryURL === subCategory.categoryURL)
                                                                            )
                                                                        )
                                                                    );
                                                                }
                                                                else {
                                                                    return (
                                                                        item.eventCategory.some((itemSubcategory) =>
                                                                            itemSubcategory.categoryURL === selectedCategory.categoryURL
                                                                        )
                                                                    );
                                                                }
                                                            });


                                                        const featureMatch =
                                                            selectedFeatures.length == 0 ||
                                                            item.features.some(feature => selectedFeatures.includes(feature));

                                                        return searchResult && categoryMatch && featureMatch
                                                    }).map((event) => (
                                                        <Link to={`/vendor/event/${event._id}`}>
                                                            <PastPurchaseCard data={event} />
                                                        </Link>
                                                    ))
                                                }
                                            </>
                                    }
                                </>
                        }

                    </div>

                    <div>
                        {
                            response.data == null
                                ?
                                <>
                                </>
                                :
                                <>
                                    {
                                        showArchived
                                            ?
                                            <>
                                                {
                                                    response.data.expiredOffers.length != 0
                                                        ?
                                                        <>
                                                            <div>
                                                                <span className='lg:mx-9 text-2xl font-bold '>Offers</span>
                                                                <div className='grid grid-flow-row gap:8 md:mx-3 md:gap-3 text-neutral-600 grid-cols-2 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4'>
                                                                    {
                                                                        response.data.expiredOffers.map((offer) => (
                                                                            <div className='w-full'>
                                                                                <Link to={`/vendor/offer/${offer._id}`}>
                                                                                    <PastPurchaseCard data={offer} />
                                                                                </Link>
                                                                            </div>
                                                                        ))
                                                                    }
                                                                </div>
                                                            </div>
                                                        </>
                                                        :
                                                        <></>
                                                }

                                            </>
                                            :
                                            <div>
                                                {
                                                    response.data.offers.length != 0
                                                        ?
                                                        <>
                                                            <span className='lg:mx-9 text-2xl font-bold '>Offers</span>
                                                            <div className='grid grid-flow-row gap:8 md:mx-3 md:gap-3 text-neutral-600 grid-cols-2 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4'>
                                                                {
                                                                    response.data.offers.map((offer) => (
                                                                        <div className='w-full'>
                                                                            <Link to={`/vendor/event/${offer._id}`}>
                                                                                <PastPurchaseCard data={offer} />
                                                                            </Link>
                                                                        </div>
                                                                    ))
                                                                }
                                                            </div>
                                                        </>
                                                        :
                                                        <></>
                                                }

                                            </div>
                                    }
                                </>
                        }
                    </div>

                </section >
            </div >
            <div className=''>
                < Footer />
            </div>
        </div >
    )
    // }

}

export default VendorHostedEvents