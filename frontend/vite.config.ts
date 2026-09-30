import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig(({ mode }) => ({
  plugins: [react(), tailwindcss()],
  // Root path for Vercel / local. Use VITE_BASE=/candel-artistry-design/ for subfolder hosts.
  base: process.env.VITE_BASE || "/",
}));
