// vite.config.js
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    headers: {
      // Fix for Google Sign-In popup/iframe communication warning
      "Cross-Origin-Opener-Policy": "same-origin-allow-popups",
      // Optional: Often recommended together with COOP
      "Cross-Origin-Embedder-Policy": "require-corp",
    },
  },
});
