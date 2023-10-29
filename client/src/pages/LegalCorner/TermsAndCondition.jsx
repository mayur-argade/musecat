import React from 'react'
import Navbar from '../../components/shared/Navbar/Navbar'
import Footer from '../../components/shared/Footer/Footer'
import { useNavigate } from 'react-router-dom'

const TermsAndCondition = () => {

    const navigate = useNavigate()
    return (
        <div>
            <Navbar />
            <section className='md:mr-48 md:ml-48 mt-5 ml-6 mr-6'>
                <div className='flex align-middle items-center  justify-between'>
                    <div className="flex align-middle items-center">
                        <button onClick={() => navigate(-1)} className=' mt-1'>
                            <img className='h-14 w-14' src="/images/icons/back-button.png" alt="" />
                        </button>
                        <p className='text-xl font-bold'>Termms And Conditions</p>
                    </div>
                    <button type="button" class="text-white bg-[#C0A04C] hover:bg-[#A48533] hover:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center mr-3 md:mr-0 dark:bg-[#C0A04C] dark:hover:bg-white dark:focus:ring-blue-800">Clear All</button>
                </div>
                <div className='w-full flex flex-col space-y-4'>
                    <div className='w-full bg-[#DDDDDD] h-auto p-2 rounded-lg'>
                        <p className='text-sm pl-2 pr-2 leading-6'>
                            Add Terms And Conditions here
                        </p>
                    </div>
                </div>
            </section>
            <div className=''>
                < Footer />
            </div>
        </div>
    )
}

export default TermsAndCondition