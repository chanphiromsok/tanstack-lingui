import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import { defineConfig, loadEnv } from "vite";
import tsConfigPaths from "vite-tsconfig-paths";
import react from "@vitejs/plugin-react";
import { lingui } from "@lingui/vite-plugin";
import path from "node:path";
import url from "node:url";
import { tanstackRouter } from "@tanstack/router-plugin/vite";
import type { BuildEnvironmentOptions } from "vite";

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// SSR configuration
const ssrBuildConfig: BuildEnvironmentOptions = {
  ssr: true,
  outDir: "dist/server",
  ssrEmitAssets: true,
  copyPublicDir: false,
  emptyOutDir: true,
  rollupOptions: {
    input: path.resolve(__dirname, "src/server.tsx"),
    output: {
      entryFileNames: "[name].js",
      chunkFileNames: "assets/[name]-[hash].js",
      assetFileNames: "assets/[name]-[hash][extname]",
    },
  },
};

// Client-specific configuration
const clientBuildConfig: BuildEnvironmentOptions = {
  outDir: "dist/client",
  emitAssets: true,
  copyPublicDir: true,
  emptyOutDir: true,
  rollupOptions: {
    input: path.resolve(__dirname, "src/client.tsx"),
    output: {
      entryFileNames: "static/[name].js",
      chunkFileNames: "static/assets/[name]-[hash].js",
      assetFileNames: "static/assets/[name]-[hash][extname]",
    },
  },
};

export default defineConfig(({ mode, isSsrBuild }) => {
  console.log(mode);
  loadEnv(`env.${mode}`, process.cwd(), "");
  return {
    server: {
      port: 3000,
    },
    plugins: [
      tsConfigPaths({
        projects: ["./tsconfig.json"],
      }),
      tanstackRouter({ target: "react", autoCodeSplitting: true }),
      tanstackStart(),
      react({
        babel: {
          plugins: ["@lingui/babel-plugin-lingui-macro"],
        },
      }),
      lingui(),
    ],
    // build: isSsrBuild ? ssrBuildConfig : clientBuildConfig,
  };
});
