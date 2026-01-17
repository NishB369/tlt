'use client';

import { AdminSidebar } from '@/src/components/admin/AdminSidebar';
import { DashboardNav } from '@/src/components/dashboard/DashboardNav';
import { PomodoroTimer } from '@/src/components/shared/PomodoroTimer';
import { useAuth } from '@/src/lib/auth';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Loader2 } from 'lucide-react';

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const { user, isLoading, isAuthenticated } = useAuth();
    const router = useRouter();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => {
        if (!isLoading && !isAuthenticated) {
            router.push('/login');
        }
    }, [isLoading, isAuthenticated, router]);

    // Close mobile menu on route change
    useEffect(() => {
        setIsMobileMenuOpen(false);
    }, [router]);

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
                <div className="text-center">
                    <Loader2 className="w-10 h-10 animate-spin text-gray-900 mx-auto mb-4" />
                    <p className="text-gray-600 dark:text-gray-400">Loading Admin Panel...</p>
                </div>
            </div>
        );
    }

    if (!isAuthenticated) {
        return null; // Redirect handled directly in useEffect
    }

    // Optional: Check for admin roll or permission if available in user object
    // if (user?.role !== 'admin') { return <AccessDenied /> }

    return (
        <div className="flex h-screen bg-[#fefefe]">
            {/* Desktop Sidebar */}
            <AdminSidebar className="hidden md:flex" />

            {/* Mobile Sidebar Overlay */}
            {isMobileMenuOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-40 md:hidden backdrop-blur-sm animate-fade-in"
                    onClick={() => setIsMobileMenuOpen(false)}
                />
            )}

            {/* Mobile Sidebar */}
            <AdminSidebar
                className={`fixed inset-y-0 left-0 z-50 transform transition-transform duration-300 md:hidden ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
                    }`}
                onClose={() => setIsMobileMenuOpen(false)}
            />

            {/* Main Content Area */}
            <div className="flex-1 flex flex-col overflow-hidden w-full">
                {/* Top Navigation - Reusing DashboardNav for consistency, can be swapped for AdminNav later */}
                <DashboardNav onMenuClick={() => setIsMobileMenuOpen(true)} />

                {/* Page Content */}
                <main className="flex-1 overflow-y-auto p-4 md:p-6 w-full">
                    {children}
                </main>
            </div>
            {/* Admin might not need pomodoro but keeping for consistency if desired, or remove if strictly admin */}
            {/* <PomodoroTimer /> */}
        </div>
    );
}
