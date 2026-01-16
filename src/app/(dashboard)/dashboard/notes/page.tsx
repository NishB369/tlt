'use client';

import { useState } from 'react';
import Link from 'next/link';
import { MOCK_NOTES, MOCK_NOVELS } from '@/src/lib/constants';
import { Search, BookOpen, Filter, Clock, Bookmark, FileText } from 'lucide-react';
import { formatRelativeTime, cn } from '@/src/lib/utils';

export default function NotesPage() {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedNovel, setSelectedNovel] = useState<string>('all');

    const filteredNotes = MOCK_NOTES.filter((note) => {
        const matchesSearch = note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            note.content.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesNovel = selectedNovel === 'all' || note.novel === selectedNovel;
        return matchesSearch && matchesNovel;
    });

    return (
        <div className="space-y-8 animate-fade-in max-w-7xl mx-auto">
            {/* Header */}
            <div className="flex flex-col gap-2">
                <h1 className="text-4xl font-black text-gray-900 tracking-tight">Study Notes</h1>
                <p className="text-gray-500 font-medium">Comprehensive notes and analysis for your literature studies</p>
            </div>

            {/* Filters */}
            <div className="flex flex-col sm:flex-row gap-4">
                {/* Search */}
                <div className="flex-1 relative group">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 group-focus-within:text-accent-500 transition-colors" />
                    <input
                        type="text"
                        placeholder="Search notes..."
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

            {/* Notes Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredNotes.map((note) => (
                    <Link
                        key={note.id}
                        href={`/dashboard/notes/${note.id}`}
                        className="group flex flex-col bg-white rounded-lg p-6 border-2 border-dashed border-gray-200 hover:border-accent-400 transition-all duration-300 hover:-translate-y-1"
                    >
                        <div className="flex items-start justify-between mb-5">
                            <div className="p-3 rounded-lg border-2 border-dashed border-gray-100 bg-gray-50 group-hover:border-accent-200 group-hover:bg-accent-50 transition-colors">
                                <BookOpen className="w-6 h-6 text-gray-400 group-hover:text-accent-500 transition-colors" />
                            </div>
                            <button
                                className="p-2 rounded-lg text-gray-300 hover:text-accent-500 hover:bg-accent-50 transition-all"
                                onClick={(e) => {
                                    e.preventDefault();
                                    // Handle bookmark
                                }}
                            >
                                <Bookmark className="w-5 h-5" />
                            </button>
                        </div>

                        <div className="flex items-center gap-2 mb-3">
                            <span className="px-2 py-1 text-[10px] font-black text-accent-600 bg-accent-50 rounded border border-dashed border-accent-200 uppercase tracking-widest">
                                {note.novel}
                            </span>
                            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest truncate">
                                {note.chapter}
                            </span>
                        </div>

                        <h3 className="font-bold text-gray-900 text-lg mb-3 group-hover:text-accent-600 transition-colors line-clamp-2 leading-tight">
                            {note.title}
                        </h3>

                        <p className="text-sm text-gray-500 leading-relaxed mb-6 line-clamp-3 border-l-2 border-gray-100 pl-3 group-hover:border-accent-200 transition-colors">
                            {note.content.replace(/[#*\n]/g, ' ').slice(0, 150)}...
                        </p>

                        <div className="mt-auto pt-4 border-t-2 border-dashed border-gray-100 flex items-center justify-between">
                            <div className="flex items-center gap-2 text-[10px] font-bold text-gray-400 uppercase tracking-wider">
                                <Clock className="w-3 h-3" />
                                <span>Updated {formatRelativeTime(note.updatedAt)}</span>
                            </div>
                            <span className="text-accent-500 opacity-0 group-hover:opacity-100 transition-opacity transform translate-x-[-10px] group-hover:translate-x-0 duration-300">
                                <FileText className="w-4 h-4" />
                            </span>
                        </div>
                    </Link>
                ))}
            </div>

            {/* Empty State */}
            {filteredNotes.length === 0 && (
                <div className="text-center py-20 bg-white rounded-lg border-2 border-dashed border-gray-200">
                    <div className="w-16 h-16 bg-gray-50 rounded-lg flex items-center justify-center mx-auto mb-4 border-2 border-dashed border-gray-200">
                        <FileText className="w-8 h-8 text-gray-300" />
                    </div>
                    <h3 className="text-lg font-black text-gray-900 mb-2">No notes found</h3>
                    <p className="text-sm font-medium text-gray-500 max-w-md mx-auto">
                        We couldn't find any notes matching your search. Try adjusting your filters or search terms.
                    </p>
                </div>
            )}
        </div>
    );
}
