/*
filename: vite.config.ts
date: August 8, 2026
programmer: James Tran
title: How Do Good? v2 - Vite Configuration
purpose: Build configuration for the v2 React app (Tailwind + path alias)
*/

import path from "path"
import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"
import tailwindcss from "@tailwindcss/vite"

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})
