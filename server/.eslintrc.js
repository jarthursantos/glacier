module.exports = {
  env: {
    browser: true,
    es2020: true,
    node: true,
    jest: true
  },
  extends: ['standard', 'plugin:@typescript-eslint/recommended'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: 11,
    sourceType: 'module'
  },
  plugins: ['@typescript-eslint', 'prettier', 'eslint-plugin-import-helpers'],
  rules: {
    'import-helpers/order-imports': [
      'warn',
      {
        newlinesBetween: 'always',
        groups: [
          'module',
          '/^@shared/',
          '/^~/',
          ['parent', 'sibling', 'index']
        ],
        alphabetize: { order: 'asc', ignoreCase: true }
      }
    ],
    camelcase: 'off',
    'prettier/prettier': 'error',
    'space-before-function-paren': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    'generator-star-spacing': 'off',
    '@typescript-eslint/ban-types': 'off',
    'import/no-duplicates': 'off',
    'no-useless-constructor': 'off',
    'no-use-before-define': 'off',
    'no-case-declarations': 'off',
    'no-prototype-builtins': 'off',
    indent: 'off',
    'no-new': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off'
  },
  settings: {
    'import/resolver': {
      typescript: {}
    }
  }
}
