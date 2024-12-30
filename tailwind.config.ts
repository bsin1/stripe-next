import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        "gradient-custom": "linear-gradient(to right, #F97316, #FD9C42)",
        "gradient-custom-blue": "linear-gradient(to right, #5F16F9, #9F42FD)",
      },
      colors: {
        "white-bg": "#FEF9F7",
        "accent-dark": "#2C1338",
        active: "#A04A97",
        "error-light": "#FBE5E5",
        error: "#e53e3e",
        primary: "#FD6702",
        "primary-active": "#FD5000",
        "primary-hover": "#FD5C01",
        disabled: "rgb(156 163 175 / 1)",
        "primary-orange": "#F97316",
        "primary-gray": "#757575",
        "secondary-gray": "#E0E0E0",
        "tertiary-gray": "#F5F5F5",
      },
      borderWidth: {
        "1.5": "1.5px",
        "3": "3px",
      },
    },
  },
  variants: {
    extend: {
      backgroundImage: ["hover"],
    },
  },
  plugins: [
    function ({ addUtilities }: any) {
      const newUtilities = {
        ".hide-scrollbar::-webkit-scrollbar": {
          display: "none",
        },
      };

      addUtilities(newUtilities, {
        variants: ["responsive"],
      });
    },
  ],
};
export default config;
