/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      animation: {
        texthome: "title 1.2s cubic-bezier(0.46, 0, 0.01, 1) forwards",
        smalltxt: "smalltxt 1.2s cubic-bezier(0.46, 0, 0.01, 1) forwards",
        desc: "desc 1.4s cubic-bezier(0.46, 0, 0.01, 1) forwards",
        navbar: "navbar 1.4s cubic-bezier(0.46, 0, 0.01, 1) forwards",
      },
      keyframes: {
        title: {
          to: {
            top: "0px",
          },
        },
        smalltxt: {
          to: {
            right: "0%",
          },
        },
        desc: {
          to: {
            top: "0px",
          },
        },
        navbar: {
          to: {
            top: "0px",
          },
        },
      },
      backgroundImage: {
        "gradient-146": "linear-gradient(146deg, var(--tw-gradient-stops))",
      },
      screens: {
        mdlg: {
          min: "990px",
        },
      },
    },
  },
  plugins: [],
};
