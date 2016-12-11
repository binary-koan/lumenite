module.exports = {
  root: true,
  parserOptions: {
    ecmaVersion: 2017,
    sourceType: 'module'
  },
  env: {
    browser: true,
    node: true
  },
  plugins: [
    'html'
  ],
  extends: 'standard',
  rules: {
    // My only complaint with 'standard'
    'space-before-function-paren': 0,

    // Allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0
  }
}
