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
        textGrayed: "#73798c",
        divider: "#E4E8F4",
        primary: "#2356F7",
        error: "#EA1601",
        warning: "#FAD202",
      },
      fontFamily: {
        sans: "Poppins",
      },
      animation: {
        fadeIn: "fadeIn 0.25s ease-in-out forwards",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: 0 },
          "100%": { opacity: 100 },
        },
      },
    },
  },
  plugins: [],
};
