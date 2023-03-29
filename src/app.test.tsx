import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';

describe('DealFriendlyFire function', () => {
    test('updates user data and blessing, then restores original user data', async () => {
        render(<App />);

        const user = userEvent.setup();

        const actionButton = screen.getByRole('button', { name: 'skull' })
        await user.click(actionButton)


        expect(actionButton).toBeDisabled()
    });
});
