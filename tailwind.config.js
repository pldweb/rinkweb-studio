/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#ea7f17',
          50: '#fef8f0',
          100: '#fdecd7',
          200: '#f9d3a4',
          300: '#f5b36a',
          400: '#f09336',
          500: '#ea7f17',
          600: '#d06510',
          700: '#ac4d11',
          800: '#8c3d15',
          900: '#743417',
          950: '#401909',
        },
        secondary: {
          DEFAULT: '#032838',
          50: '#f0f9ff',
          100: '#e0f2fe',
          200: '#b9e5fe',
          300: '#7ccffb',
          400: '#36b4f6',
          500: '#0c98e9',
          600: '#0178c7',
          700: '#0260a1',
          800: '#065085',
          900: '#0a3d6d',
          950: '#032838',
        },
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        heading: ['Montserrat', 'sans-serif'],
      },
    },
  },
  plugins: [],
};