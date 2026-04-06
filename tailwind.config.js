/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        campus: {
          bg: '#0B1121', // Darkest navy background
          card: '#151C2C', // Slightly lighter card background
          accent: '#2DD4BF', // Teal/Cyan accent
          accentHover: '#14B8A6',
          yellow: '#FACC15', // Yellow for highlights
          text: '#F8FAFC',
          textMuted: '#94A3B8',
          border: '#334155',
          darkRed: '#7F1D1D',
          lightRed: '#FCA5A5'
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
