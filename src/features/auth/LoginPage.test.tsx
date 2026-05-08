import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';
import LoginPage from './LoginPage';
import { renderWithProviders } from '@/tests/test-utils';

describe('LoginPage', () => {
  it('validates required credentials', async () => {
    renderWithProviders(<LoginPage />);

    await userEvent.click(screen.getByRole('button', { name: /log in/i }));

    expect(await screen.findByText(/email is required/i)).toBeInTheDocument();
    expect(screen.getByText(/password must be at least 6 characters/i)).toBeInTheDocument();
  });

  it('toggles password visibility', async () => {
    renderWithProviders(<LoginPage />);

    const password = screen.getByLabelText(/password/i);
    await userEvent.click(screen.getByRole('button', { name: /show/i }));

    expect(password).toHaveAttribute('type', 'text');
  });
});
