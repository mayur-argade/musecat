import React from 'react'

const CategoryCard = ({ data }) => {
    return (
        <div className="relative">
        <img
          className="grayscale-10 rounded-lg object-cover w-44 h-64 md:w-56 md:h-72 snap-start"
          src={data.photo}
          alt=""
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black opacity-50 group-hover:opacity-0 rounded-lg"></div>
        <div className="absolute bottom-2 left-1 p-1 pl-2 pr-2">
          <p className="text-lg text-white font-medium">{data.categoryName}</p>
          <p className="w-28 bg-white text-black rounded-md text-sm py-1 pl-1 pr-1 font-semibold text-center">
            {data.validOfferCount} Events
          </p>
        </div>
      </div>
      
    )
}

export default CategoryCard