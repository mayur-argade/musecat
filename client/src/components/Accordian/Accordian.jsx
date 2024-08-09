import React from 'react'
import { useState, useRef } from 'react'
import ReactHtmlParser from 'react-html-parser'

const Accordian = ({ title, content, isOpened, onClick, color, textcol, contentfont }) => {
    console.log(content)
    return (
        <div className='mb-6'>
            <div onClick={onClick} className={`cursor-pointer ${color}`}>
                <div className="flex justify-between align-middle">
                    <p className={`text-lg ${textcol}`}>{title}</p>
                    {isOpened ? (
                        <p className="font-bold text-xl">
                            -
                        </p>
                        // <img src="/images/icons/minus.svg" alt="Minus Icon" />
                    ) : (
                        <p className="font-bold text-xl">
                            +
                        </p>
                        // <img src="/images/icons/add.svg" alt="Add Icon" />
                    )}
                </div>
            </div>
            {isOpened && (
                <div className={`overflow-hidden transition-all duration-200 pl-3`}>
{ReactHtmlParser(content)}
                </div>
            )}
            <hr className='border-slate-300' />
        </div>
    )
}

export default Accordian