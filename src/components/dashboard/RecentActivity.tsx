'use client';

import { MOCK_RECENT_ACTIVITY } from '@/src/lib/constants';
import { formatRelativeTime } from '@/src/lib/utils';
import { Video, BookOpen, CheckCircle, Timer, Bookmark } from 'lucide-react';
import { cn } from '@/src/lib/utils';

const activityIcons = {
    video: { icon: Video, color: 'text-gray-900', bg: 'bg-gray-100', border: 'border-gray-200' },
    note: { icon: BookOpen, color: 'text-gray-900', bg: 'bg-gray-100', border: 'border-gray-200' },
    quiz: { icon: CheckCircle, color: 'text-accent-600', bg: 'bg-accent-50', border: 'border-accent-100' },
    pomodoro: { icon: Timer, color: 'text-accent-600', bg: 'bg-accent-50', border: 'border-accent-100' },
    bookmark: { icon: Bookmark, color: 'text-accent-600', bg: 'bg-accent-50', border: 'border-accent-100' },
};

export function RecentActivity() {
    return (
        <div className="bg-white rounded-lg p-6 border-2 border-dashed border-gray-200">
            <h3 className="text-[11px] font-black text-gray-400 uppercase tracking-widest mb-6">Recent Activity</h3>
            <div className="space-y-6">
                {MOCK_RECENT_ACTIVITY.map((activity) => {
                    const activityConfig = activityIcons[activity.type as keyof typeof activityIcons] || activityIcons.video;
                    const Icon = activityConfig.icon;

                    return (
                        <div key={activity.id} className="flex items-start gap-3 group">
                            <div className={cn('p-2.5 rounded-lg flex-shrink-0 border border-dashed transition-colors group-hover:scale-110 duration-200', activityConfig.bg, activityConfig.border)}>
                                <Icon className={cn('w-4 h-4', activityConfig.color)} />
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="text-sm font-bold text-gray-900 truncate leading-tight mb-0.5">
                                    {activity.title}
                                </p>
                                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-tight">
                                    {formatRelativeTime(activity.time)}
                                </p>
                            </div>
                        </div>
                    );
                })}
            </div>
            {MOCK_RECENT_ACTIVITY.length === 0 && (
                <div className="text-center py-8">
                    <p className="text-gray-400 text-xs font-bold uppercase tracking-widest">No activity</p>
                </div>
            )}
        </div>
    );
}
