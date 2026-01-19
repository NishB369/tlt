'use client';

import { NovelForm } from '@/src/components/admin/novels/NovelForm';
import { notFound } from 'next/navigation';
import { useEffect, useState, use } from 'react';

import apiClient from '@/src/lib/apiClient';

export default function EditNovelPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params);
    const [novel, setNovel] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchNovel = async () => {
            try {
                const response = await apiClient.get(`/novels/${id}`);
                setNovel(response.data.data.data);
            } catch (error) {
                console.error('Error fetching novel:', error);
                setNovel(null); // Will trigger notFound() or could add specific error state
            } finally {
                setLoading(false);
            }
        };
        fetchNovel();
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
