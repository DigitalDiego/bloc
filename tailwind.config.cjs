/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}", "./index.html"],
  theme: {
    extend: {
      fontFamily: {
        poppins: "Poppins",
        poppinsLight: "PoppinsLight",
        poppinsBold: "PoppinsBold",
      },
    },
  },
  plugins: [],
};
