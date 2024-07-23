import React, { useState, useEffect, useRef } from 'react'
import Sidebar from '../../components/shared/Sidebar/Sidebar'
import AddEventModal from '../../components/EditEventModal/AddEventModal'
import { AdminDeleteEvent, getEventsForAdmin, AdminVerifyEvent, GetAllCategory } from '../../http/index'
import moment from 'moment'
import { Link, useNavigate } from 'react-router-dom'
import toast, { Toaster } from 'react-hot-toast';
import AdminNavbar from '../../components/shared/Navbar/AdminNavbar'
import { Features } from '../../utils/Data'

const AdminEvents = () => {

    const [showAddEvent, setShowAddEvent] = useState(false)
    const [showArchived, setShowArchived] = useState(false)
    const [selectedCategories, setSelectedCategories] = useState([])
    const [events, setEvents] = useState([])
    const [loading, setLoading] = useState(false)
    const [refresh, setRefresh] = useState(false)
    const navigate = useNavigate()
    const [userCord, setUserCord] = useState({})
    const [selectedDistance, setSelectedDistance] = useState([])
    const [searchQuery, setSearchQuery] = useState('')
    const [isLoading, setIsLoading] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [selectedFeatures, setSelectedFeatures] = useState([])
    const [categories, setCategories] = useState([])

    const dropdownRef = useRef(null);

    const handleCategoryChange = (categoryURL) => {
        // console.log(categoryURL)
        // Check if the categoryURL is already in selectedCategories
        if (selectedCategories.includes(categoryURL)) {
            // Remove the categoryURL from selectedCategories
            setSelectedCategories(selectedCategories.filter((url) => url !== categoryURL));
        } else {
            // Add the categoryURL to selectedCategories
            setSelectedCategories([...selectedCategories, categoryURL]);
        }
    };

    async function getUserLocation() {
        try {
            const position = await new Promise((resolve, reject) => {
                navigator.geolocation.getCurrentPosition(resolve, reject);
            });

            const userLocation = {
                latitude: position.coords.latitude,
                longitude: position.coords.longitude,
            };

            setUserCord(userLocation)
            // Use userLocation for filtering.
        } catch (error) {
            console.error('Error getting user location:', error);
        }
    }

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };


    const handleDistanceChange = (distance) => {
        getUserLocation()
        if (selectedDistance.includes(distance)) {
            setSelectedDistance(selectedDistance.filter((dis) => dis !== distance))
        } else {
            setSelectedDistance([...selectedDistance, distance])
        }
    }

    const handleFeaturesChange = (feature) => {
        if (selectedFeatures.includes(feature)) {
            // Remove the feature from selectedFeatures
            setSelectedFeatures(selectedFeatures.filter((url) => url !== feature));
        } else {
            // Add the feature to selectedFeatures
            setSelectedFeatures([...selectedFeatures, feature]);
        }
    }

    useEffect(() => {
        const fetchEvents = async () => {
            setLoading(true)
            try {
                const res = await getEventsForAdmin()
                const response = await GetAllCategory()
                setEvents(res.data)
                setCategories(response.data)
                setLoading(false)
            } catch (error) {
                setLoading(false)
            }
        }

        fetchEvents()

    }, [refresh]);

    const closeModal = () => {
        setShowAddEvent(false);
    };

    const handleClick = () => {
        setShowAddEvent(true)
    }



    const deleteEvent = async (eventid) => {
        const confirm = window.confirm("Are you sure want to delete this event ?")

        if (confirm) {
            setLoading(true);
            try {
                const promise = AdminDeleteEvent({ eventid });
                await toast.promise(promise, {
                    loading: 'Deleting Event...', // Optional loading message
                    success: 'Event Deleted Successfully', // Optional success message
                    error: 'Error deleting event:', // Optional error message prefix
                });

                setRefresh(!refresh)
            } catch (error) {
                // Handle errors if needed
            } finally {
                setLoading(false);
            }
        }
    };

    const verifyEvent = async (eventid) => {
        const confirm = window.confirm("Verify Event ?")

        if (confirm) {
            try {
                const promise = AdminVerifyEvent({ eventid });
                await toast.promise(promise, {
                    loading: 'Verifying Event...', // Optional loading message
                    success: 'Event Verified Successfully', // Optional success message
                    error: (error) => `Error: ${error.response.data.data}`,
                });

                setRefresh(!refresh)
            } catch (error) {
                // toast.error(error.response.data.data);
            } finally {
                setLoading(false);
            }
        }
    };


    return (
        <div>
            <div className='flex '>

                <div className='z-20'>
                    <Sidebar />
                </div>
                <Toaster />
                <div className='pl-20 flex flex-col w-full'>
                    <div className='mx-4'>
                        <AdminNavbar />
                        <hr className='mb-3' />
                    </div>
                    <div className="headline ">
                        <div className="heading">
                            <div className="flex justify-between">
                                <span className="text-2xl font-semibold">Event/Offer</span>
                                <div className='flex'>

                                    <div class="filterbyfeature">
                                        <div className="relative inline-block text-left">
                                            <button
                                                onClick={toggleDropdown}
                                                className="flex align-middle space-x-3 bg-gray-50 border border-gray-300 text-gray-900 md:text-sm text-md rounded-lg focus:ring-[#C0A04C] focus:border-[#C0A04C] block w-14 md:w-52 p-1.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-[#C0A04C] dark:focus:border-[#C0A04C]"
                                            >
                                                <span className='hidden md:block text-gray-500'>Filter by Features</span>
                                                <span className='hidden block text-gray-500'>Filter</span>

                                                <img src="/images/icons/filter.svg" alt="" />
                                            </button>
                                            {isOpen && (
                                                <div
                                                    className="origin-top-right absolute right-0 mt-2 h-80 overflow-y-auto w-52 rounded-md shadow-lg bg-white dark:bg-[#454545] dark:text-white ring-1 ring-black ring-opacity-5 z-50"
                                                    ref={dropdownRef}
                                                >
                                                    <div className="p-5">
                                                        <div className="popular">
                                                            <span className='ml-0 font-semibold text-sm'>Category</span>
                                                            <div className="flex items-center mb-1 mt-2">
                                                                <input
                                                                    id="group2"
                                                                    name="status"
                                                                    type="radio"
                                                                    checked={!showArchived}
                                                                    onChange={() => setShowArchived(false)}
                                                                    className="w-4 h-4 text-[#C0A04C] border-gray-300 rounded focus:ring-[#C0A04C] dark:focus:ring-[#C0A04C] dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                                                />
                                                                <label htmlFor="group2" className="ml-2 text-sm font-normal text-gray-900 dark:text-gray-300">
                                                                    Ongoing
                                                                </label>
                                                            </div>
                                                            <div className="flex items-center mb-1 mt-2">
                                                                <input
                                                                    id="group1"
                                                                    name="status"
                                                                    type="radio"
                                                                    checked={showArchived}
                                                                    onChange={() => setShowArchived(true)}
                                                                    className="w-4 h-4 text-[#C0A04C] border-gray-300 rounded focus:ring-[#C0A04C] dark:focus:ring-[#C0A04C] dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                                                />
                                                                <label htmlFor="group1" className="ml-2 text-sm font-normal text-gray-900 dark:text-gray-300">
                                                                    Archived
                                                                </label>
                                                            </div>

                                                        </div>

                                                        <div className="popular">
                                                            <span className='ml-0 font-semibold text-sm'>Popular Filters</span>
                                                            {
                                                                categories.data != null && (
                                                                    categories.data.map((e) => (
                                                                        <div class="flex items-center mb-1 mt-2">
                                                                            <input id={e.categoryURL} type="checkbox"
                                                                                onChange={() => handleCategoryChange(e)}
                                                                                checked={selectedCategories.includes(e)}
                                                                                value={e} class="w-4 h-4 text-[#C0A04C] rounded dark:focus:ring-[#C0A04C] " />
                                                                            <label for="staycation" class="ml-2 text-sm font-normal text-gray-900 dark:text-gray-300">{e.name}</label>
                                                                        </div>
                                                                    ))
                                                                )
                                                            }
                                                        </div>
                                                        <hr className='h-px my-3 bg-gray-500 border-0 dark:bg-gray-700' />

                                                        <div className="popular">
                                                            <span className='ml-0 font-semibold text-sm'>Features</span>
                                                            {
                                                                Features.list.map((e) => (
                                                                    <div class="flex items-center mb-1 mt-2">
                                                                        <input id={e} type="checkbox"
                                                                            onChange={() => handleFeaturesChange(e)}
                                                                            checked={selectedFeatures.includes(e)}
                                                                            value={e} class="w-4 h-4 text-[#C0A04C] border-gray-300 rounded focus:ring-[#C0A04C] dark:focus:ring-[#C0A04C] dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                                                        <label for="staycation" class="ml-2 text-sm font-normal text-gray-900 dark:text-gray-300">{e}</label>
                                                                    </div>
                                                                ))
                                                            }
                                                        </div>
                                                        <hr className='h-px my-3 bg-gray-500 border-0 dark:bg-gray-700' />
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    <input
                                        type="text"
                                        id="table-search"
                                        className={`ml-5 dark:bg-[#454545] dark:placeholder-[#454545] placeholder-gray-50 md:placeholder-gray-500 bg-gray-50 border border-gray-300 text-gray-900 md:text-gray-900 text-sm rounded-lg focus:ring-[#C0A04C] focus:border-[#C0A04C] block pl-5 p-2 dark:border-[#454545] dark:text-white dark:focus:ring-[#C0A04C] dark:focus:border-[#C0A04C] w-14 md:w-44 focus:w-32 md:focus:w-44`}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        placeholder="Search "
                                    />
                                    <button onClick={handleClick} className='ml-5 px-1.5 py-1 bg-blue-800 text-sm text-white rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600 mr-5'>Add Events/Offers</button>
                                </div>

                            </div>
                            <hr className='mt-3 mb-3' />

                            <div className="z-10 mx-4 maincontent flex flex-col pb-20">
                                <div className="overflow-x-auto">

                                    <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
                                        <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                                            <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                                <tr>
                                                    <th scope="col" class="text-center px-6 py-3">
                                                        Event Name
                                                    </th>
                                                    <th scope="col" class="text-center px-6 py-3">
                                                        Vendor
                                                    </th>
                                                    <th scope="col" class="text-center px-6 py-3">
                                                        Category
                                                    </th>
                                                    <th scope="col" class="text-center px-6 py-3">
                                                        Status
                                                    </th>
                                                    <th scope="col" class="text-center px-6 py-3">
                                                        Venue
                                                    </th>
                                                    <th scope="col" class="text-center px-6 py-3">
                                                        Created Date
                                                    </th>
                                                    <th scope="col" class="text-center px-6 py-3">
                                                        Action
                                                    </th>
                                                </tr>
                                            </thead>
                                            {
                                                events.data == null
                                                    ?
                                                    <tbody>
                                                        <tr >
                                                            <td className="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-900">
                                                                <div class="flex items-center justify-between animate-pulse">
                                                                    <div>
                                                                        <div class="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24 mb-2.5"></div>
                                                                    </div>
                                                                </div>
                                                            </td>
                                                            {/* </Link> */}
                                                            <td className="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-900 w-96">
                                                                <div class="flex items-center justify-between animate-pulse">
                                                                    <div>
                                                                        <div class="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24 mb-2.5"></div>
                                                                    </div>
                                                                </div>
                                                            </td>
                                                            <td className="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-900">
                                                                <div class="flex items-center justify-between animate-pulse">
                                                                    <div>
                                                                        <div class="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24 mb-2.5"></div>
                                                                    </div>
                                                                </div>
                                                            </td>
                                                            <td className="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-900">
                                                                <div class="flex items-center justify-between animate-pulse">
                                                                    <div>
                                                                        <div class="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24 mb-2.5"></div>
                                                                    </div>
                                                                </div>
                                                            </td>
                                                            <td className="space-x-3 px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-900">
                                                                <div class="flex items-center justify-between animate-pulse">
                                                                    <div>
                                                                        <div class="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24 mb-2.5"></div>
                                                                    </div>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                        <tr >
                                                            <td className="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-900">
                                                                <div class="flex items-center justify-between animate-pulse">
                                                                    <div>
                                                                        <div class="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24 mb-2.5"></div>
                                                                    </div>
                                                                </div>
                                                            </td>
                                                            {/* </Link> */}
                                                            <td className="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-900 w-96">
                                                                <div class="flex items-center justify-between animate-pulse">
                                                                    <div>
                                                                        <div class="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24 mb-2.5"></div>
                                                                    </div>
                                                                </div>
                                                            </td>
                                                            <td className="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-900">
                                                                <div class="flex items-center justify-between animate-pulse">
                                                                    <div>
                                                                        <div class="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24 mb-2.5"></div>
                                                                    </div>
                                                                </div>
                                                            </td>
                                                            <td className="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-900">
                                                                <div class="flex items-center justify-between animate-pulse">
                                                                    <div>
                                                                        <div class="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24 mb-2.5"></div>
                                                                    </div>
                                                                </div>
                                                            </td>
                                                            <td className="space-x-3 px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-900">
                                                                <div class="flex items-center justify-between animate-pulse">
                                                                    <div>
                                                                        <div class="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24 mb-2.5"></div>
                                                                    </div>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                        <tr >
                                                            <td className="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-900">
                                                                <div class="flex items-center justify-between animate-pulse">
                                                                    <div>
                                                                        <div class="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24 mb-2.5"></div>
                                                                    </div>
                                                                </div>
                                                            </td>
                                                            {/* </Link> */}
                                                            <td className="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-900 w-96">
                                                                <div class="flex items-center justify-between animate-pulse">
                                                                    <div>
                                                                        <div class="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24 mb-2.5"></div>
                                                                    </div>
                                                                </div>
                                                            </td>
                                                            <td className="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-900">
                                                                <div class="flex items-center justify-between animate-pulse">
                                                                    <div>
                                                                        <div class="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24 mb-2.5"></div>
                                                                    </div>
                                                                </div>
                                                            </td>
                                                            <td className="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-900">
                                                                <div class="flex items-center justify-between animate-pulse">
                                                                    <div>
                                                                        <div class="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24 mb-2.5"></div>
                                                                    </div>
                                                                </div>
                                                            </td>
                                                            <td className="space-x-3 px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-900">
                                                                <div class="flex items-center justify-between animate-pulse">
                                                                    <div>
                                                                        <div class="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24 mb-2.5"></div>
                                                                    </div>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                    :
                                                    <tbody>
                                                        {
                                                            showArchived
                                                                ?
                                                                <>
                                                                    {
                                                                        events.expiredEvents.filter(event => {
                                                                            const searchResult = event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                                                                                event.vendorid.firstname.toLowerCase().includes(searchQuery.toLowerCase()) ||
                                                                                (event.location?.name && event.location.name.toLowerCase().includes(searchQuery.toLowerCase()))

                                                                            const categoryMatch =
                                                                                selectedCategories.length === 0 ||
                                                                                selectedCategories.some((selectedCategory) => {
                                                                                    if (selectedCategory.subCategories && selectedCategory.subCategories.length > 0) {
                                                                                        console.log("good")
                                                                                        return (
                                                                                            selectedCategory.subCategories &&
                                                                                            selectedCategory.subCategories.some((subCategory) =>
                                                                                                event.eventCategory &&
                                                                                                event.eventCategory.some((itemSubcategory) => (
                                                                                                    itemSubcategory.categoryURL === subCategory.categoryURL)
                                                                                                )
                                                                                            )
                                                                                        );
                                                                                    }
                                                                                    else {
                                                                                        return (
                                                                                            event.eventCategory.some((itemSubcategory) =>
                                                                                                itemSubcategory.categoryURL === selectedCategory.categoryURL
                                                                                            )
                                                                                        );
                                                                                    }
                                                                                });


                                                                            const featureMatch =
                                                                                selectedFeatures.length == 0 ||
                                                                                event.features.some(feature => selectedFeatures.includes(feature));

                                                                            return searchResult && categoryMatch && featureMatch

                                                                        }).map((event, index) => (
                                                                            <tr key={event._id}>
                                                                                <Link to={`/admin/event/${event._id}`}>
                                                                                    <td className="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-900">
                                                                                        {event.title}
                                                                                    </td>
                                                                                </Link>
                                                                                <td className="text-center px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-900">
                                                                                    {event.vendorid.firstname}
                                                                                </td>
                                                                                <td className="text-center px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-900">
                                                                                    {[...new Set(event.eventCategory.map(subcategory => subcategory.name))].join(', ')}
                                                                                </td>
                                                                                <td className="flex justify-center px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-900">
                                                                                    {event.verified ?
                                                                                        <span className='bg-green-100 text-green-800 text-xs font-medium ml-0 px-2.5 py-0.5 rounded-full dark:bg-green-900 dark:text-green-300'>
                                                                                            Verified
                                                                                        </span>
                                                                                        :
                                                                                        <span className='bg-red-100 text-red-800 text-xs font-medium ml-0 px-2.5 py-0.5 rounded-full dark:bg-red-900 dark:text-red-300'>
                                                                                            Unverified
                                                                                        </span>

                                                                                    }
                                                                                </td>
                                                                                <td className="text-center px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-900">
                                                                                    {event.location?.name || ""}
                                                                                </td>
                                                                                <td className="text-center px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-900">
                                                                                    {moment(event.createdAt).format('DD-MM-YYYY')}
                                                                                </td>
                                                                                <td className="flex justify-center px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-900 space-x-2">
                                                                                    <button onClick={() => deleteEvent(event._id)} className="h-6 w-6">
                                                                                        <img src="/images/icons/delete.png" alt="" />
                                                                                    </button>
                                                                                    {
                                                                                        event.verified
                                                                                            ?
                                                                                            <></>
                                                                                            :
                                                                                            <button onClick={(() => verifyEvent(event._id))} className=" h-6 w-6">
                                                                                                <img src="/images/icons/done.png" alt="" />
                                                                                            </button>
                                                                                    }
                                                                                    <button onClick={(() => navigate(`/admin/event/${event._id}`))} className="h-6 w-6">
                                                                                        <img src="/images/icons/eye.png" alt="" />
                                                                                    </button>
                                                                                </td>
                                                                            </tr>
                                                                        ))
                                                                    }
                                                                </>
                                                                :
                                                                <>
                                                                    {
                                                                        events.data.filter(event => {
                                                                            const searchResult = event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                                                                                event.vendorid.firstname.toLowerCase().includes(searchQuery.toLowerCase()) ||
                                                                                (event.location?.name && event.location.name.toLowerCase().includes(searchQuery.toLowerCase()))

                                                                            const categoryMatch =
                                                                                selectedCategories.length === 0 ||
                                                                                selectedCategories.some((selectedCategory) => {
                                                                                    if (selectedCategory.subCategories && selectedCategory.subCategories.length > 0) {
                                                                                        console.log("good")
                                                                                        return (
                                                                                            selectedCategory.subCategories &&
                                                                                            selectedCategory.subCategories.some((subCategory) =>
                                                                                                event.eventCategory &&
                                                                                                event.eventCategory.some((itemSubcategory) => (
                                                                                                    itemSubcategory.categoryURL === subCategory.categoryURL)
                                                                                                )
                                                                                            )
                                                                                        );
                                                                                    }
                                                                                    else {
                                                                                        return (
                                                                                            event.eventCategory.some((itemSubcategory) =>
                                                                                                itemSubcategory.categoryURL === selectedCategory.categoryURL
                                                                                            )
                                                                                        );
                                                                                    }
                                                                                });


                                                                            const featureMatch =
                                                                                selectedFeatures.length == 0 ||
                                                                                event.features.some(feature => selectedFeatures.includes(feature));

                                                                            return searchResult && categoryMatch && featureMatch

                                                                        }).map((event, index) => (
                                                                            <tr key={event._id}>
                                                                                <Link to={`/admin/event/${event._id}`}>
                                                                                    <td className="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-900">
                                                                                        {event.title}
                                                                                    </td>
                                                                                </Link>
                                                                                <td className="text-center px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-900">
                                                                                    {event.vendorid.firstname}
                                                                                </td>
                                                                                <td className="text-center px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-900">
                                                                                    {[...new Set(event.eventCategory.map(subcategory => subcategory.name))].join(', ')}
                                                                                </td>
                                                                                <td className="flex justify-center px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-900">
                                                                                    {event.verified ?
                                                                                        <span className='bg-green-100 text-green-800 text-xs font-medium ml-0 px-2.5 py-0.5 rounded-full dark:bg-green-900 dark:text-green-300'>
                                                                                            Verified
                                                                                        </span>
                                                                                        :
                                                                                        <span className='bg-red-100 text-red-800 text-xs font-medium ml-0 px-2.5 py-0.5 rounded-full dark:bg-red-900 dark:text-red-300'>
                                                                                            Unverified
                                                                                        </span>

                                                                                    }
                                                                                </td>
                                                                                <td className="text-center px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-900">
                                                                                    {event.location?.name || ""}
                                                                                </td>
                                                                                <td className="text-center px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-900">
                                                                                    {moment(event.createdAt).format('DD-MM-YYYY')}
                                                                                </td>
                                                                                <td className="flex justify-center px-6 py-4 whitespace-no-wrap text-sm leading-5 text-gray-900 space-x-2">
                                                                                    <button onClick={() => deleteEvent(event._id)} className="h-6 w-6">
                                                                                        <img src="/images/icons/delete.png" alt="" />
                                                                                    </button>
                                                                                    {
                                                                                        event.verified
                                                                                            ?
                                                                                            <></>
                                                                                            :
                                                                                            <button onClick={(() => verifyEvent(event._id))} className=" h-6 w-6">
                                                                                                <img src="/images/icons/done.png" alt="" />
                                                                                            </button>
                                                                                    }
                                                                                    <button onClick={(() => navigate(`/admin/event/${event._id}`))} className="h-6 w-6">
                                                                                        <img src="/images/icons/eye.png" alt="" />
                                                                                    </button>
                                                                                </td>
                                                                            </tr>
                                                                        ))
                                                                    }
                                                                </>
                                                        }
                                                    </tbody>
                                            }

                                        </table>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {showAddEvent && (
                <div className='calendar-overlay'>
                    <div className="fixed inset-0 flex justify-center z-50 overflow-auto bg-opacity-20 backdrop-blur-sm">
                        <div className="relative rounded-lg ">
                            <AddEventModal
                                isOpen={showAddEvent}
                                onClose={closeModal}
                                setIsLoading={setIsLoading}
                                verified={true} />
                            {/* Close button */}
                            <button
                                onClick={closeModal}
                                className="absolute top-12 right-0 m-2 text-gray-600 hover:text-gray-800 focus:outline-none"
                            >
                                <img src="/images/icons/cancel-icon.png" alt="" />
                            </button>
                        </div>
                    </div>
                </div>
            )}

        </div>
    )

}

export default AdminEvents