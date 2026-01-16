'use client';

import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { MOCK_VIDEOS, MOCK_NOTES, MOCK_QUIZZES } from '@/src/lib/constants';
import { formatDuration, cn } from '@/src/lib/utils';
import {
    ArrowLeft,
    Play,
    Pause,
    SkipBack,
    SkipForward,
    Volume2,
    Maximize,
    Bookmark,
    FileText,
    CheckCircle,
    BookOpen,
    ChevronDown,
    ChevronRight,
} from 'lucide-react';

export default function VideoPlayerPage() {
    const params = useParams();
    const router = useRouter();
    const videoId = params.videoId as string;

    const video = MOCK_VIDEOS.find((v) => v.id === videoId);
    const relatedVideos = MOCK_VIDEOS.filter((v) => v.novel === video?.novel && v.id !== videoId);
    const relatedNote = MOCK_NOTES.find((n) => n.novel === video?.novel);
    const relatedQuiz = MOCK_QUIZZES.find((q) => q.novel === video?.novel);

    const [isPlaying, setIsPlaying] = useState(false);
    const [progress, setProgress] = useState(60);
    const [showChapters, setShowChapters] = useState(true);
    const [userNotes, setUserNotes] = useState('');

    if (!video) {
        return (
            <div className="flex flex-col items-center justify-center h-96">
                <div className="text-6xl mb-4">🎬</div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Video not found</h3>
                <Link href="/dashboard/videos" className="text-primary-600 hover:underline">
                    Back to Videos
                </Link>
            </div>
        );
    }

    return (
        <div className="space-y-6 animate-fade-in max-w-7xl mx-auto">
            {/* Back Button */}
            <button
                onClick={() => router.back()}
                className="flex items-center gap-2 text-sm font-bold text-gray-500 hover:text-accent-600 transition-colors uppercase tracking-wider group"
            >
                <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                Back to Videos
            </button>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Main Content */}
                <div className="lg:col-span-2 space-y-8">
                    {/* Video Player */}
                    <div className="bg-black rounded-lg overflow-hidden shadow-lg ring-1 ring-gray-900/5">
                        <div className="relative aspect-video bg-gray-900">
                            {/* Video Placeholder */}
                            <div className="absolute inset-0 flex items-center justify-center group">
                                <div className="text-center">
                                    <div className="w-20 h-20 mx-auto mb-4 rounded-xl bg-white/10 flex items-center justify-center cursor-pointer hover:bg-white/20 transition-all active:scale-95 backdrop-blur-sm border border-white/5">
                                        {isPlaying ? (
                                            <Pause className="w-10 h-10 text-white fill-current" />
                                        ) : (
                                            <Play className="w-10 h-10 text-white ml-1 fill-current" />
                                        )}
                                    </div>
                                    <p className="text-white/60 text-xs font-bold uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">
                                        Click to {isPlaying ? 'pause' : 'play'}
                                    </p>
                                </div>
                            </div>

                            {/* Progress Bar */}
                            <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/90 via-black/50 to-transparent">
                                {/* Progress Slider */}
                                <div className="relative h-1.5 bg-white/20 rounded-full mb-6 cursor-pointer group hover:h-2 transition-all">
                                    <div
                                        className="absolute inset-y-0 left-0 bg-accent-500 rounded-full"
                                        style={{ width: `${progress}%` }}
                                    />
                                    <div
                                        className="absolute top-1/2 -translate-y-1/2 w-4 h-4 bg-accent-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity shadow-lg scale-100 hover:scale-125"
                                        style={{ left: `${progress}%`, marginLeft: '-8px' }}
                                    />
                                </div>

                                {/* Controls */}
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-6">
                                        <button
                                            onClick={() => setIsPlaying(!isPlaying)}
                                            className="text-white hover:text-accent-400 transition-colors active:scale-90"
                                        >
                                            {isPlaying ? (
                                                <Pause className="w-6 h-6 fill-current" />
                                            ) : (
                                                <Play className="w-6 h-6 fill-current" />
                                            )}
                                        </button>
                                        <div className="flex items-center gap-4">
                                            <button className="text-white/80 hover:text-white transition-colors hover:bg-white/10 p-2 rounded-lg">
                                                <SkipBack className="w-5 h-5 fill-current" />
                                            </button>
                                            <button className="text-white/80 hover:text-white transition-colors hover:bg-white/10 p-2 rounded-lg">
                                                <SkipForward className="w-5 h-5 fill-current" />
                                            </button>
                                        </div>
                                        <div className="flex items-center gap-2 group/volume">
                                            <button className="text-white/80 hover:text-white transition-colors">
                                                <Volume2 className="w-5 h-5" />
                                            </button>
                                            <div className="w-0 overflow-hidden group-hover/volume:w-20 transition-all duration-300">
                                                <div className="h-1 bg-white/30 rounded-full ml-2">
                                                    <div className="h-full w-[70%] bg-white rounded-full" />
                                                </div>
                                            </div>
                                        </div>
                                        <span className="text-white/90 text-xs font-bold tracking-wider font-mono">
                                            {formatDuration(Math.floor(video.duration * progress / 100))} / {formatDuration(video.duration)}
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-4">
                                        <button className="text-white/80 hover:text-accent-400 transition-colors p-2 hover:bg-white/10 rounded-lg">
                                            <Bookmark className="w-5 h-5" />
                                        </button>
                                        <button className="text-white/80 hover:text-accent-400 transition-colors p-2 hover:bg-white/10 rounded-lg">
                                            <Maximize className="w-5 h-5" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Video Info */}
                    <div className="bg-white rounded-lg p-8 shadow-sm border-2 border-dashed border-gray-200">
                        <div className="flex items-start justify-between mb-6">
                            <div className="space-y-4">
                                <div className="flex items-center gap-3">
                                    <span className="px-3 py-1.5 text-[11px] font-black text-accent-600 bg-accent-50 rounded border border-dashed border-accent-200 uppercase tracking-widest">
                                        {video.novel}
                                    </span>
                                    <span className="px-3 py-1.5 text-[11px] font-bold text-gray-500 bg-gray-50 rounded border border-dashed border-gray-200 uppercase tracking-widest">
                                        {video.chapter}
                                    </span>
                                </div>
                                <h1 className="text-3xl font-black text-gray-900 tracking-tight leading-tight">
                                    {video.title}
                                </h1>
                            </div>
                            <button className="p-3 rounded-lg bg-gray-50 border-2 border-dashed border-gray-200 hover:border-accent-200 hover:text-accent-600 transition-all group">
                                <Bookmark className="w-5 h-5 text-gray-400 group-hover:text-accent-600 transition-colors" />
                            </button>
                        </div>
                        <p className="text-gray-600 text-sm leading-relaxed mb-8 border-l-4 border-gray-100 pl-4">
                            {video.description}
                        </p>

                        {/* Related Resources */}
                        <div className="flex flex-wrap gap-4 pt-6 border-t-2 border-dashed border-gray-100">
                            {relatedNote && (
                                <Link
                                    href={`/dashboard/notes/${relatedNote.id}`}
                                    className="flex items-center gap-2 px-5 py-2.5 bg-purple-50 text-purple-700 rounded-lg border border-dashed border-purple-200 hover:bg-purple-100 hover:border-purple-300 transition-all text-xs font-bold uppercase tracking-wider"
                                >
                                    <BookOpen className="w-4 h-4" />
                                    Open Notes
                                </Link>
                            )}
                            {relatedQuiz && (
                                <Link
                                    href={`/dashboard/quiz/${relatedQuiz.id}`}
                                    className="flex items-center gap-2 px-5 py-2.5 bg-green-50 text-green-700 rounded-lg border border-dashed border-green-200 hover:bg-green-100 hover:border-green-300 transition-all text-xs font-bold uppercase tracking-wider"
                                >
                                    <CheckCircle className="w-4 h-4" />
                                    Take Quiz
                                </Link>
                            )}
                        </div>
                    </div>

                    {/* User Notes */}
                    <div className="bg-white rounded-lg p-6 shadow-sm border-2 border-dashed border-gray-200">
                        <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2 text-sm uppercase tracking-wider">
                            <div className="p-1.5 rounded bg-amber-50 text-amber-500">
                                <FileText className="w-4 h-4" />
                            </div>
                            My Notes
                        </h3>
                        <textarea
                            value={userNotes}
                            onChange={(e) => setUserNotes(e.target.value)}
                            placeholder="Take notes while watching..."
                            className="w-full h-40 px-4 py-3 bg-white border-2 border-dashed border-gray-200 rounded-lg text-sm font-medium text-gray-900 placeholder-gray-400 focus:outline-none focus:border-accent-500 focus:ring-0 resize-none transition-colors"
                        />
                    </div>
                </div>

                {/* Sidebar */}
                <div className="space-y-6">
                    {/* Chapter List */}
                    <div className="bg-white rounded-lg shadow-sm border-2 border-dashed border-gray-200 overflow-hidden">
                        <button
                            onClick={() => setShowChapters(!showChapters)}
                            className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors border-b-2 border-dashed border-gray-100"
                        >
                            <h3 className="font-bold text-gray-900 text-sm uppercase tracking-wider">Chapter Videos</h3>
                            {showChapters ? (
                                <ChevronDown className="w-4 h-4 text-gray-400" />
                            ) : (
                                <ChevronRight className="w-4 h-4 text-gray-400" />
                            )}
                        </button>
                        {showChapters && (
                            <div className="divide-y-2 divide-dashed divide-gray-100">
                                {MOCK_VIDEOS.filter((v) => v.novel === video.novel).map((v, index) => (
                                    <Link
                                        key={v.id}
                                        href={`/dashboard/videos/${v.id}`}
                                        className={cn(
                                            'flex items-center gap-3 p-4 hover:bg-gray-50 transition-colors block relative',
                                            v.id === videoId && 'bg-accent-50/50'
                                        )}
                                    >
                                        {v.id === videoId && (
                                            <div className="absolute left-0 top-0 bottom-0 w-1 bg-accent-500" />
                                        )}
                                        <div className={cn(
                                            'w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold flex-shrink-0 border-2 border-dashed transition-colors',
                                            v.id === videoId
                                                ? 'bg-accent-500 text-white border-accent-500'
                                                : 'bg-white border-gray-200 text-gray-500'
                                        )}>
                                            {index + 1}
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className={cn(
                                                'text-sm font-bold truncate mb-0.5',
                                                v.id === videoId
                                                    ? 'text-accent-700'
                                                    : 'text-gray-700'
                                            )}>
                                                {v.chapter}
                                            </p>
                                            <p className="text-[10px] font-medium text-gray-400 uppercase tracking-wider truncate">{v.title}</p>
                                        </div>
                                        <span className="text-[10px] font-mono text-gray-400 flex-shrink-0 bg-gray-50 px-1.5 py-0.5 rounded border border-gray-100">
                                            {formatDuration(v.duration)}
                                        </span>
                                    </Link>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Up Next */}
                    {relatedVideos.length > 0 && (
                        <div className="bg-white rounded-lg p-5 shadow-sm border-2 border-dashed border-gray-200">
                            <h3 className="font-bold text-gray-900 mb-4 text-sm uppercase tracking-wider">Up Next</h3>
                            <Link
                                href={`/dashboard/videos/${relatedVideos[0].id}`}
                                className="block group"
                            >
                                <div className="relative aspect-video rounded-lg overflow-hidden mb-3 border-2 border-dashed border-gray-200 group-hover:border-accent-200 transition-colors bg-gray-100">
                                    <img
                                        src={relatedVideos[0].thumbnail}
                                        alt={relatedVideos[0].title}
                                        className="w-full h-full object-cover grayscale brightness-90 group-hover:grayscale-0 group-hover:brightness-100 transition-all duration-500"
                                    />
                                    <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 flex items-center justify-center transition-all">
                                        <div className="w-10 h-10 rounded-lg bg-accent-500 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transform scale-75 group-hover:scale-100 shadow-lg transition-all">
                                            <Play className="w-4 h-4 ml-0.5 fill-current" />
                                        </div>
                                    </div>
                                    <div className="absolute bottom-2 right-2 px-1.5 py-0.5 bg-black/80 text-white text-[10px] font-bold uppercase tracking-wider rounded">
                                        {formatDuration(relatedVideos[0].duration)}
                                    </div>
                                </div>
                                <h4 className="text-sm font-bold text-gray-900 group-hover:text-accent-600 transition-colors leading-tight mb-1">
                                    {relatedVideos[0].title}
                                </h4>
                                <p className="text-xs text-gray-500 font-medium line-clamp-2">
                                    {relatedVideos[0].novel} • {relatedVideos[0].chapter}
                                </p>
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
