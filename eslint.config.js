import js from "@eslint/js";
import prettier from "eslint-plugin-prettier";
import prettierConfig from "eslint-config-prettier";
import babel from "@babel/eslint-parser";

export default [
  js.configs.recommended,
  prettierConfig,
  {
    ignores: ["node_modules", "dist", "build", ".env"],
  },
  {
    languageOptions: {
      parser: babel,
      parserOptions: {
        requireConfigFile: false,
        ecmaVersion: 2024,
        sourceType: "module",
        ecmaFeatures: {
          impliedStrict: true,
        },
      },
      globals: {
        process: "readonly",
        console: "readonly",
      },
    },
    plugins: {
      prettier,
    },
    rules: {
      "prettier/prettier": "error",
      "no-unused-vars": "warn",
      "no-console": "off",
      eqeqeq: ["error", "always"],
    },
  },
];
