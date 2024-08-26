/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: "#ff69b4", // 自定义颜色
      },
      spacing: {
        9: "2.25rem", // 自定义边距
      },
    },
  },
  plugins: [],
};
