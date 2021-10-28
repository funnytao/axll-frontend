import * as React from 'react';
import { render, screen } from '@testing-library/react';

import App from '../App';

describe('(Component) App', () => {
  it('should display proper content', () => {
    render(<App />);
    // check heaer text
    screen.getByText('BROCCOLI & CO.');
    // check main content text
    screen.getByText('Be the first to know when we launch.');
    // check footer text
    screen.getByText(/All rights reserved./);
  });
});