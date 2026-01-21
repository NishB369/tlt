import { useState, useEffect, useCallback } from 'react';
import apiClient from '../lib/apiClient';
import { Summary } from '../types';

interface UseSummariesReturn {
    summaries: Summary[];
    loading: boolean;
    error: string | null;
    refetch: () => Promise<void>;
}

interface UseSummaryReturn {
    summary: Summary | null;
    loading: boolean;
    error: string | null;
}

export const useSummaries = (): UseSummariesReturn => {
    const [summaries, setSummaries] = useState<Summary[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchSummaries = useCallback(async () => {
        try {
            setLoading(true);
            const response = await apiClient.get('/summaries');
            // Backend generic handler returns { status: 'success', results: number, data: { data: docs } }
            const fetchedSummaries = response.data.data.data;

            // Map _id to id for frontend consistency
            const mappedSummaries = fetchedSummaries.map((summary: any) => ({
                ...summary,
                id: summary._id || summary.id,
            }));

            setSummaries(mappedSummaries);
            setError(null);
        } catch (err: any) {
            console.error('Error fetching summaries:', err);
            setError(err.response?.data?.message || 'Failed to fetch summaries');
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchSummaries();
    }, [fetchSummaries]);

    return { summaries, loading, error, refetch: fetchSummaries };
};

export const useSummary = (id: string): UseSummaryReturn => {
    const [summary, setSummary] = useState<Summary | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!id) return;

        const fetchSummary = async () => {
            try {
                setLoading(true);
                const response = await apiClient.get(`/summaries/${id}`);
                // Backend generic getOne returns { status: 'success', data: { data: doc } }
                const fetchedSummary = response.data.data.data;

                setSummary({
                    ...fetchedSummary,
                    id: fetchedSummary._id || fetchedSummary.id,
                });
                setError(null);
            } catch (err: any) {
                console.error(`Error fetching summary ${id}:`, err);
                setError(err.response?.data?.message || 'Failed to fetch summary');
            } finally {
                setLoading(false);
            }
        };

        fetchSummary();
    }, [id]);

    return { summary, loading, error };
};
