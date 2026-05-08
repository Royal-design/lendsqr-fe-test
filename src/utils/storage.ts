import type { User } from '@/types/user';

const SELECTED_USER_KEY = 'lendsqr.selectedUser';

export const selectedUserStorage = {
  get(): User | null {
    const raw = localStorage.getItem(SELECTED_USER_KEY);
    if (!raw) return null;

    try {
      return JSON.parse(raw) as User;
    } catch {
      localStorage.removeItem(SELECTED_USER_KEY);
      return null;
    }
  },
  set(user: User): void {
    localStorage.setItem(SELECTED_USER_KEY, JSON.stringify(user));
  },
  clear(): void {
    localStorage.removeItem(SELECTED_USER_KEY);
  },
};
