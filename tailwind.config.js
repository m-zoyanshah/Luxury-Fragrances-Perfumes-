/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#0B0B0B',
        'ink-soft': '#141414',
        'ink-card': '#1A1A1A',
        gold: {
          DEFAULT: '#D4AF37',
          soft: '#E8D9A0',
          deep: '#B8932B',
          muted: 'rgba(212,175,55,0.5)',
        },
        cream: '#F5F1E8',
      },
      fontFamily: {
        sans: ['Poppins', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        display: ['"Playfair Display"', 'Georgia', 'serif'],
      },
      maxWidth: {
        '8xl': '88rem',
      },
      keyframes: {
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
    },
  },
  plugins: [],
};
