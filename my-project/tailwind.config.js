/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        lightyellow:"#f8ffe5",
        emerald:"#06d6a0"
      },
      screens:{
        xs:"480px",
        sm:"640px",
        md:"768px",
        lg:"1024px",
      }
    },
  },
  plugins: [],
}

