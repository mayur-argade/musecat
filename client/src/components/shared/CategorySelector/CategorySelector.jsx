import React, { useEffect, useState } from 'react';
import Select from 'react-select';

const CategorySelector = ({ categories, selectedCategories, onChange }) => {

    console.log(selectedCategories)

    const options = [];

    categories.forEach(category => {
        if (category && category.categoryURL) {
            // Check if the main category is already present
            if (!options.some(option => option.value === category.categoryURL)) {
                options.push({
                    value: category.categoryURL,
                    label: category.name,
                    data: { isMainCategory: true },
                });
            }
        }

        if (category.subCategories && category.subCategories.length > 0) {
            // Add subcategories nested under the main category
            category.subCategories.forEach(subcategory => {
                if (subcategory && subcategory.categoryURL) {
                    // Check if the subcategory is already present
                    if (!options.some(option => option.value === subcategory.categoryURL)) {
                        options.push({
                            value: subcategory.categoryURL,
                            label: subcategory.name,
                            data: { isSubcategory: true },
                        });
                    }
                }
            });
        }
    });


    // Find the index of the "Dinner" category
    const dinnerCategoryIndex = options.findIndex(option => option.label.toLowerCase() === 'dinner');

    // Create "Sunday Dinner" through "Saturday Dinner" options
    const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const dinnerOptions = daysOfWeek.map(day => ({
        value: `${day.toLowerCase()}dinner`,
        label: `${day} Dinner`,
        data: { isSubcategory: true },
    }));

    // Insert "Sunday Dinner" through "Saturday Dinner" options after "Dinner" category
    if (dinnerCategoryIndex !== -1) {
        options.splice(dinnerCategoryIndex + 1, 0, ...dinnerOptions);
    } else {
        // If "Dinner" category not found, append dinnerOptions at the end
        options.push(...dinnerOptions);
    }

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

    console.log(options)

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
                } else {
                    // Check if the option is one of the "Dinner" options
                    const dayOfWeekOption = daysOfWeek.find(day => `${day.toLowerCase()}dinner` === option.value);
                    if (dayOfWeekOption) {
                        return {
                            name: `${dayOfWeekOption} Dinner`,
                            categoryURL: option.value,
                        };
                    }
                }
            }
        });

        // Remove undefined values that might have been returned from map
        const uniqueSelectedCategories = selectedCategories.filter(category => category);

        // Check if "Dinner" options are present
        const hasDinner = uniqueSelectedCategories.some(category =>
            daysOfWeek.some(day => category.categoryURL === `${day.toLowerCase()}dinner`)
        );

        // If any dinner options are selected, add { name: "Dinner", categoryURL: "dinner" }
        if (hasDinner && !uniqueSelectedCategories.some(category => category.categoryURL === "dinner")) {
            uniqueSelectedCategories.push({
                name: "Dinner",
                categoryURL: "dinner"
            });
        }

        // Ensure no duplicates in selectedCategories
        const finalSelectedCategories = uniqueSelectedCategories.filter((category, index, self) =>
            index === self.findIndex(c => c.categoryURL === category.categoryURL)
        );

        onChange(finalSelectedCategories);
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
