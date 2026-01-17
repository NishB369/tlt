'use client';

import Link from 'next/link';
import { MOCK_SUMMARIES, MOCK_NOVELS } from '@/src/lib/constants';
import { Search, FileText, Download, ArrowRight } from 'lucide-react';
import { useState } from 'react';

export default function SummaryPage() {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedNovel, setSelectedNovel] = useState<string>('all');

    const filteredSummaries = MOCK_SUMMARIES.filter((summary) => {
        const matchesSearch = summary.title.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesNovel = selectedNovel === 'all' || summary.novel === selectedNovel;
        return matchesSearch && matchesNovel;
    });

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

            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                {filteredSummaries.map((summary) => (
                    <div
                        key={summary.id}
                        className="group flex flex-col bg-white rounded-lg overflow-hidden shadow-sm border-2 border-dashed border-gray-200 hover:border-primary-300 transition-all duration-300 hover:-translate-y-1"
                    >
                        <div className="p-5 md:p-6 flex-1 flex flex-col">
                            <div className="flex items-start gap-4">
                                <div className="w-10 h-10 md:w-12 md:h-12 rounded-lg bg-teal-50 border-2 border-dashed border-teal-200 flex items-center justify-center flex-shrink-0">
                                    <FileText className="w-5 h-5 md:w-6 md:h-6 text-teal-600" />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-2 mb-2 flex-wrap">
                                        <span className="px-2 py-0.5 md:py-1 text-[10px] font-black text-primary-600 bg-primary-50 rounded border border-dashed border-primary-200 uppercase tracking-widest truncate max-w-full">
                                            {summary.novel}
                                        </span>
                                        <span className="text-[10px] md:text-xs font-bold text-gray-400 uppercase tracking-wider whitespace-nowrap">{summary.chapter}</span>
                                    </div>
                                    <h3 className="font-bold text-lg md:text-xl text-gray-900 mb-2 group-hover:text-primary-600 transition-colors line-clamp-2 leading-tight">
                                        {summary.title}
                                    </h3>
                                    <div className="flex items-center gap-3 md:gap-4 text-[10px] md:text-xs font-bold text-gray-400 uppercase tracking-wider flex-wrap">
                                        <span>{summary.keyPoints.length} key points</span>
                                        <span className="hidden sm:inline">•</span>
                                        <span>{summary.importantQuotes.length} quotes</span>
                                    </div>
                                </div>
                            </div>

                            {/* Key Points Preview */}
                            <div className="mt-5 md:mt-6 p-4 md:p-5 bg-gray-50 rounded-lg border-2 border-dashed border-gray-100 flex-1">
                                <h4 className="text-[10px] md:text-xs font-black text-gray-400 uppercase tracking-widest mb-2 md:mb-3">Key Points Preview</h4>
                                <ul className="space-y-2">
                                    {summary.keyPoints.slice(0, 3).map((point: string, index: number) => (
                                        <li key={index} className="text-xs md:text-sm text-gray-600 font-medium flex items-start gap-2 leading-relaxed">
                                            <span className="text-primary-500 mt-1.5 w-1.5 h-1.5 rounded-full bg-primary-500 flex-shrink-0" />
                                            <span className="line-clamp-2">{point}</span>
                                        </li>
                                    ))}
                                    {summary.keyPoints.length > 3 && (
                                        <li className="text-[10px] md:text-xs font-bold text-primary-600 uppercase tracking-wider pl-3.5 pt-1">
                                            +{summary.keyPoints.length - 3} more points...
                                        </li>
                                    )}
                                </ul>
                            </div>
                        </div>

                        {/* Footer */}
                        <div className="px-5 md:px-6 py-3 md:py-4 bg-gray-50 border-t-2 border-dashed border-gray-100 flex items-center justify-between mt-auto">
                            <button className="flex items-center gap-2 text-[10px] md:text-xs font-bold text-gray-500 uppercase tracking-wider hover:text-primary-600 transition-colors group/btn">
                                <Download className="w-3.5 h-3.5 md:w-4 md:h-4 group-hover/btn:-translate-y-0.5 transition-transform" />
                                Download PDF
                            </button>
                            <Link
                                href={`/dashboard/summary/${summary.id}`}
                                className="flex items-center gap-2 px-4 py-2 md:px-5 md:py-2.5 bg-primary-500 hover:bg-primary-600 text-white text-[10px] md:text-xs font-black uppercase tracking-widest rounded-lg transition-all shadow-sm hover:shadow-md hover:-translate-y-0.5"
                            >
                                Read
                                <ArrowRight className="w-3.5 h-3.5 md:w-4 md:h-4" />
                            </Link>
                        </div>
                    </div>
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
