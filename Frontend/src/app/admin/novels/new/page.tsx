'use client';

import { NovelForm } from '@/src/components/admin/novels/NovelForm';

export default function NewNovelPage() {
    return (
        <div className="space-y-6">
            {/* Breadcrumbs or Back Link could go here if not handled in Layout/Form */}
            <NovelForm />
        </div>
    );
}
