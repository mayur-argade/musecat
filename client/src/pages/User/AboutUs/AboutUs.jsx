import React, { useState, useEffect } from "react";
import Navbar from "../../../components/shared/Navbar/Navbar";
import Footer from "../../../components/shared/Footer/Footer";
import { Link, useNavigate } from "react-router-dom";
// import "./aboutus.css";
import InstagramPost from "../../../components/Cards/InstagramPost";
import BlurFade from "../../../components/MagicUI/BlurFade";
import ShimmerButton from "../../../components/MagicUI/ShimmerButton";

const AboutUs = () => {
    document.title = "About Us";

    const navigate = useNavigate()

    const [showSecondSection, setShowSecondSection] = useState(false);
    const [readMore, setReadMore] = useState(false)

    useEffect(() => {
        // Trigger the animation after a delay
        const timer = setTimeout(() => {
            setShowSecondSection(true);
        }, 500); // Adjust the delay as needed

        return () => clearTimeout(timer); // Cleanup the timer on component unmount
    }, []);

    return (
        <div className="dark:bg-[#2c2c2c]">
            <div className="dark:bg-[#2c2c2c] dark:text-white  flex flex-col">
                <Navbar />
                <header className="pt-10 bg-[#FFF8E4] h-auto m-2 md:mx-9 rounded-2xl flex flex-col items-center justify-center">
                    {
                        readMore
                            ?
                            <div className="md:h-10"></div>
                            :
                            <div className="md:h-24"></div>
                    }
                    <div></div>
                    <section
                        className={`flex flex-col align-middle items-center  bottom-0 transition ease-in-out delay-0 duration-500 ${showSecondSection ? 'translate-y-0 opacity-1' : 'translate-y-7 opacity-0'
                            }`}
                    >
                        <h1 className={`font-garamond drop-shadow-xl px-7 md:p-0 font-inter text-4xl md:text-4xl font-bold leading-tight text-center pt-14 text-wrap dark:text-black`}>
                            Revolutionizing Your Muscat Experience{" "}
                            <br className="" /> with Muscat Where To
                        </h1>
                        <p className="mt-4 text-center text-lg md:text-xl w-9/12 mx-auto text-[#5E5D6D] leading-8">
                            Welcome to Muscat Where To - your ultimate source for the latest events, offers, and deals in the vibrant city of Muscat, Oman. We are a dynamic team dedicated to curating and showcasing the best dining experiences, pool offers, hotel deals, and more in Muscat.
                            <span
                                className={`text-lg  ml-1 cursor-pointer text-[#A48533] font-semibold ${readMore ? 'hidden' : 'inline'}`}
                                onClick={() => setReadMore(true)}
                            >
                                ...Read More
                            </span>
                        </p>

                        {!readMore && (
                            <div className="mt-4 flex justify-center items-center space-x-2">
                                <button onClick={() => navigate('/login')} className="glow-button bg-[#C0A04C] text-white w-44 h-11 px-4 py-2 rounded-lg hover:shadow-lg">
                                    Sign in
                                </button>
                                <button onClick={() => navigate('/contactus')} className="bg-[#FFF4D6] text-[#C0A04C] w-44 h-11 px-4 py-2 gap-1.5 rounded-lg">
                                    Contact us
                                </button>
                            </div>
                        )}

                        <p className={`md:visible mt-4 transition-all delay-100 duration-500 transform ${readMore ? 'translate-y-0 opacity-100' : 'translate-y-7 opacity-0 hidden md:flex '} flex justify-center text-center text-lg md:text-xl w-9/12 mx-auto text-[#5E5D6D] leading-8`}>
                            Our mission is to keep you informed and updated on the most exciting opportunities to dine, relax, and indulge in the city. Whether you're looking for a special dining promotion, a relaxing pool day, or a fantastic hotel package, Muscat Where To is your go-to resource.
                            <br /><br />
                            Join us as we bring you the hottest deals, the trendiest events, and the most exclusive offers that Muscat has to offer. Let us be your guide to all things culinary, leisure, social, adventure and hospitality in Muscat.
                        </p>

                        {readMore && (
                            <div className="pb-5 mt-4 md:mt-4 flex justify-center items-center space-x-2">
                                <button onClick={() => navigate('/login')} className="glow-button bg-[#C0A04C] text-white w-44 h-11 px-4 py-2 rounded-lg hover:shadow-lg">
                                    Sign in
                                </button>
                                <button onClick={() => navigate('/contactus')} className="bg-[#FFF4D6] text-[#C0A04C] w-44 h-11 px-4 py-2 gap-1.5 rounded-lg">
                                    Contact us
                                </button>
                            </div>
                        )}
                        {
                            readMore
                                ?
                                <div className="h-10"></div>
                                :
                                <div className="h-10 md:h-20"></div>
                        }
                    </section>
                </header>
            </div>

            <div className="h-full ">

            </div>
            <section className="h-full ">
                <InstagramPost />
            </section>

            <Footer />

        </div>
    );
};

export default AboutUs;
