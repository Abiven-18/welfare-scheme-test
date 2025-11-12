/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#1a1a1a',
        secondary: '#4a4a4a',
        accent: '#6b6b6b',
        light: '#f5f5f5',
        border: '#e0e0e0',
      },
      fontFamily: {
        sans: ['"Times New Roman"', 'Times', 'serif'],
      },
    },
  },
  plugins: [],
}
