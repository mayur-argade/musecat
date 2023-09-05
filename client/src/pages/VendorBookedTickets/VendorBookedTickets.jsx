import React, {useState, useEffect, useRef} from 'react'
import Navbar from '../../components/shared/Navbar/Navbar'
import Table from '../../components/Table/Table';
import Footer from '../../components/shared/Footer/Footer';
import { useNavigate } from 'react-router-dom';

const VendorBookedTickets = () => {
    document.title = 'Vendor ~ Booked Tickets'

    const navigate = useNavigate();
    const handleBack = () => {
        navigate(-1); // This function will take you back to the previous page
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

    return (
        <>
            <div className='shadow-md'>
                <Navbar />
            </div>

            <section className='relative md:mr-48 md:ml-48 mt-5 ml-6 mr-6'>
                <div className='flex align-middle items-center  justify-between'>
                    <div className="flex align-middle items-center">
                    <button onClick={handleBack} className=' mt-1'>
                        <img className='h-14 w-14' src="/images/icons/back-button.png" alt="" />
                    </button>
                        <p className='text-xl font-bold'>Booked Tickets</p>
                    </div>

                    <div className="flex space-x-2 align-middle">
                        <div class="filterbyfeature">
                            <div className="relative inline-block text-left">
                                <button
                                    onClick={toggleDropdown}
                                    className="flex align-middle space-x-3 bg-gray-50 border border-gray-300 text-gray-900 md:text-sm text-md rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-28 md:w-52 p-1.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                >
                                    <span className='hidden md:block text-gray-500'>Filter by Categories</span>
                                    <span className='md:hidden block text-gray-500'>Filter</span>

                                    <img src="/images/icons/filter.svg" alt="" />
                                </button>
                                {isOpen && (
                                    <div
                                        className="origin-top-right absolute right-0 mt-2 w-36 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 w-52 z-50"
                                        ref={dropdownRef}
                                    >
                                        <div className="p-5">
                                            <div className="popular">
                                                <span className='ml-0 font-semibold text-sm'>Row</span>
                                                <div class="flex items-center mb-1 mt-2">
                                                    <input id="platinum" type="checkbox" value="" class="w-4 h-4 text-[#C0A04C] border-gray-300 rounded focus:ring-[#A48533] dark:focus:ring-[#C0A04C] dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                                    <label for="platinum" class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Platinum</label>
                                                </div>

                                                <div class="flex items-center mb-1">
                                                    <input id="gold" type="checkbox" value="" class="w-4 h-4 text-[#C0A04C] border-gray-300 rounded focus:ring-[#A48533] dark:focus:ring-[#C0A04C] dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                                    <label for="gold" class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Gold</label>
                                                </div>

                                                <div class="flex items-center mb-1">
                                                    <input id="silver" type="checkbox" value="" class="w-4 h-4 text-[#C0A04C] border-gray-300 rounded focus:ring-[#A48533] dark:focus:ring-[#C0A04C] dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                                    <label for="silver" class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Silver</label>
                                                </div>
                                            </div>

                                            <hr className='h-px my-3 bg-gray-500 border-0 dark:bg-gray-700' />

                                            <div className="distance">
                                                <span className='ml-0 font-semibold text-sm'>Class</span>
                                                <div class="flex items-center mb-1 mt-2">
                                                    <input id="platinumclass" type="checkbox" value="" class="w-4 h-4 text-[#C0A04C] border-gray-300 rounded focus:ring-[#A48533] dark:focus:ring-[#C0A04C] dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                                    <label for="platinumclass" class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Platinum</label>
                                                </div>

                                                <div class="flex items-center mb-1">
                                                    <input id="goldclass" type="checkbox" value="" class="w-4 h-4 text-[#C0A04C] border-gray-300 rounded focus:ring-[#A48533] dark:focus:ring-[#C0A04C] dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                                    <label for="goldclass" class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Gold</label>
                                                </div>

                                                <div class="flex items-center mb-1">
                                                    <input id="silverclass" type="checkbox" value="" class="w-4 h-4 text-[#C0A04C] border-gray-300 rounded focus:ring-[#A48533] dark:focus:ring-[#C0A04C] dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                                    <label for="silverclass" class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Silver</label>
                                                </div>


                                            </div>

                                            <hr className='h-px my-3 bg-gray-500 border-0 dark:bg-gray-700' />

                                            <div className="timings">
                                                <span className='ml-0 font-semibold text-sm'>Rows</span>
                                                <div class="flex items-center mb-1 mt-2">
                                                    <input id="atop" type="checkbox" value="" class="w-4 h-4 text-[#C0A04C] border-gray-300 rounded focus:ring-[#A48533] dark:focus:ring-[#C0A04C] dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                                    <label for="atop" class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">A to O platinum</label>
                                                </div>

                                                <div class="flex items-center mb-1">
                                                    <input id="otzp" type="checkbox" value="" class="w-4 h-4 text-[#C0A04C] border-gray-300 rounded focus:ring-[#A48533] dark:focus:ring-[#C0A04C] dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                                    <label for="otzp" class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">O to Z platinum</label>
                                                </div>

                                                <div class="flex items-center mb-1">
                                                    <input id="atog" type="checkbox" value="" class="w-4 h-4 text-[#C0A04C] border-gray-300 rounded focus:ring-[#A48533] dark:focus:ring-[#C0A04C] dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                                    <label for="atog" class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">A to O Gold</label>
                                                </div>

                                                <div class="flex items-center mb-1">
                                                    <input id="otzg" type="checkbox" value="" class="w-4 h-4 text-[#C0A04C] border-gray-300 rounded focus:ring-[#A48533] dark:focus:ring-[#C0A04C] dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                                    <label for="otzg" class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">O to Z Gold</label>
                                                </div>

                                                <div class="flex items-center mb-1">
                                                    <input id="atos" type="checkbox" value="" class="w-4 h-4 text-[#C0A04C] border-gray-300 rounded focus:ring-[#A48533] dark:focus:ring-[#C0A04C] dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                                    <label for="atos" class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">A to O silver</label>
                                                </div>

                                                <div class="flex items-center mb-1">
                                                    <input id="otzs" type="checkbox" value="" class="w-4 h-4 text-[#C0A04C] border-gray-300 rounded focus:ring-[#A48533] dark:focus:ring-[#C0A04C] dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                                    <label for="otzs" class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">O to Z silver</label>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="flex align-middle justify-center items-center totalseats space-x-2">
                            <p className='font-semibold text-sm'>total seats sold</p>
                            <p className='text-white font-semibold bg-black px-4 py-2 rounded-lg text-sm'>135</p>
                        </div>
                        <button type="button" class="flex justify-center items-center align-middle space-x-1 text-white bg-[#C0A04C] hover:bg-[#A48533] hover:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-1 text-center mr-3 md:mr-0 dark:bg-[#C0A04C] dark:hover:bg-white dark:focus:ring-blue-800">
                            <p>Export</p>
                            <img src="/images/icons/export.svg" alt="" />
                        </button>
                    </div>
                </div>

                <div className="">
                <Table />
                </div>

                <div className='hidden md:flex justify-end flex-col absolute -right-36 bottom-0'>
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

export default VendorBookedTickets