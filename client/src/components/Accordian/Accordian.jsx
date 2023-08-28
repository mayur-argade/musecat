import React from 'react'
import { useState, useRef } from 'react'

const Accordian = ({ title, content, isOpened, onClick }) => {

    return (
        <div className='mb-4'>
            <div onClick={onClick} className=" cursor-pointer">
                <div className="flex justify-between">
                    <p className="font-semibold">{title}</p>
                    {isOpened ? (
                        <img src="/images/icons/minus.svg" alt="Minus Icon" />
                    ) : (
                        <img src="/images/icons/add.svg" alt="Add Icon" />
                    )}
                </div>
            </div>
            {isOpened && (
                <div className="overflow-hidden transition-all duration-200">
                    <p className="font-light leading-relaxed">{content}</p>
                </div>
            )}
        <hr className='border-slate-300'/>
        </div>
    )
}

export default Accordian