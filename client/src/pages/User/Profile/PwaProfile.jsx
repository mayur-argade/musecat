import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import { ClientProfileApi, ClientUpdateProfileApi, getCustomersSavedCards } from '../../../http/index'
import Navbar from '../../../components/shared/Navbar/Navbar';
import BottomNav from '../../../components/shared/BottomNav/BottomNav';


const WebProfile = () => {

    const isStandalone = window.matchMedia('(display-mode: standalone)').matches;
    const navigate = useNavigate()

    const [response, setReponse] = useState({});
    const [refresh, setRefresh] = useState(false)
    const [firstname, setFirstname] = useState('')
    const [photo, setPhoto] = useState('')
    const [lastname, setLastname] = useState('')
    const [email, setEmail] = useState('')

    const isShareSupported = navigator.share !== undefined;

    const handleShare = async () => {
        try {
            await navigator.share({
                title: 'Muscat Where To',
                text: 'Check out this awesome app!',
                url: 'https://omanwhereto.com',
            });
        } catch (error) {
            console.error('Error sharing:', error.message);
        }
    };

    useEffect(() => {
        const fetchdata = async () => {
            try {
                const { data } = await ClientProfileApi()
                console.log(data.data)
                setReponse(data)

                const { data: res } = await getCustomersSavedCards()

                console.log(res)
                // setSavedCards(res.data)
                setFirstname(data.data.firstname)
                setLastname(data.data.lastname)
                setEmail(data.data.email)
            } catch (error) {
                console.log(error)
                toast.error(error.response.data.data)
            }
        }

        fetchdata()
    }, [refresh]);

    return (
        <div>
            <Navbar />
            {
                isStandalone && (
                    <>
                        <section className='dark:bg-[#2c2c2c]'>
                            <div className="header flex justify-between items-center align-middle">
                                <div onClick={() => navigate('/profile')} className='mt-3 ml-5 mr-5 flex align-middle items-center'>
                                    <div className="m-3 profile h-auto rounded-full">
                                        {
                                            response.data != null
                                                ?
                                                <img src={response.data.photo || "/images/assets/profile.png"} alt="profile-photo" className='h-14 w-14 object-cover rounded-full' />
                                                :
                                                <img src="/images/assets/profile.png" alt="profile-photo" className='h-14 w-14 object-cover rounded-full' />
                                        }
                                    </div>

                                    <div className="name flex flex-col">
                                        {
                                            response.data != null && (
                                                <span className='font-bold text-xl'>
                                                    {response.data.username}
                                                </span>
                                            )
                                        }
                                        {
                                            response.data != null && (
                                                <span className='font-light text-sm'>
                                                    {response.data.email}
                                                </span>
                                            )
                                        }
                                    </div>
                                </div>
                            </div>

                            <div className="ml-9 mr-9">
                                <ul className=''>
                                    <button onClick={() => navigate('/favorites')} className='w-full border border-t-0 border-r-0 border-l-0 py-4 border-b-white flex align-middle items-center'>
                                        <img className="flex dark:hidden" src="/images/icons/heart.svg" alt="" />
                                        <img className="hidden dark:flex" src="/images/icons/heart-light.svg" alt="" />
                                        <span>Favorites</span>
                                    </button>

                                    <button onClick={() => navigate('/contactus')} className='w-full border border-t-0 border-r-0 border-l-0 py-4 border-b-white flex align-middle items-center'>
                                        <img className="flex dark:hidden" src="/images/icons/star.svg" alt="" />
                                        <img className="hidden dark:flex" src="/images/icons/star-light.svg" alt="" />
                                        <span>Rate us</span>
                                    </button>

                                    <button onClick={() => navigate('/user/privacypolicy')} className='w-full border border-t-0 border-r-0 border-l-0 py-4 border-b-white flex align-middle items-center'>
                                        <img className="flex dark:hidden" src="/images/icons/policy.svg" alt="" />
                                        <img className="hidden dark:flex" src="/images/icons/policy-light.svg" alt="" />
                                        <span>Privacy Policy</span>
                                    </button>

                                    <button onClick={isShareSupported ? handleShare : undefined} disabled={!isShareSupported} className='w-full border border-t-0 border-r-0 border-l-0 py-4 border-b-white flex align-middle items-center'>
                                        <img className='flex dark:hidden' src="/images/icons/share.svg" alt="" />
                                        <img className='hidden dark:flex' src="/images/icons/share-light.svg" alt="" />
                                        <span>Invite a Friend</span>
                                    </button>

                                    <button onClick={() => navigate('/aboutus')} className='w-full border border-t-0 border-r-0 border-l-0 py-4 border-b-white flex align-middle items-center'>
                                        <img className="flex dark:hidden" src="/images/icons/aboutus.svg" alt="" />
                                        <img className="hidden dark:flex" src="/images/icons/aboutus-light.svg" alt="" />
                                        <span>About Us</span>
                                    </button>

                                </ul>
                            </div>
                            {
                                response.data == null && (
                                    <div className='h-screen w-full flex justify-center align-middle items-center'>
                                        <div class="relative flex justify-center items-center">
                                            <div class="absolute animate-spin rounded-full h-32 w-32 border-t-4 border-b-4 border-[#C0A04C]"></div>
                                            <img src="/images/logo/logo-main.png" class="h-16" />
                                        </div>
                                    </div>
                                )
                            }
                        </section>

                    </>
                )
            }
            <BottomNav />
        </div>
    )
}

export default WebProfile