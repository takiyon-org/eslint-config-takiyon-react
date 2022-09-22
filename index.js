module.exports = {
    extends: [
        'airbnb',
        'takiyon',
    ],
    rules: {
        // Allow `.js` files to have JSX
        'react/jsx-filename-extension': 'off',

        // Two spaces are not enough for readability
        'react/jsx-indent': ['error', 4],
        'react/jsx-indent-props' : ['error', 4],

        // Allow spreading on HTML elements in wrapper components
        'react/jsx-props-no-spreading': ['error', {
            html: 'ignore',
            custom: 'enforce',
            exceptions: [],
        }],

        // Alphabetical sort of props, with `key` first and callbacks last
        'react/jsx-sort-props': ['error', {
            callbacksLast: true,
            reservedFirst: ['key'],
        }],

        // Alphabetical sort of prop types, with required props first
        'react/sort-prop-types': ['error', {
            callbacksLast: true,
            requiredFirst: true,
        }],

        // Allow author initialize state in whatever manner they prefer
        'react/state-in-constructor': 'off',

        // Require static fields in React to be static methods in class
        'react/static-property-placement': ['error', 'static public field'],
    },
};
