import { defineConfig } from "vitest/config";
import { fileURLToPath } from "node:url";
import { resolve } from "node:path";

const projectRoot = fileURLToPath(new URL(".", import.meta.url));

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        storefront: resolve(projectRoot, "index.html"),
        login: resolve(projectRoot, "login.html"),
        admin: resolve(projectRoot, "admin/index.html"),
      },
    },
  },
  test: {
    environment: "node",
  },
});
