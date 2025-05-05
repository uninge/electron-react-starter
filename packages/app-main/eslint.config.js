const { defineConfig } = require('eslint/config');

const globals = require('globals');

module.exports = defineConfig([
  {
    languageOptions: {
      globals: {
        ...Object.fromEntries(Object.entries(globals.browser).map(([key]) => [key, 'off'])),
        ...globals.commonjs,
        ...globals.node,
        document: false,
        window: false,
        process: true,
      },

      parserOptions: {
        project: './tsconfig.json',
        tsconfigRootDir: __dirname,
        projectFolderIgnoreList: ['.rush', 'dist', '**/node_modules/**'],
      },
    },
  },
]);
