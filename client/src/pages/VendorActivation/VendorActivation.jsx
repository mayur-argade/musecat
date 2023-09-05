import React from 'react'

const VendorActivation = () => {

    document.title = 'Vendor Activation'

    return (
        <>
            <section className=' mr-6 ml-6 mt-5 md:mt-10 md:ml-24 md:mr-24 h-screen'>
            <div className="title flex flex-row align-middle items-center space-x-2">
                <img className='h-4' src="/images/icons/vendor-backarrow.svg" alt="" />
                <p className='font-bold'>Account verification is pending</p>

            </div>
            <div className="flex flex-col justify-center items-center align-middle mt-10 ">
            <div className="image">
                <img className='max-h-96' src="/images/assets/vendoractivation.png" alt="" />
            </div>
            <div className="lines text-center">
                <p className='font-bold text-xl'>Please wait while your account is being verified</p>
                <p className='mt-3 text-gray-400 text-sm font-semibold'>You will receive an email once your account verification is <br className='hidden md:block'/>completed</p>
            </div>
            </div>
            </section>
        </>
    )
}

export default VendorActivation