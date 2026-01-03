// vite.config.js
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    headers: {
      // Keep this! It allows the Google Sign-In popup to talk back to your app
      "Cross-Origin-Opener-Policy": "same-origin-allow-popups",

      // Change 'require-corp' to 'unsafe-none' or remove it entirely
      "Cross-Origin-Embedder-Policy": "unsafe-none",
    },
  },
});
