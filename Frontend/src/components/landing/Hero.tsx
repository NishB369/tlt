'use client';

import Link from 'next/link';
import { ArrowRight, Play, Sparkles, CheckCircle, Trophy } from 'lucide-react';
import { motion } from 'framer-motion';

export function Hero() {
    return (
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20 bg-white">
            {/* Minimal Grid Pattern */}
            <div
                className="absolute inset-0 opacity-[0.015]"
                style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                }}
            />

            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
                <div className="text-center">
                    {/* Badge */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gray-100 text-gray-600 text-xs font-medium mb-8 border border-gray-200"
                    >
                        <Sparkles className="w-3.5 h-3.5" />
                        <span>Trusted by 10,000+ literature students</span>
                    </motion.div>

                    {/* Main Headline */}
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className="text-5xl sm:text-6xl md:text-7xl font-bold text-black tracking-tight leading-[1.1] mb-8"
                    >
                        Master English Literature
                        <br />
                        with Expert Guidance
                    </motion.h1>

                    {/* Subheadline */}
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto mb-10"
                    >
                        Ace your exams with video tutorials, comprehensive notes, interactive quizzes,
                        and smart study tools designed specifically for college literature students.
                    </motion.p>

                    {/* CTA Buttons */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                        className="flex flex-col sm:flex-row items-center justify-center gap-4"
                    >
                        <Link
                            href="/login"
                            className="group px-8 py-4 bg-accent-500 text-white font-bold text-lg rounded border-2 border-dashed border-accent-600 hover:bg-accent-600 transition-all flex items-center gap-2"
                        >
                            Start Learning Free
                            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </Link>
                        <button className="group px-8 py-4 bg-white text-black font-semibold text-lg rounded transition-all flex items-center gap-2 border border-dashed border-gray-300 hover:bg-gray-50">
                            <Play className="w-5 h-5" />
                            Watch Demo
                        </button>
                    </motion.div>

                    {/* Stats */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.4 }}
                        className="flex flex-wrap items-center justify-center gap-8 sm:gap-12 mt-16"
                    >
                        {[
                            { value: '100+', label: 'Video Lessons' },
                            { value: '500+', label: 'Practice Questions' },
                            { value: '50+', label: 'Study Guides' },
                            { value: '95%', label: 'Pass Rate' },
                        ].map((stat, index) => (
                            <div key={index} className="text-center">
                                <div className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white">
                                    {stat.value}
                                </div>
                                <div className="text-sm text-gray-500 dark:text-gray-400">
                                    {stat.label}
                                </div>
                            </div>
                        ))}
                    </motion.div>
                </div>

                {/* Hero Image/Preview */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, delay: 0.5 }}
                    className="mt-20 relative"
                >
                    <div className="relative mx-auto max-w-5xl">
                        {/* Browser Mockup */}
                        <div className="rounded overflow-hidden shadow-2xl border border-dashed border-gray-300 bg-white">
                            {/* Browser Header */}
                            <div className="flex items-center gap-2 px-4 py-3 bg-gray-50 border-b border-dashed border-gray-200">
                                <div className="flex gap-1.5">
                                    <div className="w-2.5 h-2.5 rounded-full bg-accent-500 border border-dashed border-accent-600" />
                                    <div className="w-2.5 h-2.5 rounded-full bg-gray-200 border border-dashed border-gray-300" />
                                    <div className="w-2.5 h-2.5 rounded-full bg-gray-200 border border-dashed border-gray-300" />
                                </div>
                                <div className="flex-1 flex justify-center">
                                    <div className="px-4 py-1 rounded text-[10px] text-gray-400 font-mono">
                                        literaturetalks.com/dashboard
                                    </div>
                                </div>
                            </div>
                            {/* Dashboard Preview */}
                            <div className="aspect-[16/9] bg-gray-50 flex items-center justify-center">
                                <div className="text-center p-8">
                                    <div className="w-16 h-16 mx-auto mb-4 rounded bg-black flex items-center justify-center shadow-lg border border-dashed border-gray-500">
                                        <Play className="w-6 h-6 text-white" />
                                    </div>
                                    <p className="text-gray-400 text-sm font-medium">
                                        Interactive Dashboard Preview
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Floating Elements */}
                        <div className="absolute -left-8 top-1/4 hidden lg:block animate-float">
                            <div className="px-4 py-3 rounded bg-white shadow-xl border border-dashed border-gray-200">
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded bg-accent-500 flex items-center justify-center text-white border border-dashed border-accent-600">
                                        <CheckCircle className="w-4 h-4" />
                                    </div>
                                    <div>
                                        <p className="text-xs font-bold text-black uppercase tracking-wider">Quiz Completed</p>
                                        <p className="text-[10px] text-gray-400">Score: 95%</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="absolute -right-8 top-1/3 hidden lg:block animate-float" style={{ animationDelay: '0.5s' }}>
                            <div className="px-4 py-3 rounded bg-white shadow-xl border border-dashed border-gray-200">
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded bg-black flex items-center justify-center text-white border border-dashed border-gray-600">
                                        <Sparkles className="w-4 h-4" />
                                    </div>
                                    <div>
                                        <p className="text-xs font-bold text-black uppercase tracking-wider">7 Day Streak</p>
                                        <p className="text-[10px] text-gray-400">Keep it up</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="absolute -right-4 bottom-1/4 hidden lg:block animate-float" style={{ animationDelay: '1s' }}>
                            <div className="px-4 py-3 rounded bg-white shadow-xl border border-dashed border-gray-200">
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded bg-gray-50 flex items-center justify-center text-black border border-dashed border-gray-200">
                                        <Trophy className="w-4 h-4" />
                                    </div>
                                    <div>
                                        <p className="text-xs font-bold text-black uppercase tracking-wider">Achievement</p>
                                        <p className="text-[10px] text-gray-400">Bookworm Badge</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
