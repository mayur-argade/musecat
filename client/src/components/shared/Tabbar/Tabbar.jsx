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
            <nav className={`hidden md:flex flex-wrap justify-center py-3 space-x-6`}>
                {loading ? (
                    <div className="animate-pulse flex justify-center items-center w-full">

                    </div>
                ) : (
                    <>
                        {categories.data && categories.data.slice(0, 7).map((category, index) => (
                            <>
                                <CategoryLink key={index} category={category} handleCategoryChange={handleCategoryChange} />
                            </>
                        ))}
                    </>
                )}
                <div className='relative z-30'>
                    {
                        categories.data && categories.data.length > 7 && (
                            <div onClick={() => setShowMoreCategories(!showMoreCategories)} className='relative flex align-middle items-center'>
                                <span className={`p-[2px]  ml-0 text-sm bg-left-bottom bg-gradient-to-r from-[#C0A04C] to-[#A48533] bg-[length:0%_2px] bg-no-repeat group-hover:bg-[length:100%_2px] transition-all duration-500 ease-out cursor-pointer `}>More</span>
                                <img className="pointer-cursor dark:hidden flex h-5 mt-0.5" src="/images/icons/add.svg" alt="Add Icon" />
                                <img className="pointer-cursor dark:flex hidden h-2 ml-2" src="/images/icons/minus-light.svg" alt="Minus Icon" />
                            </div>
                        )
                    }
                    {
                        categories.data && categories.data.length > 7 && showMoreCategories && (
                            <div className='h-auto w-40 p-3  absolute right-0 bg-white dark:bg-[#2c2c2c] drop-shadow-md'>
                                {categories.data.slice(7).map((category, index) => (
                                    <div className='flex hover:bg-slate-50 flex-col px-2 py-1'>
                                        <CategoryLink key={index} category={category} handleCategoryChange={handleCategoryChange} />
                                    </div>

                                ))}
                            </div>
                        )
                    }
                </div>
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
        <div className="dark:bg-[#2c2c2c]" key={category.id}>

            {category.subCategories && category.subCategories.length > 0 ? (
                <>
                    <span
                        onClick={() => {
                            navigate(`/category/${category.categoryURL}`);
                            handleCategoryChange(category); // Call setCategory with the current category
                        }}
                        onMouseEnter={() => openDropdown()}
                        onMouseLeave={() => closeDropdown()}
                        className={`hover:font-bold relative p-2 ml-0 text-sm bg-left-bottom bg-gradient-to-r from-[#C0A04C] to-[#A48533] bg-[length:0%_2px] bg-no-repeat group-hover:bg-[length:100%_2px] transition-all duration-500 ease-out cursor-pointer ${window.location.pathname === `/category/${category.categoryURL}` ? 'font-bold' : 'font-normal'}`}
                    >
                        {category.name}
                    </span>

                    {showDropdown && (
                        <ul
                            onMouseEnter={() => openDropdown()}
                            onMouseLeave={() => closeDropdown()}
                            className="border border-1 z-50 dropdown absolute w-48 bg-white rounded-md drop-shadow-md dark:bg-[#454545] dark:text-white">
                            {category.subCategories.map((subcategory, index) => (
                                <div className='w-full px-2 py-1'>
                                    <li key={index}>

                                        <span
                                            onClick={() => navigate(`/category/${category.categoryURL}?subcategory=${subcategory.name}`)}
                                            onMouseEnter={() => {
                                                if (subcategory.name == 'Dinner') {
                                                    setShowDays(true)
                                                }
                                            }}
                                            onMouseLeave={() => setShowDays(false)}
                                            className={`ml-0 block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white text-sm`} aria-current="page">
                                            {subcategory.name}
                                        </span>

                                        {subcategory.name === "Dinner" && showDays && (
                                            <ul

                                                onMouseEnter={() => {
                                                    setShowDays(true)
                                                }}
                                                className="border border-1 z-50 dropdown absolute w-48 p-3 bg-white rounded-md drop-shadow-md dark:bg-[#454545] dark:text-white"
                                                style={{ top: '40%', left: '100%' }}>
                                                {["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"].map((day, index) => (
                                                    <li
                                                        onClick={() => navigate(`/category/${category.categoryURL}?subcategory=${subcategory.name}&day=${day}`)}
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
                    <span className={` hover:font-bold ml-0 text-sm bg-left-bottom bg-gradient-to-r from-[#C0A04C] to-[#A48533] bg-[length:0%_2px] bg-no-repeat group-hover:bg-[length:100%_2px] transition-all duration-500 ease-out cursor-pointer ${window.location.pathname === `/category/${category.categoryURL}` ? 'font-bold' : 'font-normal'}`}>{category.name}</span>
                </Link>
            )
            }
        </div >
    );
};

export default Tabbar;

