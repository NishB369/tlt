import { useState, useEffect } from 'react';
import apiClient from '../lib/apiClient';

export interface Novel {
    id: string;
    title: string;
    author: string;
    coverImage: string;
    createdAt: string;
}

interface UseNovelsResult {
    novels: Novel[];
    loading: boolean;
    error: string | null;
    refetch: () => Promise<void>;
}

export const useNovels = (): UseNovelsResult => {
    const [novels, setNovels] = useState<Novel[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const fetchNovels = async () => {
        try {
            setLoading(true);
            setError(null);
            const response = await apiClient.get('/novels');

            // Expected response: { status: 'success', results: n, data: { data: [...] } }
            const novelData = response.data.data?.data;

            if (Array.isArray(novelData)) {
                const mappedNovels = novelData.map((n: any) => ({
                    ...n,
                    id: n.id || n._id
                }));
                setNovels(mappedNovels);
            } else {
                setNovels([]);
                console.warn('Unexpected API response structure:', response.data);
            }
        } catch (err: any) {
            setError(err.message || 'Failed to fetch novels');
            console.error('Error fetching novels:', err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchNovels();
    }, []);

    return { novels, loading, error, refetch: fetchNovels };
};
