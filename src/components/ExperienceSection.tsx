
"use client";

import { useState } from 'react';
import { experience } from '../data/experience';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

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
                    // Use logo from data only
                    // Multi-role company
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
                                    className="w-full flex flex-col md:flex-row items-stretch md:items-center justify-between focus:outline-none bg-transparent hover:bg-[#181e29] transition-colors cursor-pointer"
                                    onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
                                    aria-expanded={openIndex === idx}
                                    type="button"
                                >
                                    {/* Left: Role and Period */}
                                    <div className="flex-1 p-6 flex flex-col justify-center text-left">
                                        <h3 className="font-semibold text-xl text-blue-400 mb-2">{firstRole.role}</h3>
                                        <p className="text-white text-sm opacity-80">{firstRole.period}</p>
                                        <p className="text-white text-xs opacity-60 mt-1">{exp.location}</p>
                                    </div>
                                    {/* Right: Company and Logo */}
                                    <div className="flex flex-col items-center justify-center bg-zinc-800 p-6 min-w-[220px] md:min-w-[300px] border-l border-zinc-700">
                                        <p className="text-white text-base font-medium mb-3 text-center">{exp.company}</p>
                                        <div className="flex justify-center">
                                            {exp.website ? (
                                                <a href={exp.website} target="_blank" rel="noopener noreferrer" className="relative group">
                                                    <span className="absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-1 rounded bg-zinc-800 text-xs text-white opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-10 shadow-lg border border-zinc-700">
                                                        Click to visit company page
                                                    </span>
                                                    <Image
                                                        src={exp.logo}
                                                        alt={exp.company + ' Logo'}
                                                        width={90}
                                                        height={90}
                                                        className="object-contain drop-shadow-lg rounded-md hover:scale-105 transition-transform"
                                                        priority
                                                    />
                                                </a>
                                            ) : (
                                                <Image
                                                    src={exp.logo}
                                                    alt={exp.company + ' Logo'}
                                                    width={90}
                                                    height={90}
                                                    className="object-contain drop-shadow-lg rounded-md"
                                                    priority
                                                />
                                            )}
                                        </div>
                                    </div>
                                </button>
                                {/* Expandable details */}
                                <AnimatePresence initial={false}>
                                    {openIndex === idx && (
                                        <motion.div
                                            key="content"
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: 'auto', opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            transition={{ duration: 0.4, ease: 'easeInOut' }}
                                            className="w-full px-6 pb-6 col-span-2"
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
                    // Single-role company
                    return (
                        <motion.div
                            key={exp.role + exp.company}
                            className="rounded-lg bg-zinc-900 shadow-md overflow-hidden"
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                        >
                            <button
                                className="w-full flex flex-col md:flex-row items-stretch md:items-center justify-between focus:outline-none bg-transparent hover:bg-[#181e29] transition-colors cursor-pointer"
                                onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
                                aria-expanded={openIndex === idx}
                                type="button"
                            >
                                {/* Left: Role and Period */}
                                <div className="flex-1 p-6 flex flex-col justify-center text-left">
                                    <h3 className="font-semibold text-xl text-blue-400 mb-2">{exp.role}</h3>
                                    <p className="text-white text-sm opacity-80">{exp.period}</p>
                                    <p className="text-white text-xs opacity-60 mt-1">{exp.location}</p>
                                </div>
                                {/* Right: Company and Logo */}
                                <div className="flex flex-col items-center justify-center bg-zinc-800 p-6 min-w-[220px] md:min-w-[300px] border-l border-zinc-700">
                                    <p className="text-white text-base font-medium mb-3 text-center">{exp.company}</p>
                                    <div className="flex justify-center">
                                        {exp.website ? (
                                            <a href={exp.website} target="_blank" rel="noopener noreferrer" className="relative group">
                                                <span className="absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-1 rounded bg-zinc-800 text-xs text-white opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-10 shadow-lg border border-zinc-700">
                                                    Click to visit company page
                                                </span>
                                                <Image
                                                    src={exp.logo}
                                                    alt={exp.company + ' Logo'}
                                                    width={90}
                                                    height={90}
                                                    className="object-contain drop-shadow-lg rounded-md hover:scale-105 transition-transform"
                                                    priority
                                                />
                                            </a>
                                        ) : (
                                            <Image
                                                src={exp.logo}
                                                alt={exp.company + ' Logo'}
                                                width={90}
                                                height={90}
                                                className="object-contain drop-shadow-lg rounded-md"
                                                priority
                                            />
                                        )}
                                    </div>
                                </div>
                            </button>
                            {/* Expandable details */}
                            <AnimatePresence initial={false}>
                                {openIndex === idx && (
                                    <motion.div
                                        key="content"
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: 'auto', opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.4, ease: 'easeInOut' }}
                                        className="w-full px-6 pb-6 col-span-2"
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
