export default {
    darkMode: 'class', 
    content: [
      "./index.html",
      "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
          // Define colors using CSS variables (defined in index.css)
          // This allows easy switching between light/dark themes
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
            'border-color': 'var(--color-border)', // Renamed for clarity
            'input-bg': 'var(--color-input-bg)',
            'button-text': 'var(--color-button-text)',
            'header-bg': 'var(--color-header-bg)',
            'footer-bg': 'var(--color-footer-bg)',
            // Add specific palette colors if needed directly
            'sandy-brown': '#F4A460',
            'off-white': '#F0E6DC',
            'peru': '#CD853F',
            'muted-brown': '#BBA79D',
            'sienna': '#A0522D', // Also primary
            'dark-brown': '#8B5A2B',
            'saddle-brown': '#8B4513', // Also primary-dark
            'deep-brown': '#6B4423', // Also dark mode bg
            'near-black': '#2D2D2D', // Also text color light
            'dark-gray': '#1A1A1A', // Also title color light / header dark
            'almost-black': '#090909',
          },
          fontFamily: {
            sans: ['Roboto', 'sans-serif'], // Default body font
            serif: ['Merriweather', 'serif'], // Title font
          },
          container: { // Optional: Default container settings
            center: true,
            padding: '1rem',
            screens: {
              sm: '640px',
              md: '768px',
              lg: '1024px',
              xl: '1100px', // Match previous max-width
            },
          },
        },
      },
    plugins: [],
  }
  