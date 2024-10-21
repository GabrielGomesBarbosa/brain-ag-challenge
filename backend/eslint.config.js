import eslintPluginPrettier from "eslint-plugin-prettier";
import eslintParserTypescript from "@typescript-eslint/parser";
import eslintPluginTypescript from "@typescript-eslint/eslint-plugin";

export default [
  {
    ignores: ["node_modules/", "dist/"],
  },
  {
    files: ["**/*.ts"],
    languageOptions: {
      ecmaVersion: 2021,
      parser: eslintParserTypescript,
      sourceType: "module",
    },
    plugins: {
      "@typescript-eslint": eslintPluginTypescript,
      prettier: eslintPluginPrettier,
    },
    rules: {
      "prettier/prettier": ["error", { "semi": false }],
      "no-console": "warn",
      "@typescript-eslint/no-unused-vars": "error",
      "semi": ["error", "never"]
    },
  },
];
