/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./src/**/*.{js,jsx,ts,tsx}",
        'node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}'
    ],
    important: "#root",
    theme: {
        extend: {
            fontSize: {
                xm: '0.5rem',
                xss: '0.6rem'
            },
            height: {
                '85': '21rem',
                '128': '32rem',
            },
            width: {
                '128': '32rem',
                '1300': '1300px'
            },
            maxWidth: {
                '2xs': '22rem',
            },
            borderRadius: {
                'xl': '1rem',
            },
            fontWeight: {
                thin: '100',
                hairline: '100',
                extralight: '200',
                light: '300',
                normal: '400',
                medium: '500',
                semibold: '600',
                bold: '700',
                extrabold: '800',
                black: '900'
            },
            screens: {
                's': '320px',
                'm': '375px',
                'l':'425px',
                'xs': '390px',
                'large': '2230px',
                // => @media (min-width: 390px) { ... }
            },
            grayscale: {
                10: '10%',
            },
            margin: {
                '175px': '175px',
            },
        },
    },
    plugins: [
        require('flowbite/plugin'),
        require('tailwindcss-box-shadow'),
    ],
}