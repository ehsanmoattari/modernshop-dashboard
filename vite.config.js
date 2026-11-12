import { defineConfig } from "vite";
import { resolve } from "node:path";

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        storefront: resolve(import.meta.dirname, "index.html"),
        login: resolve(import.meta.dirname, "login.html"),
        admin: resolve(import.meta.dirname, "admin/index.html"),
      },
    },
  },
  test: {
    environment: "node",
  },
});
