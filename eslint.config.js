// @ts-check

const eslint = require("@eslint/js");
const tseslint = require("typescript-eslint");
// @ts-ignore
const reactRecommended = require("eslint-plugin-react/configs/recommended");

module.exports = tseslint.config(
    eslint.configs.recommended,
    ...tseslint.configs.recommended,
    reactRecommended,
    {
        ignores: ["dist/**/*", "eslint.config.js"],
    }
);
