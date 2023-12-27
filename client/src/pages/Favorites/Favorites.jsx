import React, { useState, useEffect } from 'react'
import Navbar from '../../components/shared/Navbar/Navbar'
import Tabbar from '../../components/shared/Tabbar/Tabbar'
import FavoriteCard from '../../components/Cards/FavoriteCard'
import Footer from '../../components/shared/Footer/Footer'
import { Link, useNavigate } from 'react-router-dom'
import { ClientFavEventApi } from '../../http/index'
import BottomNav from '../../components/shared/BottomNav/BottomNav'
import SkeletonCard from '../../components/shared/skeletons/SkeletonCard'

const Favorites = () => {

    document.title = 'Favorites'


    const [response, setReponse] = useState({});

    const navigate = useNavigate();

    useEffect(() => {
        const fetchdata = async () => {
            try {
                const { data } = await ClientFavEventApi()
                // console.log(data.data)
                setReponse(data)
            } catch (error) {
                console.log(error)
            }
        }

        fetchdata()
    }, []);



    const handleBack = () => {
        navigate(-1); // This function will take you back to the previous page
    };
    return (
        <>
            <div className='appmargine'>
                <Navbar />
                <Tabbar />

                <section className='relative md:mr-48 md:ml-48 mt-5 l:ml-6 l:mr-6 mx-3'>
                    <div className="ml-3 hidden md:flex align-middle items-center">
                        <button  onClick={handleBack} className=' mt-1'>
                            <img className='h-14 w-14' src="/images/icons/back-button.png" alt="" />
                        </button>
                        <p className='text-2xl font-bold'>Favorites</p>
                    </div>

                    <div className="mx-2 grid grid-flow-row gap:6 md:gap-8 text-neutral-600 grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4">
                        {
                            response.data == null
                                ?
                                <>
                                    <SkeletonCard />
                                    <SkeletonCard />
                                    <SkeletonCard />
                                    <SkeletonCard />
                                    <SkeletonCard />
                                    <SkeletonCard />
                                </>
                                :
                                response.data.length > 0
                                    ?
                                    <>
                                        {
                                            response.data.map((event) => (
                                                <FavoriteCard data={event} />
                                            ))
                                        }
                                    </>
                                    :
                                    <div className='mb-10 md:ml-80 md:mt-20  flex items-center justify-center w-full'>
                                        <img className='h-52 md:h-60' src="/images/assets/nothing.png" alt="" />
                                    </div>
                        }
                    </div>

                    <div className='hidden md:flex justify-end flex-col absolute -right-44 bottom-5'>
                        <div className='flex justify-between mb-2'>
                            {/* <button className='rounded-full p-2 hover:bg-[#A48533] bg-[#C0A04C]'>
                            <img className='h-6 ' src="/images/icons/uparrow.svg" alt="" />
                        </button> */}
                            {/* <img className='h-10 ml-24' src="/images/icons/whatsapp-color.svg" alt="" /> */}
                            <button>
                            </button>
                        </div>
                        <button className='rounded-full hover:bg-[#A48533] bg-[#C0A04C] py-3 pr-6 pl-6 text-white font-semibold'>Need Help?</button>
                    </div>
                </section>

                <div className=''>
                    < Footer />
                </div>
            </div>
            <div>
                <BottomNav />
            </div>
        </>
    )

}

export default Favorites