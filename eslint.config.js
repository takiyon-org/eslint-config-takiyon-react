import { createRequire } from 'node:module';
import { defineConfig } from 'eslint/config';
import takiyonConfig from 'eslint-config-takiyon';

import a11y from './rules/a11y.js';
import base from './rules/base.js';
import hooks from './rules/hooks.js';

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

export default defineConfig([
    takiyonConfig,

    // Shared rule layers (core linting)
    base,
    a11y,
    hooks,

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
    }
]);
