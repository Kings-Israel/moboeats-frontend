import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
const { resolve } = require("path");

// https://vitejs.dev/config/
export default defineConfig({
  define: {
    "process.env": process.env,
  },
  base:
    process.env.NODE_ENV == "production" ? "https://admin.moboeats.com" : "",
  plugins: [vue()],
  resolve: {
    alias: [
      {
        find: "@axios",
        replacement: () => resolve(__dirname, "src/api/axios"),
      },
    ],
  },
  optimizeDeps: {
    include: ["@fawmi/vue-google-maps", "fast-deep-equal"],
  },
  build: {
    commonjsOptions: {
      transformMixedEsModules: true,
    },
  },
  server: {
    host: "admin.moboeats.test",
    port: 3000,
  },
});
