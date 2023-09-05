import React from 'react'

const EditEventModal = ({ onClose }) => {
    const handleSave = () => {
        // onSave(editedEventData);
        onClose(); // This will close the modal
    };

    return (
        <>
            <section className='md:mt-12 flex bg-white drop-shadow-2xl rounded-lg'>
                <div className='w-96 md:w-[1000px]'>


                    <div className="modal bg-white px-3 py-4">
                        <div className='text-left flex justify-start items-start align-middle'>
                            <p className='text-md font-bold'>Event Details</p>
                        </div>
                        <div className='mt-3 flex flex-col bg-[#E7E7E7] pl-2 pr-2 rounded-lg'>
                            <label className='text-xs mt-1' htmlFor="first name">Title</label>
                            <input
                                type="text"
                                className='px-0 py-0.5 w-full border bg-transparent border-[#E7E7E7] focus:border-transparent focus:ring-transparent  outline-0 placeholder:text-sm font-medium '
                                placeholder='Breakfast and poolpass at crown plaza'
                            />
                        </div>
                        <div className='mt-3 flex flex-col bg-[#E7E7E7] pl-2 pr-2 rounded-lg'>
                            <label className='text-xs mt-1' htmlFor="first name">Event Description</label>
                            <textarea
                                type="text"
                                className='px-0 py-0.5 w-full border bg-transparent border-[#E7E7E7] focus:border-transparent placeholder:text-sm focus:ring-transparent  outline-0
                                font-medium'
                                placeholder='write your description here'
                            />
                        </div>
                        <div className='mt-3 flex flex-col bg-[#E7E7E7] pl-2 pr-2 rounded-lg'>
                            <label className='text-xs mt-1' htmlFor="first name">Date</label>
                            <input
                                type="date"
                                className='px-0 py-0.5 w-full placeholder:text-sm border bg-transparent border-[#E7E7E7] focus:border-transparent focus:ring-transparent  outline-0 placeholder:text-sm text-sm font-medium'
                            />
                        </div>
                        <div className='mt-3 flex flex-col bg-[#E7E7E7] pl-2 pr-2 rounded-lg'>
                            <label className='text-xs mt-1' htmlFor="first name">Location</label>
                            <input
                                type="text"
                                className='px-0 py-0.5 w-full placeholder:text-sm border bg-transparent border-[#E7E7E7] focus:border-transparent focus:ring-transparent  outline-0 placeholder:font-medium font-medium'
                                placeholder='Theatre of Arts'
                            />
                        </div>

                        <div className="flex w-full row1 space-x-4 ">
                            <div className='w-full mt-3 flex flex-col bg-[#E7E7E7] pl-2 pr-2 rounded-lg'>
                                <label className='text-xs mt-1' htmlFor="first name">Ticket Pricing Silver</label>
                                <input
                                    type="text"
                                    className='px-0 py-0.5 w-full placeholder:text-sm  border bg-transparent border-[#E7E7E7] focus:border-transparent focus:ring-transparent  outline-0 placeholder:font-medium font-medium'
                                    placeholder='Breakfast and poolpass at crown plaza'
                                />
                            </div>
                            <div className='w-full mt-3 flex flex-col bg-[#E7E7E7] pl-2 pr-2 rounded-lg'>
                                <label className='text-xs mt-1' htmlFor="first name">Total Seats - Silver</label>
                                <input
                                    type="text"
                                    className='px-0 py-0.5 w-full placeholder:text-sm  border bg-transparent border-[#E7E7E7] focus:border-transparent focus:ring-transparent  outline-0 placeholder:font-medium font-medium'
                                    placeholder='Breakfast and poolpass at crown plaza'
                                />
                            </div>
                        </div>

                        <div className="flex w-full row1 space-x-4 ">
                            <div className='w-full mt-3 flex flex-col bg-[#E7E7E7] pl-2 pr-2 rounded-lg'>
                                <label className='text-xs mt-1' htmlFor="first name">Ticket Pricing Gold</label>
                                <input
                                    type="text"
                                    className='px-0 py-0.5 w-full placeholder:text-sm  border bg-transparent border-[#E7E7E7] focus:border-transparent focus:ring-transparent  outline-0 placeholder:font-medium font-medium'
                                    placeholder='Breakfast and poolpass at crown plaza'
                                />
                            </div>
                            <div className='w-full mt-3 flex flex-col bg-[#E7E7E7] pl-2 pr-2 rounded-lg'>
                                <label className='text-xs mt-1' htmlFor="first name">Total Seats - Gold</label>
                                <input
                                    type="text"
                                    className='px-0 py-0.5 w-full placeholder:text-sm  border bg-transparent border-[#E7E7E7] focus:border-transparent focus:ring-transparent  outline-0 placeholder:font-medium font-medium'
                                    placeholder='Breakfast and poolpass at crown plaza'
                                />
                            </div>
                        </div>

                        <div className="flex w-full row1 space-x-4 ">
                            <div className='w-full mt-3 flex flex-col bg-[#E7E7E7] pl-2 pr-2 rounded-lg'>
                                <label className='text-xs mt-1' htmlFor="first name">Ticket Pricing Platinum</label>
                                <input
                                    type="text"
                                    className='px-0 py-0.5 w-full placeholder:text-sm  border bg-transparent border-[#E7E7E7] focus:border-transparent focus:ring-transparent  outline-0 placeholder:font-medium font-medium'
                                    placeholder='Breakfast and poolpass at crown plaza'
                                />
                            </div>
                            <div className='w-full mt-3 flex flex-col bg-[#E7E7E7] pl-2 pr-2 rounded-lg'>
                                <label className='text-xs mt-1' htmlFor="first name">Total Seats - Platinum</label>
                                <input
                                    type="text"
                                    className='px-0 py-0.5 w-full placeholder:text-sm  border bg-transparent border-[#E7E7E7] focus:border-transparent focus:ring-transparent  outline-0 placeholder:font-medium font-medium'
                                    placeholder='Breakfast and poolpass at crown plaza'
                                />
                            </div>
                        </div>

                        <div className='mt-3 flex flex-col bg-[#E7E7E7] pl-2 pr-2 rounded-lg'>
                            <label className='text-xs mt-1' htmlFor="first name">Write Custom conditions for the events (optional)</label>
                            <input
                                type="text"
                                className='px-0 py-0.5 w-full placeholder:text-sm border bg-transparent border-[#E7E7E7] focus:border-transparent focus:ring-transparent  outline-0 placeholder:font-medium font-medium'
                                placeholder='Are you 18 plus ?'
                            />
                        </div>


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
        </>
    )
}

export default EditEventModal