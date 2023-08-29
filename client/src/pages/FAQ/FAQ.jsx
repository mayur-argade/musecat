import React, { useState } from 'react'
import Navbar from '../../components/shared/Navbar/Navbar'
import Tabbar from '../../components/shared/Tabbar/Tabbar'
import Accordian from '../../components/Accordian/Accordian'
import Footer from '../../components/shared/Footer/Footer'

const FAQ = () => {
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
        <>
            <Navbar />
            <Tabbar />
            <section className='md:mr-48 md:ml-48 mt-5 ml-6 mr-6'>
                <div className="ml-3 hidden md:flex align-middle items-center">
                    <button className=' mt-1'>
                        <img className='h-14 w-14' src="/images/icons/back-button.png" alt="" />
                    </button>
                    <p className='text-2xl font-bold'>FAQs</p>
                </div>

                <div>
                    {accordions.map((accordion, index) => (
                        <Accordian
                            color={'bg-[#DDDDDD] pt-2 px-2 rounded-md'}
                            className='mx-auto'
                            textcol={'font-normal'}
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
                        <button type="button" class="w-44 md:w-96 text-white bg-[#C0A04C] hover:bg-[#A48533] focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center mr-3 md:mr-0 dark:bg-[#C0A04C] dark:hover:bg-white dark:focus:ring-blue-800">Chat with us</button>
                    </div>
                </div>
            </section>
            <div className=''>
                < Footer />
            </div>

        </>
    )
}

export default FAQ