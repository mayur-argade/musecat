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

            <section className='relative md:mr-48 md:ml-48 mt-5 ml-6 mr-6'>
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

                <div className='hidden md:flex justify-end flex-col absolute -right-44 bottom-5'>
                    <div className='flex justify-between mb-2'>
                        {/* <button className='rounded-full p-2 hover:bg-[#A48533] bg-[#C0A04C]'>
                            <img className='h-6 ' src="/images/icons/uparrow.svg" alt="" />
                        </button> */}
                        <img className='h-10 ml-24' src="/images/icons/whatsapp-color.svg" alt="" />
                        <button>
                        </button>
                    </div>
                    <button className='rounded-full hover:bg-[#A48533] bg-[#C0A04C] py-3 pr-6 pl-6 text-white font-semibold'>Need Help?</button>
                </div>
            </section>
            <div className=''>
                < Footer />
            </div>
        </>
    )
}

export default Favorites