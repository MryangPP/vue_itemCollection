/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution')

module.exports = {
  env: {
    browser: true,
    es2021: true,
    // 建议补充的配置
    node: true // 启用Node.js全局变量
  },
  extends: [
    'eslint:recommended',
    // 建议补充的扩展
    'plugin:import/recommended' // 添加import插件
  ],
  parserOptions: {
    // 必须添加的解析器选项
    ecmaVersion: 'latest',
    sourceType: 'module'
  },
  settings: {
    // 建议添加的import解析配置
    'import/resolver': {
      node: {
        extensions: ['.js', '.mjs']
      }
    }
  },
  rules: {
    'no-console': 'warn',
    // 建议添加的常用规则
    'no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
    'prefer-const': 'error',
    'arrow-body-style': ['error', 'as-needed'],
    'import/order': [
      'error',
      {
        groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index'],
        'newlines-between': 'always'
      }
    ]
  },
  overrides: [
    // 建议添加针对不同文件的覆盖配置
    {
      files: ['**/*.test.js'],
      env: {
        jest: true
      }
    },
    {
      files: ['*.config.js'],
      rules: {
        'no-console': 'off'
      }
    }
  ]
}
