import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'
import JoditEditor from 'jodit-react';
import toast, { Toaster } from 'react-hot-toast';
import { VendorCreateOffer, GetAllCategory, getAllVenues } from '../../http/index'
import AddVenueModal from './AddVenueModal';
import Features from '../../utils/Data'
import CategorySelector from '../shared/CategorySelector/CategorySelector';
import Tooltip from '../shared/Tooltip/Tooltip'

const AddOfferModal = ({ onClose }) => {

    const editor = useRef(null);
    const navigate = useNavigate()
    const config = {
        placeholder: "Amr Diab, the legendary Egyptian singer is set to perform at the Etihad Arena ....",
        buttons: 'bold,italic,h1,h2,h3',
        buttonsMD: 'bold,italic,h1,h2,h3',
        buttonsSM: 'bold,italic,h1,h2,h3',
        buttonsXS: 'bold,italic,h1,h2,h3',
    }

    const [minDateTime, setMinDateTime] = useState('');
    const [listCategory, setListCategory] = useState([])
    const [listVenues, setListVenues] = useState([])

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                setLoading(true)
                const res = await GetAllCategory()
                const venues = await getAllVenues()
                setListVenues(venues.data.data)
                setListCategory(res.data.data)
                setLoading(false)
                // console.log("categories", response.data.data)
            } catch (error) {
                setLoading(false)
                // console.log(error)
            }
        }
        fetchCategories()

        // Get the current date and time as an ISO string
        const currentDate = new Date().toISOString().slice(0, 16);
        setMinDateTime(currentDate);
        console.log("currentDate=", currentDate)
    }, []);

    const [showVenuecreate, setShowVenuecreate] = useState(false)
    const [content, setContent] = useState('')
    const [loading, setLoading] = useState(false)
    const [title, setTitle] = useState('')
    const [shortDesc, setShortDesc] = useState('')
    const [datetype, setDatetype] = useState(true)
    const [startDate, setStartDate] = useState('')
    const [endDate, setEndDate] = useState('')
    const [selectedDays, setSelectedDays] = useState([]);
    const [startTime, setStartTime] = useState('')
    const [endTime, setEndTime] = useState('')
    const [eventCategory, setEventCategory] = useState('')
    const [selectedCategories, setSelectedCategories] = useState([])
    const [location, setLocation] = useState('')
    const [venueDescription, setVenueDescription] = useState('')
    const [selectedFeature, setSelectedFeatures] = useState([])
    const [termsAndConditions, setTermsAndConditions] = useState('')
    const [number, setNumber] = useState('')
    const [fb, setFb] = useState('')
    const [insta, setInsta] = useState('')
    const [mail, setMail] = useState('')
    const [wpNumber, setWpNumber] = useState('')
    const [website, setWebsite] = useState('')
    const [photo, setPhoto] = useState(null)
    const [additinalPhotos, setAdditionalPhotos] = useState([])
    const [seatingMap, setSeatingMap] = useState(null)
    const [banner, setBanner] = useState(null)
    const [video, setVideo] = useState(null)
    const [discountOnApp, setDiscountOnApp] = useState('')
    const days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];

    const [showEndDate, setShowEndDate] = useState(false);

    const handleCheckboxChange = () => {
        setShowEndDate(!showEndDate); // Toggle the state when the checkbox is changed
    };


    const handleEventCategoryChange = (selectedOptions) => {
        // console.log("this is what getting selected", selectedOptions)
        // Filter out any duplicate selections
        const uniqueSelectedOptions = [...new Set(selectedOptions)];
        // console.log(uniqueSelectedOptions)
        // Update the state or perform other actions with the selected categories
        setSelectedCategories(uniqueSelectedOptions);
    };

    function capturePhoto(e) {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onloadend = function () {
                setPhoto(reader.result);
                // console.log(reader.result);
            };
        }
    }

    function captureSeatingMap(e) {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onloadend = function () {
                setSeatingMap(reader.result);
                // console.log(reader.result);
            };
        }
    }

    function captureBanner(e) {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onloadend = function () {
                setBanner(reader.result);
                // console.log(reader.result);
            };
        }
    }

    function captureVideo(e) {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onloadend = function () {
                setVideo(reader.result);
                // console.log(reader.result);
            };
        }
    }

    function captureAdditionalPhotos(e) {
        const files = e.target.files;

        if (files) {
            const newImages = Array.from(files);
            const imagePromises = newImages.map((file) => {
                return new Promise((resolve, reject) => {
                    const reader = new FileReader();
                    reader.onload = (event) => {
                        resolve(event.target.result);
                    };
                    reader.onerror = (error) => {
                        reject(error);
                    };
                    reader.readAsDataURL(file);
                });
            });

            Promise.all(imagePromises)
                .then((base64Images) => {
                    setAdditionalPhotos([...additinalPhotos, ...base64Images]);
                })
                .catch((error) => {
                    console.error("Error converting images to base64:", error);
                });
        }
    }

    const handleDayClick = (day) => {
        setDatetype(false)
        if (selectedDays.includes(day)) {
            // If the day is already selected, remove it from the array
            setSelectedDays(selectedDays.filter((selectedDay) => selectedDay !== day));
        } else {
            // If the day is not selected, add it to the array
            setSelectedDays([...selectedDays, day]);
        }
    };

    console.log(selectedDays)

    const handleFeaturesClick = (feature) => {
        if (selectedFeature.includes(feature)) {
            // If the day is already selected, remove it from the array
            setSelectedFeatures(selectedFeature.filter((selectedFeature) => selectedFeature !== feature));
        } else {
            // If the day is not selected, add it to the array
            setSelectedFeatures([...selectedFeature, feature]);
        }
    };

    const [inputFields, setInputFields] = useState(['']); // Initial input field

    const addInputField = () => {
        if (inputFields.length < 3) {
            setInputFields([...inputFields, '']); // Add an empty input field
        }
    };

    const removeInputField = (index) => {
        const updatedFields = [...inputFields];
        updatedFields.splice(index, 1);
        setInputFields(updatedFields);
    };

    const handleInputChange = (index, value) => {
        const updatedFields = [...inputFields];
        updatedFields[index] = value;
        setInputFields(updatedFields);
    };

    const handleAddToArray = () => {
        // Add all input field values to an array
        const values = inputFields.filter((value) => value.trim() !== ''); // Remove empty values
        // Now 'values' contains all non-empty input field values
        console.log(values); // You can replace 'console.log' with your desired logic
    };

    const [categories, setCategories] = useState([
        { className: null, seats: null, price: null },
    ]);

    const addCategory = () => {
        setCategories([...categories, { className: null, seats: null, price: null }]);
    };

    const removeCategory = (index) => {
        const updatedCategories = [...categories];
        updatedCategories.splice(index, 1);
        setCategories(updatedCategories);
    };

    const handleCategoryChange = (index, field, value) => {
        const updatedCategories = [...categories];
        updatedCategories[index][field] = value;
        setCategories(updatedCategories);
    };

    const handleSave = async () => {

        if (!title) {
            return toast.error("Title is Mandatory")
        } else if (!content) {
            return toast.error("Event Information is Mandatory")
        } else if (!location) {
            return toast.error("Location is Mandatory")
        } else if (!termsAndConditions) {
            return toast.error("Please add terms and conditions")
        } else if (!photo) {
            return toast.error("Featured Photo is missing")
        } else if (selectedCategories.length <= 0) {
            return toast.error("Please select Event Category")
        } else if (!seatingMap) {
            return toast.error("Seating Map is missing")
        }

        let dateType;
        if (datetype == true) {
            dateType = 'dateRange'
        } else {
            dateType = 'recurring'
        }
        let eventdate = {}
        eventdate.type = dateType
        if (dateType == 'dateRange') {
            eventdate.dateRange = {
                startDate: startDate,
                endDate: endDate
            }
        } else if (dateType == 'recurring') {
            eventdate = {
                recurring: {
                    days: []
                }
            }
            eventdate.recurring.days = selectedDays
            eventdate.recurring.startTime = startTime
            eventdate.recurring.endTime = endTime
            eventdate.recurring.startDate = startDate
            eventdate.recurring.endDate = endDate
        }

        for (const category of categories) {
            if (category.seats != null) {
                if (category.seats !== '' && category.seats < 1) {
                    return toast.error("Enter a valid seat count")
                }
            }
            if (category.price != null && category.className == null) {
                return toast.error("Classname is required if you are entering price")
            }
            if (category.className != null && category.className.trim() == "") {
                return toast.error("Classname cannot be an empty string if you want to add price")
            }
            if (category.price != null && category.price < 0.1) {
                return toast.error("price of ticket can not be less than 100")
            }
        }

        console.log("categories of ticket", categories)
        console.log("event categories", selectedCategories)

        const eventdata = {
            title: title,
            shortDescription: shortDesc,
            description: content,
            location: location,
            venueInfo: venueDescription,
            custom: inputFields,
            features: selectedFeature,
            termsAndConditions: termsAndConditions,
            categories: categories,
            eventCategory: selectedCategories,
            displayPhoto: photo,
            banner: banner,
            date: eventdate,
            additinalImages: additinalPhotos,
            video: video,
            seatingMap: seatingMap,
            facebook: fb,
            instagram: insta,
            email: mail,
            whatsapp: wpNumber,
            website: website,
            phone: number,
            showEndDate: showEndDate,
            discountOnApp: discountOnApp
        }
        setLoading(true)
        try {
            console.log(eventdata)
            const { data } = await VendorCreateOffer(eventdata)
            setLoading(false)
            console.log(data)
            if (data.success == true) {
                toast.success("Event is successfully added")
                navigate(`/vendor/event/${data.data._id}`)
            } else if (data.success == false) {
                toast.error(data.data)
                window.alert(data.data)
            }
        } catch (error) {
            console.log(error)
        }
        // onClose(); // This will close the modal
    };

    if (listCategory.length == 0 || listCategory == null || listVenues == null) {
        return (
            <div className="h-screen w-full flex justify-center align-middle items-center">
                <img src="/images/icons/loading.svg" alt="" />
            </div>
        )
    } else {
        return (
            <div>
                <Toaster />
                {
                    !loading
                        ?
                        <section className='md:mt-12 flex bg-white drop-shadow-2xl rounded-lg'>
                            <div className='w-96 md:w-[1000px]'>
                                <div className="modal bg-white px-10 py-5">
                                    <div className='text-left flex justify-start items-start align-middle'>
                                        <p className='text-xl font-bold'>Offer Details</p>
                                    </div>
                                    <div className='mt-3 flex flex-col bg-[#E7E7E7] pl-2 pr-2 rounded-lg'>
                                        <label className='text-sm font-semibold mt-1' htmlFor="first name *">
                                            <div className="flex w-full">
                                                <span className='text-sm font-semibold mt-1 ml-0'>
                                                    Title  *
                                                </span>
                                                <Tooltip data={"Offer Title"} />
                                            </div>
                                        </label>
                                        <input
                                            type="text"
                                            className='px-0 py-0.5 w-full border bg-transparent border-[#E7E7E7] focus:border-transparent focus:ring-transparent  outline-0 placeholder:text-sm font-medium '
                                            onChange={((e) => setTitle(e.target.value))}
                                            placeholder='Please enter the title for your event here'
                                        />
                                    </div>

                                    <div className='mt-3 flex flex-col bg-[#E7E7E7] pl-2 pr-2 rounded-lg'>
                                        <label className='text-sm font-semibold mt-1' htmlFor="first name">
                                            <div className="flex w-full">
                                                <span className='ml-0'>
                                                    Short Description *
                                                </span>
                                                <Tooltip data={"Short Description for offer in one line"} />
                                            </div>
                                        </label>
                                        <input
                                            type="text"
                                            className='px-0 py-0.5 w-full border bg-transparent border-[#E7E7E7] focus:border-transparent focus:ring-transparent  outline-0 placeholder:text-sm font-medium '
                                            placeholder='Enter a short description to let the users know about your event in a summary.'
                                            onChange={((e) => setShortDesc(e.target.value))}
                                        />
                                    </div>

                                    <div className='mt-3 flex flex-col bg-[#E7E7E7] pl-2 pr-2 rounded-lg'>
                                        <label className='text-sm font-semibold mt-1' htmlFor="first name">
                                            <div className="flex w-full">
                                                <span className='ml-0'>
                                                    Offer Information  *                                                </span>
                                                <Tooltip data={"Explain in Brief what event is about all the features you can bold, can use heading etc.."} />
                                            </div>
                                        </label>
                                        <JoditEditor
                                            ref={editor}
                                            value={content}
                                            config={config}
                                            tabIndex={1} // tabIndex of textarea
                                            onBlur={newContent => setContent(newContent)} // preferred to use only this option to update the content for performance reasons
                                        />
                                    </div>

                                    <p className='ml-2 text-sm font-semibold mt-2'>
                                        <div className="flex w-full">
                                            <span className='ml-0'>
                                                Select Start Date-time and End Date-time:
                                            </span>
                                            <Tooltip data={"Select dates on which your offer is going to happen if offer is of type recurring then you can tick recurring and select Days, If you want clients to show Ending date for the offer toggle the show ending date button"} />
                                        </div>
                                    </p>
                                    <div className="flex align-middle items-center  w-full mt-2 space-x-4">
                                        <div className="flex w-full row1 space-x-4 ">
                                            <div className='w-full  flex flex-col bg-[#E7E7E7] pl-2 pr-2 rounded-lg'>
                                                <label className='input-container text-xs mt-1' htmlFor="first name">Start Date</label>
                                                <input
                                                    type="datetime-local"
                                                    min={minDateTime}
                                                    id="session-date"
                                                    onChange={((e) => setStartDate(e.target.value))}
                                                    className='px-0 py-0.5 w-full placeholder:text-sm border bg-transparent border-[#E7E7E7] focus:border-transparent focus:ring-transparent  outline-0 placeholder:text-sm text-sm font-medium'
                                                />
                                            </div>
                                        </div>
                                        <p className='text-center'>to</p>
                                        <div className="flex w-full row1 space-x-4 ">
                                            <div className='w-full  flex flex-col bg-[#E7E7E7] pl-2 pr-2 rounded-lg'>
                                                <label className='text-xs mt-1' htmlFor="first name">End Date</label>
                                                <input
                                                    type="datetime-local"
                                                    min={minDateTime}
                                                    id="session-date"
                                                    onChange={((e) => setEndDate(e.target.value))}
                                                    className='px-0 py-0.5 w-full placeholder:text-sm border bg-transparent border-[#E7E7E7] focus:border-transparent focus:ring-transparent  outline-0 placeholder:text-sm text-sm font-medium'
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex space-x-2 align-middle ml-2 mt-1 mb-3">
                                        <label className="block">
                                            <input type="checkbox" className="w-4 h-4 rounded" name="recurring" id="recurring" onChange={((e) => setDatetype(!e.target.checked))} />
                                            <span className='ml-1 text-sm '>
                                                Recurring Offer ?
                                            </span>
                                        </label>

                                        {/* <label htmlFor="recurring">Recurring Offer ?</label> */}
                                    </div>
                                    {
                                        datetype
                                            ?
                                            <></>
                                            :
                                            <div>
                                                <p className='text-sm mt-2'>Select Days of the Week For recurring offer :</p>
                                                <div className='flex space-x-4 align-middle items-center '>
                                                    {
                                                        days.map((day, index) => (
                                                            <div className='mx-2'>
                                                                <label key={index} className="block">
                                                                    <input
                                                                        className='rounded-sm mr-1'
                                                                        type="checkbox"
                                                                        value={day}
                                                                        checked={selectedDays.includes(day)}
                                                                        onChange={() => handleDayClick(day)}
                                                                    />
                                                                    <span className='ml-0 text-sm '>
                                                                        {day}
                                                                    </span>
                                                                </label>
                                                            </div>
                                                        ))
                                                    }

                                                    <div className='flex'>
                                                        <div className='flex flex-col bg-[#E7E7E7] pl-2 pr-2 mr-2 rounded-lg'>
                                                            <label className='input-container text-xs mt-1' htmlFor="first name">Start Time</label>
                                                            <input type="time" className="px-0 py-0.5 placeholder:text-sm border bg-transparent border-[#E7E7E7] focus:border-transparent focus:ring-transparent outline-0 placeholder:text-sm text-sm font-medium" name="" id="session-time"
                                                                onChange={((e) => setStartTime(e.target.value))}
                                                            />
                                                        </div>
                                                        <div className='flex flex-col bg-[#E7E7E7] pl-2 pr-2 rounded-lg'>
                                                            <label className='input-container text-xs mt-1' htmlFor="first name">End Time</label>
                                                            <input type="time" className="px-0 py-0.5 placeholder:text-sm border bg-transparent border-[#E7E7E7] focus:border-transparent focus:ring-transparent outline-0 placeholder:text-sm text-sm font-medium" name="" id="session-time"
                                                                onChange={((e) => setEndTime(e.target.value))}
                                                            />
                                                        </div>
                                                    </div>
                                                </div>

                                            </div>
                                    }

                                    <label className="relative inline-flex items-center mb-5 cursor-pointer">
                                        <input
                                            type="checkbox"
                                            value=""
                                            className="sr-only peer"
                                            onChange={handleCheckboxChange}
                                            checked={showEndDate} // Bind the checked state to the showEndDate state
                                        />
                                        <div className="w-9 h-5 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                                        <span className="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">Show End date</span>
                                    </label>


                                    <div className='flex flex-col bg-[#E7E7E7] pl-2 pr-2 rounded-lg'>
                                        <label className='text-sm font-semibold mt-1' htmlFor="first name">
                                            <div className="flex w-full">
                                                <span className='ml-0'>
                                                    Select Location  *
                                                </span>
                                                <Tooltip data={"Select Venue for your offer from the list. If your venue is not there in the list you can fill Add Venue form and request Admin to add your venue"} />
                                            </div>
                                        </label>
                                        <select

                                            type="text"
                                            className='px-0 py-0.5 w-full border bg-transparent border-[#E7E7E7] focus:border-transparent focus:ring-transparent  outline-0 text-sm font-medium text-gray-500'
                                            onChange={((e) => setLocation(e.target.value))}
                                            placeholder='Theatre of Arts'
                                        >
                                            {
                                                listVenues.length == 0
                                                    ?
                                                    <option className=' text-sm font-medium' >Select Venue
                                                    </option>
                                                    :
                                                    <>
                                                        <option className=' text-sm font-medium' >Select Venue
                                                        </option>
                                                        {
                                                            listVenues.map((venue) => (
                                                                <option className=' text-sm font-medium' key={venue._id} value={venue._id}>{venue.name}</option>
                                                            ))
                                                        }
                                                    </>
                                            }
                                        </select>
                                    </div>
                                    <button onClick={(() => setShowVenuecreate(!showVenuecreate))}>
                                        {
                                            showVenuecreate
                                                ?
                                                <p className='mt-1'>
                                                    <span className='ml-0  bg-[#E7E7E7] w-28 px-2 py-1 rounded-md text-sm'>+ Close Add Venue form</span>
                                                </p>
                                                :
                                                <>
                                                    <p className='mt-1'>
                                                        <span className='ml-0  bg-[#E7E7E7] w-28 px-2 py-1 rounded-md text-sm'>+ Add Venue</span> <span className='ml-0 text-xs'>(If your Venue is NOT in the above list)</span>
                                                    </p>
                                                </>

                                        }
                                    </button>

                                    {
                                        showVenuecreate
                                            ?
                                            <AddVenueModal />
                                            :
                                            <></>
                                    }


                                    <div className='mt-3 flex flex-col bg-[#E7E7E7] pl-2 pr-2 rounded-lg'>
                                        <label className='text-sm font-semibold mt-1' htmlFor="first name">
                                            <div className="flex w-full">
                                                <span className='ml-0'>
                                                    Venue Information  *
                                                </span>
                                                <Tooltip data={"Add specific information about venue, This information is offer Specific"} />
                                            </div>
                                        </label>
                                        <JoditEditor
                                            ref={editor}
                                            value={venueDescription}
                                            config={config}
                                            tabIndex={1} // tabIndex of textarea
                                            onBlur={newContent => setVenueDescription(newContent)} // preferred to use only this option to update the content for performance reasons
                                        />
                                    </div>

                                    <div className='mt-3 flex flex-col  pl-2 pr-2 rounded-lg'>
                                        <label className='text-sm font-semibold mt-1' htmlFor="first name">
                                            <div className="flex w-full">
                                                <span className='ml-0'>
                                                    Category  *
                                                </span>
                                                <Tooltip data={"Select All the applicable categories, you can select multiple categories also"} />
                                            </div>
                                        </label>
                                        <CategorySelector
                                            categories={listCategory}
                                            selectedCategories={selectedCategories}
                                            onChange={handleEventCategoryChange}
                                        />
                                    </div>

                                    <div className='mb-3 mt-3 flex flex-col pl-2 pr-2 rounded-lg'>

                                        <h3 class="font-semibold text-gray-900 dark:text-white">
                                            <div className="flex w-full">
                                                <span className='ml-0'>
                                                    Features *
                                                </span>
                                                <Tooltip data={"Select All the applicable features, you can select multiple features also"} />
                                            </div>
                                        </h3>
                                        <ul class="w-full flex flex-wrap">
                                            {
                                                Features.list.map((feature) => (
                                                    <li class="w-auto border-b border-gray-200 sm:border-b-0 dark:border-gray-600">
                                                        <div class="flex  items-center pl-3">
                                                            <input id={feature}
                                                                type="checkbox"
                                                                value={feature}
                                                                checked={selectedFeature.includes(feature)}
                                                                onChange={() => handleFeaturesClick(feature)}
                                                                class="w-4 h-4 rounded" />
                                                            <label for={feature} class="w-full py-3 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">{feature}</label>
                                                        </div>
                                                    </li>
                                                ))
                                            }
                                        </ul>
                                    </div>


                                    <div className="flex w-full">
                                        <span className='ml-2 text-sm font-semibold  dark:text-white ml-0'>
                                            Contact
                                        </span>
                                        <Tooltip data={"Provide Contact details"} />
                                    </div>
                                    <div className=' mb-3 flex flex-col justify-between'>
                                        <div className='w-full flex justify-between'>
                                            <div className='w-full mx-1 my-1 flex flex-col bg-[#E7E7E7] pl-2 pr-2 rounded-lg '>
                                                <label className='text-xs mt-1' htmlFor="first name">Facebook URL</label>
                                                <input

                                                    type="text"
                                                    className='px-0 py-0.5 w-full border bg-transparent border-[#E7E7E7] focus:border-transparent focus:ring-transparent  outline-0 placeholder:text-sm font-medium '
                                                    placeholder='Link for FB page'
                                                    onChange={((e) => setFb(e.target.value))}
                                                />
                                            </div>
                                            <div className='w-full mx-1 my-1 flex flex-col bg-[#E7E7E7] pl-2 pr-2 rounded-lg'>
                                                <label className='text-xs mt-1' htmlFor="first name">Insta URL</label>
                                                <input

                                                    type="text"
                                                    className='px-0 py-0.5 w-full border bg-transparent border-[#E7E7E7] focus:border-transparent focus:ring-transparent  outline-0 placeholder:text-sm font-medium '
                                                    placeholder='Link for Instagram page'
                                                    onChange={((e) => setInsta(e.target.value))}
                                                />
                                            </div>
                                            <div className='w-full mx-1 my-1 flex flex-col bg-[#E7E7E7] pl-2 pr-2 rounded-lg'>
                                                <label className='text-xs mt-1' htmlFor="first name">Email</label>
                                                <input

                                                    type="email"
                                                    className='px-0 py-0.5 w-full border bg-transparent border-[#E7E7E7] focus:border-transparent focus:ring-transparent  outline-0 placeholder:text-sm font-medium '
                                                    placeholder='Your email address'
                                                    onChange={((e) => setMail(e.target.value))}
                                                />
                                            </div>
                                        </div>
                                        <div className="w-full flex justify-between">
                                            <div className='w-full mx-1 my-1 flex flex-col bg-[#E7E7E7] pl-2 pr-2 rounded-lg'>
                                                <label className='text-xs mt-1' htmlFor="first name">Phone No.</label>
                                                <input
                                                    type='tel'
                                                    className='px-0 py-0.5 w-full border bg-transparent border-[#E7E7E7] focus:border-transparent focus:ring-transparent  outline-0 placeholder:text-sm font-medium '
                                                    placeholder='Phone number'
                                                    onChange={((e) => setNumber(e.target.value))}
                                                />
                                            </div>

                                            <div className='w-full mx-1 my-1 flex flex-col bg-[#E7E7E7] pl-2 pr-2 rounded-lg'>
                                                <label className='text-xs mt-1' htmlFor="first name">Whatsapp No.</label>
                                                <input
                                                    type="number"
                                                    className='px-0 py-0.5 w-full border bg-transparent border-[#E7E7E7] focus:border-transparent focus:ring-transparent  outline-0 placeholder:text-sm font-medium '
                                                    placeholder='Whatsapp number'
                                                    onChange={((e) => setWpNumber(e.target.value))}
                                                />
                                            </div>

                                            <div className='w-full mx-1 my-1 flex flex-col bg-[#E7E7E7] pl-2 pr-2 rounded-lg'>
                                                <label className='text-xs mt-1' htmlFor="first name">Website link</label>
                                                <input
                                                    type="link"
                                                    className='px-0 py-0.5 w-full border bg-transparent border-[#E7E7E7] focus:border-transparent focus:ring-transparent  outline-0 placeholder:text-sm font-medium '
                                                    placeholder='Website Link'
                                                    onChange={((e) => setWebsite(e.target.value))}
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex w-full">
                                        <span className='ml-2 text-sm font-semibold  dark:text-white ml-0'>
                                            Ticket Sales
                                        </span>
                                        <Tooltip data={"If your offer has tickets you can specify Ticket class, No. of Seats, and price. You can add multiple ticket classes"} />
                                    </div>
                                    <div>
                                        {categories.map((category, index) => (
                                            <div key={index} className='w-full flex flex-row  '>
                                                <div className='w-full mx-1 my-1 bg-[#E7E7E7] pl-2 pr-2 rounded-lg '>
                                                    <label className='text-xs mt-3' >Class name</label>
                                                    <input
                                                        type='text'
                                                        className='px-0 py-0.5 w-full border bg-transparent border-[#E7E7E7] focus:border-transparent focus:ring-transparent outline-0 placeholder:text-sm font-medium flex-grow mx-2'
                                                        placeholder='Class Name'
                                                        value={category.className}
                                                        onChange={(e) => handleCategoryChange(index, 'className', e.target.value)}
                                                    />
                                                </div>
                                                <div className='w-full mx-1 my-1 bg-[#E7E7E7] pl-2 pr-2 rounded-lg '>
                                                    <label className='text-xs mt-3' >No of seats</label>
                                                    <input
                                                        type='number'
                                                        className='px-0 py-0.5 w-full border bg-transparent border-[#E7E7E7] focus:border-transparent focus:ring-transparent outline-0 placeholder:text-sm font-medium ml-2'
                                                        placeholder='No of Seats'
                                                        value={category.seats}
                                                        onChange={(e) => handleCategoryChange(index, 'seats', e.target.value)}
                                                    />
                                                </div>
                                                <div className='w-full mx-1 my-1 bg-[#E7E7E7] pl-2 pr-2 rounded-lg '>
                                                    <label className='text-xs mt-3' >Price</label>
                                                    <input
                                                        type='number'
                                                        min="100"
                                                        className='px-0 py-0.5 w-full border bg-transparent border-[#E7E7E7] focus:border-transparent focus:ring-transparent outline-0 placeholder:text-sm font-medium ml-2'
                                                        placeholder='Price'
                                                        value={category.price}
                                                        onChange={(e) => handleCategoryChange(index, 'price', e.target.value)}
                                                    />
                                                </div>
                                                {index > 0 && (
                                                    <button onClick={() => removeCategory(index)} className='mt-1 ml-2'>
                                                        Delete
                                                    </button>
                                                )}
                                            </div>
                                        ))}

                                        <button onClick={addCategory} className='ml-2 mt-2'>
                                            + Add Ticket Type
                                        </button>
                                    </div>

                                    <div className='mt-3 flex flex-col bg-[#E7E7E7] pl-2 pr-2 rounded-lg'>
                                        <label className='text-xs mt-1' htmlFor="first name">Dicount Percentage on Muscat Whereto App</label>
                                        <input
                                            type="number"
                                            className='px-0 py-0.5 w-full border bg-transparent border-[#E7E7E7] focus:border-transparent focus:ring-transparent  outline-0 placeholder:text-sm font-medium '
                                            placeholder='10'
                                            onChange={((e) => setDiscountOnApp(e.target.value))}
                                        />
                                    </div>

                                    <div className='mt-3 mb-2 flex flex-col bg-[#E7E7E7] pl-2 pr-2 rounded-lg'>
                                        <label className='text-sm font-semibold mt-1' htmlFor="first name">
                                            <div className="flex w-full">
                                                <span className='ml-0'>
                                                    Link for Terms And Condition  *
                                                </span>
                                                <Tooltip data={"Give link to your terms and conditions page, if have pdf you can give accessable drive link"} />
                                            </div>
                                        </label>
                                        <input
                                            type="text"
                                            className='px-0 py-0.5 w-full border bg-transparent border-[#E7E7E7] focus:border-transparent focus:ring-transparent  outline-0 placeholder:text-sm font-medium '
                                            placeholder='Link for terms and condition'
                                            onChange={((e) => setTermsAndConditions(e.target.value))}
                                        />
                                    </div>


                                    <div>
                                        <div className="flex w-full">
                                            <span className='ml-2 text-sm font-semibold mt-1 ml-0'>
                                                Additional Terms & Conditions
                                            </span>
                                            <Tooltip data={"You can add max 3 custom terms and conditions which will be displayed on the book ticket page, example ~ Are you 18+ "} />
                                        </div>
                                        {inputFields.map((value, index) => (
                                            <div
                                                key={index}
                                                className='flex mt-1 flex flex-col bg-[#E7E7E7] pl-2 pr-2 rounded-lg'
                                            >
                                                <label className='text-xs mt-1' htmlFor={`field-${index}`}>
                                                    Terms or condition {index + 1}
                                                </label>
                                                <div className="flex align-middle justify-between">

                                                    <input
                                                        type='text'
                                                        id={`field-${index}`}
                                                        className='px-0 py-0.5 w-full border bg-transparent border-[#E7E7E7] focus:border-transparent focus:ring-transparent outline-0 placeholder:text-sm font-medium'
                                                        placeholder={`Enter term or condition ${index + 1}`}
                                                        value={value}
                                                        onChange={(e) => handleInputChange(index, e.target.value)}
                                                    />
                                                    {
                                                        index == 0
                                                            ?
                                                            <>
                                                            </>
                                                            :
                                                            <button className="" onClick={() => removeInputField(index)}>
                                                                Delete
                                                            </button>
                                                    }
                                                </div>
                                            </div>
                                        ))}

                                        {inputFields.length < 3 && (
                                            <button onClick={addInputField} className='mt-3'>
                                                + Add term and condition
                                            </button>
                                        )}
                                    </div>


                                    <div className="mt-4 flex w-full items-center align-middle">
                                        <span className='mt-1 ml-2 text-xs font-medium  dark:text-white ml-0'>
                                            Featured Image *
                                        </span>
                                        <Tooltip data={"Featured Image is Main Poster of your offer which will be visible to the clients "} />
                                    </div>                                    <input class="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-[#E7E7E7] dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 mb-1"
                                        onChange={capturePhoto}
                                        accept="image/*"
                                        id="photo" type="file" />

                                    <div className="mt-2 flex w-full items-center align-middle">
                                        <span className='mt-1 ml-2 text-xs font-medium  dark:text-white ml-0'>
                                            Additional Images
                                        </span>
                                        <Tooltip data={"You can add multiple images about your offer which will be visible on offer Description page"} />
                                    </div>
                                    <input class="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-[#E7E7E7] dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 mb-1"
                                        onChange={captureAdditionalPhotos}
                                        accept="image/*"
                                        multiple id="photo" type="file" />


                                    <div className="flex w-full items-center align-middle">
                                        <span className='mt-1 ml-2 text-xs font-medium  dark:text-white ml-0'>
                                            Seating Map
                                        </span>
                                        <Tooltip data={"Add seating map image for your venue"} />
                                    </div>
                                    <input class="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-[#E7E7E7] dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 mb-1"

                                        onChange={captureSeatingMap}
                                        accept="image/*"
                                        id="photo" type="file" />

                                    <div className="flex w-full items-center align-middle">
                                        <span className='ml-2 h-auto text-xs font-medium  dark:text-white ml-0'>
                                            Banner
                                        </span>
                                        <Tooltip data={"Add Banner image for your offer"} />
                                    </div>
                                    <input class="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-[#E7E7E7] dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 mb-1" id="file_input"

                                        onChange={captureBanner}
                                        accept="image/*"
                                        type="file" />

                                    <div className="flex w-full items-center align-middle">
                                        <span className='ml-2 text-xs font-medium  dark:text-white ml-0'>
                                            Video
                                        </span>
                                        <Tooltip data={"Add sample video of the offer"} />
                                    </div>                                    <input class="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-[#E7E7E7] dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 mb-1" id="file_input"
                                        accept="video/*"
                                        onChange={captureVideo}
                                        type="file" />

                                    <div className="button flex justify-center items-center mt-5">
                                        <button
                                            type="button"
                                            onClick={handleSave}
                                            className="w-full md:w-44 text-white bg-[#C0A04C] hover:bg-[#A48533] focus:ring-4 focus:outline-none focus:ring-bg-[#A48533] font-semibold rounded-lg text-md px-4 py-4 text-center md:mr-3 md:mr-0 dark:bg-[#C0A04C] dark:hover:bg-white dark:focus:ring-blue-800"
                                        >
                                            Save
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </section>
                        // <section className='md:mt-12 flex bg-white drop-shadow-2xl rounded-lg'>
                        //     <div className='w-96 md:w-[1000px]'>
                        //         <div className="modal bg-white px-3 py-4">
                        //             <div className='text-left flex justify-start items-start align-middle'>
                        //                 <p className='text-md font-bold'>Offer Details</p>
                        //             </div>
                        //             <div className='mt-3 flex flex-col bg-[#E7E7E7] pl-2 pr-2 rounded-lg'>
                        //                 <label className='text-sm font-semibold mt-1' htmlFor="first name *">Title  *</label>
                        //                 <input
                        //                     type="text"
                        //                     className='px-0 py-0.5 w-full border bg-transparent border-[#E7E7E7] focus:border-transparent focus:ring-transparent  outline-0 placeholder:text-sm font-medium '
                        //                     onChange={((e) => setTitle(e.target.value))}
                        //                     placeholder='Breakfast and poolpass'

                        //                 />
                        //             </div>

                        //             <div className='mt-3 flex flex-col bg-[#E7E7E7] pl-2 pr-2 rounded-lg'>
                        //                 <label className='text-sm font-semibold mt-1' htmlFor="first name">Short Description *</label>
                        //                 <input
                        //                     type="text"
                        //                     className='px-0 py-0.5 w-full border bg-transparent border-[#E7E7E7] focus:border-transparent focus:ring-transparent  outline-0 placeholder:text-sm font-medium '
                        //                     placeholder='Breakfast and poolpass'
                        //                     onChange={((e) => setShortDesc(e.target.value))}
                        //                 />
                        //             </div>

                        //             <div className='mt-3 flex flex-col bg-[#E7E7E7] pl-2 pr-2 rounded-lg'>
                        //                 <label className='text-sm font-semibold mt-1' htmlFor="first name">Offer Description  *</label>
                        //                 <JoditEditor
                        //                     ref={editor}
                        //                     value={content}
                        //                     config={config}
                        //                     tabIndex={1} // tabIndex of textarea
                        //                     onBlur={newContent => setContent(newContent)} // preferred to use only this option to update the content for performance reasons
                        //                 />
                        //             </div>

                        //             <p className='ml-2 text-sm font-semibold mt-2'>Select Start Date-time and End Date-time:</p>
                        //             <div className="flex align-middle items-center  w-full mt-2 space-x-4">
                        //                 <div className="flex w-full row1 space-x-4 ">
                        //                     <div className='w-full  flex flex-col bg-[#E7E7E7] pl-2 pr-2 rounded-lg'>
                        //                         <label className='input-container text-xs mt-1' htmlFor="first name">Date</label>
                        //                         <input
                        //                             type="datetime-local"
                        //                             min={minDateTime}
                        //                             id="session-date"
                        //                             onChange={((e) => setStartDate(e.target.value))}
                        //                             className='px-0 py-0.5 w-full placeholder:text-sm border bg-transparent border-[#E7E7E7] focus:border-transparent focus:ring-transparent  outline-0 placeholder:text-sm text-sm font-medium'
                        //                         />
                        //                     </div>
                        //                 </div>
                        //                 <p className='text-center'>to</p>
                        //                 <div className="flex w-full row1 space-x-4 ">
                        //                     <div className='w-full  flex flex-col bg-[#E7E7E7] pl-2 pr-2 rounded-lg'>
                        //                         <label className='text-xs mt-1' htmlFor="first name">Date</label>
                        //                         <input
                        //                             type="datetime-local"
                        //                             min={minDateTime}
                        //                             id="session-date"
                        //                             onChange={((e) => setEndDate(e.target.value))}
                        //                             className='px-0 py-0.5 w-full placeholder:text-sm border bg-transparent border-[#E7E7E7] focus:border-transparent focus:ring-transparent  outline-0 placeholder:text-sm text-sm font-medium'
                        //                         />
                        //                     </div>
                        //                 </div>
                        //             </div>

                        //             <div>
                        //                 <p className='text-sm mt-2'>Select Days of the Week For recurring offer :</p>
                        //                 <div className='flex space-x-4 align-middle items-center '>
                        //                     {
                        //                         days.map((day, index) => (
                        //                             <div className='mx-2'>
                        //                                 <label key={index} className="block">
                        //                                     <input
                        //                                         className='rounded-sm mr-1'
                        //                                         type="checkbox"
                        //                                         value={day}
                        //                                         checked={selectedDays.includes(day)}
                        //                                         onChange={() => handleDayClick(day)}
                        //                                     />
                        //                                     <span className='ml-0 text-sm '>
                        //                                         {day}
                        //                                     </span>
                        //                                 </label>
                        //                             </div>
                        //                         ))
                        //                     }
                        //                     <div className='flex'>
                        //                         <div className='flex flex-col bg-[#E7E7E7] pl-2 pr-2 mr-2 rounded-lg'>
                        //                             <label className='input-container text-xs mt-1' htmlFor="first name">Start Time</label>
                        //                             <input type="time" className="px-0 py-0.5 placeholder:text-sm border bg-transparent border-[#E7E7E7] focus:border-transparent focus:ring-transparent outline-0 placeholder:text-sm text-sm font-medium" name="" id="session-time" />
                        //                         </div>
                        //                         <div className='flex flex-col bg-[#E7E7E7] pl-2 pr-2 rounded-lg'>
                        //                             <label className='input-container text-xs mt-1' htmlFor="first name">End Time</label>
                        //                             <input type="time" className="px-0 py-0.5 placeholder:text-sm border bg-transparent border-[#E7E7E7] focus:border-transparent focus:ring-transparent outline-0 placeholder:text-sm text-sm font-medium" name="" id="session-time" />
                        //                         </div>
                        //                     </div>
                        //                 </div>

                        //             </div>

                        //             <div className="flex space-x-2 mt-1 mb-3">
                        //                 {/* <button className="bg-[#E7E7E7] w-28 px-2 py-1 rounded-md text-sm" onClick={() => }>Recurring</button> */}
                        //             </div>


                        //             <div className='flex flex-col bg-[#E7E7E7] pl-2 pr-2 rounded-lg'>
                        //                 <label className='text-sm font-semibold mt-1' htmlFor="first name">Select Location  *</label>
                        //                 <select

                        //                     type="text"
                        //                     className='px-0 py-0.5 w-full border bg-transparent border-[#E7E7E7] focus:border-transparent focus:ring-transparent  outline-0 text-sm font-medium text-gray-500'
                        //                     onChange={((e) => setLocation(e.target.value))}
                        //                     placeholder='Theatre of Arts'
                        //                 >
                        //                     {
                        //                         listVenues.length == 0
                        //                             ?
                        //                             <option className=' text-sm font-medium' >Select Venue
                        //                             </option>
                        //                             :
                        //                             <>
                        //                                 <option className=' text-sm font-medium' >Select Venue
                        //                                 </option>
                        //                                 {
                        //                                     listVenues.map((venue) => (
                        //                                         <option className=' text-sm font-medium' key={venue._id} value={venue._id}>{venue.name}</option>
                        //                                     ))
                        //                                 }
                        //                             </>
                        //                     }
                        //                 </select>
                        //             </div>
                        //             <button onClick={(() => setShowVenuecreate(!showVenuecreate))}>
                        //                 {
                        //                     showVenuecreate
                        //                         ?
                        //                         <p className='mt-1'>
                        //                             <span className='ml-0  bg-[#E7E7E7] w-28 px-2 py-1 rounded-md text-sm'>+ Close Add Venue form</span>
                        //                         </p>
                        //                         :
                        //                         <>
                        //                             <p className='mt-1'>
                        //                                 <span className='ml-0  bg-[#E7E7E7] w-28 px-2 py-1 rounded-md text-sm'>+ Add Venue</span> <span className='ml-0 text-xs'>(If your Venue is NOT in the above list)</span>
                        //                             </p>
                        //                         </>

                        //                 }
                        //             </button>

                        //             {
                        //                 showVenuecreate
                        //                     ?
                        //                     <AddVenueModal />
                        //                     :
                        //                     <></>
                        //             }


                        //             <div className='mt-3 flex flex-col bg-[#E7E7E7] pl-2 pr-2 rounded-lg'>
                        //                 <label className='text-sm font-semibold mt-1' htmlFor="first name">Venue Information  *</label>
                        //                 <JoditEditor

                        //                     ref={editor}
                        //                     value={content}
                        //                     config={config}
                        //                     tabIndex={1} // tabIndex of textarea
                        //                     onBlur={newContent => setContent(newContent)} // preferred to use only this option to update the content for performance reasons
                        //                 />
                        //             </div>

                        //             <div className='mt-3 flex flex-col bg-[#E7E7E7] pl-2 pr-2 rounded-lg'>
                        //                 <label className='text-sm font-semibold mt-1' htmlFor="first name">Category  *</label>
                        //                 <select
                        //                     type="text"
                        //                     className='px-0 py-0.5 w-full border bg-transparent border-[#E7E7E7] focus:border-transparent focus:ring-transparent  outline-0 text-sm font-medium text-gray-500'
                        //                     onChange={((e) => setEventCategory(e.target.value))}

                        //                     placeholder='Theatre of Arts'
                        //                 >
                        //                     {
                        //                         listCategory.map((category) => (
                        //                             <option className=' text-sm font-medium' key={category._id} value={category.categoryURL}>{category.name}</option>
                        //                         ))
                        //                     }
                        //                 </select>
                        //             </div>

                        //             <div className='mb-3 mt-3 flex flex-col pl-2 pr-2 rounded-lg'>

                        //                 <h3 class="font-semibold text-gray-900 dark:text-white">Features</h3>
                        //                 <ul class="items-center w-full text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg sm:flex dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                        //                     {
                        //                         Features.list.map((feature) => (
                        //                             <li class="w-full border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600">
                        //                                 <div class="flex items-center pl-3">
                        //                                     <input id={feature} type="checkbox" value="" class="w-4 h-4 rounded" />
                        //                                     <label for={feature} class="w-full py-3 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">{feature}</label>
                        //                                 </div>
                        //                             </li>
                        //                         ))
                        //                     }
                        //                 </ul>

                        //             </div>


                        //             <label class="ml-2 text-sm font-semibold  dark:text-white" for="file_input">Contact</label>
                        //             <div className=' mb-3 flex flex-col justify-between'>
                        //                 <div className='w-full flex justify-between'>
                        //                     <div className='w-full mx-1 my-1 flex flex-col bg-[#E7E7E7] pl-2 pr-2 rounded-lg '>
                        //                         <label className='text-xs mt-1' htmlFor="first name">Facebook URL</label>
                        //                         <input

                        //                             type="text"
                        //                             className='px-0 py-0.5 w-full border bg-transparent border-[#E7E7E7] focus:border-transparent focus:ring-transparent  outline-0 placeholder:text-sm font-medium '
                        //                             placeholder='Link for FB page'
                        //                             onChange={((e) => setFb(e.target.value))}
                        //                         />
                        //                     </div>
                        //                     <div className='w-full mx-1 my-1 flex flex-col bg-[#E7E7E7] pl-2 pr-2 rounded-lg'>
                        //                         <label className='text-xs mt-1' htmlFor="first name">Insta URL</label>
                        //                         <input

                        //                             type="text"
                        //                             className='px-0 py-0.5 w-full border bg-transparent border-[#E7E7E7] focus:border-transparent focus:ring-transparent  outline-0 placeholder:text-sm font-medium '
                        //                             placeholder='Link for Instagram page'
                        //                             onChange={((e) => setInsta(e.target.value))}
                        //                         />
                        //                     </div>
                        //                     <div className='w-full mx-1 my-1 flex flex-col bg-[#E7E7E7] pl-2 pr-2 rounded-lg'>
                        //                         <label className='text-xs mt-1' htmlFor="first name">Email</label>
                        //                         <input

                        //                             type="email"
                        //                             className='px-0 py-0.5 w-full border bg-transparent border-[#E7E7E7] focus:border-transparent focus:ring-transparent  outline-0 placeholder:text-sm font-medium '
                        //                             placeholder='Your email address'
                        //                             onChange={((e) => setMail(e.target.value))}
                        //                         />
                        //                     </div>
                        //                 </div>
                        //                 <div className="w-full flex justify-between">
                        //                     <div className='w-full mx-1 my-1 flex flex-col bg-[#E7E7E7] pl-2 pr-2 rounded-lg'>
                        //                         <label className='text-xs mt-1' htmlFor="first name">Phone No.</label>
                        //                         <input
                        //                             type='tel'
                        //                             className='px-0 py-0.5 w-full border bg-transparent border-[#E7E7E7] focus:border-transparent focus:ring-transparent  outline-0 placeholder:text-sm font-medium '
                        //                             placeholder='Phone number'
                        //                             onChange={((e) => setNumber(e.target.value))}
                        //                         />
                        //                     </div>

                        //                     <div className='w-full mx-1 my-1 flex flex-col bg-[#E7E7E7] pl-2 pr-2 rounded-lg'>
                        //                         <label className='text-xs mt-1' htmlFor="first name">Whatsapp No.</label>
                        //                         <input
                        //                             type="number"
                        //                             className='px-0 py-0.5 w-full border bg-transparent border-[#E7E7E7] focus:border-transparent focus:ring-transparent  outline-0 placeholder:text-sm font-medium '
                        //                             placeholder='Whatsapp number'
                        //                             onChange={((e) => setNumber(e.target.value))}
                        //                         />
                        //                     </div>

                        //                     <div className='w-full mx-1 my-1 flex flex-col bg-[#E7E7E7] pl-2 pr-2 rounded-lg'>
                        //                         <label className='text-xs mt-1' htmlFor="first name">Website link</label>
                        //                         <input
                        //                             type="link"
                        //                             className='px-0 py-0.5 w-full border bg-transparent border-[#E7E7E7] focus:border-transparent focus:ring-transparent  outline-0 placeholder:text-sm font-medium '
                        //                             placeholder='Website Link'
                        //                             onChange={((e) => setNumber(e.target.value))}
                        //                         />
                        //                     </div>
                        //                 </div>
                        //             </div>

                        //             <label class="ml-2 text-sm font-semibold  dark:text-white" for="file_input">Voucher Sales</label>
                        //             <div>
                        //                 {categories.map((category, index) => (
                        //                     <div key={index} className='w-full flex flex-row  '>
                        //                         <div className='w-full mx-1 my-1 bg-[#E7E7E7] pl-2 pr-2 rounded-lg '>
                        //                             <label className='text-xs mt-3' >Class name</label>
                        //                             <input
                        //                                 type='text'
                        //                                 className='px-0 py-0.5 w-full border bg-transparent border-[#E7E7E7] focus:border-transparent focus:ring-transparent outline-0 placeholder:text-sm font-medium flex-grow mx-2'
                        //                                 placeholder='Class Name'
                        //                                 value={category.className}
                        //                                 onChange={(e) => handleCategoryChange(index, 'className', e.target.value)}
                        //                             />
                        //                         </div>
                        //                         <div className='w-full mx-1 my-1 bg-[#E7E7E7] pl-2 pr-2 rounded-lg '>
                        //                             <label className='text-xs mt-3' >No of Vouchers</label>
                        //                             <input
                        //                                 type='number'
                        //                                 className='px-0 py-0.5 w-full border bg-transparent border-[#E7E7E7] focus:border-transparent focus:ring-transparent outline-0 placeholder:text-sm font-medium ml-2'
                        //                                 placeholder='No of Vouchers'
                        //                                 value={category.seats}
                        //                                 onChange={(e) => handleCategoryChange(index, 'seats', e.target.value)}
                        //                             />
                        //                         </div>
                        //                         <div className='w-full mx-1 my-1 bg-[#E7E7E7] pl-2 pr-2 rounded-lg '>
                        //                             <label className='text-xs mt-3' >Price</label>
                        //                             <input
                        //                                 type='number'
                        //                                 min="100"
                        //                                 className='px-0 py-0.5 w-full border bg-transparent border-[#E7E7E7] focus:border-transparent focus:ring-transparent outline-0 placeholder:text-sm font-medium ml-2'
                        //                                 placeholder='Price'
                        //                                 value={category.price}
                        //                                 onChange={(e) => handleCategoryChange(index, 'price', e.target.value)}
                        //                             />
                        //                         </div>
                        //                         {index > 0 && (
                        //                             <button onClick={() => removeCategory(index)} className='mt-1 ml-2'>
                        //                                 Delete
                        //                             </button>
                        //                         )}
                        //                     </div>
                        //                 ))}

                        //                 <button onClick={addCategory} className='ml-2 mt-2'>
                        //                     + Add Ticket Type
                        //                 </button>
                        //             </div>

                        //             <div className='mt-3 flex flex-col bg-[#E7E7E7] pl-2 pr-2 rounded-lg'>
                        //                 <label className='text-xs mt-1' htmlFor="first name">Dicount Percentage on Muscat Whereto App</label>
                        //                 <input
                        //                     type="number"
                        //                     className='px-0 py-0.5 w-full border bg-transparent border-[#E7E7E7] focus:border-transparent focus:ring-transparent  outline-0 placeholder:text-sm font-medium '
                        //                     placeholder='10'
                        //                     onChange={((e) => setDiscountOnApp(e.target.value))}
                        //                 />
                        //             </div>

                        //             <div className='mt-3 mb-2 flex flex-col bg-[#E7E7E7] pl-2 pr-2 rounded-lg'>
                        //                 <label className='text-sm font-semibold mt-1' htmlFor="first name">Terms And Condition  *</label>
                        //                 <input

                        //                     type="text"
                        //                     className='px-0 py-0.5 w-full border bg-transparent border-[#E7E7E7] focus:border-transparent focus:ring-transparent  outline-0 placeholder:text-sm font-medium '
                        //                     placeholder='Link for terms and condition'
                        //                     onChange={((e) => setTermsAndConditions(e.target.value))}
                        //                 />
                        //             </div>


                        //             <div>
                        //                 <label className='ml-2 text-sm font-semibold mt-1' >Additional Terms & Conditions</label>

                        //                 {inputFields.map((value, index) => (
                        //                     <div
                        //                         key={index}
                        //                         className='flex mt-1 flex flex-col bg-[#E7E7E7] pl-2 pr-2 rounded-lg'
                        //                     >
                        //                         <label className='text-xs mt-1' htmlFor={`field-${index}`}>
                        //                             Terms or condition {index + 1}
                        //                         </label>
                        //                         <div className="flex align-middle justify-between">

                        //                             <input
                        //                                 type='text'
                        //                                 id={`field-${index}`}
                        //                                 className='px-0 py-0.5 w-full border bg-transparent border-[#E7E7E7] focus:border-transparent focus:ring-transparent outline-0 placeholder:text-sm font-medium'
                        //                                 placeholder={`Enter term or condition ${index + 1}`}
                        //                                 value={value}
                        //                                 onChange={(e) => handleInputChange(index, e.target.value)}
                        //                             />
                        //                             {
                        //                                 index == 0
                        //                                     ?
                        //                                     <>
                        //                                     </>
                        //                                     :
                        //                                     <button className="" onClick={() => removeInputField(index)}>
                        //                                         Delete
                        //                                     </button>
                        //                             }
                        //                         </div>
                        //                     </div>
                        //                 ))}

                        //                 {inputFields.length < 3 && (
                        //                     <button onClick={addInputField} className='mt-3'>
                        //                         + Add term and condition
                        //                     </button>
                        //                 )}
                        //             </div>


                        //             <label class="mt-1 ml-2 text-xs font-medium  dark:text-white" for="file_input">Featured Image</label>
                        //             <input class="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-[#E7E7E7] dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 mb-1"

                        //                 onChange={capturePhoto}
                        //                 id="photo" type="file" />

                        //             <label class="mt-1 ml-2 text-xs font-medium  dark:text-white" for="file_input">Additional Images</label>
                        //             <input class="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-[#E7E7E7] dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 mb-1"
                        //                 multiple id="photo" type="file" />


                        //             <label class="mt-1 ml-2 text-xs font-medium  dark:text-white" for="file_input">Seating Map</label>
                        //             <input class="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-[#E7E7E7] dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 mb-1"

                        //                 onChange={captureSeatingMap}
                        //                 id="photo" type="file" />

                        //             <label class="ml-2 text-xs font-medium  dark:text-white" for="file_input">Banner</label>
                        //             <input class="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-[#E7E7E7] dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 mb-1" id="file_input"

                        //                 onChange={captureBanner}
                        //                 type="file" />

                        //             <label class="ml-2 text-xs font-medium  dark:text-white" for="file_input">Video</label>
                        //             <input class="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-[#E7E7E7] dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 mb-1" id="file_input"
                        //                 onChange={captureVideo}
                        //                 type="file" />

                        //             {/* <div>
                        //             asdfsdadf
                        //             <input type="file" onChange={onFileChange} ref={inputRef} accept="image/*" />
                        //             {image && (
                        //                 <div>
                        //                     <Cropper
                        //                         image={image}
                        //                         crop={crop}
                        //                         zoom={zoom}
                        //                         aspect={4 / 3} // Set the aspect ratio as needed
                        //                         onCropChange={setCrop}
                        //                         onCropComplete={onCropComplete}
                        //                         onZoomChange={setZoom}
                        //                     />
                        //                     <button className="" onClick={onCropComplete}>yes</button>
                        //                 </div>
                        //             )}
                        //             {croppedImage && (
                        //                 <img src={croppedImage} alt="Cropped" style={{ maxWidth: '100%' }} />
                        //             )}
                        //         </div> */}

                        //             <div className="button flex justify-center items-center mt-5">
                        //                 <button
                        //                     type="button"
                        //                     onClick={handleSave}
                        //                     className="w-full md:w-44 text-white bg-[#C0A04C] hover:bg-[#A48533] focus:ring-4 focus:outline-none focus:ring-bg-[#A48533] font-semibold rounded-lg text-md px-4 py-4 text-center md:mr-3 md:mr-0 dark:bg-[#C0A04C] dark:hover:bg-white dark:focus:ring-blue-800"
                        //                 >
                        //                     Save
                        //                 </button>
                        //             </div>

                        //         </div>
                        //     </div>
                        // </section>
                        // <section className='md:mt-12 flex bg-white drop-shadow-2xl rounded-lg'>
                        //     <div className='w-96 md:w-[1000px]'>
                        //         <div className="modal bg-white px-3 py-4">
                        //             <div className='text-left flex justify-start items-start align-middle'>
                        //                 <p className='text-md font-bold'>Event Details</p>
                        //             </div>
                        //             <div className='mt-3 flex flex-col bg-[#E7E7E7] pl-2 pr-2 rounded-lg'>
                        //                 <label className='text-xs mt-1' htmlFor="first name *">Title  *</label>
                        //                 <input
                        //                     type="text"
                        //                     className='px-0 py-0.5 w-full border bg-transparent border-[#E7E7E7] focus:border-transparent focus:ring-transparent  outline-0 placeholder:text-sm font-medium '
                        //                     onChange={((e) => setTitle(e.target.value))}
                        //                     placeholder='Breakfast and poolpass at crown plaza'

                        //                 />
                        //             </div>

                        //             <div className='mt-3 flex flex-col bg-[#E7E7E7] pl-2 pr-2 rounded-lg'>
                        //                 <label className='text-xs mt-1' htmlFor="first name">Short Description</label>
                        //                 <input
                        //                     type="text"
                        //                     className='px-0 py-0.5 w-full border bg-transparent border-[#E7E7E7] focus:border-transparent focus:ring-transparent  outline-0 placeholder:text-sm font-medium '
                        //                     placeholder='Breakfast and poolpass at crown plaza'
                        //                     onChange={((e) => setShortDesc(e.target.value))}
                        //                 />
                        //             </div>
                        //             <div className='mt-3 flex flex-col bg-[#E7E7E7] pl-2 pr-2 rounded-lg'>
                        //                 <label className='text-xs mt-1' htmlFor="first name">Event Description  *</label>
                        //                 <JoditEditor

                        //                     ref={editor}
                        //                     value={content}
                        //                     config={config}
                        //                     tabIndex={1} // tabIndex of textarea
                        //                     onBlur={newContent => setContent(newContent)} // preferred to use only this option to update the content for performance reasons
                        //                 />
                        //             </div>
                        //             <div className="flex space-x-2 mt-3">
                        //                 <button className="bg-[#E7E7E7] w-28 px-2 py-1 rounded-md text-sm" onClick={() => setDatetype(true)}>Date Range</button>
                        //                 <button className="bg-[#E7E7E7] w-28 px-2 py-1 rounded-md text-sm" onClick={() => setDatetype(false)}>Recurring</button>
                        //             </div>
                        //             {
                        //                 datetype
                        //                     ?
                        //                     <div className="flex align-middle items-center  w-full mt-2 space-x-4">
                        //                         <div className="flex w-full row1 space-x-4 ">
                        //                             <div className='w-full  flex flex-col bg-[#E7E7E7] pl-2 pr-2 rounded-lg'>
                        //                                 <label className='input-container text-xs mt-1' htmlFor="first name">Date</label>
                        //                                 <input
                        //                                     type="datetime-local"
                        //                                     min={minDateTime}
                        //                                     id="session-date"
                        //                                     onChange={((e) => setStartDate(e.target.value))}
                        //                                     className='px-0 py-0.5 w-full placeholder:text-sm border bg-transparent border-[#E7E7E7] focus:border-transparent focus:ring-transparent  outline-0 placeholder:text-sm text-sm font-medium'
                        //                                 />
                        //                             </div>
                        //                         </div>
                        //                         <p className='text-center'>to</p>
                        //                         <div className="flex w-full row1 space-x-4 ">
                        //                             <div className='w-full  flex flex-col bg-[#E7E7E7] pl-2 pr-2 rounded-lg'>
                        //                                 <label className='text-xs mt-1' htmlFor="first name">Date</label>
                        //                                 <input
                        //                                     type="datetime-local"
                        //                                     id="session-date"
                        //                                     onChange={((e) => setEndDate(e.target.value))}
                        //                                     className='px-0 py-0.5 w-full placeholder:text-sm border bg-transparent border-[#E7E7E7] focus:border-transparent focus:ring-transparent  outline-0 placeholder:text-sm text-sm font-medium'
                        //                                 />
                        //                             </div>
                        //                         </div>
                        //                     </div>
                        //                     :
                        //                     (
                        //                         <div>
                        //                             <p className='text-sm mt-2'>Select Days of the Week:</p>
                        //                             <div className='flex'>
                        //                                 {
                        //                                     days.map((day, index) => (
                        //                                         <>
                        //                                             <div className='mx-2'>
                        //                                                 <label key={index} className="block">
                        //                                                     <input
                        //                                                         className='rounded-sm mr-1'
                        //                                                         type="checkbox"
                        //                                                         value={day}
                        //                                                         checked={selectedDays.includes(day)}
                        //                                                         onChange={() => handleDayClick(day)}
                        //                                                     />
                        //                                                     <span className='ml-0 text-sm '>
                        //                                                         {day}
                        //                                                     </span>
                        //                                                 </label>
                        //                                             </div>
                        //                                         </>
                        //                                     ))
                        //                                 }
                        //                             </div>
                        //                         </div>
                        //                     )
                        //             }
                        //             <div className='mt-3 flex flex-col bg-[#E7E7E7] pl-2 pr-2 rounded-lg'>
                        //                 <label className='text-xs mt-1' htmlFor="first name">Category  *</label>
                        //                 <select
                        //                     type="text"
                        //                     className='px-0 py-0.5 w-full border bg-transparent border-[#E7E7E7] focus:border-transparent focus:ring-transparent  outline-0 text-sm font-medium text-gray-500'
                        //                     onChange={((e) => setEventCategory(e.target.value))}

                        //                     placeholder='Theatre of Arts'
                        //                 >
                        //                     {
                        //                         listCategory.map((category) => (
                        //                             <option className=' text-sm font-medium' key={category._id} value={category.categoryURL}>{category.name}</option>
                        //                         ))
                        //                     }

                        //                     <option className=' text-sm font-medium' value="eat">Eat</option>
                        //                     <option className=' text-sm font-medium' value="weeklyoffers">Weekly Offers</option>
                        //                 </select>
                        //             </div>

                        //             <div className='mt-3 flex flex-col bg-[#E7E7E7] pl-2 pr-2 rounded-lg'>
                        //                 <label className='text-xs mt-1' htmlFor="first name">Location  *</label>
                        //                 <select

                        //                     type="text"
                        //                     className='px-0 py-0.5 w-full border bg-transparent border-[#E7E7E7] focus:border-transparent focus:ring-transparent  outline-0 text-sm font-medium text-gray-500'
                        //                     onChange={((e) => setLocation(e.target.value))}
                        //                     placeholder='Theatre of Arts'
                        //                 >
                        //                     {
                        //                         listVenues.length == 0
                        //                             ?
                        //                             <option className=' text-sm font-medium' >Select Venue
                        //                             </option>
                        //                             :
                        //                             <>
                        //                                 <option className=' text-sm font-medium' >Select Venue
                        //                                 </option>
                        //                                 {
                        //                                     listVenues.map((venue) => (
                        //                                         <option className=' text-sm font-medium' key={venue._id} value={venue._id}>{venue.name}</option>
                        //                                     ))
                        //                                 }
                        //                             </>
                        //                     }
                        //                 </select>
                        //             </div>

                        //             {/* <div>
                        //             asdfsdadf
                        //             <input type="file" onChange={onFileChange} ref={inputRef} accept="image/*" />
                        //             {image && (
                        //                 <div>
                        //                     <Cropper
                        //                         image={image}
                        //                         crop={crop}
                        //                         zoom={zoom}
                        //                         aspect={4 / 3} // Set the aspect ratio as needed
                        //                         onCropChange={setCrop}
                        //                         onCropComplete={onCropComplete}
                        //                         onZoomChange={setZoom}
                        //                     />
                        //                     <button className="" onClick={onCropComplete}>yes</button>
                        //                 </div>
                        //             )}
                        //             {croppedImage && (
                        //                 <img src={croppedImage} alt="Cropped" style={{ maxWidth: '100%' }} />
                        //             )}
                        //         </div> */}

                        //             <div>
                        //                 <label className='text-xs mt-3' >Custom</label>

                        //                 {inputFields.map((value, index) => (
                        //                     <div
                        //                         key={index}
                        //                         className='flex mt-1 flex flex-col bg-[#E7E7E7] pl-2 pr-2 rounded-lg'
                        //                     >
                        //                         <label className='text-xs mt-1' htmlFor={`field-${index}`}>
                        //                             Custom Question {index + 1}
                        //                         </label>
                        //                         <div className="flex align-middle justify-between">

                        //                             <input
                        //                                 type='text'
                        //                                 id={`field-${index}`}
                        //                                 className='px-0 py-0.5 w-full border bg-transparent border-[#E7E7E7] focus:border-transparent focus:ring-transparent outline-0 placeholder:text-sm font-medium'
                        //                                 placeholder={`Enter question ${index + 1}`}
                        //                                 value={value}
                        //                                 onChange={(e) => handleInputChange(index, e.target.value)}
                        //                             />
                        //                             {
                        //                                 index == 0
                        //                                     ?
                        //                                     <>
                        //                                     </>
                        //                                     :
                        //                                     <button className="" onClick={() => removeInputField(index)}>
                        //                                         Delete
                        //                                     </button>
                        //                             }
                        //                         </div>
                        //                     </div>
                        //                 ))}

                        //                 {inputFields.length < 3 && (
                        //                     <button onClick={addInputField} className='mt-3'>
                        //                         + Add Field
                        //                     </button>
                        //                 )}

                        //                 {/* <button onClick={handleAddToArray} className='mt-3'>
                        //                 Add to Array
                        //             </button> */}
                        //             </div>

                        //             <div>
                        //                 {categories.map((category, index) => (
                        //                     <div key={index} className='w-full mt-3 flex flex-row space-x-2 '>
                        //                         <div className='w-full bg-[#E7E7E7] pl-2 pr-2 rounded-lg '>
                        //                             <label className='text-xs mt-3' >Offer Class</label>
                        //                             <input
                        //                                 type='text'
                        //                                 className='px-0 py-0.5 w-full border bg-transparent border-[#E7E7E7] focus:border-transparent focus:ring-transparent outline-0 placeholder:text-sm font-medium flex-grow mx-2'
                        //                                 placeholder='Class Name'
                        //                                 value={category.className}
                        //                                 onChange={(e) => handleCategoryChange(index, 'className', e.target.value)}
                        //                             />
                        //                         </div>
                        //                         <div className='w-full bg-[#E7E7E7] pl-2 pr-2 rounded-lg '>
                        //                             <label className='text-xs mt-3' >No of Vouchers</label>
                        //                             <input
                        //                                 type='number'
                        //                                 className='px-0 py-0.5 w-full border bg-transparent border-[#E7E7E7] focus:border-transparent focus:ring-transparent outline-0 placeholder:text-sm font-medium ml-2'
                        //                                 placeholder='10'
                        //                                 value={category.seats}
                        //                                 onChange={(e) => handleCategoryChange(index, 'seats', e.target.value)}
                        //                             />
                        //                         </div>
                        //                         <div className='w-full bg-[#E7E7E7] pl-2 pr-2 rounded-lg '>
                        //                             <label className='text-xs mt-3' >Price</label>
                        //                             <input
                        //                                 type='number'
                        //                                 min="100"
                        //                                 className='px-0 py-0.5 w-full border bg-transparent border-[#E7E7E7] focus:border-transparent focus:ring-transparent outline-0 placeholder:text-sm font-medium ml-2'
                        //                                 placeholder='110'
                        //                                 value={category.price}
                        //                                 onChange={(e) => handleCategoryChange(index, 'price', e.target.value)}
                        //                             />
                        //                         </div>
                        //                         {index > 0 && (
                        //                             <button onClick={() => removeCategory(index)} className='mt-1 ml-2'>
                        //                                 Delete
                        //                             </button>
                        //                         )}
                        //                     </div>
                        //                 ))}

                        //                 <button onClick={addCategory} className='mt-2'>
                        //                     + Add Class
                        //                 </button>
                        //             </div>

                        //             <div className='mt-3 flex flex-col bg-[#E7E7E7] pl-2 pr-2 rounded-lg'>
                        //                 <label className='text-xs mt-1' htmlFor="first name">Dicount Percentage on Muscat Whereto App</label>
                        //                 <input
                        //                     type="number"
                        //                     className='px-0 py-0.5 w-full border bg-transparent border-[#E7E7E7] focus:border-transparent focus:ring-transparent  outline-0 placeholder:text-sm font-medium '
                        //                     placeholder='10'
                        //                     onChange={((e) => setDiscountOnApp(e.target.value))}
                        //                 />
                        //             </div>
                        //             <div className='mt-3 flex flex-col bg-[#E7E7E7] pl-2 pr-2 rounded-lg'>
                        //                 <label className='text-xs mt-1' htmlFor="first name">Features</label>
                        //                 <input
                        //                     type="text"
                        //                     className='px-0 py-0.5 w-full border bg-transparent border-[#E7E7E7] focus:border-transparent focus:ring-transparent  outline-0 placeholder:text-sm font-medium '
                        //                     placeholder='Features'
                        //                     onChange={((e) => setFeatures(e.target.value))}
                        //                 />
                        //             </div>

                        //             <div className='mt-3 mb-2 flex flex-col bg-[#E7E7E7] pl-2 pr-2 rounded-lg'>
                        //                 <label className='text-xs mt-1' htmlFor="first name">Terms And Condition  *</label>
                        //                 <input

                        //                     type="text"
                        //                     className='px-0 py-0.5 w-full border bg-transparent border-[#E7E7E7] focus:border-transparent focus:ring-transparent  outline-0 placeholder:text-sm font-medium '
                        //                     placeholder='Link for terms and condition'
                        //                     onChange={((e) => setTermsAndConditions(e.target.value))}
                        //                 />
                        //             </div>
                        //             <label class="ml-2 text-xs font-medium  dark:text-white" for="file_input">Contact</label>
                        //             <div className='flex justify-between'>
                        //                 <div className=' flex flex-col bg-[#E7E7E7] pl-2 pr-2 rounded-lg'>
                        //                     <label className='text-xs mt-1' htmlFor="first name">Facebook URL</label>
                        //                     <input

                        //                         type="text"
                        //                         className='px-0 py-0.5 w-full border bg-transparent border-[#E7E7E7] focus:border-transparent focus:ring-transparent  outline-0 placeholder:text-sm font-medium '
                        //                         placeholder='Link for FB page'
                        //                         onChange={((e) => setFb(e.target.value))}
                        //                     />
                        //                 </div>
                        //                 <div className=' flex flex-col bg-[#E7E7E7] pl-2 pr-2 rounded-lg'>
                        //                     <label className='text-xs mt-1' htmlFor="first name">Insta URL</label>
                        //                     <input

                        //                         type="text"
                        //                         className='px-0 py-0.5 w-full border bg-transparent border-[#E7E7E7] focus:border-transparent focus:ring-transparent  outline-0 placeholder:text-sm font-medium '
                        //                         placeholder='Link for Instagram page'
                        //                         onChange={((e) => setInsta(e.target.value))}
                        //                     />
                        //                 </div>
                        //                 <div className=' flex flex-col bg-[#E7E7E7] pl-2 pr-2 rounded-lg'>
                        //                     <label className='text-xs mt-1' htmlFor="first name">Email</label>
                        //                     <input

                        //                         type="email"
                        //                         className='px-0 py-0.5 w-full border bg-transparent border-[#E7E7E7] focus:border-transparent focus:ring-transparent  outline-0 placeholder:text-sm font-medium '
                        //                         placeholder='Your email address'
                        //                         onChange={((e) => setMail(e.target.value))}
                        //                     />
                        //                 </div>
                        //                 <div className=' flex flex-col bg-[#E7E7E7] pl-2 pr-2 rounded-lg'>
                        //                     <label className='text-xs mt-1' htmlFor="first name">Whatsapp No.</label>
                        //                     <input
                        //                         type="number"
                        //                         className='px-0 py-0.5 w-full border bg-transparent border-[#E7E7E7] focus:border-transparent focus:ring-transparent  outline-0 placeholder:text-sm font-medium '
                        //                         placeholder='Whatsapp number'
                        //                         onChange={((e) => setNumber(e.target.value))}
                        //                     />
                        //                 </div>
                        //             </div>


                        //             <label class="mt-1 ml-2 text-xs font-medium  dark:text-white" for="file_input">Display Photo</label>
                        //             <input class="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-[#E7E7E7] dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 mb-1"

                        //                 onChange={capturePhoto}
                        //                 id="photo" type="file" />

                        //             <label class="mt-1 ml-2 text-xs font-medium  dark:text-white" for="file_input">Seating Map</label>
                        //             <input class="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-[#E7E7E7] dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 mb-1"

                        //                 onChange={captureSeatingMap}
                        //                 id="photo" type="file" />

                        //             <label class="ml-2 text-xs font-medium  dark:text-white" for="file_input">Banner</label>
                        //             <input class="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-[#E7E7E7] dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 mb-1" id="file_input"

                        //                 onChange={captureBanner}
                        //                 type="file" />

                        //             <label class="ml-2 text-xs font-medium  dark:text-white" for="file_input">Video</label>
                        //             <input class="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-[#E7E7E7] dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 mb-1" id="file_input"
                        //                 onChange={captureVideo}
                        //                 type="file" />

                        //             <div className="button flex justify-center items-center mt-5">
                        //                 <button
                        //                     type="button"
                        //                     onClick={handleSave}
                        //                     className="w-full md:w-44 text-white bg-[#C0A04C] hover:bg-[#A48533] focus:ring-4 focus:outline-none focus:ring-bg-[#A48533] font-semibold rounded-lg text-md px-4 py-4 text-center md:mr-3 md:mr-0 dark:bg-[#C0A04C] dark:hover:bg-white dark:focus:ring-blue-800"
                        //                 >
                        //                     Save
                        //                 </button>
                        //             </div>

                        //         </div>


                        //     </div>
                        // </section>
                        :
                        <div className="h-screen w-full flex justify-center align-middle items-center">
                            <img src="/images/icons/loading.svg" alt="" />
                        </div>
                }
            </div >
        )
    }

    // const editor = useRef(null);
    // const navigate = useNavigate()
    // const config = {
    //     placeholder: "Amr Diab, the legendary Egyptian singer is set to perform at the Etihad Arena ....",
    //     buttons: 'bold,italic,h1,h2,h3',
    //     buttonsMD: 'bold,italic,h1,h2,h3',
    //     buttonsSM: 'bold,italic,h1,h2,h3',
    //     buttonsXS: 'bold,italic,h1,h2,h3',
    // }

    // const [content, setContent] = useState('')
    // const [loading, setLoading] = useState(false)
    // const [title, setTitle] = useState('')
    // const [shortDesc, setShortDesc] = useState('')
    // const [datetype, setDatetype] = useState(true)
    // const [startDate, setStartDate] = useState('')
    // const [endDate, setEndDate] = useState('')
    // const [selectedDays, setSelectedDays] = useState([]);
    // const [eventCategory, setEventCategory] = useState('')
    // const [location, setLocation] = useState('')
    // const [features, setFeatures] = useState('')
    // const [termsAndConditions, setTermsAndConditions] = useState('')
    // const [photo, setPhoto] = useState('')
    // const [seatingMap, setSeatingMap] = useState('')
    // const [banner, setBanner] = useState('')
    // const [video, setVideo] = useState('')
    // const days = ['monday', 'tuesday', 'wednesday', 'Thursday', 'friday', 'saturday', 'sunday'];


    // function capturePhoto(e) {
    //     const file = e.target.files[0];
    //     const reader = new FileReader();
    //     reader.readAsDataURL(file);
    //     reader.onloadend = function () {
    //         setPhoto(reader.result);
    //         // console.log(reader.result);
    //     };
    // }

    // function captureSeatingMap(e) {
    //     const file = e.target.files[0];
    //     const reader = new FileReader();
    //     reader.readAsDataURL(file);
    //     reader.onloadend = function () {
    //         setSeatingMap(reader.result);
    //         // console.log(reader.result);
    //     };
    // }

    // function captureBanner(e) {
    //     const file = e.target.files[0];
    //     const reader = new FileReader();
    //     reader.readAsDataURL(file);
    //     reader.onloadend = function () {
    //         setBanner(reader.result);
    //         // console.log(reader.result);
    //     };
    // }

    // function captureVideo(e) {
    //     const file = e.target.files[0];
    //     const reader = new FileReader();
    //     reader.readAsDataURL(file);
    //     reader.onloadend = function () {
    //         setVideo(reader.result);
    //         // console.log(reader.result);
    //     };
    // }

    // const handleDayClick = (day) => {
    //     if (selectedDays.includes(day)) {
    //         // If the day is already selected, remove it from the array
    //         setSelectedDays(selectedDays.filter((selectedDay) => selectedDay !== day));
    //     } else {
    //         // If the day is not selected, add it to the array
    //         setSelectedDays([...selectedDays, day]);
    //     }
    // };

    // const inputRef = useRef(null);
    // const [image, setImage] = useState(null);
    // const [crop, setCrop] = useState({ x: 0, y: 0 });
    // const [zoom, setZoom] = useState(1);
    // const [croppedImage, setCroppedImage] = useState(null);

    // const onFileChange = (e) => {
    //     if (e.target.files && e.target.files.length > 0) {
    //         const file = e.target.files[0];
    //         const reader = new FileReader();
    //         reader.onload = (e) => {
    //             setImage(e.target.result);
    //         };
    //         reader.readAsDataURL(file);
    //     }
    // };

    // const onCropComplete = async (croppedArea, croppedAreaPixels) => {
    //     // croppedArea contains the x, y, width, and height of the cropped area
    //     try {
    //         const base64Image = await getCroppedImg(image, croppedAreaPixels);
    //         setCroppedImage(base64Image);
    //     } catch (e) {
    //         console.error('Error cropping image:', e);
    //     }
    // };

    // const [inputFields, setInputFields] = useState(['']); // Initial input field

    // const addInputField = () => {
    //     if (inputFields.length < 3) {
    //         setInputFields([...inputFields, '']); // Add an empty input field
    //     }
    // };

    // const removeInputField = (index) => {
    //     const updatedFields = [...inputFields];
    //     updatedFields.splice(index, 1);
    //     setInputFields(updatedFields);
    // };

    // const handleInputChange = (index, value) => {
    //     const updatedFields = [...inputFields];
    //     updatedFields[index] = value;
    //     setInputFields(updatedFields);
    // };

    // const handleAddToArray = () => {
    //     // Add all input field values to an array
    //     const values = inputFields.filter((value) => value.trim() !== ''); // Remove empty values
    //     // Now 'values' contains all non-empty input field values
    //     console.log(values); // You can replace 'console.log' with your desired logic
    // };

    // const [categories, setCategories] = useState([
    //     { className: null, seats: null, price: null },
    // ]);

    // const addCategory = () => {
    //     setCategories([...categories, { className: null, seats: null, price: null }]);
    // };

    // const removeCategory = (index) => {
    //     const updatedCategories = [...categories];
    //     updatedCategories.splice(index, 1);
    //     setCategories(updatedCategories);
    // };

    // const handleCategoryChange = (index, field, value) => {
    //     const updatedCategories = [...categories];
    //     updatedCategories[index][field] = value;
    //     setCategories(updatedCategories);
    // };

    // const handleSave = async () => {
    //     console.log(categories)
    //     if (
    //         !title ||
    //         !content ||
    //         // !location ||
    //         !termsAndConditions ||
    //         !eventCategory ||
    //         !photo ||
    //         !seatingMap
    //     ) {
    //         return toast.error("Required Fields are missing")
    //     }

    //     let dateType;
    //     if (datetype == true) {
    //         dateType = 'dateRange'
    //     } else {
    //         dateType = 'recurring'
    //     }
    //     let eventdate = {}
    //     eventdate.type = dateType
    //     if (dateType == 'dateRange') {
    //         eventdate.dateRange = {
    //             startDate: startDate,
    //             endDate: endDate
    //         }
    //     } else if (dateType == 'recurring') {
    //         eventdate.recurring = selectedDays
    //     }

    //     for (const category of categories) {
    //         if (category.seats != null) {
    //             if (category.seats !== '' && category.seats < 1) {
    //                 return toast.error("Enter a valid seat count")
    //             }
    //         }
    //         if (category.price != null && category.className == null) {
    //             return toast.error("Classname is required if you are entering price")
    //         }
    //         if (category.className != null && category.className.trim() == "") {
    //             return toast.error("Classname cannot be an empty string if you want to add price")
    //         }
    //         if (category.price != null && category.price < 100) {
    //             return toast.error("price of ticket can not be less than 100")
    //         }

    //     }

    //     const eventdata = {
    //         title: title,
    //         shortDescription: shortDesc,
    //         description: content,
    //         location: "6501f920130068e55be35c1e",
    //         custom: inputFields,
    //         features: features,
    //         termsAndConditions: termsAndConditions,
    //         categories: categories,
    //         eventCategory: eventCategory,
    //         displayPhoto: photo,
    //         banner: banner,
    //         date: eventdate,
    //         seatingMap: seatingMap
    //     }
    //     setLoading(true)
    //     try {
    //         console.log(eventdata)
    //         const { data } = await VendorCreateOffer(eventdata)
    //         setLoading(false)
    //         console.log(data)
    //         if (data.success == true) {
    //             toast.success("Event is successfully added")
    //             navigate(`/vendor/event/${data.data._id}`)
    //         } else if (data.success == false) {
    //             window.alert(data.data)
    //         }
    //     } catch (error) {
    //         console.log(error)
    //     }
    //     onClose(); // This will close the modal
    // };
    // return (
    //     <div>
    //         <Toaster />
    //         {
    //             !loading
    //                 ?
    //                 <section className='md:mt-12 flex bg-white drop-shadow-2xl rounded-lg'>
    //                     <div className='w-96 md:w-[1000px]'>
    //                         <div className="modal bg-white px-3 py-4">
    //                             <div className='text-left flex justify-start items-start align-middle'>
    //                                 <p className='text-md font-bold'>Offer Details</p>
    //                             </div>
    //                             <form action="post">
    //                                 <div className='mt-3 flex flex-col bg-[#E7E7E7] pl-2 pr-2 rounded-lg'>
    //                                     <label className='text-xs mt-1' htmlFor="first name *">Title  *</label>
    //                                     <input
    //                                         type="text"
    //                                         className='px-0 py-0.5 w-full border bg-transparent border-[#E7E7E7] focus:border-transparent focus:ring-transparent  outline-0 placeholder:text-sm font-medium '
    //                                         onChange={((e) => setTitle(e.target.value))}
    //                                         placeholder='Breakfast and poolpass at crown plaza'
    //                                         required
    //                                     />
    //                                 </div>

    //                                 <div className='mt-3 flex flex-col bg-[#E7E7E7] pl-2 pr-2 rounded-lg'>
    //                                     <label className='text-xs mt-1' htmlFor="first name">Short Description</label>
    //                                     <input
    //                                         type="text"
    //                                         className='px-0 py-0.5 w-full border bg-transparent border-[#E7E7E7] focus:border-transparent focus:ring-transparent  outline-0 placeholder:text-sm font-medium '
    //                                         placeholder='Breakfast and poolpass at crown plaza'
    //                                         onChange={((e) => setShortDesc(e.target.value))}
    //                                     />
    //                                 </div>
    //                                 <div className='mt-3 flex flex-col bg-[#E7E7E7] pl-2 pr-2 rounded-lg'>
    //                                     <label className='text-xs mt-1' htmlFor="first name">Event Description  *</label>
    //                                     <JoditEditor
    //                                         required
    //                                         ref={editor}
    //                                         value={content}
    //                                         config={config}
    //                                         tabIndex={1} // tabIndex of textarea
    //                                         onBlur={newContent => setContent(newContent)} // preferred to use only this option to update the content for performance reasons
    //                                     />
    //                                 </div>
    //                                 <div className="flex space-x-2 mt-3">
    //                                     <button className="bg-[#E7E7E7] w-28 px-2 py-1 rounded-md text-sm" onClick={() => setDatetype(true)}>Date Range</button>
    //                                     <button className="bg-[#E7E7E7] w-28 px-2 py-1 rounded-md text-sm" onClick={() => setDatetype(false)}>Recurring</button>
    //                                 </div>
    //                                 {
    //                                     datetype
    //                                         ?
    //                                         <div className="flex align-middle items-center  w-full mt-2 space-x-4">
    //                                             <div className="flex w-full row1 space-x-4 ">
    //                                                 <div className='w-full  flex flex-col bg-[#E7E7E7] pl-2 pr-2 rounded-lg'>
    //                                                     <label className='text-xs mt-1' htmlFor="first name">Date</label>
    //                                                     <input
    //                                                         type="datetime-local"
    //                                                         onChange={((e) => setStartDate(e.target.value))}
    //                                                         className='px-0 py-0.5 w-full placeholder:text-sm border bg-transparent border-[#E7E7E7] focus:border-transparent focus:ring-transparent  outline-0 placeholder:text-sm text-sm font-medium'
    //                                                     />
    //                                                 </div>
    //                                             </div>
    //                                             <p className='text-center'>to</p>
    //                                             <div className="flex w-full row1 space-x-4 ">
    //                                                 <div className='w-full  flex flex-col bg-[#E7E7E7] pl-2 pr-2 rounded-lg'>
    //                                                     <label className='text-xs mt-1' htmlFor="first name">Date</label>
    //                                                     <input
    //                                                         type="datetime-local"
    //                                                         onChange={((e) => setEndDate(e.target.value))}
    //                                                         className='px-0 py-0.5 w-full placeholder:text-sm border bg-transparent border-[#E7E7E7] focus:border-transparent focus:ring-transparent  outline-0 placeholder:text-sm text-sm font-medium'
    //                                                     />
    //                                                 </div>
    //                                             </div>
    //                                         </div>
    //                                         :
    //                                         (
    //                                             <div>
    //                                                 <p className='text-sm mt-2'>Select Days of the Week:</p>
    //                                                 <div className='flex'>
    //                                                     {
    //                                                         days.map((day, index) => (
    //                                                             <>
    //                                                                 <div className='mx-2'>
    //                                                                     <label key={index} className="block">
    //                                                                         <input
    //                                                                             className='rounded-sm mr-1'
    //                                                                             type="checkbox"
    //                                                                             value={day}
    //                                                                             checked={selectedDays.includes(day)}
    //                                                                             onChange={() => handleDayClick(day)}
    //                                                                         />
    //                                                                         <span className='ml-0 text-sm '>
    //                                                                             {day}
    //                                                                         </span>
    //                                                                     </label>
    //                                                                 </div>
    //                                                             </>
    //                                                         ))
    //                                                     }
    //                                                 </div>
    //                                             </div>
    //                                         )
    //                                 }
    //                                 <div className='mt-3 flex flex-col bg-[#E7E7E7] pl-2 pr-2 rounded-lg'>
    //                                     <label className='text-xs mt-1' htmlFor="first name">Category  *</label>
    //                                     <select
    //                                         type="text"
    //                                         className='px-0 py-0.5 w-full border bg-transparent border-[#E7E7E7] focus:border-transparent focus:ring-transparent  outline-0 text-sm font-medium text-gray-500'
    //                                         onChange={((e) => setEventCategory(e.target.value))}
    //                                         required
    //                                         placeholder='Theatre of Arts'
    //                                     >
    //                                         <option className=' text-sm font-medium' value="staycaton">Staycation</option>
    //                                         <option className=' text-sm font-medium' value="eat">Eat</option>
    //                                         <option className=' text-sm font-medium' value="weeklyoffers">Weekly Offers</option>
    //                                     </select>
    //                                 </div>

    //                                 <div className='mt-3 flex flex-col bg-[#E7E7E7] pl-2 pr-2 rounded-lg'>
    //                                     <label className='text-xs mt-1' htmlFor="first name">Location  *</label>
    //                                     <select
    //                                         required
    //                                         type="text"
    //                                         className='px-0 py-0.5 w-full border bg-transparent border-[#E7E7E7] focus:border-transparent focus:ring-transparent  outline-0 text-sm font-medium text-gray-500'
    //                                         onChange={((e) => setLocation(e.target.value))}
    //                                         placeholder='Theatre of Arts'
    //                                     >
    //                                         <option className=' text-sm font-medium' value="crownplaza">Crown Plaza</option>
    //                                     </select>
    //                                 </div>

    //                                 {/* <div>
    //                                 asdfsdadf
    //                                 <input type="file" onChange={onFileChange} ref={inputRef} accept="image/*" />
    //                                 {image && (
    //                                     <div>
    //                                         <Cropper
    //                                             image={image}
    //                                             crop={crop}
    //                                             zoom={zoom}
    //                                             aspect={4 / 3} // Set the aspect ratio as needed
    //                                             onCropChange={setCrop}
    //                                             onCropComplete={onCropComplete}
    //                                             onZoomChange={setZoom}
    //                                         />
    //                                         <button className="" onClick={onCropComplete}>yes</button>
    //                                     </div>
    //                                 )}
    //                                 {croppedImage && (
    //                                     <img src={croppedImage} alt="Cropped" style={{ maxWidth: '100%' }} />
    //                                 )}
    //                             </div> */}

    //                                 <div>
    //                                     <label className='text-xs mt-3' >Custom</label>

    //                                     {inputFields.map((value, index) => (
    //                                         <div
    //                                             key={index}
    //                                             className='flex mt-1 flex flex-col bg-[#E7E7E7] pl-2 pr-2 rounded-lg'
    //                                         >
    //                                             <label className='text-xs mt-1' htmlFor={`field-${index}`}>
    //                                                 Custom Question {index + 1}
    //                                             </label>
    //                                             <div className="flex align-middle justify-between">

    //                                                 <input
    //                                                     type='text'
    //                                                     id={`field-${index}`}
    //                                                     className='px-0 py-0.5 w-full border bg-transparent border-[#E7E7E7] focus:border-transparent focus:ring-transparent outline-0 placeholder:text-sm font-medium'
    //                                                     placeholder={`Enter question ${index + 1}`}
    //                                                     value={value}
    //                                                     onChange={(e) => handleInputChange(index, e.target.value)}
    //                                                 />
    //                                                 {
    //                                                     index == 0
    //                                                         ?
    //                                                         <>
    //                                                         </>
    //                                                         :
    //                                                         <button className="" onClick={() => removeInputField(index)}>
    //                                                             Delete
    //                                                         </button>
    //                                                 }
    //                                             </div>
    //                                         </div>
    //                                     ))}

    //                                     {inputFields.length < 3 && (
    //                                         <button onClick={addInputField} className='mt-3'>
    //                                             + Add Field
    //                                         </button>
    //                                     )}

    //                                     {/* <button onClick={handleAddToArray} className='mt-3'>
    //                                     Add to Array
    //                                 </button> */}
    //                                 </div>

    //                                 <div>
    //                                     {categories.map((category, index) => (
    //                                         <div key={index} className='w-full mt-3 flex flex-row space-x-2 '>
    //                                             <div className='w-full bg-[#E7E7E7] pl-2 pr-2 rounded-lg '>
    //                                                 <label className='text-xs mt-3' >Offer Class</label>
    //                                                 <input
    //                                                     type='text'
    //                                                     className='px-0 py-0.5 w-full border bg-transparent border-[#E7E7E7] focus:border-transparent focus:ring-transparent outline-0 placeholder:text-sm font-medium flex-grow mx-2'
    //                                                     placeholder='Class Name'
    //                                                     value={category.className}
    //                                                     onChange={(e) => handleCategoryChange(index, 'className', e.target.value)}
    //                                                 />
    //                                             </div>
    //                                             <div className='w-full bg-[#E7E7E7] pl-2 pr-2 rounded-lg '>
    //                                                 <label className='text-xs mt-3' >No of Vouchers</label>
    //                                                 <input
    //                                                     type='number'
    //                                                     className='px-0 py-0.5 w-full border bg-transparent border-[#E7E7E7] focus:border-transparent focus:ring-transparent outline-0 placeholder:text-sm font-medium ml-2'
    //                                                     placeholder='No of Seats'
    //                                                     value={category.seats}
    //                                                     onChange={(e) => handleCategoryChange(index, 'seats', e.target.value)}
    //                                                 />
    //                                             </div>
    //                                             <div className='w-full bg-[#E7E7E7] pl-2 pr-2 rounded-lg '>
    //                                                 <label className='text-xs mt-3' >Price</label>
    //                                                 <input
    //                                                     type='number'
    //                                                     min="100"
    //                                                     className='px-0 py-0.5 w-full border bg-transparent border-[#E7E7E7] focus:border-transparent focus:ring-transparent outline-0 placeholder:text-sm font-medium ml-2'
    //                                                     placeholder='Price'
    //                                                     value={category.price}
    //                                                     onChange={(e) => handleCategoryChange(index, 'price', e.target.value)}
    //                                                 />
    //                                             </div>
    //                                             {index > 0 && (
    //                                                 <button onClick={() => removeCategory(index)} className='mt-1 ml-2'>
    //                                                     Delete
    //                                                 </button>
    //                                             )}
    //                                         </div>
    //                                     ))}

    //                                     <button onClick={addCategory} className='mt-2'>
    //                                         + Add Class
    //                                     </button>
    //                                 </div>

    //                                 <div className='mt-3 flex flex-col bg-[#E7E7E7] pl-2 pr-2 rounded-lg'>
    //                                     <label className='text-xs mt-1' htmlFor="first name">Features</label>
    //                                     <input
    //                                         type="text"
    //                                         className='px-0 py-0.5 w-full border bg-transparent border-[#E7E7E7] focus:border-transparent focus:ring-transparent  outline-0 placeholder:text-sm font-medium '
    //                                         placeholder='Features'
    //                                         onChange={((e) => setFeatures(e.target.value))}
    //                                     />
    //                                 </div>

    //                                 <div className='mt-3 flex flex-col bg-[#E7E7E7] pl-2 pr-2 rounded-lg'>
    //                                     <label className='text-xs mt-1' htmlFor="first name">Terms And Condition  *</label>
    //                                     <input
    //                                         required
    //                                         type="text"
    //                                         className='px-0 py-0.5 w-full border bg-transparent border-[#E7E7E7] focus:border-transparent focus:ring-transparent  outline-0 placeholder:text-sm font-medium '
    //                                         placeholder='Link for terms and condition'
    //                                         onChange={((e) => setTermsAndConditions(e.target.value))}
    //                                     />
    //                                 </div>


    //                                 <label class="mt-1 ml-2 text-xs font-medium  dark:text-white" for="file_input">Display Photo</label>
    //                                 <input class="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-[#E7E7E7] dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 mb-1"
    //                                     required
    //                                     onChange={capturePhoto}
    //                                     id="photo" type="file" />

    //                                 <label class="mt-1 ml-2 text-xs font-medium  dark:text-white" for="file_input">Seating Map</label>
    //                                 <input class="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-[#E7E7E7] dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 mb-1"
    //                                     required
    //                                     onChange={captureSeatingMap}
    //                                     id="photo" type="file" />

    //                                 <label class="ml-2 text-xs font-medium  dark:text-white" for="file_input">Banner</label>
    //                                 <input class="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-[#E7E7E7] dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 mb-1" id="file_input"
    //                                     required
    //                                     onChange={captureBanner}
    //                                     type="file" />

    //                                 <label class="ml-2 text-xs font-medium  dark:text-white" for="file_input">Video</label>
    //                                 <input class="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-[#E7E7E7] dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 mb-1" id="file_input"
    //                                     onChange={captureVideo}
    //                                     type="file" />

    //                                 <div className="button flex justify-center items-center mt-5">
    //                                     <button
    //                                         type="button"
    //                                         onClick={handleSave}
    //                                         className="w-full md:w-44 text-white bg-[#C0A04C] hover:bg-[#A48533] focus:ring-4 focus:outline-none focus:ring-bg-[#A48533] font-semibold rounded-lg text-md px-4 py-4 text-center md:mr-3 md:mr-0 dark:bg-[#C0A04C] dark:hover:bg-white dark:focus:ring-blue-800"
    //                                     >
    //                                         Save
    //                                     </button>
    //                                 </div>
    //                             </form>
    //                         </div>


    //                     </div>
    //                 </section>
    //                 :
    //                 <div className="h-screen w-full flex justify-center align-middle items-center">
    //                     <img src="/images/icons/loading.svg" alt="" />
    //                 </div>
    //         }
    //     </div >
    // )



    // const [loading, setLoading] = useState(false)

    // const [title, setTitle] = useState('')
    // const [shortdesc, setShortdesc] = useState('')
    // const [description, setDescription] = useState('')
    // const [startdate, setStartdate] = useState('')
    // const [expiry, setExpiry] = useState('')
    // const [location, setLocation] = useState('')
    // const [photo, setPhoto] = useState('')
    // const [banner, setBanner] = useState('')
    // const [video, setVideo] = useState('')


    // function capturePhoto(e) {
    //     const file = e.target.files[0];
    //     const reader = new FileReader();
    //     reader.readAsDataURL(file);
    //     reader.onloadend = function () {
    //         setPhoto(reader.result);
    //         // console.log(reader.result);
    //     };
    // }

    // function captureBanner(e) {
    //     const file = e.target.files[0];
    //     const reader = new FileReader();
    //     reader.readAsDataURL(file);
    //     reader.onloadend = function () {
    //         setBanner(reader.result);
    //         // console.log(reader.result);
    //     };
    // }

    // function captureVideo(e) {
    //     const file = e.target.files[0];
    //     const reader = new FileReader();
    //     reader.readAsDataURL(file);
    //     reader.onloadend = function () {
    //         setVideo(reader.result);
    //         // console.log(reader.result);
    //     };
    // }

    // const handleSave = async () => {
    //     if (!title || !shortdesc || !description || !startdate || !expiry || !location || !photo || !banner || !video) {
    //         window.alert("All fields are mandatory")
    //     }

    //     const offerdata = {
    //         title: title,
    //         description: description,
    //         startdate: startdate,
    //         expiry: expiry,
    //         photo: photo
    //     }
    //     // console.log(offerdata)
    //     setLoading(true)
    //     try {
    //         const { data } = await VendorCreateOffer(offerdata)
    //         setLoading(false)
    //         console.log(data)
    //         if (data.success == true) {
    //             window.location.reload()
    //         } else if (data.success == false) {
    //         }
    //     } catch (error) {
    //         console.log(error)
    //     }
    //     onClose(); // This will close the modal
    // };

    // return (
    //     <div>
    //         {!loading
    //             ?
    //             <section className='md:mt-12 flex bg-white drop-shadow-2xl rounded-lg'>

    //                 <div className='w-96 md:w-[1000px]'>
    //                     <div className="modal bg-white px-3 py-4">
    //                         <div className='text-left flex justify-start items-start align-middle'>
    //                             <p className='text-md font-bold'>Offer Details</p>
    //                         </div>

    //                         <div className='mt-3 flex flex-col bg-[#E7E7E7] pl-2 pr-2 rounded-lg'>
    //                             <label className='text-xs mt-1' htmlFor="first name">Title</label>
    //                             <input
    //                                 type="text"
    //                                 className='px-0 py-0.5 w-full border bg-transparent border-[#E7E7E7] focus:border-transparent focus:ring-transparent  outline-0 placeholder:text-sm font-medium '
    //                                 onChange={((e) => setTitle(e.target.value))}
    //                                 placeholder='Breakfast and poolpass at crown plaza'
    //                             />
    //                         </div>

    //                         <div className='mt-3 flex flex-col bg-[#E7E7E7] pl-2 pr-2 rounded-lg'>
    //                             <label className='text-xs mt-1' htmlFor="first name">Offer Short Description</label>
    //                             <input
    //                                 type="text"
    //                                 className='px-0 py-0.5 w-full border bg-transparent border-[#E7E7E7] focus:border-transparent placeholder:text-sm focus:ring-transparent  outline-0
    //                             font-medium'
    //                                 onChange={((e) => setShortdesc(e.target.value))}
    //                                 placeholder='write your description here'
    //                             />
    //                         </div>

    //                         <div className='mt-3 flex flex-col bg-[#E7E7E7] pl-2 pr-2 rounded-lg'>
    //                             <label className='text-xs mt-1' htmlFor="first name"> Description</label>
    //                             <textarea
    //                                 type="text"
    //                                 className='px-0 py-0.5 w-full border bg-transparent border-[#E7E7E7] focus:border-transparent placeholder:text-sm focus:ring-transparent  outline-0
    //                             font-medium'
    //                                 onChange={((e) => setDescription(e.target.value))}
    //                                 placeholder='write your description here'
    //                             />
    //                         </div>

    //                         <div className="flex w-full row1 space-x-4 ">

    //                             <div className='w-full mt-3 flex flex-col bg-[#E7E7E7] pl-2 pr-2 rounded-lg'>
    //                                 <label className='text-xs mt-1' htmlFor="first name">Start Date</label>
    //                                 <input
    //                                     type="date"
    //                                     onChange={((e) => setStartdate(e.target.value))}
    //                                     className='px-0 py-0.5 w-full border bg-transparent border-[#E7E7E7] focus:border-transparent 
    //                                 focus:ring-transparent text-gray-500 text-sm font-medium outline-0'
    //                                 />
    //                             </div>

    //                             <div className='w-full mt-3 flex flex-col bg-[#E7E7E7] pl-2 pr-2 rounded-lg'>
    //                                 <label className='text-xs mt-1' htmlFor="first name">Expiry Date</label>
    //                                 <input
    //                                     type="date"
    //                                     onChange={((e) => setExpiry(e.target.value))}
    //                                     className='px-0 py-0.5 w-full border bg-transparent border-[#E7E7E7] focus:border-transparent focus:ring-transparent text-gray-500 text-sm font-medium outline-0'
    //                                 />
    //                             </div>

    //                         </div>

    //                         <div className='mt-3 flex flex-col bg-[#E7E7E7] pl-2 pr-2 rounded-lg'>
    //                             <label className='text-xs mt-1' htmlFor="first name">Location</label>
    //                             <select
    //                                 type="text"
    //                                 className='px-0 py-0.5 w-full border bg-transparent border-[#E7E7E7] focus:border-transparent focus:ring-transparent  outline-0 text-sm font-medium text-gray-500'
    //                                 onChange={((e) => setLocation(e.target.value))}
    //                                 placeholder='Theatre of Arts'
    //                             >
    //                                 <option className=' text-sm font-medium' value="crownplaza">Crown Plaza</option>
    //                                 <option className=' text-sm font-medium' value="crownplaza">Crown Plaza</option>
    //                                 <option className=' text-sm font-medium' value="crownplaza">Crown Plaza</option>
    //                             </select>
    //                         </div>


    //                         <label class="mt-1 ml-2 text-xs font-medium  dark:text-white" for="file_input">Display Photo</label>
    //                         <input class="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-[#E7E7E7] dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 mb-1"
    //                             onChange={capturePhoto}
    //                             id="photo" type="file" />

    //                         <label class="ml-2 text-xs font-medium  dark:text-white" for="file_input">Banner</label>
    //                         <input class="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-[#E7E7E7] dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 mb-1" id="file_input"
    //                             onChange={captureBanner}
    //                             type="file" />

    //                         <label class="ml-2 text-xs font-medium  dark:text-white" for="file_input">Video</label>
    //                         <input class="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-[#E7E7E7] dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 mb-1" id="file_input"
    //                             onChange={captureVideo}
    //                             type="file" />

    //                         <div className="button flex justify-center items-center mt-5">
    //                             <button
    //                                 type="button"
    //                                 onClick={handleSave}
    //                                 className="w-full md:w-44 text-white bg-[#C0A04C] hover:bg-[#A48533] focus:ring-4 focus:outline-none focus:ring-bg-[#A48533] font-semibold rounded-lg text-md px-4 py-4 text-center md:mr-3 md:mr-0 dark:bg-[#C0A04C] dark:hover:bg-white dark:focus:ring-blue-800"
    //                             >
    //                                 Save
    //                             </button>
    //                         </div>
    //                     </div>
    //                 </div>
    //             </section>
    //             :
    //             <div className="h-screen w-full flex justify-center align-middle items-center">
    //                 <img src="/images/icons/loading.svg" alt="" />
    //             </div>
    //         }
    //     </div>
    // )
}

export default AddOfferModal