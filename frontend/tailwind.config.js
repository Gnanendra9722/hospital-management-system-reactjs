/** @type {import('tailwindcss').Config} */
export default {
    content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
    theme: {
      extend: {
        fontFamily: {
          sans: ['Inter', 'sans-serif'],
        },
        colors: {
          primary: {
            50: '#e3f2fd',
            100: '#bbdefb',
            200: '#90caf9',
            300: '#64b5f6',
            400: '#42a5f5',
            500: '#1a73e8', // Main primary color
            600: '#1565c0',
            700: '#0d47a1',
            800: '#0a3880',
            900: '#07285b',
          },
          secondary: {
            50: '#e0f7f5',
            100: '#b3eee8',
            200: '#81e6db',
            300: '#4edecd',
            400: '#29d7c1',
            500: '#20c997', // Main secondary color
            600: '#1ca484',
            700: '#187f6a',
            800: '#136453',
            900: '#0e4c3f',
          },
          accent: {
            50: '#fef4e2',
            100: '#fee3b7',
            200: '#fdd088',
            300: '#fcbd5a',
            400: '#fbad37',
            500: '#fa9c15', // Main accent color
            600: '#e38b12',
            700: '#ac690d',
            800: '#885209',
            900: '#663e07',
          },
          success: {
            50: '#e8f5e9',
            100: '#c8e6c9',
            500: '#4caf50',
            700: '#388e3c',
          },
          warning: {
            50: '#fffde7',
            100: '#fff9c4',
            500: '#ffeb3b',
            700: '#fbc02d',
          },
          error: {
            50: '#ffebee',
            100: '#ffcdd2',
            500: '#f44336',
            700: '#d32f2f',
          },
          neutral: {
            50: '#fafafa',
            100: '#f5f5f5',
            200: '#eeeeee',
            300: '#e0e0e0',
            400: '#bdbdbd',
            500: '#9e9e9e',
            600: '#757575',
            700: '#616161',
            800: '#424242',
            900: '#212121',
          },
        },
        spacing: {
          '128': '32rem',
          '144': '36rem',
        },
        boxShadow: {
          card: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
          dropdown: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
        },
        animation: {
          'fade-in': 'fadeIn 0.3s ease-in-out',
          'slide-up': 'slideUp 0.4s ease-out',
        },
        keyframes: {
          fadeIn: {
            '0%': { opacity: '0' },
            '100%': { opacity: '1' },
          },
          slideUp: {
            '0%': { transform: 'translateY(10px)', opacity: '0' },
            '100%': { transform: 'translateY(0)', opacity: '1' },
          },
        },
      },
    },
    plugins: [],
  };