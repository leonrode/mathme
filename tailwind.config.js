module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        lightBg: "#E9EEFE",
        text: "#020d31",
        textGrayed: "#73798c",
        divider: "#E4E8F4",
        primary: "#2356F7",
        error: "#EA1601",
        success: "#64BC26",
        warning: "#FAD202",
        darkBg: "#060A16",
        darkText: "#d6d6d6",
        darkPrimary: "#3e63da",
        darkDivider: "#192857",
        darkElevated: "#101937",
        darkError: "#bf382b",
      },
      fontFamily: {
        sans: "Poppins",
      },
      animation: {
        fadeIn: "fadeIn 0.25s ease-in-out forwards",
        wrongFade: "wrongFade 0.5s linear",
        rightFade: "rightFade 0.5s linear",
        turnRed: "turnRed 0.5s linear",
        turnGreen: "turnGreen 0.5s linear",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: 0 },
          "100%": { opacity: 100 },
        },
        // wrongShake: {
        //   "0%": { border: "3px solid #bf382b", backgroundColor: "#bf382b" },
        //   "10%, 90%": {
        //     transform: "translate3d(-1px, 0, 0)",
        //   },

        //   "20%, 80%": {
        //     transform: "translate3d(2px, 0, 0)",
        //   },

        //   "30%, 50%, 70%": {
        //     transform: "translate3d(-4px, 0, 0)",
        //   },

        //   "40%, 60%": {
        //     transform: "translate3d(4px, 0, 0)",
        //   },
        // },
        wrongFade: {
          "0%": { border: "3px solid transparent" },
          "50%": { border: "3px solid #bf382b" },
          "100%": { border: "3px solid transparent" },
        },
        rightFade: {
          "0%": { border: "3px solid transparent" },
          "50%": { border: "3px solid #64BC26" },
          "100%": { border: "3px solid transparent" },
        },
        turnRed: {
          "0%": { backgroundColor: "initial" },
          "50%": { backgroundColor: "#bf382b" },
          "100%": { backgroundColor: "initial" },
        },
        turnGreen: {
          "0%": { backgroundColor: "initial" },
          "50%": { backgroundColor: "#64BC26" },
          "100%": { backgroundColor: "initial" },
        },
      },
    },
  },
  plugins: [],
};
