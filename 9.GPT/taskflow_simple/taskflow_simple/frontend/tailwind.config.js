/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                "pastel-bg": "#fdfbf7",
                "pastel-card": "#ffffff",
                "pastel-primary": "#b8c6db",
                "pastel-secondary": "#f5f7fa",
                "pastel-accent": "#ffb7b2",
                "pastel-green": "#c7e9c0",
                "pastel-blue": "#c6dbef",
                "pastel-yellow": "#fff7bc",
                "pastel-text": "#4a4a4a",
                "pastel-muted": "#9ca3af",
            },
        },
    },
};

