import js from "@eslint/js";
import tseslint from "typescript-eslint";

export default tseslint.config(
  { ignores: ["dist/", "site/", "node_modules/", "test-results/", "playwright-report/", "src/crests/", "src/steps/", "src/data/"] },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    rules: {
      "@typescript-eslint/no-unused-vars": ["error", { argsIgnorePattern: "^_", caughtErrorsIgnorePattern: "^_" }],
    },
  },
  { files: ["src/**/*.test.js", "scripts/**/*.ts", "scripts/**/*.mjs", "tsup.config.ts"], languageOptions: { globals: { console: "readonly", process: "readonly", fetch: "readonly", Buffer: "readonly", URL: "readonly", URLSearchParams: "readonly", setTimeout: "readonly", document: "readonly" } } },
  { files: ["e2e/**/*.mjs", "playwright.config.mjs"], languageOptions: { globals: { console: "readonly", URL: "readonly", document: "readonly", window: "readonly", location: "readonly", getComputedStyle: "readonly", localStorage: "readonly", navigator: "readonly", fetch: "readonly", innerHeight: "readonly", setTimeout: "readonly", Image: "readonly", NodeFilter: "readonly" } } },
  { files: ["scripts/readme-pictures.mjs", "scripts/readme-pictures-lib.mjs"], languageOptions: { globals: { getComputedStyle: "readonly", window: "readonly", document: "readonly" } } },
  { files: ["demo/**/*.js"], languageOptions: { globals: { console: "readonly", matchMedia: "readonly", setInterval: "readonly", clearInterval: "readonly", performance: "readonly", btoa: "readonly", unescape: "readonly", document: "readonly", window: "readonly", location: "readonly", history: "readonly", navigator: "readonly", URLSearchParams: "readonly", setTimeout: "readonly", clearTimeout: "readonly", localStorage: "readonly", sessionStorage: "readonly", familyLanguage: "readonly", familyHelp: "readonly", CustomEvent: "readonly", Node: "readonly", Image: "readonly", Blob: "readonly", URL: "readonly", requestAnimationFrame: "readonly", fetch: "readonly", HTMLElement: "readonly", getComputedStyle: "readonly", IntersectionObserver: "readonly", ResizeObserver: "readonly", DOMPoint: "readonly", DOMMatrix: "readonly", CSS: "readonly", Element: "readonly" } } },
);
