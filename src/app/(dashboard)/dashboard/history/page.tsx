'use client';

import { Video, BookOpen, CheckCircle, Timer } from 'lucide-react';
import { MOCK_RECENT_ACTIVITY } from '@/src/lib/constants';
import { formatRelativeTime, cn } from '@/src/lib/utils';

export default function HistoryPage() {
    // Group activities by date
    const groupedActivities = MOCK_RECENT_ACTIVITY.reduce((acc, activity) => {
        const date = new Date(activity.time).toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        });
        if (!acc[date]) acc[date] = [];
        acc[date].push(activity);
        return acc;
    }, {} as Record<string, typeof MOCK_RECENT_ACTIVITY>);

    const getIcon = (type: string) => {
        switch (type) {
            case 'video': return Video;
            case 'note': return BookOpen;
            case 'quiz': return CheckCircle;
            case 'pomodoro': return Timer;
            default: return Video;
        }
    };

    const getColor = (type: string) => {
        switch (type) {
            case 'video': return 'text-blue-600 bg-blue-50 border-blue-200';
            case 'note': return 'text-purple-600 bg-purple-50 border-purple-200';
            case 'quiz': return 'text-green-600 bg-green-50 border-green-200';
            case 'pomodoro': return 'text-orange-600 bg-orange-50 border-orange-200';
            default: return 'text-gray-600 bg-gray-50 border-gray-200';
        }
    };

    return (
        <div className="space-y-6 animate-fade-in">
            {/* Header */}
            <div>
                <h1 className="text-4xl font-black text-gray-900 mb-2 tracking-tight">Study History</h1>
                <p className="text-gray-500 font-medium">Track your learning journey over time</p>
            </div>

            {/* History Timeline */}
            <div className="space-y-8">
                {Object.entries(groupedActivities).map(([date, activities]) => (
                    <div key={date}>
                        <h2 className="text-lg font-black text-gray-900 uppercase tracking-wider mb-4 border-b-2 border-dashed border-gray-100 pb-2">{date}</h2>
                        <div className="bg-white rounded-lg shadow-sm border-2 border-dashed border-gray-200 overflow-hidden">
                            {activities.map((activity, index) => {
                                const Icon = getIcon(activity.type);
                                const colorClass = getColor(activity.type);

                                return (
                                    <div
                                        key={activity.id}
                                        className="flex items-center gap-4 p-4 border-b-2 border-dashed border-gray-100 last:border-b-0 hover:bg-gray-50 transition-colors"
                                    >
                                        <div className="text-xs font-bold text-gray-400 uppercase tracking-wider w-24 flex-shrink-0">
                                            {new Date(activity.time).toLocaleTimeString('en-US', {
                                                hour: 'numeric',
                                                minute: '2-digit',
                                                hour12: true,
                                            })}
                                        </div>
                                        <div className={cn("w-10 h-10 rounded-lg flex items-center justify-center border-2 border-dashed", colorClass)}>
                                            <Icon className="w-5 h-5" />
                                        </div>
                                        <div className="flex-1">
                                            <p className="font-bold text-gray-900 text-sm">{activity.title}</p>
                                            <p className="text-xs text-gray-500 font-medium capitalize mt-0.5">{activity.type}</p>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                ))}
            </div>

            {Object.keys(groupedActivities).length === 0 && (
                <div className="text-center py-16 bg-white rounded-lg border-2 border-dashed border-gray-200">
                    <div className="text-6xl mb-4">📅</div>
                    <h3 className="text-xl font-black text-gray-900 mb-2">No activity yet</h3>
                    <p className="text-gray-500 font-medium">
                        Start learning to see your study history here.
                    </p>
                </div>
            )}
        </div>
    );
}
