'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
    Plus,
    Search,
    LayoutGrid,
    List as ListIcon,
    Edit,
    Trash2,
    BookOpen,
} from 'lucide-react';
import { useRouter } from 'next/navigation';

// Mock Data
const MOCK_NOVELS = [
    {
        id: '1',
        title: 'Pride and Prejudice',
        author: 'Jane Austen',
        chapters: 61,
        isPublished: true,
        updatedAt: '2024-03-15',
    },
    {
        id: '2',
        title: 'The Great Gatsby',
        author: 'F. Scott Fitzgerald',
        chapters: 9,
        isPublished: false,
        updatedAt: '2024-03-10',
    },
    // Add more mock data if needed for testing scrol
];

export default function AdminNovelsPage() {
    const router = useRouter();
    const [viewMode, setViewMode] = useState<'list' | 'card'>('list');
    const [searchQuery, setSearchQuery] = useState('');
    const [novels, setNovels] = useState(MOCK_NOVELS);
    const [showDeleteModal, setShowDeleteModal] = useState<string | null>(null);

    const filteredNovels = novels.filter(novel =>
        novel.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        novel.author.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleDelete = (id: string) => {
        // API call to delete will go here
        setNovels(prev => prev.filter(n => n.id !== id));
        setShowDeleteModal(null);
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-black text-gray-900 tracking-tight">Novels</h1>
                    <p className="text-gray-500 font-medium">Manage and organize your library</p>
                </div>
                <Link
                    href="/admin/novels/new"
                    className="flex items-center justify-center gap-2 px-6 py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-all shadow-[4px_4px_0px_0px_rgba(0,0,0,0.1)] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none font-bold"
                >
                    <Plus className="w-5 h-5" />
                    <span>Add Novel</span>
                </Link>
            </div>

            {/* Controls */}
            <div className="flex flex-col sm:flex-row gap-4 p-1 bg-white rounded-xl border-2 border-dashed border-gray-200">
                <div className="relative flex-1">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Search novels..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-12 pr-4 py-3 bg-transparent font-medium focus:outline-none"
                    />
                </div>
                <div className="flex items-center gap-2 px-2 border-t sm:border-t-0 sm:border-l border-gray-100 pt-2 sm:pt-0">
                    <button
                        onClick={() => setViewMode('list')}
                        className={`p-2 rounded-lg transition-colors ${viewMode === 'list' ? 'bg-gray-100 text-gray-900' : 'text-gray-400 hover:text-gray-600'}`}
                    >
                        <ListIcon className="w-5 h-5" />
                    </button>
                    <button
                        onClick={() => setViewMode('card')}
                        className={`p-2 rounded-lg transition-colors ${viewMode === 'card' ? 'bg-gray-100 text-gray-900' : 'text-gray-400 hover:text-gray-600'}`}
                    >
                        <LayoutGrid className="w-5 h-5" />
                    </button>
                </div>
            </div>

            {/* Content */}
            {filteredNovels.length === 0 ? (
                // Empty State
                <div className="flex flex-col items-center justify-center py-20 text-center bg-gray-50 rounded-xl border-2 border-dashed border-gray-200">
                    <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center text-gray-300 mb-4 shadow-sm">
                        <BookOpen className="w-8 h-8" />
                    </div>
                    <h3 className="text-xl font-black text-gray-900 mb-2">No novels found</h3>
                    <p className="text-gray-500 max-w-sm mb-6 font-medium">
                        {searchQuery ? "No results match your search query." : "Get started by creating your first novel to populate the library."}
                    </p>
                    <Link
                        href="/admin/novels/new"
                        className="text-sm font-bold text-gray-900 underline hover:text-gray-700"
                    >
                        Create New Novel
                    </Link>
                </div>
            ) : viewMode === 'list' ? (
                // List View
                <div className="bg-white rounded-xl border-2 border-dashed border-gray-200 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead>
                                <tr className="border-b border-gray-100 bg-gray-50/50">
                                    <th className="px-6 py-4 text-xs font-black uppercase text-gray-400 tracking-wider w-20">Cover</th>
                                    <th className="px-6 py-4 text-xs font-black uppercase text-gray-400 tracking-wider">Details</th>
                                    <th className="px-6 py-4 text-xs font-black uppercase text-gray-400 tracking-wider">Status</th>
                                    <th className="px-6 py-4 text-xs font-black uppercase text-gray-400 tracking-wider">Chapters</th>
                                    <th className="px-6 py-4 text-xs font-black uppercase text-gray-400 tracking-wider text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {filteredNovels.map((novel) => (
                                    <tr key={novel.id} className="group hover:bg-gray-50 transition-colors">
                                        <td className="px-6 py-4">
                                            <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center text-gray-400">
                                                <BookOpen className="w-5 h-5" />
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="font-bold text-gray-900">{novel.title}</div>
                                            <div className="text-sm text-gray-500 font-medium">{novel.author}</div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold border ${novel.isPublished
                                                ? 'bg-green-50 text-green-700 border-green-200'
                                                : 'bg-gray-100 text-gray-600 border-gray-200'
                                                }`}>
                                                <span className={`w-1.5 h-1.5 rounded-full ${novel.isPublished ? 'bg-green-500' : 'bg-gray-400'}`} />
                                                {novel.isPublished ? 'Published' : 'Draft'}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 font-bold text-gray-600">
                                            {novel.chapters}
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <div className="flex items-center justify-end gap-2">
                                                <Link
                                                    href={`/admin/novels/${novel.id}`}
                                                    className="p-2 text-gray-400 hover:text-gray-900 hover:bg-white rounded-lg transition-all"
                                                >
                                                    <Edit className="w-4 h-4" />
                                                </Link>
                                                <button
                                                    onClick={() => setShowDeleteModal(novel.id)}
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
            ) : (
                // Card View
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {filteredNovels.map((novel) => (
                        <div key={novel.id} className="group relative bg-white rounded-xl border-2 border-dashed border-gray-200 overflow-hidden hover:border-gray-400 transition-all hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,0.1)]">
                            <div className="p-8 bg-gray-50 flex items-center justify-center relative overflow-hidden group-hover:bg-gray-100 transition-colors">
                                <div className="p-4 bg-white rounded-2xl shadow-sm transform group-hover:scale-110 transition-transform duration-300">
                                    <BookOpen className="w-12 h-12 text-gray-300 group-hover:text-gray-900 transition-colors" />
                                </div>

                                {/* Overlay Actions */}
                                <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3 backdrop-blur-[1px]">
                                    <Link
                                        href={`/admin/novels/${novel.id}`}
                                        className="p-3 bg-white rounded-full text-gray-900 hover:scale-110 transition-transform shadow-lg"
                                    >
                                        <Edit className="w-5 h-5" />
                                    </Link>
                                    <button
                                        onClick={() => setShowDeleteModal(novel.id)}
                                        className="p-3 bg-white rounded-full text-red-500 hover:scale-110 transition-transform shadow-lg"
                                    >
                                        <Trash2 className="w-5 h-5" />
                                    </button>
                                </div>

                                <div className="absolute top-3 right-3">
                                    <span className={`px-2 py-1 rounded-md text-[10px] font-black uppercase tracking-wider shadow-sm ${novel.isPublished ? 'bg-green-500 text-white' : 'bg-gray-800 text-white'
                                        }`}>
                                        {novel.isPublished ? 'Live' : 'Draft'}
                                    </span>
                                </div>
                            </div>
                            <div className="p-4 bg-white border-t-2 border-dashed border-gray-100">
                                <h3 className="font-bold text-gray-900 truncate mb-1" title={novel.title}>{novel.title}</h3>
                                <p className="text-xs font-bold text-gray-500 mb-3">{novel.author}</p>
                                <div className="flex items-center justify-between text-xs font-medium text-gray-400">
                                    <span>{novel.chapters} Chapters</span>
                                </div>
                            </div>
                        </div>
                    ))}
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
                            <h3 className="text-lg font-black text-gray-900">Delete Novel?</h3>
                            <p className="text-sm text-gray-500 font-medium">
                                Are you sure you want to delete this novel? This action cannot be undone.
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
