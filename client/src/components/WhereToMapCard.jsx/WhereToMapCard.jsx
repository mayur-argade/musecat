import React from 'react'

const WhereToMapCard = () => {
    return (
        <>
            <div className="flex max-w-md p-3 border border-2 rounded-lg space-x-5 justify-between items-center align-middle hover:bg-[#C0A04C] hover:text-white cursor-pointer drop-shadow-2xl">
                <div className="image">
                    <img className='h-28 w-36' src="/images/assets/whereto1.png" alt="" />
                </div>
                <div className="text-left">
                    <div className="text-lg font-bold">WEMA Weekend at The Vault, Radisson Call</div>
                    <div className="text-sm">Be the first to review</div>
                    <div className="text-base">Hormuz Grand Muscat, Radisson</div>
                </div>
            </div>
        </>
    )
}

export default WhereToMapCard