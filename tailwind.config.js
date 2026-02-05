/** @type {import('tailwindcss').Config} */
export default {
    content: [
      "./index.html",
      "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
      extend: {
        fontFamily: {
          sans: ['Inter', 'sans-serif'],
          serif: ['Playfair Display', 'serif'],
        },
        colors: {
          navy: {
            900: '#0f172a', // Deep background
            800: '#1e293b', // Lighter navy for cards
          },
          gold: {
            400: '#d4af37', // Standard luxury gold
            500: '#b89628', // Darker gold for hover
          }
        }
      },
    },
    plugins: [],
  }