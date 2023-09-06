import { type Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        main: "#C5E6A6",
        maindark: "#3C5F1B",
        unique: "#E16F7C",
        uniquedark: "#6C3747",
      },
      gridTemplateColumns: {
        "grid-chat": "1fr 1.5fr",
      },
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: ["light", "dark", "cupcake"],
  },
} satisfies Config;
