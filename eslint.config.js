import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import tseslint from 'typescript-eslint';
import importPlugin from 'eslint-plugin-import';

export default tseslint.config(
  { ignores: ['dist'] },
  {
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
      import: importPlugin,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
      eqeqeq: 'error',
      'dot-notation': 'warn',
      'no-unused-vars': 'error',
      'import/order': [
        'error',
        {
          groups: [
            'builtin',
            'external',
            ['sibling', 'parent', 'internal'],
            'object',
          ],
          pathGroups: [
            {
              pattern: 'react',
              group: 'builtin',
            },
            {
              pattern: 'react-dom',
              group: 'builtin',
            },
            {
              pattern: 'react-router-dom',
              group: 'external',
            },
            {
              pattern: '@tanstack/**',
              group: 'external',
            },
            {
              pattern: './**',
              group: 'sibling',
            },
            {
              pattern: '../**',
              group: 'parent',
            },
            {
              pattern: '@/pages/**',
              group: 'internal',
            },
            {
              pattern: '@/layout/**',
              group: 'internal',
            },
            {
              pattern: '@/components/**',
              group: 'internal',
            },
            {
              pattern: '@/assets/**',
              group: 'internal',
            },
            {
              pattern: '@/api/**',
              group: 'object',
            },
            {
              pattern: '@/hooks/**',
              group: 'object',
            },
            {
              pattern: '@/utils/**',
              group: 'object',
            },
            {
              pattern: '@/store/**',
              group: 'object',
            },
            {
              pattern: '@/schema/**',
              group: 'object',
            },
            {
              pattern: '@/constants/**',
              group: 'object',
            },
            {
              pattern: '@/mocks/**',
              group: 'object',
            },
            {
              pattern: '@/types/**',
              group: 'object',
            },
          ],
          pathGroupsExcludedImportTypes: ['react', 'react-dom'],
          'newlines-between': 'always',
        },
      ],
    },
  },
);
