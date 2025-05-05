module.exports = {
  root: true,
  globals: { document: false, window: false, process: true },
  env: { browser: false, commonjs: true, es6: true, node: true },
  parserOptions: {
    project: './tsconfig.json',
    tsconfigRootDir: __dirname,
    projectFolderIgnoreList: ['.rush', 'dist', '**/node_modules/**'],
  },
};
