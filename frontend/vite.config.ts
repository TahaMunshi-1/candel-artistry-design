import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  // Default `/` for Vercel/local. Set VITE_BASE=/candel-artistry-design/ for customdev FTP.
  base: process.env.VITE_BASE || "/",
});
