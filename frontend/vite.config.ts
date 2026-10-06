import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  // Default `./` for customdev subdirectory hosts or Vercel/local.
  base: process.env.VITE_BASE || "./",
});
