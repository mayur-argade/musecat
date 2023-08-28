import React from 'react'

const EventCard = () => {
    return (
        <>
            <div class=" m-3 h-80 w-52 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                <a href="#">
                    <img class="h-48 rounded-t-lg" src="/images/assets/about.png" alt="" />
                </a>
                <div class="pt-4 ">
                    <div>
                        <span className='date text-xs font-light'>20/10/2023</span>
                    </div>
                    <div className='ml-4'>
                        <p className='title text-sm font-regular text-left'>
                            WEMA Weekend at The Vault, Radisson Call
                        </p>
                    </div>
                    <div>
                        <span className='text-xs font-extralight'>
                            Events
                        </span>
                    </div>
                </div>
            </div>
</>
    )
}

export default EventCard