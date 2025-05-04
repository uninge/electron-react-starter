const OFF = 0;
const WARN = 1;

module.exports = {
  root: true,
  extends: ['jarvis'],
  globals: { document: false, window: false, process: true },
  parserOptions: {
    project: './tsconfig.json',
    tsconfigRootDir: __dirname,
    projectFolderIgnoreList: ['.rush', 'dist', '**/node_modules/**'],
  },
};
