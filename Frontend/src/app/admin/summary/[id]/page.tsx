'use client';

import { useState, useEffect, use } from 'react';
import { notFound } from 'next/navigation';
import { SummaryForm } from '@/src/components/admin/summary/SummaryForm';
import apiClient from '@/src/lib/apiClient';

export default function EditSummaryPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params);
    const [summary, setSummary] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchSummary = async () => {
            try {
                const response = await apiClient.get(`/summaries/${id}`);
                setSummary(response.data.data.data);
            } catch (error) {
                console.error('Error fetching summary:', error);
                setSummary(null);
            } finally {
                setLoading(false);
            }
        };
        fetchSummary();
    }, [id]);

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <div className="w-8 h-8 border-4 border-gray-200 border-t-gray-900 rounded-full animate-spin" />
            </div>
        );
    }

    if (!summary) return notFound();

    return <SummaryForm initialData={summary} isEditing={true} />;
}
