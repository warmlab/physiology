import { type Config } from "tailwindcss";

export default {
  content: [
    "{routes,islands,components}/**/*.{ts,tsx,js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#38bdf8",
        accent: "#f472b6",
      },
    },
  },
} satisfies Config;
