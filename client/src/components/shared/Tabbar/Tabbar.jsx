import React from 'react'
import { Link } from 'react-router-dom'

const Tabbar = () => {
    return (
        <>
            <nav className='shadow-md hidden md:flex justify-center py-3 space-x-4'>
                <Link to='/Category/events'>
                    <span className='font-medium hover:underline hover:underline-offset-4 cursor-pointer'>Events</span>
                </Link>
                <Link to='/Category/eat'>
                    <span className='font-medium hover:underline hover:underline-offset-4 cursor-pointer'>Eat</span>
                </Link>
                <Link to='/Category/ladiesnight'>
                    <span className='font-medium hover:underline hover:underline-offset-4 cursor-pointer'>Ladies Night</span>
                </Link>
                <Link to='/Category/weeklyoffers'>
                    <span className='font-medium hover:underline hover:underline-offset-4 cursor-pointer'>Weekly Offers</span>
                </Link>
                <Link to='/Category/thingstodo'>
                    <span className='font-medium hover:underline hover:underline-offset-4 cursor-pointer'>Things To Do</span>
                </Link>
                <Link to='/Category/staycation'>
                    <span className='font-medium hover:underline hover:underline-offset-4 cursor-pointer'>Staycation</span>
                </Link>
                <Link to='/Category/poolnbeach'>
                    <span className='font-medium hover:underline hover:underline-offset-4 cursor-pointer'>Pool & beach</span>
                </Link>
                <Link to='/Category/kidscorner'>
                    <span className='font-medium hover:underline hover:underline-offset-4 cursor-pointer'>Kids Corner</span>
                </Link>
                <Link to='/Category/spaoffers'>
                    <span className='font-medium hover:underline hover:underline-offset-4 cursor-pointer'>Spa Offers</span>
                </Link>
            </nav>
        </>
    )
}

export default Tabbar