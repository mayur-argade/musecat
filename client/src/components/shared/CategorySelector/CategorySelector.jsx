import React from 'react';
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


    return (
        <Select
            isMulti
            options={options}
            value={selectedOptions}
            onChange={handleChange}
        />
    );
};

export default CategorySelector;
