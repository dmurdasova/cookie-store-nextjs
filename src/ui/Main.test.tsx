import React from 'react';
import { render, screen } from '@testing-library/react';
import Main from './Main';

describe('Renders App component', () => {
    beforeAll(() => {
        global.matchMedia =
            global.matchMedia ||
            function () {
                return {
                    addListener: jest.fn(),
                    removeListener: jest.fn()
                };
            };
    });

    test('should have the header', () => {
        render(<Main />);
        const header = screen.getByText(/welcome to our cookie store/i);
        expect(header).toBeInTheDocument();
    });
});
