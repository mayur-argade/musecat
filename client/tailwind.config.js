/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      "./src/**/*.{js,jsx,ts,tsx}",
      'node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}'
    ],
    important: "#root",
    theme: {
      extend: {
        margin: {
            '175px': '175px',
          }
      },
    },
    plugins: [
        require('flowbite/plugin')
    ],
  }