import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { GetAllCategory } from '../../../http/index';

const Tabbar = () => {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(false);

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
        <section className=''>
            <nav className='shadow-lg hidden md:flex flex-wrap justify-center py-3 space-x-6 overflow-auto'>
                {loading ? (
                    <div className="animate-pulse flex justify-center items-center w-full">
                        {/* Placeholder for loading animation */}
                    </div>
                ) : (
                    <>
                        {categories.data && categories.data.map((category, index) => (
                            <CategoryLink key={index} category={category} />
                        ))}
                    </>
                )}
            </nav>
        </section>
    );
};

// Component for rendering category link or dropdown
const CategoryLink = ({ category }) => {
    const navigate = useNavigate()
    const [showDropdown, setShowDropdown] = useState(false);
    const [showDays, setShowDays] = useState(false);

    const openDropdown = () => setShowDropdown(true)
    const closeDropdown = () => setShowDropdown(false)

    return (
        <div className="" key={category.id}>

            {category.subCategories && category.subCategories.length > 0 ? (
                <>
                    <span
                        onClick={() => navigate(`/category/${category.categoryURL}`)}
                        onMouseEnter={() => openDropdown()}
                        onMouseLeave={() => closeDropdown()}
                        className={`relative p-2 ml-0 text-sm bg-left-bottom bg-gradient-to-r from-[#C0A04C] to-[#A48533] bg-[length:0%_2px] bg-no-repeat group-hover:bg-[length:100%_2px] transition-all duration-500 ease-out cursor-pointer ${window.location.pathname === `/category/${category.categoryURL}` ? 'font-bold' : 'font-normal'}`}
                    >
                        {category.name}
                    </span>

                    {showDropdown && (
                        <ul
                            onMouseEnter={() => openDropdown()}
                            onMouseLeave={() => closeDropdown()}
                            className="border border-1 z-50 dropdown absolute w-48 bg-white rounded-md drop-shadow-md dark:bg-[#454545] dark:text-white">
                            {category.subCategories.map((subcategory, index) => (
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
                                            style={{ top: '0', left: '100%' }}>
                                            {["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"].map((day, index) => (
                                                <li
                                                    onClick={() => navigate(`/category/${category.categoryURL}?subcategory=${subcategory.name}&day=${day}`)}
                                                    key={index}>
                                                    <a href="#" className={`block text-sm py-4 my-2  pl-3 pr-4 md:p-0 hover:font-bold md:dark:font-bold`} aria-current="page">{day}</a>
                                                </li>
                                            ))}
                                        </ul>
                                    )}
                                </li>
                            ))}
                        </ul>
                    )}
                </>
            ) : (
                <Link to={`/category/${category.categoryURL}`}>
                    <span className={`ml-0 text-sm bg-left-bottom bg-gradient-to-r from-[#C0A04C] to-[#A48533] bg-[length:0%_2px] bg-no-repeat group-hover:bg-[length:100%_2px] transition-all duration-500 ease-out cursor-pointer ${window.location.pathname === `/category/${category.categoryURL}` ? 'font-bold' : 'font-normal'}`}>{category.name}</span>
                </Link>
            )
            }
        </div >
    );
};

export default Tabbar;

