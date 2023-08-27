import React from 'react'

const SubEventCard = () => {
    return (
        <>
            <div className="md:mr-10 my-3 flex w-80 md:w-72 p-3 border border-2 rounded-lg space-x-5 justify-between items-center align-middle hover:bg-[#C0A04C] hover:text-white cursor-pointer drop-shadow-2xl">
                <div className="image">
                    <img className='ml-0 pl-0 h-16 w-36' src="/images/assets/whereto1.png" alt="" />
                </div>
                <div className="text-left">
                    <div className="text-xs font-medium">WEMA Weekend at The Vault, Radisson Call</div>
                    <div className="text-xs">Be the first to review</div>
                    <div className="text-xs">Hormuz Grand Muscat, Radisson</div>
                </div>
            </div>
        </>
    )
}

export default SubEventCard