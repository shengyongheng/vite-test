import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { viteMockServe } from "vite-plugin-mock";

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {},
  },
  plugins: [
    react(),
    viteMockServe({
      mockPath: "./src/mock",
    }),
  ],
});
