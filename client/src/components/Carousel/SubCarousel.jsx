import React from 'react'
import SubEventCard from '../Cards/SubEventCard'

const SubCarousel = () => {
  return (
    <div>
    <div className="block md:hidden relative">
        <div id="content" className="carousel p-4 space-x-3 flex items-center justify-start overflow-x-auto scroll-smooth  scrollbar-hide">
            <div>
                <SubEventCard />
            </div>
            <div>
                <SubEventCard />
            </div>
            <div>
                <SubEventCard />
            </div>
            <div>
                <SubEventCard />
            </div>
            <div>
                <SubEventCard />
            </div>
            <div>
                <SubEventCard />
            </div>
            <div>
                <SubEventCard />
            </div>
            <div>
                <SubEventCard />
            </div>
            <div>
                <SubEventCard />
            </div>
            <div>
                <SubEventCard />
            </div>
        </div>
    </div>
</div>
  )
}

export default SubCarousel