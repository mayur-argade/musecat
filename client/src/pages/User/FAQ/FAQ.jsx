import React, { useState } from 'react'
import Navbar from '../../../components/shared/Navbar/Navbar'
import Tabbar from '../../../components/shared/Tabbar/Tabbar'
import Accordian from '../../../components/Accordian/Accordian'
import Footer from '../../../components/shared/Footer/Footer'
import { useNavigate } from 'react-router-dom'

const FAQ = () => {

    document.title = 'FAQs'

    const navigate = useNavigate()

    const [accordions, setAccordions] = useState([
        {
            question: 'What is check-In and Check-Out time for any booked Event?',
            answer:
                "What is check-In and Check-Out time for any booked Event?",
            isOpened: false
        },
        {
            question: 'What are the free amenities?',
            answer:
                "What are the free amenities?",
            isOpened: false
        },
        {
            question: 'How do I find the ticket of my purchased Event?',
            answer:
                "How do I find the ticket of my purchased Event?",
            isOpened: false
        },
        {
            question: 'What are the free amenities?',
            answer:
                "What are the free amenities?",
            isOpened: false
        },
        {
            question: 'What is check-In and Check-Out time for any booked Event??',
            answer:
                "What is check-In and Check-Out time for any booked Event??",
            isOpened: false
        },
        {
            question: 'How do I find the ticket of my purchased Event?',
            answer:
                "How do I find the ticket of my purchased Event?",
            isOpened: false
        },
        {
            question: 'What is check-In and Check-Out time for any booked Event?',
            answer:
                "What is check-In and Check-Out time for any booked Event?",
            isOpened: false
        },
    ]);

    const handleAccordionClick = (index) => {
        const updatedAccordions = accordions.map((accordion, i) => ({
            ...accordion,
            isOpened: i === index ? !accordion.isOpened : false,
        }));
        setAccordions(updatedAccordions);
    };
    return (
        <div className='dark:bg-[#2c2c2c] dark:text-white'>
            <Navbar />
            <Tabbar />
            <section className='relative md:mr-52 md:ml-52 mt-5 ml-6 mr-6'>
                <div className="hidden md:flex align-middle items-center">
                    <button className=' mt-1'>
                        <img className='h-14 w-14' src="/images/icons/back-button.png" alt="" />
                    </button>
                    <p className='text-2xl font-bold'>FAQs</p>
                </div>

                <div>
                    {accordions.map((accordion, index) => (
                        <Accordian
                            color={'bg-[#DDDDDD] dark:bg-[#454545] dark:text-white py-2.5 px-4 rounded-md'}
                            className='mx-auto'
                            textcol={'font-normal text-sm'}
                            key={index}
                            title={accordion.question}
                            content={accordion.answer}
                            isOpened={accordion.isOpened}
                            onClick={() => handleAccordionClick(index)}
                        />
                    ))}
                </div>

                <div className='flex justify-center'>
                    <div className="booknow">
                        <button onClick={() => navigate('/user/helpcenter')} type="button" class="w-44 md:w-96 text-white bg-[#A48533] hover:bg-[#A48533] focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center mr-3 md:mr-0 dark:bg-[#C0A04C] dark:hover:bg-[#A48533] dark:focus:ring-0">Chat with us</button>
                    </div>
                </div>

                <div className='hidden md:flex justify-end flex-col absolute -right-44 bottom-0'>
                    <div className='flex justify-between mb-2'>
                        {/* <button className='rounded-full p-2 hover:bg-[#A48533] bg-[#C0A04C]'>
                            <img className='h-6 ' src="/images/icons/uparrow.svg" alt="" />
                        </button> */}
                        {/* <img className='h-10 ml-24' src="/images/icons/whatsapp-color.svg" alt="" /> */}
                        <button>
                        </button>
                    </div>
                    <button onClick={() => navigate('/user/helpcenter')} className='rounded-full hover:bg-[#A48533] bg-[#C0A04C] py-3 pr-6 pl-6 text-white font-semibold'>Need Help?</button>
                </div>
            </section>
            <div className='standalone:hidden'>
                < Footer />
            </div>

        </div>
    )
}

export default FAQ