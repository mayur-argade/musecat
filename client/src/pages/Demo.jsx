import React, { useState, useEffect, useRef } from 'react';
import AddVenueModal from '../components/EditEventModal/AddVenueModal';

const Demo = () => {
    const [value, onChange] = useState(new Date());

    const [selectedPlatinumSeats, setSelectedPlatinumSeats] = useState([]);
    const [selectedGoldSeats, setSelectedGoldSeats] = useState([]);
    const [selectedSilverSeats, setSelectedSilverSeats] = useState([]);
    const numRows = 5; // Number of rows
    const numColumns = 11; // Number of columns

    // Function to toggle the selection of a seat in the platinum section
    const togglePlatinumSeatSelection = (row, col) => {
        const seat = `${String.fromCharCode(65 + row)}-${col + 1}`;
        setSelectedPlatinumSeats((prevSelectedSeats) => {
            if (prevSelectedSeats.includes(seat)) {
                // Deselect the seat
                return prevSelectedSeats.filter(
                    (selectedSeat) => selectedSeat !== seat
                );
            } else {
                // Select the seat
                return [...prevSelectedSeats, seat];
            }
        });
    };

    // Function to toggle the selection of a seat in the gold section
    const toggleGoldSeatSelection = (row, col) => {
        const seat = `${String.fromCharCode(65 + row)}-${col + 1}`;
        setSelectedGoldSeats((prevSelectedSeats) => {
            if (prevSelectedSeats.includes(seat)) {
                // Deselect the seat
                return prevSelectedSeats.filter(
                    (selectedSeat) => selectedSeat !== seat
                );
            } else {
                // Select the seat
                return [...prevSelectedSeats, seat];
            }
        });
    };

    // Function to toggle the selection of a seat in the silver section
    const toggleSilverSeatSelection = (row, col) => {
        const seat = `${String.fromCharCode(65 + row)}-${col + 1}`;
        setSelectedSilverSeats((prevSelectedSeats) => {
            if (prevSelectedSeats.includes(seat)) {
                // Deselect the seat
                return prevSelectedSeats.filter(
                    (selectedSeat) => selectedSeat !== seat
                );
            } else {
                // Select the seat
                return [...prevSelectedSeats, seat];
            }
        });
    };

    const isPlatinumSeatSelected = (row, col) => {
        return selectedPlatinumSeats.includes(`${String.fromCharCode(65 + row)}-${col + 1}`);
    };

    const isGoldSeatSelected = (row, col) => {
        return selectedGoldSeats.includes(`${String.fromCharCode(65 + row)}-${col + 1}`);
    };

    const isSilverSeatSelected = (row, col) => {
        return selectedSilverSeats.includes(`${String.fromCharCode(65 + row)}-${col + 1}`);
    };

    const dateInputRef = useRef(null);

    const openCalendar = () => {
        dateInputRef.current.click(); // Trigger the input's click event
    };
    return (

        <>
            <AddVenueModal />
        </>
        // <>
        //     <div class="bg-white">
        //         <div class="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        //             <h2 class="text-2xl font-bold tracking-tight text-gray-900">Customers also purchased</h2>

        //             <div class="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
        //                 <div class="group relative">
        //                     <div class="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
        //                         <img src="https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg" alt="Front of men&#039;s Basic Tee in black." class="h-full w-full object-cover object-center lg:h-full lg:w-full" />
        //                     </div>
        //                     <div class="mt-4 flex justify-between">
        //                         <div>
        //                             <h3 class="text-sm text-gray-700">
        //                                 <a href="#">
        //                                     <span aria-hidden="true" class="absolute inset-0"></span>
        //                                     Basic Tee
        //                                 </a>
        //                             </h3>
        //                             <p class="mt-1 text-sm text-gray-500">Black</p>
        //                         </div>
        //                         <p class="text-sm font-medium text-gray-900">$35</p>
        //                     </div>
        //                 </div>
        //                 <div class="group relative">
        //                     <div class="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
        //                         <img src="https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg" alt="Front of men&#039;s Basic Tee in black." class="h-full w-full object-cover object-center lg:h-full lg:w-full" />
        //                     </div>
        //                     <div class="mt-4 flex justify-between">
        //                         <div>
        //                             <h3 class="text-sm text-gray-700">
        //                                 <a href="#">
        //                                     <span aria-hidden="true" class="absolute inset-0"></span>
        //                                     Basic Tee
        //                                 </a>
        //                             </h3>
        //                             <p class="mt-1 text-sm text-gray-500">Black</p>
        //                         </div>
        //                         <p class="text-sm font-medium text-gray-900">$35</p>
        //                     </div>
        //                 </div>
        //                 <div class="group relative">
        //                     <div class="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
        //                         <img src="https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg" alt="Front of men&#039;s Basic Tee in black." class="h-full w-full object-cover object-center lg:h-full lg:w-full" />
        //                     </div>
        //                     <div class="mt-4 flex justify-between">
        //                         <div>
        //                             <h3 class="text-sm text-gray-700">
        //                                 <a href="#">
        //                                     <span aria-hidden="true" class="absolute inset-0"></span>
        //                                     Basic Tee
        //                                 </a>
        //                             </h3>
        //                             <p class="mt-1 text-sm text-gray-500">Black</p>
        //                         </div>
        //                         <p class="text-sm font-medium text-gray-900">$35</p>
        //                     </div>
        //                 </div>
        //             </div>
        //         </div>
        //     </div>
        // </>
        //         <>
        //             {/* <div >
        //                 <div className="relative rounded-md mt-10 mb-2 w-52 h-85 mx-3 max-h-96 bg-[#F3F3F3] top-0">
        //                     <div className='absolute top-0 left-0 flex flex-col '>
        //                         <img className="relative rounded-lg h-52 w-52 object-cover" src="/images/assets/bgHome.png" alt="" />
        //                         <button className="absolute top-2 right-2 bg-white text-black rounded-full z-20 p-2">
        //                             <img src="/images/icons/heart.svg" alt="" />
        //                         </button>
        //                         <div className='flex flex-col p-2'>
        //                             <p className='text-xs mt-2 font-bold'>tit;e,</p>
        //                             <p className='text-xs mt-2 font-bold'>location</p>
        //                             <p className="mt-1 mb-1 text-xs font-light">Events</p>
        //                         </div>
        //                         <div className="mx-2 mb-2 button">
        //                             <div className='flex items-center justify-between space-x-2'>

        //                                 <Link className='button w-full' to={`/events/`}>
        //                                     <button type="button" className="text-white hover:bg-[#A48533]
        // bg-[#C0A04C] hover:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-xs md:text-sm px-2 py-2 text-center mr-3 md:mr-0 dark:bg-[#C0A04C] dark:hover:bg-white dark:focus:ring-blue-800 w-full">Book Now</button>
        //                                 </Link>

        //                                 <Link to='/contactus' className='hidden md:block w-full'>
        //                                     <button type="button" className="text-white bg-[#C0A04C] hover:bg-[#A48533] hover:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center mr-3 md:mr-0 dark:bg-[#C0A04C] dark:hover:bg-white dark:focus:ring-blue-800 w-full">Contact us</button>
        //                                 </Link>
        //                             </div>
        //                         </div>
        //                     </div>
        //                 </div>
        //             </div> */}

        //             <div className="calendar-container">
        //                 <label>Select Date:</label>
        //                 <input
        //                     type="date"
        //                     className="calendar-input"
        //                     ref={dateInputRef}
        //                 />
        //                 <div className="calendar-trigger" onClick={openCalendar}></div>
        //             </div>
        //         </>
    )

    // <div className="flex flex-col justify-center items-center h-screen">

    //         <table className="table-auto border-collapse w-80 p-5">
    //             <thead>
    //                 <tr>
    //                     <th className="w-2 h-2 bg-gray-300"></th>
    //                     {Array.from({ length: numColumns }).map((_, col) => (
    //                         <th
    //                             key={col}
    //                             className="w-2 h-2 bg-gray-300 text-center text-gray-600"
    //                         >
    //                             {col + 1}
    //                         </th>
    //                     ))}
    //                 </tr>
    //             </thead>
    //             <tbody>
    //                 {Array.from({ length: numRows }).map((_, row) => (
    //                     <tr key={row} className='mb-4 p-5'>
    //                         <td className="w-8 h-8 bg-gray-300 text-center text-gray-600 ">
    //                             {String.fromCharCode(65 + row)}
    //                         </td>
    //                         {Array.from({ length: numColumns }).map((_, col) => (
    //                             <td
    //                                 key={col}
    //                                 className={`w-2 h-2 bg-gray-300 cursor-pointer `}
    //                                 onClick={() => togglePlatinumSeatSelection(row, col)}
    //                             >
    //                                 <span className={`w-5 h-4 px-3 py-0.5 rounded-lg cursor-pointer ${isPlatinumSeatSelected(row, col) ? 'bg-red-500' : 'bg-white'} `}></span>

    //                             </td>
    //                         ))}
    //                     </tr>
    //                 ))}
    //             </tbody>
    //         </table>

    //         <table className="table-auto border-collapse">
    //             {/* Gold section code here */}
    //             <thead>
    //                 <tr>
    //                     <th className="w-10 h-10 bg-gray-300"></th>
    //                     {Array.from({ length: numColumns }).map((_, col) => (
    //                         <th
    //                             key={col}
    //                             className="w-10 h-10 bg-gray-300 text-center text-gray-600"
    //                         >
    //                             {col + 1}
    //                         </th>
    //                     ))}
    //                 </tr>
    //             </thead>
    //             <tbody>
    //                 {Array.from({ length: numRows }).map((_, row) => (
    //                     <tr key={row}>
    //                         <td className="w-10 h-10 bg-gray-300 text-center text-gray-600">
    //                             {String.fromCharCode(65 + row)}
    //                         </td>
    //                         {Array.from({ length: numColumns }).map((_, col) => (
    //                             <td
    //                                 key={col}
    //                                 className={`w-10 h-10 bg-gray-300 cursor-pointer`}
    //                                 onClick={() => toggleGoldSeatSelection(row, col)}
    //                             >
    //                                 <span className={`w-5 h-4 px-3 py-0.5 rounded-lg cursor-pointer ${isGoldSeatSelected(row, col) ? 'bg-red-500' : 'bg-white'} `}></span>
    //                             </td>
    //                         ))}
    //                     </tr>
    //                 ))}
    //             </tbody>
    //         </table>
    //         <table className="table-auto border-collapse">
    //             {/* Silver section code here */}
    //             <thead>
    //                 <tr>
    //                     <th className="w-10 h-10 bg-gray-300"></th>
    //                     {Array.from({ length: numColumns }).map((_, col) => (
    //                         <th
    //                             key={col}
    //                             className="w-10 h-10 bg-gray-300 text-center text-gray-600"
    //                         >
    //                             {col + 1}
    //                         </th>
    //                     ))}
    //                 </tr>
    //             </thead>
    //             <tbody>
    //                 {Array.from({ length: numRows }).map((_, row) => (
    //                     <tr key={row}>
    //                         <td className="w-10 h-10 bg-gray-300 text-center text-gray-600">
    //                             {String.fromCharCode(65 + row)}
    //                         </td>
    //                         {Array.from({ length: numColumns }).map((_, col) => (
    //                             <td
    //                                 key={col}
    //                                 className={`w-10 h-10 bg-gray-300 cursor-pointer`}
    //                                 onClick={() => toggleSilverSeatSelection(row, col)}
    //                             >
    //                                 <span className={`w-5 h-4 px-3 py-0.5 rounded-lg cursor-pointer ${isSilverSeatSelected(row, col) ? 'bg-red-500' : 'bg-white'} `}></span>
    //                             </td>
    //                         ))}
    //                     </tr>
    //                 ))}
    //             </tbody>
    //         </table>
    //     </div>

}

export default Demo