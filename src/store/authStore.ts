import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface AuthState {
  token: string | null;
  email: string | null;
  setAuth: (token: string, user: string) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      token: null,
      email: null,
      setAuth: (token, email) => set({ token, email }),
      logout: () => set({ token: null, email: null }),
    }),
    {
      name: 'auth-storage',
    }
  )
);