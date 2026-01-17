'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Save, Upload, X, Youtube } from 'lucide-react';

// Mock Data for Dropdowns
const MOCK_NOVELS = [
    { id: '1', title: 'Pride and Prejudice', totalChapters: 61 },
    { id: '2', title: 'The Great Gatsby', totalChapters: 9 },
    { id: '3', title: '1984', totalChapters: 24 },
];

interface VideoFormProps {
    initialData?: any;
    isEditing?: boolean;
}

export function VideoForm({ initialData, isEditing = false }: VideoFormProps) {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);

    // Form State
    const [formData, setFormData] = useState({
        title: initialData?.title || '',
        youtubeId: initialData?.youtubeId || '',
        description: initialData?.description || '',
        thumbnail: initialData?.thumbnail || '',
        novelId: initialData?.novel || '',  // storing ID
        chapter: initialData?.chapter || '',
        duration: initialData?.duration || 0,
        tags: initialData?.tags || [],
        isPublished: initialData?.isPublished || false,
    });

    // Derived State for Dependent Dropdown
    const [availableChapters, setAvailableChapters] = useState<string[]>([]);

    // Update available chapters when novel selection changes
    useEffect(() => {
        if (formData.novelId) {
            const selectedNovel = MOCK_NOVELS.find(n => n.id === formData.novelId);
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
    }, [formData.novelId]);

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

        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 1000));

        console.log('Submitting Video Data:', formData);

        // Return to list after save
        setIsLoading(false);
        router.push('/admin/videos');
    };

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        // Validate file type
        const validTypes = ['image/png', 'image/jpeg', 'image/webp'];
        if (!validTypes.includes(file.type)) {
            alert('Please upload a valid image file (PNG, JPG, WEBP)');
            return;
        }

        // Create preview URL
        const objectUrl = URL.createObjectURL(file);
        setFormData(prev => ({ ...prev, thumbnail: objectUrl }));
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
                            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 ${formData.isPublished ? 'bg-green-500' : 'bg-gray-200'
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
                            <label className="text-xs font-black uppercase text-gray-400 tracking-wider">Novel</label>
                            <div className="relative">
                                <select
                                    name="novelId"
                                    value={formData.novelId}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 bg-gray-50 border-2 border-transparent focus:border-gray-900 focus:bg-white rounded-lg font-bold text-gray-900 transition-all outline-none appearance-none cursor-pointer"
                                    required
                                >
                                    <option value="">Select Novel</option>
                                    {MOCK_NOVELS.map(novel => (
                                        <option key={novel.id} value={novel.id}>
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
                            <label className="text-xs font-black uppercase text-gray-400 tracking-wider">Chapter</label>
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
                        <label className="text-xs font-black uppercase text-gray-400 tracking-wider">Video Title</label>
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
                            <label className="text-xs font-black uppercase text-gray-400 tracking-wider">YouTube ID</label>
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

                {/* Right Side - Media/Thumbnail (Simulated placement as per common patterns, though user asked for similar to novel form, which is now single column. But the novel form had a split at the end. I'll stick to the "similar to @page.tsx" reference which might mean how I structured the novel form latest change? 
                Actually the user said "similar to @page.tsx create flow for @videoModel.ts", referring to the whole CRUD flow.
                And "create 2 dropdowns ... follow current branding".
                The NovelForm is mostly single column now but with a flex layout for tags on the right/bottom.
                I'll put the Thumbnail URL and Preview in a side column or bottom column to be responsive.
                Let's stick to the NovelForm layout: Main content 3/4, Side content 1/4.
                */}
                <div className="bg-white p-6 rounded-xl border-2 border-dashed border-gray-200 w-full sm:w-1/4 space-y-6 h-fit">
                    <div className="space-y-4">
                        <label className="text-xs font-black uppercase text-gray-400 tracking-wider">Thumbnail</label>
                        {formData.thumbnail ? (
                            <div className="relative aspect-video w-full rounded-lg overflow-hidden border-2 border-gray-100 group">
                                <img src={formData.thumbnail} alt="Thumbnail Preview" className="w-full h-full object-cover" />
                                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                    <button
                                        type="button"
                                        onClick={() => setFormData(prev => ({ ...prev, thumbnail: '' }))}
                                        className="p-2 bg-white rounded-full text-red-500 hover:bg-red-50 transition-colors"
                                    >
                                        <X className="w-5 h-5" />
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <label className="cursor-pointer group">
                                <div className="aspect-video w-full rounded-lg border-2 border-dashed border-gray-200 bg-gray-50 flex flex-col items-center justify-center text-gray-400 gap-2 group-hover:border-gray-900 group-hover:bg-gray-100 transition-all">
                                    <div className="p-3 bg-white rounded-full shadow-sm group-hover:scale-110 transition-transform">
                                        <Upload className="w-6 h-6 text-gray-300 group-hover:text-gray-900" />
                                    </div>
                                    <span className="text-[10px] font-bold text-center px-4">Click to upload<br />thumbnail</span>
                                </div>
                                <input
                                    type="file"
                                    className="hidden"
                                    accept="image/png, image/jpeg, image/webp"
                                    onChange={handleImageUpload}
                                />
                            </label>
                        )}
                    </div>
                </div>
            </div>
        </form>
    );
}
