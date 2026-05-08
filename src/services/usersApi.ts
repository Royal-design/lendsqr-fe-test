import { apiClient } from '@/services/apiClient';
import type { PaginatedUsers, User, UserFilters } from '@/types/user';

const matches = (source: string, value?: string): boolean =>
  !value || source.toLowerCase().includes(value.toLowerCase());

export const usersApi = {
  async getUsers(params: {
    page: number;
    pageSize: number;
    search?: string;
    filters?: UserFilters;
  }): Promise<PaginatedUsers> {
    const response = await apiClient.get<User[]>('/users');
    const { page, pageSize, search, filters } = params;

    const filtered = response.data.filter((user) => {
      const searchable = `${user.organization} ${user.username} ${user.email} ${user.phoneNumber} ${user.status}`;
      const searchMatch = matches(searchable, search);
      const filterMatch =
        matches(user.organization, filters?.organization) &&
        matches(user.username, filters?.username) &&
        matches(user.email, filters?.email) &&
        matches(user.phoneNumber, filters?.phoneNumber) &&
        (!filters?.status || user.status === filters.status) &&
        (!filters?.date || user.dateJoined.startsWith(filters.date));

      return searchMatch && filterMatch;
    });

    const start = (page - 1) * pageSize;
    return {
      data: filtered.slice(start, start + pageSize),
      total: filtered.length,
      page,
      pageSize,
    };
  },
};
