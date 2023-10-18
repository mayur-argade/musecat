import React, { useState, useEffect, useRef } from 'react'
import Navbar from '../../components/shared/Navbar/Navbar'
import { useNavigate } from 'react-router-dom';
import PastPurchaseCard from '../../components/Cards/PastPurchaseCard';
import VendorOfferCard from '../../components/Cards/VendorOfferCard';
import Footer from '../../components/shared/Footer/Footer';
import { VendorHostedEventsApi } from '../../http';
import { Link } from 'react-router-dom';
const VendorHostedEvents = () => {

    document.title = 'Vendor ~ Hosted Events'

    const [response, setReponse] = useState({});
    const [searchQuery, setSearchQuery] = useState('');
    const [showArchived, setShowArchived] = useState(false)

    const navigate = useNavigate();

    useEffect(() => {
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

    if (response.data == null) {
        return (<div className='h-screen w-full flex justify-center align-middle items-center'>
            <img src="/images/icons/loadmain.svg" alt="" />
        </div>)
    } else {
        return (
            <div>
                <Navbar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

                <section className='md:mr-48 md:ml-48 mt-5 ml-6 mr-6'>
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

                        <div class="filterbyfeature mb-3 mr-8 flex align-middle items-center">
                            <div onClick={() => setShowArchived(!showArchived)} className='mr-3 '>
                                {
                                    showArchived
                                        ?
                                        <p className='bg-[#E7E7E7] w-32 cursor-pointer px-2 py-1 rounded-md text-sm'>
                                            Show Ongoing
                                        </p>
                                        :
                                        <p className='bg-[#E7E7E7] w-32 cursor-pointer px-2 py-1 rounded-md text-sm'>
                                            Show Archived
                                        </p>
                                }

                            </div>
                            <div className="relative inline-block text-left">
                                <button
                                    onClick={toggleDropdown}
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-40 md:w-28 pt-1 pb-1 pl-2 pr-2 py-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 flex align-middle justify-around"
                                >
                                    <p className='text-sm text-gray-500'>Filter</p>
                                    <img className='h-5' src="/images/icons/filter.svg" alt="" />
                                </button>
                                {isOpen && (
                                    <div
                                        className="origin-top-right absolute right-0 mt-2 w-36 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 w-52 z-50"
                                        ref={dropdownRef}
                                    >
                                        <div className="p-5">
                                            <div className="popular">
                                                <span className='ml-0 font-semibold text-sm'>Popular Filters</span>
                                                <div class="flex items-center mb-1 mt-2">
                                                    <input id="staycation" type="checkbox" value="" class="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                                    <label for="staycation" class="ml-2 text-sm font-normal text-gray-900 dark:text-gray-300">Staycation</label>
                                                </div>

                                                <div class="flex items-center mb-1">
                                                    <input id="thingstodo" type="checkbox" value="" class="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                                    <label for="thingstodo" class="ml-2 text-sm font-normal text-gray-900 dark:text-gray-300">thingstodo</label>
                                                </div>

                                                <div class="flex items-center mb-1">
                                                    <input id="fridayNightOuts" type="checkbox" value="" class="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                                    <label for="fridayNightOuts" class="ml-2 text-sm font-normal text-gray-900 dark:text-gray-300">Friday NightOuts</label>
                                                </div>

                                                <div class="flex items-center mb-1">
                                                    <input id="djNights" type="checkbox" value="" class="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                                    <label for="djNights" class="ml-2 text-sm font-normal text-gray-900 dark:text-gray-300">DJ Nights</label>
                                                </div>

                                                <div class="flex items-center mb-1">
                                                    <input id="meetNgreet" type="checkbox" value="" class="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                                    <label for="meetNgreet" class="ml-2 text-sm font-normal text-gray-900 dark:text-gray-300">Meet and Greet</label>
                                                </div>

                                                <div class="flex items-center">
                                                    <input id="celebritiesAround" type="checkbox" value="" class="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                                    <label for="celebritiesAround" class="ml-2 text-sm font-normal text-gray-900 dark:text-gray-300">Celebrities Around</label>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    <div className='mb-7 grid  xs:grid-cols-2  justify-items-center md:flex-wrap gap-y-4 md:justify-start md:flex lg:grid-cols-2 xl:grid-cols-3 gap-4'>
                        {
                            showArchived
                                ?
                                <>
                                    {
                                        response.data.expiredEvents.filter((item) => {
                                            return searchQuery.toLocaleLowerCase() === '' ? item : item.title.toLowerCase().includes(searchQuery)
                                        }).map((event) => (
                                            <Link to={`/vendor/event/${event._id}`}>
                                                <PastPurchaseCard data={event} />
                                            </Link>
                                        ))
                                    }
                                </>
                                :
                                <>
                                    {
                                        response.data.events.filter((item) => {
                                            return searchQuery.toLocaleLowerCase() === '' ? item : item.title.toLowerCase().includes(searchQuery)
                                        }).map((event) => (
                                            <Link to={`/vendor/event/${event._id}`}>
                                                <PastPurchaseCard data={event} />
                                            </Link>
                                        ))
                                    }
                                </>
                        }

                    </div>

                    <div>
                        <span className='text-2xl font-bold '>Offers</span>
                        <div className=' md:flex md:justify-start carousel snap-x p-4 flex items-center justify-start overflow-x-auto scroll-smooth  scrollbar-hide space-x-3 md:space-x-5'>
                            {
                                showArchived
                                    ?
                                    <>
                                        {
                                            response.data.expiredOffers.map((offer) => (
                                                <div className='w-full'>
                                                    <Link to={`/vendor/offer/${offer._id}`}>
                                                        <VendorOfferCard data={offer} />
                                                    </Link>
                                                </div>
                                            ))
                                        }
                                    </>
                                    :
                                    <>
                                        {
                                            response.data.offers.map((offer) => (
                                                <div className='w-full'>
                                                    <Link to={`/vendor/offer/${offer._id}`}>
                                                        <VendorOfferCard data={offer} />
                                                    </Link>
                                                </div>
                                            ))
                                        }
                                    </>
                            }
                        </div>
                    </div>

                </section >
                <div className=''>
                    < Footer />
                </div>
            </div >
        )
    }

}

export default VendorHostedEvents