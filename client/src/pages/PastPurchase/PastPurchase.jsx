import React from 'react'
import { useState, useRef, useEffect } from 'react'
import Navbar from '../../components/shared/Navbar/Navbar'
import Tabbar from '../../components/shared/Tabbar/Tabbar'
import FavoriteCard from '../../components/Cards/FavoriteCard'
import Footer from '../../components/shared/Footer/Footer'
import PastPurchaseCard from '../../components/Cards/PastPurchaseCard'

const PastPurchase = () => {

    document.title = 'Past purchase'

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
                                className="flex justify-around align-middle border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-40 md:w-44 p-1  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            >
                                <p className='text-gray-500 text-sm'>Filter by Features</p>
                                <img className='h-5' src="/images/icons/filter.svg" alt="" />
                            </button>
                            {isOpen && (
                                <div
                                    className="z-50 origin-top-right absolute right-0 mt-2 w-36 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 w-52"
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

                <div className="grid  xs:grid-cols-2  justify-items-center md:flex-wrap gap-y-4 md:justify-center md:flex lg:grid-cols-2 xl:grid-cols-3 gap-4">
                    <PastPurchaseCard status={"Expired"} />
                    <PastPurchaseCard status={"Upcoming"} />
                    <PastPurchaseCard status={"Expired"} />
                    <PastPurchaseCard status={"Upcoming"} />
                    <PastPurchaseCard status={"Upcoming"} />
                    <PastPurchaseCard status={"Expired"} />

                </div>

                <div className='hidden md:flex justify-end flex-col absolute -right-44 bottom-5'>
                    <div className='flex justify-between mb-2'>
                        {/* <button className='rounded-full p-2 hover:bg-[#A48533] bg-[#C0A04C]'>
                            <img className='h-6 ' src="/images/icons/uparrow.svg" alt="" />
                        </button> */}
                        <img className='h-10 ml-24' src="/images/icons/whatsapp-color.svg" alt="" />
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

export default PastPurchase