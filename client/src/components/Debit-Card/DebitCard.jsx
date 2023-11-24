import React from 'react'


const DebitCard = ({ data , index}) => {

    return (
        <>
            <div class="h-52 w-80 md:w-80 md:h-52 bg-red-100 rounded-xl relative text-white shadow-2xl">

                <img class="relative object-cover w-full h-full rounded-xl" src={`/images/assets/cardback${index}.png`} />

                <div class="w-full px-8 absolute top-20">
                    <div class="pt-1">
                        <p class="text-xl font-medium tracking-more-wider">
                            {data.masked_card}
                        </p>
                    </div>
                    <div class="pt-6 pr-6">
                        <div class="flex justify-between">
                            <div class="">
                                <p class="font-light text-xs">
                                    Card Nick Name
                                </p>
                                <p class="font-medium tracking-wider text-sm">
                                    {data.nickname}
                                </p>
                            </div>
                            <div class="">
                                <p class="font-light text-xs text-xs">
                                    Expiry
                                </p>
                                <p class="font-medium tracking-wider text-sm">
                                    {data.expiry_month}/{data.expiry_year}
                                </p>
                            </div>

                        </div>
                    </div>

                </div>
            </div>
        </>
    )
}

export default DebitCard