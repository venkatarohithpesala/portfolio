
"use client";
import { useState } from 'react';
import { experience } from '../data/experience';
import { motion, AnimatePresence } from 'framer-motion';

export default function ExperienceSection() {
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    return (
        <section className="my-12 w-full">
            <motion.h2
                className="text-2xl font-bold mb-6 text-white"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
            >
                Experience
            </motion.h2>
            <div className="space-y-4">
                {experience.map((exp, idx) => {
                    // If exp.roles exists, render multiple roles under one company
                    if (Array.isArray(exp.roles)) {
                        const [firstRole, ...otherRoles] = exp.roles;
                        return (
                            <motion.div
                                key={exp.company}
                                className="rounded-lg bg-zinc-900 shadow-md overflow-hidden"
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5 }}
                            >
                                <button
                                    className="w-full flex flex-col md:flex-row md:items-center md:justify-between px-6 py-4 text-left focus:outline-none bg-zinc-900 hover:bg-[#181e29] transition-colors"
                                    onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
                                    aria-expanded={openIndex === idx}
                                >
                                    <div>
                                        <h3 className="font-semibold text-lg text-blue-400 flex items-center gap-2">
                                            <span className="text-blue-500 font-bold">{firstRole.role}</span>
                                            <span className="text-white font-normal">@ {exp.company}</span>
                                            <span className="text-xs text-white/80 ml-2">{exp.location}</span>
                                        </h3>
                                    </div>
                                    <span className="text-white/80 text-sm mt-2 md:mt-0">{firstRole.period}</span>
                                </button>
                                <AnimatePresence initial={false}>
                                    {openIndex === idx && (
                                        <motion.div
                                            key="content"
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: 'auto', opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            transition={{ duration: 0.4, ease: 'easeInOut' }}
                                            className="px-6 pb-6"
                                        >
                                            {[firstRole, ...otherRoles].map((role, rIdx) => (
                                                <div key={role.role + rIdx} className="mt-4">
                                                    <h4 className="font-semibold text-blue-500 dark:text-blue-300 flex items-center gap-2">
                                                        {role.role}
                                                        <span className="text-xs text-zinc-400 ml-2">{role.period}</span>
                                                    </h4>
                                                    {role.projects && role.projects.map((proj) => (
                                                        <div key={proj.name} className="ml-4 mt-2">
                                                            <div className="font-semibold text-blue-400">
                                                                {proj.name} <span className="text-xs text-white/80">{proj.supervisor}</span>
                                                            </div>
                                                            <p className="text-xs text-white/70 mb-1">{proj.period}</p>
                                                            <ul className="list-disc ml-6 space-y-1 text-white">
                                                                {proj.highlights.map((h, i) => (
                                                                    <li key={i}>{h}</li>
                                                                ))}
                                                            </ul>
                                                        </div>
                                                    ))}
                                                </div>
                                            ))}
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </motion.div>
                        );
                    }
                    // Fallback for single-role companies
                    return (
                        <motion.div
                            key={exp.role + exp.company}
                            className="rounded-lg bg-zinc-900 shadow-md overflow-hidden"
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                        >
                            <button
                                className="w-full flex flex-col md:flex-row md:items-center md:justify-between px-6 py-4 text-left focus:outline-none bg-zinc-900 hover:bg-[#181e29] transition-colors"
                                onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
                                aria-expanded={openIndex === idx}
                            >
                                <div>
                                    <h3 className="font-semibold text-lg text-blue-400 flex items-center gap-2">
                                        <span className="text-blue-500 font-bold">{exp.role}</span>
                                        <span className="text-white font-normal">@ {exp.company}</span>
                                        <span className="text-xs text-white/80 ml-2">{exp.location}</span>
                                    </h3>
                                </div>
                                <span className="text-white/80 text-sm mt-2 md:mt-0">{exp.period}</span>
                            </button>
                            <AnimatePresence initial={false}>
                                {openIndex === idx && (
                                    <motion.div
                                        key="content"
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: 'auto', opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.4, ease: 'easeInOut' }}
                                        className="px-6 pb-6"
                                    >
                                        {exp.projects && exp.projects.map((proj) => (
                                            <div key={proj.name} className="mt-4">
                                                <h4 className="font-semibold text-blue-400">
                                                    {proj.name} <span className="text-xs text-white/80">{proj.supervisor}</span>
                                                </h4>
                                                <p className="text-xs text-white/70 mb-1">{proj.period}</p>
                                                <ul className="list-disc ml-6 space-y-1 text-white">
                                                    {proj.highlights.map((h, i) => (
                                                        <li key={i}>{h}</li>
                                                    ))}
                                                </ul>
                                            </div>
                                        ))}
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.div>
                    );
                })}
            </div>
        </section>
    );
}
