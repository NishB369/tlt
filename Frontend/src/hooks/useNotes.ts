import { useState, useEffect, useCallback } from 'react';
import apiClient from '../lib/apiClient';
import { Note } from '../types';

interface UseNotesReturn {
    notes: Note[];
    loading: boolean;
    error: string | null;
    refetch: () => Promise<void>;
}

interface UseNoteReturn {
    note: Note | null;
    loading: boolean;
    error: string | null;
}

export const useNotes = (): UseNotesReturn => {
    const [notes, setNotes] = useState<Note[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchNotes = useCallback(async () => {
        try {
            setLoading(true);
            const response = await apiClient.get('/notes');
            // Backend generic handler returns { status: 'success', results: number, data: { data: docs } }
            const fetchedNotes = response.data.data.data;

            // Map _id to id for frontend consistency if needed, though backend seems to send _id.
            // Let's ensure strict typing by mapping potentially.
            const mappedNotes = fetchedNotes.map((note: any) => ({
                ...note,
                id: note._id || note.id, // Handle both _id and id
            }));

            setNotes(mappedNotes);
            setError(null);
        } catch (err: any) {
            console.error('Error fetching notes:', err);
            setError(err.response?.data?.message || 'Failed to fetch notes');
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchNotes();
    }, [fetchNotes]);

    return { notes, loading, error, refetch: fetchNotes };
};

export const useNote = (id: string): UseNoteReturn => {
    const [note, setNote] = useState<Note | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!id) return;

        const fetchNote = async () => {
            try {
                setLoading(true);
                const response = await apiClient.get(`/notes/${id}`);
                // Backend generic getOne returns { status: 'success', data: { data: doc } }
                const fetchedNote = response.data.data.data;

                setNote({
                    ...fetchedNote,
                    id: fetchedNote._id || fetchedNote.id,
                });
                setError(null);
            } catch (err: any) {
                console.error(`Error fetching note ${id}:`, err);
                setError(err.response?.data?.message || 'Failed to fetch note');
            } finally {
                setLoading(false);
            }
        };

        fetchNote();
    }, [id]);

    return { note, loading, error };
};
