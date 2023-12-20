import React from 'react'
import Navbar from '../../components/shared/Navbar/Navbar'
import Footer from '../../components/shared/Footer/Footer'
import { useNavigate } from 'react-router-dom'

const PrivacyPolicy = () => {

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
                        <p className='text-xl font-bold'>Privacy Policy - MWT</p>
                    </div>
                    {/* <button type="button" class="text-white bg-[#C0A04C] hover:bg-[#A48533] hover:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center mr-3 md:mr-0 dark:bg-[#C0A04C] dark:hover:bg-white dark:focus:ring-blue-800">Clear All</button> */}
                </div>
                <div className='w-full mx-5'>
                    <p>
                        Welcome to Muscat Where To, your go-to platform for managing and discovering events and offers, where we facilitate
                        both users and vendors in sharing and accessing valuable information. This Privacy Policy outlines our commitment
                        to protecting your privacy and ensuring compliance with iOS and Google Play Store policies when you use our website
                        and mobile application.
                    </p>

                    <h2 className="text-xl font-bold mt-4 mb-2">Collection of Information</h2>
                    <p>
                        <strong>Personal Information:</strong> We collect personal information voluntarily provided by you, including but
                        not limited to your name, contact information, and payment details.
                    </p>
                    <p>
                        <strong>Non-Personal Information:</strong> Our servers automatically recognize visitors' domain names and IP
                        addresses. Additionally, we may collect non-personal information such as browser type, operating system, and
                        usage details.
                    </p>

                    <h2 className="text-xl font-bold mt-4 mb-2">Use of Information</h2>
                    <p>
                        The information we collect serves the following purposes:
                        <ul className="list-disc pl-8">
                            <li>To provide and maintain our services.</li>
                            <li>To process transactions between you and vendors.</li>
                            <li>To communicate with you regarding your account or transactions.</li>
                            <li>To improve our website and services.</li>
                        </ul>
                    </p>

                    {/* Add more sections for Sharing of Information, Vendor Content, Payments and Refunds, Data Security, and Changes to Privacy Policy */}

                    <h2 className="text-xl font-bold mt-4 mb-2">Contact Us</h2>
                    <p>If you have any questions about this policy, please contact us at support@muscatwhereto.com</p>

                    <p className="mt-8">Thank you for choosing Muscat Where To. We are committed to ensuring a safe and enjoyable experience for our users and vendors.</p>
                </div>
            </section>
            <div className=''>
                < Footer />
            </div>
        </div>
    )
}

export default PrivacyPolicy