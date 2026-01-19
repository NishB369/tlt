'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import {
    Plus,
    Search,
    LayoutGrid,
    List as ListIcon,
    Edit,
    Trash2,
    CheckCircle,
    HelpCircle
} from 'lucide-react';
import apiClient from '@/src/lib/apiClient';

export default function AdminQuizPage() {
    const [viewMode, setViewMode] = useState<'list' | 'card'>('list');
    const [searchQuery, setSearchQuery] = useState('');
    const [quizzes, setQuizzes] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [showDeleteModal, setShowDeleteModal] = useState<string | null>(null);

    useEffect(() => {
        fetchQuizzes();
    }, []);

    const fetchQuizzes = async () => {
        try {
            setIsLoading(true);
            const response = await apiClient.get('/quizzes');
            setQuizzes(response.data.data.data);
        } catch (error) {
            console.error('Error fetching quizzes:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const filteredQuizzes = quizzes.filter(q =>
        q.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleDelete = async (id: string) => {
        try {
            await apiClient.delete(`/quizzes/${id}`);
            await fetchQuizzes();
            setShowDeleteModal(null);
        } catch (error) {
            console.error('Error deleting quiz:', error);
        }
    };

    const getNovelTitle = (quiz: any) => {
        return typeof quiz.novel === 'object' ? quiz.novel?.title : quiz.novel;
    };

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-black text-gray-900 tracking-tight">Quizzes</h1>
                    <p className="text-gray-500 font-medium">Manage assessments and practice questions</p>
                </div>
                <Link
                    href="/admin/quiz/new"
                    className="flex items-center justify-center gap-2 px-6 py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-all shadow-[4px_4px_0px_0px_rgba(0,0,0,0.1)] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none font-bold"
                >
                    <Plus className="w-5 h-5" />
                    <span>Create Quiz</span>
                </Link>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 p-1 bg-white rounded-xl border-2 border-dashed border-gray-200">
                <div className="relative flex-1">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Search quizzes..."
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

            {filteredQuizzes.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-20 text-center bg-gray-50 rounded-xl border-2 border-dashed border-gray-200">
                    <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center text-gray-300 mb-4 shadow-sm">
                        <CheckCircle className="w-8 h-8" />
                    </div>
                    <h3 className="text-xl font-black text-gray-900 mb-2">No quizzes found</h3>
                    <p className="text-gray-500 max-w-sm mb-6 font-medium">Create your first quiz to start testing knowledge.</p>
                    <Link
                        href="/admin/quiz/new"
                        className="text-sm font-bold text-gray-900 underline hover:text-gray-700"
                    >
                        Create New Quiz
                    </Link>
                </div>
            ) : viewMode === 'list' ? (
                <div className="bg-white rounded-xl border-2 border-dashed border-gray-200 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead>
                                <tr className="border-b border-gray-100 bg-gray-50/50">
                                    <th className="px-6 py-4 text-xs font-black uppercase text-gray-400 tracking-wider">Title</th>
                                    <th className="px-6 py-4 text-xs font-black uppercase text-gray-400 tracking-wider">Novel / Chapter</th>
                                    <th className="px-6 py-4 text-xs font-black uppercase text-gray-400 tracking-wider">Details</th>
                                    <th className="px-6 py-4 text-xs font-black uppercase text-gray-400 tracking-wider">Status</th>
                                    <th className="px-6 py-4 text-xs font-black uppercase text-gray-400 tracking-wider text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {filteredQuizzes.map((quiz) => (
                                    <tr key={quiz._id || quiz.id} className="group hover:bg-gray-50 transition-colors">
                                        <td className="px-6 py-4">
                                            <div className="font-bold text-gray-900">{quiz.title}</div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="text-sm font-bold text-gray-700">{getNovelTitle(quiz)}</div>
                                            <div className="text-xs text-gray-500 font-medium">{quiz.chapter}</div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <span className="text-xs font-bold text-gray-500 flex items-center gap-1">
                                                    <HelpCircle className="w-3 h-3" /> {quiz.questions?.length || 0} Qs
                                                </span>
                                                <span className="text-xs font-bold text-gray-500 flex items-center gap-1">
                                                    <CheckCircle className="w-3 h-3" /> {quiz.passingScore}% Pass
                                                </span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold border ${quiz.isPublished ? 'bg-green-50 text-green-700 border-green-200' : 'bg-gray-100 text-gray-600 border-gray-200'}`}>
                                                <span className={`w-1.5 h-1.5 rounded-full ${quiz.isPublished ? 'bg-green-500' : 'bg-gray-400'}`} />
                                                {quiz.isPublished ? 'Published' : 'Draft'}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                <Link
                                                    href={`/admin/quiz/${quiz._id || quiz.id}`}
                                                    className="p-2 text-gray-400 hover:text-gray-900 hover:bg-white rounded-lg transition-all"
                                                >
                                                    <Edit className="w-4 h-4" />
                                                </Link>
                                                <button
                                                    onClick={() => setShowDeleteModal(quiz._id || quiz.id)}
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
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredQuizzes.map((quiz) => (
                        <div key={quiz._id || quiz.id} className="group relative bg-white rounded-xl border-2 border-dashed border-gray-200 overflow-hidden hover:border-gray-400 transition-all hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,0.1)] p-6 space-y-4">
                            <div className="flex items-start justify-between">
                                <div className="p-3 bg-gray-50 rounded-xl">
                                    <CheckCircle className="w-6 h-6 text-gray-400" />
                                </div>
                                <span className={`px-2 py-1 rounded-md text-[10px] font-black uppercase tracking-wider ${quiz.isPublished ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}>
                                    {quiz.isPublished ? 'Live' : 'Draft'}
                                </span>
                            </div>

                            <div>
                                <h3 className="font-bold text-gray-900 leading-tight mb-1">{quiz.title}</h3>
                                <p className="text-xs font-bold text-gray-500">{getNovelTitle(quiz)} • {quiz.chapter}</p>
                            </div>

                            <div className="pt-4 border-t border-dashed border-gray-100 flex items-center justify-between text-xs font-bold text-gray-500">
                                <span>{quiz.questions?.length || 0} Questions</span>
                                <span>{quiz.passingScore}% to Pass</span>
                            </div>

                            {/* Overlay Actions */}
                            <div className="absolute inset-0 bg-white/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3 backdrop-blur-[1px]">
                                <Link
                                    href={`/admin/quiz/${quiz._id || quiz.id}`}
                                    className="p-3 bg-white rounded-full text-gray-900 hover:scale-110 transition-transform shadow-lg border border-gray-100"
                                >
                                    <Edit className="w-5 h-5" />
                                </Link>
                                <button
                                    onClick={() => setShowDeleteModal(quiz._id || quiz.id)}
                                    className="p-3 bg-white rounded-full text-red-500 hover:scale-110 transition-transform shadow-lg border border-gray-100"
                                >
                                    <Trash2 className="w-5 h-5" />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {showDeleteModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
                    <div className="bg-white rounded-xl max-w-sm w-full p-6 shadow-2xl space-y-6 animate-in zoom-in-95 duration-200">
                        <div className="text-center space-y-2">
                            <div className="w-14 h-14 bg-red-50 rounded-full flex items-center justify-center text-red-500 mx-auto mb-4">
                                <Trash2 className="w-7 h-7" />
                            </div>
                            <h3 className="text-lg font-black text-gray-900">Delete Quiz?</h3>
                            <p className="text-sm text-gray-500 font-medium">Are you sure? This cannot be undone.</p>
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                            <button onClick={() => setShowDeleteModal(null)} className="px-4 py-2.5 rounded-lg border-2 border-gray-200 text-gray-700 font-bold text-sm hover:bg-gray-50 transition-colors">Cancel</button>
                            <button onClick={() => handleDelete(showDeleteModal)} className="px-4 py-2.5 rounded-lg bg-red-500 text-white font-bold text-sm hover:bg-red-600 transition-colors shadow-lg shadow-red-500/20">Delete</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
