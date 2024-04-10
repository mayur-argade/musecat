import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'
const SubTabbar = ({ category }) => {
    const [showDropdown, setShowDropdown] = useState(false);
    const navigate = useNavigate()
    const handleShowDropdown = () => {
        setShowDropdown(true);
    };

    const handleCloseDropdown = () => {
        setShowDropdown(false);
    };

    return (
        <nav className='shadow-lg flex justify-center align-middle items-center pb-2'>
            {category.subCategories && category.subCategories.map((subcategory, index) => (
                <span className='m-0 cursor-pointer px-2 py-1 rounded hover:bg-slate-100 dark:hover:bg-slate-400 ml-0 text-sm relative' key={index}
                    onMouseEnter={() => {
                        if (subcategory.name == 'Dinner') {
                            handleShowDropdown();
                        }
                    }}
                    onMouseLeave={handleCloseDropdown}>
                    <span onClick={() => navigate(`?subcategory=${subcategory.name}`)}>
                        {subcategory.name}
                    </span>
                    {showDropdown && subcategory.name == 'Dinner' && (
                        <div className="z-50 absolute top-full left-0 bg-white dark:bg-[#2c2c2c] shadow-md">
                            <button onClick={() => navigate('?subcategory=Dinner&day=Sunday')} className="block w-full text-left px-4 py-2 text-sm dark:hover:bg-gray-400 hover:bg-gray-100" >Sunday</button>
                            <button onClick={() => navigate('?subcategory=Dinner&day=Monday')} className="block w-full text-left px-4 py-2 text-sm dark:hover:bg-gray-400 hover:bg-gray-100" >Monday</button>
                            <button onClick={() => navigate('?subcategory=Dinner&day=Tuesday')} className="block w-full text-left px-4 py-2 text-sm dark:hover:bg-gray-400 hover:bg-gray-100" >Tuesday</button>
                            <button onClick={() => navigate('?subcategory=Dinner&day=Wednesday')} className="block w-full text-left px-4 py-2 text-sm dark:hover:bg-gray-400 hover:bg-gray-100" >Wednesday</button>
                            <button onClick={() => navigate('?subcategory=Dinner&day=Thursday')} className="block w-full text-left px-4 py-2 text-sm dark:hover:bg-gray-400 hover:bg-gray-100" >Thursday</button>
                            <button onClick={() => navigate('?subcategory=Dinner&day=Friday')} className="block w-full text-left px-4 py-2 text-sm dark:hover:bg-gray-400 hover:bg-gray-100" >Friday</button>
                            <button onClick={() => navigate('?subcategory=Dinner&day=Saturday')} className="block w-full text-left px-4 py-2 text-sm dark:hover:bg-gray-400 hover:bg-gray-100" >Saturday</button>
                        </div>
                    )}
                </span>
            ))}
        </nav>
    );
};

export default SubTabbar;
