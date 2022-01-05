module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        lightBg: "#f5f7ff",
        text: "#020d31",
        divider: "#E4E8F4",
        primary: "#2356F7",
        error: "#EA1601",
      },
      fontFamily: {
        sans: "Poppins",
      },
    },
  },
  plugins: [],
};
