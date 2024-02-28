import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';


const ScrollToTop = () => {

    const navigate = useNavigate()
    const [visible, setVisible] = useState(false)

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 80) {
                // Show the button when the user scrolls down 100 pixels
                setVisible(true);
            } else {
                // Hide the button when the user scrolls up
                setVisible(false);
            }
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <div className='fixed hidden lg:flex justify-center flex-col right-5 bottom-10'>
            <div className='flex justify-center mb-2'>
                {
                    visible && (
                        <button onClick={() => window.scrollTo({
                            top: 0,
                            behavior: 'smooth', // You can use 'auto' for instant scrolling
                        })} className='rounded-full p-2 hover:bg-[#A48533] bg-[#C0A04C]'>
                            <img className='h-6 ' src="/images/icons/uparrow.svg" alt="" />
                        </button>
                    )
                }

                <button>
                </button>
            </div>
            <button onClick={() => navigate('/user/helpcenter')} className='rounded-full hover:bg-[#A48533] bg-[#C0A04C] py-3 pr-6 pl-6 text-white font-semibold'>Need Help?</button>
        </div>
    )
}

export default ScrollToTop