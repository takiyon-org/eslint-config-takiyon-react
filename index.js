module.exports = {
    extends: [
        'airbnb',
        'takiyon',
    ],
    rules: {
        'react/jsx-filename-extension': 'off',
        'react/jsx-indent': ['error', 4],
        'react/jsx-indent-props' : ['error', 4],
        'react/jsx-sort-props': ['error', {
            callbacksLast: true,
            reservedFirst: ['key'],
        }],
        'react/sort-prop-types': ['error', {
            callbacksLast: true,
            requiredFirst: true,
        }],
    },
};
