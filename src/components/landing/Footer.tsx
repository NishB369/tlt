import Link from 'next/link';
import { BookOpen, Twitter, Github, Linkedin, Mail } from 'lucide-react';

export function Footer() {
    const currentYear = new Date().getFullYear();

    const footerLinks = {
        product: [
            { name: 'Features', href: '#features' },
            { name: 'How It Works', href: '#how-it-works' },
            { name: 'Pricing', href: '#' },
            { name: 'FAQ', href: '#' },
        ],
        resources: [
            { name: 'Study Guides', href: '#' },
            { name: 'Video Library', href: '#' },
            { name: 'Practice Tests', href: '#' },
            { name: 'Blog', href: '#' },
        ],
        company: [
            { name: 'About Us', href: '#about' },
            { name: 'Contact', href: '#' },
            { name: 'Careers', href: '#' },
            { name: 'Press', href: '#' },
        ],
        legal: [
            { name: 'Privacy Policy', href: '#' },
            { name: 'Terms of Service', href: '#' },
            { name: 'Cookie Policy', href: '#' },
        ],
    };

    const socialLinks = [
        { icon: Twitter, href: '#', label: 'Twitter' },
        { icon: Github, href: '#', label: 'GitHub' },
        { icon: Linkedin, href: '#', label: 'LinkedIn' },
        { icon: Mail, href: '#', label: 'Email' },
    ];

    return (
        <footer className="bg-white text-gray-600 border-t border-dashed border-gray-200">
            {/* Main Footer */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="grid grid-cols-2 md:grid-cols-6 gap-8">
                    {/* Brand Column */}
                    <div className="col-span-2">
                        <Link href="/" className="flex items-center gap-2 mb-4">
                            <div className="w-8 h-8 rounded bg-black flex items-center justify-center border border-dashed border-gray-400">
                                <BookOpen className="w-4 h-4 text-white" />
                            </div>
                            <span className="text-lg font-bold text-black tracking-tight">
                                LiteratureTalks
                            </span>
                        </Link>
                        <p className="text-sm text-gray-400 mb-6 max-w-xs">
                            Empowering students to master English literature through expert video tutorials, comprehensive notes, and interactive learning tools.
                        </p>
                        {/* Social Links */}
                        <div className="flex gap-4">
                            {socialLinks.map((social) => (
                                <a
                                    key={social.label}
                                    href={social.href}
                                    className="w-9 h-9 rounded bg-gray-50 hover:bg-black text-gray-400 hover:text-white flex items-center justify-center transition-all border border-dashed border-gray-200"
                                    aria-label={social.label}
                                >
                                    <social.icon className="w-4 h-4" />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Link Columns */}
                    <div>
                        <h3 className="text-black font-bold text-xs uppercase tracking-widest mb-4">Product</h3>
                        <ul className="space-y-2">
                            {footerLinks.product.map((link) => (
                                <li key={link.name}>
                                    <a
                                        href={link.href}
                                        className="text-sm text-gray-500 hover:text-black transition-colors font-medium"
                                    >
                                        {link.name}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-black font-bold text-xs uppercase tracking-widest mb-4">Resources</h3>
                        <ul className="space-y-2">
                            {footerLinks.resources.map((link) => (
                                <li key={link.name}>
                                    <a
                                        href={link.href}
                                        className="text-sm text-gray-500 hover:text-black transition-colors font-medium"
                                    >
                                        {link.name}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-black font-bold text-xs uppercase tracking-widest mb-4">Company</h3>
                        <ul className="space-y-2">
                            {footerLinks.company.map((link) => (
                                <li key={link.name}>
                                    <a
                                        href={link.href}
                                        className="text-sm text-gray-500 hover:text-black transition-colors font-medium"
                                    >
                                        {link.name}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-black font-bold text-xs uppercase tracking-widest mb-4">Legal</h3>
                        <ul className="space-y-2">
                            {footerLinks.legal.map((link) => (
                                <li key={link.name}>
                                    <a
                                        href={link.href}
                                        className="text-sm text-gray-500 hover:text-black transition-colors font-medium"
                                    >
                                        {link.name}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>

            {/* Bottom Bar */}
            <div className="border-t border-dashed border-gray-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                        <p className="text-xs text-gray-400 font-medium">
                            © {currentYear} Literature Talks. All rights reserved.
                        </p>
                        <p className="text-xs text-gray-400 font-medium tracking-tight">
                            Made with <span className="text-black">♥</span> for literature students
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    );
}
