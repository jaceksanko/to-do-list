/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      borderRadius: {
        8: "8px",
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
      },
      colors: {
        "border-color": "#DEE2E6",
        "checkbox-color": "#CED4DA",
        "text-color": "#54595E",
        "text-color-light": "#6C757D",
        "text-color-white": "#FFFFFF",
        "active-color": "#17A2B8",
      },
      spacing: {
        14.5: "14.5px",
        8.5: "8.5px",
        31.69: "31.69px",
        23.69: "23.69px",
      },
    },
  },
  plugins: [
    function ({ addComponents }) {
      addComponents({
        ".btn": {
          "@apply pl-4 pr-3 py-8.5 rounded-8 bg-white border border-border-color font-medium text-text-color":
            {},
        },
        ".btn-active": {
          "@apply bg-active-color text-white font-semibold border-none": {},
        },
      });
    },
  ],
};
