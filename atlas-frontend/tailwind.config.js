/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Matching Django 'modern-theme.css' logic roughly or extending defaults
      },
    },
  },
  plugins: [],
}
