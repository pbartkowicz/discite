module.exports = {
    root: true,
    env: {
        node: true
    },
    extends: [
        'plugin:vue/essential',
        '@vue/standard',
        '@vue/typescript'
    ],
    parserOptions: {
        parser: '@typescript-eslint/parser'
    },
    rules: {
        'array-bracket-spacing': [ 'error', 'always' ],
        'indent': [ 'error', 4, {
            SwitchCase: 1,
            FunctionDeclaration: {
                parameters: 'first'
            }
        } ],
        'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
        'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
        'object-curly-newline': [ 'error', {
            consistent: true
        } ],
        'object-property-newline': [ 'error', {
            allowAllPropertiesOnSameLine: true
        } ],
        'quote-props': [ 'error', 'consistent-as-needed' ],
        'vue/script-indent': [ 'error', 4, {
            baseIndent: 1,
            switchCase: 1
        } ],
        'vue/no-unused-vars': [ 'error', {
            ignorePattern: '^_'
        } ]
    },
    overrides: [
        {
            files: [
                '**/__tests__/*.{j,t}s?(x)',
                '**/tests/unit/**/*.spec.{j,t}s?(x)'
            ],
            env: {
                jest: true
            }
        }, {
            files: [ '*.vue' ],
            rules: {
                indent: 'off'
            }
        }
    ]
}
