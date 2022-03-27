module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: 'class',
  theme: {
    fontFamily: {
      'roboto': ['Roboto', 'sans-serif'],
    },
    extend: {
      colors: {
        'cool-white': '#dcdcdc',
        'bright-blue': '#6699cc',
        'blue-submit': '#2196f3',
      },
      keyframes: {
        fadein: {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 },
        }
      },
      animation: {
        fadein: 'fadein 150ms',
      },
    },
  },
  plugins: [],
}
