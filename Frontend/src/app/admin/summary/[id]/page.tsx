'use client';

import { use } from 'react';
import { SummaryForm } from '@/src/components/admin/summary/SummaryForm';

export default function EditSummaryPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params);

    // Mock Data mimicking a fetched summary
    const mockData = {
        title: 'Complete Analysis',
        novel: '1',
        chapter: 'Chapter 1',
        content: '# Analysis\n\nThis chapter introduces the *Bennett family*...\n\n- Mr. Bennett\n- Mrs. Bennett',
        importantQuotes: [
            { quote: 'It is a truth universally acknowledged...', context: 'Narrator, Opening parameters' }
        ],
        isPublished: true,
    };

    return <SummaryForm initialData={mockData} isEditing={true} />;
}
