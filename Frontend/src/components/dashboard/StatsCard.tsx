'use client';

import { cn } from '@/src/lib/utils';
import { LucideIcon } from 'lucide-react';

interface StatsCardProps {
    title: string;
    value: string | number;
    icon: LucideIcon;
    change?: string;
    changeType?: 'positive' | 'negative' | 'neutral';
    color: 'blue' | 'green' | 'orange' | 'purple' | 'red';
}

const colorClasses = {
    blue: {
        bg: 'bg-primary-50',
        icon: 'text-primary-700',
        border: 'border-primary-200'
    },
    green: {
        bg: 'bg-accent-50',
        icon: 'text-accent-600',
        border: 'border-accent-200'
    },
    orange: {
        bg: 'bg-accent-50',
        icon: 'text-accent-600',
        border: 'border-accent-200'
    },
    purple: {
        bg: 'bg-primary-50',
        icon: 'text-primary-700',
        border: 'border-primary-200'
    },
    red: {
        bg: 'bg-accent-50',
        icon: 'text-accent-600',
        border: 'border-accent-200'
    },
};

export function StatsCard({ title, value, icon: Icon, change, changeType = 'neutral', color }: StatsCardProps) {
    const colors = colorClasses[color];

    return (
        <div className={cn(
            "bg-white border-2 border-dashed rounded-lg p-5 transition-all duration-300 group hover:bg-gray-50/50",
            colors.border
        )}>
            <div className="flex items-start justify-between mb-4">
                <div className={cn('p-2.5 md:p-3 rounded-lg border border-dashed transition-transform group-hover:scale-110 duration-300', colors.bg, colors.border)}>
                    <Icon className={cn('w-4 md:w-5 h-4 md:h-5', colors.icon)} />
                </div>
                {change && (
                    <div className={cn(
                        "flex items-center gap-1 text-[9px] md:text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded border border-dashed",
                        changeType === 'positive' ? "text-accent-600 bg-accent-50 border-accent-200" :
                            changeType === 'negative' ? "text-red-600 bg-red-50 border-red-200" : "text-gray-500 bg-gray-50 border-gray-200"
                    )}>
                        {change}
                    </div>
                )}
            </div>
            <div>
                <p className="text-[10px] md:text-[11px] font-bold text-gray-500 uppercase tracking-widest mb-1">{title}</p>
                <div className="flex items-baseline gap-1">
                    <p className="text-xl md:text-2xl font-black text-gray-900 tracking-tighter">{value}</p>
                </div>
            </div>
        </div>
    );
}
