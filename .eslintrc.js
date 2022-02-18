module.exports = {
  /* A人 */
/*  parserOptions: {
    parser: '@typescript-eslint/parser',
    ecmaVersion: 2020,
    sourceType: 'module',
    ecmaFeatures: {
      ts: true
    }
  },*/
  extends: [
    'plugin:vue/vue3-recommended'
  ],
  /* B人 */
 /* extends: [
    'plugin:vue/vue3-recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier',
    'plugin:prettier/recommended'
  ],*/

  rules: {
    // 错误代码提示规则
    'prettier/prettier':'error',
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    '@typescript-eslint/no-empty-function':'warn',

    'vue/max-attributes-per-line': ['error', {
      singleline: 5 //标签超出5个属性就会换行
    }],
    'vue/script-setup-uses-vars': 'error', // setup 语法糖校验
    'object-curly-spacing': ['error', 'never'], // 对象前后不加空格 { a: 1 }
    'array-bracket-spacing': ['error', 'never'], // 数组前后不加空格 [ 1, 2 ]
    'array-bracket-newline': ['error', { "minItems": 5}], // 数组超过五个值可以换行
    'arrow-spacing': "error", //箭头函数前后加空格 () => {}
    // 'vue/no-unsupported-features': ['error', { // 校验不支持的特性
    //   'version': "^3.0.0",
    //   'ignores': [],
    // }]
    'vue/block-tag-newline': ['error', { //  标签直接的换行规范
      "singleline": "always",
      "multiline": "always",
      "maxEmptyLines": 0,
      "blocks": {
        "script": {
          "singleline": "always",
          "multiline": "always",
          "maxEmptyLines": 0,
        },
        "template": {
          "singleline": "always",
          "multiline": "always",
          "maxEmptyLines": 0,
        },
        "my-block": {
          "singleline": "always",
          "multiline": "always",
          "maxEmptyLines": 0,
        }
      }
    }],
    // 'vue/no-unused-properties': ['error', { // 未使用的props， 数据， 和方法
    //   "groups": ['props', 'data', 'methods']
    // }],
  }
}
