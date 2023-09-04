import React from 'react'

const EventCard = () => {
    return (
        <>
            <div >
                <div className="relative rounded-md mt-10 mb-2 w-52 h-80 mx-3 max-h-96 bg-[#F3F3F3] top-0">

                    <div className='absolute bottom-0 left-0 flex flex-col '>
                        <img className="relative" src="/images/assets/2.png" alt="" />
                        <button className="absolute top-2 right-2 bg-white text-black rounded-full z-20 p-2">
                            <img src="/images/icons/heart.svg" alt="" />
                        </button>
                        <div className='flex flex-col p-2'>
                        <p className='text-xs mt-2 font-medium'>Tue, 7 June 2023</p>
                            <p className='text-xs mt-2 font-medium'>WEMA Weekend at The Vault,</p>
                            <p className='text-xs mt-2 font-medium'> Radisson Call</p>
                            <p className="mt-1 mb-1 text-xs font-light">Events</p>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}

export default EventCard