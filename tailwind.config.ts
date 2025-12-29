import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: 'class',
  theme: {
    screens: {
      'xs': '375px',
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
      '2xl': '1536px',
    },
    extend: {
      spacing: {
        'safe-top': 'env(safe-area-inset-top)',
        'safe-bottom': 'env(safe-area-inset-bottom)',
        'safe-left': 'env(safe-area-inset-left)',
        'safe-right': 'env(safe-area-inset-right)',
      },
      colors: {
        // Pug-themed colors
        pug: {
          fawn: '#C77A4E',
          'fawn-light': '#D4A574',
          brown: '#8B7355',
          'brown-medium': '#A08968',
          black: '#2C2C2C',
          cream: '#F5E6D3',
        },
        // Light theme - "Sunny Day Walk"
        light: {
          background: '#FAFAF9',
          surface: '#FFFFFF',
          primary: '#C77A4E',
          secondary: '#8B7355',
          accent: '#F4A460',
          text: '#1F1F1F',
          'text-secondary': '#6B7280',
          border: '#E5E7EB',
          'user-bubble': '#C77A4E',
          'user-text': '#FFFFFF',
          'whiskey-bubble': '#F3F4F6',
          'whiskey-text': '#1F1F1F',
        },
        // Dark theme - "Midnight Zoomies"
        dark: {
          background: '#18181B',
          surface: '#27272A',
          primary: '#D4A574',
          secondary: '#A08968',
          accent: '#F4A460',
          text: '#F4F4F5',
          'text-secondary': '#A1A1AA',
          border: '#3F3F46',
          'user-bubble': '#D4A574',
          'user-text': '#1F1F1F',
          'whiskey-bubble': '#3F3F46',
          'whiskey-text': '#F4F4F5',
        },
      },
      animation: {
        'bounce-slow': 'bounce 3s infinite',
        'wiggle': 'wiggle 1s ease-in-out infinite',
      },
      keyframes: {
        wiggle: {
          '0%, 100%': { transform: 'rotate(-3deg)' },
          '50%': { transform: 'rotate(3deg)' },
        },
      },
    },
  },
  plugins: [],
};

export default config;
