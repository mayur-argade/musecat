import React from 'react'


const DebitCard = () => {
    return (
      <>
      <div class="h-52 w-80 md:w-96 md:h-56 bg-red-100 rounded-xl relative text-white shadow-2xl">
            
            <img class="relative object-cover w-full h-full rounded-xl" src="/images/assets/cardback.jpg" />
            
            <div class="w-full px-8 absolute top-8">
                <div class="flex justify-between">
                    <div class="">
                        <br />
                        <p class="font-medium tracking-widest">
                            Karthik P
                        </p>
                    </div>
                    
                </div>
                <div class="pt-1">
                    <p class="font-light">
                        Card Number
                    </p>
                    <p class="font-medium tracking-more-wider">
                        ****  ****  ****  7632
                    </p>
                </div>
                <div class="pt-6 pr-6">
                    <div class="flex justify-between">
                        <div class="">
                            <p class="font-light text-xs">
                                Valid
                            </p>
                            <p class="font-medium tracking-wider text-sm">
                                11/15
                            </p>
                        </div>
                        <div class="">
                            <p class="font-light text-xs text-xs">
                                Expiry
                            </p>
                            <p class="font-medium tracking-wider text-sm">
                                03/25
                            </p>
                        </div>

                        <div class="">
                            <p class="font-light text-xs">
                                CVV
                            </p>
                            <p class="font-bold tracking-more-wider text-sm">
                                ···
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