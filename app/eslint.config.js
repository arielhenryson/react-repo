import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks' // Keep this import
import reactRefresh from 'eslint-plugin-react-refresh' // Keep this import
import tseslint from 'typescript-eslint'
import prettierRecommended from 'eslint-plugin-prettier/recommended' // Import the Prettier recommended config object
// import prettierPlugin from 'eslint-plugin-prettier'; // Optional but good practice to import the plugin itself if needed elsewhere

export default tseslint.config(
  // 1. Global ignores
  { ignores: ['dist'] },

  // 2. Base ESLint recommended rules
  js.configs.recommended,

  // 3. TypeScript recommended rules (this spreads one or more config objects)
  ...tseslint.configs.recommended,

  // 4. Prettier recommended configuration (this MUST come AFTER eslint/ts rules to override stylistic rules)
  prettierRecommended, // Use the imported config object directly

  // 5. Your custom configuration for TS/TSX files
  {
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      // ecmaVersion is usually set by recommended configs, no need to repeat unless overriding
      globals: {
        ...globals.browser, // Spread browser globals
      },
      // parser and parserOptions are typically set by tseslint.configs.recommended
      // If using type-aware rules, ensure 'project: true' is set by tseslint.configs.recommended
      // or add parserOptions here:
      // parserOptions: {
      //   project: true,
      //   tsconfigRootDir: import.meta.dirname, // Or specify the path to tsconfig.json
      // }
    },
    plugins: {
      // Plugins providing the rules used below
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
      // '@typescript-eslint' plugin is usually included via tseslint.configs.recommended
      // 'prettier' plugin is usually included via prettierRecommended config object
    },
    rules: {
      // Apply React Hooks recommended rules
      ...reactHooks.configs.recommended.rules,

      // Apply your specific React Refresh rule
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],

      // REMOVE manual stylistic rules handled by Prettier
      // '@typescript-eslint/semi': ['error', 'never'], // REMOVED - Let Prettier handle this via prettierRecommended

      // Add any other specific rule overrides here if necessary
      // e.g., '@typescript-eslint/no-unused-vars': 'warn',
    },
  },
)
