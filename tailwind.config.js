/** @type {import('tailwindcss').Config} */
module.exports = {
   content: [
      "./index.html",
      "./src/**/*.vue",
   ],
   theme: {
      extend: {
         colors: {
            main: {
               light: '#f0d9ff',
               dark: '#bfa2db',
            },
            accent:  {
               light: '#f3f1f5',
               dark: '#7f7c82'
            }
         }
      },
   },
   plugins: [],
}
