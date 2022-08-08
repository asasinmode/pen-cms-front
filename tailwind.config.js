/** @type {import('tailwindcss').Config} */
module.exports = {
   content: [
      "./index.html",
      "./src/**/*.vue",
   ],
   theme: {
      extend: {
         colors: {
            lilac: {
               light: "#F4EEFF",
               dark: "#DCD6F7"
            },
            navy: {
               light: "#A6B1E1",
               dark: "#424874"
            }
         }
      },
   },
   plugins: [],
}
