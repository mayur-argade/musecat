import React, { useState, useEffect, useRef } from "react";
import UpcomingEventsCard from "../../../../components/Cards/UpcomingEventsCard";
import SkeletonCard from "../../../../components/shared/skeletons/SkeletonCard";
import {
    ClientUpcomingEvents,
    AllDateEvents,
    CalenderDates,
} from "../../../../http";
import { Link } from "react-router-dom";
import moment from "moment";
import MyCalender from "../../../../components/Calender/MyCalender";
import { useNavigate } from "react-router-dom";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

const UpcomingEvents = () => {
    const responsive = {
        superLargeDesktop: {
            // the naming can be any, depends on you.
            breakpoint: { max: 4000, min: 3000 },
            items: 5,
        },
        desktop: {
            breakpoint: { max: 3000, min: 1024 },
            items: 3,
        },
        tablet: {
            breakpoint: { max: 1024, min: 464 },
            items: 2,
        },
        mobile: {
            breakpoint: { max: 464, min: 0 },
            items: 2,
        },
    };

    const navigate = useNavigate();

    const [showCalender, setShowCalender] = useState(false);
    const [overflowing, setOverflowing] = useState(false);

    const [upcomingEvents, setUpcomingEvents] = useState([]);
    const [upcomingEventsLoading, setUpcomingEventsLoading] = useState(false);
    const next7Days = [];
    const currentDate = moment();
    const containerRef = useRef(null);
    const calendarRef = useRef(null);

    const formatPhoneNumber = (number) => {
        // Ensure the input is treated as a string
        const strNumber = String(number);

        // Check if the input has a country code
        const hasCountryCode = strNumber.startsWith("968");

        // Remove all non-digit characters
        const cleaned = strNumber.replace(/\D/g, "");

        // Extract the country code if present
        const countryCode = hasCountryCode ? "+968 " : "";

        // Remove country code from the number
        const numberWithoutCode = hasCountryCode ? cleaned.slice(3) : cleaned;

        // Match the remaining number
        const match = numberWithoutCode.match(/^(\d{4})(\d{4})$/);

        if (match) {
            return `${countryCode}${match[1]} ${match[2]}`;
        }

        return `+${number}`;
    };
    const handleCalenderClickOutside = (e) => {
        if (calendarRef.current && !calendarRef.current.contains(e.target)) {
            setShowCalender(false);
        }
    };

    const [showNumberBox, setShowNumberBox] = useState(false);
    const [numberInput, setNumberInput] = useState("");

    const handleNumberValue = (value) => {
        setNumberInput(value);
    };
    const handleShowNumberValue = (value) => {
        setShowNumberBox(value);
    };

    useEffect(() => {
        const fetchdata = async () => {
            const dateData = {
                date: moment().format("YYYY-MM-DD"),
            };
            setUpcomingEventsLoading(true);
            try {
                const { data } = await AllDateEvents(dateData);
                console.log("upcoming events data new", data);
                // Create an array to store all upcoming events
                const allUpcomingEvents = [];

                // Iterate over the date keys in the data
                Object.keys(data).forEach((date) => {
                    // Concatenate the events of the current date to the allUpcomingEvents array
                    allUpcomingEvents.push(...data[date]);
                });

                console.log("upcoming events", allUpcomingEvents);
                // Set the state with the collected events
                setUpcomingEvents(allUpcomingEvents);
                setUpcomingEventsLoading(false);
            } catch (error) {
                setUpcomingEventsLoading(false);
                console.log(error);
            } finally {
                setUpcomingEventsLoading(false);
            }
        };

        fetchdata();
    }, []);

    useEffect(() => {
        const container = containerRef.current;
        // setScrollRefresh(!scrollRefresh)
        if (container) {
            setOverflowing(container.scrollWidth > container.clientWidth);
        }
    }, []);

    useEffect(() => {
        document.addEventListener("mousedown", handleCalenderClickOutside);

        return () => {
            document.removeEventListener(
                "mousedown",
                handleCalenderClickOutside,
            );
        };
    }, []);

    let highlightedDates = []; // Dates to highlight
    if (upcomingEvents != null) {
        for (const event of upcomingEvents) {
            if (
                event.date &&
                event.date.dateRange &&
                event.date.dateRange.startDate &&
                event.date.dateRange.endDate
            ) {
                const startDate = moment(event.date.dateRange.startDate);
                const endDate = moment(event.date.dateRange.endDate);

                // Generate dates within the range and push them to the highlightedDates array
                while (startDate.isSameOrBefore(endDate)) {
                    highlightedDates.push(
                        new Date(startDate.format("YYYY-MM-DD")),
                    );
                    startDate.add(1, "days");
                }
            }
        }
    }

    for (let i = 0; i < 7; i++) {
        const formattedDate = currentDate.format("D MMM"); // Format date as "9 Sep"
        const acutaldate = moment(currentDate).format("YYYY-MM-DD");
        const dayOfWeek = currentDate.format("ddd"); // Get abbreviated day of the week like "Sat"
        next7Days.push({
            actualdate: acutaldate,
            date: formattedDate,
            day: dayOfWeek,
        });
        currentDate.add(1, "days"); // Move to the next day
    }

    const [useFullDate, setUseFullDate] = useState("");
    function setnewfilterdate(actualdate) {
        setUseFullDate(actualdate);
        // setDate(`?date=${actualdate}`)
        // console.log(actualdate)
    }

    useEffect(() => {
        document.addEventListener("mousedown", handleCalenderClickOutside);

        return () => {
            document.removeEventListener(
                "mousedown",
                handleCalenderClickOutside,
            );
        };
    }, []);

    const scrollLeft = () => {
        document.getElementById("upcomingContent").scrollLeft -= 400;
    };
    const scrollRight = () => {
        document.getElementById("upcomingContent").scrollLeft += 400;
    };

    return (
        <section className="flex justify-center items-center align-middle mt-5">
            <section className="w-full md:w-full sm:mx-5 md:mx-5 lg:w-10/12 md:w-8.5/12 xl:w-8.5/12 2xl:w-7/12">
                {upcomingEvents != null || upcomingEvents != undefined ? (
                    <>
                        {upcomingEvents.length == 0 ? (
                            <></>
                        ) : (
                            <div className="flex justify-between items-center ">
                                <div className="left">
                                    <span className="text-xl font-bold md:text-2xl md:font-[700]">
                                        What’s On
                                    </span>
                                </div>
                                <div className="flex items-center align-middle ">
                                    <div
                                        onClick={() => setShowCalender(true)}
                                        className="calender date-picker cursor-pointer "
                                    >
                                        <img
                                            className="calender h-8 mr-2 flex dark:hidden"
                                            src="/images/assets/calender-icon.png"
                                            alt=""
                                        />
                                        <img
                                            className="calender h-8 mr-2 hidden dark:flex"
                                            src="/images/icons/eventcal-light.svg"
                                            alt=""
                                        />
                                    </div>
                                    {showCalender && (
                                        <div>
                                            <div>
                                                <div className="calendar-overlay">
                                                    <div className="relative text-black">
                                                        <div className="absolute top-0">
                                                            <button
                                                                onClick={() =>
                                                                    setShowCalender(
                                                                        false,
                                                                    )
                                                                }
                                                                className="text-blue-500 hover:underline"
                                                            >
                                                                Cancel
                                                            </button>
                                                        </div>
                                                        <div ref={calendarRef}>
                                                            <MyCalender />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                    <div>
                                        <div className="hidden md:block flex space-x-1">
                                            {next7Days.map((item) => (
                                                <button
                                                    onClick={() =>
                                                        navigate(
                                                            `/category/events?date=${item.actualdate}`,
                                                        )
                                                    }
                                                    className={`hover:bg-black hover:text-white rounded-sm border-black dark:border-white pl-1 pr-1 text-xs border ${
                                                        useFullDate ==
                                                        item.actualdate
                                                            ? "bg-black text-white"
                                                            : ""
                                                    }`}
                                                >
                                                    <div className="flex flex-col">
                                                        <p>{item.day}</p>
                                                        <p className="font-semibold">
                                                            {item.date}
                                                        </p>
                                                    </div>
                                                </button>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="block md:hidden">
                                        <button className="hover:bg-black hover:text-white rounded-sm border-black pl-1 pr-1 text-xs border mr-2">
                                            <div
                                                onClick={() =>
                                                    navigate(
                                                        `/category/events?date=${next7Days[0].actualdate}`,
                                                    )
                                                }
                                                className="flex flex-col"
                                            >
                                                <p>{next7Days[0].day}</p>
                                                <p>{next7Days[0].date}</p>
                                            </div>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}
                    </>
                ) : (
                    <div className="flex justify-between items-center ">
                        <div className="left">
                            <span className="text-xl font-bold md:text-2xl md:font-[700]">
                                What’s On
                            </span>
                        </div>
                        <div className="flex items-center align-middle ">
                            <div
                                onClick={() => setShowCalender(true)}
                                className="calender date-picker cursor-pointer "
                            >
                                <img
                                    className="calender h-8 mr-2 flex dark:hidden"
                                    src="/images/assets/calender-icon.png"
                                    alt=""
                                />
                                <img
                                    className="calender h-8 mr-2 hidden dark:flex"
                                    src="/images/icons/eventcal-light.svg"
                                    alt=""
                                />
                            </div>
                            {showCalender && (
                                <div>
                                    <div>
                                        <div className="calendar-overlay">
                                            <div className="relative text-black">
                                                <div className="absolute top-0">
                                                    <button
                                                        onClick={() =>
                                                            setShowCalender(
                                                                false,
                                                            )
                                                        }
                                                        className="text-blue-500 hover:underline"
                                                    >
                                                        Cancel
                                                    </button>
                                                </div>
                                                <div ref={calendarRef}>
                                                    <MyCalender />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                            <div>
                                <div className="hidden md:block flex space-x-1">
                                    {next7Days.map((item) => (
                                        <button
                                            onClick={() =>
                                                setnewfilterdate(
                                                    item.actualdate,
                                                )
                                            }
                                            className={`hover:bg-black hover:text-white rounded-sm border-black dark:border-white pl-1 pr-1 text-xs border ${
                                                useFullDate == item.actualdate
                                                    ? "bg-black text-white"
                                                    : ""
                                            }`}
                                        >
                                            <div className="flex flex-col">
                                                <p>{item.day}</p>
                                                <p className="font-semibold">
                                                    {item.date}
                                                </p>
                                            </div>
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div className="block md:hidden">
                                <button className="hover:bg-black hover:text-white rounded-sm border-black pl-1 pr-1 text-xs border mr-2">
                                    <div
                                        onClick={() =>
                                            setnewfilterdate(
                                                next7Days[0].actualdate,
                                            )
                                        }
                                        className="flex flex-col"
                                    >
                                        <p>{next7Days[0].day}</p>
                                        <p>{next7Days[0].date}</p>
                                    </div>
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                <div>
                    <div
                        id="upcomingContent"
                        ref={containerRef}
                        className="pl-3 flex w-full overflow-x-auto"
                    >
                        {upcomingEvents == null ||
                        upcomingEvents == undefined ? (
                            <div className="h-30">
                                <SkeletonCard />
                            </div>
                        ) : upcomingEventsLoading ? (
                            <>
                                <div className="h-30">
                                    <SkeletonCard />
                                </div>
                            </>
                        ) : upcomingEvents.length === 0 ? (
                            <div className="flex justify-center">
                                {/* <img className='h-60' src="/images/assets/logo-main.png" alt="" /> */}
                            </div>
                        ) : (
                            <div className="w-full">
                                <Carousel responsive={responsive}>
                                    {upcomingEvents.map((event) => (
                                        <div className="">
                                            <UpcomingEventsCard
                                                event={event}
                                                showNumberBox={
                                                    handleShowNumberValue
                                                }
                                                setNumber={handleNumberValue}
                                            />
                                        </div>
                                    ))}
                                </Carousel>
                            </div>
                        )}
                    </div>
                </div>

                <div className="grid grid-cols-3 align-middle items-center">
                    <div className="w-30"></div>
                    <div>
                        <div className="mt-2 place-items-center  hidden md:flex  justify-center items-center space-x-4">
                            {overflowing && (
                                <>
                                    <button onClick={scrollLeft}>
                                        <img
                                            className="h-10 bg-white rounded-full"
                                            src="/images/icons/homebackarrow.svg"
                                            alt=""
                                        />
                                    </button>
                                    <button onClick={scrollRight}>
                                        <img
                                            className="h-10 bg-white rounded-full"
                                            src="/images/icons/homefrontarrow.svg"
                                            alt=""
                                        />
                                    </button>
                                </>
                            )}
                        </div>
                    </div>
                    {upcomingEvents != null && upcomingEvents.length != 0 && (
                        <div className="flex justify-end">
                            <Link
                                className="dark:hover:bg-gray-500 hover:bg-slate-100 rounded-md py-2 px-3 flex justify-center align-middle items-center"
                                to="/category/events"
                            >
                                <p className="font-medium underline underline-offset-1  pr-2 text-sm font-medium ">
                                    view all
                                </p>
                            </Link>
                        </div>
                    )}
                </div>
            </section>
            {showNumberBox && (
                <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
                    <div className="bg-white dark:bg-[#454545] dark:text-white p-4 rounded-lg relative  ml-3 mr-3">
                        <button
                            onClick={() => setShowNumberBox(false)}
                            className="absolute top-2 right-2 text-black hover:text-gray-800"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-6 w-6"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M6 18L18 6M6 6l12 12"
                                />
                            </svg>
                        </button>

                        <div className="p-4 flex space-x-3 align-middle justify-center items-center">
                            <img
                                className="h-6 mr-2"
                                src="/images/icons/phone.png"
                                alt=""
                            />
                            <span>{formatPhoneNumber(numberInput)}</span>
                        </div>
                        {/* <img className='pt-4' src={response.data.eventDetails.seatingMap} alt="Theater" /> */}
                    </div>
                </div>
            )}
        </section>
    );
};

export default UpcomingEvents;
