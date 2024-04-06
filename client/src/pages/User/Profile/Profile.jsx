import React, { useState, useEffect } from 'react'
import Navbar from '../../../components/shared/Navbar/Navbar'
import DebitCard from '../../../components/Debit-Card/DebitCard'
import Footer from '../../../components/shared/Footer/Footer'
import { Link, useNavigate } from 'react-router-dom'
import { ClientProfileApi, ClientUpdateProfileApi, getCustomersSavedCards } from '../../../http/index'
import BottomNav from '../../../components/shared/BottomNav/BottomNav'
import toast, { Toaster } from 'react-hot-toast';
import DarkModeToggle from '../../../components/shared/DarkModeToggle/DarkModeToggle'

const Profile = () => {
    document.title = 'Profile'

    const navigate = useNavigate()

    const [displayModal, setDisplayModal] = useState(false)
    const [response, setReponse] = useState({});
    const [loading, setLoading] = useState(false)
    const [firstname, setFirstname] = useState('')
    const [photo, setPhoto] = useState('')
    const [lastname, setLastname] = useState('')
    const [email, setEmail] = useState('')
    const [selectedPhoto, setSelectedPhoto] = useState(null)
    const [savedCard, setSavedCards] = useState([])
    const [formChanged, setFormChanged] = useState(false);
    const [refresh, setRefresh] = useState(false)

    // Function to handle input change
    const handleInputChange = () => {
        setFormChanged(true);
    };

    useEffect(() => {
        const fetchdata = async () => {
            try {
                const { data } = await ClientProfileApi()
                console.log(data.data)
                setReponse(data)

                const { data: res } = await getCustomersSavedCards()

                console.log(res)
                setSavedCards(res.data)
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

    async function handleUpdate() {
        if (!formChanged) {
            toast.error("No changes made.");
            return;
        }

        try {
            const updatedata = {
                firstname: firstname,
                lastname: lastname,
                email: email,
                photo: photo
            }
            setLoading(true)
            const { data } = await ClientUpdateProfileApi(updatedata)
            setLoading(false)
            console.log("update user data", data)
            if (data.success == true) {
                toast.success("User updated Successfully")
                setRefresh(!refresh)
            }
        } catch (error) {
            console.log(error)
            toast.error(error.response.data.data)
        }

    }

    async function ImageModal() {
        setDisplayModal(!displayModal)
    }

    function capturePhoto(e) {
        const file = e.target.files[0];
        if (file) {
            setSelectedPhoto(file)
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onloadend = function () {
                setPhoto(reader.result);
                handleInputChange();
                // console.log(reader.result);
            };
        }
    }

    const isStandalone = window.matchMedia('(display-mode: standalone)').matches;
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


    return (
        <div className="dark:bg-[#2c2c2c] h-screen">
            <div className="relative  dark:text-white">
                <Navbar />
                <div className='dark:bg-[#2c2c2c] '>
                    {response.data == null && (
                        <div className='fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 overflow-auto bg-[#FFFFFF] bg-opacity-20 backdrop-blur-sm'>
                            <div class="h-screen w-screen relative flex justify-center items-center">
                                <div class="absolute animate-spin rounded-full h-32 w-32 border-t-4 border-b-4 border-[#C0A04C]"></div>
                                <img src="/images/logo/logo-main.png" class="h-16" />
                            </div>
                        </div>
                    )}
                    <section className='w-full flex justify-center'>
                        <section className='w-full mx-6 md:w-11/12 sm:mx-5 md:mx-5 md:w-10/12 xl:w-9/12 2xl:w-7/12'>
                            <Toaster />
                            <div className="mt-5 profie flex flex-col md:flex-row justify-center align-middle items-center space-x-2">
                                <div className=" w-full right bg-neutral-200 dark:bg-[#454545] pl-2 pr-2 py-2 rounded-lg">
                                    <p className='text-sm'>Profile card</p>
                                    <div className='flex justify-start align-middle items-center space-x-3 '>

                                        <div className="left w-2/6 md:w-auto">

                                            <button onClick={ImageModal} className="profile">
                                                {
                                                    response.data != null
                                                        ?
                                                        <img src={response.data.photo || "/images/assets/profile.png"} alt="profile-photo" className='h-20 w-20 object-cover rounded-full' />
                                                        :
                                                        <img src="/images/assets/profile.png" alt="profile-photo" className='h-20 w-20 object-cover rounded-full' />
                                                }
                                            </button>
                                        </div>

                                        <div className="right">
                                            <div className="flex-col md:flex-row flex md:space-x-20  md:justify-center md:items-center w-52">
                                                <div>
                                                    <label for="first_name" class="block mb-2 text-xs font-medium text-gray-900 dark:text-white">First name</label>
                                                    {
                                                        response.data != null
                                                            ?
                                                            <input type="text" id="first_name" class="bg-neutral-200 dark:bg-[#454545] dark:placeholder:text-white border-none text-gray-900 text-sm rounded-lg block w-52 md:w-full p-1 "
                                                                placeholder={`${response.data.firstname}`} disabled />
                                                            :
                                                            <input type="text" id="first_name" class="bg-neutral-200 dark:bg-[#454545] dark:placeholder:text-white border-none text-gray-900 text-sm rounded-lg block w-52 md:w-full p-1 " disabled />

                                                    }
                                                </div>
                                                <div>
                                                    <label for="last_name" class="block mb-2 text-xs font-medium text-gray-900 dark:text-white">Last name</label>
                                                    {
                                                        response.data != null
                                                            ?
                                                            <input type="text" id="last_name" class="bg-neutral-200 dark:bg-[#454545] dark:placeholder:text-white border-none text-gray-900 text-sm rounded-lg block w-52 md:w-full p-1 "
                                                                placeholder={`${response.data.lastname}`} disabled />
                                                            :
                                                            <input type="text" id="last_name" class="bg-neutral-200 dark:bg-[#454545] dark:placeholder:text-white border-none text-gray-900 text-sm rounded-lg block w-52 md:w-full p-1 "
                                                                disabled />
                                                    }
                                                </div>
                                            </div>

                                            <div className="ml-1 email">
                                                <label for="first_name" class="block mb-2 text-xs font-medium text-gray-900 dark:text-white">Email</label>
                                                {
                                                    response.data != null
                                                        ?
                                                        <input type="text" id="first_name" class="bg-neutral-200 dark:bg-[#454545] dark:placeholder:text-white border-none text-gray-900 text-sm rounded-lg block w-full p-1 " placeholder={`${response.data.email}`}
                                                            disabled />
                                                        :
                                                        <input type="text" id="first_name" class="bg-neutral-200 dark:bg-[#454545] dark:placeholder:text-white border-none text-gray-900 text-sm rounded-lg block w-full p-1 "
                                                            disabled />
                                                }

                                            </div>
                                        </div>

                                    </div>
                                </div>

                                <div className="w-full left  space-y-3">
                                    <div className='flex flex-col bg-neutral-200 dark:bg-[#454545] md:mt-0 mt-3 pl-2 pr-2 rounded-lg'>
                                        <label className='text-xs mt-1' htmlFor="first name">first name</label>
                                        <div className="relative flex align-middle">
                                            <input
                                                type="text"
                                                className='dark:text-white w-full border bg-neutral-200 dark:bg-[#454545] dark:border-0 dark:focus:border-0 ring-0 border-neutral-200  focus:border-neutral-200 focus:ring-neutral-200  outline-0 text-sm font-medium text-black'
                                                onChange={(e) => {
                                                    setFirstname(e.target.value)
                                                    handleInputChange()
                                                }}
                                                placeholder='John'
                                            />
                                            <button onClick={handleUpdate} className='h-6 absoulte right-0'>
                                                <img className='h-6 absoulte right-0' src="/images/icons/edit.svg" alt="" />
                                            </button>
                                        </div>
                                    </div>
                                    <div className='flex flex-col bg-neutral-200 dark:bg-[#454545] pl-2 pr-2 rounded-lg'>
                                        <label className='text-xs mt-1' htmlFor="last name">last name</label>
                                        <div className="relative flex align-middle">
                                            <input
                                                type="text"
                                                className='w-full border bg-neutral-200 dark:bg-[#454545] dark:border-0 ring-0 dark:text-white border-neutral-200 focus:border-neutral-200 focus:ring-neutral-200  outline-0 text-sm font-medium text-black'
                                                onChange={(e) => {
                                                    setLastname(e.target.value)
                                                    handleInputChange()
                                                }}
                                                placeholder='doe'
                                            />
                                            <button onClick={handleUpdate} className='h-6 absoulte right-0'>
                                                <img className='h-6 absoulte right-0' src="/images/icons/edit.svg" alt="" />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="email mt-3">
                                <div className='flex flex-col bg-neutral-200 dark:bg-[#454545] pl-2 pr-2 rounded-lg'>
                                    <label className='text-xs mt-1' htmlFor="first name">email</label>
                                    <div className="relative flex w-full">
                                        <input
                                            type="text"
                                            className='w-full border bg-neutral-200 dark:bg-[#454545] dark:border-0 ring-0 dark:text-white border-neutral-200  focus:border-neutral-200 focus:ring-neutral-200 outline-0 text-sm font-medium text-black'
                                            onChange={(e) => {
                                                setEmail(e.target.value);
                                                handleInputChange();
                                            }}
                                            placeholder='John@gmail.com'
                                        />
                                        <button onClick={handleUpdate} className='h-6 absoulte right-0'>
                                            <img className='h-6 absoulte right-0' src="/images/icons/edit.svg" alt="" />
                                        </button>
                                    </div>
                                </div>
                            </div>

                            <div className="savedCards mt-10 ">
                                <div className="text-2xl">Saved Cards</div>
                                <div className="mx-2 grid place-items-center grid-flow-row gap:6 md:gap-8 text-neutral-600 xs:grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
                                    {
                                        savedCard != null
                                            ?
                                            savedCard.length > 0
                                                ?
                                                savedCard.map((card) => (
                                                    <div className='mt-5'>
                                                        <DebitCard data={card} index={Math.floor(Math.random() * 3) + 1} />
                                                    </div>
                                                ))
                                                :
                                                <></>
                                            :
                                            <>
                                                loading
                                            </>
                                    }
                                </div>

                            </div>
                        </section>
                    </section>
                    {
                        displayModal ? (
                            <div className="fixed inset-0 flex items-center justify-center z-50 overflow-auto bg-[#FFFFFF] bg-opacity-20 backdrop-blur-sm">
                                <div className="relative rounded-lg">
                                    <section className="md:mt-12 flex bg-white drop-shadow-2xl rounded-lg">
                                        <div className="w-96 md:w-[35rem]">
                                            <div className="modal bg-white dark:bg-[#2c2c2c] px-5 py-5">
                                                <div className="space-y-4 max-h-auto overflow-y-auto">
                                                    <div className="flex items-center justify-center w-full">
                                                        <label
                                                            htmlFor="dropzone-file"
                                                            className="flex flex-col items-center justify-center w-full h-20 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
                                                        >
                                                            <div className="flex flex-col items-center justify-center">
                                                                <img src="/images/icons/upload-image.svg" alt="" />
                                                                <p className="text-xs text-gray-500 dark:text-gray-400">
                                                                    {selectedPhoto ? `Selected File: ${selectedPhoto.name}` : 'Upload Profile Photo'}
                                                                </p>
                                                            </div>
                                                            <input onChange={capturePhoto} id="dropzone-file" type="file" className="hidden" />
                                                        </label>
                                                    </div>
                                                    <div>
                                                        <button className="w-full py-2 bg-[#C0A04C] hover:bg-[#A48533] rounded-md text-sm font-bold text-gray-50 transition duration-200" onClick={handleUpdate}>
                                                            Upload
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </section>
                                    <button onClick={ImageModal} className="absolute top-3 -right-5 m-2 text-gray-600 hover:text-gray-800 focus:outline-none">
                                        <img src="/images/icons/cancel-icon.png" alt="" />
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <></>
                        )
                    }

                </div>

                <div className="">
                    <Footer />
                </div>
            </div >

            <div>
                <BottomNav />
            </div>
        </div>
    )
}

export default Profile
