import { FlatCompat } from "@eslint/eslintrc";
import js from "@eslint/js";
import next from "@next/eslint-plugin-next";
import react from "eslint-plugin-react";
import tailwindcss from "eslint-plugin-tailwindcss";
import globals from "globals";

const compat = new FlatCompat({
  baseDirectory: import.meta.dirname,
  recommendedConfig: js.configs.recommended,
});

const eslintConfig = [
  {
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: "module",
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
    plugins: {
      react: react,
      tailwindcss: tailwindcss,
      next: next,
    },
    settings: {
      react: {
        version: "detect",
      },
    },
  },
  ...compat.config({
    extends: [
      "eslint:recommended",
      "plugin:react/recommended",
      "plugin:tailwindcss/recommended",
      "plugin:@next/next/recommended",
      "prettier",
    ],
    rules: {
      "no-unused-vars": "warn",
      "no-console": "off",
      "linebreak-style": ["error", "unix"],
      "no-implicit-globals": "error",
      "no-warning-comments": ["error", { terms: ["todo", "fixme"] }],
      "padding-line-between-statements": [
        "error",
        {
          blankLine: "always",
          prev: "*",
          next: [
            "break",
            "case",
            "cjs-export",
            "class",
            "continue",
            "do",
            "if",
            "switch",
            "try",
            "while",
            "return",
          ],
        },
        {
          blankLine: "always",
          prev: [
            "break",
            "case",
            "cjs-export",
            "class",
            "continue",
            "do",
            "if",
            "switch",
            "try",
            "while",
            "return",
          ],
          next: "*",
        },
      ],
      curly: "error",
      "react/react-in-jsx-scope": "off",
      "react/prop-types": "off",
      "tailwindcss/classnames-order": "off",
    },
  }),
];

export default eslintConfig;
