'use client';

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { User } from '@/src/types';
import { useAuthStore } from '@/src/store/authStore';
import { GoogleOAuthProvider } from '@react-oauth/google';
import apiClient from './apiClient';

interface AuthContextType {
    user: User | null;
    isLoading: boolean;
    isAuthenticated: boolean;
    login: () => Promise<void>; // kept for compatibility, but login is now handled via Google Button
    logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
    const { user, isAuthenticated, login: storeLogin, logout: storeLogout, setAccessToken } = useAuthStore();
    const [isLoading, setIsLoading] = useState(true);

    // Initial Auth Check (Refresh Token)
    useEffect(() => {
        const checkAuth = async () => {
            try {
                // If we don't have an access token, try to refresh
                // This runs on mount to restore the session if possible
                const res = await apiClient.post('/auth/refresh');
                if (res.data.accessToken) {
                    setAccessToken(res.data.accessToken);
                    // Optionally fetch user profile here if needed, 
                    // or rely on persisted user data if available/valid.
                }
            } catch (error) {
                // If refresh fails and we thought we were authenticated, we should probably logout
                // But typically 401 on refresh means we are definitely not logged in.
                // If we have a persisted user but refresh fails, clear it.
                if (isAuthenticated) {
                    storeLogout();
                }
            } finally {
                setIsLoading(false);
            }
        };

        checkAuth();
    }, [setAccessToken, storeLogout]); // Removed isAuthenticated dependency to avoid loops, run once on mount

    const login = async () => {
        console.warn("Use Google Login Button instead");
    };

    const logout = async () => {
        try {
            await apiClient.post('/auth/logout');
            storeLogout();
        } catch (error) {
            console.error('Logout failed', error);
            storeLogout(); // Logout locally anyway
        }
    };

    // Cast store User to app User type (might need better mapping in real app)
    const appUser = user as unknown as User;

    return (
        <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || ''}>
            <AuthContext.Provider
                value={{
                    user: appUser,
                    isLoading,
                    isAuthenticated,
                    login,
                    logout,
                }}
            >
                {children}
            </AuthContext.Provider>
        </GoogleOAuthProvider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}
