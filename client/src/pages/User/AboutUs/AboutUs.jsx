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
        }, 500); // Adjust the delay as needed

        return () => clearTimeout(timer); // Cleanup the timer on component unmount
    }, []);

    return (
        <div className="dark:bg-[#2c2c2c]">
            <div className="dark:bg-[#2c2c2c] dark:text-white min-h-screen flex flex-col">
                <Navbar />
                <header className="relative bg-[#FFF8E4] min-h-screen m-2 md:mx-9 rounded-2xl flex flex-col items-center justify-center">
                    <section
                        className={`absolute text-section transition-all duration-1000 ease-in-out ${showSecondSection
                            ? "top-2 md:top-10 translate-y-0"
                            : "-top-14 translate-y-full"
                            }`}
                    >
                        <h1 className="font-garamond drop-shadow-xl px-7 md:p-0 font-inter text-4xl md:text-4xl font-bold leading-tight text-center pt-14 text-wrap dark:text-black">
                            Revolutionizing Your Muscat Experience{" "}
                            <br className="" /> with Muscat Where To
                        </h1>
                        <p className="md:my-5 flex justify-center text-center text-lg md:text-xl w-9/12 mx-auto text-[#5E5D6D] leading-8">
                            Welcome to Muscat Where To - your ultimate source for the latest events, offers, and deals in the vibrant city of Muscat, Oman. We are a dynamic team dedicated to curating and showcasing the best dining experiences, pool offers, hotel deals, and more in Muscat.
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
                    <section
                        className={`absolute video-section image-section flex justify-center transition-transform duration-1000 ease-in-out ${showSecondSection
                            ? "top-72 opacity-1 md:top-72 md:-translate-y-0"
                            : "top-0 opacity-0 translate-y-full"
                            }`}
                    >
                        <img
                            className="border border-8 border-white mt-10 mx-auto w-full md:w-8/12 aspect-video rounded-2xl"
                            src="https://images.unsplash.com/photo-1621680696874-edd80ce57b72?q=80&w=1591&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                            alt=""
                        />
                    </section>
                </header>
            </div>

            <div className="relative h-full pt-48">
                <article className="mt-4">
                    <h1 className="dark:text-white font-garamond drop-shadow-xl px-7 md:p-0 font-inter text-4xl md:text-4xl font-bold leading-tight text-center pt-14 text-wrap dark:text-black">
                        Muscat's Premier Event Hub: Discover, Book, Celebrate!
                    </h1>
                    <p className="md:my-5 flex justify-center text-center text-lg md:text-xl w-9/12 mx-auto text-[#5E5D6D] dark:text-slate-300 leading-8">
                        Our mission is to keep you informed and updated on the most exciting opportunities to dine, relax, and indulge in the city. Whether you're looking for a special dining promotion, a relaxing pool day, or a fantastic hotel package, Muscat Where To is your go-to resource.
                        Join us as we bring you the hottest deals, the trendiest events, and the most exclusive offers that Muscat has to offer. Let us be your guide to all things culinary, leisure, social, adventure and hospitality in Muscat.
                    </p>
                </article>



            </div>
            <section className="h-full pt-5">
                <InstagramPost />
            </section>

            <Footer />

        </div>
    );
};

export default AboutUs;
