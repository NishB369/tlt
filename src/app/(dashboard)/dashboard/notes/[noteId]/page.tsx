'use client';

import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { MOCK_NOTES, MOCK_VIDEOS, MOCK_QUIZZES } from '@/src/lib/constants';
import {
    ArrowLeft,
    Bookmark,
    Download,
    Printer,
    Video,
    CheckCircle,
    FileText,
    Hash,
} from 'lucide-react';
import { cn } from '@/src/lib/utils';

export default function NoteDetailPage() {
    const params = useParams();
    const router = useRouter();
    const noteId = params.noteId as string;

    const note = MOCK_NOTES.find((n) => n.id === noteId);
    const relatedVideo = MOCK_VIDEOS.find((v) => v.novel === note?.novel);
    const relatedQuiz = MOCK_QUIZZES.find((q) => q.novel === note?.novel);

    const [personalNotes, setPersonalNotes] = useState('');
    const [isBookmarked, setIsBookmarked] = useState(false);

    if (!note) {
        return (
            <div className="flex flex-col items-center justify-center h-96">
                <div className="text-6xl mb-4">📝</div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Note not found</h3>
                <Link href="/dashboard/notes" className="text-primary-600 hover:underline">
                    Back to Notes
                </Link>
            </div>
        );
    }

    // Parse markdown content for table of contents
    const headings = note.content.match(/^#{1,3}\s.+$/gm) || [];
    const toc = headings.map((heading: string) => {
        const level = (heading.match(/^#+/) || [''])[0].length;
        const text = heading.replace(/^#+\s/, '');
        const id = text.toLowerCase().replace(/\s+/g, '-');
        return { level, text, id };
    });

    // Simple markdown to HTML conversion
    const renderContent = (content: string) => {
        return content
            .split('\n')
            .map((line, i) => {
                // Headers
                if (line.startsWith('### ')) {
                    return (
                        <h3 key={i} className="text-base md:text-xl font-bold text-gray-900 mt-6 md:mt-8 mb-3 md:mb-4 tracking-tight">
                            {line.replace('### ', '')}
                        </h3>
                    );
                }
                if (line.startsWith('## ')) {
                    return (
                        <h2 key={i} className="text-lg md:text-2xl font-black text-gray-900 mt-8 md:mt-10 mb-4 md:mb-5 tracking-tight border-b-2 border-dashed border-gray-100 pb-2">
                            {line.replace('## ', '')}
                        </h2>
                    );
                }
                if (line.startsWith('# ')) {
                    return (
                        <h1 key={i} className="text-xl md:text-3xl font-black text-gray-900 mt-6 md:mt-8 mb-4 md:mb-6 tracking-tight">
                            {line.replace('# ', '')}
                        </h1>
                    );
                }
                // Bold text
                if (line.includes('**')) {
                    const parts = line.split(/\*\*(.+?)\*\*/);
                    return (
                        <p key={i} className="text-gray-600 mb-2 leading-relaxed text-sm md:text-base">
                            {parts.map((part, j) =>
                                j % 2 === 1 ? (
                                    <strong key={j} className="font-bold text-gray-900">
                                        {part}
                                    </strong>
                                ) : (
                                    part
                                )
                            )}
                        </p>
                    );
                }
                // List items
                if (line.startsWith('- ')) {
                    return (
                        <li key={i} className="text-gray-600 ml-4 mb-2 pl-2 border-l-2 border-dashed border-gray-200 text-sm md:text-base">
                            {line.replace('- ', '')}
                        </li>
                    );
                }
                // Regular paragraph
                if (line.trim()) {
                    return (
                        <p key={i} className="text-gray-600 mb-4 md:mb-6 leading-relaxed text-sm md:text-base">
                            {line}
                        </p>
                    );
                }
                return null;
            });
    };

    return (
        <div className="space-y-4 md:space-y-6 animate-fade-in max-w-7xl mx-auto">
            {/* Back Button */}
            <button
                onClick={() => router.back()}
                className="flex items-center gap-2 text-xs md:text-sm font-bold text-gray-500 hover:text-accent-600 transition-colors uppercase tracking-wider group"
            >
                <ArrowLeft className="w-3.5 h-3.5 md:w-4 md:h-4 group-hover:-translate-x-1 transition-transform" />
                Back to Notes
            </button>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 lg:gap-8">
                {/* Table of Contents Sidebar */}
                <div className="lg:col-span-1 order-2 lg:order-1">
                    <div className="sticky top-6 space-y-4 md:space-y-6">
                        {/* TOC */}
                        <div className="bg-white rounded-lg p-4 md:p-6 shadow-sm border-2 border-dashed border-gray-200">
                            <h3 className="font-bold text-gray-900 mb-3 md:mb-4 flex items-center gap-2 text-xs md:text-sm uppercase tracking-wider">
                                <Hash className="w-3.5 h-3.5 md:w-4 md:h-4 text-gray-400" />
                                Contents
                            </h3>
                            <nav className="space-y-2 md:space-y-3">
                                {toc.map((item: any, index: number) => (
                                    <a
                                        key={index}
                                        href={`#${item.id}`}
                                        className={cn(
                                            'block text-xs md:text-sm font-medium text-gray-500 hover:text-accent-600 transition-colors border-l-2 border-transparent hover:border-accent-300 pl-3 -ml-3',
                                            item.level === 2 && 'ml-0',
                                            item.level === 3 && 'ml-4'
                                        )}
                                    >
                                        {item.text}
                                    </a>
                                ))}
                            </nav>
                        </div>

                        {/* Personal Notes */}
                        <div className="bg-white rounded-lg p-4 md:p-6 shadow-sm border-2 border-dashed border-gray-200">
                            <h3 className="font-bold text-gray-900 mb-3 md:mb-4 flex items-center gap-2 text-xs md:text-sm uppercase tracking-wider">
                                <FileText className="w-3.5 h-3.5 md:w-4 md:h-4 text-gray-400" />
                                My Annotations
                            </h3>
                            <textarea
                                value={personalNotes}
                                onChange={(e) => setPersonalNotes(e.target.value)}
                                placeholder="Add your personal notes..."
                                className="w-full h-32 md:h-40 px-3 py-2 bg-white border-2 border-dashed border-gray-200 rounded-lg text-sm font-medium text-gray-900 placeholder-gray-400 focus:outline-none focus:border-accent-500 focus:ring-0 resize-none transition-colors"
                            />
                        </div>
                    </div>
                </div>

                {/* Main Content */}
                <div className="lg:col-span-3 order-1 lg:order-2">
                    <div className="bg-white rounded-lg p-4 md:p-8 shadow-sm border-2 border-dashed border-gray-200">
                        {/* Header */}
                        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-6 md:mb-8 pb-6 md:pb-8 border-b-2 border-dashed border-gray-100">
                            <div className="space-y-3 md:space-y-4">
                                <div className="flex items-center gap-2 md:gap-3">
                                    <span className="px-2.5 md:px-3 py-1 md:py-1.5 text-[10px] md:text-[11px] font-black text-accent-600 bg-accent-50 rounded border border-dashed border-accent-200 uppercase tracking-widest">
                                        {note.novel}
                                    </span>
                                    <span className="px-2.5 md:px-3 py-1 md:py-1.5 text-[10px] md:text-[11px] font-bold text-gray-500 bg-gray-50 rounded border border-dashed border-gray-200 uppercase tracking-widest">
                                        {note.chapter}
                                    </span>
                                </div>
                                <h1 className="text-2xl md:text-4xl font-black text-gray-900 tracking-tight leading-tight">
                                    {note.title}
                                </h1>
                            </div>
                            <div className="flex items-center gap-2 md:gap-3 self-start sm:self-auto">
                                <button
                                    onClick={() => setIsBookmarked(!isBookmarked)}
                                    className={cn(
                                        'p-2 md:p-2.5 rounded-lg border-2 border-dashed transition-all group',
                                        isBookmarked
                                            ? 'bg-accent-50 border-accent-200 text-accent-600'
                                            : 'bg-white border-gray-200 text-gray-400 hover:border-accent-200 hover:text-accent-600'
                                    )}
                                >
                                    <Bookmark className={cn('w-4 h-4 md:w-5 md:h-5', isBookmarked && 'fill-current')} />
                                </button>
                                <button className="p-2 md:p-2.5 rounded-lg bg-white border-2 border-dashed border-gray-200 text-gray-400 hover:border-accent-200 hover:text-accent-600 transition-all">
                                    <Download className="w-4 h-4 md:w-5 md:h-5" />
                                </button>
                                <button className="p-2 md:p-2.5 rounded-lg bg-white border-2 border-dashed border-gray-200 text-gray-400 hover:border-accent-200 hover:text-accent-600 transition-all">
                                    <Printer className="w-4 h-4 md:w-5 md:h-5" />
                                </button>
                            </div>
                        </div>

                        {/* Related Resources */}
                        <div className="flex flex-wrap gap-3 md:gap-4 mb-6 md:mb-10">
                            {relatedVideo && (
                                <Link
                                    href={`/dashboard/videos/${relatedVideo.id}`}
                                    className="flex items-center gap-2 px-4 md:px-5 py-2 md:py-2.5 bg-blue-50 text-blue-700 rounded-lg border border-dashed border-blue-200 hover:bg-blue-100 hover:border-blue-300 transition-all text-[10px] md:text-xs font-bold uppercase tracking-wider"
                                >
                                    <Video className="w-3.5 h-3.5 md:w-4 md:h-4" />
                                    Watch Related Video
                                </Link>
                            )}
                            {relatedQuiz && (
                                <Link
                                    href={`/dashboard/quiz/${relatedQuiz.id}`}
                                    className="flex items-center gap-2 px-4 md:px-5 py-2 md:py-2.5 bg-green-50 text-green-700 rounded-lg border border-dashed border-green-200 hover:bg-green-100 hover:border-green-300 transition-all text-[10px] md:text-xs font-bold uppercase tracking-wider"
                                >
                                    <CheckCircle className="w-3.5 h-3.5 md:w-4 md:h-4" />
                                    Take Quiz
                                </Link>
                            )}
                        </div>

                        {/* Content */}
                        <article className="prose prose-gray max-w-none prose-headings:font-black prose-p:text-gray-600 prose-a:text-accent-600 hover:prose-a:text-accent-700">
                            {renderContent(note.content)}
                        </article>
                    </div>
                </div>
            </div>
        </div>
    );
}
