'use client';

import { BarChart3, Clock, Flame, Trophy, TrendingUp, Calendar } from 'lucide-react';
import { MOCK_USER_STATS } from '@/src/lib/constants';
import { formatStudyTime, cn } from '@/src/lib/utils';

export default function AnalyticsPage() {
    const stats = MOCK_USER_STATS;

    // Mock weekly study data
    const weeklyData = [
        { day: 'Mon', minutes: 45 },
        { day: 'Tue', minutes: 60 },
        { day: 'Wed', minutes: 30 },
        { day: 'Thu', minutes: 90 },
        { day: 'Fri', minutes: 45 },
        { day: 'Sat', minutes: 120 },
        { day: 'Sun', minutes: 75 },
    ];

    // Mock quiz performance data
    const quizPerformance = [
        { name: 'Chapter 1', score: 85 },
        { name: 'Chapter 2', score: 92 },
        { name: 'Characters', score: 78 },
        { name: 'Themes', score: 88 },
    ];

    // Mock topics studied
    const topStudiedTopics = [
        { topic: 'Pride and Prejudice', hours: 12, percentage: 45 },
        { topic: 'Wuthering Heights', hours: 8, percentage: 30 },
        { topic: 'The Great Gatsby', hours: 5, percentage: 19 },
        { topic: 'Character Analysis', hours: 2, percentage: 6 },
    ];

    const maxMinutes = Math.max(...weeklyData.map((d) => d.minutes));

    return (
        <div className="space-y-6 animate-fade-in">
            {/* Header */}
            <div>
                <h1 className="text-4xl font-black text-gray-900 mb-2 tracking-tight">Learning Analytics</h1>
                <p className="text-gray-500 font-medium">Track your progress and study patterns</p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-white rounded-lg p-5 border-2 border-dashed border-gray-200">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-lg bg-blue-50 border-2 border-dashed border-blue-200 flex items-center justify-center">
                            <Clock className="w-6 h-6 text-blue-600" />
                        </div>
                        <div>
                            <p className="text-2xl font-black text-gray-900">{formatStudyTime(stats.totalStudyTime)}</p>
                            <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Total Time</p>
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-lg p-5 border-2 border-dashed border-gray-200">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-lg bg-orange-50 border-2 border-dashed border-orange-200 flex items-center justify-center">
                            <Flame className="w-6 h-6 text-orange-600" />
                        </div>
                        <div>
                            <p className="text-2xl font-black text-gray-900">{stats.currentStreak} days</p>
                            <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Streak</p>
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-lg p-5 border-2 border-dashed border-gray-200">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-lg bg-green-50 border-2 border-dashed border-green-200 flex items-center justify-center">
                            <TrendingUp className="w-6 h-6 text-green-600" />
                        </div>
                        <div>
                            <p className="text-2xl font-black text-gray-900">{stats.averageQuizScore}%</p>
                            <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Avg Score</p>
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-lg p-5 border-2 border-dashed border-gray-200">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-lg bg-purple-50 border-2 border-dashed border-purple-200 flex items-center justify-center">
                            <Trophy className="w-6 h-6 text-purple-600" />
                        </div>
                        <div>
                            <p className="text-2xl font-black text-gray-900">Level {stats.level}</p>
                            <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">{stats.xp} XP</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Weekly Study Time Chart */}
                <div className="bg-white rounded-lg p-6 border-2 border-dashed border-gray-200">
                    <h3 className="font-bold text-gray-900 mb-6 flex items-center gap-2 uppercase tracking-wider text-sm">
                        <BarChart3 className="w-4 h-4 text-gray-400" />
                        Weekly Study Time
                    </h3>
                    <div className="flex items-end gap-3 h-48">
                        {weeklyData.map((data, index) => (
                            <div key={index} className="flex-1 flex flex-col items-center gap-2 group">
                                <div className="w-full h-full flex items-end bg-gray-50 rounded-lg overflow-hidden relative">
                                    <div
                                        className="w-full bg-black/5 group-hover:bg-primary-500 transition-all duration-300 rounded-t-sm absolute bottom-0"
                                        style={{ height: `${(data.minutes / maxMinutes) * 100}%` }}
                                    />
                                </div>
                                <span className="text-xs font-bold text-gray-400 uppercase">{data.day}</span>
                            </div>
                        ))}
                    </div>
                    <div className="mt-6 pt-6 border-t-2 border-dashed border-gray-100">
                        <p className="text-sm text-gray-500 font-medium">
                            Total this week: <span className="font-black text-gray-900">{formatStudyTime(weeklyData.reduce((a, b) => a + b.minutes, 0))}</span>
                        </p>
                    </div>
                </div>

                {/* Quiz Performance */}
                <div className="bg-white rounded-lg p-6 border-2 border-dashed border-gray-200">
                    <h3 className="font-bold text-gray-900 mb-6 flex items-center gap-2 uppercase tracking-wider text-sm">
                        <TrendingUp className="w-4 h-4 text-gray-400" />
                        Quiz Performance
                    </h3>
                    <div className="space-y-5">
                        {quizPerformance.map((quiz, index) => (
                            <div key={index}>
                                <div className="flex items-center justify-between mb-2">
                                    <span className="text-sm font-bold text-gray-600">{quiz.name}</span>
                                    <span className={cn(
                                        "text-sm font-black",
                                        quiz.score >= 80 ? "text-green-600" : quiz.score >= 60 ? "text-yellow-600" : "text-red-600"
                                    )}>{quiz.score}%</span>
                                </div>
                                <div className="h-2.5 bg-gray-100 rounded-full overflow-hidden">
                                    <div
                                        className={cn(
                                            "h-full rounded-full transition-all duration-500",
                                            quiz.score >= 80 ? 'bg-green-500' : quiz.score >= 60 ? 'bg-yellow-500' : 'bg-red-500'
                                        )}
                                        style={{ width: `${quiz.score}%` }}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Topics Studied */}
                <div className="bg-white rounded-lg p-6 border-2 border-dashed border-gray-200">
                    <h3 className="font-bold text-gray-900 mb-6 flex items-center gap-2 uppercase tracking-wider text-sm">
                        <Calendar className="w-4 h-4 text-gray-400" />
                        Most Studied Topics
                    </h3>
                    <div className="space-y-4">
                        {topStudiedTopics.map((topic, index) => (
                            <div key={index} className="flex items-center gap-4 group">
                                <div className="w-8 h-8 rounded-lg bg-gray-50 border-2 border-dashed border-gray-200 flex items-center justify-center text-xs font-black text-gray-400 group-hover:border-purple-200 group-hover:text-purple-600 group-hover:bg-purple-50 transition-colors">
                                    {index + 1}
                                </div>
                                <div className="flex-1">
                                    <div className="flex items-center justify-between mb-1">
                                        <span className="text-sm font-bold text-gray-900">{topic.topic}</span>
                                        <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">{topic.hours}H</span>
                                    </div>
                                    <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                                        <div
                                            className="h-full bg-purple-500 rounded-full"
                                            style={{ width: `${topic.percentage}%` }}
                                        />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Strengths & Weaknesses */}
                <div className="bg-white rounded-lg p-6 border-2 border-dashed border-gray-200">
                    <h3 className="font-bold text-gray-900 mb-6 uppercase tracking-wider text-sm">Insights</h3>
                    <div className="space-y-4">
                        <div className="p-4 bg-green-50 rounded-lg border-2 border-dashed border-green-200">
                            <p className="text-xs font-black text-green-700 uppercase tracking-widest mb-1">✓ Strong in</p>
                            <p className="font-bold text-green-800">Character Analysis (92% avg)</p>
                        </div>
                        <div className="p-4 bg-orange-50 rounded-lg border-2 border-dashed border-orange-200">
                            <p className="text-xs font-black text-orange-700 uppercase tracking-widest mb-1">⚠ Needs work</p>
                            <p className="font-bold text-orange-800">Themes & Symbolism (68% avg)</p>
                        </div>
                        <div className="p-4 bg-blue-50 rounded-lg border-2 border-dashed border-blue-200">
                            <p className="text-xs font-black text-blue-700 uppercase tracking-widest mb-1">💡 Suggestion</p>
                            <p className="font-bold text-blue-800">Review Themes notes and retake the quiz</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
