import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { resolve } from "path";
// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: [
      {
        find: "@",
        replacement: resolve(__dirname, "src"),
      },
    ],
  },
  plugins: [vue()],
  // server: {
  //   host: "192.168.37.4",
  //   port:3344
  // },
});
