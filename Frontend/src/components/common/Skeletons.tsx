import { cn } from '@/src/lib/utils';

// Base Skeleton Component with a shimmer effect
function Skeleton({
    className,
    ...props
}: React.HTMLAttributes<HTMLDivElement>) {
    return (
        <div
            className={cn("animate-pulse rounded-md bg-gray-200/80", className)}
            {...props}
        />
    );
}

// ----------------------------------------------------------------------
// Video Card Skeleton
// ----------------------------------------------------------------------
export function VideoCardSkeleton() {
    return (
        <div className="group relative flex flex-col bg-white rounded-xl border-2 border-dashed border-gray-200 overflow-hidden">
            {/* Thumbnail */}
            <div className="aspect-video bg-gray-100 relative overflow-hidden">
                <Skeleton className="w-full h-full" />
                {/* Duration Badge */}
                <Skeleton className="absolute bottom-2 right-2 w-12 h-4 rounded" />
            </div>

            {/* Content */}
            <div className="p-4 flex flex-col flex-1 gap-2">
                {/* Meta */}
                <div className="flex items-center gap-2 mb-1">
                    <Skeleton className="w-20 h-4 rounded" />
                    <Skeleton className="w-12 h-3 rounded" />
                </div>

                {/* Title */}
                <Skeleton className="w-full h-5 rounded mb-1" />
                <Skeleton className="w-2/3 h-5 rounded" />

                {/* Footer / Status */}
                <div className="mt-auto pt-3 flex items-center justify-between">
                    <Skeleton className="w-16 h-3 rounded" />
                    <Skeleton className="w-6 h-6 rounded-full" />
                </div>
            </div>
        </div>
    );
}

// ----------------------------------------------------------------------
// Note / Summary Card Skeleton
// ----------------------------------------------------------------------
export function NoteCardSkeleton() {
    return (
        <div className="flex flex-col bg-white rounded-lg p-5 border-2 border-dashed border-gray-200">
            <div className="flex items-start justify-between mb-4">
                <Skeleton className="w-10 h-10 rounded-lg" />
                <Skeleton className="w-8 h-8 rounded-full" />
            </div>

            <div className="flex items-center gap-2 mb-3">
                <Skeleton className="w-16 h-4 rounded" />
                <Skeleton className="w-10 h-3 rounded" />
            </div>

            <Skeleton className="w-full h-6 rounded mb-2" />
            <Skeleton className="w-3/4 h-6 rounded mb-4" />

            <div className="space-y-2 mb-6">
                <Skeleton className="w-full h-3 rounded" />
                <Skeleton className="w-full h-3 rounded" />
                <Skeleton className="w-2/3 h-3 rounded" />
            </div>

            <div className="mt-auto pt-4 border-t-2 border-dashed border-gray-100 flex items-center justify-between">
                <Skeleton className="w-24 h-3 rounded" />
                <Skeleton className="w-4 h-4 rounded" />
            </div>
        </div>
    );
}

// ----------------------------------------------------------------------
// Quiz Card Skeleton
// ----------------------------------------------------------------------
export function QuizCardSkeleton() {
    return (
        <div className="flex flex-col bg-white rounded-lg overflow-hidden border-2 border-dashed border-gray-200">
            <div className="p-5 flex-1 flex flex-col">
                <div className="flex items-center gap-3 mb-4">
                    <Skeleton className="w-16 h-4 rounded" />
                    <Skeleton className="w-12 h-3 rounded" />
                    <div className="ml-auto">
                        <Skeleton className="w-8 h-8 rounded-full" />
                    </div>
                </div>

                <Skeleton className="w-3/4 h-6 rounded mb-3" />

                <div className="space-y-2 mb-6">
                    <Skeleton className="w-full h-3 rounded" />
                    <Skeleton className="w-5/6 h-3 rounded" />
                </div>

                <div className="mt-auto flex gap-4">
                    <Skeleton className="w-12 h-3 rounded" />
                    <Skeleton className="w-12 h-3 rounded" />
                    <Skeleton className="w-12 h-3 rounded" />
                </div>
            </div>

            <div className="px-5 py-3 bg-gray-50 border-t-2 border-dashed border-gray-100 flex items-center justify-between">
                <Skeleton className="w-20 h-3 rounded" />
                <Skeleton className="w-16 h-6 rounded-lg" />
            </div>
        </div>
    );
}

// ----------------------------------------------------------------------
// Grid Wrappers for ease of use
// ----------------------------------------------------------------------

export function VideoListSkeleton() {
    return (
        <div className="space-y-8 max-w-7xl mx-auto">
            {/* Header Skeleton */}
            <div className="space-y-2">
                <Skeleton className="w-48 h-8 rounded" />
                <Skeleton className="w-64 h-4 rounded" />
            </div>
            {/* Filter Skeleton */}
            <div className="flex gap-4">
                <Skeleton className="flex-1 h-12 rounded-lg" />
                <Skeleton className="w-48 h-12 rounded-lg" />
            </div>
            {/* Content Skeleton */}
            <div className="bg-white rounded-xl border-2 border-dashed border-gray-200 overflow-hidden">
                <div className="p-4 border-b border-dashed border-gray-200 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <Skeleton className="w-10 h-10 rounded-lg" />
                        <div>
                            <Skeleton className="w-32 h-5 rounded mb-1" />
                            <Skeleton className="w-16 h-3 rounded" />
                        </div>
                    </div>
                    <Skeleton className="w-8 h-8 rounded-full" />
                </div>
                <div className="p-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {[1, 2, 3, 4].map((i) => (
                            <VideoCardSkeleton key={i} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export function NoteListSkeleton() {
    return (
        <div className="space-y-8 max-w-7xl mx-auto">
            {/* Header Skeleton */}
            <div className="space-y-2">
                <Skeleton className="w-48 h-8 rounded" />
                <Skeleton className="w-64 h-4 rounded" />
            </div>
            {/* Filter Skeleton */}
            <div className="flex gap-4">
                <Skeleton className="flex-1 h-12 rounded-lg" />
                <Skeleton className="w-48 h-12 rounded-lg" />
            </div>
            {/* Content Skeleton */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                    <NoteCardSkeleton key={i} />
                ))}
            </div>
        </div>
    )
}

export function QuizListSkeleton() {
    return (
        <div className="space-y-8 max-w-7xl mx-auto">
            {/* Header Skeleton */}
            <div className="space-y-2">
                <Skeleton className="w-48 h-8 rounded" />
                <Skeleton className="w-64 h-4 rounded" />
            </div>
            {/* Filter Skeleton */}
            <div className="flex gap-4">
                <Skeleton className="flex-1 h-12 rounded-lg" />
                <Skeleton className="w-48 h-12 rounded-lg" />
            </div>
            {/* Content Skeleton */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                    <QuizCardSkeleton key={i} />
                ))}
            </div>
        </div>
    )
}
