"use client";
import { useState } from 'react';
import { skills } from '../data/skills';
import { motion, AnimatePresence } from 'framer-motion';
import './SkillsSection.css';

export default function SkillsSection() {
    const [searchQuery, setSearchQuery] = useState('');

    const filteredSkills = skills.map(group => ({
        ...group,
        items: group.items.filter(item => {
            const name = typeof item === 'string' ? item : item.name;
            return name.toLowerCase().includes(searchQuery.toLowerCase());
        })
    })).filter(group => group.items.length > 0);

    return (
        <section className="mt-16 mb-24 w-full">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
                <div>
                    <motion.h2
                        className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white mb-2 leading-tight"
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        Technical Expertise
                    </motion.h2>
                    <motion.p
                        className="text-white/60 text-lg"
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                    >
                        Tools and technologies I use to bring ideas to life.
                    </motion.p>
                </div>

                <motion.div
                    className="relative max-w-xs w-full"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                >
                    <input
                        type="text"
                        placeholder="Search skills (e.g. React, AWS)..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full bg-zinc-900/50 border border-white/10 rounded-full px-6 py-3 text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all backdrop-blur-sm"
                    />
                    <svg
                        className="absolute right-5 top-1/2 -translate-y-1/2 w-5 h-5 text-white/30"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                </motion.div>
            </div>

            <div className="skills-container">
                <AnimatePresence mode="popLayout">
                    {filteredSkills.map((group, groupIdx) => (
                        <motion.div
                            key={group.category}
                            layout
                            className="skill-category-card"
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            transition={{ duration: 0.4, delay: groupIdx * 0.05 }}
                        >
                            <h3 className="category-title text-blue-500">
                                {group.category}
                            </h3>
                            <div className="flex flex-wrap gap-3">
                                {group.items.map((item, itemIdx) => {
                                    const name = typeof item === 'string' ? item : item.name;
                                    const icon = typeof item === 'object' && 'icon' in item ? item.icon : null;

                                    return (
                                        <motion.div
                                            key={name}
                                            layout
                                            className="skill-item"
                                            whileHover={{ y: -2 }}
                                        >
                                            {icon && (
                                                <div className="skill-icon-wrapper">
                                                    <img
                                                        src={`/skill-icons/${icon}`}
                                                        alt={`${name} icon`}
                                                        loading="lazy"
                                                    />
                                                </div>
                                            )}
                                            <span className="text-zinc-200 text-sm font-semibold tracking-wide">{name}</span>
                                        </motion.div>
                                    );
                                })}
                            </div>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>

            {filteredSkills.length === 0 && (
                <motion.div
                    className="text-center py-20"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                >
                    <p className="text-white/40 text-xl italic">No skills found matching "{searchQuery}"</p>
                </motion.div>
            )}
        </section>
    );
}
