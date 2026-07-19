/** @type {import('tailwindcss').Config} */

export default {
  content: [
    "./app/components/**/*.{vue,js,ts}",
    "./app/pages/**/*.vue",
    "./app/app.vue",
  ],

  theme: {
    extend: {
      colors: {
        primary: "#F5B301",
        secondary: "#C8860B",
        dark: "#0A0A0A",
        card: "#141414",
      },

      fontFamily: {
        heading: ["Anton", "Oswald", "sans-serif"],
        body: ["Inter", "sans-serif"],
      },

      boxShadow: {
        glow: "0 0 30px rgba(245,179,1,.25)",
      },
    },
  },

  plugins: [],
};
