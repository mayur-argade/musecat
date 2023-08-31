import React from 'react'

const PastPurchaseCard = ({ status }) => {
    return (
        <>
            <div class="relative md:m-3 h-auto w-44 md:w-44 lg:w-72 bg-[#F3F3F3] border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">

                <button class="absolute top-2 right-2 pt-2 pb-2 bg-white rounded-md w-24 h-5 flex items-center justify-center align-middle text-white">
                    <p className={`text-sm font-semibold ${status == 'Expired' || status == 'Archived' ? 'text-red-500' : 'text-green-500'}`}>{status}</p>
                </button>

                <a href="#">
                    <img class="h-70 w-full rounded-t-lg" src="/images/assets/eventdescription.png" alt="" />
                </a>
                <div class="p-1 pt-4 pb-2 mx-1">
                    <div class="">
                        <p class="title text-sm md:text-md font-bold text-left">
                            Breakfast and Pool Pass at Crowne Plaza OCEC
                        </p>
                    </div>
                    <div>
                        <p class="text-xss font-light md:font-normal">
                            Turn your breakfast into a day out by the pool at Crowne Plaza OCEC
                        </p>
                    </div>
                </div>
            </div>

        
        </>
    )
}

export default PastPurchaseCard