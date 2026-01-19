'use client';

import { useState, useEffect, use } from 'react';
import { notFound } from 'next/navigation';
import { NoteForm } from '@/src/components/admin/note/NoteForm';
import apiClient from '@/src/lib/apiClient';

export default function EditNotePage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params);
    const [note, setNote] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchNote = async () => {
            try {
                const response = await apiClient.get(`/notes/${id}`);
                setNote(response.data.data.data);
            } catch (error) {
                console.error('Error fetching note:', error);
                setNote(null);
            } finally {
                setLoading(false);
            }
        };
        fetchNote();
    }, [id]);

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <div className="w-8 h-8 border-4 border-gray-200 border-t-gray-900 rounded-full animate-spin" />
            </div>
        );
    }

    if (!note) return notFound();

    return <NoteForm initialData={note} isEditing={true} />;
}
