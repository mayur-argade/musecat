import React, { useState, useEffect, useRef, memo } from 'react'
import { Link } from 'react-router-dom'
import { GetAllCategory } from '../../../../http/index';

const WhereTo = () => {

    const [showAll, setShowAll] = useState(false);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        const fetchCategories = async () => {
            setLoading(true);
            try {
                const res = await GetAllCategory();
                setCategories(res.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching categories:', error);
                setLoading(false);
            }
        };

        fetchCategories();

    }, []);

    let visibleCategories = [];

    if (categories.data) {
        if (showAll) {
            visibleCategories = categories.data
        } else {
            visibleCategories = categories.data.slice(0, 6)
        }
    }


    return (
        <section className='flex justify-center items-center align-middle py-5'>
            <section className='w-full md:w-full sm:mx-5 md:mx-5 md:w-10/12 xl:w-9/12 2xl:w-7/12'>
                <div className='flex justify-between '>
                    <div className="left"><span className='ml-7 text-xl font-bold md:text-2xl md:font-[700]'>Where To ?</span></div>
                    <div className="right"></div>
                </div>

                <div className='mx-5 grid grid-cols-2 md:grid-cols-3 gap-3 p-3'>
                    {/* Link 1 */}
                    {
                        !loading && visibleCategories && visibleCategories.map(category => (
                            <>
                                <div className='h-40 md:h-60 grid md:grid-cols-1 grid-rows-2 gap-3'>
                                    <Link to={`/category/${category.categoryURL}`}>
                                        <div className='relative'>
                                            <img className='rounded-md h-40 md:h-60 w-full bg-gray-400 bg-blend-multiply hover:bg-grey-500 grayscale-10' src={category.photo} alt='' />
                                            <div className="rounded absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black opacity-50 group-hover:opacity-0 rounded-lg"></div>
                                            <span className='absolute bottom-0 left-0 text-white p-2 font-bold'>{category.name}</span>
                                        </div>
                                    </Link>
                                </div>
                            </>
                        ))
                    }

                </div>


                <div className='flex justify-end space-x-2 '>
                    {
                        showAll ?
                            <div className=''>
                                <Link className='w-30 dark:hover:bg-gray-500 hover:bg-slate-100 rounded-md py-2 px-3 flex justify-center align-middle items-center' onClick={() => setShowAll(false)}>
                                    <p className='font-medium underline underline-offset-1  pr-2 text-sm font-medium '>View less</p>
                                </Link>
                            </div>
                            :
                            <div className=''>
                                <Link className='w-30 dark:hover:bg-gray-500 hover:bg-slate-100 rounded-md py-2 px-3 flex justify-center align-middle items-center' onClick={() => setShowAll(true)}>
                                    <p className='font-medium underline underline-offset-1  pr-2 text-sm font-medium '>View more</p>
                                </Link>
                            </div>
                    }
                </div>
            </section>
        </section>
    )
}

export default memo(WhereTo)