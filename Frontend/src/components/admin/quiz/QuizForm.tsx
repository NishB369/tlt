'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Save, Plus, Trash2, CheckCircle, HelpCircle, AlertCircle } from 'lucide-react';

// Mock Data for Dropdowns
const MOCK_NOVELS = [
    { id: '1', title: 'Pride and Prejudice', totalChapters: 61 },
    { id: '2', title: 'The Great Gatsby', totalChapters: 9 },
    { id: '3', title: '1984', totalChapters: 24 },
];

interface Question {
    question: string;
    type: 'mcq' | 'true-false' | 'short-answer';
    options: string[];
    correctAnswer: string;
    explanation: string;
    points: number;
}

interface QuizFormProps {
    initialData?: any;
    isEditing?: boolean;
}

export function QuizForm({ initialData, isEditing = false }: QuizFormProps) {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);

    // Form State
    const [formData, setFormData] = useState({
        title: initialData?.title || '',
        description: initialData?.description || '',
        novelId: initialData?.novel || '',
        chapter: initialData?.chapter || '',
        timeLimit: initialData?.timeLimit || 15,
        passingScore: initialData?.passingScore || 70,
        questions: (initialData?.questions || []) as Question[],
        isPublished: initialData?.isPublished || false,
    });

    const [availableChapters, setAvailableChapters] = useState<string[]>([]);

    useEffect(() => {
        if (formData.novelId) {
            const selectedNovel = MOCK_NOVELS.find(n => n.id === formData.novelId);
            if (selectedNovel) {
                const chapters = Array.from({ length: selectedNovel.totalChapters }, (_, i) => `Chapter ${i + 1}`);
                setAvailableChapters(chapters);
            } else {
                setAvailableChapters([]);
            }
        } else {
            setAvailableChapters([]);
        }
    }, [formData.novelId]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));

        if (name === 'novelId') {
            setFormData(prev => ({ ...prev, chapter: '', novelId: value }));
        }
    };

    const togglePublish = () => {
        setFormData(prev => ({ ...prev, isPublished: !prev.isPublished }));
    };

    // Question Management
    const addQuestion = () => {
        setFormData(prev => ({
            ...prev,
            questions: [
                ...prev.questions,
                {
                    question: '',
                    type: 'mcq',
                    options: ['', '', '', ''],
                    correctAnswer: '',
                    explanation: '',
                    points: 1
                }
            ]
        }));
    };

    const removeQuestion = (index: number) => {
        setFormData(prev => ({
            ...prev,
            questions: prev.questions.filter((_, i) => i !== index)
        }));
    };

    const updateQuestion = (index: number, field: keyof Question, value: any) => {
        const newQuestions = [...formData.questions];
        newQuestions[index] = { ...newQuestions[index], [field]: value };

        // Reset options if type changes
        if (field === 'type') {
            if (value === 'true-false') {
                newQuestions[index].options = ['True', 'False'];
                newQuestions[index].correctAnswer = 'True';
            } else if (value === 'short-answer') {
                newQuestions[index].options = [];
                newQuestions[index].correctAnswer = '';
            } else {
                newQuestions[index].options = ['', '', '', ''];
                newQuestions[index].correctAnswer = '';
            }
        }

        setFormData(prev => ({ ...prev, questions: newQuestions }));
    };

    const updateOption = (qIndex: number, oIndex: number, value: string) => {
        const newQuestions = [...formData.questions];
        newQuestions[qIndex].options[oIndex] = value;
        setFormData(prev => ({ ...prev, questions: newQuestions }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        console.log('Submitting Quiz Data:', formData);
        setIsLoading(false);
        router.push('/admin/quiz');
    };

    return (
        <form onSubmit={handleSubmit} className="mx-auto space-y-6 pb-20">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <h1 className="text-3xl font-black text-gray-900 tracking-tight">
                    {isEditing ? 'Edit Quiz' : 'Create Quiz'}
                </h1>
                <div className="flex items-center gap-3">
                    <button
                        type="button"
                        onClick={() => router.back()}
                        className="px-4 py-2 text-sm font-bold text-gray-500 hover:text-gray-900 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        disabled={isLoading}
                        className="flex items-center gap-2 px-6 py-2 bg-gray-900 text-white font-bold text-sm rounded-lg hover:bg-gray-800 transition-all shadow-lg active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {isLoading ? (
                            <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        ) : (
                            <Save className="w-4 h-4" />
                        )}
                        {isEditing ? 'Update Quiz' : 'Save Quiz'}
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Left Column: Quiz Settings */}
                <div className="lg:col-span-1 space-y-6">
                    <div className="bg-white p-6 rounded-xl border-2 border-dashed border-gray-200 space-y-6 sticky top-6">
                        <h3 className="font-bold text-gray-900 flex items-center gap-2">
                            <CheckCircle className="w-5 h-5 text-gray-400" />
                            Quiz Settings
                        </h3>

                        {/* Publish Status */}
                        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-100">
                            <div>
                                <span className="block text-sm font-bold text-gray-900">Publish Status</span>
                                <span className="text-xs text-gray-500">Visible to users</span>
                            </div>
                            <button
                                type="button"
                                onClick={togglePublish}
                                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 ${formData.isPublished ? 'bg-green-500' : 'bg-gray-200'
                                    }`}
                            >
                                <span className={`${formData.isPublished ? 'translate-x-6' : 'translate-x-1'} inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-200 ease-in-out`} />
                            </button>
                        </div>

                        {/* Basic Info */}
                        <div className="space-y-4">
                            <div className="space-y-2">
                                <label className="text-xs font-black uppercase text-gray-400 tracking-wider">Title</label>
                                <input
                                    type="text"
                                    name="title"
                                    value={formData.title}
                                    onChange={handleChange}
                                    placeholder="e.g. Chapter 1 Review"
                                    className="w-full px-4 py-3 bg-gray-50 border-2 border-transparent focus:border-gray-900 focus:bg-white rounded-lg font-bold text-gray-900 transition-all outline-none"
                                    required
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-black uppercase text-gray-400 tracking-wider">Description</label>
                                <textarea
                                    name="description"
                                    value={formData.description}
                                    onChange={handleChange}
                                    placeholder="Brief description of the quiz..."
                                    rows={3}
                                    className="w-full px-4 py-3 bg-gray-50 border-2 border-transparent focus:border-gray-900 focus:bg-white rounded-lg font-medium text-gray-900 transition-all outline-none resize-none"
                                />
                            </div>
                        </div>

                        {/* Context */}
                        <div className="grid grid-cols-1 gap-4">
                            <div className="space-y-2">
                                <label className="text-xs font-black uppercase text-gray-400 tracking-wider">Novel</label>
                                <div className="relative">
                                    <select
                                        name="novelId"
                                        value={formData.novelId}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 bg-gray-50 border-2 border-transparent focus:border-gray-900 focus:bg-white rounded-lg font-bold text-gray-900 transition-all outline-none appearance-none cursor-pointer"
                                        required
                                    >
                                        <option value="">Select Novel</option>
                                        {MOCK_NOVELS.map(novel => (
                                            <option key={novel.id} value={novel.id}>{novel.title}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-black uppercase text-gray-400 tracking-wider">Chapter</label>
                                <div className="relative">
                                    <select
                                        name="chapter"
                                        value={formData.chapter}
                                        onChange={handleChange}
                                        disabled={!formData.novelId}
                                        className="w-full px-4 py-3 bg-gray-50 border-2 border-transparent focus:border-gray-900 focus:bg-white rounded-lg font-bold text-gray-900 transition-all outline-none appearance-none cursor-pointer disabled:opacity-50"
                                        required
                                    >
                                        <option value="">Select Chapter</option>
                                        {availableChapters.map(chapter => (
                                            <option key={chapter} value={chapter}>{chapter}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                        </div>

                        {/* Metrics */}
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label className="text-xs font-black uppercase text-gray-400 tracking-wider">Time Limit (min)</label>
                                <input
                                    type="number"
                                    name="timeLimit"
                                    value={formData.timeLimit}
                                    onChange={handleChange}
                                    min="1"
                                    className="w-full px-4 py-3 bg-gray-50 border-2 border-transparent focus:border-gray-900 focus:bg-white rounded-lg font-bold text-gray-900 transition-all outline-none"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-black uppercase text-gray-400 tracking-wider">Pass Score %</label>
                                <input
                                    type="number"
                                    name="passingScore"
                                    value={formData.passingScore}
                                    onChange={handleChange}
                                    min="0"
                                    max="100"
                                    className="w-full px-4 py-3 bg-gray-50 border-2 border-transparent focus:border-gray-900 focus:bg-white rounded-lg font-bold text-gray-900 transition-all outline-none"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Column: Question Management */}
                <div className="lg:col-span-2 space-y-6">
                    <div className="flex items-center justify-between">
                        <h3 className="font-bold text-gray-900 flex items-center gap-2 text-lg">
                            <HelpCircle className="w-5 h-5 text-gray-400" />
                            Questions ({formData.questions.length})
                        </h3>
                        <button
                            type="button"
                            onClick={addQuestion}
                            className="text-xs font-bold text-white bg-gray-900 px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors flex items-center gap-2 shadow-md active:translate-y-0.5"
                        >
                            <Plus className="w-4 h-4" /> Add Question
                        </button>
                    </div>

                    <div className="space-y-6">
                        {formData.questions.map((q, qIndex) => (
                            <div key={qIndex} className="bg-white p-6 rounded-xl border-2 border-dashed border-gray-200 space-y-4 relative group">
                                <div className="flex items-start justify-between gap-4">
                                    <span className="flex-shrink-0 w-8 h-8 flex items-center justify-center bg-gray-100 rounded-lg text-sm font-black text-gray-500">
                                        {qIndex + 1}
                                    </span>
                                    <div className="flex-1 space-y-4">
                                        <div className="flex gap-4">
                                            <input
                                                type="text"
                                                value={q.question}
                                                onChange={(e) => updateQuestion(qIndex, 'question', e.target.value)}
                                                placeholder="Enter question text..."
                                                className="flex-1 px-4 py-2 bg-gray-50 border-2 border-transparent focus:border-gray-900 focus:bg-white rounded-lg font-bold text-gray-900 transition-all outline-none"
                                            />
                                            <select
                                                value={q.type}
                                                onChange={(e) => updateQuestion(qIndex, 'type', e.target.value)}
                                                className="w-32 px-3 py-2 bg-gray-50 border-2 border-transparent focus:border-gray-900 focus:bg-white rounded-lg font-bold text-gray-900 transition-all outline-none text-sm cursor-pointer"
                                            >
                                                <option value="mcq">MCQ</option>
                                                <option value="true-false">True/False</option>
                                                {/* <option value="short-answer">Short Answer</option> */}
                                            </select>
                                        </div>

                                        {/* Options for MCQ */}
                                        {q.type === 'mcq' && (
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                                {q.options.map((option, oIndex) => (
                                                    <div key={oIndex} className="flex items-center gap-2">
                                                        <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center cursor-pointer transition-colors ${q.correctAnswer === option && option !== '' ? 'border-green-500 bg-green-50 text-green-600' : 'border-gray-200 text-gray-300'}`}
                                                            onClick={() => updateQuestion(qIndex, 'correctAnswer', option)}
                                                        >
                                                            <div className={`w-2 h-2 rounded-full ${q.correctAnswer === option && option !== '' ? 'bg-green-500' : 'bg-transparent'}`} />
                                                        </div>
                                                        <input
                                                            type="text"
                                                            value={option}
                                                            onChange={(e) => updateOption(qIndex, oIndex, e.target.value)}
                                                            placeholder={`Option ${oIndex + 1}`}
                                                            className={`flex-1 px-3 py-2 bg-white border border-gray-200 rounded-lg text-sm font-medium focus:outline-none focus:border-gray-400 ${q.correctAnswer === option && option !== '' ? 'border-green-200 bg-green-50/30' : ''}`}
                                                        />
                                                    </div>
                                                ))}
                                            </div>
                                        )}

                                        {/* Options for True/False */}
                                        {q.type === 'true-false' && (
                                            <div className="flex gap-4">
                                                {['True', 'False'].map((option) => (
                                                    <label key={option} className={`flex-1 flex items-center justify-center gap-2 p-3 rounded-lg border-2 cursor-pointer transition-all ${q.correctAnswer === option ? 'border-green-500 bg-green-50 text-green-700 font-bold' : 'border-gray-200 text-gray-500 hover:border-gray-300'}`}>
                                                        <input
                                                            type="radio"
                                                            name={`q-${qIndex}`}
                                                            checked={q.correctAnswer === option}
                                                            onChange={() => updateQuestion(qIndex, 'correctAnswer', option)}
                                                            className="hidden"
                                                        />
                                                        {option}
                                                    </label>
                                                ))}
                                            </div>
                                        )}

                                        <div className="space-y-2">
                                            <textarea
                                                value={q.explanation}
                                                onChange={(e) => updateQuestion(qIndex, 'explanation', e.target.value)}
                                                placeholder="Explanation for the correct answer..."
                                                rows={2}
                                                className="w-full px-4 py-2 bg-blue-50/50 border border-blue-100 focus:border-blue-300 rounded-lg text-sm font-medium text-gray-700 transition-all outline-none resize-none placeholder:text-blue-300"
                                            />
                                        </div>
                                    </div>

                                    <button
                                        type="button"
                                        onClick={() => removeQuestion(qIndex)}
                                        className="p-2 text-gray-300 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors absolute top-4 right-4"
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>
                        ))}

                        {formData.questions.length === 0 && (
                            <div className="flex flex-col items-center justify-center py-12 bg-gray-50 rounded-xl border-2 border-dashed border-gray-200 text-gray-400">
                                <HelpCircle className="w-8 h-8 mb-2 opacity-50" />
                                <p className="font-bold text-sm">No questions added yet</p>
                                <p className="text-xs">Click "Add Question" to start building your quiz</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </form>
    );
}
