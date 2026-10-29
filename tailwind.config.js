/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        'campus-green': '#10b981',
        'campus-cyan': '#06b6d4',
        'campus-dark': '#0f172a',
        'campus-panel': '#1e293b',
      },
    },
  },
  plugins: [],
};
