import React from 'react'
import './module.ticket.css'
const Ticket = () => {
    return (
        <>
            <div class="container bg-white rounded-lg">
                <div class="item rounded-2xl">
                    <div class="item-left">
                        <div className='flex justify-between items-center align-middle '>
                        <img className='h-5' src="/images/logo/logo.png" alt="" />
                        <img className='h-10 mr-5' src="/images/assets/logoticket.png" alt="" />
                        </div>
                        <p class="font-bold text-md mt-5">breakfast and poolpass at crown plaza OCEC</p>

                        <div class="">
                            <p className='font-bold text-md mt-5'>Munnar munnar</p>
                            <p className='font-medium text-md mt-5'>munnar@gmail.com</p>
                            <div className='flex justify-between mt-10'>
                                <div className='flex flex-col'> 
                                <p className='font-light text-sm'>Class</p>
                                <p className='font-medium text-sm'>Platinum</p>
                                </div>
                                <div className='flex flex-col'> 
                                <p className='font-light text-sm'>No. of Seats</p>
                                <p className='font-medium text-sm'>5</p>
                                </div>
                                <div className='flex flex-col mr-5'> 
                                <p className='font-light text-sm'>Rows</p>
                                <p className='font-medium text-sm'>Platinum</p>
                                </div>
                            </div>
                        </div>
                        
                    
                        <span class="tickets">Tickets</span>
                    </div>
                    <div class="item-right">
                        <img className='h-60 mt-5' src="/images/assets/qrcode.png" alt="" />
                        <span class="up-border"></span>
                        <span class="down-border"></span>

                    </div>
                </div>

            </div>
        </>
    )
}

export default Ticket