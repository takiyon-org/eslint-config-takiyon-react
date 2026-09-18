import { defineConfig } from 'eslint/config';
import takiyonConfig from 'eslint-config-takiyon';

import a11y from './rules/a11y.js';
import base from './rules/base.js';
import hooks from './rules/hooks.js';

export default defineConfig([
    takiyonConfig,

    // New React rules
    base,
    a11y,
    hooks,
]);
