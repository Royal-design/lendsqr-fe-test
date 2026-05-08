import { describe, expect, it } from 'vitest';
import { usersApi } from './usersApi';

describe('usersApi', () => {
  it('returns paginated users', async () => {
    const result = await usersApi.getUsers({ page: 2, pageSize: 25 });

    expect(result.data).toHaveLength(25);
    expect(result.total).toBe(500);
    expect(result.page).toBe(2);
  });

  it('filters by status', async () => {
    const result = await usersApi.getUsers({ page: 1, pageSize: 50, filters: { status: 'Active' } });

    expect(result.data.every((user) => user.status === 'Active')).toBe(true);
  });
});
