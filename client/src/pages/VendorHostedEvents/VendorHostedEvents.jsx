import React, { useState, useEffect, useRef } from 'react'
import Navbar from '../../components/shared/Navbar/Navbar'
import FavoriteCard from '../../components/Cards/FavoriteCard';
import PastPurchaseCard from '../../components/Cards/PastPurchaseCard';
import VendorOfferCard from '../../components/Cards/VendorOfferCard';
import Footer from '../../components/shared/Footer/Footer';
import { Link } from 'react-router-dom';
const VendorHostedEvents = () => {

    document.title = 'Vendor ~ Hosted Events'

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

    return (
        <div>
            <Navbar />

            <section className='md:mr-48 md:ml-48 mt-5 ml-6 mr-6'>
                <div className='flex justify-end md:justify-between align-middle items-center'>
                    <div className="ml-3 hidden md:flex align-middle items-center">
                        <button className=' mt-1'>
                            <img className='h-14 w-14' src="/images/icons/back-button.png" alt="" />
                        </button>
                        <p className='text-xl font-bold'>Hosted Events</p>
                    </div>

                    <div class="filterbyfeature mb-3">
                        <div className="relative inline-block text-left">
                            <button
                                onClick={toggleDropdown}
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-40 md:w-24 pt-1 pb-1 pl-2 pr-2  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 flex align-middle justify-around"
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

                                        <hr className='h-px my-3 bg-gray-500 border-0 dark:bg-gray-700' />

                                        <div className="distance">
                                            <span className='ml-0 font-semibold text-sm'>Distance From Muscat</span>
                                            <div class="flex items-center mb-1 mt-2">
                                                <input id="4km" type="checkbox" value="" class="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                                <label for="4km" class="ml-2 text-sm font-normal text-gray-900 dark:text-gray-300">Less than 4 km</label>
                                            </div>

                                            <div class="flex items-center mb-1">
                                                <input id="10km" type="checkbox" value="" class="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                                <label for="10km" class="ml-2 text-sm font-normal text-gray-900 dark:text-gray-300">Less than 10 km</label>
                                            </div>

                                            <div class="flex items-center mb-1">
                                                <input id="more10km" type="checkbox" value="" class="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                                <label for="more10km" class="ml-2 text-sm font-normal text-gray-900 dark:text-gray-300">More than 10 km</label>
                                            </div>


                                        </div>

                                        <hr className='h-px my-3 bg-gray-500 border-0 dark:bg-gray-700' />

                                        <div className="timings">
                                            <span className='ml-0 font-semibold text-sm'>Distance From Muscat</span>
                                            <div class="flex items-center mb-1 mt-2">
                                                <input id="slota" type="checkbox" value="" class="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                                <label for="slota" class="ml-2 text-sm font-normal text-gray-900 dark:text-gray-300">8am to 12pm</label>
                                            </div>

                                            <div class="flex items-center mb-1">
                                                <input id="slotb" type="checkbox" value="" class="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                                <label for="slotb" class="ml-2 text-sm font-normal text-gray-900 dark:text-gray-300">12pm to 8pm </label>
                                            </div>

                                            <div class="flex items-center mb-1">
                                                <input id="slotc" type="checkbox" value="" class="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                                <label for="slotc" class="ml-2 text-sm font-normal text-gray-900 dark:text-gray-300">More than 10 km</label>
                                            </div>


                                        </div>

                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                <div className='mb-7 grid  xs:grid-cols-2  justify-items-center md:flex-wrap gap-y-4 md:justify-center md:flex lg:grid-cols-2 xl:grid-cols-3 gap-4'>
                    <Link to="/vendor/event/eventid">
                        <PastPurchaseCard status={'Upcoming'} />
                    </Link>
                    <Link to="/vendor/event/eventid">
                        <PastPurchaseCard status={'Upcoming'} />
                    </Link>
                    <Link to="/vendor/event/eventid">
                        <PastPurchaseCard status={'Upcoming'} />
                    </Link>
                    <Link to="/vendor/event/eventid">
                        <PastPurchaseCard status={'Upcoming'} />
                    </Link>
                    <Link to="/vendor/event/eventid">
                        <PastPurchaseCard status={'Upcoming'} />
                    </Link>
                    <Link to="/vendor/event/eventid">
                        <PastPurchaseCard status={'Upcoming'} />
                    </Link>
                 </div>

                <div>
                <span className='text-2xl font-bold '>Offers</span>
                    <div className=' md:flex md:justify-around carousel snap-x p-4 flex items-center justify-start overflow-x-auto scroll-smooth  scrollbar-hide space-x-3 md:space-x-5'>
                        <VendorOfferCard status={"Active"} />
                        <VendorOfferCard status={"Inactive"} />
                        <VendorOfferCard status={"Active"} />
                        <VendorOfferCard status={"Inactive"} />

                    </div>
                </div>

            </section>
            <div className=''>
                < Footer />
            </div>
        </div>
    )
}

export default VendorHostedEvents