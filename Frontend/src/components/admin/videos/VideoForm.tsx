'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Save, Upload, X, Youtube, Image as ImageIcon } from 'lucide-react';
import apiClient from '@/src/lib/apiClient';

interface Novel {
    id: string;
    _id: string; // Add this to handle both
    title: string;
    totalChapters: number;
}

interface VideoFormProps {
    initialData?: any;
    isEditing?: boolean;
}

export function VideoForm({ initialData, isEditing = false }: VideoFormProps) {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [novels, setNovels] = useState<Novel[]>([]);

    // Form State
    // Initial data might have 'novel' as populated object or string ID
    const getInitialNovelId = () => {
        if (!initialData?.novel) return '';
        return typeof initialData.novel === 'object' ? (initialData.novel._id || initialData.novel.id) : initialData.novel;
    };

    const [formData, setFormData] = useState({
        title: initialData?.title || '',
        youtubeId: initialData?.youtubeId || '',
        description: initialData?.description || '',
        thumbnail: initialData?.thumbnail || '',
        novelId: getInitialNovelId(),
        chapter: initialData?.chapter || '',
        duration: initialData?.duration || 0,
        tags: initialData?.tags || [],
        isPublished: initialData?.isPublished || false,
    });

    // Derived State for Dependent Dropdown
    const [availableChapters, setAvailableChapters] = useState<string[]>([]);

    // Fetch Novels
    useEffect(() => {
        const fetchNovels = async () => {
            try {
                const response = await apiClient.get('/novels');
                // Adjust per your actual API response structure
                setNovels(response.data.data.data);
            } catch (error) {
                console.error("Failed to fetch novels", error);
            }
        };
        fetchNovels();
    }, []);

    // Update available chapters when novel selection changes
    useEffect(() => {
        if (formData.novelId && novels.length > 0) {
            const selectedNovel = novels.find(n => (n._id === formData.novelId || n.id === formData.novelId));
            if (selectedNovel) {
                // Generate chapter list based on totalChapters
                const chapters = Array.from({ length: selectedNovel.totalChapters }, (_, i) => `Chapter ${i + 1}`);
                setAvailableChapters(chapters);
            } else {
                setAvailableChapters([]);
            }
        } else {
            setAvailableChapters([]);
        }
    }, [formData.novelId, novels]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: name === 'duration' ? parseInt(value) || 0 : value
        }));

        // Reset chapter if novel changes
        if (name === 'novelId') {
            setFormData(prev => ({ ...prev, chapter: '', novelId: value }));
        }
    };

    const togglePublish = () => {
        setFormData(prev => ({ ...prev, isPublished: !prev.isPublished }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        const { novelId, ...rest } = formData;
        const payload = {
            ...rest,
            novel: novelId // Backend expects 'novel' field for the reference
        };

        try {
            const videoId = initialData?._id || initialData?.id;
            if (isEditing && videoId) {
                await apiClient.put(`/videos/${videoId}`, payload);
            } else {
                await apiClient.post('/videos', payload);
            }
            router.push('/admin/videos');
        } catch (error: any) {
            console.error('Error saving video:', error);
            const message = error.response?.data?.message || 'Failed to save video. Please try again.';
            alert(message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="mx-auto space-y-6 pb-20">
            {/* Header Actions */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <h1 className="text-3xl font-black text-gray-900 tracking-tight">
                    {isEditing ? 'Edit Video' : 'Add New Video'}
                </h1>
                <div className="flex items-center gap-3">
                    <button
                        type="button"
                        onClick={() => router.back()}
                        className="px-4 py-2 text-sm font-bold text-gray-500 hover:text-gray-900 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors cursor-pointer"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        disabled={isLoading}
                        className="flex items-center gap-2 px-6 py-2 bg-gray-900 text-white font-bold text-sm rounded-lg hover:bg-gray-800 transition-all shadow-lg active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                    >
                        {isLoading ? (
                            <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        ) : (
                            <Save className="w-4 h-4" />
                        )}
                        {isEditing ? 'Update Video' : 'Save Video'}
                    </button>
                </div>
            </div>

            <div className="flex gap-4 sm:flex-row flex-col">
                {/* Main Content Info */}
                <div className="bg-white p-6 rounded-xl border-2 border-dashed border-gray-200 space-y-6 w-full sm:w-3/4">

                    {/* Publish Toggle */}
                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-100">
                        <div>
                            <span className="block text-sm font-bold text-gray-900">Publish Status</span>
                            <span className="text-xs text-gray-500">Make this video visible to users</span>
                        </div>
                        <button
                            type="button"
                            onClick={togglePublish}
                            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 cursor-pointer ${formData.isPublished ? 'bg-green-500' : 'bg-gray-200'
                                }`}
                        >
                            <span
                                className={`${formData.isPublished ? 'translate-x-6' : 'translate-x-1'
                                    } inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-200 ease-in-out`}
                            />
                        </button>
                    </div>

                    {/* Dependent Dropdowns */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-xs font-black uppercase text-gray-400 tracking-wider">
                                Novel <span className="text-red-500 ml-1">*</span>
                            </label>
                            <div className="relative">
                                <select
                                    name="novelId"
                                    value={formData.novelId}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 bg-gray-50 border-2 border-transparent focus:border-gray-900 focus:bg-white rounded-lg font-bold text-gray-900 transition-all outline-none appearance-none cursor-pointer"
                                    required
                                >
                                    <option value="">Select Novel</option>
                                    {novels.map(novel => (
                                        <option key={novel._id || novel.id} value={novel._id || novel.id}>
                                            {novel.title}
                                        </option>
                                    ))}
                                </select>
                                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
                                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M2.5 4.5L6 8L9.5 4.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                </div>
                            </div>
                        </div>
                        <div className="space-y-2">
                            <label className="text-xs font-black uppercase text-gray-400 tracking-wider">
                                Chapter <span className="text-red-500 ml-1">*</span>
                            </label>
                            <div className="relative">
                                <select
                                    name="chapter"
                                    value={formData.chapter}
                                    onChange={handleChange}
                                    disabled={!formData.novelId}
                                    className="w-full px-4 py-3 bg-gray-50 border-2 border-transparent focus:border-gray-900 focus:bg-white rounded-lg font-bold text-gray-900 transition-all outline-none appearance-none cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                                    required
                                >
                                    <option value="">Select Chapter</option>
                                    {availableChapters.map(chapter => (
                                        <option key={chapter} value={chapter}>
                                            {chapter}
                                        </option>
                                    ))}
                                </select>
                                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
                                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M2.5 4.5L6 8L9.5 4.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-xs font-black uppercase text-gray-400 tracking-wider">
                            Video Title <span className="text-red-500 ml-1">*</span>
                        </label>
                        <input
                            type="text"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            placeholder="e.g. Chapter 1 Analysis"
                            className="w-full px-4 py-3 bg-gray-50 border-2 border-transparent focus:border-gray-900 focus:bg-white rounded-lg font-bold text-gray-900 transition-all outline-none placeholder:text-gray-300"
                            required
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-xs font-black uppercase text-gray-400 tracking-wider">Description</label>
                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            rows={4}
                            placeholder="Video description..."
                            className="w-full px-4 py-3 bg-gray-50 border-2 border-transparent focus:border-gray-900 focus:bg-white rounded-lg font-medium text-gray-900 transition-all outline-none placeholder:text-gray-300 resize-none"
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-xs font-black uppercase text-gray-400 tracking-wider">
                                YouTube ID <span className="text-red-500 ml-1">*</span>
                            </label>
                            <div className="relative">
                                <Youtube className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                <input
                                    type="text"
                                    name="youtubeId"
                                    value={formData.youtubeId}
                                    onChange={handleChange}
                                    placeholder="e.g. dQw4w9WgXcQ"
                                    className="w-full pl-12 pr-4 py-3 bg-gray-50 border-2 border-transparent focus:border-gray-900 focus:bg-white rounded-lg font-bold text-gray-900 transition-all outline-none placeholder:text-gray-300"
                                    required
                                />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <label className="text-xs font-black uppercase text-gray-400 tracking-wider">Duration (seconds)</label>
                            <input
                                type="number"
                                name="duration"
                                value={formData.duration}
                                onChange={handleChange}
                                min="0"
                                className="w-full px-4 py-3 bg-gray-50 border-2 border-transparent focus:border-gray-900 focus:bg-white rounded-lg font-bold text-gray-900 transition-all outline-none"
                            />
                        </div>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-xl border-2 border-dashed border-gray-200 w-full sm:w-1/4 space-y-6 h-fit">
                    <div className="space-y-4">
                        <label className="text-xs font-black uppercase text-gray-400 tracking-wider">Thumbnail URL</label>
                        <div className="relative">
                            <ImageIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                            <input
                                type="text"
                                name="thumbnail"
                                value={formData.thumbnail}
                                onChange={handleChange}
                                placeholder="https://..."
                                className="w-full pl-12 pr-4 py-3 bg-gray-50 border-2 border-transparent focus:border-gray-900 focus:bg-white rounded-lg font-medium text-gray-900 transition-all outline-none placeholder:text-gray-300"
                            />
                        </div>

                        {formData.thumbnail && (
                            <div className="relative aspect-video w-full rounded-lg overflow-hidden border-2 border-gray-100 group">
                                <img src={formData.thumbnail} alt="Thumbnail Preview" className="w-full h-full object-cover" />
                                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                    <button
                                        type="button"
                                        onClick={() => setFormData(prev => ({ ...prev, thumbnail: '' }))}
                                        className="p-2 bg-white rounded-full text-red-500 hover:bg-red-50 transition-colors cursor-pointer"
                                    >
                                        <X className="w-5 h-5" />
                                    </button>
                                </div>
                            </div>
                        )}
                        {!formData.thumbnail && (
                            <div className="aspect-video w-full rounded-lg border-2 border-dashed border-gray-200 bg-gray-50 flex flex-col items-center justify-center text-gray-400 gap-2">
                                <ImageIcon className="w-6 h-6 text-gray-300" />
                                <span className="text-[10px] font-bold text-center px-4">Enter URL to preview</span>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </form>
    );
}
