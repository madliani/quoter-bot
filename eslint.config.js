import pluginJS from "@eslint/js"
import pluginJSON from "@eslint/json"
import pluginImport from "eslint-plugin-import"
import pluginNoSecrets from "eslint-plugin-no-secrets"
import pluginPerfect from "eslint-plugin-perfectionist"
import { defineConfig, globalIgnores } from "eslint/config"
import typescript from "typescript-eslint"

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
            pluginPerfect.configs["recommended-alphabetical"],
            pluginImport.flatConfigs.recommended,
            pluginImport.flatConfigs.typescript,
            pluginJS.configs.recommended,
            typescript.configs.eslintRecommended,
            typescript.configs.strict,
            typescript.configs.stylistic
        ],
        files: ["*.config.js", "**/*.ts"],
        languageOptions: {
            ecmaVersion: 2022,
            globals: {},
            parser: typescript.parser,
            parserOptions: {
                allowReserved: false,
                ecmaFeatures: { globalReturn: false, impliedStrict: true }
            },
            sourceType: "module"
        },
        plugins: { "no-secrets": pluginNoSecrets },
        rules: {
            "import/no-named-as-default-member": "off",
            "import/order": "off",
            "n/no-missing-import": "off",
            "no-secrets/no-pattern-match": "error",
            "no-secrets/no-secrets": "error",
            "sort-imports": "off"
        },
        settings: { "import/resolver": { typescript: true } }
    },
    { files: ["*.config.js"], settings: { "import/resolver": { node: true } } },
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
