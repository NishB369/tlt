import { useState, useEffect, useCallback } from 'react';
import apiClient from '../lib/apiClient';
import { Quiz } from '../types';

interface UseQuizzesReturn {
    quizzes: Quiz[];
    loading: boolean;
    error: string | null;
    refetch: () => Promise<void>;
}

interface UseQuizReturn {
    quiz: Quiz | null;
    loading: boolean;
    error: string | null;
}

export const useQuizzes = (): UseQuizzesReturn => {
    const [quizzes, setQuizzes] = useState<Quiz[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchQuizzes = useCallback(async () => {
        try {
            setLoading(true);
            const response = await apiClient.get('/quizzes');
            // Backend generic handler returns { status: 'success', results: number, data: { data: docs } }
            const fetchedQuizzes = response.data.data.data;

            // Map _id to id for frontend consistency
            const mappedQuizzes = fetchedQuizzes.map((quiz: any) => ({
                ...quiz,
                id: quiz._id || quiz.id,
            }));

            setQuizzes(mappedQuizzes);
            setError(null);
        } catch (err: any) {
            console.error('Error fetching quizzes:', err);
            setError(err.response?.data?.message || 'Failed to fetch quizzes');
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchQuizzes();
    }, [fetchQuizzes]);

    return { quizzes, loading, error, refetch: fetchQuizzes };
};

export const useQuiz = (id: string): UseQuizReturn => {
    const [quiz, setQuiz] = useState<Quiz | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!id) return;

        const fetchQuiz = async () => {
            try {
                setLoading(true);
                const response = await apiClient.get(`/quizzes/${id}`);
                // Backend generic getOne returns { status: 'success', data: { data: doc } }
                const fetchedQuiz = response.data.data.data;

                setQuiz({
                    ...fetchedQuiz,
                    id: fetchedQuiz._id || fetchedQuiz.id,
                });
                setError(null);
            } catch (err: any) {
                console.error(`Error fetching quiz ${id}:`, err);
                setError(err.response?.data?.message || 'Failed to fetch quiz');
            } finally {
                setLoading(false);
            }
        };

        fetchQuiz();
    }, [id]);

    return { quiz, loading, error };
};
