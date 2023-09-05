import React, { useState } from 'react';

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
        <div className="flex flex-col justify-center items-center h-screen">

        <table className="table-auto border-collapse w-80 p-5">
            <thead>
                <tr>
                    <th className="w-2 h-2 bg-gray-300"></th>
                    {Array.from({ length: numColumns }).map((_, col) => (
                        <th
                            key={col}
                            className="w-2 h-2 bg-gray-300 text-center text-gray-600"
                        >
                            {col + 1}
                        </th>
                    ))}
                </tr>
            </thead>
            <tbody>
                {Array.from({ length: numRows }).map((_, row) => (
                    <tr key={row} className='mb-4 p-5'>
                        <td className="w-8 h-8 bg-gray-300 text-center text-gray-600 ">
                            {String.fromCharCode(65 + row)}
                        </td>
                        {Array.from({ length: numColumns }).map((_, col) => (
                            <td
                                key={col}
                                className={`w-2 h-2 bg-gray-300 cursor-pointer `}
                                onClick={() => togglePlatinumSeatSelection(row, col)}
                            >
                                  <span className={`w-5 h-4 px-3 py-0.5 rounded-lg cursor-pointer ${isPlatinumSeatSelected(row, col) ? 'bg-red-500' : 'bg-white'} `}></span>
                                
                            </td>
                        ))}
                    </tr>
                ))}
            </tbody>
        </table>

        <table className="table-auto border-collapse">
            {/* Gold section code here */}
            <thead>
                <tr>
                    <th className="w-10 h-10 bg-gray-300"></th>
                    {Array.from({ length: numColumns }).map((_, col) => (
                        <th
                            key={col}
                            className="w-10 h-10 bg-gray-300 text-center text-gray-600"
                        >
                            {col + 1}
                        </th>
                    ))}
                </tr>
            </thead>
            <tbody>
                {Array.from({ length: numRows }).map((_, row) => (
                    <tr key={row}>
                        <td className="w-10 h-10 bg-gray-300 text-center text-gray-600">
                            {String.fromCharCode(65 + row)}
                        </td>
                        {Array.from({ length: numColumns }).map((_, col) => (
                            <td
                                key={col}
                                className={`w-10 h-10 bg-gray-300 cursor-pointer`}
                                onClick={() => toggleGoldSeatSelection(row, col)}
                            >
                                <span className={`w-7 h-7 rounded-lg ${isGoldSeatSelected(row, col) ? 'bg-red-500' : 'bg-white'}`}></span>
                            </td>
                        ))}
                    </tr>
                ))}
            </tbody>
        </table>
        <table className="table-auto border-collapse">
            {/* Silver section code here */}
            <thead>
                <tr>
                    <th className="w-10 h-10 bg-gray-300"></th>
                    {Array.from({ length: numColumns }).map((_, col) => (
                        <th
                            key={col}
                            className="w-10 h-10 bg-gray-300 text-center text-gray-600"
                        >
                            {col + 1}
                        </th>
                    ))}
                </tr>
            </thead>
            <tbody>
                {Array.from({ length: numRows }).map((_, row) => (
                    <tr key={row}>
                        <td className="w-10 h-10 bg-gray-300 text-center text-gray-600">
                            {String.fromCharCode(65 + row)}
                        </td>
                        {Array.from({ length: numColumns }).map((_, col) => (
                            <td
                                key={col}
                                className={`w-10 h-10 bg-gray-300 cursor-pointer`}
                                onClick={() => toggleSilverSeatSelection(row, col)}
                            >
                                <span className={`w-7 h-7 rounded-lg ${isSilverSeatSelected(row, col) ? 'bg-red-500' : 'bg-white'}`}></span>
                            </td>
                        ))}
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
    )
}

export default Demo