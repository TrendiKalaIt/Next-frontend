/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    // Make sure these paths correctly point to your components and pages
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        home: ['Libre Baskerville', 'serif'],
        heading: ['Playfair Display', 'serif'],
        body: ['Lato', 'sans-serif'],

      },
      colors: {
        luxuryGold: '#C5A880', // optional gold accent
      },

      /* 🔥 SIRF YE NAYA ADD KIYA HAI */
      keyframes: {
        pulseZoom: {
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.35)' }, // thoda bada
        },
      },
      animation: {
        pulseZoom: 'pulseZoom 2.5s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}

