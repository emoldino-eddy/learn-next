import tseslint from 'typescript-eslint';
import eslint from '@eslint/js';
import nextPlugin from '@next/eslint-plugin-next';
import reactQuery from '@tanstack/eslint-plugin-query';
import reactHooks from 'eslint-plugin-react-hooks';
import react from 'eslint-plugin-react';

export default tseslint.config(
  reactQuery.configs['flat/recommended'],
  eslint.configs.recommended,
  tseslint.configs.recommended,
  tseslint.configs.strictTypeChecked,
  tseslint.configs.stylisticTypeChecked,
  react.configs.flat.recommended,
  react.configs.flat['jsx-runtime'],
  reactHooks.configs['recommended-latest'],
  {
    files: ['**/*.ts', '**/*.tsx'],
    languageOptions: {
      parserOptions: {
        tsconfigRootDir: import.meta.dirname,
        project: ['./tsconfig.json'],
      },
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
  },
  {
    plugins: {
      '@next/next': nextPlugin,
    },

    rules: {
      ...nextPlugin.configs.recommended.rules,
      ...nextPlugin.configs['core-web-vitals'].rules,
    },
  }

  // reactPlugin.configs.flat.recommended,
  // reactPlugin.configs.flat['jsx-runtime'],
  // reactHooks.configs['recommended-latest']
  // {
  //   plugins: {
  //     'react-hooks': reactHooks,
  //   },
  //   rules: {
  //     ...reactHooks.configs.recommended.rules,
  //   },
  // },
  // {
  //   plugins: {
  //     react: react,
  //   },
  //   rules: {
  //     ...react.configs.recommended.rules,
  //   },
  // }
  // reactHooks.configs.flat.recommended,
);
