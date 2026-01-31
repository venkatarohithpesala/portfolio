"use client";

import { education } from '../data/education';
import { motion, useMotionValue, useTransform } from 'framer-motion';
import Image from 'next/image';
import './EducationSection.css';

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

            <div className="flex flex-col items-center w-full max-w-4xl mx-auto space-y-12">
                {education.map((edu, idx) => {
                    return (
                        <motion.div
                            key={edu.degree}
                            className="w-full"
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.7, delay: idx * 0.2 }}
                        >
                            <div className="education-card p-6 md:p-10 group">
                                <div className="flex flex-col md:flex-row items-center md:items-start w-full gap-8 relative z-10">
                                    {/* Left Side: Institution Logo */}
                                    <div className="flex-shrink-0">
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
                                    </div>

                                    {/* Right Side: Details */}
                                    <div className="flex-1 text-center md:text-left">
                                        <div className="inline-block px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-bold uppercase tracking-wider mb-4">
                                            {edu.period}
                                        </div>
                                        <h3 className="text-xl md:text-2xl font-extrabold text-white mb-2 group-hover:text-blue-400 transition-colors duration-300">
                                            {edu.degree}
                                        </h3>
                                        <p className="text-lg text-zinc-400 font-medium">
                                            {edu.institution}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    );
                })}
            </div>
        </section>
    );
}
