import globals from 'globals'
import pluginJs from '@eslint/js'
import pluginVue from 'eslint-plugin-vue'
import pluginTs from '@typescript-eslint/eslint-plugin'
import eslintConfigPrettier from 'eslint-config-prettier'

/** @type {import('eslint').Linter.FlatConfig[]} */
export default [
  // 基础配置
  {
    files: ['**/*.{js,mjs,cjs,ts,vue}'],
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node
      },
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        extraFileExtensions: ['.vue']
      }
    },
    ignores: ['**/node_modules/', 'dist/', '*.d.ts']
  },

  // JavaScript 配置
  {
    files: ['**/*.{js,mjs,cjs}'],
    ...pluginJs.configs.recommended,
    rules: {
      'no-console': 'warn',
      'no-debugger': 'error',
      'no-unused-vars': 'warn'
    }
  },

  // TypeScript 配置
  {
    files: ['**/*.ts'],
    plugins: {
      '@typescript-eslint': pluginTs
    },
    languageOptions: {
      parser: pluginTs.parser
    },
    rules: {
      ...pluginTs.configs.recommended.rules,
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/ban-ts-comment': 'warn'
    }
  },

  // Vue 3 配置
  ...pluginVue.configs['flat/recommended'],
  {
    files: ['**/*.vue'],
    rules: {
      'vue/multi-word-component-names': 'off',
      'vue/require-default-prop': 'error',
      'vue/no-v-html': 'warn',
      'vue/html-self-closing': [
        'error',
        {
          html: {
            void: 'always',
            normal: 'always',
            component: 'always'
          }
        }
      ]
    }
  },

  // 测试文件配置
  {
    files: ['**/*.test.{js,ts}'],
    languageOptions: {
      globals: {
        ...globals.jest
      }
    }
  },

  // Prettier 集成（需安装prettier）
  eslintConfigPrettier,

  // 自定义规则扩展
  {
    rules: {
      'arrow-body-style': ['error', 'as-needed'],
      'prefer-const': 'error',
      'no-var': 'error',
      'object-shorthand': ['error', 'always'],
      'vue/component-api-style': ['error', ['script-setup']]
    }
  }
]
