import React from 'react'

const EditorsPick = () => {
  return (
    <div>
        <section className='mr-32 ml-32 mt-10'>
    <div className='flex justify-between mt-10'>
        <div className="left"><span className='text-xl font-medium'>Editors Pick</span></div>
        <div className="right"></div>
        <div className="right"><span>view all</span></div>
    </div>

    <div>
        <div className='flex flex-wrap mt-3 justify-around '>
            <div className="mb-2 rounded-lg bg-center bg-no-repeat w-52 relative h-64 max-h-80 bg-[url('https://res.cloudinary.com/mayurs-media/image/upload/v1692692203/mwt/e3_tquumk.jpg')]  bg-gray-400 bg-blend-multiply">
                <div className='absolute bottom-0 left-0 flex flex-col p-2'>
                    <span className='text-base text-white font-medium'>Around Musecat</span>
                </div>
            </div>

            <div className="mb-2 rounded-lg bg-center bg-no-repeat w-52 relative h-64 max-h-80 bg-[url('https://res.cloudinary.com/mayurs-media/image/upload/v1692690811/1.1_pumpaw.png')]  bg-gray-400 bg-blend-multiply">
                <div className='absolute bottom-0 left-0 flex flex-col p-2'>
                    <span className='text-base text-white font-medium'>Food in Muscat</span>
                </div>
            </div>

            <div className="mb-2 rounded-lg bg-center bg-no-repeat w-52 relative h-64 max-h-80 bg-[url('https://res.cloudinary.com/mayurs-media/image/upload/v1692690810/1.2_n802iw.png')]  bg-gray-400 bg-blend-multiply">
                <div className='absolute bottom-0 left-0 flex flex-col p-2'>
                    <span className='text-base text-white font-medium'>Adventures</span>
                </div>
            </div>

            <div className="mb-2 rounded-lg bg-center bg-no-repeat w-52 relative h-64 max-h-80 bg-[url('https://res.cloudinary.com/mayurs-media/image/upload/v1692687464/bgHome_byrjjp.jpg')]  bg-gray-400 bg-blend-multiply">
                <div className='absolute bottom-0 left-0 flex flex-col p-2'>
                    <span className='text-base text-white font-medium'>Enjoyment</span>
                </div>
            </div>
        </div>

    </div>
</section></div>
  )
}

export default EditorsPick