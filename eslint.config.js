import js from "@eslint/js";
import prettier from "eslint-plugin-prettier";
import prettierConfig from "eslint-config-prettier";

export default [
  js.configs.recommended,
  prettierConfig,
  {
    ignores: ["node_modules", "dist", "build", ".env"],
  },
  {
    languageOptions: {
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
