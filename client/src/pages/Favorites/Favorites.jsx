import React from 'react'
import Navbar from '../../components/shared/Navbar/Navbar'
import Tabbar from '../../components/shared/Tabbar/Tabbar'
import FavoriteCard from '../../components/Cards/FavoriteCard'
import Footer from '../../components/shared/Footer/Footer'
const Favorites = () => {
    return (
        <>
        <Navbar />
        <Tabbar />

        <section className='md:mr-48 md:ml-48 mt-5 ml-6 mr-6'>
            <div className="ml-3 hidden md:flex align-middle items-center">
                <button className=' mt-1'>
                    <img className='h-14 w-14' src="/images/icons/back-button.png" alt="" />
                </button>
                <p className='text-2xl font-bold'>Favorites</p>
            </div>

            <div className="grid  xs:grid-cols-2  justify-items-center md:flex-wrap gap-y-4 md:justify-center md:flex lg:grid-cols-2 xl:grid-cols-3 gap-4">
                <FavoriteCard />
                <FavoriteCard />
                <FavoriteCard />
                <FavoriteCard />
                <FavoriteCard />
                <FavoriteCard />
            </div>
        </section>
        <div className=''>
            < Footer />
        </div>
    </>
    )
}

export default Favorites