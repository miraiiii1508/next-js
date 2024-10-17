import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",

  ],
  theme: {
    extend: {
      colors: {
        primary: "#615EFC",
        secondary: "#2B2B2B",
      },
      fontFamily:{
        primary: "var(--font-manrope)",
      }
    },
  },
  plugins: [],
};
export default config;
