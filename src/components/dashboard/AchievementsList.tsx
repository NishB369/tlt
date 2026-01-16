'use client';

import { ACHIEVEMENTS } from '@/src/lib/constants';

export function AchievementsList() {
    const unlockedAchievements = [
        { ...ACHIEVEMENTS.FIRST_VIDEO, unlockedAt: new Date('2024-01-02') },
        { ...ACHIEVEMENTS.STREAK_7, unlockedAt: new Date('2024-01-08') },
        { ...ACHIEVEMENTS.BOOKWORM, unlockedAt: new Date('2024-01-10') },
    ];

    return (
        <div className="bg-white rounded-lg p-6 border-2 border-dashed border-gray-200">
            <div className="flex items-center justify-between mb-6">
                <h3 className="text-[11px] font-black text-gray-400 uppercase tracking-widest">Achievements</h3>
                <span className="text-[10px] font-black text-accent-600 uppercase tracking-widest hover:underline cursor-pointer">
                    View All
                </span>
            </div>
            <div className="space-y-4">
                {unlockedAchievements.map((achievement) => (
                    <div
                        key={achievement.id}
                        className="flex items-center gap-3 p-3 rounded-lg border-2 border-dashed border-gray-50 bg-gray-50/30 hover:bg-gray-50 hover:border-accent-200 transition-all duration-300 group"
                    >
                        <div className="text-2xl transition-transform group-hover:scale-110">{achievement.icon}</div>
                        <div className="flex-1 min-w-0">
                            <p className="font-bold text-gray-900 text-sm leading-tight">
                                {achievement.title}
                            </p>
                            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-tight truncate">
                                {achievement.description}
                            </p>
                        </div>
                        <div className="flex items-center gap-1 text-[10px] font-black text-accent-600 uppercase tracking-widest">
                            <span>+{achievement.xpReward}</span>
                            <span>XP</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
