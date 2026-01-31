"use client";
import { useState } from 'react';
import { skills } from '../data/skills';
import { motion, AnimatePresence } from 'framer-motion';
import './SkillsSection.css';

export default function SkillsSection() {
    const [searchQuery, setSearchQuery] = useState('');
    const [expandedCategories, setExpandedCategories] = useState<string[]>([]);

    const filteredSkills = skills.map(group => ({
        ...group,
        items: group.items.filter(item => {
            const name = typeof item === 'string' ? item : item.name;
            return name.toLowerCase().includes(searchQuery.toLowerCase());
        })
    })).filter(group => group.items.length > 0);

    const toggleCategory = (category: string) => {
        if (window.innerWidth >= 768) return; // Don't toggle on desktop
        setExpandedCategories(prev => 
            prev.includes(category) 
                ? prev.filter(c => c !== category) 
                : [...prev, category]
        );
    };

    const isSearching = searchQuery.length > 0;

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
                        className="text-white/60 text-lg md:text-xl"
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
                    {filteredSkills.map((group, groupIdx) => {
                        const isExpanded = expandedCategories.includes(group.category) || isSearching;
                        return (
                            <motion.div
                                key={group.category}
                                className="skill-category-card"
                                initial={{ opacity: 0, y: 15 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.3, delay: groupIdx * 0.05 }}
                            >
                                <div 
                                    className="flex items-center justify-between cursor-pointer md:cursor-default"
                                    onClick={() => toggleCategory(group.category)}
                                >
                                    <h3 className="category-title text-blue-400 font-bold">
                                        {group.category}
                                    </h3>
                                    <motion.span 
                                        animate={{ rotate: isExpanded ? 180 : 0 }}
                                        className="md:hidden p-1.5 rounded-full bg-blue-500/10 flex items-center justify-center"
                                    >
                                        <svg className="w-4 h-4 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
                                        </svg>
                                    </motion.span>
                                </div>
                                
                                <div className="hidden md:block flex-1">
                                    <div className="flex flex-wrap gap-2 pt-5 pb-2">
                                        {group.items.map((item) => {
                                            const name = typeof item === 'string' ? item : item.name;
                                            const icon = typeof item === 'object' && 'icon' in item ? item.icon : null;
                                            return (
                                                <div key={name} className="skill-item">
                                                    {icon && (
                                                        <div className="skill-icon-wrapper">
                                                            <img src={`/skill-icons/${icon}`} alt={name} loading="lazy" />
                                                        </div>
                                                    )}
                                                    <span className="text-zinc-200 text-xs font-semibold">{name}</span>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>

                                <div className="md:hidden">
                                    <AnimatePresence initial={false}>
                                        {isExpanded && (
                                            <motion.div 
                                                initial={{ height: 0, opacity: 0 }}
                                                animate={{ height: 'auto', opacity: 1 }}
                                                exit={{ height: 0, opacity: 0 }}
                                                transition={{ duration: 0.3, ease: "easeInOut" }}
                                                className="overflow-hidden"
                                            >
                                                <div className="flex flex-wrap gap-2 pt-4 pb-4">
                                                    {group.items.map((item) => {
                                                        const name = typeof item === 'string' ? item : item.name;
                                                        const icon = typeof item === 'object' && 'icon' in item ? item.icon : null;
                                                        return (
                                                            <div key={name} className="skill-item">
                                                                {icon && (
                                                                    <div className="skill-icon-wrapper">
                                                                        <img src={`/skill-icons/${icon}`} alt={name} loading="lazy" />
                                                                    </div>
                                                                )}
                                                                <span className="text-zinc-200 text-xs font-semibold">{name}</span>
                                                            </div>
                                                        );
                                                    })}
                                                </div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            </motion.div>
                        );
                    })}
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
