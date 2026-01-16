'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Search, Bell, HelpCircle, Menu } from 'lucide-react';
import { useAuth } from '@/src/lib/auth';

interface DashboardNavProps {
    onMenuClick?: () => void;
}

export function DashboardNav({ onMenuClick }: DashboardNavProps) {
    const { user } = useAuth();
    const [showNotifications, setShowNotifications] = useState(false);

    return (
        <header className="h-16 md:h-20 bg-white border-b-2 border-dashed border-gray-100 px-4 md:px-8 flex items-center justify-between sticky top-0 z-30 transition-all">
            <div className="flex items-center gap-2 md:gap-4">
                {/* Mobile Menu Button - Only visible on mobile */}
                <button
                    onClick={onMenuClick}
                    className="md:hidden p-2 text-gray-500 hover:bg-gray-50 rounded-lg active:scale-95 transition-transform"
                >
                    <Menu className="w-5 h-5" />
                </button>

                {/* Search Bar - Hidden on mobile, visible on desktop */}
                <div className="hidden md:block w-96">
                    <div className="relative group">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 group-focus-within:text-accent-500 transition-colors" />
                        <input
                            type="text"
                            placeholder="Search..."
                            className="w-full pl-11 pr-4 py-2.5 bg-white hover:bg-gray-50 focus:bg-white text-sm text-gray-900 placeholder-gray-500 rounded-lg border-2 border-dashed border-gray-200 focus:border-accent-200 transition-all outline-none font-medium"
                        />
                    </div>
                </div>
            </div>

            {/* Right Section */}
            <div className="flex items-center gap-2 md:gap-3">
                {/* Mobile Search Icon */}
                <button className="md:hidden w-9 h-9 rounded-lg bg-white border-2 border-dashed border-gray-200 flex items-center justify-center transition-all active:scale-95 text-gray-400">
                    <Search className="w-4 h-4" />
                </button>

                {/* Help - Hidden on very small screens */}
                <button className="hidden sm:flex w-9 h-9 md:w-10 md:h-10 rounded-lg bg-white border-2 border-dashed border-gray-200 hover:border-gray-300 items-center justify-center transition-all group active:scale-95">
                    <HelpCircle className="w-4 h-4 md:w-5 md:h-5 text-gray-400 group-hover:text-gray-600" />
                </button>

                {/* Notifications */}
                <div className="relative">
                    <button
                        onClick={() => setShowNotifications(!showNotifications)}
                        className="w-9 h-9 md:w-10 md:h-10 rounded-lg bg-white border-2 border-dashed border-gray-200 hover:border-accent-200 flex items-center justify-center transition-all group relative active:scale-95"
                    >
                        <Bell className="w-4 h-4 md:w-5 md:h-5 text-gray-400 group-hover:text-accent-500" />
                        <span className="absolute top-1 right-1 w-2 h-2 md:w-2.5 md:h-2.5 bg-accent-500 rounded-full border-2 border-white shadow-sm" />
                    </button>

                    {showNotifications && (
                        <div className="absolute right-0 mt-3 w-72 md:w-80 bg-white rounded-lg shadow-2xl border-2 border-dashed border-gray-200 py-2 z-50 animate-scale-in origin-top-right">
                            <div className="px-4 py-3 border-b-2 border-dashed border-gray-100">
                                <h3 className="text-xs font-black text-gray-400 uppercase tracking-widest">Notifications</h3>
                            </div>
                            <div className="py-12 px-4 text-center">
                                <div className="w-14 h-14 mx-auto mb-4 rounded-lg bg-gray-50 border-2 border-dashed border-gray-200 flex items-center justify-center">
                                    <Bell className="w-6 h-6 text-gray-300" />
                                </div>
                                <p className="text-gray-400 text-[10px] font-black uppercase tracking-widest">No new updates</p>
                            </div>
                        </div>
                    )}
                </div>

                {/* User */}
                <Link
                    href="/dashboard/profile"
                    className="flex items-center gap-3 md:pl-4 md:ml-4 border-2 md:border-l-2 border-dashed border-gray-200 group cursor-pointer hover:bg-gray-50/50 transition-colors rounded-lg md:rounded-l-lg"
                >
                    <div className="text-right hidden sm:block">
                        <p className="text-sm font-black text-gray-900 leading-none mb-1 group-hover:text-accent-600 transition-colors">
                            {user?.name || 'Student'}
                        </p>
                        <div className="flex items-center justify-end gap-1.5">
                            <span className="px-1.5 py-0.5 bg-accent-50 text-accent-600 text-[9px] font-black uppercase rounded border border-dashed border-accent-200">
                                Lvl {user?.level || 1}
                            </span>
                            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-tight">
                                {user?.xp || 0} XP
                            </span>
                        </div>
                    </div>
                    <img
                        src={user?.profilePicture || 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alex'}
                        alt="Profile"
                        className="w-8 h-8 md:w-11 md:h-11 rounded-lg object-cover border-2 border-dashed border-gray-200 grayscale contrast-125 group-hover:grayscale-0 group-hover:border-accent-300 transition-all duration-300"
                    />
                </Link>
            </div>
        </header>
    );
}
