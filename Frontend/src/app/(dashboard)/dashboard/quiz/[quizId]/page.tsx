'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { useQuiz } from '@/src/hooks/useQuizzes';
import {
    ArrowLeft,
    Clock,
    Flag,
    ChevronLeft,
    ChevronRight,
    CheckCircle,
    XCircle,
    Trophy,
    RotateCcw,
    Home,
    Grid,
    X,
} from 'lucide-react';
import { cn } from '@/src/lib/utils';
import { Quiz } from '@/src/types';

type QuizState = 'intro' | 'taking' | 'results';

export default function QuizTakingPage() {
    const params = useParams();
    const router = useRouter();
    const quizId = params.quizId as string;

    const { quiz, loading, error } = useQuiz(quizId);

    const [state, setState] = useState<QuizState>('intro');
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [answers, setAnswers] = useState<Record<string, number | string>>({});
    const [flaggedQuestions, setFlaggedQuestions] = useState<Set<string>>(new Set());
    const [timeLeft, setTimeLeft] = useState(0);
    const [showExplanations, setShowExplanations] = useState(false);
    const [showQuestionMap, setShowQuestionMap] = useState(false);

    // Initialize timer when quiz loads
    useEffect(() => {
        if (quiz?.timeLimit) {
            setTimeLeft(quiz.timeLimit);
        }
    }, [quiz]);

    // Timer logic
    useEffect(() => {
        if (state !== 'taking' || !quiz?.timeLimit) return;

        const timer = setInterval(() => {
            setTimeLeft((prev) => {
                if (prev <= 1) {
                    clearInterval(timer);
                    handleSubmit();
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(timer);
    }, [state, quiz?.timeLimit]);

    if (loading) {
        return (
            <div className="flex items-center justify-center h-96">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
            </div>
        );
    }

    if (error || !quiz) {
        return (
            <div className="flex flex-col items-center justify-center h-96">
                <div className="text-6xl mb-4">❓</div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    {error || 'Quiz not found'}
                </h3>
                <Link href="/dashboard/quiz" className="text-primary-600 hover:underline">
                    Back to Quizzes
                </Link>
            </div>
        );
    }

    const question = quiz.questions[currentQuestion];
    const progress = ((currentQuestion + 1) / quiz.questions.length) * 100;

    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

    const handleAnswer = (answer: number | string) => {
        setAnswers((prev) => ({ ...prev, [question.id]: answer }));
    };

    const handleFlag = () => {
        setFlaggedQuestions((prev) => {
            const newSet = new Set(prev);
            if (newSet.has(question.id)) {
                newSet.delete(question.id);
            } else {
                newSet.add(question.id);
            }
            return newSet;
        });
    };

    const handleSubmit = () => {
        setState('results');
    };

    const calculateResults = () => {
        let correct = 0;
        let totalPoints = 0;

        quiz.questions.forEach((q) => {
            if (answers[q.id] === q.correctAnswer) {
                correct++;
                totalPoints += q.points;
            }
        });

        const percentage = Math.round((totalPoints / quiz.totalPoints) * 100);
        const passed = percentage >= (quiz.passingScore / quiz.totalPoints) * 100;

        return { correct, totalPoints, percentage, passed };
    };

    // Intro Screen
    if (state === 'intro') {
        return (
            <div className="max-w-7xl mx-auto space-y-4 md:space-y-6 animate-fade-in">
                <button
                    onClick={() => router.back()}
                    className="flex items-center gap-2 text-xs md:text-sm font-bold text-gray-500 hover:text-accent-600 transition-colors uppercase tracking-wider group"
                >
                    <ArrowLeft className="w-3.5 h-3.5 md:w-4 md:h-4 group-hover:-translate-x-1 transition-transform" />
                    Back to Quizzes
                </button>

                <div className="max-w-3xl mx-auto">
                    <div className="bg-white rounded-lg p-6 md:p-10 border-2 border-dashed border-gray-200 text-center">
                        <div className="w-16 h-16 md:w-24 md:h-24 mx-auto mb-6 md:mb-8 rounded-lg border-2 border-dashed border-accent-200 bg-accent-50 flex items-center justify-center">
                            <CheckCircle className="w-8 h-8 md:w-12 md:h-12 text-accent-500" />
                        </div>

                        <h1 className="text-2xl md:text-4xl font-black text-gray-900 mb-3 md:mb-4 tracking-tight">{quiz.title}</h1>
                        <p className="text-gray-500 font-medium text-sm md:text-lg mb-8 md:mb-10 max-w-xl mx-auto">{quiz.description}</p>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-6 mb-8 md:mb-12">
                            <div className="p-3 md:p-4 rounded-lg bg-gray-50 border-2 border-dashed border-gray-200">
                                <p className="text-2xl md:text-3xl font-black text-gray-900 mb-1">{quiz.questions.length}</p>
                                <p className="text-[10px] md:text-xs font-bold text-gray-400 uppercase tracking-wider">Questions</p>
                            </div>
                            {quiz.timeLimit && (
                                <div className="p-3 md:p-4 rounded-lg bg-gray-50 border-2 border-dashed border-gray-200">
                                    <p className="text-2xl md:text-3xl font-black text-gray-900 mb-1">{Math.floor(quiz.timeLimit / 60)}</p>
                                    <p className="text-[10px] md:text-xs font-bold text-gray-400 uppercase tracking-wider">Minutes</p>
                                </div>
                            )}
                            <div className="p-3 md:p-4 rounded-lg bg-gray-50 border-2 border-dashed border-gray-200">
                                <p className="text-2xl md:text-3xl font-black text-gray-900 mb-1">{quiz.totalPoints}</p>
                                <p className="text-[10px] md:text-xs font-bold text-gray-400 uppercase tracking-wider">Points</p>
                            </div>
                            <div className="p-3 md:p-4 rounded-lg bg-gray-50 border-2 border-dashed border-gray-200">
                                <p className="text-2xl md:text-3xl font-black text-gray-900 mb-1">{Math.round((quiz.passingScore / quiz.totalPoints) * 100)}%</p>
                                <p className="text-[10px] md:text-xs font-bold text-gray-400 uppercase tracking-wider">To Pass</p>
                            </div>
                        </div>

                        <button
                            onClick={() => {
                                setState('taking');
                                setTimeLeft(quiz.timeLimit || 0);
                            }}
                            className="w-full md:w-auto px-8 md:px-10 py-3 md:py-4 bg-accent-500 hover:bg-accent-600 text-white font-black uppercase tracking-widest rounded-lg transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5 text-sm md:text-base"
                        >
                            Start Quiz
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    // Results Screen
    if (state === 'results') {
        const results = calculateResults();

        return (
            <div className="max-w-3xl mx-auto space-y-6 md:space-y-8 animate-fade-in">
                <div className="bg-white rounded-lg p-6 md:p-10 border-2 border-dashed border-gray-200 text-center">
                    <div className={cn(
                        'w-16 h-16 md:w-24 md:h-24 mx-auto mb-6 md:mb-8 rounded-full border-4 flex items-center justify-center',
                        results.passed
                            ? 'border-green-100 bg-green-50'
                            : 'border-orange-100 bg-orange-50'
                    )}>
                        {results.passed ? (
                            <Trophy className="w-8 h-8 md:w-12 md:h-12 text-green-500" />
                        ) : (
                            <RotateCcw className="w-8 h-8 md:w-12 md:h-12 text-orange-500" />
                        )}
                    </div>

                    <h1 className="text-2xl md:text-3xl font-black text-gray-900 mb-2 tracking-tight">
                        {results.passed ? 'Congratulations! 🎉' : 'Keep Learning!'}
                    </h1>
                    <p className="text-sm md:text-base text-gray-500 font-medium mb-8 md:mb-10">
                        {results.passed
                            ? 'You passed the quiz! Great job.'
                            : "Don't worry, practise makes perfect!"}
                    </p>

                    <div className="grid grid-cols-3 gap-3 md:gap-6 mb-8 md:mb-10 max-w-xl mx-auto">
                        <div className="p-3 md:p-4 rounded-lg bg-gray-50 border-2 border-dashed border-gray-200">
                            <p className={cn(
                                'text-2xl md:text-3xl font-black mb-1',
                                results.passed ? 'text-green-600' : 'text-orange-600'
                            )}>
                                {results.percentage}%
                            </p>
                            <p className="text-[10px] md:text-xs font-bold text-gray-400 uppercase tracking-wider">Score</p>
                        </div>
                        <div className="p-3 md:p-4 rounded-lg bg-gray-50 border-2 border-dashed border-gray-200">
                            <p className="text-2xl md:text-3xl font-black text-gray-900 mb-1">
                                {results.correct}/{quiz.questions.length}
                            </p>
                            <p className="text-[10px] md:text-xs font-bold text-gray-400 uppercase tracking-wider">Correct</p>
                        </div>
                        <div className="p-3 md:p-4 rounded-lg bg-gray-50 border-2 border-dashed border-gray-200">
                            <p className="text-2xl md:text-3xl font-black text-gray-900 mb-1">
                                {results.totalPoints}
                            </p>
                            <p className="text-[10px] md:text-xs font-bold text-gray-400 uppercase tracking-wider">Points</p>
                        </div>
                    </div>

                    <div className="flex flex-col sm:flex-row justify-center gap-3 md:gap-4">
                        <button
                            onClick={() => setShowExplanations(!showExplanations)}
                            className="w-full sm:w-auto px-6 py-3 bg-white border-2 border-dashed border-gray-200 text-gray-600 font-bold uppercase tracking-wider rounded-lg hover:border-gray-300 hover:text-gray-900 transition-colors text-xs md:text-sm"
                        >
                            {showExplanations ? 'Hide' : 'Review'} Answers
                        </button>
                        <button
                            onClick={() => {
                                setAnswers({});
                                setFlaggedQuestions(new Set());
                                setCurrentQuestion(0);
                                setState('intro');
                            }}
                            className="w-full sm:w-auto px-6 py-3 bg-accent-500 hover:bg-accent-600 text-white font-bold uppercase tracking-wider rounded-lg transition-colors shadow-sm text-xs md:text-sm"
                        >
                            Retake Quiz
                        </button>
                        <Link
                            href="/dashboard/quiz"
                            className="w-full sm:w-auto px-6 py-3 bg-gray-100 text-gray-600 hover:bg-gray-200 font-bold uppercase tracking-wider rounded-lg transition-colors text-center text-xs md:text-sm"
                        >
                            All Quizzes
                        </Link>
                    </div>
                </div>

                {/* Answer Review */}
                {showExplanations && (
                    <div className="space-y-4">
                        {quiz.questions.map((q, index) => {
                            const userAnswer = answers[q.id];
                            const isCorrect = userAnswer === q.correctAnswer;

                            return (
                                <div
                                    key={q.id}
                                    className={cn(
                                        'bg-white rounded-lg p-4 md:p-6 border-2 border-dashed',
                                        isCorrect
                                            ? 'border-green-200 bg-green-50/10'
                                            : 'border-red-200 bg-red-50/10'
                                    )}
                                >
                                    <div className="flex items-start gap-4">
                                        <div className={cn(
                                            'w-6 h-6 md:w-8 md:h-8 rounded-lg border-2 border-dashed flex items-center justify-center flex-shrink-0 font-bold',
                                            isCorrect
                                                ? 'border-green-200 text-green-600 bg-green-50'
                                                : 'border-red-200 text-red-600 bg-red-50'
                                        )}>
                                            {isCorrect ? (
                                                <CheckCircle className="w-3 h-3 md:w-4 md:h-4" />
                                            ) : (
                                                <XCircle className="w-3 h-3 md:w-4 md:h-4" />
                                            )}
                                        </div>
                                        <div className="flex-1">
                                            <p className="font-bold text-gray-900 mb-3 md:mb-4 text-sm md:text-lg">
                                                {index + 1}. {q.question}
                                            </p>
                                            <div className="space-y-2 md:space-y-3 mb-4 md:mb-6">
                                                {q.options?.map((option, optIndex) => (
                                                    <div
                                                        key={optIndex}
                                                        className={cn(
                                                            'px-3 py-2 md:px-4 md:py-3 rounded-lg text-xs md:text-sm font-medium border-2',
                                                            optIndex === q.correctAnswer
                                                                ? 'bg-green-50 border-green-200 text-green-700'
                                                                : userAnswer === optIndex && !isCorrect
                                                                    ? 'bg-red-50 border-red-200 text-red-700'
                                                                    : 'bg-white border-transparent text-gray-500'
                                                        )}
                                                    >
                                                        <span className="font-bold mr-2">{String.fromCharCode(65 + optIndex)}.</span>
                                                        {option}
                                                    </div>
                                                ))}
                                            </div>
                                            <div className="p-3 md:p-4 bg-blue-50 border-2 border-dashed border-blue-100 rounded-lg">
                                                <p className="text-xs md:text-sm text-blue-800">
                                                    <strong className="font-bold uppercase tracking-wider text-[10px] md:text-xs block mb-1">Explanation</strong>
                                                    {q.explanation}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>
        );
    }

    // Quiz Taking Screen
    return (
        <div className="max-w-5xl mx-auto space-y-4 md:space-y-6 animate-fade-in">
            {/* Header */}
            <div className="bg-white rounded-lg p-4 md:p-6 border-2 border-dashed border-gray-200 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex items-center gap-4 justify-between md:justify-start">
                    <div className="flex items-center gap-4">
                        <span className="flex items-center justify-center w-8 h-8 md:w-10 md:h-10 rounded-lg bg-gray-50 border-2 border-dashed border-gray-200 text-xs md:text-sm font-black text-gray-500">
                            {currentQuestion + 1}
                        </span>
                        <div className="h-10 w-[1px] bg-gray-200 hidden md:block" />
                        <span className="text-xs md:text-sm font-bold text-gray-400 uppercase tracking-wider">
                            Question {currentQuestion + 1} of {quiz.questions.length}
                        </span>
                    </div>
                </div>

                <div className="flex items-center gap-4 flex-1 md:max-w-md mx-0 md:mx-4">
                    <div className="h-2 flex-1 bg-gray-100 rounded-full overflow-hidden">
                        <div
                            className="h-full bg-accent-500 transition-all duration-300 rounded-full"
                            style={{ width: `${progress}%` }}
                        />
                    </div>
                </div>

                {quiz.timeLimit && (
                    <div className={cn(
                        'flex items-center justify-center gap-2 px-3 py-1.5 md:px-4 md:py-2 rounded-lg font-bold text-xs md:text-sm border-2 border-dashed',
                        timeLeft <= 60
                            ? 'bg-red-50 border-red-200 text-red-600'
                            : 'bg-gray-50 border-gray-200 text-gray-600'
                    )}>
                        <Clock className="w-3.5 h-3.5 md:w-4 md:h-4" />
                        {formatTime(timeLeft)}
                    </div>
                )}
            </div>

            {/* Mobile Navigation & Controls */}
            <div className="md:hidden grid grid-cols-4 gap-2">
                <button
                    onClick={() => setCurrentQuestion((prev) => Math.max(0, prev - 1))}
                    disabled={currentQuestion === 0}
                    className="flex flex-col items-center justify-center p-3 bg-white rounded-lg border-2 border-dashed border-gray-200 text-gray-500 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 active:scale-95 transition-all"
                >
                    <ChevronLeft className="w-5 h-5 mb-1" />
                    <span className="text-[10px] font-bold uppercase tracking-wider">Prev</span>
                </button>

                <button
                    onClick={handleFlag}
                    className={cn(
                        'flex flex-col items-center justify-center p-3 rounded-lg border-2 border-dashed transition-all active:scale-95',
                        flaggedQuestions.has(question.id)
                            ? 'bg-orange-50 border-orange-200 text-orange-600'
                            : 'bg-white border-gray-200 text-gray-500 hover:bg-gray-50'
                    )}
                >
                    <Flag className={cn("w-5 h-5 mb-1", flaggedQuestions.has(question.id) && "fill-current")} />
                    <span className="text-[10px] font-bold uppercase tracking-wider">Flag</span>
                </button>

                <button
                    onClick={() => setShowQuestionMap(true)}
                    className="flex flex-col items-center justify-center p-3 bg-white rounded-lg border-2 border-dashed border-gray-200 text-gray-500 hover:bg-gray-50 active:scale-95 transition-all"
                >
                    <Grid className="w-5 h-5 mb-1" />
                    <span className="text-[10px] font-bold uppercase tracking-wider">Map</span>
                </button>

                {currentQuestion === quiz.questions.length - 1 ? (
                    <button
                        onClick={handleSubmit}
                        className="flex flex-col items-center justify-center p-3 bg-accent-500 rounded-lg border-2 border-accent-600 text-white shadow-sm active:scale-95 transition-all"
                    >
                        <CheckCircle className="w-5 h-5 mb-1" />
                        <span className="text-[10px] font-bold uppercase tracking-wider">Submit</span>
                    </button>
                ) : (
                    <button
                        onClick={() => setCurrentQuestion((prev) => Math.min(quiz.questions.length - 1, prev + 1))}
                        className="flex flex-col items-center justify-center p-3 bg-gray-900 rounded-lg border-2 border-black text-white active:scale-95 transition-all"
                    >
                        <ChevronRight className="w-5 h-5 mb-1" />
                        <span className="text-[10px] font-bold uppercase tracking-wider">Next</span>
                    </button>
                )}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 md:gap-8">
                {/* Question */}
                <div className="lg:col-span-3 bg-white rounded-lg p-5 md:p-8 border-2 border-dashed border-gray-200 min-h-[400px] flex flex-col order-1">
                    <h2 className="text-xl md:text-2xl font-black text-gray-900 mb-6 md:mb-8 leading-tight tracking-tight">
                        {question.question}
                    </h2>

                    {/* Options */}
                    <div className="space-y-3 md:space-y-4 mb-8 md:mb-10 flex-1">
                        {question.options?.map((option, index) => (
                            <button
                                key={index}
                                onClick={() => handleAnswer(index)}
                                className={cn(
                                    'w-full p-4 md:p-5 rounded-lg text-left transition-all duration-200 border-2 group hover:-translate-y-0.5',
                                    answers[question.id] === index
                                        ? 'bg-accent-50 border-accent-500 text-accent-700 shadow-sm'
                                        : 'bg-white border-dashed border-gray-200 hover:border-accent-300 hover:text-gray-900 text-gray-600'
                                )}
                            >
                                <span className={cn(
                                    "font-black mr-3 md:mr-4 inline-block w-5 md:w-6 text-center text-sm md:text-base",
                                    answers[question.id] === index ? "text-accent-600" : "text-gray-300 group-hover:text-accent-400"
                                )}>{String.fromCharCode(65 + index)}</span>
                                <span className="font-medium text-sm md:text-base">{option}</span>
                            </button>
                        ))}
                    </div>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center justify-between pt-6 border-t-2 border-dashed border-gray-100">
                        <button
                            onClick={() => setCurrentQuestion((prev) => Math.max(0, prev - 1))}
                            disabled={currentQuestion === 0}
                            className="w-full sm:w-auto flex items-center justify-center gap-2 px-4 py-2 text-xs md:text-sm font-bold text-gray-400 hover:text-gray-600 disabled:opacity-30 disabled:cursor-not-allowed transition-colors uppercase tracking-wider"
                        >
                            <ChevronLeft className="w-3.5 h-3.5 md:w-4 md:h-4" />
                            Previous
                        </button>

                        <div className="flex flex-col sm:flex-row items-center gap-3 md:gap-4 w-full sm:w-auto">
                            <button
                                onClick={handleFlag}
                                className={cn(
                                    'w-full sm:w-auto flex items-center justify-center gap-2 px-4 py-2 rounded-lg transition-colors text-xs font-bold uppercase tracking-wider border-2 border-dashed',
                                    flaggedQuestions.has(question.id)
                                        ? 'bg-orange-50 border-orange-200 text-orange-600'
                                        : 'bg-white border-gray-200 text-gray-400 hover:border-gray-300'
                                )}
                            >
                                <Flag className="w-3 h-3" />
                                {flaggedQuestions.has(question.id) ? 'Flagged' : 'Flag'}
                            </button>

                            {currentQuestion === quiz.questions.length - 1 ? (
                                <button
                                    onClick={handleSubmit}
                                    className="w-full sm:w-auto px-8 py-3 bg-accent-500 hover:bg-accent-600 text-white font-bold rounded-lg transition-colors shadow-sm uppercase tracking-wider text-xs md:text-sm"
                                >
                                    Submit Quiz
                                </button>
                            ) : (
                                <button
                                    onClick={() => setCurrentQuestion((prev) => Math.min(quiz.questions.length - 1, prev + 1))}
                                    className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 bg-gray-900 hover:bg-black text-white font-bold rounded-lg transition-colors uppercase tracking-wider text-xs md:text-sm"
                                >
                                    Next
                                    <ChevronRight className="w-3.5 h-3.5 md:w-4 md:h-4" />
                                </button>
                            )}
                        </div>
                    </div>
                </div>

                {/* Question Navigator (Desktop Sidebar) */}
                <div className="hidden lg:block lg:col-span-1 bg-white rounded-lg p-5 md:p-6 border-2 border-dashed border-gray-200 h-fit order-2 lg:order-2">
                    <h3 className="font-bold text-gray-900 mb-4 text-xs md:text-sm uppercase tracking-wider">Question Map</h3>
                    <div className="grid grid-cols-5 gap-2 md:gap-2.5">
                        {quiz.questions.map((q, index) => (
                            <button
                                key={q.id}
                                onClick={() => setCurrentQuestion(index)}
                                className={cn(
                                    'w-full aspect-square rounded-lg text-[10px] md:text-xs font-bold transition-all relative border-2',
                                    currentQuestion === index
                                        ? 'bg-accent-500 border-accent-600 text-white shadow-md scale-110 z-10'
                                        : answers[q.id] !== undefined
                                            ? 'bg-gray-100 border-gray-200 text-gray-600'
                                            : 'bg-white border-dashed border-gray-200 text-gray-400 hover:border-accent-200'
                                )}
                            >
                                {index + 1}
                                {flaggedQuestions.has(q.id) && (
                                    <div className="absolute -top-1 -right-1 w-2 h-2 md:w-2.5 md:h-2.5 bg-orange-500 rounded-full ring-2 ring-white" />
                                )}
                            </button>
                        ))}
                    </div>

                    <div className="mt-5 md:mt-6 pt-5 md:pt-6 border-t-2 border-dashed border-gray-100 space-y-2 md:space-y-3">
                        <div className="flex items-center gap-3">
                            <div className="w-5 h-5 md:w-6 md:h-6 rounded border-2 border-gray-200 bg-gray-100 flex items-center justify-center text-[10px] font-bold text-gray-500">1</div>
                            <span className="text-[10px] md:text-xs font-medium text-gray-500">Answered</span>
                        </div>
                        <div className="flex items-center gap-3">
                            <div className="w-5 h-5 md:w-6 md:h-6 rounded border-2 border-accent-600 bg-accent-500 flex items-center justify-center text-[10px] font-bold text-white">1</div>
                            <span className="text-[10px] md:text-xs font-medium text-gray-500">Current</span>
                        </div>
                        <div className="flex items-center gap-3">
                            <div className="w-5 h-5 md:w-6 md:h-6 rounded border-2 border-dashed border-gray-200 bg-white flex items-center justify-center text-[10px] font-bold text-gray-400 relative">
                                1
                                <div className="absolute -top-1 -right-1 w-1.5 h-1.5 md:w-2 md:h-2 bg-orange-500 rounded-full" />
                            </div>
                            <span className="text-[10px] md:text-xs font-medium text-gray-500">Flagged</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Mobile Question Map Modal */}
            {showQuestionMap && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fade-in">
                    <div className="bg-white rounded-xl w-full max-w-sm max-h-[80vh] overflow-hidden flex flex-col shadow-2xl animate-scale-in">
                        <div className="p-4 border-b border-gray-100 flex items-center justify-between bg-gray-50">
                            <h3 className="font-black text-gray-900 text-lg tracking-tight">Question Map</h3>
                            <button
                                onClick={() => setShowQuestionMap(false)}
                                className="p-2 rounded-lg hover:bg-gray-200 text-gray-500 transition-colors"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        <div className="p-4 overflow-y-auto">
                            <div className="grid grid-cols-5 gap-3">
                                {quiz.questions.map((q, index) => (
                                    <button
                                        key={q.id}
                                        onClick={() => {
                                            setCurrentQuestion(index);
                                            setShowQuestionMap(false);
                                        }}
                                        className={cn(
                                            'w-full aspect-square rounded-lg text-sm font-bold transition-all relative border-2',
                                            currentQuestion === index
                                                ? 'bg-accent-500 border-accent-600 text-white shadow-md scale-110 z-10'
                                                : answers[q.id] !== undefined
                                                    ? 'bg-gray-100 border-gray-200 text-gray-600'
                                                    : 'bg-white border-dashed border-gray-200 text-gray-400 hover:border-accent-200'
                                        )}
                                    >
                                        {index + 1}
                                        {flaggedQuestions.has(q.id) && (
                                            <div className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-orange-500 rounded-full ring-2 ring-white" />
                                        )}
                                    </button>
                                ))}
                            </div>

                            <div className="mt-6 pt-6 border-t-2 border-dashed border-gray-100 space-y-3">
                                <div className="flex items-center gap-3">
                                    <div className="w-6 h-6 rounded border-2 border-gray-200 bg-gray-100 flex items-center justify-center text-xs font-bold text-gray-500">1</div>
                                    <span className="text-sm font-medium text-gray-500">Answered</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className="w-6 h-6 rounded border-2 border-accent-600 bg-accent-500 flex items-center justify-center text-xs font-bold text-white">1</div>
                                    <span className="text-sm font-medium text-gray-500">Current</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className="w-6 h-6 rounded border-2 border-dashed border-gray-200 bg-white flex items-center justify-center text-xs font-bold text-gray-400 relative">
                                        1
                                        <div className="absolute -top-1 -right-1 w-2 h-2 bg-orange-500 rounded-full" />
                                    </div>
                                    <span className="text-sm font-medium text-gray-500">Flagged</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
