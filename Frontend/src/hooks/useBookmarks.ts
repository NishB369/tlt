import useSWR from 'swr';

import apiClient from '@/src/lib/apiClient';
import { toast } from 'react-hot-toast';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';

const fetcher = (url: string) => apiClient.get(url).then((res) => res.data);

export function useBookmarks() {
    const { data, error, isLoading, mutate } = useSWR(
        '/bookmarks',
        fetcher
    );

    const toggleBookmark = async (itemId: string, itemType: string) => {
        try {
            const response = await apiClient.post(
                '/bookmarks',
                { itemId, itemType }
            );

            // Optimistic update or just revalidate
            await mutate(); // Re-fetch list

            const isBookmarked = response.data.data.bookmarked;
            toast.success(isBookmarked ? 'Added to bookmarks' : 'Removed from bookmarks');

            return isBookmarked;
        } catch (err: any) {
            console.error('Bookmark toggle error:', err);
            toast.error(err.response?.data?.message || 'Failed to update bookmark');
            return null;
        }
    };

    const isBookmarked = (itemId: string) => {
        if (!data?.data?.bookmarks) return false;
        return data.data.bookmarks.some((b: any) => b.item && b.item._id === itemId);
    };

    return {
        bookmarks: data?.data?.bookmarks || [],
        isLoading,
        error,
        toggleBookmark,
        isBookmarked,
        mutate,
    };
}
