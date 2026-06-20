/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        academia: {
          parchment: '#fdfbf7', // Main background
          paper: '#f4f0e6',     // Cards and sidebars
          leather: '#d2c5b4',   // Borders and subtle highlights
          gold: '#cfa473',      // Accents and primary buttons
          ink: '#3b332b',       // Main text (dark brown instead of harsh black)
          inkLight: '#7a6e62',  // Muted text for secondary info
        }
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'serif'], // Headings
        body: ['"Lora"', 'serif'],              // Standard text
        sans: ['system-ui', 'sans-serif'],      // Fallback for UI elements if needed
      },
      boxShadow: {
        'paper': '0 4px 6px -1px rgba(122, 110, 98, 0.1), 0 2px 4px -1px rgba(122, 110, 98, 0.06)',
      }
    },
  },
  plugins: [],
}