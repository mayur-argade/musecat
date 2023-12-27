import React from 'react'
import Navbar from '../../components/shared/Navbar/Navbar'
import Footer from '../../components/shared/Footer/Footer'
import { Link, useNavigate } from 'react-router-dom'

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
                    <div id="privacy-policy" className="mx-auto p-8">
                        <div id="intro">
                            <p className="mb-4 font-semibold">Last updated December 09, 2022</p>

                            <p className="mb-4">
                                This privacy notice for Integrated Business International ("Company," "we," "us," or "our"), describes how and why we might collect, store, use, and/or share ("process") your information when you use our services ("Services"), such as when you:
                                <ul>
                                    <li className='list-disc'>Visit our website at <a className='text-blue-500' href="https://muscatwhereto.com/">https://muscatwhereto.com/</a>, or any website of ours that links to this privacy notice</li>
                                    <li className='list-disc'>Download and use our mobile application (Muscat Where To), or any other application of ours that links to this privacy notice</li>
                                    <li className='list-disc'>Engage with us in other related ways, including any sales, marketing, or events</li>
                                    <br />
                                    <li>Questions or concerns? Reading this privacy notice will help you understand your privacy rights and choices. If you do not agree with our policies and practices, please do not use our Services. If you still have any questions or concerns, please contact us at <a href="mailto:info@muscatwhereto.com">info@muscatwhereto.com</a>.</li>
                                </ul>
                            </p>

                            <div id='Summary mt-6'>
                                <p className=''>
                                    <span className='mb-3 ml-0 font-semibold text-xl'>SUMMARY OF KEY POINTS</span>
                                    <br />
                                    <br />
                                    <span className='ml-0 font-semibold'>What personal information do we process?</span>
                                    When you visit, use, or navigate our Services, we may process personal information depending on how you interact with Muscat Where To and the Services, the choices you make, and the products and features you use. Click here to learn more.
                                    <br />
                                    <br />
                                    <span className='ml-0 font-semibold'>Do we process any sensitive personal information?</span>
                                    We do not process sensitive personal information.
                                    <br />
                                    <br />
                                    <span className='ml-0 font-semibold'>Do we receive any information from third parties?</span>
                                    We do not receive any information from third parties.
                                    <br />
                                    <br />
                                    <span className='ml-0 font-semibold'>How do we process your information?</span>
                                    We process your information to provide, improve, and administer our Services, communicate with you, for security and fraud prevention, and to comply with law. We may also process your information for other purposes with your consent. We process your information only when we have a valid legal reason to do so. Click here to learn more.
                                    <br />
                                    <br />
                                    <span className='ml-0 font-semibold'>In what situations and with which parties do we share personal information?</span>
                                    We may share information in specific situations and with specific third parties. Click here to learn more.
                                    <br />
                                    <br />
                                    <span className='ml-0 font-semibold'>How do we keep your information safe?</span>
                                    We have organizational and technical processes and procedures in place to protect your personal information. However, no electronic transmission over the internet or information storage technology can be guaranteed to be 100% secure, so we cannot promise or guarantee that hackers, cybercriminals, or other unauthorized third parties will not be able to defeat our security and improperly collect, access, steal, or modify your information. Click here to learn more.
                                    <br />
                                    <br />
                                    <span className='ml-0 font-semibold'>What are your rights?</span>
                                    Depending on where you are located geographically, the applicable privacy law may mean you have certain rights regarding your personal information. Click here to learn more.
                                    <br />
                                    <br />
                                    <span className='ml-0 font-semibold'>How do you exercise your rights?</span>
                                    The easiest way to exercise your rights is by filling out our data subject request form available here, or by contacting us. We will consider and act upon any request in accordance with applicable data protection laws.
                                    <br />
                                    <br />
                                    Want to learn more about what Integrated Business International does with any information we collect? Click here to review the notice in full.
                                </p>
                            </div>
                            <br />
                            <br />
                            <div id='tableofcontent mt-5'>

                                <span className='ml-0 text-xl font-semibold'> Table Of Contents </span>

                                <li className='list-none text-blue-500 mb-1'>
                                    <Link to='#'>
                                        1. WHAT INFORMATION DO WE COLLECT?
                                    </Link>
                                </li>

                                <li className='list-none text-blue-500 mb-1'>
                                    <Link to='#'>
                                        2. HOW DO WE PROCESS YOUR INFORMATION?
                                    </Link>
                                </li>

                                <li className='list-none text-blue-500 mb-1'>
                                    <Link to='#'>
                                        3. WHAT LEGAL BASES DO WE RELY ON TO PROCESS YOUR PERSONAL INFORMATION?
                                    </Link>
                                </li>

                                <li className='list-none text-blue-500 mb-1'>
                                    <Link to='#'>
                                        4. WHEN AND WITH WHOM DO WE SHARE YOUR PERSONAL INFORMATION?
                                    </Link>
                                </li>

                                <li className='list-none text-blue-500 mb-1'>
                                    <Link to='#'>
                                        5. WHAT IS OUR STANCE ON THIRD-PARTY WEBSITES?
                                    </Link>
                                </li>

                                <li className='list-none text-blue-500 mb-1'>
                                    <Link to='#'>
                                        6. DO WE USE COOKIES AND OTHER TRACKING TECHNOLOGIES?
                                    </Link>
                                </li>

                                <li className='list-none text-blue-500 mb-1'>
                                    <Link to='#'>
                                        7. HOW DO WE HANDLE YOUR SOCIAL LOGINS?
                                    </Link>
                                </li>

                                <li className='list-none text-blue-500 mb-1'>
                                    <Link to='#'>
                                        8. HOW LONG DO WE KEEP YOUR INFORMATION?
                                    </Link>
                                </li>

                                <li className='list-none text-blue-500 mb-1'>
                                    <Link to='#'>
                                        9. HOW DO WE KEEP YOUR INFORMATION SAFE?
                                    </Link>
                                </li>

                                <li className='list-none text-blue-500 mb-1'>
                                    <Link to='#'>
                                        10. WHAT ARE YOUR PRIVACY RIGHTS?
                                    </Link>
                                </li>

                                <li className='list-none text-blue-500 mb-1'>
                                    <Link to='#'>
                                        11. CONTROLS FOR DO-NOT-TRACK FEATURES
                                    </Link>
                                </li>

                                <li className='list-none text-blue-500 mb-1'>
                                    <Link to='#'>
                                        12. DO CALIFORNIA RESIDENTS HAVE SPECIFIC PRIVACY RIGHTS?
                                    </Link>
                                </li>

                                <li className='list-none text-blue-500 mb-1'>
                                    <Link to='#'>
                                        13. DO WE MAKE UPDATES TO THIS NOTICE?
                                    </Link>
                                </li>

                                <li className='list-none text-blue-500 mb-1'>
                                    <Link to='#'>
                                        14. HOW CAN YOU CONTACT US ABOUT THIS NOTICE?
                                    </Link>
                                </li>

                                <li className='list-none text-blue-500 mb-1'>
                                    <Link to='#'>
                                        15. HOW CAN YOU REVIEW, UPDATE, OR DELETE THE DATA WE COLLECT FROM YOU?
                                    </Link>
                                </li>

                            </div>

                            <div id='#1'>
                            <span className='ml-0 text-xl font-semibold'>1. WHAT INFORMATION DO WE COLLECT?</span>

                            </div>
                        </div>
                    </div>

                </div>
            </section>
            <div className=''>
                < Footer />
            </div>
        </div>
    )
}

export default PrivacyPolicy