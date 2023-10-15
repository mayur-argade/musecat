import React from 'react'
import { Link } from 'react-router-dom'

const Tabbar = () => {

    return (
        <>
            <section>
                <nav className='shadow-lg hidden md:flex flex-wrap justify-center py-3 space-x-4'>
                    <Link to='/Category/events'>
                        <span className={`text-sm hover:underline hover:underline-offset-4 cursor-pointer ${window.location.pathname == '/Category/events' ? 'font-bold' : ''}`}>Events</span>
                    </Link>
                    <Link to='/Category/eat'>
                        <span className={`text-sm hover:underline hover:underline-offset-4 cursor-pointer ${window.location.pathname == '/Category/eat' ? 'font-bold' : ''}`}>Eat</span>
                    </Link>
                    <Link to='/Category/ladiesnight'>
                        <span className={`text-sm hover:underline hover:underline-offset-4 cursor-pointer ${window.location.pathname == '/Category/ladiesnight' ? 'font-bold' : ''}`}>Ladies Night</span>
                    </Link>
                    <Link to='/Category/weeklyoffers'>
                        <span className={`text-sm hover:underline hover:underline-offset-4 cursor-pointer ${window.location.pathname == '/Category/weeklyoffers' ? 'font-bold' : ''}`}>Weekly Offers</span>
                    </Link>
                    <Link to='/Category/thingstodo'>
                        <span className={`text-sm hover:underline hover:underline-offset-4 cursor-pointer ${window.location.pathname == '/Category/thingstodo' ? 'font-bold' : ''}`}>Things To Do</span>
                    </Link>
                    <Link to='/Category/staycation'>
                        <span className={`text-sm hover:underline hover:underline-offset-4 cursor-pointer ${window.location.pathname == '/Category/staycation' ? 'font-bold' : ''}`}>Staycation</span>
                    </Link>
                    <Link to='/Category/poolnbeach'>
                        <span className={`text-sm hover:underline hover:underline-offset-4 cursor-pointer ${window.location.pathname == '/Category/poolnbeach' ? 'font-bold' : ''}`}>Pool & beach</span>
                    </Link>
                    <Link to='/Category/kidscorner'>
                        <span className={`text-sm hover:underline hover:underline-offset-4 cursor-pointer ${window.location.pathname == '/Category/kidscorner' ? 'font-bold' : ''}`}>Kids Corner</span>
                    </Link>
                    <Link to='/Category/spaoffers'>
                        <span className={`text-sm hover:underline hover:underline-offset-4 cursor-pointer ${window.location.pathname == '/Category/spaoffers' ? 'font-bold' : ''}`}>Spa Offers</span>
                    </Link>
                </nav>
            </section>
        </>
    )
}

export default Tabbar