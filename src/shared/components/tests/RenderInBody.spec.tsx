import * as React from 'react';
import { render, screen } from '@testing-library/react';
import RenderInBody from '../RenderInBody';

describe('(Compoennt) RenderInBody', () => {
  it('should render its children in the body', () => {
    render(<RenderInBody><div data-testid="test-div">some text</div></RenderInBody>);
    screen.getByTestId('test-div');
  })
});