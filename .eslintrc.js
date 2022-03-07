module.exports = {
    root: true,
    env: {
        node: true
    },
    extends: [
        'eslint:recommended',
        'plugin:vue/vue3-essential',
        //避免与 prettier 冲突
        'plugin:prettier/recommended'
    ],
    globals: {
        defineProps: "readonly",
        defineEmits: "readonly",
        defineExpose: "readonly",
        withDefaults: "readonly",
    },
    parser: 'vue-eslint-parser',
    parserOptions: {
        parser: '@typescript-eslint/parser',
        vueFeatures: {
            //      "filter": true,
            interpolationAsNonHTML: false,
            styleCSSVariableInjection: true
        }
    },
    plugins: ['@typescript-eslint'],
    ignorePatterns: ['types/**.d.ts', 'node_modules/**', '**/dist/**'],
    rules: {
        'prettier/prettier':'error',
        "no-debugger": process.env.NODE_ENV === "production" ? "warn" : "off",
        "no-console": process.env.NODE_ENV === "production" ? "warn" : "off", //禁用 console
         "no-unused-vars": 1, //禁止出现未使用过的变量
        '@typescript-eslint/no-unused-vars': 'warn', // 禁止出现未使用过的变量
        '@typescript-eslint/ban-types': 'off',
        '@typescript-eslint/no-explicit-any': 'off',
        '@typescript-eslint/no-var-requires': 'off',
        '@typescript-eslint/explicit-module-boundary-types': 'off',
        '@typescript-eslint/consistent-type-imports': 'error',

        /**
         * 这将使命中的变化历史变得更清晰
         */
        'comma-dangle': ['warn', 'always-multiline'],
        'vue/max-attributes-per-line': ['error', { singleline: 5 }], //标签超出5个属性就会换行

    }
}
