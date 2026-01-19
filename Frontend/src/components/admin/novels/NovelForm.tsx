'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Save } from 'lucide-react';
import { NOVEL_TAGS, DIFFICULTY_LEVELS } from '@/src/lib/constants/novels';
import apiClient from '@/src/lib/apiClient';

interface NovelFormProps {
    initialData?: any;
    isEditing?: boolean;
}

export function NovelForm({ initialData, isEditing = false }: NovelFormProps) {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({
        title: initialData?.title || '',
        author: initialData?.author || '',
        description: initialData?.description || '',
        totalChapters: initialData?.totalChapters || 0,
        difficulty: initialData?.difficulty || 'beginner',
        tags: initialData?.tags || [],
        isPublished: initialData?.isPublished || false,
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: name === 'totalChapters' ? parseInt(value) || 0 : value
        }));
    };

    const toggleTag = (tag: string) => {
        setFormData(prev => {
            const currentTags = prev.tags;
            if (currentTags.includes(tag)) {
                return { ...prev, tags: currentTags.filter((t: string) => t !== tag) };
            } else {
                return { ...prev, tags: [...currentTags, tag] };
            }
        });
    };

    const togglePublish = () => {
        setFormData(prev => ({ ...prev, isPublished: !prev.isPublished }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const novelId = initialData?._id || initialData?.id;

            // Clean payload
            const payload = { ...formData };
            ['_id', 'id', '__v', 'createdAt', 'updatedAt'].forEach(el => delete (payload as any)[el]);

            if (isEditing && novelId) {
                await apiClient.put(`/novels/${novelId}`, payload);
            } else {
                await apiClient.post('/novels', payload);
            }
            router.push('/admin/novels');
        } catch (error: any) {
            console.error('Error saving novel:', error);
            const message = error.response?.data?.message || 'Failed to save novel. Please try again.';
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
                    {isEditing ? 'Edit Novel' : 'Create New Novel'}
                </h1>
                <div className="flex items-center gap-3">
                    <button
                        type="button"
                        onClick={() => router.back()}
                        className="px-4 py-2 text-sm font-bold text-gray-500 hover:text-gray-900 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        disabled={isLoading}
                        className="flex items-center gap-2 px-6 py-2 bg-gray-900 text-white font-bold text-sm rounded-lg hover:bg-gray-800 transition-all shadow-lg active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {isLoading ? (
                            <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        ) : (
                            <Save className="w-4 h-4" />
                        )}
                        {isEditing ? 'Update Novel' : 'Create Novel'}
                    </button>
                </div>
            </div>

            <div className='flex gap-4 sm:flex-row flex-col'>
                {/* Main Content Info */}
                <div className="bg-white p-6 rounded-xl border-2 border-dashed border-gray-200 space-y-6 w-full sm:w-3/4">

                    {/* Publish Toggle */}
                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-100">
                        <div>
                            <span className="block text-sm font-bold text-gray-900">Publish Status</span>
                            <span className="text-xs text-gray-500">Make this novel visible to users</span>
                        </div>
                        <button
                            type="button"
                            onClick={togglePublish}
                            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 ${formData.isPublished ? 'bg-green-500' : 'bg-gray-200'
                                }`}
                        >
                            <span
                                className={`${formData.isPublished ? 'translate-x-6' : 'translate-x-1'
                                    } inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-200 ease-in-out`}
                            />
                        </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-xs font-black uppercase text-gray-400 tracking-wider">Title</label>
                            <input
                                type="text"
                                name="title"
                                value={formData.title}
                                onChange={handleChange}
                                placeholder="e.g. Pride and Prejudice"
                                className="w-full px-4 py-3 bg-gray-50 border-2 border-transparent focus:border-gray-900 focus:bg-white rounded-lg font-bold text-gray-900 transition-all outline-none placeholder:text-gray-300"
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-xs font-black uppercase text-gray-400 tracking-wider">Author</label>
                            <input
                                type="text"
                                name="author"
                                value={formData.author}
                                onChange={handleChange}
                                placeholder="e.g. Jane Austen"
                                className="w-full px-4 py-3 bg-gray-50 border-2 border-transparent focus:border-gray-900 focus:bg-white rounded-lg font-bold text-gray-900 transition-all outline-none placeholder:text-gray-300"
                                required
                            />
                        </div>
                    </div>



                    <div className="space-y-2">
                        <label className="text-xs font-black uppercase text-gray-400 tracking-wider">Description</label>
                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            rows={5}
                            placeholder="Write a meaningful summary..."
                            className="w-full px-4 py-3 bg-gray-50 border-2 border-transparent focus:border-gray-900 focus:bg-white rounded-lg font-medium text-gray-900 transition-all outline-none placeholder:text-gray-300 resize-none"
                            required
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label className="text-xs font-black uppercase text-gray-400 tracking-wider">Total Chapters</label>
                            <input
                                type="number"
                                name="totalChapters"
                                value={formData.totalChapters}
                                onChange={handleChange}
                                min="0"
                                className="w-full px-4 py-3 bg-gray-50 border-2 border-transparent focus:border-gray-900 focus:bg-white rounded-lg font-bold text-gray-900 transition-all outline-none"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-xs font-black uppercase text-gray-400 tracking-wider">Difficulty</label>
                            <div className="relative">
                                <select
                                    name="difficulty"
                                    value={formData.difficulty}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 bg-gray-50 border-2 border-transparent focus:border-gray-900 focus:bg-white rounded-lg font-bold text-gray-900 transition-all outline-none appearance-none cursor-pointer"
                                >
                                    {DIFFICULTY_LEVELS.map(level => (
                                        <option key={level.value} value={level.value}>
                                            {level.label}
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
                </div>

                {/* Tags Section */}
                <div className="bg-white p-6 rounded-xl border-2 border-dashed border-gray-200 w-full sm:w-1/4">
                    <label className="text-xs font-black uppercase text-gray-400 tracking-wider mb-4 block">Tags</label>
                    <div className="flex flex-wrap gap-2">
                        {NOVEL_TAGS.map(tag => {
                            const isSelected = formData.tags.includes(tag);
                            return (
                                <button
                                    key={tag}
                                    type="button"
                                    onClick={() => toggleTag(tag)}
                                    className={`px-3 py-1.5 rounded-full text-xs font-bold border-2 transition-all ${isSelected
                                        ? 'bg-gray-900 text-white border-gray-900'
                                        : 'bg-white text-gray-500 border-gray-100 hover:border-gray-300'
                                        }`}
                                >
                                    {tag}
                                </button>
                            );
                        })}
                    </div>
                </div>
            </div>
        </form>
    );
}
