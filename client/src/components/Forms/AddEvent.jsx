import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import Tooltip from '../shared/Tooltip/Tooltip'; // Assuming Tooltip is a separate component
import JoditEditor from 'jodit-react';
import { Features, config } from '../../utils/Data';
import AddVenueModal from '../EditEventModal/AddVenueModal';
import CategorySelector from '../shared/CategorySelector/CategorySelector';
import { GetAllCategory, getAllVenues } from '../../http';
import 'react-phone-number-input/style.css'
import PhoneInput from 'react-phone-number-input'

const AddEvent = () => {
    const formRef = useRef(null);
    const editorRef = useRef(null)
    const [loading, setLoading] = useState(false)
    const [datetype, setDatetype] = useState(true);
    const [selectedDays, setSelectedDays] = useState([]);
    const [location, setLocation] = useState('');
    const [venueDescription, setVenueDescription] = useState('');
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [selectedFeature, setSelectedFeature] = useState([]);
    const [showVenuecreate, setShowVenuecreate] = useState(false);
    const [listCategory, setListCategory] = useState([])
    const [listVenues, setListVenues] = useState([])
    const [categories, setCategories] = useState([
        { className: null, seats: null, price: null },
    ]);
    const [inputFields, setInputFields] = useState(['']);

    const days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];


    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData(formRef.current);
        formData.append('content', editorRef.current.value);
        formData.append('days', JSON.stringify(selectedDays))
        formData.append('location', location);
        formData.append('venueDescription', venueDescription);
        formData.append('selectedCategories', JSON.stringify(selectedCategories));
        formData.append('selectedFeature', JSON.stringify(selectedFeature));

        try {
            const formDataObj = Object.fromEntries(formData.entries());
            console.log(formDataObj);
        } catch (error) {
            console.error('Error submitting form:', error);
        }
    };

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
    }, []);

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

    const addCategory = () => {
        setCategories([...categories, { className: null, seats: null, price: null }]);
    };

    const removeCategory = (index) => {
        const updatedCategories = [...categories];
        updatedCategories.splice(index, 1);
        setCategories(updatedCategories);
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

    return (
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
                <JoditEditor
                    ref={editorRef}
                    config={config}
                    tabIndex={1}
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

            <div className="flex align-middle items-center w-full mt-2 space-x-4">
                <div className="flex w-full row1 space-x-4">
                    <div className='w-full flex flex-col bg-[#E7E7E7] dark:bg-[#454545] pl-2 pr-2 rounded-lg'>
                        <label className='input-container text-xs mt-1' htmlFor="startDate">Start Date <span className='ml-0 text-lg font-bold'>*</span></label>
                        <input
                            type="datetime-local"
                            id="session-date"
                            name="startDate"
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
                            className='px-0 py-0.5 w-full placeholder:text-sm border bg-transparent dark:bg-[#454545] border-0 focus:border-0 focus:ring-0 outline-0 placeholder:text-sm text-sm font-medium'
                        />
                    </div>
                </div>
            </div>

            <div className="flex space-x-2 align-middle ml-2 mt-1 mb-3">
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
                    <p className='text-sm mt-2'>Select Days of the Week For recurring event :</p>
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

                        <div className='flex'>
                            <div className='flex flex-col bg-[#E7E7E7] dark:bg-[#454545] pl-2 pr-2 mr-2 rounded-lg'>
                                <label className='input-container text-xs mt-1' htmlFor="startTime">Start Time</label>
                                <input
                                    type="time"
                                    id="session-time"
                                    name="startTime"
                                    className="px-0 py-0.5 placeholder:text-sm border bg-transparent dark:bg-[#454545] border-0 focus:border-0 focus:ring-0 outline-0 placeholder:text-sm text-sm font-medium"
                                />
                            </div>
                            <div className='flex flex-col bg-[#E7E7E7] dark:bg-[#454545] pl-2 pr-2 rounded-lg'>
                                <label className='input-container text-xs mt-1' htmlFor="endTime">End Time</label>
                                <input
                                    type="time"
                                    id="session-time"
                                    name="endTime"
                                    className="px-0 py-0.5 placeholder:text-sm border bg-transparent dark:bg-[#454545] border-0 focus:border-0 focus:ring-0 outline-0 placeholder:text-sm text-sm font-medium"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            )}

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
                <JoditEditor
                    ref={editorRef}
                    value={venueDescription}
                    config={config}
                    tabIndex={1}
                    onBlur={newContent => setVenueDescription(newContent)}
                />
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

            {/* Add Venue Button */}
            <button onClick={(() => setShowVenuecreate(!showVenuecreate))}>
                {/* Button content */}
            </button>

            {/* Add Venue Modal */}
            {showVenuecreate ?
                <AddVenueModal
                    onClose={() => setShowVenuecreate(false)}
                    message={"Venue added! you can choose venue from Dropdown"}
                />
                : null
            }

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
                            inputProps={{
                                name: 'number'
                            }}
                            placeholder="Enter phone number"
                        />
                    </div>

                    <div className='dark:text-black w-full mx-1 my-1 flex flex-col bg-[#E7E7E7] dark:bg-[#454545] pl-2 pr-2 rounded-lg'>
                        <label className='text-xs mt-1 dark:text-white' htmlFor="wpNumber">Whatsapp No. with Country code</label>
                        <PhoneInput
                            inputProps={{
                                name: 'wpNumber'
                            }}
                            placeholder="Enter Whatsapp number"
                        />
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
                                name={`categories[${index}][className]`}
                                type='text'
                                className='px-0 py-0.5 w-full border bg-transparent dark:bg-[#454545] border-0 focus:border-0 focus:ring-0 outline-0 placeholder:text-sm font-medium flex-grow mx-2'
                                placeholder='Class Name'
                            />
                        </div>
                        <div className='w-full mx-1 my-1 bg-[#E7E7E7] dark:bg-[#454545] pl-2 pr-2 rounded-lg '>
                            <label className='text-xs mt-3' >No of seats</label>
                            <input
                                name={`categories[${index}][seats]`}
                                type='number'
                                className='px-0 py-0.5 w-full border bg-transparent dark:bg-[#454545] border-0 focus:border-0 focus:ring-0 outline-0 placeholder:text-sm font-medium ml-2'
                                placeholder='No of Seats'
                            />
                        </div>
                        <div className='w-full mx-1 my-1 bg-[#E7E7E7] dark:bg-[#454545] pl-2 pr-2 rounded-lg '>
                            <label className='text-xs mt-3' >Price</label>
                            <input
                                name={`categories[${index}][price]`}
                                type='number'
                                min="100"
                                className='px-0 py-0.5 w-full border bg-transparent dark:bg-[#454545] border-0 focus:border-0 focus:ring-0 outline-0 placeholder:text-sm font-medium ml-2'
                                placeholder='Price'
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

            <div className='mt-3 mb-2 flex flex-col bg-[#E7E7E7] dark:bg-[#454545] pl-2 pr-2 rounded-lg'>
                <label className='text-sm font-semibold mt-1' htmlFor="first name">
                    <div className="flex w-full">
                        <span className='ml-0'>
                            Link for Terms And Conditions
                        </span>
                        <Tooltip data={"Give link to your terms and conditions page, if have pdf you can give accessable drive link also"} />
                    </div>
                </label>
                <input
                    name="termsAndConditions"
                    type="text"
                    className='px-0 py-0.5 w-full border bg-transparent dark:bg-[#454545] border-0 focus:border-0 focus:ring-0  outline-0 placeholder:text-sm font-medium '
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
                                name={`inputFields[${index}]`}
                                type='text'
                                id={`field-${index}`}
                                className='px-0 py-0.5 w-full border bg-transparent dark:bg-[#454545] border-0 focus:border-0 focus:ring-0 outline-0 placeholder:text-sm font-medium'
                                placeholder={`Enter term or condition ${index + 1}`}
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
            <button type="submit">Submit</button>
        </form>
    )
}

export default AddEvent