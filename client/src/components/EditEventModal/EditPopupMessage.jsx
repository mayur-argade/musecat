import React, { useState, useEffect } from 'react'
import { AdminSetVisibilityOfModal, getPopupModal, AdminEditModal } from '../../http'
import toast, { Toaster } from 'react-hot-toast';

const EditPopupMessage = ({ onClose }) => {

    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [selectedFile, setSelectedFile] = useState(null)
    const [photo, setPhoto] = useState('')
    const [ctaLink, setCtaLink] = useState('')
    const [ctaText, setCtaText] = useState('')
    const [isChecked, setIsChecked] = useState(false);
    const [popupData, setPopupData] = useState(null)

    function capturePhoto(e) {
        const file = e.target.files[0];
        if (file) {
            setSelectedFile(file)
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onloadend = function () {
                setPhoto(reader.result);
                console.log(reader.result);
            };
        }
    }

    const handleInputChange = async (event) => {
        const isChecked = event.target.checked;
        setIsChecked(isChecked);

        try {
            const promise = AdminSetVisibilityOfModal({ id: '66197c40f100f8c507519012', showModal: isChecked });
            const { data } = await toast.promise(promise, {
                loading: 'Processing...',
                success: (data) => data.data.data,
                error: (error) => `Error: ${error.response.data.data}`,
            });
        } catch (error) {
            console.log(error)
        }

    };

    useEffect(() => {

        const fetchData = async () => {
            try {
                const { data } = await getPopupModal('66197c40f100f8c507519012')
                setPopupData(data.data)
                setIsChecked(data.data.visible)
                setTitle(data.data.title)
                setDescription(data.data.description)
                setPhoto(data.data.photo)
                setCtaLink(data.data.ctaLink)
                setCtaText(data.data.ctaText)
            } catch (error) {
                console.log(error)
            }
        }

        fetchData()

        // Add event listener when component mounts
        const handleClickOutside = (event) => {
            if (event.target.classList.contains('bg-opacity-50')) {
                handleClose();
            }
        };

        document.addEventListener('click', handleClickOutside);

        // Cleanup event listener when component unmounts
        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, []); // Empty dependency array to ensure this effect runs only once on mount

    const handleClose = () => {
        onClose();
    };

    async function submit() {
        try {
            const updateData = {
                id: "66197c40f100f8c507519012",
                displayPhoto: photo,
                title: title,
                description: description,
                showModal: isChecked,
                ctaLink: ctaLink,
                ctaText: ctaText
            }

            const promise = AdminEditModal(updateData);
            const { data } = await toast.promise(promise, {
                loading: 'Saving Details',
                success: (data) => data.data.data,
                error: (error) => `Error: ${error.response.data.data}`,
            });
            onClose()
            console.log(data)
        } catch (error) {
            console.log(error)
            onClose()
        }
    }

    return (
        <div className='fixed top-0 left-0 w-screen h-screen bg-black bg-opacity-50 flex justify-center items-center z-50'>
            <section className='md:mt-12 flex bg-white drop-shadow-2xl rounded-md'>
                <div className='p-3 w-96 md:w-[800px] rounded-md'>
                    <div className="modal bg-white px-3 py-4">
                        <button
                            onClick={() => handleClose()}
                            className="absolute top-0 right-0 m-2 text-gray-600 hover:text-gray-800 focus:outline-none"
                        >
                            <img src="/images/icons/cancel-icon.png" alt="" />
                        </button>
                        <div className='space-y-4 max-h-auto  overflow-y-auto'>
                            <div className='mt-1 text-left flex justify-between items-start align-middle'>
                                <p className='text-md font-bold'>Edit Popup Box</p>
                                <label className="inline-flex items-center me-5 cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={isChecked}
                                        onChange={handleInputChange}
                                        className="sr-only peer"
                                    />
                                    <div className="relative w-11 h-6 bg-gray-200 rounded-full peer dark:bg-gray-700 peer-focus:ring-4 peer-focus:ring-yellow-300 dark:peer-focus:ring-yellow-800 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-yellow-400"></div>
                                    <span className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">Show Pop Up Box</span>
                                </label>
                            </div>

                            <div>
                                <label htmlFor="title" className='text-xs'>Title</label>
                                <input className="w-full  p-2.5 text-xs bg-white md:bg-gray-100 focus:outline-none border border-gray-200 rounded-md text-gray-600" type="text" for="Title" id='Title'
                                    value={title} onChange={(e) => setTitle(e.target.value)}
                                    placeholder="Title" />
                            </div>
                            <div>
                                <label htmlFor="title" className='text-xs'>Description</label>
                                <input className="w-full p-2.5 text-xs bg-white md:bg-gray-100 focus:outline-none border border-gray-200 rounded-md text-gray-600" type="text" for="description" id='description'
                                    value={description} onChange={(e) => setDescription(e.target.value)}
                                    placeholder="Description" />
                            </div>
                            <div>
                                <label htmlFor="title" className='text-xs'>Button Text</label>
                                <input className="w-full p-2.5 text-xs bg-white md:bg-gray-100 focus:outline-none border border-gray-200 rounded-md text-gray-600" type="text" for="description" id='description'
                                    value={ctaText} onChange={(e) => setCtaText(e.target.value)}
                                    placeholder="Buy Tickets" />
                            </div>
                            <div>
                                <label htmlFor="title" className='text-xs'>Redirect Link</label>
                                <input className="w-full p-2.5 text-xs bg-white md:bg-gray-100 focus:outline-none border border-gray-200 rounded-md text-gray-600" type="text" for="description" id='description'
                                    value={ctaLink} onChange={(e) => setCtaLink(e.target.value)}
                                    placeholder="Link address" />
                            </div>


                            <div className="flex items-center justify-center w-full">
                                <label for="dropzone-file" className="flex flex-col items-center justify-center w-full h-20 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50  hover:bg-gray-100 ">
                                    <div className="flex flex-col items-center justify-center ">
                                        <img src="/images/icons/upload-image.svg" alt="" />
                                        <p className="text-xs">{selectedFile ? `Selected File: ${selectedFile.name}` : 'Upload Display Picture'}</p>
                                    </div>
                                    <input onChange={capturePhoto}
                                        id="dropzone-file" type="file" className="hidden" />
                                </label>
                            </div>

                            <div>
                                <button className="w-full py-2 bg-[#C0A04C] hover:bg-[#A48533] rounded-md text-sm font-bold text-gray-50 transition duration-200" onClick={submit} >Submit</button>
                            </div>


                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default EditPopupMessage