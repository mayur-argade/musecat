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
                                    <Link to='#1'>
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
                            <div className='mb-5'></div>
                            <div id='#1'>
                                <span className='ml-0 text-xl font-semibold'>1. WHAT INFORMATION DO WE COLLECT?</span>
                                <div>
                                    <br />
                                    <span className="ml-0 font-semibold">
                                        Personal information you disclose to us
                                    </span>
                                    <br />
                                    <br />
                                    <span className='ml-0 font-medium'>In Short:</span> We collect personal information that you provide to us.
                                    <br />
                                    <br />
                                    We collect personal information that you voluntarily provide to us when you register on the Services, express an interest in obtaining information about us or our products and Services, when you participate in activities on the Services, or otherwise when you contact us.
                                    <br />
                                    <br />
                                    <span className="ml-0 font-medium">Personal Information Provided by You.</span> The personal information that we collect depends on the context of your interactions with us and the Services, the choices you make, and the products and features you use. The personal information we collect may include the following:
                                    <ul>
                                        <li>names</li>
                                        <li>phone numbers</li>
                                        <li>email address</li>
                                        <li>username</li>
                                        <li>phone numbers</li>
                                        <li>debit/credit card numbers</li>
                                        <li>billing addresses</li>
                                    </ul>

                                    <br />
                                    <span className='ml-0 font-medium'>Sensitive Information.</span> We do not process sensitive information.
                                    <br />
                                    <br />
                                    Social Media Login Data. We may provide you with the option to register with us using your existing social media account details, like your Facebook, Twitter, or other social media account. If you choose to register in this way, we will collect the information described in the section called "HOW DO WE HANDLE YOUR SOCIAL LOGINS?" below.
                                    <br />
                                    <br />
                                    <span className='font-medium ml-0'>Application Data.</span> If you use our application(s), we also may collect the following information if you choose to provide us with access or permission:
                                    <ul className='mt-2'>
                                        <li className='list-disc mb-2'>
                                            Geolocation Information. We may request access or permission to track location-based information from your mobile device, either continuously or while you are using our mobile application(s), to provide certain location-based services. If you wish to change our access or permissions, you may do so in your device's settings.
                                        </li>
                                        <li className='list-disc mb-2'>
                                            Mobile Device Data. We automatically collect device information (such as your mobile device ID, model, and manufacturer), operating system, version information and system configuration information, device and application identification numbers, browser type and version, hardware model Internet service provider and/or mobile carrier, and Internet Protocol (IP) address (or proxy server). If you are using our application(s), we may also collect information about the phone network associated with your mobile device, your mobile device’s operating system or platform, the type of mobile device you use, your mobile device’s unique device ID, and information about the features of our application(s) you accessed.
                                        </li>
                                        <li className='list-disc mb-2'>
                                            Push Notifications. We may request to send you push notifications regarding your account or certain features of the application(s). If you wish to opt out from receiving these types of communications, you may turn them off in your device's settings.
                                        </li>
                                    </ul>
                                    This information is primarily needed to maintain the security and operation of our application(s), for troubleshooting, and for our internal analytics and reporting purposes.
                                    <br />
                                    <br />
                                    All personal information that you provide to us must be true, complete, and accurate, and you must notify us of any changes to such personal information.

                                    <br />
                                    <br />
                                    <span className="ml-0 font-semibold">
                                        Information automatically collected
                                    </span>
                                    <br /><br />
                                    <span className="ml-0 font-medium">In Short:</span> Some information — such as your Internet Protocol (IP) address and/or browser and device characteristics — is collected automatically when you visit our Services.
                                    <br /><br />
                                    We automatically collect certain information when you visit, use, or navigate the Services. This information does not reveal your specific identity (like your name or contact information) but may include device and usage information, such as your IP address, browser and device characteristics, operating system, language preferences, referring URLs, device name, country, location, information about how and when you use our Services, and other technical information. This information is primarily needed to maintain the security and operation of our Services, and for our internal analytics and reporting purposes.
                                    <br /><br />
                                    Like many businesses, we also collect information through cookies and similar technologies.
                                    <br /><br />
                                    The information we collect includes:
                                    <ul>
                                        <li className='list-disc mb-1'>
                                            Log and Usage Data. Log and usage data is service-related, diagnostic, usage, and performance information our servers automatically collect when you access or use our Services and which we record in log files. Depending on how you interact with us, this log data may include your IP address, device information, browser type, and settings and information about your activity in the Services (such as the date/time stamps associated with your usage, pages and files viewed, searches, and other actions you take such as which features you use), device event information (such as system activity, error reports (sometimes called "crash dumps"), and hardware settings).
                                        </li>
                                        <li className='list-disc mb-1'>
                                            Device Data. We collect device data such as information about your computer, phone, tablet, or other device you use to access the Services. Depending on the device used, this device data may include information such as your IP address (or proxy server), device and application identification numbers, location, browser type, hardware model, Internet service provider and/or mobile carrier, operating system, and system configuration information.
                                        </li>
                                        <li className='list-disc mb-1'>
                                            Location Data. We collect location data such as information about your device's location, which can be either precise or imprecise. How much information we collect depends on the type and settings of the device you use to access the Services. For example, we may use GPS and other technologies to collect geolocation data that tells us your current location (based on your IP address). You can opt out of allowing us to collect this information either by refusing access to the information or by disabling your Location setting on your device. However, if you choose to opt out, you may not be able to use certain aspects of the Services.
                                        </li>
                                    </ul>
                                </div>
                            </div>

                            <div className='mb-10'></div>
                            <div id='#2'>
                                <span className='ml-0 text-xl font-semibold'>2. HOW DO WE PROCESS YOUR INFORMATION?</span>
                                <div>
                                    <br />
                                    <span className='ml-0 font-medium'>In Short:</span> We process your information to provide, improve, and administer our Services, communicate with you, for security and fraud prevention, and to comply with law. We may also process your information for other purposes with your consent.
                                    <br />
                                    <br />

                                    <span className="ml-0 font-medium">We process your personal information for a variety of reasons, depending on how you interact with our Services, including:</span>
                                    <ul className='mt-2'>
                                        <li className='list-disc mb-2'>
                                            <span className="font-medium ml-0">To facilitate account creation and authentication and otherwise manage user accounts.</span> We may process your information so you can create and log in to your account, as well as keep your account in working order.
                                        </li>
                                        <li className='list-disc mb-2'>
                                            <span className='font-medium ml-0'>To send you marketing and promotional communications. </span>We may process the personal information you send to us for our marketing purposes, if this is in accordance with your marketing preferences. You can opt out of our marketing emails at any time. For more information, see "WHAT ARE YOUR PRIVACY RIGHTS?" below)
                                        </li>
                                        <li className='list-disc mb-2'>
                                            <span className="ml-0 font-medium">To deliver targeted advertising to you. </span>We may process your information to develop and display personalized content and advertising tailored to your interests, location, and more.
                                        </li>
                                        <li className='list-disc mb-2'>
                                            <span className="ml-0 font-medium">To determine the effectiveness of our marketing and promotional campaigns. </span>We may process your information to better understand how to provide marketing and promotional campaigns that are most relevant to you.
                                        </li>
                                        <li className='list-disc mb-2'>
                                            <span className="ml-0 font-medium">To save or protect an individual's vital interest. </span>We may process your information when necessary to save or protect an individual’s vital interest, such as to prevent harm.
                                        </li>
                                    </ul>
                                </div>
                            </div>

                            <div className='mb-10'></div>
                            <div id='#3'>
                                <span className='ml-0 text-xl font-semibold'>WHAT LEGAL BASES DO WE RELY ON TO PROCESS YOUR INFORMATION?</span>
                                <div>

                                    <br />
                                    <span className='ml-0 font-medium'>In Short:</span> We only process your personal information when we believe it is necessary and we have a valid legal reason (i.e., legal basis) to do so under applicable law, like with your consent, to comply with laws, to provide you with services to enter into or fulfill our contractual obligations, to protect your rights, or to fulfill our legitimate business interests.
                                    <br />
                                    <br />
                                    <span className='font-medium underline underline-offset-1'>If you are located in the EU or UK, this section applies to you.</span>
                                    <br />
                                    <br />
                                    The General Data Protection Regulation (GDPR) and UK GDPR require us to explain the valid legal bases we rely on in order to process your personal information. As such, we may rely on the following legal bases to process your personal information:
                                    <ul>
                                        <li className="list-disc">
                                            <span className="font-medium ml-0">Consent.</span> We may process your information if you have given us
                                            permission (i.e., consent) to use your personal information for a specific purpose. You can withdraw your
                                            consent at any time. Click here to learn more
                                        </li>
                                        <li className="list-disc">
                                            <span className="font-medium ml-0">Legitimate Interests.</span> We may process your information when we believe
                                            it is reasonably necessary to achieve our legitimate business interests and those interests do not outweigh your
                                            interests and fundamental rights and freedoms. For example, we may process your personal information for some
                                            of the purposes described in order to:
                                            <ul>
                                                <li className="ml-10 list-disc">Send users information about special offers and discounts on our products and services</li>
                                                <li className="ml-10 list-disc">Develop and display personalized and relevant advertising content for our users</li>
                                                <li className="ml-10 list-disc">Support our marketing activities</li>
                                                <li className="ml-10 list-disc">Understand how our users use our products and services so we can improve user experience</li>
                                            </ul>
                                        </li>
                                        <li className="list-disc">
                                            <span className="font-medium ml-0">Legal Obligations</span> We may process your information where we believe it is
                                            necessary for compliance with our legal obligations, such as to cooperate with a law enforcement body or
                                            regulatory agency, exercise or defend our legal rights, or disclose your information as evidence in litigation in
                                            which we are involved.
                                        </li>
                                        <li className="list-disc">
                                            <span className="font-medium ml-0">Vital Interests.</span> We may process your information where we believe it
                                            is necessary to protect your vital interests or the vital interests of a third party, such as situations
                                            involving potential threats to the safety of any person.
                                        </li>
                                    </ul>

                                    <br />
                                    <span className='ml-0 font-medium font-medium underline underline-offset-1'>If you are located in Canada, this section applies to you.</span>
                                    <br />
                                    <br />
                                    We may process your information if you have given us specific permission (i.e., express consent) to use your personal information for a specific purpose, or in situations where your permission can be inferred (i.e., implied consent). You can withdraw your consent at any time. Click here to learn more.
                                    <br />
                                    <br />'In some exceptional cases, we may be legally permitted under applicable law to process your information without your consent, including, for example:'
                                    <ul>
                                        <li className='list-disc mb-1'>
                                            If collection is clearly in the interests of an individual and consent cannot be obtained in a timely way
                                        </li>
                                        <li className='list-disc mb-1'>
                                            For investigations and fraud detection and prevention
                                        </li>
                                        <li className='list-disc mb-1'>
                                            For business transactions provided certain conditions are met
                                        </li>
                                        <li className='list-disc mb-1'>
                                            If it is contained in a witness statement and the collection is necessary to assess, process, or settle an insurance claim
                                        </li>
                                        <li className='list-disc mb-1'>
                                            For identifying injured, ill, or deceased persons and communicating with next of kin
                                        </li>
                                        <li className='list-disc mb-1'>
                                            If we have reasonable grounds to believe an individual has been, is, or may be victim of financial abuse
                                        </li>
                                        <li className='list-disc mb-1'>
                                            If it is reasonable to expect collection and use with consent would compromise the availability or the accuracy of the information and the collection is reasonable for purposes related to investigating a breach of an agreement or a contravention of the laws of Canada or a province
                                        </li>
                                        <li className='list-disc mb-1'>
                                            If disclosure is required to comply with a subpoena, warrant, court order, or rules of the court relating to the production of records
                                        </li>
                                        <li className='list-disc mb-1'>
                                            If it was produced by an individual in the course of their employment, business, or profession and the collection is consistent with the purposes for which the information was produced
                                        </li>
                                        <li className='list-disc mb-1'>
                                            If the collection is solely for journalistic, artistic, or literary purposes
                                        </li>
                                        <li className='list-disc mb-1'>
                                            If the information is publicly available and is specified by the regulations
                                        </li>
                                    </ul>
                                </div>
                            </div>

                            <div className='mb-10'></div>
                            <div id='#4'>
                                <span className='ml-0 text-xl font-semibold'>4. WHEN AND WITH WHOM DO WE SHARE YOUR PERSONAL INFORMATION?</span>
                                <div>
                                    <br />
                                    <span className='ml-0 font-medium'>In Short:</span>We may share information in specific situations described in this section and/or with the following third parties.
                                    <br />
                                    <br />

                                    We may need to share your personal information in the following situations:
                                    <ul className='mt-2'>
                                        <li className='list-disc mb-2'>
                                            <span className="font-medium ml-0">Business Transfers. </span>We may share or transfer your information in connection with, or during negotiations of, any merger, sale of company assets, financing, or acquisition of all or a portion of our business to another company.
                                        </li>
                                        <li className='list-disc mb-2'>
                                            <span className='font-medium ml-0'>When we use Google Maps Platform APIs.</span>We may share your information with certain Google Maps Platform APIs (e.g., Google Maps API, Places API). To find out more about Google’s Privacy Policy, please refer to this link. We use certain Google Maps Platform APIs to retrieve certain information when you make location-specific requests. This includes: Location; and other similar information. A full list of what we use information for can be found in this section and in the previous section titled "HOW DO WE PROCESS YOUR INFORMATION?". We obtain and store on your device ("cache") your location. You may revoke your consent anytime by contacting us at the contact details provided at the end of this document. The Google Maps Platform APIs that we use store and access cookies and other information on your devices. If you are a user currently in the European Economic Area (EU countries, Iceland, Liechtenstein, and Norway) or the United Kingdom, please take a look at our Cookie Notice.
                                        </li>
                                        <li className='list-disc mb-2'>
                                            <span className="ml-0 font-medium">TAffiliates. </span>We may share your information with our affiliates, in which case we will require those affiliates to honor this privacy notice. Affiliates include our parent company and any subsidiaries, joint venture partners, or other companies that we control or that are under common control with us.
                                        </li>
                                        <li className='list-disc mb-2'>
                                            <span className="ml-0 font-medium">Business Partners. </span>We may share your information with our business partners to offer you certain products, services, or promotions.
                                        </li>
                                    </ul>
                                </div>
                            </div>

                            <div className='mb-10'></div>
                            <div id='#5'>
                                <span className='ml-0 text-xl font-semibold'>5. WHAT IS OUR STANCE ON THIRD-PARTY WEBSITES?</span>
                                <div>
                                    <br />
                                    <span className='ml-0 font-medium'>In Short:</span>We are not responsible for the safety of any information that you share with third parties that we may link to or who advertise on our Services, but are not affiliated with, our Services.
                                    <br />
                                    <br />

                                    The Services may link to third-party websites, online services, or mobile applications and/or contain advertisements from third parties that are not affiliated with us and which may link to other websites, services, or applications. Accordingly, we do not make any guarantee regarding any such third parties, and we will not be liable for any loss or damage caused by the use of such third-party websites, services, or applications. The inclusion of a link towards a third-party website, service, or application does not imply an endorsement by us. We cannot guarantee the safety and privacy of data you provide to any third parties. Any data collected by third parties is not covered by this privacy notice. We are not responsible for the content or privacy and security practices and policies of any third parties, including other websites, services, or applications that may be linked to or from the Services. You should review the policies of such third parties and contact them directly to respond to your questions.
                                </div>
                            </div>

                            <div className='mb-10'></div>
                            <div id='#6'>
                                <span className='ml-0 text-xl font-semibold'>6. DO WE USE COOKIES AND OTHER TRACKING TECHNOLOGIES?</span>
                                <div>
                                    <br />
                                    <span className='ml-0 font-medium'>In Short:</span>We may use cookies and other tracking technologies to collect and store your information.
                                    <br />
                                    <br />

                                    We may use cookies and similar tracking technologies (like web beacons and pixels) to access or store information. Specific information about how we use such technologies and how you can refuse certain cookies is set out in our Cookie Notice.
                                </div>
                            </div>

                            <div className='mb-10'></div>
                            <div id='#7'>
                                <span className='ml-0 text-xl font-semibold'>7. HOW DO WE HANDLE YOUR SOCIAL LOGINS?</span>
                                <div>
                                    <br />
                                    <span className='ml-0 font-medium'>In Short:</span>If you choose to register or log in to our Services using a social media account, we may have access to certain information about you.
                                    <br />
                                    <br />

                                    Our Services offer you the ability to register and log in using your third-party social media account details (like your Facebook or Twitter logins). Where you choose to do this, we will receive certain profile information about you from your social media provider. The profile information we receive may vary depending on the social media provider concerned, but will often include your name, email address, friends list, and profile picture, as well as other information you choose to make public on such a social media platform.
                                    <br /><br />
                                    We will use the information we receive only for the purposes that are described in this privacy notice or that are otherwise made clear to you on the relevant Services. Please note that we do not control, and are not responsible for, other uses of your personal information by your third-party social media provider. We recommend that you review their privacy notice to understand how they collect, use, and share your personal information, and how you can set your privacy preferences on their sites and apps.
                                </div>
                            </div>

                            <div className='mb-10'></div>
                            <div id='#8'>
                                <span className='ml-0 text-xl font-semibold'>8. HOW LONG DO WE KEEP YOUR INFORMATION?</span>
                                <div>
                                    <br />
                                    <span className='ml-0 font-medium'>In Short:</span> We keep your information for as long as necessary to fulfill the purposes outlined in this privacy notice unless otherwise required by law.
                                    <br />
                                    <br />

                                    We will only keep your personal information for as long as it is necessary for the purposes set out in this privacy notice, unless a longer retention period is required or permitted by law (such as tax, accounting, or other legal requirements). No purpose in this notice will require us keeping your personal information for longer than the period of time in which users have an account with us.

                                    When we have no ongoing legitimate business need to process your personal information, we will either delete or anonymize such information, or, if this is not possible (for example, because your personal information has been stored in backup archives), then we will securely store your personal information and isolate it from any further processing until deletion is possible.
                                </div>
                            </div>

                            <div className='mb-10'></div>
                            <div id='#9'>
                                <span className='ml-0 text-xl font-semibold'>9. HOW DO WE KEEP YOUR INFORMATION SAFE?</span>
                                <div>
                                    <br />
                                    <span className='ml-0 font-medium'>In Short:</span> We aim to protect your personal information through a system of organizational and technical security measures.
                                    <br />
                                    <br />

                                    We have implemented appropriate and reasonable technical and organizational security measures designed to protect the security of any personal information we process. However, despite our safeguards and efforts to secure your information, no electronic transmission over the Internet or information storage technology can be guaranteed to be 100% secure, so we cannot promise or guarantee that hackers, cybercriminals, or other unauthorized third parties will not be able to defeat our security and improperly collect, access, steal, or modify your information. Although we will do our best to protect your personal information, transmission of personal information to and from our Services is at your own risk. You should only access the Services within a secure environment.
                                </div>
                            </div>

                            <div className='mb-10'></div>
                            <div id='#10'>
                                <span className='ml-0 text-xl font-semibold'>10. WHAT ARE YOUR PRIVACY RIGHTS?</span>
                                <div>
                                    <br />
                                    <span className='ml-0 font-medium'>In Short:</span> In some regions, such as the European Economic Area (EEA), United Kingdom (UK), and Canada, you have rights that allow you greater access to and control over your personal information. You may review, change, or terminate your account at any time.
                                    <br />
                                    <br />
                                    In some regions (like the EEA, UK, and Canada), you have certain rights under applicable data protection laws. These may include the right (i) to request access and obtain a copy of your personal information, (ii) to request rectification or erasure; (iii) to restrict the processing of your personal information; and (iv) if applicable, to data portability. In certain circumstances, you may also have the right to object to the processing of your personal information. You can make such a request by contacting us by using the contact details provided in the section "HOW CAN YOU CONTACT US ABOUT THIS NOTICE?" below.
                                    <br />
                                    <br />
                                    We will consider and act upon any request in accordance with applicable data protection laws.
                                    <br />
                                    <br />
                                    If you are located in the EEA or UK and you believe we are unlawfully processing your personal information, you also have the right to complain to your local data protection supervisory authority. You can find their contact details here: <Link className='text-blue-500' to="https://ec.europa.eu/justice/data-protection/bodies/authorities/index_en.htm.">https://ec.europa.eu/justice/data-protection/bodies/authorities/index_en.htm.</Link>
                                    <br />
                                    <br />
                                    If you are located in Switzerland, the contact details for the data protection authorities are available here: <Link className='text-blue-500' path="https://www.edoeb.admin.ch/edoeb/en/home.html.">https://www.edoeb.admin.ch/edoeb/en/home.html.</Link>
                                    <br />
                                    <br />
                                    <span className="ml-0 font-medium underline underline-offset-1">Withdrawing your consent:</span> If we are relying on your consent to process your personal information, which may be express and/or implied consent depending on the applicable law, you have the right to withdraw your consent at any time. You can withdraw your consent at any time by contacting us by using the contact details provided in the section "HOW CAN YOU CONTACT US ABOUT THIS NOTICE?" below or updating your preferences.
                                    <br />
                                    <br />
                                    However, please note that this will not affect the lawfulness of the processing before its withdrawal nor, when applicable law allows, will it affect the processing of your personal information conducted in reliance on lawful processing grounds other than consent.
                                    <br />
                                    <br />
                                    <span className="ml-0 font-medium underline underline-offset-1">Opting out of marketing and promotional communications:</span> You can unsubscribe from our marketing and promotional communications at any time by clicking on the unsubscribe link in the emails that we send, or by contacting us using the details provided in the section "HOW CAN YOU CONTACT US ABOUT THIS NOTICE?" below. You will then be removed from the marketing lists. However, we may still communicate with you — for example, to send you service-related messages that are necessary for the administration and use of your account, to respond to service requests, or for other non-marketing purposes.
                                    <br />
                                    <br />

                                    <span className="ml-0 font-bold text-md">Account Information</span>
                                    If you would at any time like to review or change the information in your account or terminate your account, you can:
                                    Log in to your account settings and update your user account.
                                    Upon your request to terminate your account, we will deactivate or delete your account and information from our active databases. However, we may retain some information in our files to prevent fraud, troubleshoot problems, assist with any investigations, enforce our legal terms and/or comply with applicable legal requirements.
                                    <br />
                                    <br />
                                    Cookies and similar technologies: Most Web browsers are set to accept cookies by default. If you prefer, you can usually choose to set your browser to remove cookies and to reject cookies. If you choose to remove cookies or reject cookies, this could affect certain features or services of our Services. To opt out of interest-based advertising by advertisers on our Services visit
                                    <Link className='text-blue-500' path="http://www.aboutads.info/choices/.">http://www.aboutads.info/choices/.</Link>
                                    <br />
                                    <br />
                                    If you have questions or comments about your privacy rights, you may email us at info@muscatwhereto.com.
                                </div>
                            </div>


                            <div className='mb-10'></div>
                            <div id='#11'>
                                <span className='ml-0 text-xl font-semibold'>11. CONTROLS FOR DO-NOT-TRACK FEATURES</span>
                                <div>
                                    Most web browsers and some mobile operating systems and mobile applications include a Do-Not-Track ("DNT") feature or setting you can activate to signal your privacy preference not to have data about your online browsing activities monitored and collected. At this stage no uniform technology standard for recognizing and implementing DNT signals has been finalized. As such, we do not currently respond to DNT browser signals or any other mechanism that automatically communicates your choice not to be tracked online. If a standard for online tracking is adopted that we must follow in the future, we will inform you about that practice in a revised version of this privacy notice.
                                </div>
                            </div>


                            <div className='mb-10'></div>
                            <div id='#12'>
                                <span className='ml-0 text-xl font-semibold'>12. DO CALIFORNIA RESIDENTS HAVE SPECIFIC PRIVACY RIGHTS?</span>
                                <div>
                                    <br />
                                    <span className='ml-0 font-medium'>In Short:</span> Yes, if you are a resident of California, you are granted specific rights regarding access to your personal information.

                                    <br />
                                    <br />

                                    California Civil Code Section 1798.83, also known as the "Shine The Light" law, permits our users who are California residents to request and obtain from us, once a year and free of charge, information about categories of personal information (if any) we disclosed to third parties for direct marketing purposes and the names and addresses of all third parties with which we shared personal information in the immediately preceding calendar year. If you are a California resident and would like to make such a request, please submit your request in writing to us using the contact information provided below.
                                    <br /><br />
                                    If you are under 18 years of age, reside in California, and have a registered account with Services, you have the right to request removal of unwanted data that you publicly post on the Services. To request removal of such data, please contact us using the contact information provided below and include the email address associated with your account and a statement that you reside in California. We will make sure the data is not publicly displayed on the Services, but please be aware that the data may not be completely or comprehensively removed from all our systems (e.g., backups, etc.).

                                </div>
                            </div>

                            <div className='mb-10'></div>
                            <div id='#13'>
                                <span className='ml-0 text-xl font-semibold'>13. DO WE MAKE UPDATES TO THIS NOTICE?</span>
                                <div>
                                    <br />
                                    <span className='ml-0 font-medium'>In Short:</span>Yes, we will update this notice as necessary to stay compliant with relevant laws.
                                    <br />
                                    <br />
                                    We may update this privacy notice from time to time. The updated version will be indicated by an updated "Revised" date and the updated version will be effective as soon as it is accessible. If we make material changes to this privacy notice, we may notify you either by prominently posting a notice of such changes or by directly sending you a notification. We encourage you to review this privacy notice frequently to be informed of how we are protecting your information.
                                </div>
                            </div>

                            <div className='mb-10'></div>
                            <div id='#14'>
                                <span className='ml-0 text-xl font-semibold'>14. HOW CAN YOU CONTACT US ABOUT THIS NOTICE?</span>
                                <div>
                                    If you have questions or comments about this notice, you may email us at info@muscatwhereto.com or by post to:
                                    <br />
                                    Integrated Business International
                                    <br />
                                    __________
                                    <br />
                                    Al Wadi Al Kabeer <br />
                                    Muttrah, Oman <br />
                                    Oman
                                </div>
                            </div>

                            <div className='mb-10'></div>
                            <div id='#15'>
                                <span className='ml-0 text-xl font-semibold'>15. HOW CAN YOU REVIEW, UPDATE, OR DELETE THE DATA WE COLLECT FROM YOU?</span>
                                <div>
                                    Based on the applicable laws of your country, you may have the right to request access to the personal information we collect from you, change that information, or delete it. To request to review, update, or delete your personal information, please submit a request form by clicking here.
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </section >
            <div className=''>
                < Footer />
            </div>
        </div >
    )
}

export default PrivacyPolicy