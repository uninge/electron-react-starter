const OFF = 0;
const WARN = 1;

module.exports = {
  root: true,
  env: { browser: true, commonjs: true, es6: true, node: true },
  settings: {
    'import/ignore': ['node_modules'],
    node: { extensions: ['.ts'] },
  },
  globals: { document: true, window: true, process: true },
  parserOptions: {
    sourceType: 'module',
    project: './tsconfig.json',
    tsconfigRootDir: __dirname,
    ecmaVersion: 2018,
    ecmaFeatures: {
      jsx: true,
      impliedStrict: true,
      legacyDecorators: true,
      experimentalObjectRestSpread: true,
    },
    warnOnUnsupportedTypeScriptVersion: true,
    projectFolderIgnoreList: ['dist', '**/node_modules/**'],
  },
};
