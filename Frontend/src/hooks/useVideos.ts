import { useState, useEffect } from 'react';
import apiClient from '../lib/apiClient';
import { Video } from '../types';

interface UseVideosResult {
    videos: Video[];
    loading: boolean;
    error: string | null;
    refetch: () => Promise<void>;
}

interface UseVideoResult {
    video: Video | null;
    loading: boolean;
    error: string | null;
    refetch: () => Promise<void>;
}

export const useVideos = (): UseVideosResult => {
    const [videos, setVideos] = useState<Video[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const fetchVideos = async () => {
        try {
            setLoading(true);
            setError(null);
            const response = await apiClient.get('/videos');

            // Based on observed API response structure:
            // { status: 'success', results: 1, data: { data: [...] } }
            // So the array is at response.data.data.data
            const videoData = response.data.data?.data;

            if (Array.isArray(videoData)) {
                // Ensure id field is present (map _id to id if needed)
                const mappedVideos = videoData.map((v: any) => ({
                    ...v,
                    id: v.id || v._id
                }));
                setVideos(mappedVideos);
            } else {
                setVideos([]);
                console.warn('Unexpected API response structure:', response.data);
            }

        } catch (err: any) {
            setError(err.message || 'Failed to fetch videos');
            console.error('Error fetching videos:', err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchVideos();
    }, []);

    return { videos, loading, error, refetch: fetchVideos };
};

export const useVideo = (id: string): UseVideoResult => {
    const [video, setVideo] = useState<Video | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const fetchVideo = async () => {
        if (!id) return;

        try {
            setLoading(true);
            setError(null);
            const response = await apiClient.get(`/videos/${id}`);

            // Expected response: { status: 'success', data: { data: { ... } } }
            const videoData = response.data.data?.data;

            if (videoData) {
                setVideo({ ...videoData, id: videoData.id || videoData._id });
            } else {
                setVideo(null);
                console.warn('Unexpected API response structure for single video:', response.data);
            }

        } catch (err: any) {
            // Handle 404 cleanly maybe?
            setError(err.message || 'Failed to fetch video');
            console.error('Error fetching video:', err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchVideo();
    }, [id]);

    return { video, loading, error, refetch: fetchVideo };
};
