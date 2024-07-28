import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { useRef } from 'react';
import TawkMessengerReact from '@tawk.to/tawk-messenger-react';

const ScrollToTop = () => {
    const isStandalone = window.matchMedia('(display-mode: standalone)').matches;
    const navigate = useNavigate()
    const [visible, setVisible] = useState(false)
    const tawkMessengerRef = useRef();
    const [showChat, setShowChat] = useState(false);

    const handleOpenChat = () => {
        // Set showChat state to true to render the chat widget
        setShowChat(true);
    };

    const handleMinimize = () => {
        tawkMessengerRef.current.minimize();
    };

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
        <div className='fixed hidden lg:flex justify-center flex-col right-9 bottom-20'>
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
            {
                !isStandalone || window.isNative == false && (
                    <div className="App">
                        <TawkMessengerReact
                            propertyId="6615b2a71ec1082f04e09988"
                            widgetId="1hr2c3o9e"
                            ref={tawkMessengerRef} />
                    </div>
                )
            }

        </div>
    )
}

export default ScrollToTop