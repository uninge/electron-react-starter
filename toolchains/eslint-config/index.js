const OFF = 0;
const WARN = 1;
const ERROR = 2;

module.exports = {
  root: false,
  parser: '@typescript-eslint/parser',
  env: { browser: true, commonjs: true, es6: true, node: true },
  settings: {
    'import/ignore': ['node_modules'],
    node: { extensions: ['.ts'] },
  },
  globals: { document: true, window: true, process: true },
  parserOptions: {
    sourceType: 'module',
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
  plugins: [
    // 'react',
    // 'react-hooks',
    // '@typescript-eslint',
    // 'promise',
    // 'import',
    // 'comments'
  ],
  extends: [
    // 'airbnb',
    // 'prettier',
    // 'airbnb-typescript',
    // 'eslint:recommended',
    //
    // 'plugin:import/recommended',
    // 'plugin:import/typescript',
    //
    // 'plugin:promise/recommended',
    //
    // 'plugin:react/recommended',
    //
    // 'plugin:@typescript-eslint/recommended',
    // 'plugin:@typescript-eslint/recommended-requiring-type-checking',
  ],
  // overrides: [
  // 	{
  // 		files: ['*.js', '*.jsx'],
  // 		rules: {
  // 			'@typescript-eslint/unbound-method': OFF,
  // 			'@typescript-eslint/no-unsafe-call': OFF,
  // 			'@typescript-eslint/no-misused-promises': OFF,
  // 			'@typescript-eslint/no-floating-promises': OFF,
  // 			'@typescript-eslint/no-unsafe-member-access': OFF,
  // 			'@typescript-eslint/explicit-function-return-type': OFF,
  // 			'@typescript-eslint/restrict-template-expressions': OFF,
  // 			'@typescript-eslint/explicit-module-boundary-types': OFF,
  // 		},
  // 	},
  // ],
  rules: {
    semi: ERROR,
    quotes: [ERROR, 'single'],
    indent: [ERROR, 2, { SwitchCase: 1, ObjectExpression: 1 }],
    radix: [ERROR, 'as-needed'],
    'one-var': OFF,
    'func-names': ERROR,
    'global-require': WARN,
    'prefer-destructuring': ERROR,
    'object-curly-spacing': [ERROR, 'always'],

    'no-var': ERROR,
    'no-tabs': ERROR,
    'no-proto': ERROR,
    'no-alert': ERROR,
    'no-undef': ERROR,
    'no-empty': ERROR,
    'no-bitwise': ERROR,
    'no-debugger': ERROR,
    'no-iterator': ERROR,
    'no-script-url': WARN,
    'no-lonely-if': ERROR,
    'no-new-object': ERROR,
    'no-undef-init': ERROR,
    'no-else-return': ERROR,
    'no-unreachable': ERROR,
    'no-unused-vars': WARN,
    'no-return-await': ERROR,
    'no-multi-assign': ERROR,
    'no-self-compare': ERROR,
    'no-return-assign': ERROR,
    'no-useless-concat': ERROR,
    'no-nested-ternary': ERROR,
    'no-useless-return': ERROR,
    'no-mixed-operators': ERROR,
    'no-unneeded-ternary': ERROR,
    'no-restricted-syntax': WARN,
    'no-underscore-dangle': WARN,
    'no-this-before-super': ERROR,
    'no-constant-condition': ERROR,
    'no-restricted-globals': ERROR,
    'no-unused-expressions': ERROR,
    'no-whitespace-before-property': ERROR,
    'no-shadow': [WARN, { builtinGlobals: true }],
    'no-param-reassign': [ERROR, { props: false }],
    'no-plusplus': [ERROR, { allowForLoopAfterthoughts: true }],
    // 'no-console': process.env.NODE_ENV === 'production' ? WARN : OFF,
    'no-use-before-define': [ERROR, { functions: false, classes: false }],

    // 'arrow-parens': ERROR,
    // 'arrow-spacing': ERROR,
    // 'arrow-body-style': [ERROR, 'as-needed'],
    //
    // 'max-depth': [ERROR, 2],
    // 'max-params': [ERROR, 4],
    // 'max-len': [ERROR, { code: 120 }],
    // 'max-lines-per-function': [WARN, 200],
    // 'max-lines': [ERROR, { max: 800, skipBlankLines: true, skipComments: true }],
    //
    // 'consistent-return': ERROR,
    // 'class-methods-use-this': WARN,
    // 'comma-dangle': [ERROR, 'always-multiline'],
    // 'object-curly-newline': [ERROR, { multiline: true }],
    //
    // 'linebreak-style': [ERROR, 'unix'],
    // 'lines-between-class-members': ERROR,
    //
    // 'promise/always-return': WARN,
    //
    // 'import/extensions': OFF,
    // 'import/no-unresolved': OFF,
    // 'import/no-dynamic-require': WARN,
    // 'import/prefer-default-export': WARN,
    // 'import/no-import-module-exports': OFF,
    // 'import/no-extraneous-dependencies': [
    // 	ERROR,
    // 	{ devDependencies: true, optionalDependencies: false, peerDependencies: false },
    // ],
    //
    // '@typescript-eslint/no-var-requires': ERROR,
    // '@typescript-eslint/no-unsafe-return': ERROR,
    // '@typescript-eslint/no-unused-vars': ERROR,
    // '@typescript-eslint/unbound-method': ERROR,
    // '@typescript-eslint/no-unsafe-call': ERROR,
    // '@typescript-eslint/no-misused-promises': ERROR,
    // '@typescript-eslint/no-floating-promises': ERROR,
    // '@typescript-eslint/no-unsafe-member-access': ERROR,
    // '@typescript-eslint/explicit-function-return-type': OFF,
    // '@typescript-eslint/restrict-template-expressions': WARN,
    // '@typescript-eslint/explicit-module-boundary-types': OFF,
    // '@typescript-eslint/no-use-before-define': [ERROR, { functions: false, classes: false }],
    //
    // 'react/jsx-no-bind': OFF,
    // 'react/no-danger': ERROR,
    // 'react/no-string-refs': ERROR,
    // 'react/no-this-in-sfc': ERROR,
    // 'react/forbid-prop-types': OFF,
    // 'react/no-array-index-key': ERROR,
    // // 'react/jsx-indent': [ERROR, 'tab'],
    // 'react/require-default-props': OFF,
    // 'react-hooks/rules-of-hooks': ERROR,
    // 'react/jsx-props-no-spreading': OFF,
    // 'react/destructuring-assignment': OFF,
    // // 'react/jsx-indent-props': [ERROR, 'tab'],
    // 'react/jsx-one-expression-per-line': ERROR,
    // 'react/no-access-state-in-setstate': ERROR,
    // 'react/function-component-definition': [ERROR, { namedComponents: 'arrow-function' }],
    // 'react/jsx-wrap-multilines': [ERROR, { declaration: false, assignment: false }],
    // 'react/jsx-filename-extension': [ERROR, { extensions: ['.js', '.jsx', '.ts', '.tsx'] }],
  },
};
