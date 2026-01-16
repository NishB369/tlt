'use client';

import { Bookmark, Video, BookOpen, CheckCircle, FileText, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { MOCK_VIDEOS, MOCK_NOTES, MOCK_QUIZZES } from '@/src/lib/constants';
import { cn } from '@/src/lib/utils';

export default function BookmarksPage() {
    // Mock bookmarked items
    const bookmarks = [
        { type: 'video' as const, item: MOCK_VIDEOS[1] },
        { type: 'note' as const, item: MOCK_NOTES[0] },
        { type: 'quiz' as const, item: MOCK_QUIZZES[0] },
    ];

    const getIcon = (type: string) => {
        switch (type) {
            case 'video': return Video;
            case 'note': return BookOpen;
            case 'quiz': return CheckCircle;
            case 'summary': return FileText;
            default: return Bookmark;
        }
    };

    const getColor = (type: string) => {
        switch (type) {
            case 'video': return 'text-blue-600 bg-blue-50 border-blue-200 group-hover:bg-blue-100 group-hover:border-blue-300';
            case 'note': return 'text-purple-600 bg-purple-50 border-purple-200 group-hover:bg-purple-100 group-hover:border-purple-300';
            case 'quiz': return 'text-green-600 bg-green-50 border-green-200 group-hover:bg-green-100 group-hover:border-green-300';
            case 'summary': return 'text-teal-600 bg-teal-50 border-teal-200 group-hover:bg-teal-100 group-hover:border-teal-300';
            default: return 'text-gray-600 bg-gray-50 border-gray-200 group-hover:bg-gray-100 group-hover:border-gray-300';
        }
    };

    const getLink = (type: string, id: string) => {
        switch (type) {
            case 'video': return `/dashboard/videos/${id}`;
            case 'note': return `/dashboard/notes/${id}`;
            case 'quiz': return `/dashboard/quiz/${id}`;
            case 'summary': return `/dashboard/summary/${id}`;
            default: return '#';
        }
    };

    return (
        <div className="space-y-6 animate-fade-in">
            {/* Header */}
            <div>
                <h1 className="text-4xl font-black text-gray-900 mb-2 tracking-tight">Bookmarks</h1>
                <p className="text-gray-500 font-medium">Your saved content for quick access</p>
            </div>

            {/* Bookmarks List */}
            <div className="bg-white rounded-lg shadow-sm border-2 border-dashed border-gray-200 overflow-hidden">
                {bookmarks.map((bookmark, index) => {
                    const Icon = getIcon(bookmark.type);
                    const colorClass = getColor(bookmark.type);

                    return (
                        <Link
                            key={index}
                            href={getLink(bookmark.type, bookmark.item.id)}
                            className="group flex items-center gap-4 p-4 hover:bg-gray-50 transition-all border-b-2 border-dashed border-gray-100 last:border-b-0"
                        >
                            <div className={cn("w-12 h-12 rounded-lg flex items-center justify-center border-2 border-dashed transition-colors", colorClass)}>
                                <Icon className="w-6 h-6" />
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="font-bold text-gray-900 text-lg group-hover:text-primary-600 transition-colors truncate">
                                    {bookmark.item.title}
                                </p>
                                <p className="text-xs font-bold text-gray-400 capitalize flex items-center gap-2">
                                    <span className="uppercase tracking-wider">{bookmark.type}</span>
                                    <span>•</span>
                                    <span>{'novel' in bookmark.item ? bookmark.item.novel : ''}</span>
                                </p>
                            </div>
                            <button
                                onClick={(e) => {
                                    e.preventDefault();
                                    // Remove bookmark
                                }}
                                className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                            >
                                <Bookmark className="w-5 h-5 fill-current" />
                            </button>
                            <ArrowRight className="w-5 h-5 text-gray-300 group-hover:text-primary-500 group-hover:translate-x-1 transition-all" />
                        </Link>
                    );
                })}

                {bookmarks.length === 0 && (
                    <div className="text-center py-16">
                        <div className="w-16 h-16 bg-gray-50 rounded-full border-2 border-dashed border-gray-200 flex items-center justify-center mx-auto mb-4">
                            <Bookmark className="w-8 h-8 text-gray-400" />
                        </div>
                        <h3 className="text-xl font-black text-gray-900 mb-2">No bookmarks yet</h3>
                        <p className="text-gray-500 font-medium">
                            Start saving content to access it quickly later.
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}
