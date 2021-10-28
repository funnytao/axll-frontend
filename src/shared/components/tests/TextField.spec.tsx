import * as React from 'react';
import { render, fireEvent } from '@testing-library/react';
import TextField from '../TextField';

describe('(Component) TextField', () => {
  it('should use onChange callback when the input value is changed', () => {
    const testFunction = jest.fn();
    render(<TextField placeholder="some text" onChange={testFunction} />);
    const input = document.querySelector('input');
    fireEvent.change(input, { target: { value: '23' } });
    expect(testFunction).toHaveBeenCalled()
  });

  it('should use error style if error occurs', () => {
    const testFunction = jest.fn();
    render(<TextField placeholder="some text" onChange={testFunction} hasError />);
    expect(document.getElementsByClassName('error').length).toBeGreaterThan(0);
  });
});