module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        lightBg: "#F6E1ED",
        text: "#1D0814",
        textGrayed: "#73798c",
        divider: "#E9B8D4",
        primary: "#c13584",
        lightSkeleton: "#ECC2DA",
        error: "#EA1601",
        success: "#64BC26",
        warning: "#FAD202",
        darkBg: "#13050D",
        darkText: "#F9EBF3",
        darkPrimary: "#AE3077",
        darkSkeleton: "#4D1535",
        darkDivider: "#3A1028",
        darkElevated: "#300D21",
        darkDoubleElevated: "#44132E",
        darkError: "#bf382b",
        darkWarning: "#E1BD02",
        rgbaTransparent: "rgba(0, 0, 0, 0.0)",
        opaqueBlack: "rgba(0, 0, 0, 0.75)",
      },
      fontFamily: {
        sans: "Poppins",
      },
      animation: {
        fadeIn: "fadeIn 0.25s ease-in-out forwards",
        modalFadeIn: "modalFadeIn 0.2s linear forwards",
        slideDown: "slideDown 0.2s ease-in-out forwards",
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
        modalFadeIn: {
          "0%": { backgroundColor: "rgba(0, 0, 0, 0.0)" },
          "100%": { backgroundColor: "rgba(0, 0, 0, 0.75)" },
        },
        slideDown: {
          "0%": { marginBottom: "50px" },
          "100%": { marginBottom: "0px" },
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
