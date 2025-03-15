import { defineConfig } from "rollup";
import json from "@rollup/plugin-json";
import nodeResolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import terser from "@rollup/plugin-terser";
import typescript from "rollup-plugin-typescript2";
import alias from "@rollup/plugin-alias";

export default defineConfig({
  input: "./src/index.ts",
  output: {
    file: "./dist/index.js",
    format: "esm",
    preserveModules: false,
    banner: "#!/usr/bin/env node", // keep shebang
    plugins: [terser()],
  },

  plugins: [
    json(),
    commonjs(),
    nodeResolve(),
    typescript({
      tsconfig: "tsconfig.json",
      useTsconfigDeclarationDir: true,
      clean: true,
    }),
    alias({
      entries: {
        "@": "./src",
      },
    }),
  ],
});
