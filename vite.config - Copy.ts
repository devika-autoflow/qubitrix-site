import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    fs: {
      // node_modules is a junction to D:\packages (kept outside OneDrive)
      allow: [".", "D:/packages/qubitrix-site/node_modules"],
    },
  },
  build: {
    target: "es2020",
    rollupOptions: {
      output: {
        manualChunks: {
          three: ["three"],
          gsap: ["gsap"],
        },
      },
    },
  },
});
