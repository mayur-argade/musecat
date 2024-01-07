import React, { useState, useEffect } from 'react';

const DarkModeToggle = () => {
    const [isDarkMode, setIsDarkMode] = useState(false);

    useEffect(() => {
        // On page load or when changing themes, best to add inline in `head` to avoid FOUC
        if (
            localStorage.getItem('color-theme') === 'dark' ||
            (!('color-theme' in localStorage) &&
                window.matchMedia('(prefers-color-scheme: dark)').matches)
        ) {
            document.documentElement.classList.add('dark');
            setIsDarkMode(true);
        } else {
            document.documentElement.classList.remove('dark');
            setIsDarkMode(false);
        }
    }, []);

    const toggleDarkMode = () => {
        const newDarkModeState = !isDarkMode;
        if (isPWA()) {
            // Toggle dark mode
            document.documentElement.classList.toggle('dark', newDarkModeState);

            // Update local storage
            localStorage.setItem('color-theme', newDarkModeState ? 'dark' : 'light');

            // Update state
            setIsDarkMode(newDarkModeState);
        }

        // Change website background color only for PWA
        if (isPWA()) {
            document.body.style.backgroundColor = newDarkModeState ? '#2C2C2C' : '#FFFFFF';
        }
    };

    // Function to check if the app is running as a PWA
    function isPWA() {
        return window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone === true;
    }

    return (
        <label className="relative inline-flex items-center mb-5 cursor-pointer">
            <input onClick={toggleDarkMode} type="checkbox" value="" className="sr-only peer" />
            <div className="w-9 h-5 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-800 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all dark:border-gray-600 peer-checked:bg-gray-600"></div>
            {/* <span class="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">Small toggle</span> */}
        </label>
    );
};

export default DarkModeToggle;
