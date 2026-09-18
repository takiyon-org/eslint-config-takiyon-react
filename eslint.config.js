import { createRequire } from 'node:module';
import { fixupPluginRules } from '@eslint/compat';
import { FlatCompat } from '@eslint/eslintrc';
import takiyonConfig from 'eslint-config-takiyon';

const compat = new FlatCompat();
const require = createRequire(import.meta.url);

/**
 * Resolve the installed React version ourselves.
 *
 * eslint-config-airbnb sets `settings.react.version` to `'detect'`, which makes eslint-plugin-react
 * call `context.getFilename()`. That method was removed in ESLint 10, so linting crashes.
 * Returns `undefined` when React cannot be found, in which case the plugin assumes the latest version.
 */
function getReactVersion() {
    try {
        const reactPath = require.resolve('react/package.json', { paths: [process.cwd()] });

        return require(reactPath).version;
    } catch {
        return undefined;
    }
}

/**
 * eslint-plugin-react 7.x still calls `context.getFilename()` and `context.getSourceCode()` in some rules
 * (e.g. `jsx-filename-extension`), which were removed in ESLint 10. `fixupPluginRules` restores them.
 * The plugin is registered by the airbnb config, so it is patched in place to avoid redefining it.
 */
const airbnbConfig = compat.extends(
    'eslint-config-airbnb/rules/react',
    'eslint-config-airbnb/rules/react-a11y',
    'eslint-config-airbnb/rules/react-hooks',
).map((config) => {
    if (!config.plugins?.react) {
        return config;
    }

    return {
        ...config,
        plugins: {
            ...config.plugins,
            react: fixupPluginRules(config.plugins.react),
        },
    };
});

export default [
    ...airbnbConfig,
    ...takiyonConfig,
    {
        files: [
            '**/*.{js,cjs,mjs,jsx}',
        ],
        ignores: ['./node_modules/**/*'],
        settings: {
            react: {
                version: getReactVersion(),
            },
        },
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
