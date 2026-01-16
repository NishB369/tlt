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
        <div className="space-y-6 animate-fade-in">
            {/* Header */}
            <div>
                <h1 className="text-4xl font-black text-gray-900 mb-2 tracking-tight">Quick Summaries</h1>
                <p className="text-gray-500 font-medium">Rapid revision guides for last-minute exam prep</p>
            </div>

            {/* Filters */}
            <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1 relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Search summaries..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-10 pr-4 py-3 bg-white border-2 border-dashed border-gray-200 rounded-lg text-sm font-medium text-gray-900 placeholder-gray-400 focus:outline-none focus:border-primary-500 focus:ring-0 transition-all"
                    />
                </div>
                <select
                    value={selectedNovel}
                    onChange={(e) => setSelectedNovel(e.target.value)}
                    className="px-4 py-3 bg-white border-2 border-dashed border-gray-200 rounded-lg text-sm font-medium text-gray-900 focus:outline-none focus:border-primary-500 focus:ring-0"
                >
                    <option value="all">All Novels</option>
                    {MOCK_NOVELS.map((novel) => (
                        <option key={novel.id} value={novel.title}>
                            {novel.title}
                        </option>
                    ))}
                </select>
            </div>

            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filteredSummaries.map((summary) => (
                    <div
                        key={summary.id}
                        className="group bg-white rounded-lg overflow-hidden shadow-sm border-2 border-dashed border-gray-200 hover:border-primary-300 transition-all"
                    >
                        <div className="p-6">
                            <div className="flex items-start gap-4">
                                <div className="w-12 h-12 rounded-lg bg-teal-50 border-2 border-dashed border-teal-200 flex items-center justify-center flex-shrink-0">
                                    <FileText className="w-6 h-6 text-teal-600" />
                                </div>
                                <div className="flex-1">
                                    <div className="flex items-center gap-2 mb-2">
                                        <span className="px-2 py-1 text-[10px] font-black text-primary-600 bg-primary-50 rounded border border-dashed border-primary-200 uppercase tracking-widest">
                                            {summary.novel}
                                        </span>
                                        <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">{summary.chapter}</span>
                                    </div>
                                    <h3 className="font-bold text-xl text-gray-900 mb-2 group-hover:text-primary-600 transition-colors">
                                        {summary.title}
                                    </h3>
                                    <div className="flex items-center gap-4 text-xs font-bold text-gray-400 uppercase tracking-wider">
                                        <span>{summary.keyPoints.length} key points</span>
                                        <span>•</span>
                                        <span>{summary.importantQuotes.length} quotes</span>
                                    </div>
                                </div>
                            </div>

                            {/* Key Points Preview */}
                            <div className="mt-6 p-5 bg-gray-50 rounded-lg border-2 border-dashed border-gray-100">
                                <h4 className="text-xs font-black text-gray-400 uppercase tracking-widest mb-3">Key Points Preview</h4>
                                <ul className="space-y-2">
                                    {summary.keyPoints.slice(0, 3).map((point: string, index: number) => (
                                        <li key={index} className="text-sm text-gray-600 font-medium flex items-start gap-2 leading-relaxed">
                                            <span className="text-primary-500 mt-1.5 w-1.5 h-1.5 rounded-full bg-primary-500 flex-shrink-0" />
                                            {point}
                                        </li>
                                    ))}
                                    {summary.keyPoints.length > 3 && (
                                        <li className="text-xs font-bold text-primary-600 uppercase tracking-wider pl-3.5 pt-1">
                                            +{summary.keyPoints.length - 3} more points...
                                        </li>
                                    )}
                                </ul>
                            </div>
                        </div>

                        {/* Footer */}
                        <div className="px-6 py-4 bg-gray-50 border-t-2 border-dashed border-gray-100 flex items-center justify-between">
                            <button className="flex items-center gap-2 text-xs font-bold text-gray-500 uppercase tracking-wider hover:text-primary-600 transition-colors group/btn">
                                <Download className="w-4 h-4 group-hover/btn:-translate-y-0.5 transition-transform" />
                                Download PDF
                            </button>
                            <Link
                                href={`/dashboard/summary/${summary.id}`}
                                className="flex items-center gap-2 px-5 py-2.5 bg-primary-500 hover:bg-primary-600 text-white text-xs font-black uppercase tracking-widest rounded-lg transition-all shadow-sm hover:shadow-md hover:-translate-y-0.5"
                            >
                                Read
                                <ArrowRight className="w-4 h-4" />
                            </Link>
                        </div>
                    </div>
                ))}
            </div>

            {/* Empty State */}
            {filteredSummaries.length === 0 && (
                <div className="text-center py-16 bg-white rounded-lg border-2 border-dashed border-gray-200">
                    <div className="text-6xl mb-4">📋</div>
                    <h3 className="text-xl font-black text-gray-900 mb-2">No summaries found</h3>
                    <p className="text-gray-500 font-medium">
                        Try adjusting your search or filter.
                    </p>
                </div>
            )}
        </div>
    );
}
