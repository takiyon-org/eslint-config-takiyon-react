import { FlatCompat } from '@eslint/eslintrc';
import takiyonConfig from 'eslint-config-takiyon';

const compat = new FlatCompat();

export default [
    ...compat.extends('eslint-config-airbnb'),
    ...takiyonConfig,
    {
        files: [
            '**/*.{js,cjs,mjs,jsx}',
        ],
        ignores: ['./node_modules/**/*'],
        rules: {
            // Allow either `htmlFor` or a label encapsulating an input
            'jsx-a11y/label-has-associated-control': ['error', {
                assert: 'either',
            }],

            // Force JSX files to have `.jsx` extension
            'react/jsx-filename-extension': ['error', {
                allow: 'as-needed',
                extensions: ['jsx'],
            }],

            // Two spaces are not enough for readability
            'react/jsx-indent': ['error', 4],
            'react/jsx-indent-props': ['error', 4],

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

            // Require default props to be arguments for functions
            'react/require-default-props': ['error', {
                forbidDefaultForRequired: true,
                functions: 'defaultArguments',
            }],

            // Alphabetical sort of prop types, with required props first
            'react/sort-prop-types': ['error', {
                callbacksLast: true,
                requiredFirst: true,
            }],

            // Allow author to initialize state in whatever manner they prefer
            'react/state-in-constructor': 'off',

            // Require static fields in React to be in class
            'react/static-property-placement': ['error', 'static public field'],
        },
    }
];
