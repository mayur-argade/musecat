import React from 'react'

const TrendingCard = () => {
    return (
        <>
            <div className=" my-3 flex w-80 md:w-72 space-x-2 justify-between items-center align-middle bg-white hover:bg-[#C0A04C] hover:text-white cursor-pointer">
                <div className="image">
                    <img className='ml-0  p-1.5 h-30 w-28 rounded-xl' src="/images/assets/whereto1.png" alt="" />
                </div>
                <div className="text-left">
                    <div className="text-xs font-medium">WEMA Weekend at The Vault,</div>
                    <p className='text-xs font-medium'>Radisson Call</p>
                    <div className="text-xss font-light">Be the first to review</div>
                    <div className="text-xss font-light">Hormuz Grand Muscat, Radisson...</div>
                </div>
            </div>
        </>
    )
}

export default TrendingCard