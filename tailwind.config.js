/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: 'jit', // Just-in-time mode
  content: [
    './node_modules/flowbite-react/**/*.js',
    './app/**/*.{js,ts,jsx,tsx}',
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',

    // Or if using `src` directory:
    './src/**/*.{js,ts,jsx,tsx}',

    'node_modules/preline/dist/*.js',
  ],
  theme: {
    extend: {},
  },
  plugins: [require('daisyui'), require('flowbite/plugin'), require('preline/plugin')],

  daisyui: {
    styled: true,
    themes: true,
    base: true,
    utils: true,
    logs: true,
    rtl: false,
    prefix: '',
    darkTheme: 'dark',

    themes: [
      {
        mytheme: {
          primary: '#0081C9',
          secondary: '#B2C8DF',
          accent: '#37CDBE',
          neutral: '#3D4451',
          'base-100': '#FFFFFF',
          info: '#3ABFF8',
          success: '#36D399',
          warning: '#FBBD23',
          error: '#F87272',
        },
      },
    ],
  },
};
