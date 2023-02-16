import PropTypes from 'prop-types';
import React, { Component } from 'react';

class ComponentTest extends Component {
    // react/sort-prop-types
    static propTypes = {
        label: PropTypes.node.isRequired,
        options: PropTypes.arrayOf(PropTypes.shape({
            label: PropTypes.node.isRequired,
            value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
        })).isRequired,

        disabled: PropTypes.bool,
    };

    static defaultProps = {
        disabled: false,
    };

    state = {
        value: [],
    };

    constructor(props) {
        super(props);

        this.onChange = this.onChange.bind(this);
    }

    onChange(value) {
        this.setState({ value });
    }

    render() {
        const { label, options, disabled } = this.props;
        const { value } = this.state;

        // jsx-a11y/label-has-associated-control
        // react/jsx-sort-props
        return (
            <label>
                {label}
                <select
                    disabled={disabled}
                    value={value}
                    onChange={this.onChange}
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
}

export default ComponentTest;
