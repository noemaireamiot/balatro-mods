/** @type {import('tailwindcss').Config} */
export default {
    content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
    theme: {
        colors: {
            'bal-blue': '#0590F9',
            'bal-red': '#F6483D',
            'bal-green': '#309D74',
            'bal-yellow': '#FB9107',
            'bal-grey': '#6D8084',
        },
        extend: {},
    },
    plugins: [require('flowbite/plugin')],
}
