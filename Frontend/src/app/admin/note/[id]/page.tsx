'use client';

import { use } from 'react';
import { NoteForm } from '@/src/components/admin/note/NoteForm';

export default function EditNotePage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params);

    // Mock Data mimicking a fetched note
    const mockData = {
        title: 'Symbolism of the Green Light',
        novel: '2', // The Great Gatsby
        chapter: 'Chapter 1',
        content: '# Green Light\n\nThe green light represents Gatsby\'s hopes and dreams...',
        type: 'Symbolism',
        importance: 'High',
        isPublished: true,
    };

    return <NoteForm initialData={mockData} isEditing={true} />;
}
