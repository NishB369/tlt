'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
    Home,
    BookOpen,
    Video,
    FileText,
    StickyNote,
    CheckCircle,
    LogOut,
    ChevronRight,
} from 'lucide-react';
import { cn } from '@/src/lib/utils';
import { useAuth } from '@/src/lib/auth';

interface AdminSidebarProps {
    className?: string;
    onClose?: () => void;
}

const menuItems = [
    { name: 'Home', icon: Home, href: '/admin/home' },
    { name: 'Novels', icon: BookOpen, href: '/admin/novels' },
    { name: 'Videos', icon: Video, href: '/admin/videos' },
    { name: 'Summary', icon: FileText, href: '/admin/summary' },
    { name: 'Note', icon: StickyNote, href: '/admin/note' },
    { name: 'Quiz', icon: CheckCircle, href: '/admin/quiz' },
];

export function AdminSidebar({ className, onClose }: AdminSidebarProps) {
    const pathname = usePathname();
    const { user, logout } = useAuth(); // Reuse auth for logout, assuming admin uses same auth or separate

    const handleLogout = async () => {
        await logout();
        window.location.href = '/';
    };

    return (
        <aside className={cn("flex flex-col w-64 h-screen bg-white border-r-2 border-dashed border-gray-200", className)}>
            {/* Logo */}
            <div className="flex items-center justify-between px-8 h-20 border-b-2 border-dashed border-gray-100 shrink-0">
                <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-gray-900 rounded-lg flex items-center justify-center text-white font-black text-xl shadow-[2px_2px_0px_0px_rgba(0,0,0,0.1)]">
                        A
                    </div>
                    <div>
                        <span className="text-lg font-black text-gray-900 tracking-tighter">Admin</span>
                        <span className="text-lg font-black text-gray-500 tracking-tighter">Panel</span>
                    </div>
                </div>
                {/* Close Button for Mobile */}
                {onClose && (
                    <button onClick={onClose} className="md:hidden text-gray-400 hover:text-gray-600">
                        <ChevronRight className="w-6 h-6 rotate-180" />
                    </button>
                )}
            </div>

            {/* Navigation */}
            <nav className="flex-1 px-4 py-8 space-y-2 overflow-y-auto">
                <p className="px-4 text-[10px] font-black text-gray-400 uppercase tracking-widest mb-4">Management</p>
                {menuItems.map((item) => {
                    const isActive = pathname === item.href ||
                        (item.href !== '/admin/home' && pathname.startsWith(item.href));

                    return (
                        <Link
                            key={item.name}
                            href={item.href}
                            onClick={onClose}
                            className={cn(
                                'flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-300 group relative font-bold text-sm',
                                isActive
                                    ? 'bg-gray-900 text-white shadow-[4px_4px_0px_0px_rgba(0,0,0,0.1)] translate-x-1'
                                    : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'
                            )}
                        >
                            <item.icon className={cn(
                                'w-4 h-4 transition-colors',
                                isActive ? 'text-white' : 'text-gray-400 group-hover:text-gray-900'
                            )} />
                            <span className="tracking-tight">{item.name}</span>
                        </Link>
                    );
                })}
            </nav>

            {/* User Section */}
            <div className="p-4 border-t-2 border-dashed border-gray-100">
                {/* User Profile */}
                <div className="flex items-center gap-3 p-3 rounded-lg border-2 border-dashed border-gray-50 bg-gray-50/50 mb-4 hover:border-gray-200 hover:bg-white transition-all group">
                    <div className="w-10 h-10 rounded-full bg-gray-200 border border-dashed border-gray-300 overflow-hidden">
                        <img
                            src={user?.picture || 'https://api.dicebear.com/7.x/avataaars/svg?seed=Admin'}
                            alt="Profile"
                            className="w-full h-full object-cover"
                        />
                    </div>
                    <div className="flex-1 min-w-0">
                        <p className="text-sm font-bold text-gray-900 truncate tracking-tight">
                            {user?.name || 'Administrator'}
                        </p>
                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-tight truncate leading-none">
                            Admin Access
                        </p>
                    </div>
                </div>

                {/* Logout */}
                <button
                    onClick={handleLogout}
                    className="w-full flex items-center justify-center gap-2 py-2.5 text-red-500 hover:text-white hover:bg-red-500 rounded-lg transition-all text-[10px] font-black uppercase tracking-widest border border-dashed border-red-200"
                >
                    <LogOut className="w-4 h-4" />
                    Sign Out
                </button>
            </div>
        </aside>
    );
}
