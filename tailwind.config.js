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
          navy: '#14283F',
          teal: '#167C80',
          gold: '#E5B765',
          goldInk: '#8A6430',
          ivory: '#F8F6EF',
          stone: '#E6E1D8',
          mist: '#DCEFED',
          cool: '#F1F4F6',
          charcoal: '#14283F',
          white: '#FFFFFF',

          emerald: '#167C80',
          vermilion: '#115E61',
          forest: '#14283F',
          softGreen: '#DCEFED',
          warmWhite: '#F8F6EF',
          body: '#526477',
          muted: '#526477',
          border: '#E3DED4',
          emeraldLight: '#1A9498',
          emeraldDark: '#115E61',
          ivoryDark: '#E8E4DA',
          ivoryLight: '#FBFAF6',
        }
      },
      fontFamily: {
        heading: ['DM Sans', 'Plus Jakarta Sans', 'sans-serif'],
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
