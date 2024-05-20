import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'
import { VendorCreateEvent, GetAllCategory, getAllVenues, handleUpload } from '../../http/index'
import JoditEditor from 'jodit-react';
import toast, { Toaster } from 'react-hot-toast';
import './addeventmodal.css'
import AddVenueModal from './AddVenueModal';
// import { Features } from '../../utils/Data'
import CategorySelector from '../shared/CategorySelector/CategorySelector';
import Tooltip from '../shared/Tooltip/Tooltip'
import moment from 'moment-timezone'
import 'react-phone-number-input/style.css'
import PhoneInput from 'react-phone-number-input'
import ReactDOM from "react-dom";
import ReactCrop from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
import Modal from "react-modal";
import CropEasy from '../Crop/CropEasy';
import AddEvent from '../Forms/AddEvent/AddEvent';

const AddEventModal = ({ onClose, verified }) => {
    const editor = useRef(null);
    const navigate = useNavigate()
    const [verifiedValue, setVerifiedValue] = useState(verified)
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [value, setValue] = useState()
    // const [openCrop, setOpenCrop] = useState(false);
    useEffect(() => {
        // On page load or when changing themes, best to add inline in `head` to avoid FOUC
        if (
            localStorage.getItem('color-theme') === 'dark' ||
            (!('color-theme' in localStorage) &&
                window.matchMedia('(prefers-color-scheme: dark)').matches)
        ) {
            setIsDarkMode(true);
        } else {
            setIsDarkMode(false);
        }
    }, []);
    const config = {
        placeholder: "Enter Event Specific Details in brief..",
        buttons: [
            'bold',
            'strikethrough',
            'underline',
            'italic', '|',
            'font',
            'fontsize',
            'align', 'undo', 'redo', '|',
            'hr',
            'print',
        ],
        buttonsMD: [
            'bold',
            'strikethrough',
            'underline',
            'italic', '|',
            'font',
            'fontsize',
            'align', 'undo', 'redo', '|',
            'hr',
            'print',
        ],
        buttonsSM: [
            'bold',
            'strikethrough',
            'underline',
            'italic', '|',
            'font',
            'fontsize',
            'align', 'undo', 'redo', '|',
            'hr',
            'print',
        ],
        buttonsXS: [
            'bold',
            'strikethrough',
            'underline',
            'italic', '|',
            'font',
            'fontsize',
            'align', 'undo', 'redo', '|',
            'hr',
            'print',
        ],
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
    const [subLoading, SetSubLoading] = useState(false)

    const [showEndDate, setShowEndDate] = useState(false);

    const handleCheckboxChange = () => {
        setShowEndDate(!showEndDate); // Toggle the state when the checkbox is changed
    };

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const venues = await getAllVenues()
                setListVenues(venues.data.data)
                setLoading(false)
                // console.log("categories", response.data.data)
            } catch (error) {
                // console.log(error)
            }
        }
        fetchCategories()
    }, [showVenuecreate])

    const handleEventCategoryChange = (selectedOptions) => {
        // console.log("this is what getting selected", selectedOptions)
        // Filter out any duplicate selections
        const uniqueSelectedOptions = [...new Set(selectedOptions)];
        // console.log(uniqueSelectedOptions)
        // Update the state or perform other actions with the selected categories
        setSelectedCategories(uniqueSelectedOptions);
    };

    const [file, setFile] = useState(null);
    const [photoURL, setPhotoURL] = useState('');
    const [openCrop, setOpenCrop] = useState(false);

    const handleCropComplete = (url, file) => {
        // Do something with the URL and file, such as storing them in state
        setPhoto(url)
        // console.log("Cropped File:", file);
    };

    function capturePhoto(e) {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onloadend = function () {
                const base64String = reader.result;
                setFile(file);
                setPhoto(base64String);
                setPhotoURL(URL.createObjectURL(file));
                setOpenCrop(true);
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
            setFile(file);
            setPhotoURL(URL.createObjectURL(file));
            setOpenCrop(true);
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
    const [modalIsOpen, setModalIsOpen] = useState(false);

    const reqCloseCrop = () => {
        setOpenCrop(false)

    }
    const handleSave = async () => {

        const momentstart = moment(startDate).tz('Asia/Kolkata') // Assuming startDate is in UTC
        const momentend = moment(endDate).tz('Asia/Kolkata') // Assuming endDate is in UTC

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
        else if (!startDate) {
            return toast.error("Start date is mandatory")
        }
        else if (!location) {
            return toast.error("Location is missing")
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
        else if (!number) {
            return toast.error("Phone number is Mandatory")
        }
        else if (startDate && endDate) {
            if (!momentstart.isSameOrBefore(momentend, 'day')) {
                return toast.error('Start date should be less than or equal to end date');
            }
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
                startDate: momentstart,
                endDate: momentend
            }
        } else if (dateType == 'recurring') {
            if (selectedDays.length <= 0) {
                return toast.error("Please select days if you are selecting recurring event")
            }
            eventdate = {
                recurring: {
                    days: []
                }
            }
            eventdate.recurring.days = selectedDays
            eventdate.recurring.startTime = startTime
            eventdate.recurring.endTime = endTime
            eventdate.recurring.startDate = momentstart
            eventdate.recurring.endDate = momentend
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

        let response;
        if (Crfile != null) {
            const formData = new FormData();
            formData.append('file', Crfile);
            SetSubLoading(true)
            response = await handleUpload(formData)
                .then((response) => {
                    console.log('Upload successful:', response);
                    console.log(response.data.data)
                    setFileURL(response.data.data)
                    return response.data.data
                    // Do something with the response if needed
                })
                .catch((error) => {
                    console.error('Error during upload:', error);
                    // Handle the error if needed
                });
        }

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
            video: response,
            seatingMap: seatingMap,
            facebook: fb,
            instagram: insta,
            email: mail,
            verified: verifiedValue,
            whatsapp: wpNumber.split("+")[1],
            website: website,
            phone: number.split("+")[1],
            showEndDate: showEndDate
        }
        console.log(eventdata)
        SetSubLoading(true)
        try {
            console.log(eventdata)
            const { data } = await VendorCreateEvent(eventdata)
            SetSubLoading(false)
            console.log(data)
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
            SetSubLoading(false)
            toast.error(error.response.data.data)
        }
    };

    return (
        <div>
            <Toaster />
            {
                !subLoading
                    ?
                    <section className=' md:mt-12 flex bg-white drop-shadow-2xl rounded-lg'>
                        <div className='w-96 md:w-[1000px] rounded-md '>
                            <div className="dark:bg-[#2c2c2c] dark:text-white modal bg-white px-10 py-5">
                                <div className='text-left flex justify-start items-start align-middle'>
                                    <p className='text-xl font-bold'>Event/Offer Details</p>
                                </div>
                                <AddEvent />

                            </div>
                        </div>
                    </section>
                    :
                    <div className='dark:bg-[#2c2c2c] dark:text-white h-screen w-full flex justify-center align-middle items-center'>
                        <div class="relative flex justify-center items-center">
                            <div class="absolute animate-spin rounded-full h-32 w-32 border-t-4 border-b-4 border-[#C0A04C]"></div>
                            <img src="/images/logo/logo-main.png" class="h-16" />
                        </div>
                    </div>
            }
        </div >
    )
}

export default AddEventModal