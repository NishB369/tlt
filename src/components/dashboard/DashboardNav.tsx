'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Search, Bell, HelpCircle } from 'lucide-react';
import { useAuth } from '@/src/lib/auth';

export function DashboardNav() {
    const { user } = useAuth();
    const [showNotifications, setShowNotifications] = useState(false);

    return (
        <header className="h-20 bg-white border-b-2 border-dashed border-gray-100 px-8 flex items-center justify-between">
            {/* Search */}
            <div className="flex-1 max-w-2xl">
                <div className="relative group">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 group-focus-within:text-accent-500 transition-colors" />
                    <input
                        type="text"
                        placeholder="Search for videos, notes, quizzes..."
                        className="w-full pl-11 pr-4 py-2.5 bg-white hover:bg-gray-50 focus:bg-white text-sm text-gray-900 placeholder-gray-500 rounded-lg border-2 border-dashed border-gray-200 focus:border-accent-200 transition-all outline-none font-medium"
                    />
                </div>
            </div>

            {/* Right Section */}
            <div className="flex items-center gap-3 ml-8">
                {/* Help */}
                <button className="w-10 h-10 rounded-lg bg-white border-2 border-dashed border-gray-200 hover:border-gray-300 flex items-center justify-center transition-all group">
                    <HelpCircle className="w-5 h-5 text-gray-400 group-hover:text-gray-600" />
                </button>

                {/* Notifications */}
                <div className="relative">
                    <button
                        onClick={() => setShowNotifications(!showNotifications)}
                        className="w-10 h-10 rounded-lg bg-white border-2 border-dashed border-gray-200 hover:border-accent-200 flex items-center justify-center transition-all group relative"
                    >
                        <Bell className="w-5 h-5 text-gray-400 group-hover:text-accent-500" />
                        <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-accent-500 rounded-full border-2 border-white shadow-sm" />
                    </button>

                    {showNotifications && (
                        <div className="absolute right-0 mt-3 w-80 bg-white rounded-lg shadow-2xl border-2 border-dashed border-gray-200 py-2 z-50 animate-scale-in">
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
                    className="flex items-center gap-4 pl-4 ml-4 border-l-2 border-dashed border-gray-200 group cursor-pointer hover:bg-gray-50/50 transition-colors rounded-l-lg"
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
                        className="w-11 h-11 rounded-lg object-cover border-2 border-dashed border-gray-200 grayscale contrast-125 group-hover:grayscale-0 group-hover:border-accent-300 transition-all duration-300"
                    />
                </Link>
            </div>
        </header>
    );
}
