'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useSummaries } from '@/src/hooks/useSummaries';
import { useBookmarks } from '@/src/hooks/useBookmarks';
import { useNovels } from '@/src/hooks/useNovels';
import { cn } from '@/src/lib/utils';
import { Search, FileText, ArrowRight } from 'lucide-react';
import { BookmarkButton } from '@/src/components/common/BookmarkButton';
import { NoteListSkeleton } from '@/src/components/common/Skeletons';

export default function SummaryPage() {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedNovel, setSelectedNovel] = useState<string>('all');

    const { summaries, loading, error } = useSummaries();
    const { novels } = useNovels();

    const filteredSummaries = summaries.filter((summary) => {
        const matchesSearch = summary.title.toLowerCase().includes(searchQuery.toLowerCase());
        const summaryNovelTitle = typeof summary.novel === 'object' ? summary.novel.title : summary.novel;
        const matchesNovel = selectedNovel === 'all' || summaryNovelTitle === selectedNovel;

        return matchesSearch && matchesNovel;
    });

    if (loading) {
        return <NoteListSkeleton />;
    }

    if (error) {
        return (
            <div className="flex flex-col items-center justify-center h-96">
                <div className="text-red-500 mb-4">⚠️</div>
                <h3 className="text-lg font-semibold text-gray-900">Failed to load summaries</h3>
                <p className="text-gray-500 text-sm mb-4">{error}</p>
            </div>
        );
    }

    return (
        <div className="space-y-6 md:space-y-8 animate-fade-in max-w-7xl mx-auto">
            {/* Header */}
            <div className="flex flex-col gap-2">
                <h1 className="text-2xl md:text-4xl font-black text-gray-900 tracking-tight">Quick Summaries</h1>
                <p className="text-sm md:text-base text-gray-500 font-medium">Rapid revision guides for last-minute exam prep</p>
            </div>

            {/* Filters */}
            <div className="flex flex-col sm:flex-row gap-3 md:gap-4">
                <div className="flex-1 relative group">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 group-focus-within:text-bg-primary-500 transition-colors" />
                    <input
                        type="text"
                        placeholder="Search summaries..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-11 pr-4 py-2.5 md:py-3 bg-white border-2 border-dashed border-gray-200 rounded-lg text-sm font-medium text-gray-900 placeholder-gray-400 focus:outline-none focus:border-primary-500 focus:ring-0 transition-all shadow-sm group-hover:border-gray-300"
                    />
                </div>
                <div className="relative group">
                    <select
                        value={selectedNovel}
                        onChange={(e) => setSelectedNovel(e.target.value)}
                        className="w-full sm:w-auto appearance-none pl-4 pr-10 py-2.5 md:py-3 bg-white border-2 border-dashed border-gray-200 rounded-lg text-sm font-bold text-gray-700 focus:outline-none focus:border-primary-500 focus:ring-0 transition-all cursor-pointer hover:border-gray-300 min-w-[200px]"
                    >
                        <option value="all">All Novels</option>
                        {novels.map((novel) => (
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

            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                {filteredSummaries.map((summary) => (
                    <Link
                        key={summary.id}
                        href={`/dashboard/summary/${summary.id}`}
                        className="group flex flex-col bg-white rounded-lg p-5 md:p-6 border-2 border-dashed border-gray-200 hover:border-primary-400 transition-all duration-300 hover:-translate-y-1"
                    >
                        <div className="flex items-start justify-between mb-4 md:mb-5">
                            <div className="p-2.5 md:p-3 rounded-lg border-2 border-dashed border-gray-100 bg-gray-50 group-hover:border-primary-200 group-hover:bg-primary-50 transition-colors">
                                <FileText className="w-5 h-5 md:w-6 md:h-6 text-gray-400 group-hover:text-primary-500 transition-colors" />
                            </div>
                            <BookmarkButton
                                itemId={summary.id}
                                itemType="Summary"
                                className="shadow-sm"
                            />
                        </div>

                        <div className="flex items-center gap-2 mb-3">
                            <span className="px-2 py-0.5 md:py-1 text-[10px] font-black text-primary-600 bg-primary-50 rounded border border-dashed border-primary-200 uppercase tracking-widest truncate max-w-[150px]">
                                {typeof summary.novel === 'object' ? summary.novel.title : summary.novel}
                            </span>
                            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest truncate">
                                {summary.chapter}
                            </span>
                        </div>

                        <h3 className="font-bold text-gray-900 text-base md:text-lg mb-2 md:mb-3 group-hover:text-primary-600 transition-colors line-clamp-2 leading-tight">
                            {summary.title}
                        </h3>

                        <p className="text-sm text-gray-500 leading-relaxed mb-4 md:mb-6 line-clamp-3 border-l-2 border-gray-100 pl-3 group-hover:border-primary-200 transition-colors">
                            {summary.content.replace(/[#*\n]/g, ' ').slice(0, 150)}...
                        </p>

                        <div className="mt-auto pt-4 border-t-2 border-dashed border-gray-100 flex items-center justify-between">
                            <div className="flex items-center gap-2 text-[10px] font-bold text-gray-400 uppercase tracking-wider">
                                <span>{summary.importantQuotes.length} quotes</span>
                            </div>
                            <span className="flex items-center gap-2 px-3 py-1.5 bg-primary-50 text-primary-600 rounded-md text-[10px] font-black uppercase tracking-wider group-hover:bg-primary-500 group-hover:text-white transition-all transform group-hover:translate-x-0 translate-x-0">
                                Read <ArrowRight className="w-3.5 h-3.5" />
                            </span>
                        </div>
                    </Link>
                ))}
            </div>

            {/* Empty State */}
            {filteredSummaries.length === 0 && (
                <div className="text-center py-10 md:py-16 bg-white rounded-lg border-2 border-dashed border-gray-200">
                    <div className="text-4xl md:text-6xl mb-3 md:mb-4">📋</div>
                    <h3 className="text-lg md:text-xl font-black text-gray-900 mb-2">No summaries found</h3>
                    <p className="text-sm md:text-base text-gray-500 font-medium max-w-md mx-auto px-4">
                        Try adjusting your search or filter.
                    </p>
                </div>
            )}
        </div>
    );
}
