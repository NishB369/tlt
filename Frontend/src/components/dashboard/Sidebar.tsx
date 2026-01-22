'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
    Home,
    Video,
    BookOpen,
    CheckCircle,
    FileText,
    Bookmark,
    Clock,
    BarChart3,
    LogOut,
    Crown,
    ChevronRight,
} from 'lucide-react';
import { cn } from '@/src/lib/utils';
import { useAuth } from '@/src/lib/auth';
import { useBookmarks } from '@/src/hooks/useBookmarks';

interface SidebarProps {
    className?: string;
    onClose?: () => void;
}

type MenuItem = {
    name: string;
    icon: any;
    href: string;
    badge?: number;
};

const menuItems: MenuItem[] = [
    { name: 'Overview', icon: Home, href: '/dashboard' },
    { name: 'Videos', icon: Video, href: '/dashboard/videos' },
    { name: 'Notes', icon: BookOpen, href: '/dashboard/notes' },
    { name: 'Quizzes', icon: CheckCircle, href: '/dashboard/quiz' },
    { name: 'Summary', icon: FileText, href: '/dashboard/summary' },
    { name: 'Bookmarks', icon: Bookmark, href: '/dashboard/bookmarks' },
    { name: 'History', icon: Clock, href: '/dashboard/history' },
    { name: 'Analytics', icon: BarChart3, href: '/dashboard/analytics' },
];

export function Sidebar({ className, onClose }: SidebarProps) {
    const pathname = usePathname();
    const { user, logout } = useAuth();
    const { bookmarks } = useBookmarks();

    const handleLogout = async () => {
        await logout();
        window.location.href = '/';
    };

    return (
        <aside className={cn("flex flex-col w-64 h-screen bg-white border-r-2 border-dashed border-gray-200", className)}>
            {/* Logo */}
            <div className="flex items-center justify-between px-8 h-20 border-b-2 border-dashed border-gray-100 shrink-0">
                <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-accent-500 rounded-lg flex items-center justify-center text-white font-black text-xl shadow-[2px_2px_0px_0px_rgba(0,0,0,0.1)]">
                        L
                    </div>
                    <div>
                        <span className="text-lg font-black text-gray-900 tracking-tighter">Lit</span>
                        <span className="text-lg font-black text-accent-500 tracking-tighter">Talks</span>
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
                <p className="px-4 text-[10px] font-black text-gray-400 uppercase tracking-widest mb-4">Menu</p>
                {menuItems.map((item) => {
                    const isActive = pathname === item.href ||
                        (item.href !== '/dashboard' && pathname.startsWith(item.href));

                    const badge = item.name === 'Bookmarks' ? bookmarks?.length : item.badge;

                    return (
                        <Link
                            key={item.name}
                            href={item.href}
                            onClick={onClose}
                            className={cn(
                                'flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-300 group relative font-bold text-sm',
                                isActive
                                    ? 'bg-accent-500 text-white shadow-[4px_4px_0px_0px_rgba(0,0,0,0.1)] translate-x-1'
                                    : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'
                            )}
                        >
                            <item.icon className={cn(
                                'w-4 h-4 transition-colors',
                                isActive ? 'text-white' : 'text-gray-400 group-hover:text-accent-500'
                            )} />
                            <span className="tracking-tight">{item.name}</span>
                            {(badge !== undefined && badge > 0) && (
                                <span className={cn(
                                    'ml-auto px-2 py-0.5 text-[10px] font-black rounded border border-dashed',
                                    isActive
                                        ? 'bg-white/20 text-white border-white/20'
                                        : 'bg-accent-50 text-accent-600 border-accent-200'
                                )}>
                                    {badge}
                                </span>
                            )}
                        </Link>
                    );
                })}
            </nav>

            {/* Premium Card */}
            {/* <div className="px-4 pb-6">
                <div className="relative overflow-hidden rounded-lg bg-gray-900 p-5 text-white border-2 border-dashed border-primary-700 shadow-xl">
                    <div className="absolute top-0 right-0 w-24 h-24 bg-accent-500/10 rounded-full -translate-y-8 translate-x-8 blur-2xl" />

                    <div className="relative z-10 text-center">
                        <div className="flex items-center justify-center gap-2 mb-2">
                            <Crown className="w-5 h-5 text-accent-500" />
                            <span className="text-xs font-black uppercase tracking-widest">Premium</span>
                        </div>
                        <p className="text-[11px] font-bold text-gray-400 mb-4 leading-relaxed">
                            Unlock all features with unlimited access
                        </p>
                        <button className="w-full py-2.5 bg-accent-500 text-white font-black text-xs uppercase tracking-widest rounded-lg hover:bg-accent-600 transition-all active:scale-95 shadow-[4px_4px_0px_0px_rgba(255,85,0,0.2)]">
                            Upgrade Now
                        </button>
                    </div>
                </div>
            </div> */}

            {/* User Section */}
            <div className="p-4 border-t-2 border-dashed border-gray-100">
                {/* User Profile */}
                <Link
                    href="/dashboard/profile"
                    className="flex items-center gap-3 p-3 rounded-lg border-2 border-dashed border-gray-50 bg-gray-50/50 mb-4 hover:border-accent-200 hover:bg-white transition-all group"
                >
                    <div className="w-10 h-10 rounded-full bg-gray-200 border border-dashed border-gray-300 overflow-hidden">
                        <img
                            src={user?.picture || 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alex'}
                            alt="Profile"
                            className="w-full h-full object-cover"
                        />
                    </div>
                    <div className="flex-1 min-w-0">
                        <p className="text-sm font-bold text-gray-900 truncate tracking-tight group-hover:text-accent-600 transition-colors">
                            {user?.name || 'Student'}
                        </p>
                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-tight truncate leading-none">
                            Level {user?.level || 1} Scholar
                        </p>
                    </div>
                    <ChevronRight className="w-4 h-4 text-gray-300 group-hover:text-accent-400 group-hover:translate-x-0.5 transition-all" />
                </Link>

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
