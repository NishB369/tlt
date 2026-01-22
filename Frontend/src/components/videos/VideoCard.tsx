'use client';

import Link from 'next/link';
import { Play, CheckCircle } from 'lucide-react';
import { formatDuration, cn } from '@/src/lib/utils';
import { MOCK_VIDEOS, DEFAULT_VIDEO_THUMBNAIL } from '@/src/lib/constants';
import { Video } from '@/src/types';
import { BookmarkButton } from '@/src/components/common/BookmarkButton';

interface VideoCardProps {
    video: Video;
    progress?: number; // 0-100
    completed?: boolean;
}

export function VideoCard({ video, progress = 0, completed = false }: VideoCardProps) {
    return (
        <Link
            href={`/dashboard/videos/${video.id}`}
            className="group block bg-white rounded-lg border-2 border-dashed border-gray-200 hover:border-accent-400 transition-all duration-300"
        >
            {/* Thumbnail */}
            <div className="relative aspect-video rounded-t-md overflow-hidden bg-gray-100 border-b-2 border-dashed border-gray-100 group-hover:border-accent-200 transition-colors">
                <img
                    src={video.thumbnail || DEFAULT_VIDEO_THUMBNAIL}
                    alt={video.title}
                    className="w-full h-full object-cover grayscale brightness-90 group-hover:grayscale-0 group-hover:brightness-100 transition-all duration-500"
                />

                {/* Play Overlay */}
                <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 flex items-center justify-center transition-all">
                    <div className="w-12 h-12 rounded-lg bg-accent-500 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transform scale-75 group-hover:scale-100 shadow-[4px_4px_0px_0px_rgba(0,0,0,0.2)] transition-all duration-300">
                        <Play className="w-6 h-6 fill-current ml-0.5" />
                    </div>
                </div>

                {/* Duration Badge */}
                <span className="absolute bottom-2 right-2 px-2 py-0.5 bg-black/80 text-white text-[10px] font-bold uppercase tracking-wider rounded">
                    {formatDuration(video.duration)}
                </span>

                {/* Completed Badge */}
                {completed && (
                    <div className="absolute top-2 right-2">
                        <div className="w-6 h-6 rounded-lg bg-green-500/90 backdrop-blur-sm flex items-center justify-center border border-green-400 shadow-sm">
                            <CheckCircle className="w-4 h-4 text-white" />
                        </div>
                    </div>
                )}

                {/* Bookmark Button */}
                <div className="absolute top-2 left-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <BookmarkButton
                        itemId={video.id}
                        itemType="Video"
                        size="sm"
                        className="bg-black/50 text-white border-transparent hover:bg-black/70 hover:border-transparent hover:text-white shadow-md w-8 h-8 flex items-center justify-center p-0"
                    />
                </div>

                {/* Progress Bar */}
                {progress > 0 && !completed && (
                    <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-gray-200/50 backdrop-blur-sm">
                        <div
                            className="h-full bg-accent-500"
                            style={{ width: `${progress}%` }}
                        />
                    </div>
                )}
            </div>

            {/* Content */}
            <div className="p-4">
                <div className="flex items-center gap-2 mb-3">
                    <span className="px-2 py-1 text-[10px] font-black text-accent-600 bg-accent-50 rounded border border-dashed border-accent-200 uppercase tracking-widest">
                        {typeof video.novel === 'object' ? video.novel.title : video.novel}
                    </span>
                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest truncate">
                        {video.chapter}
                    </span>
                </div>
                <h3 className="font-bold text-gray-900 text-lg mb-2 leading-tight group-hover:text-accent-600 transition-colors line-clamp-2">
                    {video.title}
                </h3>
                <p className="text-xs font-medium text-gray-500 line-clamp-2 leading-relaxed">
                    {video.description}
                </p>
            </div>
        </Link>
    );
}
