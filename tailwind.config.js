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
          navy: '#0B0F0E',
          teal: '#14D993',
          gold: '#14D993',
          goldInk: '#067A52',
          ivory: '#F7FAF8',
          stone: '#E6EBE8',
          mist: '#E7F8F1',
          cool: '#F3F6F5',
          charcoal: '#0B0F0E',
          white: '#FFFFFF',

          emerald: '#14D993',
          vermilion: '#C2413A',
          forest: '#0B0F0E',
          softGreen: '#E7F8F1',
          warmWhite: '#F2F5F3',
          body: '#3E4A46',
          muted: '#4A5854',
          border: '#E4E9E6',
          emeraldLight: '#3DE6AA',
          emeraldDark: '#0BB57C',
          ivoryDark: '#E8EEEB',
          ivoryLight: '#F7FAF8',
        }
      },
      fontFamily: {
        heading: ['DM Sans', 'Inter', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
      },
      boxShadow: {
        '2xs': '0 1px 2px rgba(16, 44, 60, 0.05)',
        'xs': '0 1px 2px rgba(16, 44, 60, 0.06)',
        'subtle': '0 2px 10px rgba(16, 44, 60, 0.05)',
        'card': '0 10px 28px -16px rgba(16, 44, 60, 0.18)',
        'card-hover': '0 18px 36px -18px rgba(16, 44, 60, 0.22)',
        'modal': '0 24px 50px -18px rgba(16, 44, 60, 0.32)',
      },
      spacing: {
        '0.2': '0.05rem',
        '4.5': '1.125rem',
        '13': '3.25rem',
      },
      scale: {
        '98': '0.98',
        '108': '1.08',
      },
      backdropBlur: {
        xs: '2px',
      },
    },
  },
  plugins: [],
}
