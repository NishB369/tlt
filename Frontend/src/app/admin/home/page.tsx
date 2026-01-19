'use client';

import { useState, useEffect } from 'react';
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    AreaChart,
    Area,
    Cell
} from 'recharts';
import {
    BookOpen,
    Video,
    FileText,
    StickyNote,
    CheckCircle,
    Users,
    TrendingUp,
    Activity,
    ChartArea,
    BarChart2
} from 'lucide-react';
import apiClient from '@/src/lib/apiClient';

// Mock activity data (keep for UI demo)
const ACTIVITY_DATA = [
    { name: 'Mon', users: 400 },
    { name: 'Tue', users: 300 },
    { name: 'Wed', users: 550 },
    { name: 'Thu', users: 500 },
    { name: 'Fri', users: 700 },
    { name: 'Sat', users: 450 },
    { name: 'Sun', users: 600 },
];

export default function AdminHome() {
    const [stats, setStats] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const response = await apiClient.get('/stats');
                setStats(response.data.data);
            } catch (error) {
                console.error('Error fetching stats:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchStats();
    }, []);

    const getStatsCards = () => {
        if (!stats) return [];

        return [
            {
                label: 'Total Novels',
                value: stats.counts.novelCount,
                icon: BookOpen,
                color: 'text-blue-600',
                bg: 'bg-blue-50',
                trend: '+12% this month' // Mock trend
            },
            {
                label: 'Video Lessons',
                value: stats.counts.videoCount,
                icon: Video,
                color: 'text-purple-600',
                bg: 'bg-purple-50',
                trend: '+5% this week'
            },
            {
                label: 'Summaries',
                value: stats.counts.summaryCount,
                icon: FileText,
                color: 'text-orange-600',
                bg: 'bg-orange-50',
                trend: '+8 new added'
            },
            {
                label: 'Study Notes',
                value: stats.counts.noteCount,
                icon: StickyNote,
                color: 'text-yellow-600',
                bg: 'bg-yellow-50',
                trend: '+15% engagement'
            },
            {
                label: 'Active Quizzes',
                value: stats.counts.quizCount,
                icon: CheckCircle,
                color: 'text-green-600',
                bg: 'bg-green-50',
                trend: '98% completion rate'
            },
            {
                label: 'Total Students',
                value: stats.counts.userCount,
                icon: Users,
                color: 'text-indigo-600',
                bg: 'bg-indigo-50',
                trend: '+45 this week'
            }
        ];
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center h-96">
                <div className="w-8 h-8 border-4 border-gray-200 border-t-gray-900 rounded-full animate-spin" />
            </div>
        );
    }

    const cards = getStatsCards();
    const contentData = stats?.contentDistribution || [];

    return (
        <div className="space-y-8 pb-10">
            {/* Header */}
            <div>
                <h1 className="text-3xl font-black text-gray-900 tracking-tight">Analytics</h1>
                <p className="text-gray-500 font-medium mt-1">Overview of your platform's content and performance.</p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {cards.map((stat) => (
                    <div key={stat.label} className="bg-white p-6 rounded-xl border-2 border-dashed border-gray-200 hover:border-gray-300 transition-colors group">
                        <div className="flex items-start justify-between mb-4">
                            <div className={`p-3 rounded-xl ${stat.bg} ${stat.color} group-hover:scale-110 transition-transform duration-300`}>
                                <stat.icon className="w-6 h-6" />
                            </div>
                            <span className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-green-600 bg-green-50 px-2 py-1 rounded-md">
                                <TrendingUp className="w-3 h-3" />
                                {stat.trend}
                            </span>
                        </div>
                        <div>
                            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">{stat.label}</p>
                            <h3 className="text-4xl font-black text-gray-900 tracking-tight">{stat.value}</h3>
                        </div>
                    </div>
                ))}
            </div>

            {/* Content Distribution Chart */}
            <div className="bg-white p-6 rounded-xl border-2 border-dashed border-gray-200">
                <div className="flex items-center justify-between mb-6">
                    <h3 className="font-bold text-gray-900 text-lg">Content Distribution</h3>
                    <div className="p-2 bg-gray-50 rounded-lg">
                        <BarChart2 className="w-5 h-5 text-gray-400" />
                    </div>
                </div>
                <div className="h-[300px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={contentData}>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                            <XAxis
                                dataKey="name"
                                axisLine={false}
                                tickLine={false}
                                tick={{ fill: '#6B7280', fontSize: 12, fontWeight: 600 }}
                                dy={10}
                            />
                            <YAxis
                                axisLine={false}
                                tickLine={false}
                                tick={{ fill: '#6B7280', fontSize: 12 }}
                            />
                            <Tooltip
                                cursor={{ fill: '#F3F4F6' }}
                                contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                            />
                            <Bar dataKey="count" radius={[4, 4, 0, 0]}>
                                {contentData.map((entry: any, index: number) => (
                                    <Cell key={`cell-${index}`} fill={entry.color} />
                                ))}
                            </Bar>
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
}
