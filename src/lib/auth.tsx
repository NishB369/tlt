'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User } from '@/types';

// Mock user for development
const MOCK_USER: User = {
    id: 'user-1',
    email: 'student@example.com',
    name: 'Alex Johnson',
    profilePicture: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alex',
    createdAt: new Date('2024-01-01'),
    lastLogin: new Date(),
    studyStreak: 7,
    totalStudyTime: 272,
    level: 5,
    xp: 850,
    preferences: {
        theme: 'light',
        notificationsEnabled: true,
    },
};

interface AuthContextType {
    user: User | null;
    isLoading: boolean;
    isAuthenticated: boolean;
    login: () => Promise<void>;
    logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Check for existing session
        const checkAuth = async () => {
            try {
                const storedUser = localStorage.getItem('lt_user');
                if (storedUser) {
                    setUser(JSON.parse(storedUser));
                }
            } catch (error) {
                console.error('Auth check failed:', error);
            } finally {
                setIsLoading(false);
            }
        };

        checkAuth();
    }, []);

    const login = async () => {
        setIsLoading(true);
        try {
            // Simulate OAuth delay
            await new Promise((resolve) => setTimeout(resolve, 1000));

            // In production, this would be NextAuth signIn
            setUser(MOCK_USER);
            localStorage.setItem('lt_user', JSON.stringify(MOCK_USER));
        } catch (error) {
            console.error('Login failed:', error);
            throw error;
        } finally {
            setIsLoading(false);
        }
    };

    const logout = async () => {
        setIsLoading(true);
        try {
            // In production, this would be NextAuth signOut
            setUser(null);
            localStorage.removeItem('lt_user');
        } catch (error) {
            console.error('Logout failed:', error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                isLoading,
                isAuthenticated: !!user,
                login,
                logout,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}
