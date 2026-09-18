import reactHooks from 'eslint-plugin-react-hooks';

// Use the recommended rules defined by the React team
// https://react.dev/reference/eslint-plugin-react-hooks
export default {
    name: 'takiyon-react/hooks',
    ...reactHooks.configs.flat.recommended,
};
