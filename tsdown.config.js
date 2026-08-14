import { defineConfig } from "tsdown"

/** @type {import("tsdown").UserConfig} */
export default defineConfig({
    entry: { quoter: "./src/main.ts" },
    format: { esm: { target: ["es2022"] } },
    platform: "node",
    sourcemap: true,
    unbundle: true
})
