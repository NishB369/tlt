'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { BookOpen, Menu, X } from 'lucide-react';
import { cn } from '@/src/lib/utils';

export function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { name: 'Features', href: '#features' },
        { name: 'How It Works', href: '#how-it-works' },
        { name: 'About', href: '#about' },
    ];

    return (
        <nav
            className={cn(
                'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
                isScrolled
                    ? 'bg-white/90 backdrop-blur-md border-b border-gray-100'
                    : 'bg-transparent'
            )}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-2 group">
                        <div className="w-8 h-8 rounded bg-black flex items-center justify-center transition-transform group-hover:scale-105 border border-dashed border-gray-400">
                            <BookOpen className="w-3.5 h-3.5 text-white" />
                        </div>
                        <span className="text-lg font-bold text-black tracking-tight">
                            Literature<span className="text-accent-500 transition-colors">Talks</span>
                        </span>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center gap-8">
                        {navLinks.map((link) => (
                            <a
                                key={link.name}
                                href={link.href}
                                className="text-gray-600 hover:text-primary-600 font-medium transition-colors"
                            >
                                {link.name}
                            </a>
                        ))}
                    </div>

                    {/* CTA Buttons */}
                    <div className="hidden md:flex items-center gap-4">
                        <Link
                            href="/login"
                            className="text-sm px-4 py-2 text-gray-600 font-medium hover:text-black transition-colors"
                        >
                            Log In
                        </Link>
                        <Link
                            href="/login"
                            className="text-sm px-5 py-2.5 bg-accent-500 text-white font-bold rounded border border-dashed border-accent-600 hover:bg-accent-600 transition-all"
                        >
                            Start Learning Free
                        </Link>
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    >
                        {isMobileMenuOpen ? (
                            <X className="w-6 h-6" />
                        ) : (
                            <Menu className="w-6 h-6" />
                        )}
                    </button>
                </div>

                {/* Mobile Menu */}
                {isMobileMenuOpen && (
                    <div className="md:hidden py-4 border-t border-gray-200 animate-slide-down">
                        <div className="flex flex-col gap-4">
                            {navLinks.map((link) => (
                                <a
                                    key={link.name}
                                    href={link.href}
                                    className="px-4 py-2 text-gray-600 hover:text-primary-600 font-medium"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                >
                                    {link.name}
                                </a>
                            ))}
                            <div className="flex flex-col gap-2 px-4 pt-4 border-t border-gray-200">
                                <Link
                                    href="/login"
                                    className="py-2.5 text-center text-gray-700 font-medium"
                                >
                                    Log In
                                </Link>
                                <Link
                                    href="/login"
                                    className="py-2.5 text-center bg-gradient-to-r from-primary-500 to-primary-600 text-white font-semibold rounded-xl"
                                >
                                    Start Learning Free
                                </Link>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </nav>
    );
}
