"use client";

import { useState } from 'react';
import { MOCK_VIDEOS, MOCK_NOVELS } from '@/src/lib/constants';
import { VideoCard } from '@/src/components/videos/VideoCard';
import { Search, Grid, List, BookOpen, Video as VideoIcon, ChevronDown, ChevronUp } from 'lucide-react';
import { cn } from '@/src/lib/utils';
import type { Video } from '@/src/types';

// Collapsible Section Component
function VideoSection({ title, videos, viewMode, defaultOpen = false }: { title: string; videos: Video[]; viewMode: 'grid' | 'list'; defaultOpen?: boolean }) {
    const [isOpen, setIsOpen] = useState(defaultOpen);

    return (
        <div className="bg-white rounded-xl border-2 border-dashed border-gray-200 overflow-hidden transition-all duration-300 hover:border-accent-200">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full flex items-center justify-between p-4 md:p-6 bg-gray-50/50 hover:bg-gray-50 transition-colors group cursor-pointer"
            >
                <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-white border border-dashed border-gray-200 text-accent-500 group-hover:scale-110 transition-transform shadow-sm">
                        <BookOpen className="w-5 h-5" />
                    </div>
                    <div className="text-left">
                        <h2 className="text-lg font-black text-gray-900 tracking-tight group-hover:text-accent-600 transition-colors">{title}</h2>
                        <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">{videos.length} videos</p>
                    </div>
                </div>
                <div className={cn(
                    "p-2 rounded-full text-gray-400 hover:bg-white hover:text-accent-500 hover:shadow-sm transition-all duration-300",
                    isOpen ? "rotate-180" : ""
                )}>
                    <ChevronDown className="w-5 h-5" />
                </div>
            </button>

            <div className={cn(
                "transition-[max-height,opacity] duration-300 ease-in-out overflow-hidden bg-white/50",
                isOpen ? "max-h-[2000px] opacity-100" : "max-h-0 opacity-0"
            )}>
                <div className="p-4 md:p-6 pt-0 md:pt-2 border-t border-dashed border-gray-100">
                    <div
                        className={cn(
                            viewMode === 'grid'
                                ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6'
                                : 'space-y-3 md:space-y-4'
                        )}
                    >
                        {videos.map((video) => (
                            <VideoCard
                                key={video.id}
                                video={video}
                                progress={video.id === 'v2' ? 60 : video.id === 'v1' ? 100 : 0}
                                completed={video.id === 'v1'}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default function VideosPage() {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedNovel, setSelectedNovel] = useState<string>('all');
    const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

    const filteredVideos = MOCK_VIDEOS.filter((video) => {
        const matchesSearch = video.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            video.description.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesNovel = selectedNovel === 'all' || video.novel === selectedNovel;
        return matchesSearch && matchesNovel;
    });

    // Group videos by novel
    const videosByNovel = filteredVideos.reduce((acc, video) => {
        if (!acc[video.novel]) {
            acc[video.novel] = [];
        }
        acc[video.novel].push(video);
        return acc;
    }, {} as Record<string, Video[]>);

    return (
        <div className="space-y-6 md:space-y-8 animate-fade-in max-w-7xl mx-auto p-2 md:p-0">
            {/* Header */}
            <div className="flex flex-col gap-2">
                <h1 className="text-4xl font-black text-gray-900 tracking-tight">Video Library</h1>
                <p className="text-sm md:text-base text-gray-500 font-medium">Watch expert video tutorials on English literature</p>
            </div>

            {/* Filters */}
            <div className="flex flex-col sm:flex-row gap-3 md:gap-4">
                {/* Search */}
                <div className="flex-1 relative group">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 group-focus-within:text-accent-500 transition-colors" />
                    <input
                        type="text"
                        placeholder="Search videos..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-11 pr-4 py-2.5 md:py-3 bg-white border-2 border-dashed border-gray-200 rounded-lg text-sm font-medium text-gray-900 placeholder-gray-400 focus:outline-none focus:border-accent-500 focus:ring-0 transition-all shadow-sm group-hover:border-gray-300"
                    />
                </div>

                {/* Novel Filter */}
                <div className="flex items-center gap-2 md:gap-3">
                    <div className="relative group flex-1 sm:flex-none">
                        <select
                            value={selectedNovel}
                            onChange={(e) => setSelectedNovel(e.target.value)}
                            className="w-full sm:w-auto appearance-none pl-4 pr-10 py-2.5 md:py-3 bg-white border-2 border-dashed border-gray-200 rounded-lg text-sm font-bold text-gray-700 focus:outline-none focus:border-accent-500 focus:ring-0 transition-all cursor-pointer hover:border-gray-300"
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

                    {/* View Toggle */}
                    <div className="hidden sm:flex items-center gap-1 p-1 bg-white border-2 border-dashed border-gray-200 rounded-lg shrink-0">
                        <button
                            onClick={() => setViewMode('grid')}
                            className={cn(
                                'p-2 rounded transition-all duration-200',
                                viewMode === 'grid'
                                    ? 'bg-accent-500 text-white shadow-sm'
                                    : 'text-gray-400 hover:text-gray-600 hover:bg-gray-50'
                            )}
                        >
                            <Grid className="w-4 h-4 fill-current" />
                        </button>
                        <button
                            onClick={() => setViewMode('list')}
                            className={cn(
                                'p-2 rounded transition-all duration-200',
                                viewMode === 'list'
                                    ? 'bg-accent-500 text-white shadow-sm'
                                    : 'text-gray-400 hover:text-gray-600 hover:bg-gray-50'
                            )}
                        >
                            <List className="w-4 h-4 fill-current" />
                        </button>
                    </div>
                </div>
            </div>

            {/* Videos Grid/List */}
            {selectedNovel === 'all' ? (
                // Grouped by Novel View - Collapsible
                <div className="space-y-6">
                    {(Object.entries(videosByNovel) as [string, Video[]][]).map(([novel, videos]) => (
                        <VideoSection
                            key={novel}
                            title={novel}
                            videos={videos}
                            viewMode={viewMode}
                        />
                    ))}
                </div>
            ) : (
                // Filtered View
                <div
                    className={cn(
                        viewMode === 'grid'
                            ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'
                            : 'space-y-4'
                    )}
                >
                    {filteredVideos.map((video) => (
                        <VideoCard
                            key={video.id}
                            video={video}
                            progress={video.id === 'v2' ? 60 : video.id === 'v1' ? 100 : 0}
                            completed={video.id === 'v1'}
                        />
                    ))}
                </div>
            )}

            {/* Empty State */}
            {filteredVideos.length === 0 && (
                <div className="text-center py-20 bg-white rounded-lg border-2 border-dashed border-gray-200">
                    <div className="w-16 h-16 bg-gray-50 rounded-lg flex items-center justify-center mx-auto mb-4 border-2 border-dashed border-gray-200">
                        <VideoIcon className="w-8 h-8 text-gray-300" />
                    </div>
                    <h3 className="text-lg font-black text-gray-900 mb-2">No videos found</h3>
                    <p className="text-sm font-medium text-gray-500 max-w-md mx-auto">
                        We couldn't find any videos matching your search. Try adjusting your filters or search terms.
                    </p>
                </div>
            )}
        </div>
    );
}
