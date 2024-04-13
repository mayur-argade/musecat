import React, { useState, useEffect } from 'react'
import Footer from '../../../components/shared/Footer/Footer'
import Navbar from '../../../components/shared/Navbar/Navbar'
import BottomNav from '../../../components/shared/BottomNav/BottomNav'
import PageTitle from '../../../utils/PageTitle'
import moment from 'moment'
import WhereTo from './Components/WhereTo'
import ScrollToTop from '../../../components/ScrollToTop/ScrollToTop'
import Vouchers from './Components/Vouchers'
import EditorsPick from './Components/EditorsPick'
import UpcomingEvents from './Components/UpcomingEvents'
import PopupBox from '../../../components/PopupBox/PopupBox'
import HeroSection from './Components/HeroSection'
import PopularCategory from './Components/PopularCategory'
import Tabbar from '../../../components/shared/Tabbar/Tabbar'
import { getPopupModal } from '../../../http'

const Home = () => {

    document.title = PageTitle.home

    const [selectedDate, setSelectedDate] = useState(null);
    const [popupData, setPopupData] = useState(null)

    // Define a callback function to receive the selected date
    const handleDateSelection = (date) => {
        setSelectedDate(date);
        // You can perform any actions with the selected date here
    };

    // Get the current date
    const nowdate = moment();

    const [isOpen, setIsOpen] = useState(false);


    useEffect(() => {

        const fetchData = async () => {
            try {
                const { data } = await getPopupModal('66197c40f100f8c507519012')
                setPopupData(data.data)
            } catch (error) {
                console.log(error)
            }
        }

        fetchData()

        const hasPopupBeenShown = localStorage.getItem('hasPopupBeenShown');
        const lastVisitTimestamp = localStorage.getItem('lastVisitTimestamp');
        const currentTime = new Date().getTime();
        const twoHoursInMillis = 2 * 60 * 60 * 1000; // 2 hours in milliseconds

        if (!hasPopupBeenShown || !lastVisitTimestamp) {
            // If the popup has not been shown before, or last visit timestamp is not available
            localStorage.setItem('hasPopupBeenShown', true);
            localStorage.setItem('lastVisitTimestamp', currentTime);
            setIsOpen(true);
        } else {
            const timeSinceLastVisit = currentTime - parseInt(lastVisitTimestamp, 10);
            if (timeSinceLastVisit >= twoHoursInMillis) {
                // If it has been more than 2 hours since last visit, show the popup again
                setIsOpen(true);
                localStorage.setItem('lastVisitTimestamp', currentTime);
            }
        }
    }, []);

    const handleClose = () => {
        setIsOpen(false);
    };

    return (
        <>
            <div className='dark:bg-[#2c2c2c] dark:text-white appmargine '>
                <Navbar />
                <Tabbar />

                <div>
                    <HeroSection />
                </div>

                {popupData != null && popupData.visible == true && isOpen && (
                    <div className='fixed z-50 inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75 p-3 '>
                        <div className='flex flex-col'>
                            <div className='flex justify-end'>
                                <span className='justify-end' onClick={handleClose}><img className='bg-white rounded-full h-7 cursor-pointer' src="/images/icons/cancel-icon-new.png" alt="" /></span>
                            </div>
                            <PopupBox data={popupData} />
                        </div>
                    </div>
                )}

                <div className="content">
                    <PopularCategory />

                    <UpcomingEvents />

                    <EditorsPick />

                    <Vouchers />

                    <WhereTo />

                    <ScrollToTop />
                </div>

            </div >


            <div className='dark:bg-[#2c2c2c] dark:text-white'>
                <Footer />
            </div>

            <div>
                <BottomNav />
            </div>
        </>
    )

}

export default Home