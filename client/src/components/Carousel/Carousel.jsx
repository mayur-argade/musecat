import React from 'react'
import EventCard from '../Cards/EventCard';
const Carousel = () => {

    const scrollLeft = () => {
        document.getElementById("content").scrollLeft -= 400;
    }
    const scrollRight = () => {
        document.getElementById("content").scrollLeft += 400;
    }

    return (
        <div>
            <div className="block md:hidden relative">
                <div id="content" className="carousel p-4 flex items-center justify-start overflow-x-auto scroll-smooth  scrollbar-hide">
                    <div>
                        <EventCard />
                    </div>
                    <div>
                        <EventCard />
                    </div>
                    <div>
                        <EventCard />
                    </div>
                    <div>
                        <EventCard />
                    </div>
                    <div>
                        <EventCard />
                    </div>
                    <div>
                        <EventCard />
                    </div>
                    <div>
                        <EventCard />
                    </div>
                    <div>
                        <EventCard />
                    </div>
                    <div>
                        <EventCard />
                    </div>
                    <div>
                        <EventCard />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Carousel