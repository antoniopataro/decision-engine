import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  mode: "development",
  plugins: [react(), tsconfigPaths()],
  preview: {
    port: 7002,
  },
  server: {
    port: 7002,
  },
})
