module.exports = {
    extends: [
        'airbnb',
        'takiyon',
    ],
    rules: {
        'jsx-a11y/label-has-for': 'off',
        'react/jsx-filename-extension': 'off',
        'react/jsx-indent': ['error', 4],
        'react/jsx-indent-props' : ['error', 4],
        'react/jsx-props-no-spreading': ['error', {
            html: 'ignore',
            custom: 'enforce',
            exceptions: [],
        }],
        'react/jsx-sort-props': ['error', {
            callbacksLast: true,
            reservedFirst: ['key'],
        }],
        'react/sort-prop-types': ['error', {
            callbacksLast: true,
            requiredFirst: true,
        }],
        'react/state-in-constructor': 'off',
        'react/static-property-placement': ['error', 'static public field'],
    },
};
