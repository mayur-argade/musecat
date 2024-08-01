import React, { useState, useEffect } from "react";
import Navbar from "../../../components/shared/Navbar/Navbar";
import Footer from "../../../components/shared/Footer/Footer";
import { Link } from "react-router-dom";
// import "./aboutus.css";
import InstagramPost from "../../../components/Cards/InstagramPost";
import BlurFade from "../../../components/MagicUI/BlurFade";

const AboutUs = () => {
    document.title = "About Us";

    const [showSecondSection, setShowSecondSection] = useState(false);

    useEffect(() => {
        // Trigger the animation after a delay
        const timer = setTimeout(() => {
            setShowSecondSection(true);
        }, 1000); // Adjust the delay as needed

        return () => clearTimeout(timer); // Cleanup the timer on component unmount
    }, []);

    return (
        <>
            <div className="dark:bg-[#2c2c2c] dark:text-white min-h-screen flex flex-col">
                <Navbar />
                <section className="bg-[#FFF8E4] h-screen m-2 md:m-9 rounded-2xl flex flex-col items-center justify-center">
                    <section
                        className={`text-section transition-all duration-1000 ease-in-out ${
                            showSecondSection
                                ? "translate-y-[-15rem] md:translate-y-[-10rem] translate-y-0 opacity-1"
                                : "opacity-100 translate-y-0"
                        }`}
                    >
                        <h1 className="px-7 md:p-0 font-inter text-4xl md:text-5xl font-bold leading-tight text-center pt-14 text-wrap">
                            Revolutionizing Your Muscat Experience{" "}
                            <br className="" /> with Muscat Where To
                        </h1>
                        <p className="md:my-5 flex justify-center text-center text-lg md:text-xl w-9/12 mx-auto text-[#5E5D6D] leading-7">
                            Muscat Where To is a platform to discover the latest
                            offers and events in Muscat. Browse through offers,
                            find more info and directions. Find Muscat’s offers
                            and events by type and filters like Eat & Drink,
                            Kids Corner, Health and Beauty, Getaway Deals, Gym
                            Memberships, Activities & Adventure and much more.
                        </p>
                        <div className="flex justify-center items-center space-x-2">
                            <button className="glow-button bg-[#C0A04C] text-white w-44 h-11 px-4 py-2 rounded-lg hover:shadow-lg">
                                Sign in
                            </button>
                            <button className="bg-[#FFF4D6] text-[#C0A04C] w-44 h-11 px-4 py-2 gap-1.5 rounded-lg">
                                Contact us
                            </button>
                        </div>
                    </section>
                </section>

                <section
                    className={`video-section image-section flex justify-center transition-transform duration-1000 ease-in-out ${
                        showSecondSection
                            ? "opacity-100 -translate-y-96 md:-translate-y-96"
                            : "opacity-1 translate-y-0"
                    }`}
                >
                    <img
                        className="border border-8 border-white mt-10 mx-auto w-full md:w-9/12 aspect-video rounded-2xl"
                        src="https://images.unsplash.com/photo-1621680696874-edd80ce57b72?q=80&w=1591&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                        alt=""
                    />
                </section>
            </div>

            <section className="">
                <InstagramPost />
            </section>
                
            
            <Footer />
        </>
    );
};

export default AboutUs;
