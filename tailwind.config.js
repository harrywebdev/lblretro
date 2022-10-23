const colors = require("tailwindcss/colors")
const plugin = require("tailwindcss/plugin")

/** @type {import("tailwindcss").Config} */
module.exports = {
  content: ["./app/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
    colors: {
      primary: colors.slate,
      secondary: colors.blue,
      neutral: colors.slate,
      gray: colors.gray,
      white: colors.white,
      danger: colors.red,
      txt01: colors.gray["800"],
    },
  },
  plugins: [
    plugin(function ({ addVariant }) {
      addVariant("not-last", "&:not(:last-child)")
      addVariant("not-first", "&:not(:first-child)")
    }),
  ],
}
