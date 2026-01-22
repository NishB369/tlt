'use client';

import { motion } from 'framer-motion';
import { Bookmark } from 'lucide-react';
import { useBookmarks } from '@/src/hooks/useBookmarks';
import { cn } from '@/src/lib/utils';
import { useState } from 'react';

interface BookmarkButtonProps {
    itemId: string;
    itemType: 'Video' | 'Note' | 'Quiz' | 'Summary';
    className?: string;
    iconClassName?: string;
    size?: 'sm' | 'md' | 'lg';
}

export const BookmarkButton = ({ itemId, itemType, className, iconClassName, size = 'md' }: BookmarkButtonProps) => {
    const { isBookmarked, toggleBookmark } = useBookmarks();
    const [isAnimating, setIsAnimating] = useState(false);

    const active = isBookmarked(itemId);

    const handleClick = async (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();

        setIsAnimating(true);
        await toggleBookmark(itemId, itemType);
        setTimeout(() => setIsAnimating(false), 300);
    };

    const sizeClasses = {
        sm: 'p-1.5',
        md: 'p-2',
        lg: 'p-3',
    };

    const iconSizes = {
        sm: 'w-4 h-4',
        md: 'w-5 h-5',
        lg: 'w-6 h-6',
    };

    return (
        <motion.button
            onClick={handleClick}
            whileTap={{ scale: 0.8 }}
            animate={isAnimating ? { scale: [1, 1.2, 1.4, 1.2, 1] } : {}}
            transition={{ duration: 0.1 }}
            className={cn(
                "rounded-lg border-2 border-dashed transition-all group relative z-10 cursor-pointer",
                active
                    ? "bg-accent-50 border-accent-200 text-accent-600"
                    : "bg-white border-gray-200 text-gray-400 hover:border-accent-200 hover:text-accent-600 hover:bg-accent-50",
                sizeClasses[size],
                className
            )}
            title={active ? "Remove bookmark" : "Add bookmark"}
        >
            <Bookmark
                className={cn(
                    "transition-colors",
                    iconSizes[size],
                    active ? "fill-current" : "",
                    iconClassName
                )}
            />
        </motion.button>
    );
};
