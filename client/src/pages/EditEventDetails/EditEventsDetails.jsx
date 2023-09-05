import React from 'react'

const EditEventsDetails = () => {
    
    return (
        <div>
            <div className='flex flex-col bg-[#E7E7E7] pl-2 pr-2 rounded-lg'>
            <label className='text-xs mt-1' htmlFor="first name">Last name</label>
            <input
                type="text"
                className='border bg-transparent border-[#E7E7E7] focus:border-[#E7E7E7] focus:ring-[#E7E7E7]  outline-0'
                placeholder='Doe'
                disabled
            />
        </div>
        </div>
    )
}

export default EditEventsDetails