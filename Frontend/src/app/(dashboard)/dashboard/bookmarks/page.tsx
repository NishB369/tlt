'use client';

import { Bookmark, Video, BookOpen, CheckCircle, FileText, ArrowRight } from 'lucide-react';
import Link from 'next/link';

import { BookmarkButton } from '@/src/components/common/BookmarkButton';
import { useBookmarks } from '@/src/hooks/useBookmarks';
import { cn } from '@/src/lib/utils';

export default function BookmarksPage() {
    const { bookmarks, isLoading } = useBookmarks();

    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500"></div>
            </div>
        );
    }

    const getIcon = (type: string) => {
        switch (type) {
            case 'Video': return Video;
            case 'Note': return BookOpen;
            case 'Quiz': return CheckCircle;
            case 'Summary': return FileText;
            default: return Bookmark;
        }
    };

    const getColor = (type: string) => {
        switch (type) {
            case 'Video': return 'text-blue-600 bg-blue-50 border-blue-200 group-hover:bg-blue-100 group-hover:border-blue-300';
            case 'Note': return 'text-purple-600 bg-purple-50 border-purple-200 group-hover:bg-purple-100 group-hover:border-purple-300';
            case 'Quiz': return 'text-green-600 bg-green-50 border-green-200 group-hover:bg-green-100 group-hover:border-green-300';
            case 'Summary': return 'text-teal-600 bg-teal-50 border-teal-200 group-hover:bg-teal-100 group-hover:border-teal-300';
            default: return 'text-gray-600 bg-gray-50 border-gray-200 group-hover:bg-gray-100 group-hover:border-gray-300';
        }
    };

    const getLink = (type: string, id: string) => {
        switch (type) {
            case 'Video': return `/dashboard/videos/${id}`;
            case 'Note': return `/dashboard/notes/${id}`;
            case 'Quiz': return `/dashboard/quiz/${id}`;
            case 'Summary': return `/dashboard/summary/${id}`;
            default: return '#';
        }
    };

    return (
        <div className="space-y-4 md:space-y-6 animate-fade-in max-w-7xl mx-auto">
            {/* Header */}
            <div>
                <h1 className="text-2xl md:text-4xl font-black text-gray-900 mb-1 md:mb-2 tracking-tight">Bookmarks</h1>
                <p className="text-sm md:text-base text-gray-500 font-medium">Your saved content for quick access</p>
            </div>

            {/* Bookmarks List */}
            <div className="bg-white rounded-lg shadow-sm border-2 border-dashed border-gray-200 overflow-hidden">
                {bookmarks.map((bookmark: any, index: number) => {
                    const Icon = getIcon(bookmark.onModel);
                    const colorClass = getColor(bookmark.onModel);

                    return (
                        <Link
                            key={bookmark._id}
                            href={getLink(bookmark.onModel, bookmark.item._id)}
                            className="group flex flex-col sm:flex-row sm:items-center gap-3 md:gap-4 p-4 hover:bg-gray-50 transition-all border-b-2 border-dashed border-gray-100 last:border-b-0"
                        >
                            <div className="flex items-center gap-3 md:gap-4 w-full sm:w-auto">
                                <div className={cn("w-10 h-10 md:w-12 md:h-12 rounded-lg flex items-center justify-center border-2 border-dashed transition-colors flex-shrink-0", colorClass)}>
                                    <Icon className="w-5 h-5 md:w-6 md:h-6" />
                                </div>
                                <div className="sm:hidden flex-1 min-w-0">
                                    <p className="font-bold text-gray-900 text-base line-clamp-1">
                                        {bookmark.item.title}
                                    </p>
                                    <p className="text-[10px] font-bold text-gray-400 capitalize flex items-center gap-2">
                                        <span className="uppercase tracking-wider">{bookmark.onModel}</span>
                                        <span>•</span>
                                        <span className="truncate max-w-[150px]">{'novel' in bookmark.item ? (typeof bookmark.item.novel === 'string' ? bookmark.item.novel : bookmark.item.novel.title) : ''}</span>
                                    </p>
                                </div>
                                {/* Mobile Actions */}
                                <div className="sm:hidden flex items-center">
                                    <BookmarkButton
                                        itemId={bookmark.item._id}
                                        itemType={bookmark.onModel}
                                        className="text-accent-500 bg-accent-50 hover:text-red-500 hover:bg-red-50 hover:border-red-200"
                                        size="md"
                                    />
                                </div>
                            </div>

                            <div className="hidden sm:block flex-1 min-w-0">
                                <p className="font-bold text-gray-900 text-lg group-hover:text-primary-600 transition-colors truncate">
                                    {bookmark.item.title}
                                </p>
                                <p className="text-xs font-bold text-gray-400 capitalize flex items-center gap-2">
                                    <span className="uppercase tracking-wider">{bookmark.onModel}</span>
                                    <span>•</span>
                                    <span>{'novel' in bookmark.item ? (typeof bookmark.item.novel === 'string' ? bookmark.item.novel : bookmark.item.novel.title) : ''}</span>
                                </p>
                            </div>

                            <div className="hidden sm:flex items-center gap-2">
                                <BookmarkButton
                                    itemId={bookmark.item._id}
                                    itemType={bookmark.onModel}
                                    className="text-accent-500 bg-accent-50 hover:text-red-500 hover:bg-red-50 hover:border-red-200"
                                    size="md"
                                />
                                <ArrowRight className="w-5 h-5 text-gray-300 group-hover:text-primary-500 group-hover:translate-x-1 transition-all" />
                            </div>
                        </Link>
                    );
                })}

                {bookmarks.length === 0 && (
                    <div className="text-center py-10 md:py-16">
                        <div className="w-12 h-12 md:w-16 md:h-16 bg-gray-50 rounded-full border-2 border-dashed border-gray-200 flex items-center justify-center mx-auto mb-3 md:mb-4">
                            <Bookmark className="w-6 h-6 md:w-8 md:h-8 text-gray-400" />
                        </div>
                        <h3 className="text-lg md:text-xl font-black text-gray-900 mb-1 md:mb-2">No bookmarks yet</h3>
                        <p className="text-sm md:text-base text-gray-500 font-medium px-4">
                            Start saving content to access it quickly later.
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}
