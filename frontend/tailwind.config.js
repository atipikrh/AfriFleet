/** @type {import('tailwindcss').Config} */
// Note: Les valeurs ci-dessous sont synchronisées avec frontend/design-system/
// Source: design-system/colors.ts, design-system/typography.ts, design-system/spacing.ts

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      // Couleurs - Source: design-system/colors.ts
      colors: {
        primary: {
          DEFAULT: '#6366f1',
          50: '#eef2ff',
          100: '#e0e7ff',
          500: '#6366f1',
          600: '#4f46e5',
          700: '#4338ca',
        },
        secondary: {
          DEFAULT: '#10b981',
          50: '#ecfdf5',
          100: '#d1fae5',
          500: '#10b981',
          600: '#059669',
          700: '#047857',
        },
        accent: {
          DEFAULT: '#f97316',
          50: '#fff7ed',
          100: '#ffedd5',
          500: '#f97316',
          600: '#ea580c',
          700: '#c2410c',
        },
        warning: '#f59e0b',
        danger: '#ef4444',
        success: '#10b981',
        light: '#f8fafc',
        dark: '#1e293b',
      },
      // Typographie - Source: design-system/typography.ts
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      // Espacements - Source: design-system/spacing.ts
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
      },
      backdropBlur: {
        xs: '2px',
      },
    },
  },
  plugins: [],
};

