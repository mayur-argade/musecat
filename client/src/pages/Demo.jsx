import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Demo = () => {
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


    return (
        <>
            <div >
                <div className="relative rounded-md mt-10 mb-2 w-52 h-85 mx-3 max-h-96 bg-[#F3F3F3] top-0">
                    <div className='absolute top-0 left-0 flex flex-col '>
                        <img className="relative rounded-lg h-52 w-52 object-cover" src="/images/assets/bgHome.png" alt="" />
                        <button className="absolute top-2 right-2 bg-white text-black rounded-full z-20 p-2">
                            <img src="/images/icons/heart.svg" alt="" />
                        </button>
                        <div className='flex flex-col p-2'>
                            <p className='text-xs mt-2 font-bold'>tit;e,</p>
                            <p className='text-xs mt-2 font-bold'>location</p>
                            <p className="mt-1 mb-1 text-xs font-light">Events</p>
                        </div>
                        <div className="mx-2 mb-2 button">
                            <div className='flex items-center justify-between space-x-2'>

                                <Link className='button w-full' to={`/events/`}>
                                    <button type="button" className="text-white hover:bg-[#A48533]
bg-[#C0A04C] hover:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-xs md:text-sm px-2 py-2 text-center mr-3 md:mr-0 dark:bg-[#C0A04C] dark:hover:bg-white dark:focus:ring-blue-800 w-full">Book Now</button>
                                </Link>

                                <Link to='/contactus' className='hidden md:block w-full'>
                                    <button type="button" className="text-white bg-[#C0A04C] hover:bg-[#A48533] hover:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center mr-3 md:mr-0 dark:bg-[#C0A04C] dark:hover:bg-white dark:focus:ring-blue-800 w-full">Contact us</button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
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