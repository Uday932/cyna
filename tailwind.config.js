/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#302082",
        secondary: "#7200ff",
        button: "#FF6B00",
        blue: "#2b78e4",
        light: "#F2F2F2",
      },
    },
  },
  plugins: [],
};
