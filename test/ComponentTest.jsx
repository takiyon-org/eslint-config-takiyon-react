import PropTypes from 'prop-types';
import React, { useState, useCallback } from 'react';

// react/sort-prop-types
const propTypes = {
    label: PropTypes.node.isRequired,
    options: PropTypes.arrayOf(PropTypes.shape({
        label: PropTypes.node.isRequired,
        value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    })).isRequired,

    disabled: PropTypes.bool,
};

function ComponentTest({ label, options, disabled = false }) {
    const [value, setValue] = useState([]);

    const onChange = useCallback((newValue) => {
        setValue(newValue);
    }, []);

    // jsx-a11y/label-has-associated-control
    // react/jsx-sort-props
    return (
        <label>
            {label}
            <select
                disabled={disabled}
                value={value}
                onChange={onChange}
            >
                {options.forEach((option) => (
                    <option value={option.label}>
                        {option.value}
                    </option>
                ))}
            </select>
        </label>
    );
}

ComponentTest.propTypes = propTypes;

export default ComponentTest;
