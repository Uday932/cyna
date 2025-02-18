module.exports = {
  plugins: ["react", "tailwindcss", "prettier"],
  extends: [
    "eslint:recommended",
    "prettier",
    "next",
    "plugin:tailwindcss/recommended",
    "plugin:react/recommended",
  ],
  env: {
    es2022: true,
    node: true,
  },
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
  rules: {
    indent: "off",
    "linebreak-style": ["error", "unix"],
    quotes: [
      "error",
      "double",
      {
        avoidEscape: true,
        allowTemplateLiterals: true,
      },
    ],
    semi: ["off"],
    "no-console": "off",
    "no-implicit-globals": "error",
    "no-warning-comments": [
      "error",
      {
        terms: ["fixme", "todo"],
      },
    ],
    "newline-before-return": "error",
    curly: "error",
    "padded-blocks": ["error", "never"],
    "space-before-blocks": "error",
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
    "react-hooks/rules-of-hooks": "error",
    "react-hooks/exhaustive-deps": "warn",
    "react/no-unescaped-entities": [
      "error",
      {
        forbid: [">", "}"],
      },
    ],
    "react/react-in-jsx-scope": "off",
    "react/prop-types": "off",
    "tailwindcss/classnames-order": "off",
  },
  settings: {
    react: {
      version: "detect",
    },
  },
};
 