import { useQuery } from '@tanstack/react-query';
import { usersApi } from '@/services/usersApi';
import type { UserFilters } from '@/types/user';

export function useUsers(page: number, pageSize: number, search: string, filters: UserFilters) {
  return useQuery({
    queryKey: ['users', page, pageSize, search, filters],
    queryFn: () => usersApi.getUsers({ page, pageSize, search, filters }),
  });
}
