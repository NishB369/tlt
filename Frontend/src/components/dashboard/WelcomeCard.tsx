'use client';

import { useAuth } from '@/src/lib/auth';
import { MOTIVATIONAL_QUOTES } from '@/src/lib/constants';
import { Sparkles } from 'lucide-react';
import { useMemo } from 'react';

export function WelcomeCard() {
    const { user } = useAuth();

    const quote = useMemo(() => {
        const randomIndex = Math.floor(Math.random() * MOTIVATIONAL_QUOTES.length);
        return MOTIVATIONAL_QUOTES[randomIndex];
    }, []);

    const greeting = useMemo(() => {
        const hour = new Date().getHours();
        if (hour < 12) return 'Good morning';
        if (hour < 17) return 'Good afternoon';
        return 'Good evening';
    }, []);

    const firstName = user?.name?.split(' ')[0] || 'Student';

    return (
        <div className="bg-white border-2 border-dashed border-gray-200 rounded-lg p-5 md:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 overflow-hidden relative">
            {/* Background Accent */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-accent-50/50 rounded-full -translate-y-16 translate-x-16 blur-3xl -z-10" />

            <div className="space-y-2 max-w-2xl relative z-10">
                <h1 className="text-2xl md:text-3xl font-bold text-gray-900 tracking-tight">
                    {greeting}, {firstName}
                </h1>
                <div className="flex items-start gap-3">
                    <div className="p-1.5 bg-accent-50 rounded-md mt-0.5 border border-accent-100 flex-shrink-0">
                        <Sparkles className="w-4 h-4 text-accent-600" />
                    </div>
                    <p className="text-gray-600 text-sm md:text-lg leading-relaxed font-medium">
                        &quot;{quote}&quot;
                    </p>
                </div>
            </div>

            <div className="w-full md:w-auto flex-shrink-0 flex items-center justify-between md:justify-start gap-4 px-5 py-4 bg-white rounded-lg border-2 border-dashed border-accent-200 shadow-sm relative z-10">
                <div className="text-left md:text-right">
                    <p className="text-[10px] md:text-xs font-bold text-accent-600 uppercase tracking-widest">Current Streak</p>
                    <p className="text-xl md:text-2xl font-black text-gray-900 leading-none">{user?.studyStreak || 0} days</p>
                </div>
                <div className="w-10 h-10 md:w-12 md:h-12 bg-accent-500 rounded-lg flex items-center justify-center text-white font-black text-lg shadow-[4px_4px_0px_0px_rgba(0,0,0,0.1)]">
                    {user?.studyStreak || 0}
                </div>
            </div>
        </div>
    );
}
