import globals from 'globals';
import js from '@eslint/js';
import ts from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import jsxA11y from 'eslint-plugin-jsx-a11y';
import importPlugin from 'eslint-plugin-import';

export default [
  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: globals.browser,
      ecmaFeatures: {
        jsx: true,
      },
      parser: tsParser, // Using TypeScript parser for .ts/.tsx files
    },
    plugins: {
      react,
      'react-hooks': reactHooks,
      'jsx-a11y': jsxA11y,
      '@typescript-eslint': ts,
      import: importPlugin,
    },
    rules: {
      ...js.configs.recommended.rules, // Base recommended rules for JS
      ...ts.configs.recommended.rules, // Recommended rules for TypeScript
      ...react.configs.recommended.rules, // React recommended rules
      ...reactHooks.configs.recommended.rules, // React hooks rules
      ...jsxA11y.configs.recommended.rules, // Accessibility rules
      ...importPlugin.configs.recommended.rules, // Import plugin rules

      // Custom rules
      'jsx-a11y/no-autofocus': 'off', // Turn off autofocusing rule
    },
    settings: {
      react: {
        version: 'detect', // Automatically detect React version
      },
      'import/internal-regex': '^~/', // Internal alias for imports
      'import/resolver': {
        node: {
          extensions: ['.js', '.jsx', '.ts', '.tsx'],
        },
        typescript: {
          alwaysTryTypes: true,
        },
        alias: {
          map: [['~', './app']], // Alias '~' to './app' directory
          extensions: ['.js', '.jsx', '.ts', '.tsx'],
        },
      },
    },
  },
  {
    files: ['.eslintrc.js', 'vite.config.js'],
    languageOptions: {
      globals: globals.node,
    },
    rules: {
      '@typescript-eslint/no-var-requires': 'off', // Allow `require` in Node.js config files
    },
  },
];
