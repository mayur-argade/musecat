import React from 'react'
import { useState, useRef } from 'react'

const Accordian = ({ title, content, isOpened, onClick, color, textcol }) => {

    return (
        <div className='mb-4'>
            <div onClick={onClick} className={`cursor-pointer ${color}`}>
                <div className="flex justify-between align-middle">
                    <p className={` ${textcol}`}>{title}</p>
                    {isOpened ? (
                        <img src="/images/icons/minus.svg" alt="Minus Icon" />
                    ) : (
                        <img src="/images/icons/add.svg" alt="Add Icon" />
                    )}
                </div>
            </div>
            {isOpened && (
                <div className={`overflow-hidden transition-all duration-200 pl-3`}>
                    <p className="font-light leading-relaxed ">{content}</p>
                </div>
            )}
        <hr className='border-slate-300'/>
        </div>
    )
}

export default Accordian