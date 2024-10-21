const eslintPluginPrettier = require("eslint-plugin-prettier")
const eslintParserTypescript = require("@typescript-eslint/parser")
const eslintPluginTypescript = require("@typescript-eslint/eslint-plugin")

module.exports = [
  {
    ignores: ["node_modules/", "dist/", "*/**.spec.ts"],
    ignorePatterns: ['*.spec.ts', '*.test.ts']
  },
  {
    files: ["**/*.ts"],
    languageOptions: {
      ecmaVersion: 2021,
      parser: eslintParserTypescript,
      sourceType: "module"
    },
    plugins: {
      "@typescript-eslint": eslintPluginTypescript,
      prettier: eslintPluginPrettier
    },
    rules: {
      "prettier/prettier": ["error", { semi: false }],
      "no-console": "warn",
      "@typescript-eslint/no-unused-vars": "error",
      semi: ["error", "never"]
    }
  }
];
