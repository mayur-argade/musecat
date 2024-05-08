import React from 'react'

const Tooltip = ({ data }) => {
    return (
        <div class="ml-3 relative flex flex-col items-center group cursor-pointer">
            <svg class="w-5 h-5 text-gray-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clip-rule="evenodd" />
            </svg>
            <div class="w-60 absolute bottom-0 flex flex-col items-center hidden mb-6 group-hover:flex">
                <span class="relative z-10 p-2 text-xs leading-none text-white whitespace-no-wrap bg-gray-500 shadow-lg">{data}</span>
                <div class="w-3 h-3 -mt-2 rotate-45 bg-gray-500"></div>
            </div>
        </div>
    )
}

export default Tooltip