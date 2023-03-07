/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./src/**/*.{js,jsx,ts,tsx}",
        "./index.html",
    ],
    theme: {
        extend: {
            fontFamily: {
                'sarabun': 'Sarabun',
                'kurenaido': 'Zen Kurenaido',
            },
            keyframes: {
                'fade-in-down': {
                    'from': {
                        transform: 'translateY-(0,75rem)',
                        opacity: '0'
                    },
                    'to': {
                        transform: 'translateY(0rem)',
                        opacity: '1'
                    }
                },
            },
            animation: {
                'fade-in-down': 'fade-in-down 0.2s ease-in-out both',
            },
        },
    },
    plugins: [
        require("daisyui"),
    ],
}
