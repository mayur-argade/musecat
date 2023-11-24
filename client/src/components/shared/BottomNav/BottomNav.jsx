import React, { useState, useEffect } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom';

const BottomNav = () => {


    const navigate = useNavigate()
    const [isStandalone, setIsStandalone] = useState(false);

    useEffect(() => {
        // Check if the PWA is in standalone mode
        const mediaQuery = window.matchMedia('(display-mode: standalone)');
        setIsStandalone(mediaQuery.matches);

        // Listen for changes to the display mode
        const handleChange = (event) => {
            setIsStandalone(event.matches);
        };

        mediaQuery.addEventListener('change', handleChange);

        // Clean up the event listener
        return () => {
            mediaQuery.removeEventListener('change', handleChange);
        };
    }, []);

    // console.log(isStandalone)


    return (
        <>
            {
                isStandalone
                    ?
                    <div class="fixed bottom-0 left-0 z-50 w-full h-16 bg-white border-t border-gray-200 dark:bg-gray-700 dark:border-gray-600">
                        <div class="grid h-full max-w-lg grid-cols-5 mx-auto font-medium">
                            <button onClick={() => (navigate("/"))} type="button" class="inline-flex flex-col items-center justify-center px-5 hover:bg-gray-50 dark:hover:bg-gray-800 group">
                                {
                                    window.location.pathname == "/" ?
                                        <img src="/images/icons/pwa-home-active.svg" alt="" />
                                        :
                                        <img src="/images/icons/pwa-home.svg" alt="" />
                                }

                                <p class="text-sm text-gray-500 dark:text-gray-400 group-hover:font-bold dark:group-hover:text-blue-500">Home</p>
                            </button>
                            <button onClick={() => navigate('/events')} type="button" class="inline-flex flex-col items-center justify-center px-5 hover:bg-gray-50 dark:hover:bg-gray-800 group">
                                {
                                    window.location.pathname == "/events" ?
                                        <img src="/images/icons/pwa-events-active.svg" alt="" />
                                        :
                                        <img src="/images/icons/pwa-events.svg" alt="" />
                                }
                                <p class="text-sm text-gray-500 dark:text-gray-400 group-hover:font-bold dark:group-hover:text-blue-500">Events</p>
                            </button>
                            <button onClick={() => navigate("/searchpage")} type="button" class="inline-flex flex-col items-center justify-center px-5 hover:bg-gray-50 dark:hover:bg-gray-800 group">
                                {
                                    window.location.pathname == "/searchpage" ?
                                        <img src="/images/icons/pwa-search-active.svg" alt="" />
                                        :
                                        <img src="/images/icons/pwa-search.svg" alt="" />
                                }
                                <p class="text-sm text-gray-500 dark:text-gray-400 group-hover:font-bold dark:group-hover:text-blue-500">Search</p>
                            </button>

                            <button onClick={() => navigate('/favorites')} type="button" class="inline-flex flex-col items-center justify-center px-5 hover:bg-gray-50 dark:hover:bg-gray-800 group">
                                {
                                    window.location.pathname == "/favorites" ?
                                        <img src="/images/icons/pwa-favorites-active.svg" alt="" />
                                        :
                                        <img src="/images/icons/pwa-favorites.svg" alt="" />
                                }
                                <p class="text-sm text-gray-500 dark:text-gray-400 group-hover:font-bold dark:group-hover:text-blue-500">Favorites</p>
                            </button>

                            <button onClick={() => navigate('/profile')} type="button" class="inline-flex flex-col items-center justify-center px-5 hover:bg-gray-50 dark:hover:bg-gray-800 group">
                                {
                                    window.location.pathname == "/profile" ?
                                        <img src="/images/icons/pwa-profile-active.svg" alt="" />
                                        :
                                        <img src="/images/icons/pwa-profile.svg" alt="" />
                                }
                                <p class="text-sm text-gray-500 dark:text-gray-400 group-hover:font-bold dark:group-hover:text-blue-500">Profile</p>
                            </button>
                        </div>
                    </div>

                    :
                    <>
                    </>
            }
        </>
    )
}

export default BottomNav