/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
    './src/app/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      container:{
        center:true
      },
      backgroundColor:{
        'dark':'#1b191b',
        'primary':"#121113",
        'secondary':"#3a383e"
      },
      colors:{
        'dark':'#1b191b',
        'primary':"#121113",
        'secondary':"#3a383e"
      }
    },
  },
  plugins: [],
}
