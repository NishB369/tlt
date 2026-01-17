'use client';

import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    PieChart,
    Pie,
    Cell,
    AreaChart,
    Area
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
    Clock
} from 'lucide-react';
import {
    MOCK_NOVELS,
    MOCK_VIDEOS,
    MOCK_SUMMARIES,
    MOCK_NOTES,
    MOCK_QUIZZES
} from '@/src/lib/constants';

// --- Data Preparation ---

const STATS = [
    {
        label: 'Total Novels',
        value: MOCK_NOVELS.length,
        icon: BookOpen,
        color: 'text-blue-600',
        bg: 'bg-blue-50',
        trend: '+12% this month'
    },
    {
        label: 'Video Lessons',
        value: MOCK_VIDEOS.length,
        icon: Video,
        color: 'text-purple-600',
        bg: 'bg-purple-50',
        trend: '+5% this week'
    },
    {
        label: 'Summaries',
        value: MOCK_SUMMARIES.length,
        icon: FileText,
        color: 'text-orange-600',
        bg: 'bg-orange-50',
        trend: '+8 new added'
    },
    {
        label: 'Study Notes',
        value: MOCK_NOTES.length,
        icon: StickyNote,
        color: 'text-yellow-600',
        bg: 'bg-yellow-50',
        trend: '+15% engagement'
    },
    {
        label: 'Active Quizzes',
        value: MOCK_QUIZZES.length,
        icon: CheckCircle,
        color: 'text-green-600',
        bg: 'bg-green-50',
        trend: '98% completion rate'
    },
    {
        label: 'Total Students',
        value: '1,248', // Mocked user count
        icon: Users,
        color: 'text-indigo-600',
        bg: 'bg-indigo-50',
        trend: '+45 this week'
    }
];

const CONTENT_DATA = [
    { name: 'Novels', count: MOCK_NOVELS.length, color: '#2563EB' },
    { name: 'Videos', count: MOCK_VIDEOS.length, color: '#9333EA' },
    { name: 'Summaries', count: MOCK_SUMMARIES.length, color: '#EA580C' },
    { name: 'Notes', count: MOCK_NOTES.length, color: '#CA8A04' },
    { name: 'Quizzes', count: MOCK_QUIZZES.length, color: '#16A34A' },
];

const ACTIVITY_DATA = [
    { name: 'Mon', users: 400, content: 240 },
    { name: 'Tue', users: 300, content: 139 },
    { name: 'Wed', users: 550, content: 380 },
    { name: 'Thu', users: 500, content: 390 },
    { name: 'Fri', users: 700, content: 480 },
    { name: 'Sat', users: 450, content: 300 },
    { name: 'Sun', users: 600, content: 430 },
];

const COLORS = ['#2563EB', '#9333EA', '#EA580C', '#CA8A04', '#16A34A'];

const RECENT_ACTIVITY = [
    {
        id: 1,
        user: 'Administrator',
        action: 'Added new novel',
        target: 'Great Expectations',
        time: '2 hours ago',
        icon: BookOpen,
        color: 'bg-blue-100 text-blue-600'
    },
    {
        id: 2,
        user: 'Content Team',
        action: 'Published video',
        target: 'Chapter 5 Analysis',
        time: '4 hours ago',
        icon: Video,
        color: 'bg-purple-100 text-purple-600'
    },
    {
        id: 3,
        user: 'System',
        action: 'Backup completed',
        target: 'Daily Database Backup',
        time: '6 hours ago',
        icon: Activity,
        color: 'bg-gray-100 text-gray-600'
    },
    {
        id: 4,
        user: 'Manager',
        action: 'Updated quiz',
        target: 'Themes Assessment',
        time: '1 day ago',
        icon: CheckCircle,
        color: 'bg-green-100 text-green-600'
    }
];

export default function AdminHome() {
    return (
        <div className="space-y-8 pb-10">
            {/* Header */}
            <div>
                <h1 className="text-3xl font-black text-gray-900 tracking-tight">Analytics</h1>
                <p className="text-gray-500 font-medium mt-1">Overview of your platform's content and performance.</p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {STATS.map((stat) => (
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

            {/* Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Content Distribution Chart */}
                <div className="bg-white p-6 rounded-xl border-2 border-dashed border-gray-200">
                    <div className="flex items-center justify-between mb-6">
                        <h3 className="font-bold text-gray-900 text-lg">Content Distribution</h3>
                        <div className="p-2 bg-gray-50 rounded-lg">
                            <FileText className="w-5 h-5 text-gray-400" />
                        </div>
                    </div>
                    <div className="h-[300px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={CONTENT_DATA}>
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
                                    {CONTENT_DATA.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.color} />
                                    ))}
                                </Bar>
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* User Activity Chart */}
                <div className="bg-white p-6 rounded-xl border-2 border-dashed border-gray-200">
                    <div className="flex items-center justify-between mb-6">
                        <h3 className="font-bold text-gray-900 text-lg">Weekly Activity</h3>
                        <div className="p-2 bg-gray-50 rounded-lg">
                            <Activity className="w-5 h-5 text-gray-400" />
                        </div>
                    </div>
                    <div className="h-[300px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={ACTIVITY_DATA}>
                                <defs>
                                    <linearGradient id="colorUsers" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#818CF8" stopOpacity={0.3} />
                                        <stop offset="95%" stopColor="#818CF8" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
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
                                    contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                                />
                                <Area
                                    type="monotone"
                                    dataKey="users"
                                    stroke="#4F46E5"
                                    strokeWidth={3}
                                    fillOpacity={1}
                                    fill="url(#colorUsers)"
                                />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>
        </div>
    );
}
