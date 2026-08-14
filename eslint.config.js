import pluginJS from "@eslint/js"
import pluginJSON from "@eslint/json"
import pluginImport from "eslint-plugin-import"
import pluginNodeJS from "eslint-plugin-n"
import pluginNoSecrets from "eslint-plugin-no-secrets"
import { configs as perfectConfigs } from "eslint-plugin-perfectionist"
import pluginSec from "eslint-plugin-security"
import { defineConfig, globalIgnores } from "eslint/config"
import globals from "globals"
import { configs as tsConfigs } from "typescript-eslint"

/** @type {import("eslint/config").Config} */
export default defineConfig([
    globalIgnores([
        "coverage/",
        "dist/",
        "html/",
        "node_modules/",
        "package-lock.json"
    ]),
    {
        extends: [
            perfectConfigs["recommended-alphabetical"],
            pluginImport.flatConfigs.recommended,
            pluginImport.flatConfigs.typescript,
            pluginJS.configs.recommended,
            pluginNodeJS.configs["flat/recommended"],
            pluginSec.configs.recommended,
            tsConfigs.eslintRecommended,
            tsConfigs.strict,
            tsConfigs.stylistic
        ],
        files: ["*.config.js", "**/*.ts"],
        languageOptions: {
            ecmaVersion: 2022,
            globals: { ...globals.node },
            parserOptions: {
                allowReserved: false,
                ecmaFeatures: { globalReturn: false, impliedStrict: true }
            },
            sourceType: "module"
        },
        plugins: { "no-secrets": pluginNoSecrets },
        rules: {
            "import/order": "off",
            "n/no-missing-import": "off",
            "no-secrets/no-pattern-match": "error",
            "no-secrets/no-secrets": "error",
            "sort-imports": "off"
        },
        settings: { "import/resolver": { typescript: true } }
    },
    {
        files: ["*.config.js"],
        languageOptions: { globals: { ...globals.node } },
        settings: { "import/resolver": { node: true } }
    },
    {
        extends: [pluginJSON.configs.recommended],
        files: ["**/*.json"],
        language: "json/json",
        rules: { "json/sort-keys": "error" }
    },
    {
        extends: [pluginJSON.configs.recommended],
        files: ["**/*.jsonc"],
        language: "json/jsonc",
        rules: { "json/sort-keys": "error" }
    }
])
