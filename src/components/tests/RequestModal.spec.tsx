import * as React from 'react';
import nock from 'nock';
import { render, screen, fireEvent } from '@testing-library/react';
import RequestModal from '../RequestModal';

describe('(Component) RequestModal', () => {
    it('should display proper content when rendered', () => {
        const onClose = jest.fn();
        render(<RequestModal onClose={onClose} visible />);
        screen.getByText('Request an invite');
        expect(screen.getAllByTestId('test-textfield').length).toBe(3);
        screen.getByText('Send');
    });

    it('should show error style if input is not validated', () => {
        const onClose = jest.fn();
        render(<RequestModal onClose={onClose} visible />);
        screen.getByText('Request an invite');
        const inputs = screen.getAllByTestId('test-textfield');
        const submitButton = screen.getByText('Send');

        // test with empty fields
        fireEvent.click(submitButton);
        expect(document.getElementsByClassName('error').length).toBe(3);

        // test with invalid email
        fireEvent.change(inputs[0], { target: { value: 'John Doe' } });
        fireEvent.change(inputs[1], { target: { value: '23' } });
        fireEvent.change(inputs[2], { target: { value: '23' } });
        fireEvent.click(submitButton);
        expect(document.getElementsByClassName('error').length).toBe(2);

        // test with non-matched email
        fireEvent.change(inputs[1], { target: { value: 'hello@airwallex.com' } });
        fireEvent.change(inputs[2], { target: { value: '23' } });
        fireEvent.click(submitButton);
        expect(document.getElementsByClassName('error').length).toBe(1);
    });

    it('should call the subscription api if the data is valid', async () => {
        nock(/./)
            .post(/fake-auth/)
            .reply(200, "Registered", { 'Access-Control-Allow-Origin': '*' });

        const onClose = jest.fn();
        render(<RequestModal onClose={onClose} visible />);
        screen.getByText('Request an invite');
        const inputs = screen.getAllByTestId('test-textfield');
        const submitButton = screen.getByText('Send');

        fireEvent.change(inputs[0], { target: { value: 'John Doe' } });
        fireEvent.change(inputs[1], { target: { value: 'johndoe@airwallex.com' } });
        fireEvent.change(inputs[2], { target: { value: 'johndoe@airwallex.com' } });
        fireEvent.click(submitButton);

        // should show the secondary modal content
        await screen.findByText('All done!');
        // clicking on the ok button should close the modal
        fireEvent.click(screen.getByText('OK'));
        expect(onClose).toHaveBeenCalled();
    });

    it('should show the error message if the api returns an error', async () => {
        nock(/./)
            .post(/fake-auth/)
            .reply(400, { errorMessage: 'Bad Request' }, { 'Access-Control-Allow-Origin': '*' });

        const onClose = jest.fn();
        render(<RequestModal onClose={onClose} visible />);
        screen.getByText('Request an invite');
        const inputs = screen.getAllByTestId('test-textfield');
        const submitButton = screen.getByText('Send');

        fireEvent.change(inputs[0], { target: { value: 'John Doe' } });
        fireEvent.change(inputs[1], { target: { value: 'johndoe@airwallex.com' } });
        fireEvent.change(inputs[2], { target: { value: 'johndoe@airwallex.com' } });
        fireEvent.click(submitButton);

        // should show the error message from the reponse
        await screen.findByText('Bad Request');
    });
});