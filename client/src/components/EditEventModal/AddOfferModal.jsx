import React, { useState, useEffect } from 'react'
import { VendorCreateOffer } from '../../http/index'


const AddOfferModal = ({ onClose }) => {

    const [loading, setLoading] = useState(false)

    const [title, setTitle] = useState('')
    const [shortdesc, setShortdesc] = useState('')
    const [description, setDescription] = useState('')
    const [startdate, setStartdate] = useState('')
    const [expiry, setExpiry] = useState('')
    const [location, setLocation] = useState('')
    const [photo, setPhoto] = useState('')
    const [banner, setBanner] = useState('')
    const [video, setVideo] = useState('')


    function capturePhoto(e) {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = function () {
            setPhoto(reader.result);
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

    const handleSave = async () => {
        if (!title || !shortdesc || !description || !startdate || !expiry || !location || !photo || !banner || !video) {
            window.alert("All fields are mandatory")
        }

        const offerdata = {
            title: title,
            description: description,
            startdate: startdate,
            expiry: expiry,
            photo: photo
        }
        // console.log(offerdata)
        setLoading(true)
        try {
            const { data } = await VendorCreateOffer(offerdata)
            setLoading(false)
            console.log(data)
            if (data.success == true) {
                window.location.reload()
            } else if (data.success == false) {
            }
        } catch (error) {
            console.log(error)
        }
        onClose(); // This will close the modal
    };

    return (
        <div>
            {!loading
                ?
                <section className='md:mt-12 flex bg-white drop-shadow-2xl rounded-lg'>

                    <div className='w-96 md:w-[1000px]'>
                        <div className="modal bg-white px-3 py-4">
                            <div className='text-left flex justify-start items-start align-middle'>
                                <p className='text-md font-bold'>Offer Details</p>
                            </div>

                            <div className='mt-3 flex flex-col bg-[#E7E7E7] pl-2 pr-2 rounded-lg'>
                                <label className='text-xs mt-1' htmlFor="first name">Title</label>
                                <input
                                    type="text"
                                    className='px-0 py-0.5 w-full border bg-transparent border-[#E7E7E7] focus:border-transparent focus:ring-transparent  outline-0 placeholder:text-sm font-medium '
                                    onChange={((e) => setTitle(e.target.value))}
                                    placeholder='Breakfast and poolpass at crown plaza'
                                />
                            </div>

                            <div className='mt-3 flex flex-col bg-[#E7E7E7] pl-2 pr-2 rounded-lg'>
                                <label className='text-xs mt-1' htmlFor="first name">Offer Short Description</label>
                                <input
                                    type="text"
                                    className='px-0 py-0.5 w-full border bg-transparent border-[#E7E7E7] focus:border-transparent placeholder:text-sm focus:ring-transparent  outline-0
                                font-medium'
                                    onChange={((e) => setShortdesc(e.target.value))}
                                    placeholder='write your description here'
                                />
                            </div>

                            <div className='mt-3 flex flex-col bg-[#E7E7E7] pl-2 pr-2 rounded-lg'>
                                <label className='text-xs mt-1' htmlFor="first name"> Description</label>
                                <textarea
                                    type="text"
                                    className='px-0 py-0.5 w-full border bg-transparent border-[#E7E7E7] focus:border-transparent placeholder:text-sm focus:ring-transparent  outline-0
                                font-medium'
                                    onChange={((e) => setDescription(e.target.value))}
                                    placeholder='write your description here'
                                />
                            </div>

                            <div className="flex w-full row1 space-x-4 ">

                                <div className='w-full mt-3 flex flex-col bg-[#E7E7E7] pl-2 pr-2 rounded-lg'>
                                    <label className='text-xs mt-1' htmlFor="first name">Start Date</label>
                                    <input
                                        type="date"
                                        onChange={((e) => setStartdate(e.target.value))}
                                        className='px-0 py-0.5 w-full border bg-transparent border-[#E7E7E7] focus:border-transparent 
                                    focus:ring-transparent text-gray-500 text-sm font-medium outline-0'
                                    />
                                </div>

                                <div className='w-full mt-3 flex flex-col bg-[#E7E7E7] pl-2 pr-2 rounded-lg'>
                                    <label className='text-xs mt-1' htmlFor="first name">Expiry Date</label>
                                    <input
                                        type="date"
                                        onChange={((e) => setExpiry(e.target.value))}
                                        className='px-0 py-0.5 w-full border bg-transparent border-[#E7E7E7] focus:border-transparent focus:ring-transparent text-gray-500 text-sm font-medium outline-0'
                                    />
                                </div>

                            </div>

                            <div className='mt-3 flex flex-col bg-[#E7E7E7] pl-2 pr-2 rounded-lg'>
                                <label className='text-xs mt-1' htmlFor="first name">Location</label>
                                <select
                                    type="text"
                                    className='px-0 py-0.5 w-full border bg-transparent border-[#E7E7E7] focus:border-transparent focus:ring-transparent  outline-0 text-sm font-medium text-gray-500'
                                    onChange={((e) => setLocation(e.target.value))}
                                    placeholder='Theatre of Arts'
                                >
                                    <option className=' text-sm font-medium' value="crownplaza">Crown Plaza</option>
                                    <option className=' text-sm font-medium' value="crownplaza">Crown Plaza</option>
                                    <option className=' text-sm font-medium' value="crownplaza">Crown Plaza</option>
                                </select>
                            </div>


                            <label class="mt-1 ml-2 text-xs font-medium  dark:text-white" for="file_input">Display Photo</label>
                            <input class="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-[#E7E7E7] dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 mb-1"
                                onChange={capturePhoto}
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
        </div>
    )
}

export default AddOfferModal