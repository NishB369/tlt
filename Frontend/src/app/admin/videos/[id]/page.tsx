'use client';

import { use } from 'react';
import { VideoForm } from '@/src/components/admin/videos/VideoForm';

export default function EditVideoPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params);

    // Mock Fetch Logic
    // In real app, fetch data using id
    // For now, passing mock data that matches structure
    const mockData = {
        title: 'Chapter 1 Analysis',
        novel: '1', // ID matching mock novels
        chapter: 'Chapter 1',
        youtubeId: 'dQw4w9WgXcQ',
        description: 'Detailed analysis of the opening chapter.',
        thumbnail: 'https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg',
        duration: 320,
        isPublished: true,
    };

    return <VideoForm initialData={mockData} isEditing={true} />;
}
