import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { GetAllCategory } from '../../../http/index';
import SubTabbar from './SubTabbar';

const Tabbar = () => {

    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(false);
    const [subTabbarCategory, setSubTabbarCategory] = useState(null)
    const [showMoreCategories, setShowMoreCategories] = useState(false)

    const handleCategoryChange = (category) => {
        console.log(category)
        setSubTabbarCategory(category ? category : null)
    }
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

    return (
        <section className='shadow-lg'>
            <nav className={`hidden md:flex flex-wrap justify-center py-1 space-x-6`}>
                {loading ? (
                    <div className="animate-pulse flex justify-center items-center w-full space-x-6">
                        <div class="h-4 w-28 bg-slate-200 rounded "></div>
                        <div class="h-4 w-28 bg-slate-200 rounded "></div>
                        <div class="h-4 w-28 bg-slate-200 rounded "></div>
                        <div class="h-4 w-28 bg-slate-200 rounded "></div>
                        <div class="h-4 w-28 bg-slate-200 rounded "></div>
                        <div class="h-4 w-28 bg-slate-200 rounded "></div>
                        <div class="h-4 w-28 bg-slate-200 rounded "></div>
                        {/* <div class="h-4 w-32 bg-slate-200 rounded "></div> */}
                    </div>
                ) : (
                    <>
                        {categories.data && categories.data.slice(0, 7).map((category, index) => (
                            <>
                                <CategoryLink key={index} category={category} handleCategoryChange={handleCategoryChange} />
                            </>
                        ))}
                        <div className='relative z-30'>
                            {
                                categories.data && categories.data.length > 7 && (
                                    <div onMouseEnter={() => setShowMoreCategories(true)} onMouseLeave={() => setShowMoreCategories(false)} onClick={() => setShowMoreCategories(!showMoreCategories)} className='mt-1 relative flex align-middle items-center hover:font-bold'>
                                        <span className={`ml-0 text-base bg-left-bottom bg-gradient-to-r from-[#C0A04C] to-[#A48533] bg-[length:0%_2px] bg-no-repeat group-hover:bg-[length:100%_2px] transition-all duration-500 ease-out cursor-pointer `}>More</span>
                                        <img className="cursor-pointer dark:hidden flex h-5 mt-0.5" src="/images/icons/add.svg" alt="Add Icon" />
                                        <img className="cursor-pointer dark:flex hidden h-2 ml-2" src="/images/icons/minus-light.svg" alt="Minus Icon" />
                                    </div>
                                )
                            }
                            {
                                categories.data && categories.data.length > 7 && showMoreCategories && (
                                    <div onMouseEnter={() => setShowMoreCategories(true)} onMouseLeave={() => setShowMoreCategories(false)} className='h-auto w-40 p-3 absolute right-0 bg-white dark:bg-[#454545] drop-shadow-md rounded'>
                                        {categories.data.slice(7).map((category, index) => (
                                            <>
                                                {
                                                    category.name !== 'Ladies Night' && (
                                                        <div className='flex hover:bg-slate-50 dark:hover:bg-slate-500 flex-col py-1' key={index}>
                                                            <CategoryLink category={category} handleCategoryChange={handleCategoryChange} />
                                                        </div>
                                                    )
                                                }
                                            </>
                                        ))}
                                    </div>
                                )
                            }
                        </div>
                    </>
                )}

            </nav>
            <nav className=''>

                <SubTabbar />


            </nav>

        </section>
    );
};

// Component for rendering category link or dropdown
const CategoryLink = ({ category, handleCategoryChange }) => {
    const navigate = useNavigate()
    const [showDropdown, setShowDropdown] = useState(false);
    const [showDays, setShowDays] = useState(false);
    const [showWeekDays, setShowWeekDays] = useState(false)
    const openDropdown = () => setShowDropdown(true)
    const closeDropdown = () => setShowDropdown(false)

    return (
        <div className="dark:bg-transparent" key={category.id}>

            {category.subCategories && category.subCategories.length > 0 ? (
                <>
                    <div
                        onClick={() => {
                            navigate(`/category/${category.categoryURL}`);
                            handleCategoryChange(category); // Call setCategory with the current category
                        }}
                        onMouseEnter={() => openDropdown()}
                        onMouseLeave={() => closeDropdown()}
                        className={`cursor-pointer hover:font-bold relative px-1 py-1 ml-0 text-base bg-left-bottom bg-gradient-to-r from-[#C0A04C] to-[#A48533] bg-[length:0%_2px] bg-no-repeat group-hover:bg-[length:100%_2px] transition-all duration-500 ease-out cursor-pointer ${window.location.pathname === `/category/${category.categoryURL}` ? 'font-bold' : 'font-normal'}`}
                    >
                        <span className='ml-0 cursor-pointer hover:font-bold'>
                            {category.name}
                        </span>
                    </div>

                    {showDropdown && (
                        <ul
                            onMouseEnter={() => openDropdown()}
                            onMouseLeave={() => closeDropdown()}
                            className="border border-transparent border-0 dark:border-0  z-50 dropdown absolute w-48 bg-white rounded-md drop-shadow-md dark:bg-[#454545] dark:text-white">
                            {category.subCategories.map((subcategory, index) => (
                                <div className='w-full py-1'>
                                    <li key={index}>

                                        <span
                                            onClick={() => navigate(`/category/${category.categoryURL}?subcategory=${subcategory.name}`)}
                                            onMouseEnter={() => {
                                                if (subcategory.name == 'Dinner') {
                                                    setShowDays(true)
                                                }
                                            }}
                                            onMouseLeave={() => setShowDays(false)}
                                            className={`hover:font-bold cursor-pointer ml-0 block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white text-base font-medium`} aria-current="page">
                                            {subcategory.name}
                                        </span>

                                        {subcategory.name === "Dinner" && showDays && (
                                            <ul

                                                onMouseEnter={() => {
                                                    setShowDays(true)
                                                }}
                                                className="border border-1 z-50 dropdown absolute w-48 py-2 bg-white rounded-md drop-shadow-md dark:bg-[#454545] dark:text-white"
                                                style={{ top: '40%', left: '100%' }}>
                                                {["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"].map((day, index) => (
                                                    <li
                                                        onClick={() => navigate(`/category/${category.categoryURL}?subcategory=${subcategory.name}&day=${day}`)
                                                        }
                                                        className='px-2 py-1 hover:bg-slate-100 dark:hover:bg-slate-500'
                                                        key={index}>
                                                        <a href="#" className={`block text-sm py-4 my-2  pl-3 pr-4 md:p-0 hover:font-bold md:dark:font-bold`} aria-current="page">{day} Dinner</a>
                                                    </li>
                                                ))}
                                            </ul>
                                        )}
                                    </li>
                                </div>
                            ))}
                        </ul>
                    )}
                </>
            ) : (
                <Link onClick={() => handleCategoryChange(category)} to={`/category/${category.categoryURL}`}>
                    <div className={`hover:font-bold ml-0 px-1 py-1 text-base duration-500 ease-out cursor-pointer ${window.location.pathname === `/category/${category.categoryURL}` ? 'font-bold' : 'font-normal'}`}>
                        <span className='ml-0'>{category.name}</span>
                    </div>
                </Link>
            )
            }
        </div >
    );
};

export default Tabbar;

