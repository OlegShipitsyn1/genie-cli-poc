export default {
  'env': {
    'node': true,
    'browser': true
  },
  'rules': {
    'no-var': 'error',
    'no-extend-native': 0,
    'no-new': 0,
    'no-useless-escape': 0,
    'no-useless-constructor': 0,
    'no-trailing-spaces': 2,
    'indent': [
      'error',
      2
    ],
    'space-infix-ops': 2,
    'space-before-function-paren': [
      'error',
      {
        'anonymous': 'always',
        'named': 'always',
        'asyncArrow': 'always'
      }
    ],
    'semi': [
      'error',
      'never'
    ],
    'comma-dangle': 0,
    'no-console': 0,
    'no-debugger': 0,
    'id-length': 0,
    'eol-last': 0,
    'object-curly-spacing': [
      'error',
      'always'
    ],
    'array-bracket-spacing': [
      'error',
      'always'
    ],
    'arrow-spacing': 'error',
    'no-multiple-empty-lines': 'error',
    'no-unused-vars': 'error',
    'spaced-comment': 'error',
    'quotes': [
      'error',
      'single',
      {
        'allowTemplateLiterals': true
      }
    ],
    'no-unreachable': 'error',
    'keyword-spacing': 'error',
    'space-before-blocks': 'error',
    'semi-spacing': 'error',
    'comma-spacing': 'error',
    'key-spacing': 'error',
    'prefer-const': [
      'error',
      {
        'destructuring': 'any',
        'ignoreReadBeforeAssign': false
      }
    ],
    'no-irregular-whitespace': 2
  }
}