import React from 'react'

const CategorySkeleton = () => {
    return (
        <div className='dark:bg-[#2c2c2c]'>
            <div>
                <div role="status" class=" w-44 h-60 md:w-56 md:h-72 pt-0 border border-gray-200 rounded shadow animate-pulse dark:border-gray-700">
                    <div class="flex items-center justify-center h-full mb-4 bg-gray-300 rounded dark:bg-gray-700">
                        <img src="/images/logo/logo-main.png" class="h-16" />
                    </div>
                </div>

            </div>
        </div>
    )
}

export default CategorySkeleton