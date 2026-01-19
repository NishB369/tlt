'use client';

import { useState, useEffect, use } from 'react';
import { notFound } from 'next/navigation';
import { VideoForm } from '@/src/components/admin/videos/VideoForm';
import apiClient from '@/src/lib/apiClient';

export default function EditVideoPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params);
    const [video, setVideo] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchVideo = async () => {
            try {
                const response = await apiClient.get(`/videos/${id}`);
                setVideo(response.data.data.data);
            } catch (error) {
                console.error('Error fetching video:', error);
                setVideo(null);
            } finally {
                setLoading(false);
            }
        };
        fetchVideo();
    }, [id]);

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <div className="w-8 h-8 border-4 border-gray-200 border-t-gray-900 rounded-full animate-spin" />
            </div>
        );
    }

    if (!video) return notFound();

    return <VideoForm initialData={video} isEditing={true} />;
}
