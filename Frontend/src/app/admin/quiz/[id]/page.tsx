'use client';

import { use } from 'react';
import { QuizForm } from '@/src/components/admin/quiz/QuizForm';

export default function EditQuizPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params);

    // Mock Data mimicking a fetched quiz
    const mockData = {
        title: 'Chapter 1 Assessment',
        description: 'Test your knowledge of the opening chapter.',
        novel: '1', // Pride and Prejudice
        chapter: 'Chapter 1',
        timeLimit: 15,
        passingScore: 70,
        isPublished: true,
        questions: [
            {
                question: 'Who is the first person to speak in the novel?',
                type: 'mcq',
                options: ['Mr. Bennet', 'Mrs. Bennet', 'Elizabeth', 'Mary'],
                correctAnswer: 'Mrs. Bennet',
                explanation: 'Mrs. Bennet opens the novel by telling her husband about the new tenant.',
                points: 1
            }
        ]
    };

    return <QuizForm initialData={mockData} isEditing={true} />;
}
