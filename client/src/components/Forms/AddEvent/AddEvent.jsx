import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import Tooltip from '../../shared/Tooltip/Tooltip'; // Assuming Tooltip is a separate component
import JoditEditor from 'jodit-react';
import { Features, config } from '../../../utils/Data';
import AddVenueModal from '../../EditEventModal/AddVenueModal';
import CategorySelector from '../../shared/CategorySelector/CategorySelector';
import { VendorCreateEvent, GetAllCategory, getAllVenues, handleUpload } from '../../../http';
import PhoneInput from 'react-phone-number-input'
import 'react-phone-number-input/style.css'
import toast, { Toaster } from 'react-hot-toast';
import CropEasy from '../../Crop/CropEasy'
import moment from 'moment-timezone'
import { useNavigate } from 'react-router-dom';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const AddEvent = ({ setIsLoading, verifiedValue }) => {
    const formRef = useRef(null);
    const editorRef = useRef(null)
    const navigate = useNavigate()
    const venueEditorRef = useRef(null)
    const [loading, setLoading] = useState(false)
    const [datetype, setDatetype] = useState(true);
    const [selectedDays, setSelectedDays] = useState([]);
    const [location, setLocation] = useState('');
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [selectedFeature, setSelectedFeature] = useState([]);
    const [showVenuecreate, setShowVenuecreate] = useState(false);
    const [listCategory, setListCategory] = useState([])
    const [listVenues, setListVenues] = useState([])
    const [categories, setCategories] = useState([{ className: null, seats: null, price: null }]);
    const [inputFields, setInputFields] = useState(['']);
    const [phoneNumber, setPhoneNumber] = useState('')
    const [wpNumber, setWpNumber] = useState('')
    const [openCrop, setOpenCrop] = useState(false);
    const [photo, setPhoto] = useState(null)
    const [featuredPhoto, setFeaturedPhoto] = useState(null)
    const [additinalPhotos, setAdditionalPhotos] = useState([])
    const [seatingMap, setSeatingMap] = useState(null)
    const [banner, setBanner] = useState(null)
    const [video, setVideo] = useState(null)
    const [fileURL, setFileURL] = useState('');
    const [file, setFile] = useState(null);
    const [photoURL, setPhotoURL] = useState('');
    const [showEndDate, setShowEndDate] = useState(false)
    const [showStartDate, setShowStartDate] = useState(true)
    const [showInEventCalender, setShowInEventCalender] = useState(true)
    const [eventInformation, setEventInformation] = useState('')
    const [venueInformation, setVenueInformation] = useState('')
    const [startDate, setStartDate] = useState('')
    const [endDate, setEndDate] = useState('')
    const [verifiedVar, setVerifiedVar] = useState(verifiedValue)
    const days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];


    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData(formRef.current);
        formData.append('description', eventInformation);
        formData.append('venueInformation', venueInformation)
        formData.append('days', JSON.stringify(selectedDays))
        formData.append('location', location);
        formData.append('selectedCategories', JSON.stringify(selectedCategories));
        formData.append('selectedFeature', JSON.stringify(selectedFeature));
        formData.append('phoneNumber', phoneNumber)
        formData.append('whatsappNumber', wpNumber)
        formData.append('ticketClass', JSON.stringify(categories))
        formData.append('photo', photo);
        formData.append('additinalPhotos', JSON.stringify(additinalPhotos))
        formData.append('seatingMap', seatingMap)
        formData.append('banner', banner)
        formData.append('video', video)
        const momentstart = moment(startDate).tz('Asia/Kolkata') // Assuming startDate is in UTC
        const momentend = moment(endDate).tz('Asia/Kolkata') // Assuming endDate is in UTC

        try {
            const formDataObj = Object.fromEntries(formData.entries());
            console.log(formDataObj);

            let eventType = 'dateRange';
            if (formDataObj.hasOwnProperty('recurring')) {
                eventType = 'recurring';
            }

            // Check if any selected categoryURL is a dinner option
            const daysOfWeek = ['sundaydinner', 'mondaydinner', 'tuesdaydinner', 'wednesdaydinner', 'thursdaydinner', 'fridaydinner', 'saturdaydinner'];
            const selectedDinnerDays = selectedCategories
                .filter(category => daysOfWeek.includes(category.categoryURL))
                .map(category => category.name.split(' ')[0].toLowerCase());

            selectedDinnerDays.forEach(day => {
                if (!selectedDays.includes(day)) {
                    selectedDays.push(day);
                }
            });


            let eventdate = {};
            if (selectedDinnerDays.length > 0) {
                eventType = 'recurring';
            }

            eventdate.type = eventType;
            if (eventType === 'dateRange') {
                eventdate.dateRange = {
                    startDate: momentstart,
                    endDate: momentend
                };
            } else if (eventType === 'recurring') {
                if (selectedDays.length <= 0) {
                    return toast.error("Please select days if you are selecting a recurring event");
                }
                eventdate = {
                    recurring: {
                        days: selectedDays,
                        startTime: formData.get('startTime'),
                        endTime: formData.get('endTime'),
                        startDate: momentstart,
                        endDate: momentend
                    }
                };
            }

            // formData.append('date', JSON.stringify(eventdate));
            formData.append('date', eventdate)

            console.log(categories)

            for (const category of categories) {
                if (category.seats != null) {
                    if (category.seats !== '' && category.seats < 1) {
                        return toast.error("Enter a valid seat count")
                    }
                    if (category.seats != null && category.className == null) {
                        return toast.error("Classname is required if you are entering seats")
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

            let response;
            if (video != null) {
                const videoFormData = new FormData();
                videoFormData.append('file', video);
                response = await handleUpload(videoFormData)
                    .then((response) => {
                        return response.data.data
                    })
                    .catch((error) => {
                        console.error('Error during upload:', error);
                    });
            }

            if (!formDataObj.title || formDataObj.title.trim() === "") {
                return toast.error("Title is missing");
            }
            else if (!formDataObj.shortDesc || formDataObj.shortDesc.trim() === "") {
                return toast.error("Short Description is missing");
            }
            else if (!formDataObj.startDate) {
                return toast.error("Start date is mandatory")
            }
            else if (startDate && endDate) {
                const eventStartDate = moment(startDate).tz('Asia/Kolkata');
                const eventEndDate = moment(endDate).tz('Asia/Kolkata');

                if (!eventStartDate.isValid() || !eventEndDate.isValid()) {
                    return toast.error('Invalid date provided');
                }

                if (!eventStartDate.isBefore(eventEndDate)) {
                    return toast.error('Start date should be less than end date');
                }
            }
            else if (!eventInformation || eventInformation == '' || eventInformation == '<p><br></p>') {
                return toast.error("Event Information is missing");
            }
            else if (!venueInformation || venueInformation == '' || venueInformation == '<p><br></p>') {
                return toast.error("Venue Information is missing");
            }
            else if (!formDataObj.location) {
                return toast.error("Location is missing")
            }
            else if (!featuredPhoto) {
                return toast.error("Featured Photo is not there")
            }
            else if (!photo) {
                return toast.error("Featured Photo is missing")
            }
            else if (selectedFeature.length <= 0) {
                return toast.error("Please select applicable features")
            }
            else if (selectedCategories.length <= 0) {
                return toast.error("Please select Event Category")
            }
            else if (!formDataObj.phoneNumber) {
                return toast.error("Phone number is Mandatory")
            }



            const eventdata = {
                title: formDataObj.title,
                shortDescription: formDataObj.shortDesc,
                description: formDataObj.description,
                location: formDataObj.location,
                venueInfo: formDataObj.venueInformation,
                custom: inputFields,
                features: JSON.parse(formDataObj.selectedFeature),
                termsAndConditions: formDataObj.termsAndConditions,
                categories: JSON.parse(formDataObj.ticketClass),
                eventCategory: JSON.parse(formDataObj.selectedCategories),
                displayPhoto: formDataObj.photo,
                banner: formDataObj.banner,
                date: eventdate,
                additinalImages: JSON.parse(formDataObj.additinalPhotos),
                video: response,
                seatingMap: formDataObj.seatingMap,
                facebook: formDataObj.fb,
                instagram: formDataObj.insta,
                email: formDataObj.mail,
                verified: verifiedVar,
                whatsapp: formDataObj.whatsappNumber.split("+")[1],
                website: formDataObj.website,
                phone: formDataObj.phoneNumber.split("+")[1],
                showEndDate: showEndDate,
                showStartDate: showStartDate,
                showInEventCalender: showInEventCalender,
                featuredPhoto: featuredPhoto
            }

            console.log(eventdata)

            try {
                setLoading(true)
                setIsLoading(true);
                console.log(eventdata)
                const { data } = await VendorCreateEvent(eventdata)
                // SetSubLoading(false)
                console.log(data)
                setLoading(false)
                setIsLoading(false);
                if (data.success == true) {
                    toast.success("Event is successfully added")
                    setTimeout(() => {
                        if (window.location.href.includes('/admin/')) {
                            navigate(`/admin/event/${data.data._id}`)
                        } else {
                            navigate(`/vendor/event/${data.data._id}`)
                        }
                    }, 2000);
                } else if (data.success == false) {
                    toast.error(data.data)
                }
            } catch (error) {
                console.log(error)
                // SetSubLoading(false)
                setLoading(false)
                setIsLoading(false);
                toast.error(error.response.data.data)
            }

        } catch (error) {
            console.error('Error submitting form:', error);
        }
    };

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                // setLoading(true)
                const res = await GetAllCategory()
                const venues = await getAllVenues()
                setListVenues(venues.data.data)
                setListCategory(res.data.data)
                // setLoading(false)
                // console.log("categories", response.data.data)
            } catch (error) {
                // setLoading(false)
                console.log(error)
            }
        }
        fetchCategories()
    }, [showVenuecreate]);

    const handleDayClick = (day) => {
        setSelectedDays(prev => {
            if (prev.includes(day)) {
                return prev.filter(d => d !== day);
            } else {
                return [...prev, day];
            }
        });
    };

    const handleEventCategoryChange = (selectedOptions) => {
        // console.log("this is what getting selected", selectedOptions)
        // Filter out any duplicate selections
        const uniqueSelectedOptions = [...new Set(selectedOptions)];
        // console.log(uniqueSelectedOptions)
        // Update the state or perform other actions with the selected categories
        setSelectedCategories(uniqueSelectedOptions);
    };

    const handleFeaturesClick = (feature) => {
        if (selectedFeature.includes(feature)) {
            // If the day is already selected, remove it from the array
            setSelectedFeature(selectedFeature.filter((selectedFeature) => selectedFeature !== feature));
        } else {
            // If the day is not selected, add it to the array
            setSelectedFeature([...selectedFeature, feature]);
        }
    };

    const addInputField = () => {
        // Check if the last input field is not empty
        if (inputFields.length > 3) {
            toast.error('You can Add max 3 Additional Terms and Conditions')
        } else if (inputFields[inputFields.length - 1].trim() == '' || inputFields[inputFields.length - 1].trim() == null) {
            toast.error('Please fill in existing term and condition before adding new one') // Add an empty input field
        } else {
            setInputFields([...inputFields, '']);
        }
    };

    const removeInputField = (index) => {
        const updatedInputFields = [...inputFields];
        updatedInputFields.splice(index, 1);
        setInputFields(updatedInputFields.length ? updatedInputFields : ['']);
    };

    const addCategory = () => {
        // Check if any existing category has null or empty values
        const hasEmptyCategory = categories.some(category =>
            category.className === null || category.className === '' ||
            category.seats === null || category.seats === '' ||
            category.price === null || category.price === ''
        );

        if (!hasEmptyCategory) {
            setCategories([...categories, { className: null, seats: null, price: null }]);
        } else {
            // Handle the case where an existing category has empty values
            toast.error("Please fill in all fields for the existing category before adding a new one.");
        }
    };

    const removeCategory = (index) => {
        const updatedCategories = [...categories];
        updatedCategories.splice(index, 1);
        setCategories(updatedCategories);
    };

    const handleCategoryChange = (index, field, value) => {
        const updatedCategories = [...categories];
        updatedCategories[index][field] = value === '' ? null : value;
        setCategories(updatedCategories);
    };

    const handleInputChange = (index, value) => {
        const updatedFields = [...inputFields];
        updatedFields[index] = value;
        const nonEmptyFields = updatedFields.filter(field => field.trim() !== '');
        setInputFields(nonEmptyFields.length ? updatedFields : ['']);
    };

    function capturePhoto(e) {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onloadend = function () {
                // const base64String = reader.result;
                setFile(file);
                setFeaturedPhoto(reader.result);
                // console.log(photo)
                setPhotoURL(URL.createObjectURL(file));
                setOpenCrop(true);
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
            };
        }
    }

    const handleCropComplete = (url, file) => {
        // Do something with the URL and file, such as storing them in state
        setPhoto(url)
        // console.log("Cropped File:", file);
    };

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

    const handleCheckboxChange = () => {
        setShowEndDate(!showEndDate); // Toggle the state when the checkbox is changed
    };


    const getCurrentDateTimeLocal = () => {
        const now = new Date();
        const year = now.getFullYear();
        const month = String(now.getMonth() + 1).padStart(2, '0');
        const day = String(now.getDate()).padStart(2, '0');
        const hours = String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');
        return `${year}-${month}-${day}T${hours}:${minutes}`;
    };

    return (
        <>
            {
                !loading
                    ?
                    <form ref={formRef} onSubmit={handleSubmit}>
                        <div className='mt-3 flex flex-col bg-[#E7E7E7] dark:bg-[#454545] pl-2 pr-2 rounded-lg'>
                            <label className='text-sm font-semibold mt-1' htmlFor="title">
                                <div className="flex w-full">
                                    <span className='text-sm font-semibold mt-1 ml-0'>
                                        Title <span className='ml-0 text-lg font-bold'>*</span>
                                    </span>
                                    <Tooltip data={"Event Title"} />
                                </div>
                            </label>
                            <input
                                type="text"
                                name="title"
                                className='dark:bg-[#454545] px-0 py-0.5 w-full border bg-transparent border-0 focus:border-0 focus:ring-0 outline-0 placeholder:text-sm font-medium'
                                placeholder='Please enter the title for your event here'
                            />
                        </div>

                        <div className='mt-3 flex flex-col bg-[#E7E7E7] dark:bg-[#454545] pl-2 pr-2 rounded-lg'>
                            <label className='text-sm font-semibold mt-1' htmlFor="shortDesc">
                                <div className="flex w-full">
                                    <span className='ml-0'>
                                        Short Description <span className='ml-0 text-lg font-bold'>*</span>
                                    </span>
                                    <Tooltip data={"Short Description for event in one line"} />
                                </div>
                            </label>
                            <input
                                type="text"
                                name="shortDesc"
                                className='px-0 py-0.5 w-full border bg-transparent dark:bg-[#454545] border-0 focus:border-0 focus:ring-0 outline-0 placeholder:text-sm font-medium'
                                placeholder='Enter a short description to let the users know about your event in a summary.'
                            />
                        </div>

                        <div className='mt-3 flex flex-col bg-[#E7E7E7] dark:bg-[#454545] dark:text-black pl-2 pr-2 rounded-lg'>
                            <label className='text-sm font-semibold mt-1' htmlFor="content">
                                <div className="flex w-full">
                                    <span className='ml-0 dark:text-white'>
                                        Event/Offer Information <span className='ml-0 text-lg font-bold'>*</span>
                                    </span>
                                    <Tooltip data={"Explain in Brief what event is about all the features you can bold, can use heading etc.."} />
                                </div>
                            </label>
                            <ReactQuill
                                theme="snow"
                                value={eventInformation}
                                onChange={setEventInformation} />

                            {/* <JoditEditor
                                ref={editorRef}
                                config={config}
                                tabIndex={1}
                                onBlur={newContent => setEventInformation(newContent)}
                            /> */}
                        </div>

                        <p className='ml-2 text-sm font-semibold mt-2'>
                            <div className="flex w-full">
                                <span className='ml-0'>
                                    Select Start Date-time and End Date-time:
                                </span>
                                <Tooltip data={"Select dates on which your event is going to happen if Event is of type recurring then you can tick recurring and select Days, If you want clients to show Ending date for the event toggle the show ending date button"} />
                            </div>
                        </p>

                        <div className="flex align-middle items-center w-full mt-2 space-x-4">
                            <div className="flex w-full row1 space-x-4">
                                <div className='w-full flex flex-col bg-[#E7E7E7] dark:bg-[#454545] pl-2 pr-2 rounded-lg'>
                                    <label className='input-container text-xs mt-1' htmlFor="startDate">Start Date <span className='ml-0 text-lg font-bold'>*</span></label>
                                    <input
                                        type="datetime-local"
                                        id="session-date"
                                        name="startDate"
                                        min={getCurrentDateTimeLocal()}
                                        onChange={(e) => setStartDate(e.target.value)}
                                        className='px-0 py-0.5 w-full placeholder:text-sm border bg-transparent dark:bg-[#454545] border-0 focus:border-0 focus:ring-0 outline-0 placeholder:text-sm text-sm font-medium'
                                    />
                                </div>
                            </div>
                            <p className='text-center'>to</p>
                            <div className="flex w-full row1 space-x-4">
                                <div className='w-full flex flex-col bg-[#E7E7E7] dark:bg-[#454545] pl-2 pr-2 rounded-lg'>
                                    <label className='text-xs mt-1' htmlFor="endDate">End Date</label>
                                    <input
                                        type="datetime-local"
                                        id="session-time"
                                        name="endDate"
                                        min={getCurrentDateTimeLocal()}
                                        onChange={(e) => setEndDate(e.target.value)}
                                        className='px-0 py-0.5 w-full placeholder:text-sm border bg-transparent dark:bg-[#454545] border-0 focus:border-0 focus:ring-0 outline-0 placeholder:text-sm text-sm font-medium'
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="flex space-x-2 align-middle ml-2 mt-1">
                            <label className="block">
                                <input
                                    type="checkbox"
                                    className="text-[#A48533] focus:ring-[#A48533] w-4 h-4 rounded"
                                    name="recurring"
                                    id="recurring"
                                    onChange={() => setDatetype(!datetype)}
                                />
                                <span className='ml-1 text-sm'>
                                    Recurring Event ?
                                </span>
                            </label>
                        </div>

                        {!datetype && (
                            <div>
                                <p className='ml-2 text-sm mt-1'>Select Days of the Week For recurring event :</p>
                                <div className='flex space-x-4 align-middle items-center'>
                                    {days.map((day, index) => (
                                        <div className='mx-2' key={index}>
                                            <label className="block">
                                                <input
                                                    className='rounded mr-1 text-[#A48533] focus:ring-[#A48533]'
                                                    type="checkbox"
                                                    name="selectedDays"
                                                    value={day}
                                                    checked={selectedDays.includes(day)}
                                                    onChange={() => handleDayClick(day)}
                                                />
                                                <span className='ml-0 text-sm capitalize'>
                                                    {day}
                                                </span>
                                            </label>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        <div className='flex space-x-3 mt-2'>
                            {
                                startDate && startDate != '' && (
                                    <label className="relative inline-flex items-center mb-5 cursor-pointer">
                                        <input
                                            type="checkbox"
                                            value=""
                                            className="text-[#A48533] focus:ring-[#A48533] sr-only peer"
                                            onChange={() => setShowStartDate(!showStartDate)}
                                            checked={showStartDate} // Bind the checked state to the showEndDate state
                                        />
                                        <div className="w-9 h-5 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>

                                        <span className="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">Show Date </span>
                                        <Tooltip data={"If you Don't want to show Event/Offer start date on Event/Offer Card and Event/Offer page then toggle this button."} />
                                    </label>
                                )

                            }
                            {
                                endDate && endDate != '' && (
                                    <label className="relative inline-flex items-center mb-5 cursor-pointer">
                                        <input
                                            type="checkbox"
                                            value=""
                                            className="text-[#A48533] focus:ring-[#A48533] sr-only peer"
                                            onChange={handleCheckboxChange}
                                            checked={showEndDate} // Bind the checked state to the showEndDate state
                                        />
                                        <div className="w-9 h-5 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                                        <span className="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">Show End date</span>
                                        <Tooltip data={"If you want to show Event/Offer end date on Event/Offer Card and Event/Offer page then toggle this button."} />
                                    </label>
                                )
                            }

                            <label className="relative inline-flex items-center mb-5 cursor-pointer">
                                <input
                                    type="checkbox"
                                    value=""
                                    className="text-[#A48533] focus:ring-[#A48533] sr-only peer"
                                    onChange={() => setShowInEventCalender(!showInEventCalender)}
                                    checked={showInEventCalender} // Bind the checked state to the showEndDate state
                                />
                                <div className="w-9 h-5 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                                <span className="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">Show Event/Offer in calender</span>
                                {/* <Tooltip data={"."} /> */}
                            </label>

                        </div>


                        {/* Location */}
                        <div className='flex flex-col bg-[#E7E7E7] dark:bg-[#454545] pl-2 pr-2 rounded-lg'>
                            <label className='text-sm font-semibold mt-1' htmlFor="location">
                                <div className="flex w-full">
                                    <span className='ml-0'>
                                        Select Location <span className='ml-0 text-lg font-bold'>*</span>
                                    </span>
                                    <Tooltip data={"Select Venue for your event from the list. If your venue is not there in the list you can fill Add Venue form and request Admin to add your venue"} />
                                </div>
                            </label>
                            <select
                                value={location}
                                name="location"
                                className='px-0 py-0.5 w-full border bg-transparent dark:bg-[#454545] border-0 focus:border-0 focus:ring-0 outline-0 text-sm font-medium text-gray-500 dark:text-white '
                                onChange={(e) => setLocation(e.target.value)}
                            >
                                {listVenues.length === 0 ? (
                                    <option className='text-sm font-medium'>Select Location</option>
                                ) : (
                                    <>
                                        <option className='text-sm font-medium'>Select Venue</option>
                                        {listVenues.map((venue) => (
                                            <option className='dark:text-white text-sm font-medium' key={venue._id} value={venue._id}>
                                                {venue.name}
                                            </option>
                                        ))}
                                    </>
                                )}
                            </select>
                        </div>
                        {/* Add Venue Button */}
                        <button type='button' onClick={(() => setShowVenuecreate(!showVenuecreate))}>
                            {
                                showVenuecreate
                                    ?
                                    <p className='mt-1'>
                                        <span className='ml-0  bg-[#E7E7E7] dark:bg-[#454545] w-28 px-2 py-1 rounded-md text-sm'>+ Close Add Venue form</span>
                                    </p>
                                    :
                                    <>
                                        <p className='mt-1'>
                                            <span className='ml-0  bg-[#E7E7E7] dark:bg-[#454545] w-28 px-2 py-1 rounded-md text-sm'>+ Add Venue</span> <span className='ml-0 text-xs'>(If your Venue is NOT in the above list)</span>
                                        </p>
                                    </>

                            }
                        </button>

                        {/* Add venue Model */}
                        {
                            showVenuecreate
                                ?
                                <AddVenueModal
                                    onClose={() => setShowVenuecreate(false)}
                                    message={"Venue added! you can choose venue from Dropdown"}
                                />
                                :
                                <></>
                        }

                        {/* Venue Information */}
                        <div className='mt-3 flex flex-col bg-[#E7E7E7] dark:bg-[#454545] dark:text-black pl-2 pr-2 rounded-lg'>
                            <label className='text-sm font-semibold mt-1' htmlFor="venueDescription">
                                <div className="flex w-full">
                                    <span className='ml-0 dark:text-white'>
                                        Venue Information <span className='ml-0 text-lg font-bold'>*</span>
                                    </span>
                                    <Tooltip data={"Add specific information about venue, This information is Event Specific"} />
                                </div>
                            </label>
                            <ReactQuill
                                theme="snow"
                                value={venueInformation}
                                onChange={setVenueInformation} />
                        </div>

                        {/* Relevant Categories */}
                        <div className='mt-3 flex flex-col pl-2 pr-2 rounded-lg'>
                            <label className='text-sm font-semibold mt-1' htmlFor="selectedCategories">
                                <div className="flex w-full">
                                    <span className='ml-0'>
                                        Select Relevant Category/Categories <span className='ml-0 text-lg font-bold'>*</span>
                                    </span>
                                    <Tooltip data={"Select All the Relevant categories, you can select multiple categories also"} />
                                </div>
                            </label>
                            <CategorySelector
                                categories={listCategory}
                                selectedCategories={selectedCategories}
                                onChange={handleEventCategoryChange}
                            />
                        </div>

                        {/* Applicable Features */}
                        <div className='mt-3 flex flex-col pl-2 pr-2 rounded-lg'>
                            <h3 className="font-semibold text-gray-900 dark:text-white">
                                <div className="flex w-full">
                                    <span className='ml-0'>
                                        Select Applicable Features <span className='ml-0 text-lg font-bold'>*</span>
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
                                                    class="w-4 h-4 rounded text-[#A48533] focus:ring-[#A48533]" />
                                                <label for={feature} class="w-full leading-loose ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">{feature}</label>
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

                        <div className='mb-3 flex flex-col justify-between'>
                            <div className='w-full flex justify-between'>
                                <div className='w-full mx-1 my-1 flex flex-col bg-[#E7E7E7] dark:bg-[#454545] pl-2 pr-2 rounded-lg '>
                                    <label className='text-xs mt-1' htmlFor="fb">Facebook URL</label>
                                    <input
                                        name="fb"
                                        type="url"
                                        className='px-0 py-0.5 w-full border bg-transparent dark:bg-[#454545] border-0 focus:border-0 focus:ring-0  outline-0 placeholder:text-sm font-medium '
                                        placeholder='Link for FB page'
                                    />
                                </div>
                                <div className='w-full mx-1 my-1 flex flex-col bg-[#E7E7E7] dark:bg-[#454545] pl-2 pr-2 rounded-lg'>
                                    <label className='text-xs mt-1' htmlFor="insta">Instagram URL</label>
                                    <input
                                        name="insta"
                                        type='url'
                                        className='px-0 py-0.5 w-full border bg-transparent dark:bg-[#454545] border-0 focus:border-0 focus:ring-0  outline-0 placeholder:text-sm font-medium '
                                        placeholder='Link for Instagram page'
                                    />
                                </div>
                                <div className='w-full mx-1 my-1 flex flex-col bg-[#E7E7E7] dark:bg-[#454545] pl-2 pr-2 rounded-lg'>
                                    <label className='text-xs mt-1' htmlFor="mail">Email</label>
                                    <input
                                        name="mail"
                                        type="email"
                                        className='px-0 py-0.5 w-full border bg-transparent dark:bg-[#454545] border-0 focus:border-0 focus:ring-0  outline-0 placeholder:text-sm font-medium '
                                        placeholder='Your email address'
                                    />
                                </div>
                            </div>
                            <div className="w-full flex justify-between">

                                <div className='dark:text-black w-full mx-1 my-1 flex flex-col bg-[#E7E7E7] dark:bg-[#454545] pl-2 pr-2 rounded-lg'>
                                    <label className='text-xs mt-1 dark:text-white ' htmlFor="number">Contact No. with Country code</label>
                                    <PhoneInput
                                        className='dark:text-black'
                                        placeholder="Enter phone number"
                                        value={phoneNumber}
                                        onChange={setPhoneNumber}
                                    />
                                </div>

                                <div className='dark:text-black w-full mx-1 my-1 flex flex-col bg-[#E7E7E7] dark:bg-[#454545] pl-2 pr-2 rounded-lg'>
                                    <label className='text-xs mt-1 dark:text-white' htmlFor="wpNumber">Whatsapp No. with Country code</label>
                                    <PhoneInput
                                        className='dark:text-black'
                                        placeholder="Enter phone number"
                                        value={wpNumber}
                                        onChange={setWpNumber} />
                                </div>

                                <div className='w-full mx-1 my-1 flex flex-col bg-[#E7E7E7] dark:bg-[#454545] pl-2 pr-2 rounded-lg'>
                                    <label className='text-xs mt-1' htmlFor="website">Website URL</label>
                                    <input
                                        name="website"
                                        type="link"
                                        className='px-0 py-0.5 w-full border bg-transparent dark:bg-[#454545] border-0 focus:border-0 focus:ring-0  outline-0 placeholder:text-sm font-medium '
                                        placeholder='Website Link'
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
                                    <div className='w-full mx-1 my-1 bg-[#E7E7E7] dark:bg-[#454545] pl-2 pr-2 rounded-lg '>
                                        <label className='text-xs mt-3' >Ticket Type</label>
                                        <input
                                            type='text'
                                            className='px-0 py-0.5 w-full border bg-transparent dark:bg-[#454545] border-0 focus:border-0 focus:ring-0 outline-0 placeholder:text-sm font-medium flex-grow mx-2'
                                            placeholder='Class Name'
                                            value={category.className}
                                            onChange={(e) => handleCategoryChange(index, 'className', e.target.value)}
                                        />
                                    </div>
                                    <div className='w-full mx-1 my-1 bg-[#E7E7E7] dark:bg-[#454545] pl-2 pr-2 rounded-lg '>
                                        <label className='text-xs mt-3' >No of seats</label>
                                        <input
                                            type='number'
                                            className='px-0 py-0.5 w-full border bg-transparent dark:bg-[#454545] border-0 focus:border-0 focus:ring-0 outline-0 placeholder:text-sm font-medium ml-2'
                                            placeholder='No of Seats'
                                            value={category.seats}
                                            onChange={(e) => handleCategoryChange(index, 'seats', e.target.value)}
                                        />
                                    </div>
                                    <div className='w-full mx-1 my-1 bg-[#E7E7E7] dark:bg-[#454545] pl-2 pr-2 rounded-lg '>
                                        <label className='text-xs mt-3' >Price</label>
                                        <input
                                            type='number'
                                            min="100"
                                            className='px-0 py-0.5 w-full border bg-transparent dark:bg-[#454545] border-0 focus:border-0 focus:ring-0 outline-0 placeholder:text-sm font-medium ml-2'
                                            placeholder='Price'
                                            value={category.price}
                                            onChange={(e) => handleCategoryChange(index, 'price', e.target.value)}
                                        />
                                    </div>
                                    {index > 0 && (
                                        <button type='button' onClick={() => removeCategory(index)} className='mt-1 ml-2'>
                                            Delete
                                        </button>
                                    )}
                                </div>
                            ))}

                            <button type='button' onClick={addCategory} className='ml-2 mt-2'>
                                + Add Ticket Type
                            </button>
                        </div>

                        <div className='mt-3 mb-2 flex flex-col bg-[#E7E7E7] dark:bg-[#454545] pl-2 pr-2 rounded-lg'>
                            <label className='text-sm font-semibold mt-1' htmlFor="termsAndConditions">
                                <div className="flex w-full">
                                    <span className='ml-0'>
                                        Link for Terms And Conditions
                                    </span>
                                    <Tooltip data={"Give link to your terms and conditions page, if have pdf you can give accessible drive link also"} />
                                </div>
                            </label>
                            <input
                                name="termsAndConditions"
                                type="text"
                                className='px-0 py-0.5 w-full border bg-transparent dark:bg-[#454545] border-0 focus:border-0 focus:ring-0 outline-0 placeholder:text-sm font-medium'
                                placeholder='Link for terms and condition'
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
                                    className='flex mt-1 flex flex-col bg-[#E7E7E7] dark:bg-[#454545] pl-2 pr-2 rounded-lg'
                                >
                                    <label className='text-xs mt-1' htmlFor={`field-${index}`}>
                                        Terms or condition {index + 1}
                                    </label>
                                    <div className="flex align-middle justify-between">

                                        <input
                                            type='text'
                                            id={`field-${index}`}
                                            className='px-0 py-0.5 w-full border bg-transparent dark:bg-[#454545] border-0 focus:border-0 focus:ring-0 outline-0 placeholder:text-sm font-medium'
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
                                                <button type='button' className="" onClick={() => removeInputField(index)}>
                                                    Delete
                                                </button>
                                        }
                                    </div>
                                </div>
                            ))}

                            {inputFields.length < 3 && (
                                <button type='button' onClick={addInputField} className='mt-3'>
                                    + Add term and condition
                                </button>
                            )}
                        </div>


                        <div className="mt-4 flex w-full items-center align-middle">
                            <span className='mt-1 ml-2 text-xs font-medium  dark:text-white ml-0'>
                                Featured Image
                                <span className='ml-0 text-lg font-bold'> * </span>
                            </span>
                            <Tooltip data={"Featured Image is Main Poster of your event which will be visible to the clients "} />
                        </div>

                        <input class="block w-full text-sm text-gray-900 border border-0 rounded-lg cursor-pointer bg-[#E7E7E7] dark:text-gray-400 focus:outline-none dark:bg-[#454545] dark:placeholder-gray-400 mb-1"
                            onChange={capturePhoto}
                            accept="image/*"
                            id="photo" type="file" />
                        {openCrop && (
                            <CropEasy onCropComplete={handleCropComplete} photoURL={photoURL} setOpenCrop={setOpenCrop} setPhotoURL={setPhoto} setFile={setFile} />
                        )}

                        <div className="mt-2 flex w-full items-center align-middle">
                            <span className='mt-1 ml-2 text-xs font-medium  dark:text-white ml-0'>
                                Additional Images
                            </span>
                            <Tooltip data={"You can add multiple images about your event which will be visible on Event Description page"} />
                        </div>

                        <input class="block w-full text-sm text-gray-900 border border-0 rounded-lg cursor-pointer bg-[#E7E7E7] dark:text-gray-400 focus:outline-none dark:bg-[#454545]  dark:placeholder-gray-400 mb-1"
                            onChange={captureAdditionalPhotos}
                            accept="image/*"
                            multiple id="photo" type="file" />

                        <div className="flex w-full items-center align-middle">
                            <span className='mt-1 ml-2 text-xs font-medium  dark:text-white ml-0'>
                                Seating Map
                            </span>
                            <Tooltip data={"Add seating map image for your venue"} />
                        </div>

                        <input class="block w-full text-sm text-gray-900 border border-0 rounded-lg cursor-pointer bg-[#E7E7E7] dark:text-gray-400 focus:outline-none dark:bg-[#454545]  mb-1"

                            onChange={captureSeatingMap}
                            accept="image/*"
                            id="photo" type="file" />


                        <div className="flex w-full items-center align-middle">
                            <span className='ml-2 h-auto text-xs font-medium  dark:text-white ml-0'>
                                Banner
                            </span>
                            <Tooltip data={"Add Banner image for your event"} />
                        </div>

                        <div className="">
                            <input
                                className="block w-full text-sm text-gray-900 border border-0 rounded-lg cursor-pointer bg-[#E7E7E7] dark:text-gray-400 focus:outline-none dark:bg-[#454545]  dark:placeholder-gray-400 mb-1"
                                id="file_input"
                                onChange={captureBanner}
                                accept="image/*"
                                type="file"
                            />
                        </div>

                        <div className="flex w-full items-center align-middle">
                            <span className='ml-2 text-xs font-medium  dark:text-white ml-0'>
                                Video
                            </span>
                            <Tooltip data={"Add sample video of the event"} />
                        </div>

                        <input class="block w-full text-sm text-gray-900 border border-0 rounded-lg cursor-pointer bg-[#E7E7E7] dark:text-gray-400 focus:outline-none dark:bg-[#454545]  dark:placeholder-gray-400 mb-1" id="file_input"
                            accept="video/*"
                            onChange={(e) => setVideo(e.target.files[0])}
                            type="file" />

                        <div className="button flex justify-center items-center mt-5">
                            {/* <button
                                type="submit"
                                onClick={handleSubmit}
                                className="w-full md:w-44 border border-1 border-[#C0A04C] text-[#C0A04C] font-semibold rounded-lg text-md px-4 py-4 text-center md:mr-3 md:mr-0 dark:bg-[#C0A04C]"
                            >
                                Save To Drafts
                            </button> */}
                            <button
                                type="submit"
                                onClick={handleSubmit}
                                className="w-full md:w-44 text-white bg-[#C0A04C] hover:bg-[#A48533] dark:hover:bg-[#A48533] font-semibold rounded-lg text-md px-4 py-4 text-center md:mr-3 md:mr-0 dark:bg-[#C0A04C]"
                            >
                                Save
                            </button>
                        </div>
                    </form>
                    :
                    <div className='dark:bg-[#2c2c2c] dark:text-white h-screen w-full flex justify-center align-middle items-center'>
                        <div class="relative flex justify-center items-center">
                            <div class="absolute animate-spin rounded-full h-32 w-32 border-t-4 border-b-4 border-[#C0A04C]"></div>
                            <img src="/images/logo/logo-main.png" class="h-16" />
                        </div>
                    </div>
            }

        </>
    )
}

export default AddEvent