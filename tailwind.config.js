module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      typography: (theme) => ({
        DEFAULT: {
          css: {
            a: {
              textDecorationColor: theme("colors.red.600"),
              textDecorationThickness: "2px",
            },
            "a:hover": {
              backgroundColor: theme("colors.red.600"),
              color: theme("colors.white"),
            },
          },
        },
      }),
      gridTemplateColumns: {
        ["auto-1fr"]: "auto 1fr",
        ["1fr-auto"]: "1fr auto",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [require("@tailwindcss/typography")],
}
