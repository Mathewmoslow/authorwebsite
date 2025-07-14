import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  assetsInclude: ['**/*.mp3'],
  server: {
    host: true, // This exposes the server to the network - critical for dev containers!
    port: 5173,
  }
});