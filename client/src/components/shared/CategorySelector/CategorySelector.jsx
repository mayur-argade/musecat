import React, { useEffect, useState } from 'react';
import Select from 'react-select';

const CategorySelector = ({ categories, selectedCategories, onChange }) => {

    console.log(selectedCategories)

    const options = [];

    categories.forEach(category => {
        if (category && category.categoryURL) {
            // Add the main category
            options.push({
                value: category.categoryURL,
                label: category.name,
                data: { isMainCategory: true },
            });
        }

        if (category.subCategories && category.subCategories.length > 0) {
            // Add subcategories nested under the main category
            category.subCategories.forEach(subcategory => {
                if (subcategory && subcategory.categoryURL) {
                    options.push({
                        value: subcategory.categoryURL,
                        label: subcategory.name,
                        data: { isSubcategory: true },
                    });
                }
            });
        }
    });



    const selectedOptions = selectedCategories.map(category => ({
        value: category.categoryURL,
        label: category.name,
    }));

    const [darkMode, setDarkMode] = useState(false);

    useEffect(() => {
        // Check if user prefers dark mode
        if (
            localStorage.getItem('color-theme') === 'dark' ||
            (!('color-theme' in localStorage) &&
                window.matchMedia('(prefers-color-scheme: dark)').matches)
        ) {
            setDarkMode(true);
        } else {
            setDarkMode(false);
        }
    }, []);


    const handleChange = (selectedOptions) => {
        const selectedCategories = selectedOptions.map(option => {
            const category = categories.find(category => category.categoryURL === option.value);
            if (category) {
                return {
                    name: category.name,
                    categoryURL: category.categoryURL
                };
            } else {
                const categoryResponse = categories.find(category =>
                    category.subCategories.some(subcategory => subcategory.categoryURL === option.value)
                );

                if (categoryResponse) {
                    // Extract subcategory information and return it
                    const subcategory = categoryResponse.subCategories.find(subcategory => subcategory.categoryURL === option.value);
                    return {
                        name: subcategory.name,
                        categoryURL: subcategory.categoryURL,
                    };
                }
            }
        });

        onChange(selectedCategories);
    };

    const customStyles = {
        control: (baseStyles, state) => ({
            ...baseStyles,
            backgroundColor: darkMode ? '#454545' : 'white',
            color: darkMode ? 'white' : 'black',
            borderColor: state.isFocused ? (darkMode ? '#555' : '#C0A04C') : (darkMode ? '#555' : '#C0A04C'),
            '&:hover': {
                borderColor: darkMode ? '#555' : '#A48533',
            },
        }),
        menu: baseStyles => ({
            ...baseStyles,
            backgroundColor: darkMode ? '#454545' : 'white',
            color: darkMode ? 'white' : 'black',
        }),
        option: (baseStyles, state) => ({
            ...baseStyles,
            backgroundColor: state.isFocused ? (darkMode ? '#333' : '#f0f0f0') : 'transparent',
            color: state.isFocused ? (darkMode ? 'white' : 'black') : (darkMode ? 'white' : 'black'),
            '&:active': {
                backgroundColor: darkMode ? '#A48533' : '#C0A04C',
            },
        }),
        // Add more styles for other components as needed...
    };


    return (
        <Select
            isMulti
            options={options}
            value={selectedOptions}
            onChange={handleChange}
            styles={customStyles}
        />
    );
};

export default CategorySelector;
