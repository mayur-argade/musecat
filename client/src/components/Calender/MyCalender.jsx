import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { CalenderDates } from '../../http/index';
import { useNavigate } from 'react-router-dom'
import moment from 'moment'
const MyCalender = () => {
    const navigate = useNavigate();

    const [highlightedDates, setHighlightedDates] = useState([]);
    const [date, setDate] = useState()

    useEffect(() => {
        const fetchdata = async () => {
            try {
                const { data } = await CalenderDates();
                setHighlightedDates(data.data.map(dateString => new Date(dateString))); // Convert to Date objects
                console.log("highlighted dates", data.data);
            } catch (error) {
                console.error("Error fetching data", error);
            } finally {
                console.log("Data fetch attempt complete");
            }
        };

        fetchdata();
    }, []);

    const handleDateChange = (newDate) => {
        setDate(newDate);
        console.log(date)
        navigate(`category/events?date=${moment(newDate).format('YYYY-MM-DD')}`)
    };

    console.log("Highlightes Dates ", highlightedDates)

    return (
        <Calendar
            className='relative z-50 w-80 rounded-lg border-none drop-shadow-md text-xs'
            value={date}
            onChange={handleDateChange}
            tileContent={({ date, view }) =>
                view === 'month' && highlightedDates.some((highlightedDate) =>
                    highlightedDate.getDate() === date.getDate() &&
                    highlightedDate.getMonth() === date.getMonth() &&
                    highlightedDate.getFullYear() === date.getFullYear()
                ) ? (
                    <div className="highlighted-date">
                        <img className='animate-ping flex h-1.5' src="/images/icons/dot.png" alt="" />
                    </div>
                ) : null
            }
        />
    );
};

export default MyCalender;
