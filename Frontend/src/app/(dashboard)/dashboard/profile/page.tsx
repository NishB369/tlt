'use client';

import { useAuth } from '@/src/lib/auth';
import {
    User,
    Mail,
    Calendar,
    Award,
    Flame,
    Clock,
    Shield,
    LogOut,
    Camera
} from 'lucide-react';
import { cn } from '@/src/lib/utils';
import { useState } from 'react';

export default function ProfilePage() {
    const { user, logout } = useAuth();
    const [notifications, setNotifications] = useState(true);
    const [emailUpdates, setEmailUpdates] = useState(false);

    const stats = [
        {
            label: 'Study Streak',
            value: `${user?.studyStreak || 0} Days`,
            icon: Flame,
            color: 'text-orange-500',
            bg: 'bg-orange-50',
            border: 'border-orange-200'
        },
        {
            label: 'Total XP',
            value: user?.xp || 0,
            icon: Award,
            color: 'text-yellow-500',
            bg: 'bg-yellow-50',
            border: 'border-yellow-200'
        },
        {
            label: 'Level',
            value: user?.level || 1,
            icon: User,
            color: 'text-blue-500',
            bg: 'bg-blue-50',
            border: 'border-blue-200'
        },
        {
            label: 'Study Time',
            value: `${Math.round((user?.totalStudyTime || 0) / 60)}h`,
            icon: Clock,
            color: 'text-green-500',
            bg: 'bg-green-50',
            border: 'border-green-200'
        },
    ];

    const handleLogout = async () => {
        await logout();
        window.location.href = '/';
    };

    return (
        <div className="space-y-6 animate-fade-in max-w-5xl mx-auto">
            <h1 className="text-4xl font-black text-gray-900 mb-8 tracking-tight">My Profile</h1>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left Column - User Info */}
                <div className="lg:col-span-1 space-y-6">
                    {/* ID Card */}
                    <div className="bg-white rounded-lg p-6 shadow-sm border-2 border-dashed border-gray-200 text-center relative overflow-hidden group">
                        <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-br from-gray-50 to-gray-100 border-b-2 border-dashed border-gray-200" />

                        <div className="relative mt-8 mb-4 inline-block">
                            <div className="w-24 h-24 rounded-full bg-gray-100 border-2 border-dashed border-gray-300 overflow-hidden mb-4 group-hover:border-accent-500 transition-colors">
                                <img
                                    src={user?.picture || 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alex'}
                                    alt="Profile"
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <button className="absolute bottom-0 right-0 p-1.5 bg-white rounded-lg border-2 border-dashed border-gray-200 text-gray-400 hover:text-accent-500 hover:border-accent-200 transition-all shadow-sm">
                                <Camera className="w-4 h-4" />
                            </button>
                        </div>

                        <h2 className="text-xl font-black text-gray-900 mb-1">{user?.name || 'Student'}</h2>
                        <p className="text-sm font-medium text-gray-500 mb-6">{user?.email || 'student@example.com'}</p>

                        <div className="flex items-center justify-center gap-2 mb-6">
                            <span className="px-3 py-1 bg-accent-50 text-accent-700 text-xs font-black uppercase rounded-lg border border-dashed border-accent-200">
                                Level {user?.level || 1}
                            </span>
                            <span className="px-3 py-1 bg-gray-50 text-gray-600 text-xs font-black uppercase rounded-lg border border-dashed border-gray-200">
                                Student
                            </span>
                        </div>

                        <div className="space-y-3 pt-6 border-t-2 border-dashed border-gray-100 text-left">
                            <div className="flex items-center gap-3 text-sm font-medium text-gray-600">
                                <Mail className="w-4 h-4 text-gray-400" />
                                {user?.email || 'student@example.com'}
                            </div>
                            <div className="flex items-center gap-3 text-sm font-medium text-gray-600">
                                <Calendar className="w-4 h-4 text-gray-400" />
                                {new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                            </div>
                        </div>
                    </div>

                    {/* Quick Actions */}
                    <div className="bg-white rounded-lg p-2 border-2 border-dashed border-gray-200 shadow-sm">
                        <button
                            onClick={handleLogout}
                            className="w-full flex items-center gap-3 px-4 py-3 text-red-600 hover:bg-red-50 rounded-lg transition-colors font-bold text-sm"
                        >
                            <LogOut className="w-4 h-4" />
                            Log Out
                        </button>
                    </div>
                </div>

                {/* Right Column - Stats & Settings */}
                <div className="lg:col-span-2 space-y-6">
                    {/* Stats Grid */}
                    <div className="grid grid-cols-2 gap-4">
                        {stats.map((stat, index) => (
                            <div key={index} className={cn("bg-white p-5 rounded-lg border-2 border-dashed flex items-center gap-4 transition-all hover:-translate-y-1 hover:shadow-sm", stat.border)}>
                                <div className={cn("w-12 h-12 rounded-lg flex items-center justify-center border-2 border-dashed", stat.bg, stat.border, stat.color)}>
                                    <stat.icon className="w-6 h-6" />
                                </div>
                                <div>
                                    <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">{stat.label}</p>
                                    <p className="text-2xl font-black text-gray-900 tracking-tight">{stat.value}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* General Settings */}
                    <div className="bg-white rounded-lg border-2 border-dashed border-gray-200 shadow-sm overflow-hidden">
                        <div className="px-6 py-4 border-b-2 border-dashed border-gray-100 bg-gray-50/50">
                            <h3 className="font-black text-gray-900 text-sm uppercase tracking-wider flex items-center gap-2">
                                <Shield className="w-4 h-4 text-gray-400" />
                                Account Settings
                            </h3>
                        </div>
                        <div className="p-6 space-y-6">
                            <div className="flex items-center justify-between">
                                <div className="space-y-0.5">
                                    <h4 className="text-sm font-bold text-gray-900">Push Notifications</h4>
                                    <p className="text-xs font-medium text-gray-500">Receive alerts about your study progress</p>
                                </div>
                                <button
                                    onClick={() => setNotifications(!notifications)}
                                    className={cn(
                                        "relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-accent-500 focus:ring-offset-2",
                                        notifications ? "bg-accent-500" : "bg-gray-200"
                                    )}
                                >
                                    <span className={cn(
                                        "inline-block h-4 w-4 transform rounded-full bg-white transition-transform shadow-sm",
                                        notifications ? "translate-x-6" : "translate-x-1"
                                    )} />
                                </button>
                            </div>
                            <div className="flex items-center justify-between">
                                <div className="space-y-0.5">
                                    <h4 className="text-sm font-bold text-gray-900">Email Updates</h4>
                                    <p className="text-xs font-medium text-gray-500">Get weekly summaries of your activity</p>
                                </div>
                                <button
                                    onClick={() => setEmailUpdates(!emailUpdates)}
                                    className={cn(
                                        "relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-accent-500 focus:ring-offset-2",
                                        emailUpdates ? "bg-accent-500" : "bg-gray-200"
                                    )}
                                >
                                    <span className={cn(
                                        "inline-block h-4 w-4 transform rounded-full bg-white transition-transform shadow-sm",
                                        emailUpdates ? "translate-x-6" : "translate-x-1"
                                    )} />
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* App Settings */}
                    {/* <div className="bg-white rounded-lg border-2 border-dashed border-gray-200 shadow-sm overflow-hidden">
                        <div className="px-6 py-4 border-b-2 border-dashed border-gray-100 bg-gray-50/50">
                            <h3 className="font-black text-gray-900 text-sm uppercase tracking-wider flex items-center gap-2">
                                <Smartphone className="w-4 h-4 text-gray-400" />
                                App Preferences
                            </h3>
                        </div>
                        <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Theme</label>
                                <select className="w-full px-4 py-2 bg-gray-50 border-2 border-dashed border-gray-200 rounded-lg text-sm font-bold text-gray-900 focus:outline-none focus:border-accent-500 transition-colors">
                                    <option>Light Mode</option>
                                    <option>Dark Mode</option>
                                    <option>System Default</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Language</label>
                                <select className="w-full px-4 py-2 bg-gray-50 border-2 border-dashed border-gray-200 rounded-lg text-sm font-bold text-gray-900 focus:outline-none focus:border-accent-500 transition-colors">
                                    <option>English (US)</option>
                                    <option>Spanish</option>
                                    <option>French</option>
                                </select>
                            </div>
                        </div>
                    </div> */}
                </div>
            </div>
        </div>
    );
}
