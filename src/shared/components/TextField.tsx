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

/**
 * TextField component that serves as an input field
 * @param {object} textFieldProps props used for TextField component including
 * - placeholder {string}: used as helper text when the input is empty
 * - hasError {boolean}: control error style of the input
 * - onChange {func}: callbakc when the value of input is changed
 * - name {string}: used as name of input in case a label is available
 * @returns {React.ReactElement} TextField
 */
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