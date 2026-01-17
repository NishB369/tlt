'use client';

import { useState, useEffect, useCallback } from 'react';
import { Play, Pause, RotateCcw, X, Timer } from 'lucide-react';
import { cn } from '@/src/lib/utils';

interface PomodoroTimerProps {
    onSessionComplete?: (duration: number) => void;
}

export function PomodoroTimer({ onSessionComplete }: PomodoroTimerProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [isRunning, setIsRunning] = useState(false);
    const [mode, setMode] = useState<'work' | 'break'>('work');
    const [timeLeft, setTimeLeft] = useState(25 * 60); // 25 minutes in seconds
    const [sessionsCompleted, setSessions] = useState(0);

    const workTime = 25 * 60;
    const breakTime = 5 * 60;

    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

    const progress = mode === 'work'
        ? ((workTime - timeLeft) / workTime) * 100
        : ((breakTime - timeLeft) / breakTime) * 100;

    const handleComplete = useCallback(() => {
        // Play notification sound (browser API)
        if (typeof window !== 'undefined' && 'Notification' in window) {
            if (Notification.permission === 'granted') {
                new Notification(mode === 'work' ? 'Work session complete!' : 'Break is over!');
            }
        }

        if (mode === 'work') {
            setSessions((prev) => prev + 1);
            onSessionComplete?.(workTime / 60);
            setMode('break');
            setTimeLeft(breakTime);
        } else {
            setMode('work');
            setTimeLeft(workTime);
        }
        setIsRunning(false);
    }, [mode, onSessionComplete, workTime, breakTime]);

    useEffect(() => {
        if (!isRunning) return;

        const timer = setInterval(() => {
            setTimeLeft((prev) => {
                if (prev <= 1) {
                    clearInterval(timer);
                    handleComplete();
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(timer);
    }, [isRunning, handleComplete]);

    const handleReset = () => {
        setIsRunning(false);
        setMode('work');
        setTimeLeft(workTime);
    };

    return (
        <>
            {/* Floating Button */}
            <button
                onClick={() => setIsOpen(true)}
                className={cn(
                    'fixed bottom-6 right-6 w-14 h-14 rounded-lg shadow-xl flex items-center justify-center transition-all z-40 hover:scale-110 active:scale-90 border-2 border-dashed bg-orange-500 text-white border-orange-600',
                    isRunning
                        ? 'animate-pulse'
                        : ''
                )}
            >
                <Timer className="w-6 h-6" />
            </button>

            {/* Modal */}
            {isOpen && (
                <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-lg p-8 w-full max-w-sm shadow-2xl animate-scale-in border-2 border-dashed border-gray-200">
                        {/* Header */}
                        <div className="flex items-center justify-between mb-8">
                            <h3 className="text-xs font-black text-gray-400 uppercase tracking-widest">
                                Pomodoro
                            </h3>
                            <button
                                onClick={() => setIsOpen(false)}
                                className="p-2 rounded-lg hover:bg-gray-100 transition-colors border border-dashed border-transparent hover:border-gray-200"
                            >
                                <X className="w-5 h-5 text-gray-500" />
                            </button>
                        </div>

                        {/* Timer Display */}
                        <div className="relative w-48 h-48 mx-auto mb-8">
                            {/* Background Circle */}
                            <svg className="w-full h-full -rotate-90">
                                <circle
                                    cx="96"
                                    cy="96"
                                    r="88"
                                    fill="none"
                                    strokeWidth="8"
                                    strokeDasharray="4 4"
                                    className="stroke-gray-100"
                                />
                                <circle
                                    cx="96"
                                    cy="96"
                                    r="88"
                                    fill="none"
                                    strokeWidth="8"
                                    strokeLinecap="butt"
                                    className={mode === 'work' ? 'stroke-orange-500' : 'stroke-gray-900'}
                                    strokeDasharray={`${2 * Math.PI * 88}`}
                                    strokeDashoffset={`${2 * Math.PI * 88 * (1 - progress / 100)}`}
                                    style={{ transition: 'stroke-dashoffset 0.5s ease' }}
                                />
                            </svg>
                            {/* Center Text */}
                            <div className="absolute inset-0 flex flex-col items-center justify-center">
                                <span className="text-4xl font-black text-gray-900 tracking-widest">
                                    {formatTime(timeLeft)}
                                </span>
                                <span className={cn(
                                    'text-[10px] font-black uppercase tracking-widest mt-2 px-2 py-0.5 rounded border border-dashed',
                                    mode === 'work' ? 'text-orange-600 bg-orange-50 border-orange-200' : 'text-gray-900 bg-gray-100 border-gray-300'
                                )}>
                                    {mode === 'work' ? 'Focus' : 'Break'}
                                </span>
                            </div>
                        </div>

                        {/* Controls */}
                        <div className="flex items-center justify-center gap-4 mb-8">
                            <button
                                onClick={handleReset}
                                className="p-3 rounded-lg border-2 border-dashed border-gray-200 text-gray-500 hover:text-gray-700 hover:border-gray-300 transition-all active:scale-95"
                            >
                                <RotateCcw className="w-5 h-5" />
                            </button>
                            <button
                                onClick={() => setIsRunning(!isRunning)}
                                className={cn(
                                    'w-16 h-16 rounded-lg flex items-center justify-center transition-all shadow-[6px_6px_0px_0px_rgba(0,0,0,0.1)] active:translate-x-1 active:translate-y-1 active:shadow-none',
                                    isRunning
                                        ? 'bg-gray-900 text-white'
                                        : 'bg-orange-500 text-white'
                                )}
                            >
                                {isRunning ? (
                                    <Pause className="w-7 h-7 fill-current" />
                                ) : (
                                    <Play className="w-7 h-7 ml-1 fill-current" />
                                )}
                            </button>
                            <div className="w-14" /> {/* Spacer for balance */}
                        </div>

                        {/* Sessions Counter */}
                        <div className="text-center pt-4 border-t-2 border-dashed border-gray-50">
                            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">
                                Sessions: <span className="text-gray-900 ml-1">{sessionsCompleted}</span>
                            </p>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
