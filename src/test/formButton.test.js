/* eslint-disable no-undef */
import { FormButton } from '../pages/roomForm';
import { render, screen } from '@testing-library/react';

test('try different button colors', async () => {
    render(
        <FormButton>default button</FormButton>,
    );

    await screen.findByRole('button');
    expect(screen.getByRole('button')).toMatchSnapshot();
});

test('try different button colors', async () => {
    render(
        <FormButton buttonColor='#df0000'>red button</FormButton>,
    );

    await screen.findByRole('button');
    expect(screen.getByRole('button')).toMatchSnapshot();
});

test('try different button colors', async () => {
    render(
        <FormButton buttonColor='blue'>blue button</FormButton>,
    );

    await screen.findByRole('button');
    expect(screen.getByRole('button')).toMatchSnapshot();
});