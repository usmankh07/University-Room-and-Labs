/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      screens: {
        xs: "320px",
        sm: "600px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
        "2xl": "1536px",
      },
      colors: {
        // themeColor: "#B1EBB3",
        themeColor: "#AD2126",
        backgroundColor: "#f5f5f5",
      },
      fontFamily: {
        mont: "Montserrat",
        havre: "Le Havre Rounded",
        roboto: ["Roboto", "sans-serif"],
      },
    },
  },
  plugins: [],
};
