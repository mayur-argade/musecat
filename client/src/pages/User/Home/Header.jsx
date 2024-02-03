import React from 'react'

const Header = () => {

    const isStandalone = window.matchMedia('(display-mode: standalone)').matches;

    return (
        <>
            {
                isStandalone || window.isNative == true
                    ?
                    <>
                    </>
                    :
                    <div
                        class="NoHeader bg-center bg-no-repeat bg-cover bg-[url('https://res.cloudinary.com/mayurs-media/image/upload/v1692687464/bgHome_byrjjp.jpg')]">
                        <header className='p-5 md:p-10 '>

                            <div className="">
                                <div
                                    className={` bottom-0 transition ease-in-out delay-200 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
                                        }`}
                                >
                                    <div className='flex justify-center md: pt-0 md:p-10'>
                                        <p className='pb-5 leading-loose text-4xl md:text-4xl text-center text-white font-bold'>
                                            <span className='dark:text-black'>Find the</span>
                                            <br className='block md:hidden' />
                                            <span className='dark:text-black'>perfect</span>
                                            <br className='block md:hidden' />

                                            <span className='dark:text-black'>experience</span>


                                            {/* <div className='md:hidden absolute top-0 right-0'>
                                            <img className='h-12' src="/images/assets/download-banner.png" alt="" />
                                        </div> */}



                                            <div className=' flex md:hidden items-center justify-center '>
                                                <div className='bg-white-600 backdrop-blur-md backdrop-greyscale-2 backdrop-opacity-80 border border-t-white border-l-white rounded-md w-11/12 md:w-2/3 flex items-center justify-center flex-col p-3 rounded-lg'>
                                                    <p className='text-xl font-semibold text-white mb-3'>
                                                        Where To ?
                                                    </p>

                                                    <form>
                                                        <div class="p-3">
                                                            <div class="z-10 relative ">
                                                                <input
                                                                    onChange={((e) => setQuery(e.target.value))}
                                                                    type="search" id="location-search" class="bg-[#E7E7E7] block p-2.5 w-72 z-20 text-xs text-gray-500 font-normal rounded-r-lg rounded-l-lg border-l-gray-50 border-l-2 border border-gray-300 focus:ring-[#C0A04C] focus:border-[#C0A04C] dark:bg-gray-700 dark:border-l-gray-700  dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-[#C0A04C]" placeholder="Search for anything on muscat" required />

                                                                <button
                                                                    onClick={() => {
                                                                        // Check if the query is not empty before navigating
                                                                        if (query.trim() !== '') {
                                                                            navigate(`/Category/events?search=${query}`);
                                                                        }
                                                                    }}
                                                                    type="button" class="absolute top-0 right-0 h-full p-2.5 text-sm font-medium text-white bg-[#C0A04C] rounded-r-lg border border-[#C0A04C] hover:bg-[#C0A04C]  focus:[#A48533] dark:bg-[#C0A04C] dark:hover:bg-[#C0A04C] dark:focus:ring-[#C0A04C]">
                                                                    <img className='h-5' src="/images/icons/home-search.svg" alt="" />
                                                                    <span class="sr-only">Search</span>
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </form>


                                                </div>
                                            </div>

                                            <span className='dark:text-black'>in</span>
                                            <br className='md:block hidden' />
                                            <span className='dark:text-black'> any </span>
                                            <br className='block md:hidden' />

                                            <span className='dark:text-black'>destination</span>
                                        </p>
                                    </div>

                                    <div onClick={() => setShowLinks(!showLinks)} className='hidden md:block z-50 '>
                                        <button
                                            ref={followButtonRef}
                                            className='m-0 -right-10 absolute  text-white bg-[#C0A04C] hover:bg-[#A48533] text-sm font-semibold py-2 pl-7 pr-6 rounded-l-full'>
                                            Follow Us
                                        </button>
                                        {showLinks
                                            ?
                                            <div
                                                className='-right-10 absolute  px-3 bg-white rounded-l-full flex space-x-2 py-2'>
                                                <a blank href="https://wa.me/+96891738405">
                                                    <img className='h-7' src="/images/icons/wp-a.svg" alt="" />
                                                </a>
                                                <a href="https://www.facebook.com/muscatwhereto">
                                                    <img className='h-7' src="/images/icons/fb-a.svg" alt="" />
                                                </a>

                                                <a href="https://www.instagram.com/muscat_whereto/">
                                                    <img className='h-7' src="/images/icons/ig-a.svg" alt="" />
                                                </a>
                                                <a href="mailto:info@muscatwhereto.com">
                                                    <img className='h-7' src="/images/icons/emal-a.svg" alt="" />
                                                </a>
                                            </div>
                                            :
                                            <>
                                            </>
                                        }
                                    </div>

                                    <div className='hidden md:flex items-center justify-center '>
                                        <div className='bg-white dark:border-0 border-2 w-11/12 md:w-2/3 flex items-center justify-center flex-col p-3 rounded-lg dark:bg-[#2c2c2c] '>
                                            <div>
                                                <span className='text-xl font-bold'>
                                                    Where To ?
                                                </span>
                                            </div>
                                            <div className='flex w-full justify-center'>
                                                <div className='w-full flex grow '>
                                                    <input onChange={((e) => setQuery(e.target.value))} type="text" id="default-input" placeholder='Search by experience, Food & wine, Live Events, Attractions, e.g. ' class="bg-[#E7E7E7] border border-gray-300 focus:ring-[#C0A04C] focus:border-[#C0A04C] text-gray-900 text-xs rounded-lg block md:w-full p-3 mx-3 dark:bg-[#454545] dark:border-0 dark:placeholder-gray-400 dark:text-white dark:focus:ring-[#C0A04C] dark:focus:border-[#C0A04C]" />
                                                </div>

                                                <div className='flex mx-auto justify-center'>
                                                    <button onClick={() => {
                                                        // Check if the query is not empty before navigating
                                                        if (query.trim() !== '') {
                                                            navigate(`/Category/events?search=${query}`);
                                                        }
                                                    }}
                                                        type="button" class="shadow-lg shadow-cyan-500/25 align-middle text-white bg-[#C0A04C] hover:bg-[#A48533] hover:text-white focus:[#A48533] font-medium rounded-lg text-sm px-8 py-2 text-center mr-3 md:mr-0 dark:bg-[#454545] dark:hover:bg-gray-500 dark:focus:ring-[#C0A04C] flex align-middle justify-center items-center">
                                                        <img src="/images/icons/search1.svg" className="h-4 w-4" alt="" srcset="" />
                                                        <span>Search</span>
                                                    </button>
                                                </div>
                                            </div>


                                            <div className='flex flex-wrap align-middle items-center justify-between mt-5 w-full'>
                                                <div>
                                                    <p className='hidden font-bold text-md md:block text-left align-middle mb-1'>
                                                        Popular Searches
                                                    </p>
                                                    <div className='hidden md:flex flex-wrap justify-between space-y-2 md:space-x-52'>
                                                        <div className='flex flex-wrap justify-center md:space-x-2  '>
                                                            <Link className='my-1' to='/category/staycation'>
                                                                <button className='rounded-full border border-black dark:border-white pr-4 pl-4 h-6 text-xs hover:bg-black hover:text-white'>staycation</button>
                                                            </Link>
                                                            <Link className='my-1' to='/category/events'>
                                                                <button className='rounded-full border border-black dark:border-white pr-4 pl-4 h-6 text-xs hover:bg-black hover:text-white'>friday bunch</button>
                                                            </Link>
                                                            <Link className='my-1' to='/category/thingstodo'>
                                                                <button className='rounded-full border border-black dark:border-white pr-4 pl-4 h-6 text-xs hover:bg-black hover:text-white'>Things to do</button>
                                                            </Link>
                                                            <Link className='my-1' to='/category/kidscorner'>
                                                                <button className='rounded-full border border-black dark:border-white pr-4 pl-4 h-6 text-xs hover:bg-black hover:text-white'>kids corner</button>
                                                            </Link>
                                                            <Link className='my-1' to='/category/weeklyoffers'>
                                                                <button className='rounded-full border border-black dark:border-white pr-4 pl-4 h-6 text-xs hover:bg-black hover:text-white'>Weekly Offers</button>
                                                            </Link>
                                                            <Link className='my-1' to='/category/ladiesnight'>
                                                                <button className='rounded-full border border-black dark:border-white pr-4 pl-4 h-6 text-xs hover:bg-black hover:text-white'>Ladies Night</button>
                                                            </Link>
                                                            <Link className='my-1' to='/category/editorspick'>
                                                                <button className='rounded-full border border-black dark:border-white pr-4 pl-4 h-6 text-xs hover:bg-black hover:text-white'>Editor's Pick</button>
                                                            </Link>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </header>
                    </div>
            }
        </>
    )
}

export default Header