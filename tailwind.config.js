module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}',"./node_modules/flowbite/**/*.js"],
  darkMode: false,
  theme: {
    extend: {
      colors: {
        primary: '#1d90f4',
        secondary: '#63b7b1',
        green: '#1f2937',
      },
      height: {
        '40r': '400px',
      },
      letterSpacing: {
        '0.4r': '4px',
      },
      transitionProperty: {
        height: 'height',
        width: 'width',
        spacing: 'margin, padding',
      },
      boxShadow: {
        circle: '0 0 10px 5px rgba(99, 183, 177,1)',
      },
    },
    screens:{
      '2xl': {'max': '1440px'},
      // => @media (max-width: 1535px) { ... }

      'xl': {'max': '1279px'},
      // => @media (max-width: 1279px) { ... }

      'lg': {'max': '1023px'},
      // => @media (max-width: 1023px) { ... }

      'md': {'max': '767px'},
      // => @media (max-width: 767px) { ... }

      'sm': {'max': '639px'},
      // => @media (max-width: 639px) { ... }
    }
  },
  plugins: [
    require('flowbite/plugin')
  ],
};
