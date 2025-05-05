const { defineConfig } = require('eslint/config');

const js = require('@eslint/js');

const { FlatCompat } = require('@eslint/eslintrc');

const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
});

module.exports = defineConfig([
  {
    files: ['src/**/*.tsx'],
    extends: compat.extends('jarvis'),

    languageOptions: {
      globals: {},

      parserOptions: {
        project: './tsconfig.json',
        tsconfigRootDir: __dirname,
        projectFolderIgnoreList: ['.rush', 'dist', '**/node_modules/**'],
      },
    },
    rules: {},
  },
]);
