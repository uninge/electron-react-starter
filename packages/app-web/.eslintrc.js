const OFF = 0;
const WARN = 1;

module.exports = {
  root: true,
  extends: ['jarvis'],
  env: { browser: true, commonjs: false, es6: true, node: false },
  globals: { document: true, window: true, process: false },
  parserOptions: {
    project: './tsconfig.json',
    tsconfigRootDir: __dirname,
    projectFolderIgnoreList: ['.rush', 'dist', '**/node_modules/**'],
  },
};
