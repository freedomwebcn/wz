import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { resolve } from "path";
// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      "@": resolve(__dirname, "./src"),
      "#": resolve(__dirname, "./src/types"),
    },
  },
  plugins: [vue()],
  // server: {
  //   host: "192.168.37.4",
  //   port:3344
  // },
});
