'use client';

import { useState } from 'react';
import Link from 'next/link';
import { MOCK_QUIZZES, MOCK_NOVELS } from '@/src/lib/constants';
import { Search, Clock, CheckCircle, Trophy, ArrowRight, HelpCircle } from 'lucide-react';
import { cn } from '@/src/lib/utils';

export default function QuizListPage() {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedNovel, setSelectedNovel] = useState<string>('all');

    const filteredQuizzes = MOCK_QUIZZES.filter((quiz) => {
        const matchesSearch = quiz.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            quiz.description.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesNovel = selectedNovel === 'all' || quiz.novel === selectedNovel;
        return matchesSearch && matchesNovel;
    });

    // Mock user quiz data
    const userQuizData: Record<string, { bestScore: number; attempts: number }> = {
        q1: { bestScore: 85, attempts: 2 },
    };

    return (
        <div className="space-y-8 animate-fade-in max-w-7xl mx-auto">
            {/* Header */}
            <div className="flex flex-col gap-2">
                <h1 className="text-4xl font-black text-gray-900 tracking-tight">Quizzes</h1>
                <p className="text-gray-500 font-medium">Test your knowledge with interactive quizzes</p>
            </div>

            {/* Filters */}
            <div className="flex flex-col sm:flex-row gap-4">
                {/* Search */}
                <div className="flex-1 relative group">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 group-focus-within:text-accent-500 transition-colors" />
                    <input
                        type="text"
                        placeholder="Search quizzes..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-11 pr-4 py-3 bg-white border-2 border-dashed border-gray-200 rounded-lg text-sm font-medium text-gray-900 placeholder-gray-400 focus:outline-none focus:border-accent-500 focus:ring-0 transition-all shadow-sm group-hover:border-gray-300"
                    />
                </div>

                {/* Novel Filter */}
                <div className="relative group">
                    <select
                        value={selectedNovel}
                        onChange={(e) => setSelectedNovel(e.target.value)}
                        className="appearance-none pl-4 pr-10 py-3 bg-white border-2 border-dashed border-gray-200 rounded-lg text-sm font-bold text-gray-700 focus:outline-none focus:border-accent-500 focus:ring-0 transition-all cursor-pointer hover:border-gray-300 min-w-[200px]"
                    >
                        <option value="all">All Novels</option>
                        {MOCK_NOVELS.map((novel) => (
                            <option key={novel.id} value={novel.title}>
                                {novel.title}
                            </option>
                        ))}
                    </select>
                    <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                        <div className="w-0 h-0 border-l-[5px] border-l-transparent border-r-[5px] border-r-transparent border-t-[6px] border-t-gray-400 group-hover:border-t-gray-600 transition-colors" />
                    </div>
                </div>
            </div>

            {/* Quiz Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredQuizzes.map((quiz) => {
                    const userData = userQuizData[quiz.id];
                    const hasAttempted = !!userData;

                    return (
                        <div
                            key={quiz.id}
                            className="group flex flex-col bg-white rounded-lg overflow-hidden border-2 border-dashed border-gray-200 hover:border-accent-400 transition-all duration-300 hover:-translate-y-1"
                        >
                            {/* Header */}
                            <div className="p-6 flex-1 flex flex-col">
                                <div className="flex items-center gap-3 mb-4">
                                    <span className="px-2 py-1 text-[10px] font-black text-accent-600 bg-accent-50 rounded border border-dashed border-accent-200 uppercase tracking-widest">
                                        {quiz.novel}
                                    </span>
                                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest truncate">
                                        {quiz.chapter}
                                    </span>
                                </div>

                                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-accent-600 transition-colors">
                                    {quiz.title}
                                </h3>
                                <p className="text-sm font-medium text-gray-500 mb-6 line-clamp-2 leading-relaxed">
                                    {quiz.description}
                                </p>

                                {/* Quiz Stats */}
                                <div className="mt-auto flex flex-wrap items-center gap-4 text-xs font-bold text-gray-400 uppercase tracking-wider">
                                    <div className="flex items-center gap-1.5">
                                        <CheckCircle className="w-4 h-4" />
                                        <span>{quiz.questions.length} Qs</span>
                                    </div>
                                    {quiz.timeLimit && (
                                        <div className="flex items-center gap-1.5">
                                            <Clock className="w-4 h-4" />
                                            <span>{Math.floor(quiz.timeLimit / 60)} min</span>
                                        </div>
                                    )}
                                    <div className="flex items-center gap-1.5">
                                        <Trophy className="w-4 h-4" />
                                        <span>{quiz.totalPoints} pts</span>
                                    </div>
                                </div>
                            </div>

                            {/* Footer */}
                            <div className="px-6 py-4 bg-gray-50 border-t-2 border-dashed border-gray-100 flex items-center justify-between">
                                {hasAttempted ? (
                                    <div className="text-xs font-bold">
                                        <span className="text-gray-500 uppercase tracking-wider">Best: </span>
                                        <span className={cn(
                                            'ml-1',
                                            userData.bestScore >= quiz.passingScore
                                                ? 'text-green-600'
                                                : 'text-orange-600'
                                        )}>
                                            {userData.bestScore}%
                                        </span>
                                        <span className="text-gray-300 mx-2">|</span>
                                        <span className="text-gray-500">{userData.attempts} tries</span>
                                    </div>
                                ) : (
                                    <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Not attempted</span>
                                )}
                                <Link
                                    href={`/dashboard/quiz/${quiz.id}`}
                                    className={cn(
                                        "flex items-center gap-2 px-4 py-2 text-xs font-black uppercase tracking-wider rounded-lg border-2 border-dashed transition-all",
                                        hasAttempted
                                            ? "bg-white border-gray-200 text-gray-600 hover:border-gray-300 hover:text-gray-900"
                                            : "bg-accent-50 border-accent-200 text-accent-700 hover:bg-accent-100"
                                    )}
                                >
                                    {hasAttempted ? 'Retake' : 'Start'}
                                    <ArrowRight className="w-3 h-3" />
                                </Link>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Empty State */}
            {filteredQuizzes.length === 0 && (
                <div className="text-center py-20 bg-white rounded-lg border-2 border-dashed border-gray-200">
                    <div className="w-16 h-16 bg-gray-50 rounded-lg flex items-center justify-center mx-auto mb-4 border-2 border-dashed border-gray-200">
                        <HelpCircle className="w-8 h-8 text-gray-300" />
                    </div>
                    <h3 className="text-lg font-black text-gray-900 mb-2">No quizzes found</h3>
                    <p className="text-sm font-medium text-gray-500 max-w-md mx-auto">
                        We couldn't find any quizzes matching your search. Try adjusting your filters or search terms.
                    </p>
                </div>
            )}
        </div>
    );
}
