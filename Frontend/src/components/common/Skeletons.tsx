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
// Video Detail Skeleton
// ----------------------------------------------------------------------
export function VideoDetailSkeleton() {
    return (
        <div className="space-y-6 max-w-7xl mx-auto">
            {/* Back Button Skeleton */}
            <Skeleton className="w-32 h-5 rounded" />

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
                {/* Main Content */}
                <div className="lg:col-span-2 space-y-6 lg:space-y-8">
                    {/* Video Player */}
                    <div className="bg-black rounded-lg overflow-hidden aspect-video relative">
                        <Skeleton className="w-full h-full bg-gray-800 animate-pulse" />
                    </div>

                    {/* Video Info */}
                    <div className="bg-white rounded-lg p-4 md:p-8 shadow-sm border-2 border-dashed border-gray-200">
                        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-4 md:mb-6">
                            <div className="space-y-3 md:space-y-4 w-full">
                                <div className="flex items-center gap-2 md:gap-3">
                                    <Skeleton className="w-24 h-6 rounded" />
                                    <Skeleton className="w-16 h-6 rounded" />
                                </div>
                                <Skeleton className="w-3/4 h-8 rounded" />
                            </div>
                            <Skeleton className="w-10 h-10 rounded-lg" />
                        </div>
                        <div className="space-y-2 mb-6">
                            <Skeleton className="w-full h-4 rounded" />
                            <Skeleton className="w-full h-4 rounded" />
                            <Skeleton className="w-2/3 h-4 rounded" />
                        </div>

                        {/* Related Resources */}
                        <div className="flex gap-4 pt-6 border-t-2 border-dashed border-gray-100">
                            <Skeleton className="w-32 h-10 rounded-lg" />
                            <Skeleton className="w-32 h-10 rounded-lg" />
                        </div>
                    </div>
                </div>

                {/* Sidebar */}
                <div className="space-y-6">
                    <div className="bg-white rounded-lg shadow-sm border-2 border-dashed border-gray-200 overflow-hidden h-96 p-4 space-y-4">
                        <Skeleton className="w-full h-8 rounded mb-4" />
                        {[1, 2, 3, 4].map(i => (
                            <div key={i} className="flex gap-3">
                                <Skeleton className="w-8 h-8 rounded-lg" />
                                <div className="flex-1 space-y-1">
                                    <Skeleton className="w-full h-4 rounded" />
                                    <Skeleton className="w-1/2 h-3 rounded" />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

// ----------------------------------------------------------------------
// Note / Summary Detail Skeleton
// ----------------------------------------------------------------------
export function NoteDetailSkeleton() {
    return (
        <div className="space-y-6 max-w-7xl mx-auto">
            {/* Back Button Skeleton */}
            <Skeleton className="w-32 h-5 rounded" />

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 lg:gap-8">
                {/* Sidebar */}
                <div className="lg:col-span-1 space-y-6">
                    <div className="bg-white rounded-lg p-6 border-2 border-dashed border-gray-200 h-64">
                        <Skeleton className="w-full h-6 rounded mb-4" />
                        <div className="space-y-3">
                            <Skeleton className="w-full h-4 rounded" />
                            <Skeleton className="w-3/4 h-4 rounded" />
                            <Skeleton className="w-5/6 h-4 rounded" />
                        </div>
                    </div>
                </div>

                {/* Main Content */}
                <div className="lg:col-span-3">
                    <div className="bg-white rounded-lg shadow-sm border-2 border-dashed border-gray-200 p-8 h-[80vh]">
                        <div className="flex justify-between items-start mb-8 border-b-2 border-dashed border-gray-100 pb-8">
                            <div className="space-y-4 w-full">
                                <div className="flex gap-3">
                                    <Skeleton className="w-24 h-6 rounded" />
                                    <Skeleton className="w-16 h-6 rounded" />
                                </div>
                                <Skeleton className="w-3/4 h-10 rounded" />
                            </div>
                            <div className="flex gap-3">
                                <Skeleton className="w-10 h-10 rounded-lg" />
                                <Skeleton className="w-10 h-10 rounded-lg" />
                            </div>
                        </div>

                        <div className="space-y-6">
                            <Skeleton className="w-full h-4 rounded" />
                            <Skeleton className="w-full h-4 rounded" />
                            <Skeleton className="w-full h-4 rounded" />
                            <Skeleton className="w-5/6 h-4 rounded" />

                            <Skeleton className="w-1/3 h-8 rounded mt-8 mb-4" />

                            <Skeleton className="w-full h-4 rounded" />
                            <Skeleton className="w-full h-4 rounded" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

// ----------------------------------------------------------------------
// Quiz Detail Skeleton
// ----------------------------------------------------------------------
export function QuizDetailSkeleton() {
    return (
        <div className="max-w-7xl mx-auto space-y-6">
            <Skeleton className="w-32 h-5 rounded" />

            <div className="max-w-3xl mx-auto">
                <div className="bg-white rounded-lg p-10 border-2 border-dashed border-gray-200 text-center relative">
                    <Skeleton className="w-24 h-24 mx-auto mb-8 rounded-lg" />
                    <Skeleton className="w-3/4 h-10 mx-auto mb-4 rounded" />
                    <Skeleton className="w-1/2 h-6 mx-auto mb-10 rounded" />

                    <div className="grid grid-cols-4 gap-6 mb-12">
                        {[1, 2, 3, 4].map(i => (
                            <Skeleton key={i} className="h-24 rounded-lg" />
                        ))}
                    </div>

                    <Skeleton className="w-48 h-12 mx-auto rounded-lg" />
                </div>
            </div>
        </div>
    )
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
