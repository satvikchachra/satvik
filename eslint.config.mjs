import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
  ]),
  {
    rules: {
      // Existing rules
      "react/no-array-index-key": "error",
      "jsx-a11y/no-redundant-roles": "error",
      
      // Accessibility & Semantic HTML
      "jsx-a11y/alt-text": "error",
      "jsx-a11y/anchor-is-valid": "error",
      "jsx-a11y/click-events-have-key-events": "error",
      
      // React & Performance
      "react/jsx-no-useless-fragment": "error",
      "react/no-unstable-nested-components": "error",
      "react/jsx-curly-brace-presence": ["error", { props: "never", children: "never" }],
      
      // Dead Code & Cleanliness
      "@typescript-eslint/no-unused-vars": "error",
      "no-console": ["warn", { allow: ["warn", "error"] }],
    },
  },
]);

export default eslintConfig;
