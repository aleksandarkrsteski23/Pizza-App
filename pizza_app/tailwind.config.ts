import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-roboto)', 'sans-serif'], 
      },
      colors: {
        tomatoRed: '#D32F2F',
        oliveGreen: '#388E3C',
        goldenYellow: '#FFB74D',
        grayBG: "#E6E7D9"
      },
    },
  },
  plugins: [],
} satisfies Config;
