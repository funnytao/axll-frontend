import * as React from 'react';
import { useState, useCallback } from 'react';
import classnames from 'classnames';

import classes from './styles/TextField.scss';

type textFieldProps = {
    placeholder: string,
    hasError?: boolean,
    onChange?: Function,
    name?: string,
}

const TextField = ({ placeholder, hasError = false, onChange = () => { }, name }: textFieldProps) => {
    const [value, setValue] = useState('');

    const onValueChange = useCallback((e) => {
        setValue(e.target.value);
        onChange(e.target.value);
    }, [onChange]);

    return (
        <input
            className={classnames(classes.textField, {
                [classes.error]: hasError,
            })}
            placeholder={placeholder}
            value={value}
            onChange={onValueChange}
            name={name}
            data-testid="test-textfield"
        />
    )
}

export default TextField;