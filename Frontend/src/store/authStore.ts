import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface User {
    _id: string;
    email: string;
    name: string;
    picture?: string;
}

interface AuthState {
    user: User | null;
    accessToken: string | null;
    isAuthenticated: boolean;
    login: (user: User, accessToken: string) => void;
    logout: () => void;
    setAccessToken: (token: string) => void;
}

export const useAuthStore = create<AuthState>()(
    persist(
        (set) => ({
            user: null,
            accessToken: null,
            isAuthenticated: false,
            login: (user, accessToken) => set({ user, accessToken, isAuthenticated: true }),
            logout: () => set({ user: null, accessToken: null, isAuthenticated: false }),
            setAccessToken: (token) => set({ accessToken: token }),
        }),
        {
            name: 'auth-storage',
            partialize: (state) => ({ user: state.user, isAuthenticated: state.isAuthenticated }), // Don't persist access token if we want memory-only, but for simple UX persisting it is okay, or just rely on refresh. 
            // Better security: don't persist access token in local storage. Just user info. Access token in memory.
            // On reload, app should try to refresh token.
        }
    )
);
