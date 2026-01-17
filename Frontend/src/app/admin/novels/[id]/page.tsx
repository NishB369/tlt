'use client';

import { NovelForm } from '@/src/components/admin/novels/NovelForm';
import { notFound } from 'next/navigation';
import { useEffect, useState, use } from 'react';

// Mock data fetcher
const getNovelData = async (id: string) => {
    // Simulate delay
    await new Promise((resolve) => setTimeout(resolve, 500));

    // Return mock data for now
    return {
        id,
        title: 'Pride and Prejudice',
        author: 'Jane Austen',
        description: 'A romantic novel of manners written by Jane Austen in 1813.',
        totalChapters: 61,
        difficulty: 'intermediate',
        tags: ['Classic', 'Romance', 'Fiction'],
        coverImage: 'https://m.media-amazon.com/images/I/71Q1tPupKjL._AC_UF1000,1000_QL80_.jpg',
        isPublished: true,
    };
};

export default function EditNovelPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params);
    const [novel, setNovel] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getNovelData(id).then((data) => {
            setNovel(data);
            setLoading(false);
        });
    }, [id]);

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <div className="w-8 h-8 border-4 border-gray-200 border-t-gray-900 rounded-full animate-spin" />
            </div>
        );
    }

    if (!novel) return notFound();

    return (
        <div className="space-y-6">
            <NovelForm initialData={novel} isEditing />
        </div>
    );
}
