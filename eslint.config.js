const js = require("@eslint/js");
const globals = require("globals");

module.exports = [
  js.configs.recommended,

  {
    files: ["script.js"],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: "commonjs",
      globals: {
        ...globals.browser,
        module: "readonly",
      },
    },
  },

  {
    files: ["test/**/*.js"],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: "commonjs",
      globals: {
        ...globals.node,
        ...globals.jest,
        ...globals.browser,
      },
    },
  },

  {
    files: ["*.config.js"],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: "commonjs",
      globals: globals.node,
    },
  },

  {
    rules: {
      semi: ["error", "always"],
      quotes: ["error", "double"],
      "no-unused-vars": "error",
      eqeqeq: "error",
      "no-var": "error",
      "prefer-const": "error",
    },
  },

  {
    ignores: ["node_modules/", "coverage/"],
  },
];
