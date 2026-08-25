"use client";
import { useState } from 'react';
import dynamic from 'next/dynamic';
import { skills } from '../data/skills';
import { motion, AnimatePresence } from 'framer-motion';

const SkillCloud = dynamic(() => import('./SkillCloud'), { ssr: false });

export default function SkillsSection() {
    const [searchQuery, setSearchQuery] = useState('');
    const [activeCategory, setActiveCategory] = useState<string | null>(null);

    const hasMatches = skills.some((group) =>
        group.items.some((item) => {
            const name = typeof item === 'string' ? item : item.name;
            return name.toLowerCase().includes(searchQuery.toLowerCase());
        })
    );

    const isFiltering = searchQuery.length > 0 || activeCategory !== null;
    const matchedItems = isFiltering
        ? skills.flatMap((group) =>
              group.items
                  .filter((item) => {
                      const name = typeof item === 'string' ? item : item.name;
                      if (searchQuery) return name.toLowerCase().includes(searchQuery.toLowerCase());
                      return group.category === activeCategory;
                  })
                  .map((item) => ({
                      name: typeof item === 'string' ? item : item.name,
                      icon: typeof item === 'object' && 'icon' in item ? item.icon : null,
                  }))
          )
        : [];

    return (
        <section className="mt-16 mb-24 w-full">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-6">
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
                        onChange={(e) => {
                            setSearchQuery(e.target.value);
                            if (e.target.value) setActiveCategory(null);
                        }}
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

            <motion.div
                className="flex flex-wrap gap-2 mb-4"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.25 }}
            >
                {skills.map((group) => {
                    const isActive = activeCategory === group.category;
                    return (
                        <button
                            key={group.category}
                            onClick={() => {
                                setSearchQuery('');
                                setActiveCategory(isActive ? null : group.category);
                            }}
                            className={`px-4 py-1.5 rounded-full text-xs md:text-sm font-bold tracking-tight border transition-all ${
                                isActive
                                    ? 'bg-blue-500 border-blue-400 text-black shadow-[0_0_15px_rgba(59,130,246,0.4)]'
                                    : 'bg-white/5 border-white/10 text-white/60 hover:text-white hover:border-blue-500/40'
                            }`}
                        >
                            {group.category}
                        </button>
                    );
                })}
            </motion.div>

            {hasMatches ? (
                <>
                    <SkillCloud searchQuery={searchQuery} activeCategory={activeCategory} />
                    <AnimatePresence>
                        {isFiltering && (
                            <motion.div
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                transition={{ duration: 0.3 }}
                                className="mt-6"
                            >
                                <p className="text-center text-white/40 text-xs font-bold uppercase tracking-widest mb-3">
                                    {matchedItems.length} matching skill{matchedItems.length === 1 ? '' : 's'}
                                </p>
                                <div className="flex flex-wrap justify-center gap-2">
                                {matchedItems.map((item) => (
                                    <div
                                        key={item.name}
                                        className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-full pl-2 pr-4 py-1.5"
                                    >
                                        {item.icon && (
                                            <img
                                                src={`/skill-icons/${item.icon}`}
                                                alt={item.name}
                                                loading="lazy"
                                                className="w-5 h-5 object-contain rounded-full"
                                            />
                                        )}
                                        <span className="text-zinc-200 text-xs md:text-sm font-bold tracking-tight">
                                            {item.name}
                                        </span>
                                    </div>
                                ))}
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </>
            ) : (
                <motion.div
                    className="text-center py-20"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                >
                    <p className="text-white/40 text-xl italic">No skills found matching &quot;{searchQuery}&quot;</p>
                </motion.div>
            )}
        </section>
    );
}
