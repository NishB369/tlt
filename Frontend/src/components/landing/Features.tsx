'use client';

import { motion } from 'framer-motion';
import {
    Video,
    BookOpen,
    CheckCircle,
    BarChart3,
    Timer,
    Trophy,
    Bookmark,
    Brain
} from 'lucide-react';
import { cn } from '@/src/lib/utils';

const features = [
    {
        icon: Video,
        title: 'Expert Video Tutorials',
        description: 'Watch comprehensive video lessons covering every chapter and character, explained by literature experts.',
        color: 'orange',
    },
    {
        icon: BookOpen,
        title: 'Comprehensive Study Notes',
        description: 'Access detailed notes, chapter summaries, and character analyses to deepen your understanding.',
        color: 'gray',
    },
    {
        icon: CheckCircle,
        title: 'Interactive Quizzes',
        description: 'Test your knowledge with MCQs, instant feedback, and detailed explanations for every question.',
        color: 'orange',
    },
    {
        icon: BarChart3,
        title: 'Track Your Progress',
        description: 'Monitor your learning journey with detailed analytics, study streaks, and performance insights.',
        color: 'gray',
    },
    {
        icon: Timer,
        title: 'Pomodoro Study Timer',
        description: 'Stay focused with built-in productivity tools designed to optimize your study sessions.',
        color: 'orange',
    },
    {
        icon: Trophy,
        title: 'Earn Achievements',
        description: 'Stay motivated with XP points, levels, badges, and rewards as you progress through your studies.',
        color: 'gray',
    },
    {
        icon: Bookmark,
        title: 'Smart Bookmarks',
        description: 'Save and organize your favorite videos, notes, and quizzes for quick access anytime.',
        color: 'orange',
    },
    {
        icon: Brain,
        title: 'Quick Revision Summaries',
        description: 'Rapid revision guides with key points, quotes, and themes for last-minute exam prep.',
        color: 'gray',
    },
];

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
        },
    },
};

const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
};

export function Features() {
    return (
        <section id="features" className="py-24 bg-white relative overflow-hidden">
            {/* Background Texture */}
            <div className="absolute inset-0 bg-grid-subtle opacity-100" />
            <div className="absolute top-0 left-0 right-0 h-px bg-gray-100" />

            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Section Header */}
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                    >
                        <span className="inline-block px-3 py-1 rounded-full bg-gray-50 text-gray-500 text-xs font-bold uppercase tracking-wider mb-4 border border-gray-100">
                            Features
                        </span>
                        <h2 className="text-4xl sm:text-5xl font-bold text-black mb-4 tracking-tight">
                            Everything You Need to Succeed
                        </h2>
                        <p className="text-lg text-gray-600">
                            A complete learning platform designed specifically for literature students preparing for exams.
                        </p>
                    </motion.div>
                </div>

                {/* Features Grid */}
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
                >
                    {features.map((feature, index) => (
                        <motion.div
                            key={index}
                            variants={itemVariants}
                            className="group relative p-6 rounded-lg bg-white border border-dashed border-gray-200 hover:border-accent-500 transition-all duration-300"
                        >
                            {/* Icon */}
                            <div className={cn(
                                "w-10 h-10 rounded bg-gray-50 flex items-center justify-center mb-4 border border-dashed border-gray-200 transition-colors group-hover:bg-black group-hover:text-white group-hover:border-solid",
                                feature.color === 'orange' && "group-hover:bg-accent-500 group-hover:border-accent-600"
                            )}>
                                <feature.icon className="w-5 h-5 transition-transform group-hover:scale-110" />
                            </div>

                            {/* Content */}
                            <h3 className="text-base font-bold text-black mb-2 uppercase tracking-tight">
                                {feature.title}
                            </h3>
                            <p className="text-sm text-gray-500 leading-relaxed font-medium">
                                {feature.description}
                            </p>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
