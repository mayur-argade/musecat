import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'
import JoditEditor from 'jodit-react';
import Cropper from 'react-easy-crop'
import getCroppedImg from '../../utils/cropper'
import toast, { Toaster } from 'react-hot-toast';
import { VendorCreateOffer, GetAllCategory, getAllVenues } from '../../http/index'


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

    const [content, setContent] = useState('')
    const [loading, setLoading] = useState(false)
    const [title, setTitle] = useState('')
    const [shortDesc, setShortDesc] = useState('')
    const [datetype, setDatetype] = useState(true)
    const [startDate, setStartDate] = useState('')
    const [endDate, setEndDate] = useState('')
    const [selectedDays, setSelectedDays] = useState([]);
    const [eventCategory, setEventCategory] = useState('')
    const [location, setLocation] = useState('')
    const [discountOnApp, setDiscountOnApp] = useState('')
    const [features, setFeatures] = useState('')
    const [termsAndConditions, setTermsAndConditions] = useState('')
    const [number, setNumber] = useState('')
    const [fb, setFb] = useState('')
    const [insta, setInsta] = useState('')
    const [mail, setMail] = useState('')
    const [photo, setPhoto] = useState('')
    const [seatingMap, setSeatingMap] = useState('')
    const [banner, setBanner] = useState('')
    const [video, setVideo] = useState('')
    const days = ['monday', 'tuesday', 'wednesday', 'Thursday', 'friday', 'saturday', 'sunday'];


    function capturePhoto(e) {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = function () {
            setPhoto(reader.result);
            // console.log(reader.result);
        };
    }

    function captureSeatingMap(e) {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = function () {
            setSeatingMap(reader.result);
            // console.log(reader.result);
        };
    }

    function captureBanner(e) {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = function () {
            setBanner(reader.result);
            // console.log(reader.result);
        };
    }

    function captureVideo(e) {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = function () {
            setVideo(reader.result);
            // console.log(reader.result);
        };
    }

    const handleDayClick = (day) => {
        if (selectedDays.includes(day)) {
            // If the day is already selected, remove it from the array
            setSelectedDays(selectedDays.filter((selectedDay) => selectedDay !== day));
        } else {
            // If the day is not selected, add it to the array
            setSelectedDays([...selectedDays, day]);
        }
    };

    const inputRef = useRef(null);
    const [image, setImage] = useState(null);
    const [crop, setCrop] = useState({ x: 0, y: 0 });
    const [zoom, setZoom] = useState(1);
    const [croppedImage, setCroppedImage] = useState(null);

    const onFileChange = (e) => {
        if (e.target.files && e.target.files.length > 0) {
            const file = e.target.files[0];
            const reader = new FileReader();
            reader.onload = (e) => {
                setImage(e.target.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const onCropComplete = async (croppedArea, croppedAreaPixels) => {
        // croppedArea contains the x, y, width, and height of the cropped area
        try {
            const base64Image = await getCroppedImg(image, croppedAreaPixels);
            setCroppedImage(base64Image);
        } catch (e) {
            console.error('Error cropping image:', e);
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
        console.log(categories)
        if (
            !title ||
            !content ||
            !location ||
            !termsAndConditions ||
            !eventCategory ||
            !photo ||
            !seatingMap
        ) {
            return toast.error("Required Fields are missing")
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
            eventdate.recurring = selectedDays
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
            if (category.price != null && category.price < 100) {
                return toast.error("price of ticket can not be less than 100")
            }

        }

        const eventdata = {
            title: title,
            shortDescription: shortDesc,
            description: content,
            location: location,
            custom: inputFields,
            features: features,
            termsAndConditions: termsAndConditions,
            categories: categories,
            eventCategory: eventCategory,
            displayPhoto: photo,
            banner: banner,
            date: eventdate,
            seatingMap: seatingMap,
            facebook: fb,
            instagram: insta,
            email: mail,
            whatsapp: number,
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
                                        <label className='text-xs mt-1' htmlFor="first name *">Title  *</label>
                                        <input
                                            type="text"
                                            className='px-0 py-0.5 w-full border bg-transparent border-[#E7E7E7] focus:border-transparent focus:ring-transparent  outline-0 placeholder:text-sm font-medium '
                                            onChange={((e) => setTitle(e.target.value))}
                                            placeholder='Breakfast and poolpass at crown plaza'

                                        />
                                    </div>

                                    <div className='mt-3 flex flex-col bg-[#E7E7E7] pl-2 pr-2 rounded-lg'>
                                        <label className='text-xs mt-1' htmlFor="first name">Short Description</label>
                                        <input
                                            type="text"
                                            className='px-0 py-0.5 w-full border bg-transparent border-[#E7E7E7] focus:border-transparent focus:ring-transparent  outline-0 placeholder:text-sm font-medium '
                                            placeholder='Breakfast and poolpass at crown plaza'
                                            onChange={((e) => setShortDesc(e.target.value))}
                                        />
                                    </div>
                                    <div className='mt-3 flex flex-col bg-[#E7E7E7] pl-2 pr-2 rounded-lg'>
                                        <label className='text-xs mt-1' htmlFor="first name">Event Description  *</label>
                                        <JoditEditor

                                            ref={editor}
                                            value={content}
                                            config={config}
                                            tabIndex={1} // tabIndex of textarea
                                            onBlur={newContent => setContent(newContent)} // preferred to use only this option to update the content for performance reasons
                                        />
                                    </div>
                                    <div className="flex space-x-2 mt-3">
                                        <button className="bg-[#E7E7E7] w-28 px-2 py-1 rounded-md text-sm" onClick={() => setDatetype(true)}>Date Range</button>
                                        <button className="bg-[#E7E7E7] w-28 px-2 py-1 rounded-md text-sm" onClick={() => setDatetype(false)}>Recurring</button>
                                    </div>
                                    {
                                        datetype
                                            ?
                                            <div className="flex align-middle items-center  w-full mt-2 space-x-4">
                                                <div className="flex w-full row1 space-x-4 ">
                                                    <div className='w-full  flex flex-col bg-[#E7E7E7] pl-2 pr-2 rounded-lg'>
                                                        <label className='input-container text-xs mt-1' htmlFor="first name">Date</label>
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
                                                        <label className='text-xs mt-1' htmlFor="first name">Date</label>
                                                        <input
                                                            type="datetime-local"
                                                            id="session-date"
                                                            onChange={((e) => setEndDate(e.target.value))}
                                                            className='px-0 py-0.5 w-full placeholder:text-sm border bg-transparent border-[#E7E7E7] focus:border-transparent focus:ring-transparent  outline-0 placeholder:text-sm text-sm font-medium'
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                            :
                                            (
                                                <div>
                                                    <p className='text-sm mt-2'>Select Days of the Week:</p>
                                                    <div className='flex'>
                                                        {
                                                            days.map((day, index) => (
                                                                <>
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
                                                                </>
                                                            ))
                                                        }
                                                    </div>
                                                </div>
                                            )
                                    }
                                    <div className='mt-3 flex flex-col bg-[#E7E7E7] pl-2 pr-2 rounded-lg'>
                                        <label className='text-xs mt-1' htmlFor="first name">Category  *</label>
                                        <select
                                            type="text"
                                            className='px-0 py-0.5 w-full border bg-transparent border-[#E7E7E7] focus:border-transparent focus:ring-transparent  outline-0 text-sm font-medium text-gray-500'
                                            onChange={((e) => setEventCategory(e.target.value))}

                                            placeholder='Theatre of Arts'
                                        >
                                            {
                                                listCategory.map((category) => (
                                                    <option className=' text-sm font-medium' key={category._id} value={category.categoryURL}>{category.name}</option>
                                                ))
                                            }

                                            <option className=' text-sm font-medium' value="eat">Eat</option>
                                            <option className=' text-sm font-medium' value="weeklyoffers">Weekly Offers</option>
                                        </select>
                                    </div>

                                    <div className='mt-3 flex flex-col bg-[#E7E7E7] pl-2 pr-2 rounded-lg'>
                                        <label className='text-xs mt-1' htmlFor="first name">Location  *</label>
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

                                    {/* <div>
                                    asdfsdadf
                                    <input type="file" onChange={onFileChange} ref={inputRef} accept="image/*" />
                                    {image && (
                                        <div>
                                            <Cropper
                                                image={image}
                                                crop={crop}
                                                zoom={zoom}
                                                aspect={4 / 3} // Set the aspect ratio as needed
                                                onCropChange={setCrop}
                                                onCropComplete={onCropComplete}
                                                onZoomChange={setZoom}
                                            />
                                            <button className="" onClick={onCropComplete}>yes</button>
                                        </div>
                                    )}
                                    {croppedImage && (
                                        <img src={croppedImage} alt="Cropped" style={{ maxWidth: '100%' }} />
                                    )}
                                </div> */}

                                    <div>
                                        <label className='text-xs mt-3' >Custom</label>

                                        {inputFields.map((value, index) => (
                                            <div
                                                key={index}
                                                className='flex mt-1 flex flex-col bg-[#E7E7E7] pl-2 pr-2 rounded-lg'
                                            >
                                                <label className='text-xs mt-1' htmlFor={`field-${index}`}>
                                                    Custom Question {index + 1}
                                                </label>
                                                <div className="flex align-middle justify-between">

                                                    <input
                                                        type='text'
                                                        id={`field-${index}`}
                                                        className='px-0 py-0.5 w-full border bg-transparent border-[#E7E7E7] focus:border-transparent focus:ring-transparent outline-0 placeholder:text-sm font-medium'
                                                        placeholder={`Enter question ${index + 1}`}
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
                                                + Add Field
                                            </button>
                                        )}

                                        {/* <button onClick={handleAddToArray} className='mt-3'>
                                        Add to Array
                                    </button> */}
                                    </div>

                                    <div>
                                        {categories.map((category, index) => (
                                            <div key={index} className='w-full mt-3 flex flex-row space-x-2 '>
                                                <div className='w-full bg-[#E7E7E7] pl-2 pr-2 rounded-lg '>
                                                    <label className='text-xs mt-3' >Offer Class</label>
                                                    <input
                                                        type='text'
                                                        className='px-0 py-0.5 w-full border bg-transparent border-[#E7E7E7] focus:border-transparent focus:ring-transparent outline-0 placeholder:text-sm font-medium flex-grow mx-2'
                                                        placeholder='Class Name'
                                                        value={category.className}
                                                        onChange={(e) => handleCategoryChange(index, 'className', e.target.value)}
                                                    />
                                                </div>
                                                <div className='w-full bg-[#E7E7E7] pl-2 pr-2 rounded-lg '>
                                                    <label className='text-xs mt-3' >No of Vouchers</label>
                                                    <input
                                                        type='number'
                                                        className='px-0 py-0.5 w-full border bg-transparent border-[#E7E7E7] focus:border-transparent focus:ring-transparent outline-0 placeholder:text-sm font-medium ml-2'
                                                        placeholder='10'
                                                        value={category.seats}
                                                        onChange={(e) => handleCategoryChange(index, 'seats', e.target.value)}
                                                    />
                                                </div>
                                                <div className='w-full bg-[#E7E7E7] pl-2 pr-2 rounded-lg '>
                                                    <label className='text-xs mt-3' >Price</label>
                                                    <input
                                                        type='number'
                                                        min="100"
                                                        className='px-0 py-0.5 w-full border bg-transparent border-[#E7E7E7] focus:border-transparent focus:ring-transparent outline-0 placeholder:text-sm font-medium ml-2'
                                                        placeholder='110'
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

                                        <button onClick={addCategory} className='mt-2'>
                                            + Add Class
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
                                    <div className='mt-3 flex flex-col bg-[#E7E7E7] pl-2 pr-2 rounded-lg'>
                                        <label className='text-xs mt-1' htmlFor="first name">Features</label>
                                        <input
                                            type="text"
                                            className='px-0 py-0.5 w-full border bg-transparent border-[#E7E7E7] focus:border-transparent focus:ring-transparent  outline-0 placeholder:text-sm font-medium '
                                            placeholder='Features'
                                            onChange={((e) => setFeatures(e.target.value))}
                                        />
                                    </div>

                                    <div className='mt-3 mb-2 flex flex-col bg-[#E7E7E7] pl-2 pr-2 rounded-lg'>
                                        <label className='text-xs mt-1' htmlFor="first name">Terms And Condition  *</label>
                                        <input

                                            type="text"
                                            className='px-0 py-0.5 w-full border bg-transparent border-[#E7E7E7] focus:border-transparent focus:ring-transparent  outline-0 placeholder:text-sm font-medium '
                                            placeholder='Link for terms and condition'
                                            onChange={((e) => setTermsAndConditions(e.target.value))}
                                        />
                                    </div>
                                    <label class="ml-2 text-xs font-medium  dark:text-white" for="file_input">Contact</label>
                                    <div className='flex justify-between'>
                                        <div className=' flex flex-col bg-[#E7E7E7] pl-2 pr-2 rounded-lg'>
                                            <label className='text-xs mt-1' htmlFor="first name">Facebook URL</label>
                                            <input

                                                type="text"
                                                className='px-0 py-0.5 w-full border bg-transparent border-[#E7E7E7] focus:border-transparent focus:ring-transparent  outline-0 placeholder:text-sm font-medium '
                                                placeholder='Link for FB page'
                                                onChange={((e) => setFb(e.target.value))}
                                            />
                                        </div>
                                        <div className=' flex flex-col bg-[#E7E7E7] pl-2 pr-2 rounded-lg'>
                                            <label className='text-xs mt-1' htmlFor="first name">Insta URL</label>
                                            <input

                                                type="text"
                                                className='px-0 py-0.5 w-full border bg-transparent border-[#E7E7E7] focus:border-transparent focus:ring-transparent  outline-0 placeholder:text-sm font-medium '
                                                placeholder='Link for Instagram page'
                                                onChange={((e) => setInsta(e.target.value))}
                                            />
                                        </div>
                                        <div className=' flex flex-col bg-[#E7E7E7] pl-2 pr-2 rounded-lg'>
                                            <label className='text-xs mt-1' htmlFor="first name">Email</label>
                                            <input

                                                type="email"
                                                className='px-0 py-0.5 w-full border bg-transparent border-[#E7E7E7] focus:border-transparent focus:ring-transparent  outline-0 placeholder:text-sm font-medium '
                                                placeholder='Your email address'
                                                onChange={((e) => setMail(e.target.value))}
                                            />
                                        </div>
                                        <div className=' flex flex-col bg-[#E7E7E7] pl-2 pr-2 rounded-lg'>
                                            <label className='text-xs mt-1' htmlFor="first name">Whatsapp No.</label>
                                            <input
                                                type="number"
                                                className='px-0 py-0.5 w-full border bg-transparent border-[#E7E7E7] focus:border-transparent focus:ring-transparent  outline-0 placeholder:text-sm font-medium '
                                                placeholder='Whatsapp number'
                                                onChange={((e) => setNumber(e.target.value))}
                                            />
                                        </div>
                                    </div>


                                    <label class="mt-1 ml-2 text-xs font-medium  dark:text-white" for="file_input">Display Photo</label>
                                    <input class="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-[#E7E7E7] dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 mb-1"

                                        onChange={capturePhoto}
                                        id="photo" type="file" />

                                    <label class="mt-1 ml-2 text-xs font-medium  dark:text-white" for="file_input">Seating Map</label>
                                    <input class="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-[#E7E7E7] dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 mb-1"

                                        onChange={captureSeatingMap}
                                        id="photo" type="file" />

                                    <label class="ml-2 text-xs font-medium  dark:text-white" for="file_input">Banner</label>
                                    <input class="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-[#E7E7E7] dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 mb-1" id="file_input"

                                        onChange={captureBanner}
                                        type="file" />

                                    <label class="ml-2 text-xs font-medium  dark:text-white" for="file_input">Video</label>
                                    <input class="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-[#E7E7E7] dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 mb-1" id="file_input"
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