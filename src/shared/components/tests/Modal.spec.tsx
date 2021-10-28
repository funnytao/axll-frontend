import * as React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Modal from '../Modal';

describe('(Component) Modal', () => {
    it('should render with content', () => {
        const onClose = jest.fn();
        render(<Modal onClose={onClose} visible>this is the content</Modal>);
        screen.getByText('this is the content');
    });

    it('should call onclose callback if clicked outside', () => {
        const onClose = jest.fn();
        render(
            <div>
                <button data-testid="test-click">click target</button>
                <Modal onClose={onClose} visible>this is the content</Modal>
            </div>
        );
        const clickTarget = screen.getByTestId('test-click');
        fireEvent.mouseDown(clickTarget);
        fireEvent.mouseUp(clickTarget);
        expect(onClose).toHaveBeenCalled();
    });

    it('should call onclose callback if esc key is pressed', () => {
        const onClose = jest.fn();
        render(<Modal onClose={onClose} visible>this is the content</Modal>);
        fireEvent.keyDown(document.body, { key: "Escape", });
        expect(onClose).toHaveBeenCalled();
    });
});