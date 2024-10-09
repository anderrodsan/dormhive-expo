/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    colors: {
      primary: "#3b82f6",
      secondary: {
        DEFAULT: "var(--color-secondary)",
        100: "var(--color-secondary-100)",
        inv: "var(--color-secondary-inv)",
      },
      background: "var(--color-background)",
      white: "var(--color-white)",
      content: {
        DEFAULT: "var(--color-content)",
        inv: "var(--color-content-inv)",
      },
      highlight: "var(--color-highlight)",
    },
    extend: {},
  },
  future: {
    hoverOnlyWhenSupported: true,
  },
  plugins: [],
};
