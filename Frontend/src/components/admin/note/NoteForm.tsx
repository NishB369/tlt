'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { Save, Upload, FileText, Tag, Plus, X } from 'lucide-react';
import apiClient from '@/src/lib/apiClient';

interface Novel {
    id: string;
    _id: string;
    title: string;
    totalChapters: number;
}

interface NoteFormProps {
    initialData?: any;
    isEditing?: boolean;
}

export function NoteForm({ initialData, isEditing = false }: NoteFormProps) {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [novels, setNovels] = useState<Novel[]>([]);

    // Form State
    const getInitialNovelId = () => {
        if (!initialData?.novel) return '';
        return typeof initialData.novel === 'object' ? (initialData.novel._id || initialData.novel.id) : initialData.novel;
    };

    const [formData, setFormData] = useState({
        title: initialData?.title || '',
        content: initialData?.content || '',
        novelId: getInitialNovelId(),
        chapter: initialData?.chapter || '',
        tags: (initialData?.tags || []) as string[],
        isPublished: initialData?.isPublished || false,
    });

    const [availableChapters, setAvailableChapters] = useState<string[]>([]);
    const [tagInput, setTagInput] = useState('');

    // Fetch Novels
    useEffect(() => {
        const fetchNovels = async () => {
            try {
                const response = await apiClient.get('/novels');
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
        setFormData(prev => ({ ...prev, [name]: value }));

        if (name === 'novelId') {
            setFormData(prev => ({ ...prev, chapter: '', novelId: value }));
        }
    };

    const togglePublish = () => {
        setFormData(prev => ({ ...prev, isPublished: !prev.isPublished }));
    };

    // Tag Handlers
    const handleTagInputKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' || e.key === ',') {
            e.preventDefault();
            const newTag = tagInput.trim();
            if (newTag && !formData.tags.includes(newTag)) {
                setFormData(prev => ({ ...prev, tags: [...prev.tags, newTag] }));
                setTagInput('');
            }
        }
    };

    const removeTag = (tagToRemove: string) => {
        setFormData(prev => ({
            ...prev,
            tags: prev.tags.filter(tag => tag !== tagToRemove)
        }));
    };

    // File Upload Handler
    const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        if (!file.name.endsWith('.md')) {
            alert('Please upload a Markdown (.md) file');
            return;
        }

        const text = await file.text();
        setFormData(prev => ({ ...prev, content: text }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        const { novelId, ...dataToSave } = formData;
        const payload = {
            ...dataToSave,
            novel: novelId
        };

        try {
            const noteId = initialData?._id || initialData?.id;
            if (isEditing && noteId) {
                await apiClient.put(`/notes/${noteId}`, payload);
            } else {
                await apiClient.post('/notes', payload);
            }
            router.push('/admin/note');
        } catch (error: any) {
            console.error('Error saving note:', error);
            const message = error.response?.data?.message || 'Failed to save note.';
            alert(message);
        } finally {
            setIsLoading(false);
        }
    };

    // Simple markdown renderer logic
    const renderMarkdown = (content: string) => {
        if (!content) return <p className="text-gray-400 italic">No content uploaded yet.</p>;

        return content.split('\n').map((line, i) => {
            if (line.startsWith('### ')) return <h3 key={i} className="text-lg font-bold text-gray-900 mt-6 mb-3">{line.replace('### ', '')}</h3>;
            if (line.startsWith('## ')) return <h2 key={i} className="text-xl font-black text-gray-900 mt-8 mb-4 border-b-2 border-dashed border-gray-100 pb-2">{line.replace('## ', '')}</h2>;
            if (line.startsWith('# ')) return <h1 key={i} className="text-2xl font-black text-gray-900 mt-6 mb-4">{line.replace('# ', '')}</h1>;
            if (line.includes('**')) {
                const parts = line.split(/\*\*(.+?)\*\*/);
                return (
                    <p key={i} className="text-gray-600 mb-2">
                        {parts.map((part, j) => j % 2 === 1 ? <strong key={j} className="font-bold text-gray-900">{part}</strong> : part)}
                    </p>
                );
            }
            if (line.startsWith('- ')) return <li key={i} className="text-gray-600 ml-4 mb-2 pl-2 border-l-2 border-dashed border-gray-200">{line.replace('- ', '')}</li>;
            if (line.trim()) return <p key={i} className="text-gray-600 mb-4">{line}</p>;
            return null;
        });
    };

    return (
        <form onSubmit={handleSubmit} className="mx-auto space-y-6 pb-20">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <h1 className="text-3xl font-black text-gray-900 tracking-tight">
                    {isEditing ? 'Edit Note' : 'Add New Note'}
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
                        {isEditing ? 'Update Note' : 'Save Note'}
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
                {/* Left Column: Form Fields */}
                <div className="lg:col-span-3 space-y-6">
                    <div className="bg-white p-6 rounded-xl border-2 border-dashed border-gray-200 space-y-6">

                        {/* Publish Status */}
                        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-100">
                            <div>
                                <span className="block text-sm font-bold text-gray-900">Publish Status</span>
                                <span className="text-xs text-gray-500">Visible to users</span>
                            </div>
                            <button
                                type="button"
                                onClick={togglePublish}
                                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 ${formData.isPublished ? 'bg-green-500' : 'bg-gray-200'
                                    }`}
                            >
                                <span className={`${formData.isPublished ? 'translate-x-6' : 'translate-x-1'} inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-200 ease-in-out`} />
                            </button>
                        </div>

                        {/* Dropdowns */}
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
                                        {novels.map(novel => (
                                            <option key={novel._id || novel.id} value={novel._id || novel.id}>{novel.title}</option>
                                        ))}
                                    </select>
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
                                        className="w-full px-4 py-3 bg-gray-50 border-2 border-transparent focus:border-gray-900 focus:bg-white rounded-lg font-bold text-gray-900 transition-all outline-none appearance-none cursor-pointer disabled:opacity-50"
                                        required
                                    >
                                        <option value="">Select Chapter</option>
                                        {availableChapters.map(chapter => (
                                            <option key={chapter} value={chapter}>{chapter}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-xs font-black uppercase text-gray-400 tracking-wider">Title</label>
                            <input
                                type="text"
                                name="title"
                                value={formData.title}
                                onChange={handleChange}
                                placeholder="e.g. Character Analysis: Gatsby"
                                className="w-full px-4 py-3 bg-gray-50 border-2 border-transparent focus:border-gray-900 focus:bg-white rounded-lg font-bold text-gray-900 transition-all outline-none"
                                required
                            />
                        </div>

                        {/* Tags Input */}
                        <div className="space-y-2">
                            <label className="text-xs font-black uppercase text-gray-400 tracking-wider flex items-center gap-1">
                                <Tag className="w-3 h-3" /> Tags
                            </label>
                            <div className="flex flex-wrap gap-2 mb-2">
                                {formData.tags.map(tag => (
                                    <span key={tag} className="inline-flex items-center px-2 py-1 rounded bg-gray-100 text-sm font-medium text-gray-700">
                                        {tag}
                                        <button
                                            type="button"
                                            onClick={() => removeTag(tag)}
                                            className="ml-1 text-gray-400 hover:text-red-500 focus:outline-none"
                                        >
                                            <X className="w-3 h-3" />
                                        </button>
                                    </span>
                                ))}
                            </div>
                            <input
                                type="text"
                                value={tagInput}
                                onChange={(e) => setTagInput(e.target.value)}
                                onKeyDown={handleTagInputKeyDown}
                                placeholder="Add a tag and press Enter..."
                                className="w-full px-4 py-3 bg-gray-50 border-2 border-transparent focus:border-gray-900 focus:bg-white rounded-lg font-bold text-gray-900 transition-all outline-none"
                            />
                            <p className="text-[10px] text-gray-400 font-medium">Press Enter or Comma to add tags</p>
                        </div>
                    </div>
                </div>

                {/* Right Column: Markdown Content */}
                <div className="lg:col-span-2 space-y-6">
                    <div className="bg-white p-6 rounded-xl border-2 border-dashed border-gray-200 space-y-4 sticky top-6">
                        <div className="flex items-center justify-between">
                            <h3 className="font-bold text-gray-900 flex items-center gap-2">
                                <FileText className="w-5 h-5 text-gray-400" />
                                Content
                            </h3>
                            <label className="text-xs font-bold text-blue-600 hover:text-blue-700 cursor-pointer bg-blue-50 px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1">
                                <Upload className="w-3 h-3" />
                                {formData.content ? 'Replace File' : 'Upload MD'}
                                <input
                                    ref={fileInputRef}
                                    type="file"
                                    accept=".md"
                                    onChange={handleFileUpload}
                                    className="hidden"
                                />
                            </label>
                        </div>

                        <div className="h-[600px] overflow-y-auto bg-gray-50 rounded-lg border-2 border-dashed border-gray-100 p-4 relative">
                            {formData.content ? (
                                <article className="prose prose-sm max-w-none prose-p:text-gray-600 prose-headings:font-bold prose-headings:text-gray-900">
                                    {renderMarkdown(formData.content)}
                                </article>
                            ) : (
                                <div className="absolute inset-0 flex flex-col items-center justify-center text-gray-400 gap-2 pointer-events-none">
                                    <FileText className="w-8 h-8 opacity-50" />
                                    <p className="text-xs font-medium text-center px-6">
                                        Upload a .md file to see the content preview here
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </form>
    );
}
