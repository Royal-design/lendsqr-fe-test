import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';
import UsersPage from './UsersPage';
import { renderWithProviders } from '@/tests/test-utils';

describe('UsersPage', () => {
  it('renders fetched users in a paginated table', async () => {
    renderWithProviders(<UsersPage />);

    expect(screen.getByLabelText(/loading users/i)).toBeInTheDocument();
    expect(await screen.findByText('graceeffiom')).toBeInTheDocument();
    expect(screen.getByText(/out of 500/i)).toBeInTheDocument();
  });

  it('filters users by search query', async () => {
    renderWithProviders(<UsersPage />);

    await screen.findByText('graceeffiom');
    await userEvent.type(screen.getByLabelText(/search users/i), 'debby');

    await waitFor(() => expect(screen.getByText(/debby/i)).toBeInTheDocument());
  });
});
