import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Merge Tailwind CSS classes with clsx
 */
export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

/**
 * Format duration from seconds to MM:SS or HH:MM:SS
 */
export function formatDuration(seconds: number): string {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;

    if (hours > 0) {
        return `${hours}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }
    return `${minutes}:${secs.toString().padStart(2, '0')}`;
}

/**
 * Format study time from minutes to human readable
 */
export function formatStudyTime(minutes: number): string {
    if (minutes < 60) {
        return `${minutes}m`;
    }
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return mins > 0 ? `${hours}h ${mins}m` : `${hours}h`;
}

/**
 * Calculate study streak from session dates
 */
export function calculateStreak(studySessions: Date[]): number {
    if (!studySessions.length) return 0;

    const sortedDates = studySessions
        .map((d) => new Date(d).setHours(0, 0, 0, 0))
        .sort((a, b) => b - a);

    // Remove duplicates
    const uniqueDates = [...new Set(sortedDates)];

    let streak = 1;
    const today = new Date().setHours(0, 0, 0, 0);
    const yesterday = today - 86400000;

    // Check if studied today or yesterday
    if (uniqueDates[0] !== today && uniqueDates[0] !== yesterday) {
        return 0;
    }

    for (let i = 1; i < uniqueDates.length; i++) {
        const diff = uniqueDates[i - 1] - uniqueDates[i];
        if (diff === 86400000) {
            streak++;
        } else {
            break;
        }
    }

    return streak;
}

/**
 * Calculate level from XP
 */
export function calculateLevel(xp: number): number {
    const levels = [
        { level: 1, xpRequired: 0 },
        { level: 2, xpRequired: 100 },
        { level: 3, xpRequired: 250 },
        { level: 4, xpRequired: 500 },
        { level: 5, xpRequired: 1000 },
        { level: 6, xpRequired: 1750 },
        { level: 7, xpRequired: 2750 },
        { level: 8, xpRequired: 4000 },
        { level: 9, xpRequired: 5500 },
        { level: 10, xpRequired: 7500 },
        { level: 11, xpRequired: 10000 },
        { level: 12, xpRequired: 13000 },
        { level: 13, xpRequired: 17000 },
        { level: 14, xpRequired: 22000 },
        { level: 15, xpRequired: 28000 },
        { level: 16, xpRequired: 35000 },
        { level: 17, xpRequired: 43000 },
        { level: 18, xpRequired: 52000 },
        { level: 19, xpRequired: 62000 },
        { level: 20, xpRequired: 75000 },
    ];

    for (let i = levels.length - 1; i >= 0; i--) {
        if (xp >= levels[i].xpRequired) {
            return levels[i].level;
        }
    }
    return 1;
}

/**
 * Get XP progress to next level
 */
export function getLevelProgress(xp: number): { current: number; required: number; percentage: number } {
    const levels = [0, 100, 250, 500, 1000, 1750, 2750, 4000, 5500, 7500, 10000, 13000, 17000, 22000, 28000, 35000, 43000, 52000, 62000, 75000];

    for (let i = 0; i < levels.length - 1; i++) {
        if (xp < levels[i + 1]) {
            const current = xp - levels[i];
            const required = levels[i + 1] - levels[i];
            return {
                current,
                required,
                percentage: (current / required) * 100,
            };
        }
    }
    return { current: 0, required: 0, percentage: 100 };
}

/**
 * Format relative time
 */
export function formatRelativeTime(date: Date): string {
    const now = new Date();
    const diffMs = now.getTime() - new Date(date).getTime();
    const diffSecs = Math.floor(diffMs / 1000);
    const diffMins = Math.floor(diffSecs / 60);
    const diffHours = Math.floor(diffMins / 60);
    const diffDays = Math.floor(diffHours / 24);

    if (diffSecs < 60) return 'just now';
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays < 7) return `${diffDays}d ago`;

    return new Date(date).toLocaleDateString();
}

/**
 * Generate random ID
 */
export function generateId(): string {
    return Math.random().toString(36).substring(2, 15);
}

/**
 * Truncate text with ellipsis
 */
export function truncate(text: string, maxLength: number): string {
    if (text.length <= maxLength) return text;
    return text.slice(0, maxLength - 3) + '...';
}
