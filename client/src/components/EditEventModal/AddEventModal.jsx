import React, { useState } from 'react';
import './addeventmodal.css'
import 'react-phone-number-input/style.css'
import "react-image-crop/dist/ReactCrop.css";
import AddEvent from '../Forms/AddEvent/AddEvent';

const AddEventModal = ({ onClose, verified, setIsLoading }) => {
    const [verifiedStatus, setVerifiedStatus] = useState(verified)
    return (
        <div>
            <section className=' md:mt-12 flex bg-white drop-shadow-2xl rounded-lg'>
                <div className='w-96 md:w-[1000px] rounded-md '>
                    <div className="dark:bg-[#2c2c2c] dark:text-white modal bg-white px-10 py-5">
                        <div className='text-left flex justify-start items-start align-middle'>
                            <p className='text-xl font-bold'>Event/Offer Details</p>
                        </div>
                        <AddEvent setIsLoading={setIsLoading} verifiedValue={verifiedStatus} />
                    </div>
                </div>
            </section>
        </div >
    )
}

export default AddEventModal