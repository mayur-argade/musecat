import React, { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import moment from 'moment'
import CategoryCard from '../../../../components/Cards/CategoryCard'
import CategorySkeleton from '../../../../components/shared/skeletons/CategorySkeleton'
import { CategoryCount } from '../../../../http'

const PopularCategory = () => {
    const [selectedDay, setSelectedDay] = useState('')
    const [category, setCategory] = useState('')
    const [day, SetDay] = useState('')
    const [categoryLoading, setCategoryLoading] = useState(false)
    const containerRef = useRef(null);
    const [isOverflowing, setIsOverflowing] = useState(false);

    useEffect(() => {
        const container = containerRef.current;
        if (container) {
            setIsOverflowing(container.scrollWidth > container.clientWidth);
        }
    }, []);


    // Initialize an array to store the dates
    const daysAndDates = [];

    // Loop from Sunday to Monday and add each date to the array
    for (let i = 0; i <= 6; i++) {
        const day = moment().clone().add(i, 'days');
        daysAndDates.push({
            day: day.format('dddd'), // Get the day name (e.g., "Sunday")
            date: day.format('YYYY-MM-DD'), // Get the date (e.g., "2023-09-17")
        });
    }

    const [refresh, setRefresh] = useState(true)

    function setDayforCategory(passedDate) {
        setSelectedDay(passedDate)
        if (selectedDay == passedDate) {
            setSelectedDay('')
            SetDay('')
            setRefresh(!refresh)
        } else {
            SetDay(`?date=${passedDate}`)
            setRefresh(!refresh)
        }

    }

    const scrollLeft = () => {
        document.getElementById("content").scrollLeft -= 400;
    }
    const scrollRight = () => {
        document.getElementById("content").scrollLeft += 400;
    }

    useEffect(() => {
        const fetchdata = async () => {
            setCategoryLoading(true)
            try {
                const { data } = await CategoryCount(day)
                // console.log("categorydata", data)
                setCategory(data)

                setCategoryLoading(false)
            } catch (error) {
                setCategoryLoading(false)
                console.log(error)
            }
        }

        fetchdata()
    }, [day, refresh]);

    return (
        <div className='flex justify-center items-center align-middle mt-5'>
            <section className='w-full md:w-full sm:mx-5 md:mx-5 md:w-10/12 xl:w-9/12 2xl:w-7/12'>
                <div className='flex justify-between align-middle '>

                    <div className="left flex items-center align-middle ">
                        <span className='text-xl font-bold md:text-2xl md:font-[700]'>Popular Categories</span></div>

                    <div className="hidden right md:flex flex-wrap space-x-2">
                        {
                            daysAndDates.map((e) => (
                                <button
                                    onClick={() => setDayforCategory(e.date)}
                                    className={`md:block hover:bg-[#A48533] hover:text-white rounded-full  dark:border-white px-3 py-1 text-xs border ${selectedDay == e.date
                                        ? 'bg-[#C0A04C] border-[#A48533] text-white'
                                        : 'border-black'
                                        }`}
                                >
                                    {e.day}
                                </button>
                            ))
                        }

                        <div className='block selectoption pr-2 md:hidden'>
                            <select
                                id="countries"
                                className="bg-black border border-gray-300 text-white text-sm rounded-full focus:ring-[#C0A04C] focus:border-[#C0A04C] block w-full p-1.5 px-3.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-[#C0A04C] dark:focus:border-[#C0A04C]"
                            >
                                {daysAndDates.map((e) => (
                                    <option
                                        key={e.date} // Make sure to add a unique key prop when mapping in React
                                        value={e.date}
                                        onClick={() => setDayforCategory(e.date)}
                                        className={`hover:bg-[#C0A04C] hover:text-white rounded-full border-black px-3 py-1 text-xs border ${selectedDay == e.date ? 'bg-[#C0A04C] text-white' : '' // Apply different styling for the selected option
                                            }`}
                                    >
                                        {e.day}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                </div>
                <div>
                    <div id="content" ref={containerRef} className=' carousel p-4 flex items-center justify-start overflow-x-auto scroll-smooth md:scrollbar-hide space-x-5'>
                        {
                            category.data == null || category.data == undefined
                                ?
                                <>
                                    <div className='md:h-72 flex space-x-3'>
                                        <CategorySkeleton />
                                        <CategorySkeleton />
                                        <CategorySkeleton />
                                        <CategorySkeleton />
                                    </div>
                                </>
                                :
                                categoryLoading
                                    ?
                                    <>
                                        <div className='md:h-72 flex space-x-3'>
                                            <CategorySkeleton />
                                            <CategorySkeleton />
                                            <CategorySkeleton />
                                            <CategorySkeleton />
                                        </div>
                                    </>
                                    :
                                    category.data.length === 0
                                        ?
                                        <>
                                            <div className='flex justify-center'>
                                                <img className='h-60' src="/images/assets/logo-main.png" alt="" />
                                            </div>
                                        </>
                                        :
                                        category.data.map((category) => {
                                            return (
                                                <>
                                                    <Link to={`/category/${category.categoryURL}`} key={category._id}>
                                                        <div className='w-44 md:w-56'>
                                                            <CategoryCard data={category} />
                                                        </div>
                                                    </Link>

                                                </>
                                            );

                                        })
                        }
                    </div>
                </div>
                <div className='grid md:grid-cols-3 flex align-middle'>
                    <div className=""></div>

                    <div className=" hidden md:flex  justify-center items-center space-x-4">
                        {isOverflowing && (
                            <>
                                <button onClick={scrollLeft}>
                                    <img className='h-10' src="/images/icons/homebackarrow.svg" alt="" />
                                </button>
                                <button onClick={scrollRight}>
                                    <img className='h-10' src="/images/icons/homefrontarrow.svg" alt="" />
                                </button>
                            </>
                        )}
                    </div>

                    <div className=' flex justify-end space-x-1 align-middle items-center'>
                        <div className='flex justify-end align-middle items-center'>
                            <Link to='/whereto' className='w-30 dark:hover:bg-gray-500 hover:bg-slate-100 rounded-md py-2 px-4 flex justify-center align-middle items-center'>
                                <img className='dark:hidden flex h-6 mr-1' src="/images/icons/map.svg" alt="" />
                                <img className='hidden dark:flex h-6 mr-1' src="/images/icons/homeMap-light.svg" alt="" />
                                <p className='text-sm font-medium '>View map</p>
                            </Link>
                        </div>
                        <div className=''>
                            <Link className='w-30 dark:hover:bg-gray-500 hover:bg-slate-100 rounded-md py-2 px-3 flex justify-center align-middle items-center' to="/category/events">
                                <p className='font-medium underline underline-offset-1  pr-2 text-sm font-medium '>view all</p>
                            </Link>
                        </div>
                    </div>

                </div>
            </section>
        </div>

    )
}

export default PopularCategory