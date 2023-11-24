import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'
import { VendorCreateEvent, GetAllCategory, getAllVenues, handleUpload } from '../../http/index'
import JoditEditor from 'jodit-react';
import toast, { Toaster } from 'react-hot-toast';
import './addeventmodal.css'
import AddVenueModal from './AddVenueModal';
import Features from '../../utils/Data'
import CategorySelector from '../shared/CategorySelector/CategorySelector';
import axios from "axios";
import Tooltip from '../shared/Tooltip/Tooltip'

const AddEventModal = ({ onClose }) => {

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
    const [Crfile, setCrfile] = useState(null)
    const [fileURL, setFileURL] = useState('');
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
            return toast.error("Title is missing")
        }
        else if (!shortDesc) {
            return toast.error("Short Description is missing")
        }
        else if (!content) {
            return toast.error("Event Information is missing")
        }
        else if (!venueDescription) {
            return toast.error("Venue Information is missing")
        }
        else if (!location) {
            return toast.error("Location is missing")
        }
        else if (!termsAndConditions) {
            return toast.error("Please add terms and conditions")
        }
        else if (!photo) {
            return toast.error("Featured Photo is missing")
        }
        else if (selectedFeature.length <= 0) {
            return toast.error("Please select applicatble features")
        }
        else if (selectedCategories.length <= 0) {
            return toast.error("Please select Event Category")
        }
        else if (!number) {
            return toast.error("Phone number is missing")
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

        const formData = new FormData();
        formData.append('file', Crfile);

        handleUpload(formData)
            .then((response) => {
                console.log('Upload successful:', response);
                setFileURL(response.data.data)
                // Do something with the response if needed
            })
            .catch((error) => {
                console.error('Error during upload:', error);
                // Handle the error if needed
            });
        
        console.log(fileURL)
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
            video: fileURL,
            seatingMap: seatingMap,
            facebook: fb,
            instagram: insta,
            email: mail,
            whatsapp: wpNumber,
            website: website,
            phone: number,
            showEndDate: showEndDate
        }
        setLoading(true)
        try {
            console.log(eventdata)
            const { data } = await VendorCreateEvent(eventdata)
            setLoading(false)
            console.log(data)
            if (data.success == true) {
                toast.success("Event is successfully added")
                setTimeout(() => {
                    navigate(`/vendor/event/${data.data._id}`)
                }, 2000);
            } else if (data.success == false) {
                toast.error(data.data)
            }
        } catch (error) {
            console.log(error)
        }
        // onClose(); // This will close the modal
    };

    if (listCategory == null || listVenues == null) {
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
                                        <p className='text-xl font-bold'>Event Details</p>
                                    </div>
                                    <div className='mt-3 flex flex-col bg-[#E7E7E7] pl-2 pr-2 rounded-lg'>
                                        <label className='text-sm font-semibold mt-1' htmlFor="first name *">
                                            <div className="flex w-full">
                                                <span className='text-sm font-semibold mt-1 ml-0'>
                                                    Title  *
                                                </span>
                                                <Tooltip data={"Event Title"} />
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
                                                    Short Description *                                                </span>
                                                <Tooltip data={"Short Description for event in one line"} />
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
                                                    Event Information  *                                                </span>
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
                                            <Tooltip data={"Select dates on which your event is going to happen if Event is of type recurring then you can tick recurring and select Days, If you want clients to show Ending date for the event toggle the show ending date button"} />
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
                                                Recurring Event ?
                                            </span>
                                        </label>

                                        {/* <label htmlFor="recurring">Recurring Event ?</label> */}
                                    </div>
                                    {
                                        datetype
                                            ?
                                            <></>
                                            :
                                            <div>
                                                <p className='text-sm mt-2'>Select Days of the Week For recurring event :</p>
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
                                                <Tooltip data={"Select Venue for your event from the list. If your venue is not there in the list you can fill Add Venue form and request Admin to add your venue"} />
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
                                                <Tooltip data={"Add specific information about venue, This information is Event Specific"} />
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
                                                <label className='text-xs mt-1' htmlFor="first name">Phone No. *</label>
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
                                        <Tooltip data={"If your event has tickets you can specify Ticket class, No. of Seats, and price. You can add multiple ticket classes"} />
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

                                    <div className='mt-3 mb-2 flex flex-col bg-[#E7E7E7] pl-2 pr-2 rounded-lg'>
                                        <label className='text-sm font-semibold mt-1' htmlFor="first name">
                                            <div className="flex w-full">
                                                <span className='ml-0'>
                                                    Link for Terms And Condition  *
                                                </span>
                                                <Tooltip data={"Give link to your terms and conditions page, if have pdf you can give accessable drive link also"} />
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
                                        <Tooltip data={"Featured Image is Main Poster of your event which will be visible to the clients "} />
                                    </div>

                                    <input class="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-[#E7E7E7] dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 mb-1"
                                        onChange={capturePhoto}
                                        accept="image/*"
                                        id="photo" type="file" />


                                    <div className="mt-2 flex w-full items-center align-middle">
                                        <span className='mt-1 ml-2 text-xs font-medium  dark:text-white ml-0'>
                                            Additional Images
                                        </span>
                                        <Tooltip data={"You can add multiple images about your event which will be visible on Event Description page"} />
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
                                        <Tooltip data={"Add Banner image for your event"} />
                                    </div>

                                    <input class="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-[#E7E7E7] dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 mb-1" id="file_input"

                                        onChange={captureBanner}
                                        accept="image/*"
                                        type="file" />


                                    <div className="flex w-full items-center align-middle">
                                        <span className='ml-2 text-xs font-medium  dark:text-white ml-0'>
                                            Video
                                        </span>
                                        <Tooltip data={"Add sample video of the event"} />
                                    </div>

                                    <input class="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-[#E7E7E7] dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 mb-1" id="file_input"
                                        accept="video/*"
                                        onChange={(e) => setCrfile(e.target.files[0])}
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
                        :
                        <div className="h-screen w-full flex justify-center align-middle items-center">
                            <img src="/images/icons/loading.svg" alt="" />
                        </div>
                }


            </div >
        )
    }


}

export default AddEventModal