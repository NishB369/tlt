'use client';

import { cn } from '@/src/lib/utils';

interface ProgressRingProps {
    percentage: number;
    size?: number;
    strokeWidth?: number;
    title?: string;
    subtitle?: string;
}

export function ProgressRing({
    percentage,
    size = 120,
    strokeWidth = 8,
    title,
    subtitle,
}: ProgressRingProps) {
    const radius = (size - strokeWidth) / 2;
    const circumference = radius * 2 * Math.PI;
    const offset = circumference - (percentage / 100) * circumference;

    return (
        <div className="flex flex-col items-center text-center gap-3 w-full">
            <div className="relative" style={{ width: size, height: size }}>
                {/* Background Circle */}
                <svg className="w-full h-full -rotate-90">
                    <circle
                        cx={size / 2}
                        cy={size / 2}
                        r={radius}
                        strokeWidth={strokeWidth}
                        fill="none"
                        className="stroke-gray-100"
                    />
                    {/* Progress Circle */}
                    <circle
                        cx={size / 2}
                        cy={size / 2}
                        r={radius}
                        strokeWidth={strokeWidth}
                        fill="none"
                        className="stroke-accent-500"
                        strokeLinecap="round"
                        strokeDasharray={circumference}
                        strokeDashoffset={offset}
                        style={{ transition: 'stroke-dashoffset 0.8s ease-out' }}
                    />
                </svg>
                {/* Center Text */}
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-3xl font-black text-gray-900 tracking-tighter">
                        {Math.round(percentage)}<span className="text-xs ml-0.5">%</span>
                    </span>
                </div>
            </div>
            {(title || subtitle) && (
                <div className="space-y-1">
                    {title && (
                        <p className="font-bold text-gray-900 leading-tight text-sm tracking-tight">{title}</p>
                    )}
                    {subtitle && (
                        <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{subtitle}</p>
                    )}
                </div>
            )}
        </div>
    );
}
