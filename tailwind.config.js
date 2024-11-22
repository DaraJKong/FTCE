/** @type {import('tailwindcss').Config} */
import daisyui from "daisyui";
export default {
  content: ["./src/**/*.{html,js,jsx,ts,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [daisyui],
  daisyui: {
    themes: [
      {
        ftce: {
          primary: "#ff80b2",
          secondary: "#6600ff",
          accent: "#ff5599",
          neutral: "#414d5d", // #d0021b
          "base-100": "#282e37",
        },
      },
    ],
  },
};
