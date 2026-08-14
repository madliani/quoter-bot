import { configDefaults, defineConfig } from "vitest/config"

/** @type {import("./types/vitest").UserConfig} */
export default defineConfig({
    plugins: [],
    resolve: { tsconfigPaths: true },
    test: {
        ...configDefaults,
        coverage: {
            enabled: false,
            provider: "v8",
            reporter: ["html", "lcov"]
        },
        environment: "node",
        globals: false,
        globalSetup: [],
        include: ["./lib/**/*.test.ts", "./src/**/*.test.ts"],
        name: "quoter-bot",
        passWithNoTests: true,
        reporters: ["default", "html"],
        setupFiles: []
    }
})
