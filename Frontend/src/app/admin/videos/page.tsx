'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import {
    Plus,
    Search,
    Edit,
    Trash2,
    Video
} from 'lucide-react';
import { useRouter } from 'next/navigation';

import apiClient from '@/src/lib/apiClient';
import { Video as VideoType } from '@/src/types';

export default function AdminVideosPage() {
    const router = useRouter();

    const [searchQuery, setSearchQuery] = useState('');
    const [videos, setVideos] = useState<VideoType[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [showDeleteModal, setShowDeleteModal] = useState<string | null>(null);

    useEffect(() => {
        fetchVideos();
    }, []);

    const fetchVideos = async () => {
        try {
            setIsLoading(true);
            const response = await apiClient.get('/videos');
            // Assuming the standard response structure
            setVideos(response.data.data.data);
        } catch (error) {
            console.error('Error fetching videos:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const filteredVideos = videos.filter(video =>
        video.title.toLowerCase().includes(searchQuery.toLowerCase())
        // Note: 'novelTitle' might need to be populated from backend or handled differently if only ID is present
    );

    const handleDelete = async (id: string) => {
        try {
            await apiClient.delete(`/videos/${id}`);
            await fetchVideos();
            setShowDeleteModal(null);
        } catch (error) {
            console.error('Error deleting video:', error);
        }
    };

    const formatDuration = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-black text-gray-900 tracking-tight">Videos</h1>
                    <p className="text-gray-500 font-medium">Manage video content and lessons</p>
                </div>
                <Link
                    href="/admin/videos/new"
                    className="flex items-center justify-center gap-2 px-6 py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-all shadow-[4px_4px_0px_0px_rgba(0,0,0,0.1)] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none font-bold"
                >
                    <Plus className="w-5 h-5" />
                    <span>Add Video</span>
                </Link>
            </div>

            {/* Controls */}
            <div className="flex flex-col sm:flex-row gap-4 p-1 bg-white rounded-xl border-2 border-dashed border-gray-200">
                <div className="relative flex-1">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Search videos..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-12 pr-4 py-3 bg-transparent font-medium focus:outline-none"
                    />
                </div>
            </div>

            {/* Content */}
            {filteredVideos.length === 0 ? (
                // Empty State
                <div className="flex flex-col items-center justify-center py-20 text-center bg-gray-50 rounded-xl border-2 border-dashed border-gray-200">
                    <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center text-gray-300 mb-4 shadow-sm">
                        <Video className="w-8 h-8" />
                    </div>
                    <h3 className="text-xl font-black text-gray-900 mb-2">No videos found</h3>
                    <p className="text-gray-500 max-w-sm mb-6 font-medium">
                        {searchQuery ? "No results match your search query." : "Get started by adding your first educational video."}
                    </p>
                    <Link
                        href="/admin/videos/new"
                        className="text-sm font-bold text-gray-900 underline hover:text-gray-700"
                    >
                        Add New Video
                    </Link>
                </div>
            ) : (
                // List View
                <div className="bg-white rounded-xl border-2 border-dashed border-gray-200 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead>
                                <tr className="border-b border-gray-100 bg-gray-50/50">
                                    <th className="px-6 py-4 text-xs font-black uppercase text-gray-400 tracking-wider w-20">Thumb</th>
                                    <th className="px-6 py-4 text-xs font-black uppercase text-gray-400 tracking-wider">Video Details</th>
                                    <th className="px-6 py-4 text-xs font-black uppercase text-gray-400 tracking-wider">Context</th>
                                    <th className="px-6 py-4 text-xs font-black uppercase text-gray-400 tracking-wider">Status</th>
                                    <th className="px-6 py-4 text-xs font-black uppercase text-gray-400 tracking-wider text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {filteredVideos.map((video: any) => (
                                    <tr key={video._id || video.id} className="group hover:bg-gray-50 transition-colors">
                                        <td className="px-6 py-4">
                                            <div className="w-16 h-10 bg-gray-100 rounded-lg overflow-hidden relative border border-gray-200">
                                                {video.thumbnail ? (
                                                    <img src={video.thumbnail} alt={video.title} className="w-full h-full object-cover" />
                                                ) : (
                                                    <div className="w-full h-full flex items-center justify-center text-gray-400">
                                                        <Video className="w-4 h-4" />
                                                    </div>
                                                )}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="font-bold text-gray-900">{video.title}</div>
                                            <div className="text-xs text-gray-400 font-mono mt-0.5">{formatDuration(video.duration)}</div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="font-bold text-gray-700 text-sm">
                                                {/* If novel is populated, access title, otherwise it might be just ID */}
                                                {typeof video.novel === 'object' ? video.novel?.title : video.novel}
                                            </div>
                                            <div className="text-xs text-gray-500 font-medium">{video.chapter}</div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold border ${video.isPublished
                                                ? 'bg-green-50 text-green-700 border-green-200'
                                                : 'bg-gray-100 text-gray-600 border-gray-200'
                                                }`}>
                                                <span className={`w-1.5 h-1.5 rounded-full ${video.isPublished ? 'bg-green-500' : 'bg-gray-400'}`} />
                                                {video.isPublished ? 'Live' : 'Draft'}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                <Link
                                                    href={`/admin/videos/${video._id || video.id}`}
                                                    className="p-2 text-gray-400 hover:text-gray-900 hover:bg-white rounded-lg transition-all"
                                                >
                                                    <Edit className="w-4 h-4" />
                                                </Link>
                                                <button
                                                    onClick={() => setShowDeleteModal(video._id || video.id)}
                                                    className="p-2 text-gray-400 hover:text-red-600 hover:bg-white rounded-lg transition-all"
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}

            {/* Delete Confirmation Modal */}
            {showDeleteModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
                    <div className="bg-white rounded-xl max-w-sm w-full p-6 shadow-2xl space-y-6 animate-in zoom-in-95 duration-200">
                        <div className="text-center space-y-2">
                            <div className="w-14 h-14 bg-red-50 rounded-full flex items-center justify-center text-red-500 mx-auto mb-4">
                                <Trash2 className="w-7 h-7" />
                            </div>
                            <h3 className="text-lg font-black text-gray-900">Delete Video?</h3>
                            <p className="text-sm text-gray-500 font-medium">
                                Are you sure you want to delete this video? This action cannot be undone.
                            </p>
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                            <button
                                onClick={() => setShowDeleteModal(null)}
                                className="px-4 py-2.5 rounded-lg border-2 border-gray-200 text-gray-700 font-bold text-sm hover:bg-gray-50 transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={() => handleDelete(showDeleteModal)}
                                className="px-4 py-2.5 rounded-lg bg-red-500 text-white font-bold text-sm hover:bg-red-600 transition-colors shadow-lg shadow-red-500/20"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
