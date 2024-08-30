/* eslint-disable no-undef */
import { render, screen } from '@testing-library/react';
import FormButton from '../components/TestButton';

test('try different button colors', async () => {
    render(
        <FormButton buttonColor='#df0000' title='Green Button' />,
    );

    await screen.findByRole('button');
    expect(screen.getByTestId('button').style._values).toEqual({"color": "rgb(223, 0, 0)"});
});

test('try different button colors (red)', async () => {
    render(
        <FormButton buttonColor='red' title='Red Button' />,
    );

    await screen.findByRole('button');
    expect(screen.getByTestId('button').style._values).toEqual({"color": "red"});
});

test('try different button colors (blue)', async () => {
    render(
        <FormButton buttonColor='blue' title='Blue Button' />,
    );

    await screen.findByRole('button');
    expect(screen.getByTestId('button').style._values).toEqual({"color": "blue"});
});