import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { GetAllCategory } from '../../../http/index'


const Tabbar = () => {

    const [category, setCategory] = useState([])
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        const fetchCategory = async () => {
            setLoading(true)
            try {
                const res = await GetAllCategory()
                setCategory(res.data)
                setLoading(false)
            } catch (error) {
                setLoading(false)
            }
        }

        fetchCategory()

    }, []);

    return (
        <>
            <section className=''>
                <nav className='shadow-lg hidden md:flex flex-wrap justify-center py-3 space-x-6 overflow-auto'>
                    {
                        loading ?
                            <>
                                <div class="animate-pulse  flex justify-center items-center w-full">
                                    <div class="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-24"></div>
                                    <div class="h-2.5 ms-2 bg-gray-300 rounded-full dark:bg-gray-600 w-24"></div>
                                    <div class="h-2.5 ms-2 bg-gray-300 rounded-full dark:bg-gray-600 w-24"></div>
                                    <div class="h-2.5 ms-2 bg-gray-300 rounded-full dark:bg-gray-600 w-24"></div>
                                    <div class="h-2.5 ms-2 bg-gray-200 rounded-full dark:bg-gray-700 w-24"></div>
                                    <div class="h-2.5 ms-2 bg-gray-300 rounded-full dark:bg-gray-600 w-24"></div>
                                </div>
                            </>
                            :
                            <>
                                <Link to={`/category/events`}>
                                    <span className={`text-sm hover:underline hover:underline-offset-4 cursor-pointer ${window.location.pathname == `/category/events` ? 'font-bold' : 'font-normal'}`}>Events</span>
                                </Link>
                                {
                                    category.data && category.data.length > 0 && (

                                        category.data.map((cat, index) => (
                                            <Link to={`/category/${cat.categoryURL}`}>
                                                <span class="ml-0 group text-black-500 transition-all duration-300 ease-in-out cursor-pointer">
                                                <span className={`ml-0 text-sm bg-left-bottom bg-gradient-to-r from-[#C0A04C] to-[#A48533] bg-[length:0%_2px] bg-no-repeat group-hover:bg-[length:100%_2px] transition-all duration-500 ease-out cursor-pointer  ${window.location.pathname == `/category/${cat.categoryURL}` ? 'font-bold' : 'font-normal'}`}>{cat.name}</span>
                                                </span>
                                            </Link>
                                        ))
                                    )
                                }
                            </>
                    }
                </nav>


            </section>
        </>
    )
}

export default Tabbar

