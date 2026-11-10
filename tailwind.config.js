/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          ivory: '#F9EBD7',
          emerald: '#046A38',
          vermilion: '#E34222',
          forest: '#073D27',
          softGreen: '#EAF3E9',
          warmWhite: '#FFFCF6',
          body: '#26342B',
          muted: '#747C72',
          border: '#E7E2D8',
          // Additional subtle tints
          emeraldLight: '#058446',
          emeraldDark: '#034d28',
          ivoryDark: '#F2DEBF',
          ivoryLight: '#FDFAF4',
        }
      },
      fontFamily: {
        heading: ['Plus Jakarta Sans', 'Manrope', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
      },
      boxShadow: {
        'subtle': '0 2px 10px rgba(7, 61, 39, 0.04)',
        'card': '0 4px 20px -2px rgba(7, 61, 39, 0.06)',
        'card-hover': '0 12px 30px -4px rgba(7, 61, 39, 0.12)',
        'modal': '0 20px 50px -10px rgba(7, 61, 39, 0.25)',
      }
    },
  },
  plugins: [],
}
