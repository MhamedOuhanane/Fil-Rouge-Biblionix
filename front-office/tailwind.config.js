// tailwind.config.js
export default {
    darkMode: 'class', 
    content: [
      "./index.html",
      "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
      extend: {
        colors: {
          'background': 'var(--color-bg)',
          'text-main': 'var(--color-text)',
          'title': 'var(--color-title)',
          'primary': {
            DEFAULT: 'var(--color-primary)',
            'dark': 'var(--color-primary-dark)',
          },
          'secondary': 'var(--color-secondary)',
          'accent': 'var(--color-accent)',
          'border-color': 'var(--color-border)',
          'input-bg': 'var(--color-input-bg)',
          'button-text': 'var(--color-button-text)',
          'header-bg': 'var(--color-header-bg)',
          'footer-bg': 'var(--color-footer-bg)',
          'sandy-brown': '#F4A460',
          'off-white': '#F0E6DC',
          'peru': '#CD853F',
          'muted-brown': '#BBA79D',
          'sienna': '#A0522D',
          'dark-brown': '#8B5A2B',
          'saddle-brown': '#8B4513',
          'deep-brown': '#6B4423',
          'near-black': '#2D2D2D',
          'dark-gray': '#1A1A1A',
          'almost-black': '#090909',
        },
        fontFamily: {
          sans: ['Roboto', 'sans-serif'],
          serif: ['Merriweather', 'serif'],
        },
        container: {
          center: true,
          padding: '1rem',
          screens: {
            sm: '640px',
            md: '768px',
            lg: '1024px',
            xl: '1100px',
          },
        },
      },
    },
    plugins: [],
  }
  