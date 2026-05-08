import { create } from 'zustand';
import type { User } from '@/types/user';
import { selectedUserStorage } from '@/utils/storage';

interface UserState {
  selectedUser: User | null;
  setSelectedUser: (user: User) => void;
  clearSelectedUser: () => void;
  hydrateSelectedUser: () => void;
}

export const useUserStore = create<UserState>((set) => ({
  selectedUser: selectedUserStorage.get(),
  setSelectedUser: (user) => {
    selectedUserStorage.set(user);
    set({ selectedUser: user });
  },
  clearSelectedUser: () => {
    selectedUserStorage.clear();
    set({ selectedUser: null });
  },
  hydrateSelectedUser: () => set({ selectedUser: selectedUserStorage.get() }),
}));
