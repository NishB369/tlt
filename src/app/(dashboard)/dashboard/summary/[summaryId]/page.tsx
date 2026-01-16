'use client';

import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { MOCK_SUMMARIES, MOCK_VIDEOS, MOCK_QUIZZES } from '@/src/lib/constants';
import {
    ArrowLeft,
    Bookmark,
    Download,
    Printer,
    Video,
    CheckCircle,
    FileText,
    Hash,
    List,
    Quote,
    ArrowRight
} from 'lucide-react';
import { cn } from '@/src/lib/utils';

export default function SummaryDetailPage() {
    const params = useParams();
    const router = useRouter();
    const summaryId = params.summaryId as string;

    const summary = MOCK_SUMMARIES.find((s) => s.id === summaryId);
    const relatedVideo = MOCK_VIDEOS.find((v) => v.novel === summary?.novel);
    const relatedQuiz = MOCK_QUIZZES.find((q) => q.novel === summary?.novel);

    const [personalNotes, setPersonalNotes] = useState('');
    const [isBookmarked, setIsBookmarked] = useState(false);

    if (!summary) {
        return (
            <div className="flex flex-col items-center justify-center h-96">
                <div className="text-6xl mb-4">📋</div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Summary not found</h3>
                <Link href="/dashboard/summary" className="text-primary-600 hover:underline">
                    Back to Summaries
                </Link>
            </div>
        );
    }

    // Parse markdown content for table of contents
    const headings = summary.content.match(/^#{1,3}\s.+$/gm) || [];
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
                        <h3 key={i} className="text-xl font-bold text-gray-900 mt-8 mb-4 tracking-tight">
                            {line.replace('### ', '')}
                        </h3>
                    );
                }
                if (line.startsWith('## ')) {
                    return (
                        <h2 key={i} className="text-2xl font-black text-gray-900 mt-10 mb-5 tracking-tight border-b-2 border-dashed border-gray-100 pb-2">
                            {line.replace('## ', '')}
                        </h2>
                    );
                }
                if (line.startsWith('# ')) {
                    return (
                        <h1 key={i} className="text-3xl font-black text-gray-900 mt-8 mb-6 tracking-tight">
                            {line.replace('# ', '')}
                        </h1>
                    );
                }
                // Bold text
                if (line.includes('**')) {
                    const parts = line.split(/\*\*(.+?)\*\*/);
                    return (
                        <p key={i} className="text-gray-600 mb-2 leading-relaxed">
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
                        <li key={i} className="text-gray-600 ml-4 mb-2 pl-2 border-l-2 border-dashed border-gray-200">
                            {line.replace('- ', '')}
                        </li>
                    );
                }
                // Regular paragraph
                if (line.trim()) {
                    return (
                        <p key={i} className="text-gray-600 mb-6 leading-relaxed">
                            {line}
                        </p>
                    );
                }
                return null;
            });
    };

    return (
        <div className="space-y-6 animate-fade-in max-w-7xl mx-auto">
            {/* Back Button */}
            <button
                onClick={() => router.back()}
                className="flex items-center gap-2 text-sm font-bold text-gray-500 hover:text-accent-600 transition-colors uppercase tracking-wider group"
            >
                <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                Back to Summaries
            </button>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                {/* Sidebar (TOC & Key Points) */}
                <div className="lg:col-span-1 order-2 lg:order-1 space-y-6">
                    {/* Table of Contents */}
                    <div className="bg-white rounded-lg p-6 shadow-sm border-2 border-dashed border-gray-200">
                        <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2 text-sm uppercase tracking-wider">
                            <Hash className="w-4 h-4 text-gray-400" />
                            Contents
                        </h3>
                        <nav className="space-y-3">
                            {toc.length > 0 ? (
                                toc.map((item: any, index: number) => (
                                    <a
                                        key={index}
                                        href={`#${item.id}`}
                                        className={cn(
                                            'block text-sm font-medium text-gray-500 hover:text-accent-600 transition-colors border-l-2 border-transparent hover:border-accent-300 pl-3 -ml-3',
                                            item.level === 2 && 'ml-0',
                                            item.level === 3 && 'ml-4'
                                        )}
                                    >
                                        {item.text}
                                    </a>
                                ))
                            ) : (
                                <p className="text-sm text-gray-400 italic">No headings found</p>
                            )}
                        </nav>
                    </div>

                    {/* Key Points */}
                    <div className="bg-white rounded-lg p-6 shadow-sm border-2 border-dashed border-gray-200">
                        <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2 text-sm uppercase tracking-wider">
                            <List className="w-4 h-4 text-gray-400" />
                            Key Points
                        </h3>
                        <ul className="space-y-3">
                            {summary.keyPoints.map((point, index) => (
                                <li key={index} className="text-sm text-gray-600 font-medium flex items-start gap-2 leading-relaxed">
                                    <span className="text-accent-500 mt-1.5 w-1.5 h-1.5 rounded-full bg-accent-500 flex-shrink-0" />
                                    {point}
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Personal Notes */}
                    <div className="bg-white rounded-lg p-6 shadow-sm border-2 border-dashed border-gray-200">
                        <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2 text-sm uppercase tracking-wider">
                            <FileText className="w-4 h-4 text-gray-400" />
                            My Annotations
                        </h3>
                        <textarea
                            value={personalNotes}
                            onChange={(e) => setPersonalNotes(e.target.value)}
                            placeholder="Add your personal notes..."
                            className="w-full h-40 px-3 py-2 bg-white border-2 border-dashed border-gray-200 rounded-lg text-sm font-medium text-gray-900 placeholder-gray-400 focus:outline-none focus:border-accent-500 focus:ring-0 resize-none transition-colors"
                        />
                    </div>
                </div>

                {/* Main Content */}
                <div className="lg:col-span-3 order-1 lg:order-2 space-y-8">
                    <div className="bg-white rounded-lg p-8 shadow-sm border-2 border-dashed border-gray-200">
                        {/* Header */}
                        <div className="flex items-start justify-between mb-8 pb-8 border-b-2 border-dashed border-gray-100">
                            <div className="space-y-4">
                                <div className="flex items-center gap-3">
                                    <span className="px-3 py-1.5 text-[11px] font-black text-accent-600 bg-accent-50 rounded border border-dashed border-accent-200 uppercase tracking-widest">
                                        {summary.novel}
                                    </span>
                                    <span className="px-3 py-1.5 text-[11px] font-bold text-gray-500 bg-gray-50 rounded border border-dashed border-gray-200 uppercase tracking-widest">
                                        {summary.chapter}
                                    </span>
                                </div>
                                <h1 className="text-4xl font-black text-gray-900 tracking-tight leading-tight">
                                    {summary.title}
                                </h1>
                            </div>
                            <div className="flex items-center gap-3">
                                <button
                                    onClick={() => setIsBookmarked(!isBookmarked)}
                                    className={cn(
                                        'p-2.5 rounded-lg border-2 border-dashed transition-all group',
                                        isBookmarked
                                            ? 'bg-accent-50 border-accent-200 text-accent-600'
                                            : 'bg-white border-gray-200 text-gray-400 hover:border-accent-200 hover:text-accent-600'
                                    )}
                                >
                                    <Bookmark className={cn('w-5 h-5', isBookmarked && 'fill-current')} />
                                </button>
                                <button className="p-2.5 rounded-lg bg-white border-2 border-dashed border-gray-200 text-gray-400 hover:border-accent-200 hover:text-accent-600 transition-all">
                                    <Download className="w-5 h-5" />
                                </button>
                                <button className="p-2.5 rounded-lg bg-white border-2 border-dashed border-gray-200 text-gray-400 hover:border-accent-200 hover:text-accent-600 transition-all">
                                    <Printer className="w-5 h-5" />
                                </button>
                            </div>
                        </div>

                        {/* Important Quotes Section */}
                        {summary.importantQuotes && summary.importantQuotes.length > 0 && (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
                                {summary.importantQuotes.map((quote, index) => (
                                    <div key={index} className="bg-gray-50 rounded-lg p-5 border-l-4 border-accent-500 italic">
                                        <Quote className="w-6 h-6 text-accent-300 mb-2" />
                                        <p className="text-gray-800 font-serif text-lg mb-3">"{quote.quote}"</p>
                                        <p className="text-xs font-bold text-gray-500 uppercase tracking-wider not-italic">
                                            — {quote.context}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        )}

                        {/* Content */}
                        <article className="prose prose-gray max-w-none prose-headings:font-black prose-p:text-gray-600 prose-a:text-accent-600 hover:prose-a:text-accent-700">
                            {renderContent(summary.content)}
                        </article>
                    </div>

                    {/* Next Chapter/Related */}
                    <div className="flex flex-wrap gap-4">
                        {relatedVideo && (
                            <Link
                                href={`/dashboard/videos/${relatedVideo.id}`}
                                className="flex-1 flex items-center justify-between p-5 bg-white rounded-lg border-2 border-dashed border-gray-200 hover:border-blue-300 hover:shadow-md transition-all group"
                            >
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600">
                                        <Video className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-0.5">Watch Video</p>
                                        <p className="font-bold text-gray-900 group-hover:text-blue-600 transition-colors">{relatedVideo.title}</p>
                                    </div>
                                </div>
                                <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all" />
                            </Link>
                        )}
                        {relatedQuiz && (
                            <Link
                                href={`/dashboard/quiz/${relatedQuiz.id}`}
                                className="flex-1 flex items-center justify-between p-5 bg-white rounded-lg border-2 border-dashed border-gray-200 hover:border-green-300 hover:shadow-md transition-all group"
                            >
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 rounded-lg bg-green-50 flex items-center justify-center text-green-600">
                                        <CheckCircle className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-0.5">Take Quiz</p>
                                        <p className="font-bold text-gray-900 group-hover:text-green-600 transition-colors">{relatedQuiz.title}</p>
                                    </div>
                                </div>
                                <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-green-600 group-hover:translate-x-1 transition-all" />
                            </Link>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
