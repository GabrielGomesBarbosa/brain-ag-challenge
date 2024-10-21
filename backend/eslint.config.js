const eslintPluginPrettier = require("eslint-plugin-prettier");
const eslintParserTypescript = require("@typescript-eslint/parser");
const eslintPluginTypescript = require("@typescript-eslint/eslint-plugin");

module.exports = [
  {
    ignores: ["node_modules/", "dist/"], // Ignoring specific directories
  },
  {
    files: ["**/*.ts"], // Targeting TypeScript files
    languageOptions: {
      ecmaVersion: 2021, // ECMAScript version
      parser: eslintParserTypescript, // Using TypeScript parser
      sourceType: "module", // Setting module type
    },
    plugins: {
      "@typescript-eslint": eslintPluginTypescript,
      prettier: eslintPluginPrettier,
    },
    rules: {
      "prettier/prettier": ["error", { semi: false }], // Prettier config: no semicolons
      "no-console": "warn", // Warn on console logs
      "@typescript-eslint/no-unused-vars": "error", // Error on unused variables
      semi: ["error", "never"], // Disallow semicolons in general
    },
  },
];
