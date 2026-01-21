'use client';

import { WelcomeCard } from '@/src/components/dashboard/WelcomeCard';
import { StatsCard } from '@/src/components/dashboard/StatsCard';
import { ProgressRing } from '@/src/components/dashboard/ProgressRing';
import { RecentActivity } from '@/src/components/dashboard/RecentActivity';
import { AchievementsList } from '@/src/components/dashboard/AchievementsList';
import { MOCK_USER_STATS, MOCK_VIDEOS } from '@/src/lib/constants';
import { formatStudyTime } from '@/src/lib/utils';
import { Video, CheckCircle, Clock, Flame, Play, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function DashboardPage() {
    const stats = MOCK_USER_STATS;
    const lastVideo = MOCK_VIDEOS[1]; // Simulating the last watched video

    return (
        <div className="space-y-6 animate-fade-in p-2 md:p-0">
            {/* Welcome Card */}
            <WelcomeCard />

            {/* Stats Grid */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
                <StatsCard
                    title="Videos Watched"
                    value={stats.totalVideosWatched}
                    icon={Video}
                    change="+3 this week"
                    changeType="positive"
                    color="blue"
                />
                <StatsCard
                    title="Quizzes Completed"
                    value={stats.totalQuizzesTaken}
                    icon={CheckCircle}
                    change="+2 this week"
                    changeType="positive"
                    color="green"
                />
                <StatsCard
                    title="Study Time"
                    value={formatStudyTime(stats.totalStudyTime)}
                    icon={Clock}
                    change="+45m today"
                    changeType="positive"
                    color="purple"
                />
                <StatsCard
                    title="Current Streak"
                    value={`${stats.currentStreak} days`}
                    icon={Flame}
                    change={`Best: ${stats.longestStreak} days`}
                    changeType="neutral"
                    color="orange"
                />
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Left Column - Progress & Continue Learning */}
                <div className="lg:col-span-2 space-y-6">
                    {/* Progress Overview */}
                    <div className="bg-white rounded-lg p-5 md:p-6 border-2 border-dashed border-gray-200">
                        <h3 className="text-[11px] font-black text-gray-400 uppercase tracking-widest mb-6 md:mb-8">Progress Overview</h3>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-6 md:gap-10">
                            <ProgressRing
                                percentage={45}
                                title="Pride and Prejudice"
                                subtitle="27 of 61 chapters"
                            />
                            <ProgressRing
                                percentage={20}
                                title="Wuthering Heights"
                                subtitle="7 of 34 chapters"
                            />
                            <ProgressRing
                                percentage={60}
                                title="The Great Gatsby"
                                subtitle="5 of 9 chapters"
                            />
                        </div>
                    </div>

                    {/* Continue Learning */}
                    <div className="bg-white rounded-lg p-6 border-2 border-dashed border-gray-200 group">
                        <div className="flex items-center justify-between mb-8">
                            <h3 className="text-[11px] font-black text-gray-400 uppercase tracking-widest">Continue Learning</h3>
                            <Link
                                href="/dashboard/videos"
                                className="text-[10px] font-black text-accent-600 uppercase tracking-widest hover:underline flex items-center gap-1"
                            >
                                View All <ArrowRight className="w-3 h-3" />
                            </Link>
                        </div>
                        <div className="flex flex-col sm:flex-row gap-6">
                            {/* Video Thumbnail */}
                            <div className="relative w-full sm:w-72 aspect-video rounded-lg overflow-hidden bg-gray-100 flex-shrink-0 border-2 border-dashed border-transparent group-hover:border-accent-200 transition-all duration-300">
                                <img
                                    src={lastVideo.thumbnail}
                                    alt={lastVideo.title}
                                    className="w-full h-full object-cover grayscale brightness-90 group-hover:grayscale-0 group-hover:brightness-100 transition-all duration-500"
                                />
                                <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                    <div className="w-12 h-12 rounded-lg bg-accent-500 flex items-center justify-center text-white shadow-xl active:scale-90 transition-transform">
                                        <Play className="w-6 h-6 fill-current ml-1" />
                                    </div>
                                </div>
                                {/* Progress Bar */}
                                <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-gray-200/50 backdrop-blur-sm">
                                    <div className="h-full bg-accent-500" style={{ width: '60%' }} />
                                </div>
                            </div>
                            {/* Video Info */}
                            <div className="flex-1 flex flex-col">
                                <span className="inline-block self-start px-2 py-1 text-[10px] font-black text-accent-600 bg-accent-50 rounded border border-dashed border-accent-200 uppercase tracking-widest mb-3">
                                    {typeof lastVideo.novel === 'object' ? lastVideo.novel.title : lastVideo.novel} • {lastVideo.chapter}
                                </span>
                                <h4 className="text-xl font-black text-gray-900 mb-2 tracking-tight">
                                    {lastVideo.title}
                                </h4>
                                <p className="text-sm font-medium text-gray-500 mb-6 line-clamp-2">
                                    {lastVideo.description}
                                </p>
                                <div className="mt-auto flex items-center gap-4">
                                    <Link
                                        href={`/dashboard/videos/${lastVideo.id}`}
                                        className="px-6 py-2.5 bg-accent-500 hover:bg-accent-600 text-white font-black text-xs uppercase tracking-widest rounded-lg transition-all active:scale-95 shadow-[4px_4px_0px_0px_rgba(255,85,0,0.2)] flex items-center gap-2"
                                    >
                                        <Play className="w-4 h-4 fill-current" />
                                        Continue
                                    </Link>
                                    <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">
                                        60% complete
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Column - Activity & Achievements */}
                <div className="space-y-6">
                    <RecentActivity />
                    <AchievementsList />
                </div>
            </div>
        </div>
    );
}
