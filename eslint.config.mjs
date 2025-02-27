import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";
import prettierPlugin from "eslint-plugin-prettier";

/** @type {import('eslint').Linter.Config[]} */
export default [
  {
    files: ["**/*.{js,mjs,cjs,ts}"],
    ignores: [
      "node_modules",
      "dist",
      "*.spec.ts",
      "*.spec.js",
      "*.test.ts",
      "*.test.js"
    ],
    rules: {
      "@typescript-eslint/no-explicit-any": "off"
    },
    plugins: {
      prettier: prettierPlugin
    }
  },
  { languageOptions: { globals: globals.node, parser: "@typescript-eslint/parser" } },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended
];