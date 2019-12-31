module.exports = {
  root: true,
  extends: [
    "airbnb",
    "prettier",
    "prettier/react",
    "plugin:prettier/recommended",
    "eslint-config-prettier",
  ],
  rules: {
    "import/no-unresolved": "off",
    "react/jsx-filename-extension": [
      1,
      {
        "extensions": [".js", ".jsx"]
      }
    ],
    "prettier/prettier": [
      "error",
      {
        "singleQuote": true,
        "trailingComma": "all",
        "tabWidth": 2,
        "semi": true,
        "printWidth": 80,
      }
    ],
    "react/prop-types": [0],
    "no-use-before-define": ["error", { "variables": false }],
    "react-hooks/rules-of-hooks": "error",
    "react-hooks/exhaustive-deps": "warn"
  },
  plugins: [
    "prettier",
    "react-hooks"
  ]
}
