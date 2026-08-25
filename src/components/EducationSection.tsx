"use client";

import { useRef, useSyncExternalStore, type MouseEvent } from 'react';
import { education } from '../data/education';
import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion';
import Image from 'next/image';
import './EducationSection.css';

function subscribeReducedMotion(callback: () => void) {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    mq.addEventListener('change', callback);
    return () => mq.removeEventListener('change', callback);
}

function getReducedMotionSnapshot() {
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

function getReducedMotionServerSnapshot() {
    return false;
}

function EducationCard({ edu, idx }: { edu: (typeof education)[number]; idx: number }) {
    const cardRef = useRef<HTMLDivElement>(null);
    const reducedMotion = useSyncExternalStore(
        subscribeReducedMotion,
        getReducedMotionSnapshot,
        getReducedMotionServerSnapshot
    );

    const px = useMotionValue(0.5);
    const py = useMotionValue(0.5);

    const rotateX = useSpring(useTransform(py, [0, 1], [8, -8]), { stiffness: 300, damping: 30 });
    const rotateY = useSpring(useTransform(px, [0, 1], [-8, 8]), { stiffness: 300, damping: 30 });
    const glowX = useTransform(px, [0, 1], ['0%', '100%']);
    const glowY = useTransform(py, [0, 1], ['0%', '100%']);

    const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
        if (reducedMotion) return;
        const rect = cardRef.current?.getBoundingClientRect();
        if (!rect) return;
        px.set((e.clientX - rect.left) / rect.width);
        py.set((e.clientY - rect.top) / rect.height);
    };

    const handleMouseLeave = () => {
        px.set(0.5);
        py.set(0.5);
    };

    return (
        <motion.div
            className="w-full"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: idx * 0.2 }}
        >
            <motion.div
                ref={cardRef}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                style={{
                    rotateX: reducedMotion ? 0 : rotateX,
                    rotateY: reducedMotion ? 0 : rotateY,
                    transformPerspective: 1000,
                }}
                whileHover={{ y: -10, scale: 1.02 }}
                transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                className="education-card p-6 md:p-10 group"
            >
                <motion.div
                    className="education-glow"
                    style={{ left: glowX, top: glowY, x: '-50%', y: '-50%' }}
                />

                <div className="flex flex-col md:flex-row items-center md:items-start w-full gap-8 relative z-10">
                    {/* Left Side: Institution Logo */}
                    <div className="flex-shrink-0 relative">
                        <div className="university-logo-container p-6 flex items-center justify-center bg-zinc-800/50">
                            <a href="https://www.unomaha.edu/" target="_blank" rel="noopener noreferrer" className="block">
                                <Image
                                    src="/education-icons/uno.jpg"
                                    alt={edu.institution}
                                    width={120}
                                    height={120}
                                    className="object-contain rounded-lg drop-shadow-2xl transition-all duration-500"
                                    priority
                                />
                            </a>
                        </div>
                        <div className="education-cap-badge">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M22 10 12 5 2 10l10 5 10-5Z" />
                                <path d="M6 12v5c0 1.5 3 3 6 3s6-1.5 6-3v-5" />
                            </svg>
                        </div>
                    </div>

                    {/* Right Side: Details */}
                    <div className="flex-1 text-center md:text-left">
                        <div className="inline-block px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-bold uppercase tracking-wider mb-4">
                            {edu.period}
                        </div>
                        <h3 className="text-xl md:text-2xl font-extrabold text-white mb-2 group-hover:text-blue-400 transition-colors duration-300">
                            {edu.degree}
                        </h3>
                        <a
                            href="https://www.unomaha.edu/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 text-lg text-zinc-400 font-medium hover:text-blue-400 transition-colors group/link"
                        >
                            {edu.institution}
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="opacity-0 -translate-x-1 group-hover/link:opacity-60 group-hover/link:translate-x-0 transition-all duration-300">
                                <path d="M7 17 17 7M7 7h10v10" />
                            </svg>
                        </a>
                    </div>
                </div>
            </motion.div>
        </motion.div>
    );
}

export default function EducationSection() {
    return (
        <section className="my-24 w-full relative overflow-hidden px-4">
            {/* Background decorative elements */}
            <div className="absolute top-0 left-1/4 w-64 h-64 bg-blue-600/10 blur-[120px] rounded-full pointer-events-none" />
            <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-purple-600/10 blur-[120px] rounded-full pointer-events-none" />

            <motion.h2
                className="text-3xl font-bold mb-16 text-white text-center tracking-tight"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
            >
                Education History
            </motion.h2>

            <div className="education-roadmap w-full max-w-4xl mx-auto">
                {education.map((edu, idx) => (
                    <div key={edu.degree} className="education-roadmap-row">
                        <div className="education-roadmap-rail">
                            <span className="education-roadmap-dot" />
                        </div>
                        <div className="flex-1 min-w-0">
                            <EducationCard edu={edu} idx={idx} />
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
