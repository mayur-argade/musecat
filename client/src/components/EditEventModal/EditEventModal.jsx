import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'
import { VendorUpdateEvent, GetAllCategory, getAllVenues } from '../../http/index'
import JoditEditor from 'jodit-react';
import toast, { Toaster } from 'react-hot-toast';
import AddVenueModal from './AddVenueModal';
import Features from '../../utils/Data'
import CategorySelector from '../shared/CategorySelector/CategorySelector';
import axios from "axios";
import moment from 'moment'

const EditEventModal = ({ onClose, data }) => {

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

    let check = true;
    if (data.date.dateType == 'recurring') {
        check = false
    }

    let eventstartdate = '';
    let eventenddate = '';
    let eventstarttime = '';
    let eventendtime = '';

    if (data.date.type == 'dateRange') {
        eventstartdate = moment(data.date.dateRange.startDate).format('YYYY-MM-DDTHH:mm')
        eventenddate = moment(data.date.dateRange.endDate).format('YYYY-MM-DDTHH:mm')
    } else {
        eventstartdate = data.date.recurring.startDate
        eventenddate = data.date.recurring.endDate
        eventendtime = data.date.recurring.endTime
        eventstarttime = data.date.recurring.startTime
    }

    console.log("--> --> -->",eventstartdate)
    console.log("--> --> -->",eventenddate)

    const [title, setTitle] = useState(data.title)
    const [shortDesc, setShortDesc] = useState(data.shortDescription)
    const [content, setContent] = useState(data.description)

    const [datetype, setDatetype] = useState(check)
    const [startDate, setStartDate] = useState(eventstartdate)
    const [endDate, setEndDate] = useState(eventenddate)
    const [selectedDays, setSelectedDays] = useState(data.date.recurring.days);
    const [startTime, setStartTime] = useState(eventstarttime || '')
    const [endTime, setEndTime] = useState(eventendtime || '')
    const [showEndDate, setShowEndDate] = useState(data.showEndDate);


    const [location, setLocation] = useState(data.location._id)
    const [showVenuecreate, setShowVenuecreate] = useState(false)
    const [venueDescription, setVenueDescription] = useState(data.venueInfo)
    const [selectedCategories, setSelectedCategories] = useState(data.eventCategory)
    const [selectedFeature, setSelectedFeatures] = useState(data.features)


    const [fb, setFb] = useState(data.facebook)
    const [insta, setInsta] = useState(data.instagram)
    const [mail, setMail] = useState(data.email)
    const [number, setNumber] = useState(data.phoneNo)
    const [wpNumber, setWpNumber] = useState(data.whatsapp)
    const [website, setWebsite] = useState(data.website)


    const [categories, setCategories] = useState(data.categories);
    const [termsAndConditions, setTermsAndConditions] = useState(data.termsAndConditions)
    const [inputFields, setInputFields] = useState(data.custom); // Initial input field

    const [photo, setPhoto] = useState(null)
    const [additinalPhotos, setAdditionalPhotos] = useState([])
    const [seatingMap, setSeatingMap] = useState(null)
    const [banner, setBanner] = useState(null)
    const [video, setVideo] = useState(null)
    const [discountOnApp, setDiscountOnApp] = useState(data.discountOnApp || '')


    const [eventCategory, setEventCategory] = useState(undefined)
    const [loading, setLoading] = useState(false)
    const days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];

    const handleCheckboxChange = () => {
        setShowEndDate(!showEndDate); // Toggle the state when the checkbox is changed
    };

    const handleEventCategoryChange = (selectedOptions) => {
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
            eventdate.recurring.days = selectedDays
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

        }

        const eventdata = {
            eventid: data._id,
            title: title,
            shortDescription: shortDesc,
            description: content,
            location: location,
            type: data.type,
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
            showEndDate: showEndDate
        }

        console.log(eventdata)

        setLoading(true)
        try {
            console.log(eventdata)
            const { data } = await VendorUpdateEvent(eventdata)
            setLoading(false)
            console.log(data)
            if (data.success == true) {
                toast.success("Event is successfully added")
                window.location.reload()
            } else if (data.success == false) {
                toast.error(data.data)
                window.alert(data.data)
            }
        } catch (error) {
            console.log(error)
        }
        onClose(); // This will close the modal
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
                                <div className="modal bg-white px-3 py-4">
                                    <div className='text-left flex justify-start items-start align-middle'>
                                        <p className='text-md font-bold'>Event Details</p>
                                    </div>
                                    <div className='mt-3 flex flex-col bg-[#E7E7E7] pl-2 pr-2 rounded-lg'>
                                        <label className='text-sm font-semibold mt-1' htmlFor="first name *">Title  *</label>
                                        <input
                                            type="text"
                                            defaultValue={data.title}
                                            className='px-0 py-0.5 w-full border bg-transparent border-[#E7E7E7] focus:border-transparent focus:ring-transparent  outline-0 placeholder:text-sm font-medium '
                                            onChange={((e) => setTitle(e.target.value))}
                                            placeholder='Breakfast and poolpass'
                                        />
                                    </div>

                                    <div className='mt-3 flex flex-col bg-[#E7E7E7] pl-2 pr-2 rounded-lg'>
                                        <label className='text-sm font-semibold mt-1' htmlFor="first name">Short Description *</label>
                                        <input
                                            type="text"
                                            defaultValue={data.shortDescription}
                                            className='px-0 py-0.5 w-full border bg-transparent border-[#E7E7E7] focus:border-transparent focus:ring-transparent  outline-0 placeholder:text-sm font-medium '
                                            placeholder='Breakfast and poolpass'
                                            onChange={((e) => setShortDesc(e.target.value))}
                                        />
                                    </div>

                                    <div className='mt-3 flex flex-col bg-[#E7E7E7] pl-2 pr-2 rounded-lg'>
                                        <label className='text-sm font-semibold mt-1' htmlFor="first name">Event Information  *</label>
                                        <JoditEditor
                                            ref={editor}
                                            value={content}
                                            config={config}
                                            tabIndex={1} // tabIndex of textarea
                                            onBlur={newContent => setContent(newContent)} // preferred to use only this option to update the content for performance reasons
                                        />
                                    </div>

                                    <p className='ml-2 text-sm font-semibold mt-2'>Select Start Date-time and End Date-time:</p>
                                    <div className="flex align-middle items-center  w-full mt-2 space-x-4">
                                        <div className="flex w-full row1 space-x-4 ">
                                            <div className='w-full  flex flex-col bg-[#E7E7E7] pl-2 pr-2 rounded-lg'>
                                                <label className='input-container text-xs mt-1' htmlFor="first name">Start Date</label>
                                                <input
                                                    type="datetime-local"
                                                    value={startDate}
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
                                                    value={endDate}
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
                                            <input defaultChecked={!check} type="checkbox" className="w-4 h-4 rounded" name="recurring" id="recurring" onChange={((e) => setDatetype(!e.target.checked))} />
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
                                                                        defaultChecked={data.date?.recurring && data.date.recurring.days.includes(day)}
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
                                            // value=""
                                            className="sr-only peer"
                                            onChange={handleCheckboxChange}
                                            checked={showEndDate} // Bind the checked state to the showEndDate state
                                        />
                                        <div className="w-9 h-5 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                                        <span className="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">Show End date</span>
                                    </label>


                                    <div className='flex flex-col bg-[#E7E7E7] pl-2 pr-2 rounded-lg'>
                                        <label className='text-sm font-semibold mt-1' htmlFor="first name">Select Location  *</label>
                                        <select
                                            defaultValue={data.location._id}
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
                                        <label className='text-sm font-semibold mt-1' htmlFor="first name">Venue Information  *</label>
                                        <JoditEditor
                                            ref={editor}
                                            value={venueDescription}
                                            config={config}
                                            tabIndex={1} // tabIndex of textarea
                                            onBlur={newContent => setVenueDescription(newContent)} // preferred to use only this option to update the content for performance reasons
                                        />
                                    </div>

                                    <div className='mt-3 flex flex-col  pl-2 pr-2 rounded-lg'>
                                        <label className='text-sm font-semibold mt-1' htmlFor="first name">Category  *</label>
                                        <CategorySelector
                                            categories={listCategory}
                                            selectedCategories={selectedCategories}
                                            onChange={handleEventCategoryChange}
                                        />
                                    </div>

                                    <div className='mb-3 mt-3 flex flex-col pl-2 pr-2 rounded-lg'>

                                        <h3 class="font-semibold text-gray-900 dark:text-white">Features *</h3>
                                        <ul class="w-full flex flex-wrap">
                                            {
                                                Features.list.map((feature) => (
                                                    <li class="w-auto border-b border-gray-200 sm:border-b-0 dark:border-gray-600">
                                                        <div class="flex  items-center pl-3">
                                                            <input id={feature}
                                                                type="checkbox"
                                                                defaultChecked={data.features && data.features.includes(feature)}
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


                                    <label class="ml-2 text-sm font-semibold  dark:text-white" for="file_input">Contact</label>
                                    <div className=' mb-3 flex flex-col justify-between'>
                                        <div className='w-full flex justify-between'>
                                            <div className='w-full mx-1 my-1 flex flex-col bg-[#E7E7E7] pl-2 pr-2 rounded-lg '>
                                                <label className='text-xs mt-1' htmlFor="first name">Facebook URL</label>
                                                <input
                                                    defaultValue={data.facebook}
                                                    type="text"
                                                    className='px-0 py-0.5 w-full border bg-transparent border-[#E7E7E7] focus:border-transparent focus:ring-transparent  outline-0 placeholder:text-sm font-medium '
                                                    placeholder='Link for FB page'
                                                    onChange={((e) => setFb(e.target.value))}
                                                />
                                            </div>
                                            <div className='w-full mx-1 my-1 flex flex-col bg-[#E7E7E7] pl-2 pr-2 rounded-lg'>
                                                <label className='text-xs mt-1' htmlFor="first name">Insta URL</label>
                                                <input
                                                    defaultValue={data.instagram}
                                                    type="text"
                                                    className='px-0 py-0.5 w-full border bg-transparent border-[#E7E7E7] focus:border-transparent focus:ring-transparent  outline-0 placeholder:text-sm font-medium '
                                                    placeholder='Link for Instagram page'
                                                    onChange={((e) => setInsta(e.target.value))}
                                                />
                                            </div>
                                            <div className='w-full mx-1 my-1 flex flex-col bg-[#E7E7E7] pl-2 pr-2 rounded-lg'>
                                                <label className='text-xs mt-1' htmlFor="first name">Email</label>
                                                <input
                                                    defaultValue={data.email}
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
                                                    defaultValue={data.phoneNo}
                                                    type='tel'
                                                    className='px-0 py-0.5 w-full border bg-transparent border-[#E7E7E7] focus:border-transparent focus:ring-transparent  outline-0 placeholder:text-sm font-medium '
                                                    placeholder='Phone number'
                                                    onChange={((e) => setNumber(e.target.value))}
                                                />
                                            </div>

                                            <div className='w-full mx-1 my-1 flex flex-col bg-[#E7E7E7] pl-2 pr-2 rounded-lg'>
                                                <label className='text-xs mt-1' htmlFor="first name">Whatsapp No.</label>
                                                <input
                                                    defaultValue={data.whatsapp}
                                                    type="number"
                                                    className='px-0 py-0.5 w-full border bg-transparent border-[#E7E7E7] focus:border-transparent focus:ring-transparent  outline-0 placeholder:text-sm font-medium '
                                                    placeholder='Whatsapp number'
                                                    onChange={((e) => setWpNumber(e.target.value))}
                                                />
                                            </div>

                                            <div className='w-full mx-1 my-1 flex flex-col bg-[#E7E7E7] pl-2 pr-2 rounded-lg'>
                                                <label className='text-xs mt-1' htmlFor="first name">Website link</label>
                                                <input
                                                    defaultValue={data.website}
                                                    type="link"
                                                    className='px-0 py-0.5 w-full border bg-transparent border-[#E7E7E7] focus:border-transparent focus:ring-transparent  outline-0 placeholder:text-sm font-medium '
                                                    placeholder='Website Link'
                                                    onChange={((e) => setWebsite(e.target.value))}
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <label class="ml-2 text-sm font-semibold  dark:text-white" for="file_input">Ticket Sales</label>
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
                                        <label className='text-sm font-semibold mt-1' htmlFor="first name">Terms And Condition  *</label>
                                        <input

                                            type="text"
                                            className='px-0 py-0.5 w-full border bg-transparent border-[#E7E7E7] focus:border-transparent focus:ring-transparent  outline-0 placeholder:text-sm font-medium '
                                            placeholder='Link for terms and condition'
                                            onChange={((e) => setTermsAndConditions(e.target.value))}
                                        />
                                    </div>


                                    <div>
                                        <label className='ml-2 text-sm font-semibold mt-1' >Additional Terms & Conditions</label>

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


                                    <label class="mt-1 ml-2 text-xs font-medium  dark:text-white" for="file_input">Featured Image</label>
                                    <input class="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-[#E7E7E7] dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 mb-1"
                                        onChange={capturePhoto}
                                        accept="image/*"
                                        id="photo" type="file" />

                                    <label class="mt-1 ml-2 text-xs font-medium  dark:text-white" for="file_input">Additional Images</label>
                                    <input class="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-[#E7E7E7] dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 mb-1"
                                        onChange={captureAdditionalPhotos}
                                        accept="image/*"
                                        multiple id="photo" type="file" />


                                    <label class="mt-1 ml-2 text-xs font-medium  dark:text-white" for="file_input">Seating Map</label>
                                    <input class="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-[#E7E7E7] dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 mb-1"

                                        onChange={captureSeatingMap}
                                        accept="image/*"
                                        id="photo" type="file" />

                                    <label class="ml-2 text-xs font-medium  dark:text-white" for="file_input">Banner</label>
                                    <input class="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-[#E7E7E7] dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 mb-1" id="file_input"

                                        onChange={captureBanner}
                                        accept="image/*"
                                        type="file" />

                                    <label class="ml-2 text-xs font-medium  dark:text-white" for="file_input">Video</label>
                                    <input class="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-[#E7E7E7] dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 mb-1" id="file_input"
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
                        :
                        <div className="h-screen w-full flex justify-center align-middle items-center">
                            <img src="/images/icons/loading.svg" alt="" />
                        </div>
                }
            </div >
        )
    }
}

export default EditEventModal